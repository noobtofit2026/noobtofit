import { useNavigate, useParams } from 'react-router-dom'
import { WORKOUT_DATA } from '../data/workoutData'
import styles from './PhasePage.module.css'

const TYPE_ICONS = {
  'Full Body': '💪',
  'Upper': '🏋️',
  'Lower': '🦵',
  'Push': '⬆️',
  'Pull': '⬇️',
  'Legs': '🦵',
  'Rest': '😴',
  'Mobility': '🧘',
  'Warmup': '🔥',
}

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

export default function PhasePage() {
  const { phase } = useParams()
  const navigate = useNavigate()
  const phaseData = WORKOUT_DATA[parseInt(phase)]
  if (!phaseData) return null

  const weeks = Object.keys(phaseData.weeks).map(Number)
  const color = phaseData.color

  function getDayProgress(wk, d) {
    return localStorage.getItem(`ntf_day_${phase}_${wk}_${d}`) === 'done'
  }

  function getWeekProgress(wk) {
    const days = Object.keys(phaseData.weeks[wk].days).map(Number)
    const done = days.filter(d => getDayProgress(wk, d)).length
    return { done, total: days.length, pct: Math.round((done / days.length) * 100) }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} style={{ background: `radial-gradient(ellipse 100% 50% at 50% -10%, ${color}15 0%, transparent 55%)` }} />

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/workouts')}>←</button>
        <div>
          <p className={styles.eyebrow} style={{ color }}>{phaseData.title}</p>
          <h1 className={styles.title}>{phaseData.subtitle}</h1>
        </div>
      </div>

      <div className={styles.phaseCard} style={{ borderColor: color + '25' }}>
        <p className={styles.phaseDuration} style={{ color }}>{phaseData.duration}</p>
        <p className={styles.phaseDesc}>{phaseData.description}</p>
      </div>

      {weeks.map(wk => {
        const week = phaseData.weeks[wk]
        const { done, total, pct } = getWeekProgress(wk)
        const days = Object.keys(week.days).map(Number)

        return (
          <div key={wk} className={styles.weekSection}>
            <div className={styles.weekHeader}>
              <h2 className={styles.weekTitle}>{week.title}</h2>
              <div className={styles.weekProgress}>
                <span style={{ color }}>{done}/{total}</span>
                <span className={styles.weekPct}> days</span>
              </div>
            </div>

            <div className={styles.weekBar}>
              <div className={styles.weekBarFill} style={{ width: `${pct}%`, background: color }} />
            </div>

            <div className={styles.daysList}>
              {days.map(d => {
                const day = week.days[d]
                const isDone = getDayProgress(wk, d)
                const typeColor = TYPE_COLORS[day.type] || '#888'
                const typeIcon = TYPE_ICONS[day.type] || '💪'

                return (
                  <button
                    key={d}
                    className={`${styles.dayCard} ${isDone ? styles.dayDone : ''}`}
                    onClick={() => navigate(`/workouts/phase/${phase}/week/${wk}/day/${d}`)}
                  >
                    <div className={styles.dayCardGlass} />
                    <div className={styles.dayLeft}>
                      <div className={styles.dayIcon} style={{ background: typeColor + '15', borderColor: typeColor + '30', color: typeColor }}>
                        {isDone ? '✓' : typeIcon}
                      </div>
                      <div>
                        <div className={styles.dayTypeBadge} style={{ color: typeColor }}>{day.type}</div>
                        <p className={styles.dayTitle}>{day.title}</p>
                        <p className={styles.dayMeta}>{day.exercises.length} exercises</p>
                      </div>
                    </div>
                    <span className={styles.dayArrow} style={{ color: isDone ? '#4ade80' : typeColor }}>
                      {isDone ? '✓' : '→'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}