import { useState, useEffect, useMemo } from 'react'
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db, auth } from '../firebase'
import styles from './Log.module.css'

// Ported from the existing Progressive Overload tracker (Supabase → Firestore).
// Same fields, same "max 10 sets per day" rule, same PR-badge logic — just
// pointed at this app's existing Firestore project instead of a second backend.

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const PLATE_COLORS = ['#D4AF37', '#60A5FA', '#F87171', '#4ADE80', '#A78BFA', '#F59E0B']

function todayShortDay() {
  const map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return map[new Date().getDay()]
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function PRBadges({ sets }) {
  const bestByExercise = new Map()
  for (const s of sets) {
    const existing = bestByExercise.get(s.exercise)
    if (!existing || s.weight > existing.weight) {
      bestByExercise.set(s.exercise, { weight: s.weight, unit: s.unit, performedAt: s.performedAt })
    }
  }
  const entries = Array.from(bestByExercise.entries())
    .sort((a, b) => b[1].performedAt.localeCompare(a[1].performedAt))
    .slice(0, 6)

  if (entries.length === 0) return null

  return (
    <div className={styles.prRow}>
      {entries.map(([exercise, pr], i) => (
        <div key={exercise} className={styles.prBadge}>
          <div className={styles.prCircle} style={{ borderColor: PLATE_COLORS[i % PLATE_COLORS.length] }}>
            <span className={styles.prWeight}>{pr.weight}</span>
            <span className={styles.prUnit}>{pr.unit}</span>
          </div>
          <span className={styles.prName}>{exercise}</span>
        </div>
      ))}
    </div>
  )
}

export default function Log() {
  const [sets, setSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [exercise, setExercise] = useState('')
  const [weight, setWeight] = useState('')
  const [unit, setUnit] = useState('kg')
  const [reps, setReps] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [day, setDay] = useState(todayShortDay())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  const uid = auth.currentUser?.uid

  const exercises = useMemo(() => {
    return Array.from(new Set(sets.map((s) => s.exercise))).sort((a, b) => a.localeCompare(b))
  }, [sets])

  useEffect(() => {
    async function load() {
      if (!uid) {
        setLoading(false)
        return
      }
      try {
        const q = query(
          collection(db, 'workoutSets'),
          where('userId', '==', uid),
          orderBy('performedAt', 'desc')
        )
        const snap = await getDocs(q)
        setSets(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Log: failed to load sets', err)
        setLoadError('Could not load your log. Pull to refresh or try again shortly.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [uid])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!uid) {
      setError('Session expired — please sign in again.')
      return
    }
    if (!exercise.trim() || !weight || !reps) {
      setError('Fill in exercise, weight, and reps.')
      return
    }

    setSaving(true)
    try {
      // Max 10 sets per day for this user (same rule as the original tracker)
      const countQ = query(
        collection(db, 'workoutSets'),
        where('userId', '==', uid),
        where('dayOfWeek', '==', day)
      )
      const countSnap = await getDocs(countQ)
      if (countSnap.size >= 10) {
        setError(`${day} already has 10 entries — remove one first.`)
        setSaving(false)
        return
      }

      const newSet = {
        userId: uid,
        exercise: exercise.trim(),
        weight: Number(weight),
        unit,
        reps: Number(reps),
        performedAt: date,
        dayOfWeek: day,
        createdAt: serverTimestamp(),
      }
      const ref = await addDoc(collection(db, 'workoutSets'), newSet)
      setSets((prev) => [{ id: ref.id, ...newSet, createdAt: new Date().toISOString() }, ...prev])
      setWeight('')
      setReps('')
    } catch (err) {
      console.error('Log: failed to save set', err)
      setError('Could not save that set. Try again.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    setDeletingId(id)
    try {
      await deleteDoc(doc(db, 'workoutSets', id))
      setSets((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.error('Log: failed to delete set', err)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.topbar}>
        <div className={styles.title}>WORKOUT LOG</div>
        <div className={styles.subtitle}>Record your lifts. See your progress.</div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading your log…</div>
      ) : (
        <>
          <PRBadges sets={sets} />

          <div className={styles.sectionLbl}>LOG A SET</div>
          <form className={styles.card} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Exercise</label>
              <input
                list="exercise-options"
                className={styles.input}
                placeholder="e.g. Back Squat"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
              />
              <datalist id="exercise-options">
                {exercises.map((ex) => <option key={ex} value={ex} />)}
              </datalist>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Day</label>
              <select className={styles.select} value={day} onChange={(e) => setDay(e.target.value)}>
                {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label className={styles.label}>Weight</label>
                <div className={styles.weightRow}>
                  <input
                    type="number" inputMode="decimal" step="0.5" min="0"
                    className={`${styles.input} ${styles.weightInput}`}
                    placeholder="100"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <select
                    className={`${styles.select} ${styles.unitSelect}`}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Reps</label>
                <input
                  type="number" inputMode="numeric" min="0"
                  className={styles.input}
                  placeholder="8"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Date</label>
              <input
                type="date"
                className={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? 'Saving…' : 'Add set'}
            </button>
          </form>

          <div className={styles.sectionLbl}>PREVIOUS RECORDS</div>
          {loadError ? (
            <p className={styles.error}>{loadError}</p>
          ) : sets.length === 0 ? (
            <div className={`${styles.card} ${styles.emptyState}`}>
              <div className={styles.emptyTitle}>NO SETS LOGGED YET</div>
              <div className={styles.emptyDesc}>Add your first set above — this is where your log builds up.</div>
            </div>
          ) : (
            <div className={styles.card} style={{ padding: '1rem 0.5rem' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sets.map((s) => (
                    <tr key={s.id}>
                      <td className={styles.dayCell}>{s.dayOfWeek ?? '—'}</td>
                      <td className={styles.dateCell}>{formatDate(s.performedAt)}</td>
                      <td>{s.exercise}</td>
                      <td>{s.weight} {s.unit}</td>
                      <td>{s.reps}</td>
                      <td>
                        <button
                          className={styles.removeBtn}
                          disabled={deletingId === s.id}
                          onClick={() => handleDelete(s.id)}
                        >
                          {deletingId === s.id ? '…' : 'Remove'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
