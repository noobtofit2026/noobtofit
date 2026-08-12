import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WORKOUT_DATA } from '../data/workoutData'
import styles from './DayPage.module.css'

const TYPE_COLORS = {
  'Full Body': '#D4AF37',
  'Upper': '#60a5fa',
  'Lower': '#4ade80',
  'Push': '#f97316',
  'Pull': '#a78bfa',
  'Legs': '#4ade80',
  'Rest': '#555',
  'Mobility': '#a78bfa',
  'Warmup': '#f97316',
}

export default function DayPage() {
  const { phase, wk, day } = useParams()
  const navigate = useNavigate()
  const key = `ntf_day_${phase}_${wk}_${day}`
  const [done, setDone] = useState(localStorage.getItem(key) === 'done')
  const [celebrating, setCelebrating] = useState(false)

  const phaseData = WORKOUT_DATA[parseInt(phase)]
  const week = phaseData?.weeks[parseInt(wk)]
  const dayData = week?.days[parseInt(day)]
  if (!dayData) return null

  const color = phaseData.color
  const typeColor = TYPE_COLORS[dayData.type] || color

  function markDone() {
    if (done) return
    localStorage.setItem(key, 'done')
    setDone(true)
    setCelebrating(true)
    setTimeout(() => setCelebrating(false), 2500)
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} style={{ background: `radial-gradient(ellipse 100% 50% at 50% -10%, ${color}10 0%, transparent 55%)` }} />

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate(`/workouts/phase/${phase}`)}>←</button>
        <div>
          <p className={styles.eyebrow} style={{ color }}>{phaseData.title} · {week.title}</p>
          <h1 className={styles.title}>{dayData.type} DAY</h1>
        </div>
        {done && <div className={styles.donePill}>✓ Done</div>}
      </div>

      <div className={styles.dayHeader} style={{ borderColor: typeColor + '20' }}>
        <div>
          <div className={styles.dayTypeBadge} style={{ color: typeColor, background: typeColor + '12', borderColor: typeColor + '25' }}>
            {dayData.type}
          </div>
          <h2 className={styles.dayTitle}>{dayData.title}</h2>
          <p className={styles.dayMeta}>{dayData.exercises.length} exercises · Complete all sets</p>
        </div>
      </div>

      <p className={styles.sectionLbl}>EXERCISE PLAN</p>

      <div className={styles.exerciseList}>
        {dayData.exercises.map((ex, i) => (
          <div key={i} className={styles.exCard} style={{ animationDelay: `${i * 0.06}s`, borderColor: typeColor + '20' }}>
            <div className={styles.exCardGlass} />
            <div className={styles.exTop}>
              <div className={styles.exNum} style={{ background: typeColor + '12', borderColor: typeColor + '25', color: typeColor }}>
                {i + 1}
              </div>
              <div className={styles.exInfo}>
                <p className={styles.exName}>{ex.name}</p>
                <p className={styles.exNote}>{ex.note}</p>
              </div>
            </div>
            <div className={styles.exStats}>
              <div className={styles.exStat}>
                <span className={styles.exStatNum} style={{ color: typeColor }}>{ex.sets}</span>
                <span className={styles.exStatLbl}>Sets</span>
              </div>
              <div className={styles.exStatDiv} />
              <div className={styles.exStat}>
                <span className={styles.exStatNum} style={{ color: typeColor }}>{ex.reps}</span>
                <span className={styles.exStatLbl}>Reps</span>
              </div>
              <div className={styles.exStatDiv} />
              <div className={styles.exStat}>
                <span className={styles.exStatNum} style={{ color: typeColor }}>{ex.rest}</span>
                <span className={styles.exStatLbl}>Rest</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        {!done ? (
          <button className="gold-btn" onClick={markDone}>✔ Mark Day Complete</button>
        ) : (
          <div className={styles.completedBox}>
            <div className={styles.completedIcon}>🏆</div>
            <p className={styles.completedTitle}>Day Complete!</p>
            <p className={styles.completedSub}>Keep the momentum going 🔥</p>
            <button className="ghost-btn" style={{ marginTop: '1rem' }} onClick={() => navigate(`/workouts/phase/${phase}`)}>
              Back to Phase
            </button>
          </div>
        )}
      </div>

      {celebrating && (
        <div className={styles.celebration}>
          <div className={styles.celebBox}>
            <div className={styles.celebIcon}>🏆</div>
            <p className={styles.celebTitle}>DAY DONE!</p>
            <p className={styles.celebSub}>You're unstoppable 🔥</p>
          </div>
        </div>
      )}
    </div>
  )
}