import { useNavigate } from 'react-router-dom'
import styles from './Fuel.module.css'

export default function FuelPreference() {
  const navigate = useNavigate()

  function pick(pref) {
    localStorage.setItem('ntf_fuel_pref', pref)
    navigate('/fuel/foods')
  }

  return (
    <div className="page">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/home')}>←</button>
        <div>
          <h1 className={styles.title}>FOOD TYPE</h1>
          <p className={styles.stepLabel}>What do you eat?</p>
        </div>
      </div>
      <div className={styles.goalCards}>
        <button className={`${styles.goalCard} ${styles.vegCard} fade-up`} onClick={() => pick('veg')}>
          <span className={styles.goalEmoji}>🥦</span>
          <h2 className={styles.goalTitle}>Vegetarian</h2>
          <p className={styles.goalDesc}>Dal · Paneer · Oats · Soya · Rice</p>
        </button>
        <button className={`${styles.goalCard} ${styles.nonvegCard} fade-up-2`} onClick={() => pick('nonveg')}>
          <span className={styles.goalEmoji}>🍗</span>
          <h2 className={styles.goalTitle}>Non-Vegetarian</h2>
          <p className={styles.goalDesc}>Chicken · Eggs · Fish · Meat · Rice</p>
        </button>
      </div>
    </div>
  )
}