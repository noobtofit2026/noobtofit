import { useNavigate, useLocation } from 'react-router-dom'
import styles from './BottomNav.module.css'

function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
        fill={active ? '#D4AF37' : 'none'}
        stroke={active ? '#D4AF37' : '#ffffff'}
        strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  )
}

function WorkoutIcon({ active }) {
  const color = active ? '#D4AF37' : '#ffffff'

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 80 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* LEFT CAP */}
      <rect x="2" y="24" width="5" height="16" rx="2.5" fill={color} />

      {/* LEFT OUTER PLATE */}
      <rect x="8" y="14" width="10" height="36" rx="5" fill={color} />

      {/* LEFT INNER PLATE */}
      <rect x="20" y="6" width="12" height="52" rx="6" fill={color} />

      {/* HANDLE */}
      <rect x="32" y="29" width="16" height="6" rx="3" fill={color} />

      {/* RIGHT INNER PLATE */}
      <rect x="48" y="6" width="12" height="52" rx="6" fill={color} />

      {/* RIGHT OUTER PLATE */}
      <rect x="62" y="14" width="10" height="36" rx="5" fill={color} />

      {/* RIGHT CAP */}
      <rect x="73" y="24" width="5" height="16" rx="2.5" fill={color} />
    </svg>
  )
}

function NutritionIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Bowl body */}
      <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"
        fill={active ? 'rgba(74,222,128,0.2)' : 'none'}
        stroke={active ? '#D4AF37' : '#ffffff'}
        strokeWidth="1.8"/>
      {/* Base */}
      <path d="M7 21h10"
        stroke={active ? '#D4AF37' : '#ffffff'}
        strokeWidth="1.8"/>
      {/* Steam 1 */}
      <path d="M6.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"
        stroke={active ? '#D4AF37' : '#ffffff'}
        strokeWidth="1.5"/>
      {/* Steam 2 */}
      <path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"
        stroke={active ? '#D4AF37' : '#ffffff'}
        strokeWidth="1.5"/>
      {/* Steam 3 */}
      <path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"
        stroke={active ? '#D4AF37' : '#ffffff'}
        strokeWidth="1.5"/>
    </svg>
  )
}

function RecoveryIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 21C12 21 4 15.5 4 9.5C4 7 5.8 5 8 5C9.5 5 11 5.8 12 7C13 5.8 14.5 5 16 5C18.2 5 20 7 20 9.5C20 15.5 12 21 12 21Z"
        fill={active ? 'rgba(248,113,113,0.2)' : 'none'}
        stroke={active ? '#D4AF37' : '#ffffff'} strokeWidth="1.8"/>
    </svg>
  )
}

function LogIcon({ active }) {
  const color = active ? '#D4AF37' : '#ffffff'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="14" height="18" rx="2.5"
        fill="none" stroke={color} strokeWidth="1.8"/>
      <path d="M9 3.5V2.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M15 3.5V2.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M8 9.5L10 11.5L15 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 15.5H16" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M8 18.5H13" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function ProfileIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4"
        fill={active ? 'rgba(167,139,250,0.2)' : 'none'}
        stroke={active ? '#D4AF37' : '#ffffff'} strokeWidth="1.8"/>
      <path d="M4 20C4 17 7.5 14.5 12 14.5C16.5 14.5 20 17 20 20"
        stroke={active ? '#D4AF37' : '#ffffff'} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

const NAV = [
  { path: '/home', label: 'Home', Icon: HomeIcon },
  { path: '/workouts', label: 'Workouts', Icon: WorkoutIcon },
  { path: '/fuel', label: 'Nutrition', Icon: NutritionIcon },
  { path: '/recovery', label: 'Recovery', Icon: RecoveryIcon },
  { path: '/log', label: 'Log', Icon: LogIcon },
  { path: '/profile', label: 'Profile', Icon: ProfileIcon },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  function isActive(path) {
    if (path === '/fuel') return location.pathname.startsWith('/fuel')
    if (path === '/workouts') return location.pathname.startsWith('/workouts')
    return location.pathname === path
  }

  return (
    <div className={styles.nav}>
      {NAV.map(({ path, label, Icon }) => {
        const active = isActive(path)
        return (
          <button key={path} className={`${styles.navItem} ${active ? styles.active : ''}`}
            onClick={() => navigate(path)}>
            <div className={styles.iconWrap}>
              <Icon active={active} />
            </div>
            <span className={styles.navLabel} style={{ color: active ? '#D4AF37' : '#ffffff' }}>
              {label}
            </span>
            {active && <div className={styles.activeDot} />}
          </button>
        )
      })}
    </div>
  )
}