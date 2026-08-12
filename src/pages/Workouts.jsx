import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WORKOUT_DATA } from '../data/workoutData'
import styles from './Workouts.module.css'

function getPhaseProgress(phase) {
  const p = WORKOUT_DATA[phase]
  let total = 0, done = 0
  Object.keys(p.weeks).forEach(wk => {
    Object.keys(p.weeks[wk].days).forEach(d => {
      total++
      if (localStorage.getItem(`ntf_day_${phase}_${wk}_${d}`) === 'done') done++
    })
  })
  return total === 0 ? 0 : Math.round((done / total) * 100)
}

export default function Workouts() {
  const navigate = useNavigate()
  const [skipWarning, setSkipWarning] = useState(null)

  const phases = [0, 1, 2, 3]
  const pcts = phases.map(p => getPhaseProgress(p))

  function isUnlocked(phase) {
    if (phase === 0) return true
    if (phase === 1) return pcts[0] >= 80
    if (phase === 2) return pcts[1] >= 80
    if (phase === 3) return pcts[2] >= 80
    return false
  }

  function handlePhaseClick(phase) {
    if (!isUnlocked(phase)) return
    if (WORKOUT_DATA[phase].showSkipWarning) {
      setSkipWarning(phase)
    } else {
      navigate(`/workouts/phase/${phase}`)
    }
  }

  const PHASE_TAGLINES = [
    'Master your movement. Earn your right to lift.',
    'Build the base. Every rep counts now.',
    'Split the work. Double the gains.',
    'This is where champions are made.',
  ]

  const PHASE_ICONS = ['🧘', '🌱', '⚡', '🔥']

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/home')}>←</button>
        <div>
          <p className={styles.eyebrow}>TRAINING PROGRAM</p>
          <h1 className={styles.title}>WORKOUTS</h1>
        </div>
      </div>

      <div className={styles.heroBanner}>
        <div className={styles.heroBannerLeft}>
          <p className={styles.heroBannerEye}>YOUR JOURNEY</p>
          <h2 className={styles.heroBannerTitle}>4 PHASES</h2>
          <p className={styles.heroBannerSub}>From zero to elite — follow the system</p>
        </div>
        <div className={styles.heroBannerRight}>
          <div className={styles.phaseRing}>
            <span className={styles.phaseRingNum}>{pcts.filter(p => p >= 80).length}</span>
            <span className={styles.phaseRingLabel}>DONE</span>
          </div>
        </div>
      </div>

      <p className={styles.sectionLbl}>SELECT PHASE</p>

      <div className={styles.phases}>
        {phases.map((p, idx) => {
          const data = WORKOUT_DATA[p]
          const unlocked = isUnlocked(p)
          const pct = pcts[p]
          const complete = pct >= 80

          return (
            <div
              key={p}
              className={`${styles.card} ${!unlocked ? styles.locked : ''} ${complete ? styles.complete : ''}`}
              style={{ '--color': data.color }}
              onClick={() => handlePhaseClick(p)}
            >
              <div className={styles.cardShine} />
              {!unlocked && <div className={styles.lockedOverlay} />}

              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.phaseIcon} style={{ borderColor: data.color + '40', background: data.color + '10' }}>
                    <span className={styles.phaseIconEmoji}>{PHASE_ICONS[p]}</span>
                  </div>
                  <div>
                    <p className={styles.cardPhaseLabel} style={{ color: data.color }}>{data.title}</p>
                    <h2 className={styles.cardName}>{data.subtitle}</h2>
                    <p className={styles.cardDuration}>{data.duration}</p>
                  </div>
                </div>
                <div className={styles.cardHeaderRight}>
                  {unlocked ? (
                    <div className={styles.pctCircle} style={{ borderColor: data.color + '50' }}>
                      <span className={styles.pctNum} style={{ color: data.color }}>{pct}%</span>
                    </div>
                  ) : (
                    <div className={styles.lockIcon}>🔒</div>
                  )}
                </div>
              </div>

              <p className={styles.cardTagline}>{PHASE_TAGLINES[p]}</p>

              <div className={styles.cardBar}>
                <div className={styles.cardBarFill} style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${data.color}, ${data.color}99)` }} />
              </div>

              <div className={styles.cardFooter}>
                {complete ? (
                  <span className={styles.completeTag}>✓ Phase Complete</span>
                ) : unlocked ? (
                  <span className={styles.progressTag} style={{ color: data.color }}>{pct}% complete</span>
                ) : (
                  <span className={styles.lockedTag}>Complete Phase {p - 1} at 80% to unlock</span>
                )}
                {unlocked && (
                  <span className={styles.enterBtn} style={{ color: data.color }}>Enter →</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {skipWarning !== null && (
        <div className={styles.warningOverlay}>
          <div className={styles.warningModal}>
            <div className={styles.warningIcon}>⚠️</div>
            <h2 className={styles.warningTitle}>Phase 0 Warning</h2>
            <p className={styles.warningText}>
              Phase 0 teaches essential movement patterns, mobility and warmup protocols.
            </p>
            <div className={styles.warningList}>
              <div className={styles.warningItem}>❌ Bad form and poor movement control</div>
              <div className={styles.warningItem}>❌ Higher risk of injury</div>
              <div className={styles.warningItem}>❌ Slower long-term progress</div>
            </div>
            <p className={styles.warningNote}>
              If you have prior gym experience and know your warmup routine, you may skip.
              <strong> By skipping, you accept full responsibility for any injury.</strong>
            </p>
            <div className={styles.warningButtons}>
              <button className={styles.warnBtnFollow}
                onClick={() => { setSkipWarning(null); navigate(`/workouts/phase/${skipWarning}`) }}>
                ✅ Follow Phase 0
              </button>
              <button className={styles.warnBtnSkip}
                onClick={() => { setSkipWarning(null); navigate('/workouts/phase/1') }}>
                Skip Phase 0 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}