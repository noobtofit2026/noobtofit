import { useNavigate, useParams } from 'react-router-dom'
import { WORKOUT_DATA } from '../data/workoutData'
import styles from './WeekPage.module.css'

export default function WeekPage() {
  const { lvl, wk } = useParams()
  const navigate = useNavigate()
  const level = WORKOUT_DATA[parseInt(lvl)]
  const week = level?.weeks[parseInt(wk)]
  if (!week) return null

  const days = Object.keys(week.days).map(Number)
  const completed = days.filter(d => localStorage.getItem(`ntf_day_${lvl}_${wk}_${d}`) === 'done')
  const pct = Math.round((completed.length / days.length) * 100)
  const allWeeks = Object.keys(level.weeks).map(Number)

  const colors = { 1: '#D4AF37', 2: '#60a5fa', 3: '#f97316' }
  const color = colors[parseInt(lvl)] || '#D4AF37'

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/workouts')}>←</button>
        <div>
          <p className={styles.eyebrow} style={{ color }}>LEVEL {lvl.padStart(2, '0')}</p>
          <h1 className={styles.title}>{level.title.toUpperCase()}</h1>
        </div>
      </div>

      {allWeeks.length > 1 && (
        <div className={styles.weekTabs}>
          {allWeeks.map(w => (
            <button
              key={w}
              className={`${styles.weekTab} ${parseInt(wk) === w ? styles.weekTabActive : ''}`}
              style={parseInt(wk) === w ? { borderColor: color, color } : {}}
              onClick={() => navigate(`/workouts/level/${lvl}/week/${w}`)}
            >
              Week {w}
            </button>
          ))}
        </div>
      )}

      <div className={styles.progressCard} style={{ '--color': color }}>
        <div className={styles.progressCard__before} style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
        <div className={styles.progressTop}>
          <div>
            <p className={styles.progressWeek}>{week.title}</p>
            <p className={styles.progressSub}>{completed.length} of {days.length} days done</p>
          </div>
          <div className={styles.progressCircle} style={{ borderColor: color + '40' }}>
            <span className={styles.progressPct} style={{ color }}>{pct}%</span>
          </div>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }} />
        </div>
        {pct >= 80 && (
          <div className={styles.weekComplete} style={{ borderColor: '#4ade8040', color: '#4ade80' }}>
            🎉 Week Complete!
          </div>
        )}
      </div>

      <p className={styles.sectionLbl}>DAILY WORKOUTS</p>

      <div className={styles.daysList}>
        {days.map((d, i) => {
          const isDone = localStorage.getItem(`ntf_day_${lvl}_${wk}_${d}`) === 'done'
          const dayData = week.days[d]
          return (
            <button
              key={d}
              className={`${styles.dayCard} ${isDone ? styles.dayDone : ''}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => navigate(`/workouts/level/${lvl}/week/${wk}/day/${d}`)}
            >
              <div className={styles.dayCardGlass} />
              <div className={styles.dayLeft}>
                <div className={styles.dayBadge} style={{
                  background: isDone ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.04)',
                  borderColor: isDone ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.08)',
                  color: isDone ? '#4ade80' : color
                }}>
                  {isDone ? '✓' : `D${d}`}
                </div>
                <div>
                  <p className={styles.dayTitle}>Day {d}</p>
                  <p className={styles.daySubtitle}>{dayData.title}</p>
                </div>
              </div>
              <div className={styles.dayRight}>
                <span className={styles.exCount}>{dayData.exercises.length} exercises</span>
                <span className={styles.chevron} style={{ color: isDone ? '#4ade80' : color }}>→</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}