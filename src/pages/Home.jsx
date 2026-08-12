import { useNavigate } from 'react-router-dom'
import { WORKOUT_DATA } from '../data/workoutData'
import styles from './Home.module.css'

const RANKS = [
  { name: 'BRONZE', color: '#CD7F32', phase: 'Mobility\nMastery', xp: '0 - 499 XP' },
  { name: 'SILVER', color: '#C0C0C0', phase: 'Full Body\nTraining', xp: '500 - 1499 XP' },
  { name: 'GOLD', color: '#FFD700', phase: 'Upper / Lower\nSplit', xp: '1500 - 2999 XP' },
  { name: 'ELITE', color: '#a78bfa', phase: 'Push Pull\nLegs', xp: '3000+ XP' },
]

const RANK_MINS = [0, 500, 1500, 3000]

function DumbbellIcon({ color = '#D4AF37', size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="24" width="5" height="16" rx="2.5" fill={color} />
      <rect x="8" y="14" width="10" height="36" rx="5" fill={color} />
      <rect x="20" y="6" width="12" height="52" rx="6" fill={color} />
      <rect x="32" y="29" width="16" height="6" rx="3" fill={color} />
      <rect x="48" y="6" width="12" height="52" rx="6" fill={color} />
      <rect x="62" y="14" width="10" height="36" rx="5" fill={color} />
      <rect x="73" y="24" width="5" height="16" rx="2.5" fill={color} />
    </svg>
  )
}

function ShieldIcon({ color, size = 30, active = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 5.5V11C4 15.55 7.41 19.74 12 21C16.59 19.74 20 15.55 20 11V5.5L12 2Z"
        fill={active ? color + '25' : 'rgba(255,255,255,0.03)'}
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <polygon points="12,7 13.5,10.5 17,10.5 14.5,12.5 15.5,16 12,14 8.5,16 9.5,12.5 7,10.5 10.5,10.5"
        fill={color} opacity="0.9"/>
    </svg>
  )
}

function CrownShieldIcon({ color, size = 30, active = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 5.5V11C4 15.55 7.41 19.74 12 21C16.59 19.74 20 15.55 20 11V5.5L12 2Z"
        fill={active ? color + '25' : 'rgba(255,255,255,0.03)'}
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 14H16V15.5H8V14Z" fill={color}/>
      <path d="M8 14L9.5 9.5L12 12L14.5 9.5L16 14H8Z" fill={color} opacity="0.9"/>
    </svg>
  )
}

function RankIcon({ index, color, size = 30, active = false }) {
  if (index === 3) return <CrownShieldIcon color={color} size={size} active={active} />
  return <ShieldIcon color={color} size={size} active={active} />
}

function getXP() {
  let xp = 0
  ;[0,1,2,3].forEach(ph => {
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

export default function Home() {
  const navigate = useNavigate()
  const name = localStorage.getItem('ntf_user_name') || 'Champion'
  const xp = getXP()
  const rankIdx = RANK_MINS.reduce((acc, min, i) => xp >= min ? i : acc, 0)
  const rank = RANKS[rankIdx]
  const nextRank = RANKS[rankIdx + 1]
  const xpPct = nextRank
    ? Math.min(100, ((xp - RANK_MINS[rankIdx]) / (RANK_MINS[rankIdx+1] - RANK_MINS[rankIdx])) * 100)
    : 100

  const totalSessions = [0,1,2,3].reduce((acc, ph) => {
    const phase = WORKOUT_DATA[ph]
    let done = 0
    Object.keys(phase.weeks).forEach(wk => {
      Object.keys(phase.weeks[wk].days).forEach(d => {
        if (localStorage.getItem(`ntf_day_${ph}_${wk}_${d}`) === 'done') done++
      })
    })
    return acc + done
  }, 0)

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      {/* NAVBAR */}
      <div className={styles.navbar}>
        <div className={styles.navLogo}>
          <img
            src="/logo.png"
            alt="Noob To Fit"
            className={styles.logoImg}
          />
          <div className={styles.logoText}>
            <p className={styles.navTop}>NOOB</p>
            <p className={styles.navBot}>TO FIT</p>
          </div>
        </div>
        <button className={styles.hamburger} onClick={() => navigate('/profile')}>
          <span /><span /><span />
        </button>
      </div>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEye}>YOUR JOURNEY STARTS HERE</p>
          <h1 className={styles.heroH1}>
            TRANSFORM FROM<br />BEGINNER TO<br />
            <span className={styles.heroGold}>CONFIDENT LIFTER</span>
          </h1>
          <p className={styles.heroSub}>Train smarter. Track progress.<br />Level up your physique.</p>
        </div>

        {/* RANK CARD */}
        <div className={styles.rankCard}>
          <p className={styles.rankCardEye}>👑 CURRENT RANK</p>
          <div className={styles.rankCardMain}>
            <RankIcon index={rankIdx} color={rank.color} size={36} active />
            <span className={styles.rankCardName} style={{ color: rank.color }}>{rank.name}</span>
          </div>
          <p className={styles.rankCardXP}>{xp} / {nextRank ? RANK_MINS[rankIdx+1] : xp} XP</p>
          <div className={styles.rankCardBar}>
            <div className={styles.rankCardBarFill} style={{ width: `${xpPct}%`, background: `linear-gradient(90deg, ${rank.color}, ${rank.color}cc)` }} />
          </div>
          <div className={styles.rankCardStats}>
            <div className={styles.rankCardStat}>
              <span className={styles.rcsNum}>🔥 {totalSessions}</span>
              <span className={styles.rcsLbl}>DAY STREAK</span>
            </div>
            <div className={styles.rankCardStat}>
              <span className={styles.rcsNum}>⭐ {xp}</span>
              <span className={styles.rcsLbl}>TOTAL XP</span>
            </div>
          </div>
        </div>
      </div>

     

      {/* EVERYTHING YOU NEED */}
      <div className={styles.section}>
        <div className={styles.dividerRow}>
          <div className={styles.dividerLine} />
          <p className={styles.dividerText}>EVERYTHING YOU NEED</p>
          <div className={styles.dividerLine} />
        </div>
        <div className={styles.needGrid}>

          <div className={styles.needItem} onClick={() => navigate('/workouts')}>
            <div className={styles.needIconWrap} style={{ background: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.25)' }}>
              <DumbbellIcon color="#D4AF37" size={26} />
            </div>
            <div className={styles.needText}>
              <p className={styles.needTitle} style={{ color: '#D4AF37' }}>SMART WORKOUTS</p>
              <p className={styles.needDesc}>Follow structured workouts with step-by-step guidance.</p>
            </div>
            <span className={styles.needArrow}>›</span>
          </div>

          <div className={styles.needItem} onClick={() => navigate('/fuel')}>
            <div className={styles.needIconWrap} style={{ background: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.25)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/>
                <path d="M7 21h10"/>
                <path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/>
                <path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/>
                <path d="M6.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/>
              </svg>
            </div>
            <div className={styles.needText}>
              <p className={styles.needTitle} style={{ color: '#4ade80' }}>NUTRITION TRACKING</p>
              <p className={styles.needDesc}>Track calories, macros and meals easily.</p>
            </div>
            <span className={styles.needArrow}>›</span>
          </div>

          <div className={styles.needItem} onClick={() => navigate('/recovery')}>
            <div className={styles.needIconWrap} style={{ background: 'rgba(248,113,113,0.1)', borderColor: 'rgba(248,113,113,0.25)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 21C12 21 4 15 4 9C4 6.5 6 4 8.5 4C10 4 11.5 4.8 12 6C12.5 4.8 14 4 15.5 4C18 4 20 6.5 20 9C20 15 12 21 12 21Z" stroke="#f87171" strokeWidth="1.5" fill="rgba(248,113,113,0.15)"/>
                <path d="M7 9H9L11 12L13 7L15 10H17" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.needText}>
              <p className={styles.needTitle} style={{ color: '#f87171' }}>RECOVERY SYSTEM</p>
              <p className={styles.needDesc}>Monitor sleep, soreness and recovery score.</p>
            </div>
            <span className={styles.needArrow}>›</span>
          </div>

          <div className={styles.needItem} onClick={() => navigate('/profile')}>
            <div className={styles.needIconWrap} style={{ background: 'rgba(167,139,250,0.1)', borderColor: 'rgba(167,139,250,0.25)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L14.5 8.5L21 9.5L16.5 14L17.5 20.5L12 17.5L6.5 20.5L7.5 14L3 9.5L9.5 8.5L12 3Z" stroke="#a78bfa" strokeWidth="1.5" fill="rgba(167,139,250,0.15)" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.needText}>
              <p className={styles.needTitle} style={{ color: '#a78bfa' }}>GAMIFIED PROGRESSION</p>
              <p className={styles.needDesc}>Earn XP, build streaks, unlock ranks & badges.</p>
            </div>
            <span className={styles.needArrow}>›</span>
          </div>

        </div>
      </div>

      {/* TRANSFORMATION ROADMAP */}
      <div className={styles.section}>
        <div className={styles.dividerRow}>
          <div className={styles.dividerLine} />
          <p className={styles.dividerText}>YOUR TRANSFORMATION ROADMAP</p>
          <div className={styles.dividerLine} />
        </div>
        <div className={styles.roadmap}>
          {[
            { rank: 'BRONZE', color: '#CD7F32', weeks: 'Weeks 1', desc: 'Learn movement fundamentals.', i: 0 },
            { rank: 'SILVER', color: '#C0C0C0', weeks: 'Weeks 2-3', desc: 'Follow full body workouts.', i: 1 },
            { rank: 'GOLD', color: '#FFD700', weeks: 'Weeks 4-5', desc: 'Advance with upper / lower split.', i: 2 },
            { rank: 'ELITE', color: '#a78bfa', weeks: 'Weeks 6-12', desc: 'Master PPL training and become elite.', i: 3 },
          ].map((r, idx, arr) => (
            <div key={r.rank} className={styles.roadmapItem}>
              <div className={styles.roadmapTop}>
                <div className={styles.roadmapIconCircle} style={{ borderColor: r.color + '60', background: r.color + '12' }}>
                  <RankIcon index={r.i} color={r.color} size={24} />
                </div>
                {idx < arr.length - 1 && <div className={styles.roadmapArrow}>→</div>}
              </div>
              <p className={styles.roadmapRank} style={{ color: r.color }}>{r.rank}</p>
              <p className={styles.roadmapWeeks}>{r.weeks}</p>
              <p className={styles.roadmapDesc}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className={styles.cta}>
        <div className={styles.ctaBg} />
        <h2 className={styles.ctaTitle}>
          YOUR JOURNEY STARTS <span style={{ color: '#D4AF37' }}>TODAY</span>
        </h2>
        <p className={styles.ctaSub}>Take the first step. Be consistent. Transform for life.</p>
        
      </div>

    </div>
  )
}