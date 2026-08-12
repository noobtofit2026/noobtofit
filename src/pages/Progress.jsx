import { useNavigate } from 'react-router-dom'
import { WORKOUT_DATA } from '../data/workoutData'
import styles from './Progress.module.css'

const PHASE_TAGLINES = {
  0: 'Movement mastery — the foundation of everything.',
  1: 'Full body strength — you started the game.',
  2: 'Upper Lower split — balance is your weapon.',
  3: 'Push Pull Legs — the champion protocol.',
}

const PHASE_ICONS = { 0: '🧘', 1: '🌱', 2: '⚡', 3: '🔥' }

const RANKS = [
  { name: 'ROOKIE', min: 0, color: '#888', desc: 'Just getting started' },
  { name: 'FIGHTER', min: 20, color: '#60a5fa', desc: 'Building momentum' },
  { name: 'WARRIOR', min: 40, color: '#D4AF37', desc: 'Showing up consistently' },
  { name: 'BEAST', min: 70, color: '#f97316', desc: 'Pushing limits daily' },
  { name: 'ELITE', min: 90, color: '#4ade80', desc: 'Nothing can stop you' },
]

export default function Progress() {
  const navigate = useNavigate()
  const name = localStorage.getItem('ntf_user_name') || 'Champion'

  const phases = [0, 1, 2, 3]
  let totalSessions = 0, completedSessions = 0
  const phaseStats = []

  phases.forEach(ph => {
    const phase = WORKOUT_DATA[ph]
    let phTotal = 0, phDone = 0
    Object.keys(phase.weeks).forEach(wk => {
      Object.keys(phase.weeks[wk].days).forEach(d => {
        phTotal++
        totalSessions++
        if (localStorage.getItem(`ntf_day_${ph}_${wk}_${d}`) === 'done') {
          phDone++
          completedSessions++
        }
      })
    })
    phaseStats.push({
      ph,
      title: phase.title,
      subtitle: phase.subtitle,
      color: phase.color,
      total: phTotal,
      done: phDone,
      pct: Math.round((phDone / phTotal) * 100)
    })
  })

  const overallPct = Math.round((completedSessions / totalSessions) * 100)
  const currentRank = RANKS.reduce((acc, r) => overallPct >= r.min ? r : acc, RANKS[0])
  const nextRank = RANKS[RANKS.indexOf(currentRank) + 1]

  const todayIntake = JSON.parse(localStorage.getItem('ntf_intake_' + new Date().toDateString()) || '[]')
  const todayKcal = todayIntake.reduce((a, f) => a + (f.kcal || 0), 0)
  const todayProtein = todayIntake.reduce((a, f) => a + (f.protein || 0), 0)
  const targets = JSON.parse(localStorage.getItem('ntf_fuel_targets') || '{}')

  const QUOTES = [
    '"The body achieves what the mind believes."',
    '"No pain, no gain. No guts, no glory."',
    '"Push yourself because no one else will do it for you."',
    '"Sweat is just fat crying."',
    '"Your only limit is you."',
  ]
  const todayQuote = QUOTES[new Date().getDay() % QUOTES.length]

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/home')}>←</button>
        <div>
          <p className={styles.eyebrow}>YOUR STATS</p>
          <h1 className={styles.title}>PROGRESS</h1>
        </div>
      </div>

      {/* RANK HERO CARD */}
      <div className={styles.rankCard}>
        <div className={styles.rankCardTop}>
          <div className={styles.rankCardLeft}>
            <p className={styles.rankCardName}>{name}</p>
            <p className={styles.rankCardSub}>Noob to Fit · Phase 01</p>
            <div className={styles.rankBadge} style={{ borderColor: currentRank.color + '50', background: currentRank.color + '10' }}>
              <span className={styles.rankBadgeIcon}>⚡</span>
              <span className={styles.rankBadgeName} style={{ color: currentRank.color }}>{currentRank.name}</span>
            </div>
            <p className={styles.rankDesc} style={{ color: currentRank.color }}>{currentRank.desc}</p>
          </div>
          <div className={styles.rankCircleWrap}>
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"/>
              <circle cx="45" cy="45" r="38" fill="none" stroke={currentRank.color} strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 38}`}
                strokeDashoffset={`${2 * Math.PI * 38 * (1 - overallPct / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 45 45)"
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className={styles.rankCircleText}>
              <span className={styles.rankPct} style={{ color: currentRank.color }}>{overallPct}%</span>
            </div>
          </div>
        </div>

        {nextRank && (
          <div className={styles.nextRankRow}>
            <span className={styles.nextRankLabel}>Next rank:</span>
            <span className={styles.nextRankName} style={{ color: nextRank.color }}>
              {nextRank.name} at {nextRank.min}%
            </span>
            <div className={styles.nextRankBar}>
              <div className={styles.nextRankFill} style={{ width: `${Math.min(100, ((overallPct - currentRank.min) / (nextRank.min - currentRank.min)) * 100)}%`, background: nextRank.color }} />
            </div>
          </div>
        )}

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: currentRank.color }}>{completedSessions}</span>
            <span className={styles.statLbl}>Sessions Done</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: '#60a5fa' }}>{phaseStats.filter(p => p.pct >= 80).length}</span>
            <span className={styles.statLbl}>Phases Mastered</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: '#4ade80' }}>{phaseStats.reduce((a, p) => a + p.done, 0) > 0 ? '🔥' : '—'}</span>
            <span className={styles.statLbl}>On Fire</span>
          </div>
        </div>
      </div>

      <p className={styles.sectionLbl}>PHASE BREAKDOWN</p>

      <div className={styles.phaseList}>
        {phaseStats.map(ps => (
          <div key={ps.ph} className={styles.phaseCard} style={{ borderColor: ps.color + '20' }}
            onClick={() => navigate(`/workouts/phase/${ps.ph}`)}>
            <div className={styles.phaseCardLeft}>
              <span className={styles.phaseCardIcon}>{PHASE_ICONS[ps.ph]}</span>
              <div>
                <p className={styles.phaseCardTitle} style={{ color: ps.color }}>{ps.title}</p>
                <p className={styles.phaseCardTagline}>{PHASE_TAGLINES[ps.ph]}</p>
              </div>
            </div>
            <div className={styles.phaseCardRight}>
              <span className={styles.phaseCardPct} style={{ color: ps.color }}>{ps.pct}%</span>
              {ps.pct >= 80 && <span className={styles.phaseMastered}>✓</span>}
            </div>
          </div>
        ))}
      </div>

      <p className={styles.sectionLbl}>TODAY'S NUTRITION</p>

      <div className={styles.nutritionCard}>
        {targets.kcal ? (
          <>
            <div className={styles.nutRow}>
              <div className={styles.nutItem}>
                <span className={styles.nutNum} style={{ color: '#D4AF37' }}>{todayKcal}</span>
                <span className={styles.nutLbl}>Calories</span>
                <span className={styles.nutTarget}>of {targets.kcal} kcal</span>
              </div>
              <div className={styles.nutDiv} />
              <div className={styles.nutItem}>
                <span className={styles.nutNum} style={{ color: '#60a5fa' }}>{Math.round(todayProtein)}g</span>
                <span className={styles.nutLbl}>Protein</span>
                <span className={styles.nutTarget}>of {targets.protein}g</span>
              </div>
              <div className={styles.nutDiv} />
              <div className={styles.nutItem}>
                <span className={styles.nutNum} style={{ color: '#4ade80' }}>{todayIntake.length}</span>
                <span className={styles.nutLbl}>Foods</span>
                <span className={styles.nutTarget}>logged today</span>
              </div>
            </div>
            <div className={styles.nutBars}>
              <div className={styles.nutBarRow}>
                <span className={styles.nutBarLbl}>Calories</span>
                <div className={styles.nutBarBg}>
                  <div className={styles.nutBarFill} style={{ width: `${Math.min(100, (todayKcal / targets.kcal) * 100)}%`, background: '#D4AF37' }} />
                </div>
                <span className={styles.nutBarPct}>{Math.min(100, Math.round((todayKcal / targets.kcal) * 100))}%</span>
              </div>
              <div className={styles.nutBarRow}>
                <span className={styles.nutBarLbl}>Protein</span>
                <div className={styles.nutBarBg}>
                  <div className={styles.nutBarFill} style={{ width: `${Math.min(100, (todayProtein / targets.protein) * 100)}%`, background: '#60a5fa' }} />
                </div>
                <span className={styles.nutBarPct}>{Math.min(100, Math.round((todayProtein / targets.protein) * 100))}%</span>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.nutEmpty}>
            <p>Set up your fuel goals to track nutrition</p>
            <button className={styles.nutSetupBtn} onClick={() => navigate('/fuel')}>Setup Fuel →</button>
          </div>
        )}
      </div>

      <div className={styles.quoteCard}>
        <p className={styles.quoteMark}>"</p>
        <p className={styles.quoteText}>{todayQuote.replace(/"/g, '')}</p>
      </div>
    </div>
  )
}