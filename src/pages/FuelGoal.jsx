import { useNavigate } from 'react-router-dom'
import styles from './Fuel.module.css'

export default function FuelGoal() {
  const navigate = useNavigate()

  function pick(goal) {
    const setup = JSON.parse(localStorage.getItem('ntf_fuel_setup') || '{}')
    const w = parseFloat(setup.weight) || 70
    const h = parseFloat(setup.height) || 170
    const a = parseInt(setup.age) || 22
    const isMale = (setup.gender || 'male') === 'male'

    // Step 1 — BMR using Mifflin-St Jeor
    const bmr = isMale
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161

    // Step 2 — TDEE (lightly active)
    const tdee = Math.round(bmr * 1.375)

    // Step 3 — Calories based on goal
    let kcal
    if (goal === 'loss') kcal = Math.round(tdee - 350)
    else if (goal === 'gain') kcal = Math.round(tdee + 350)
    else kcal = tdee

    // Step 4 — Protein based on goal and weight
    // Fat loss → 2.2g per kg (preserve muscle)
    // Maintain → 1.8g per kg (maintain muscle)
    // Gain     → 2.0g per kg (build muscle)
    let proteinPerKg
    if (goal === 'loss') proteinPerKg = 2.2
    else if (goal === 'maintain') proteinPerKg = 1.8
    else proteinPerKg = 2.0

    const protein = Math.round(w * proteinPerKg)
    const proteinCals = protein * 4

    // Step 5 — Fat (25% of total calories)
    const fat = Math.round((kcal * 0.25) / 9)
    const fatCals = fat * 9

    // Step 6 — Carbs get the remaining calories
    const remainingCals = kcal - proteinCals - fatCals
    const carbs = Math.max(0, Math.round(remainingCals / 4))

    // Step 7 — Fiber (based on goal)
    const fiber = goal === 'loss' ? 35 : goal === 'maintain' ? 30 : 28

    // Step 8 — BMI
    const bmi = (w / ((h / 100) ** 2)).toFixed(1)

    // Verify totals add up
    const totalCals = protein * 4 + fat * 9 + carbs * 4

    localStorage.setItem('ntf_fuel_goal', goal)
    localStorage.setItem('ntf_fuel_targets', JSON.stringify({
      kcal,
      tdee,
      protein,
      fat,
      carbs,
      fiber,
      bmi,
      totalCals,
      proteinPerKg,
      proteinMin: Math.round(protein * 0.9),
      proteinMax: Math.round(protein * 1.1),
      carbsMin: Math.round(carbs * 0.9),
      carbsMax: Math.round(carbs * 1.1),
      fatMin: Math.round(fat * 0.9),
      fatMax: Math.round(fat * 1.1),
    }))

    navigate('/fuel/target')
  }

  return (
    <div className="page">
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate('/fuel/setup')}>←</button>
        <div>
          <p className={styles.stepLabel}>STEP 2 OF 3</p>
          <h1 className={styles.title}>YOUR GOAL</h1>
        </div>
      </div>

      <p className={styles.setupNote}>
        Choose your goal — we calculate your exact macros based on your body weight, not generic values.
      </p>

      <div className={styles.goalCards}>
        <button className={`${styles.goalCard} ${styles.lossCard} fade-up`} onClick={() => pick('loss')}>
          <div className={styles.goalCardLeft}>
            <span className={styles.goalEmoji}>🔥</span>
            <div>
              <h2 className={styles.goalTitle}>Fat Loss</h2>
              <p className={styles.goalDesc}>Caloric deficit · Burn fat · Preserve muscle</p>
              <p className={styles.goalCalNote}>Protein: 2.2g per kg bodyweight</p>
            </div>
          </div>
          <span className={styles.goalArrow}>→</span>
        </button>

        <button className={`${styles.goalCard} ${styles.maintainCard} fade-up-2`} onClick={() => pick('maintain')}>
          <div className={styles.goalCardLeft}>
            <span className={styles.goalEmoji}>⚖️</span>
            <div>
              <h2 className={styles.goalTitle}>Maintenance</h2>
              <p className={styles.goalDesc}>Maintain weight · Recomp · Build strength</p>
              <p className={styles.goalCalNote}>Protein: 1.8g per kg bodyweight</p>
            </div>
          </div>
          <span className={styles.goalArrow}>→</span>
        </button>

        <button className={`${styles.goalCard} ${styles.gainCard} fade-up-3`} onClick={() => pick('gain')}>
          <div className={styles.goalCardLeft}>
            <span className={styles.goalEmoji}>💪</span>
            <div>
              <h2 className={styles.goalTitle}>Muscle Gain (Bulk)</h2>
              <p className={styles.goalDesc}>Caloric surplus · Build muscle · Grow</p>
              <p className={styles.goalCalNote}>Protein: 2.0g per kg bodyweight</p>
            </div>
          </div>
          <span className={styles.goalArrow}>→</span>
        </button>
      </div>
    </div>
  )
}