import { useNavigate } from 'react-router-dom'
import { WORKOUT_DATA } from '../data/workoutData'
import styles from './Profile.module.css'

const RANKS = [
  { name: 'BRONZE', min: 0, color: '#CD7F32', icon: '🥉' },
  { name: 'SILVER', min: 500, color: '#C0C0C0', icon: '🥈' },
  { name: 'GOLD', min: 1500, color: '#FFD700', icon: '🥇' },
  { name: 'ELITE', min: 3000, color: '#a78bfa', icon: '👑' },
]

const ACHIEVEMENTS = [
  { icon: '⭐', name: 'First Rep', desc: 'Complete first session', check: (s) => s >= 1 },
  { icon: '🔥', name: '7 Sessions', desc: 'Complete 7 sessions', check: (s) => s >= 7 },
  { icon: '🎯', name: 'Phase Master', desc: 'Complete a phase at 80%', check: (s, p) => p >= 1 },
  { icon: '💎', name: 'Consistency', desc: 'Complete 20 sessions', check: (s) => s >= 20 },
  { icon: '👑', name: 'Elite Status', desc: 'Reach Elite rank', check: (s, p, xp) => xp >= 3000 },
  { icon: '🏆', name: 'All Phases', desc: 'Complete all 4 phases', check: (s, p) => p >= 4 },
]

function getXP() {
  let xp = 0
  ;[0, 1, 2, 3].forEach(ph => {
    const phase = WORKOUT_DATA[ph]
    Object.keys(phase.weeks).forEach(wk => {
      Object.keys(phase.weeks[wk].days).forEach(d => {
        if (localStorage.getItem(`ntf_day_${ph}_${wk}_${d}`) === 'done') {
          xp += ph === 0 ? 50 : ph === 1 ? 100 : ph === 2 ? 150 : 200
        }
      })
    })
  })
  return xp
}

export default function Profile() {
  const navigate = useNavigate()
  const name = localStorage.getItem('ntf_user_name') || 'Champion'
  const xp = getXP()
  const rank = RANKS.reduce((acc, r) => xp >= r.min ? r : acc, RANKS[0])
  const nextRank = RANKS[RANKS.indexOf(rank) + 1]

  let totalSessions = 0
  let phasesComplete = 0
  ;[0, 1, 2, 3].forEach(ph => {
    const phase = WORKOUT_DATA[ph]
    let phTotal = 0, phDone = 0
    Object.keys(phase.weeks).forEach(wk => {
      Object.keys(phase.weeks[wk].days).forEach(d => {
        phTotal++
        if (localStorage.getItem(`ntf_day_${ph}_${wk}_${d}`) === 'done') {
          phDone++
          totalSessions++
        }
      })
    })
    if (Math.round((phDone / phTotal) * 100) >= 80) phasesComplete++
  })

  const xpPct = nextRank ? Math.min(100, ((xp - rank.min) / (nextRank.min - rank.min)) * 100) : 100

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.topbar}>
        <h1 className={styles.title}>PROFILE</h1>
      </div>

      {/* PROFILE CARD */}
      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>{name.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h2 className={styles.profileName}>{name}</h2>
            <p className={styles.profileTagline}>Keep pushing your limits! 💪</p>
          </div>
        </div>

        <div className={styles.rankRow}>
          <span className={styles.rankIcon}>{rank.icon}</span>
          <div>
            <p className={styles.rankName} style={{ color: rank.color }}>{rank.name}</p>
            <p className={styles.rankXP}>{xp} / {nextRank ? nextRank.min : xp} XP</p>
          </div>
          <span className={styles.rankLevel}>Level {RANKS.indexOf(rank) + 1}</span>
        </div>

        <div className={styles.rankBar}>
          <div className={styles.rankBarFill} style={{ width: `${xpPct}%`, background: rank.color }} />
        </div>

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: '#D4AF37' }}>{totalSessions}</span>
            <span className={styles.statLbl}>Sessions Done</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: '#a78bfa' }}>{phasesComplete}</span>
            <span className={styles.statLbl}>Phases Mastered</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum} style={{ color: rank.color }}>{xp}</span>
            <span className={styles.statLbl}>Total XP</span>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <p className={styles.sectionLbl}>ACHIEVEMENTS</p>
      <div className={styles.achievementsGrid}>
        {ACHIEVEMENTS.map(a => {
          const unlocked = a.check(totalSessions, phasesComplete, xp)
          return (
            <div key={a.name} className={`${styles.achievement} ${!unlocked ? styles.locked : ''}`}>
              <div className={styles.achievementIcon} style={{
                background: unlocked ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.03)',
                borderColor: unlocked ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.07)',
              }}>
                <span style={{ fontSize: 26, filter: unlocked ? 'none' : 'grayscale(1) opacity(0.25)' }}>{a.icon}</span>
              </div>
              <p className={styles.achievementName} style={{ color: unlocked ? '#fff' : '#444' }}>{a.name}</p>
              <p className={styles.achievementDesc}>{a.desc}</p>
            </div>
          )
        })}
      </div>

      {/* QUICK LINKS */}
      <p className={styles.sectionLbl}>QUICK ACCESS</p>
      <div className={styles.menuList}>
        <button className={styles.menuItem} onClick={() => navigate('/workouts')}>
         
          <div className={styles.menuText}>
            <p className={styles.menuLabel}>My Workouts</p>
            <p className={styles.menuSub}>View phases and track sessions</p>
          </div>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} onClick={() => navigate('/fuel')}>
         
          <div className={styles.menuText}>
            <p className={styles.menuLabel}>Nutrition</p>
            <p className={styles.menuSub}>Track your daily food and macros</p>
          </div>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} onClick={() => navigate('/recovery')}>
          
          <div className={styles.menuText}>
            <p className={styles.menuLabel}>Recovery</p>
            <p className={styles.menuSub}>Check sleep, energy and soreness</p>
          </div>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} onClick={() => navigate('/progress')}>
         
          <div className={styles.menuText}>
            <p className={styles.menuLabel}>Progress</p>
            <p className={styles.menuSub}>View your rank and overall stats</p>
          </div>
          <span className={styles.menuArrow}>›</span>
        </button>
        <button className={styles.menuItem} style={{ borderColor: 'rgba(248,113,113,0.15)' }}
          onClick={() => { if (confirm('Reset all data and logout?')) { localStorage.clear(); navigate('/') } }}>
        
          <div className={styles.menuText}>
            <p className={styles.menuLabel} style={{ color: '#f87171' }}>Logout</p>
            <p className={styles.menuSub}>Clear data and go to login</p>
          </div>
          <span className={styles.menuArrow} style={{ color: '#f87171' }}>›</span>
        </button>
      </div>
    </div>
  )
}