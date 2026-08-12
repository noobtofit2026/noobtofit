import { useNavigate } from 'react-router-dom'
import styles from './FuelTarget.module.css'

export default function FuelTarget() {
  const navigate = useNavigate()
  const t = JSON.parse(localStorage.getItem('ntf_fuel_targets') || '{}')
  const goal = localStorage.getItem('ntf_fuel_goal')
  const name = localStorage.getItem('ntf_user_name') || 'Champion'
  const setup = JSON.parse(localStorage.getItem('ntf_fuel_setup') || '{}')

  const goalLabel = goal === 'loss' ? '🔥 Fat Loss' : goal === 'maintain' ? '⚖️ Maintenance' : '💪 Muscle Gain'

  const macros = [
    {
      label: 'Calories',
      value: `${t.kcal}`,
      unit: 'kcal / day',
      range: `TDEE: ${t.tdee} kcal`,
      color: '#D4AF37',
      icon: '🔥',
      desc: goal === 'loss'
        ? `${t.tdee} - 350 deficit`
        : goal === 'gain'
        ? `${t.tdee} + 350 surplus`
        : 'Your exact maintenance',
    },
    {
      label: 'Protein',
      value: `${t.proteinMin}–${t.proteinMax}`,
      unit: 'g / day',
      range: `${t.proteinPerKg}g × ${setup.weight}kg`,
      color: '#60a5fa',
      icon: '🥩',
      desc: `Based on your ${setup.weight}kg bodyweight`,
    },
    {
      label: 'Carbs',
      value: `${t.carbsMin}–${t.carbsMax}`,
      unit: 'g / day',
      range: `~${t.carbs}g target`,
      color: '#a78bfa',
      icon: '🍚',
      desc: 'Remaining calories after protein + fat',
    },
    {
      label: 'Fats',
      value: `${t.fatMin}–${t.fatMax}`,
      unit: 'g / day',
      range: `25% of ${t.kcal} kcal`,
      color: '#f97316',
      icon: '🥑',
      desc: 'Hormones, joints and brain health',
    },
    {
      label: 'Fiber',
      value: `${t.fiber}+`,
      unit: 'g / day',
      range: 'Minimum daily',
      color: '#4ade80',
      icon: '🥦',
      desc: 'Digestion, gut health and fullness',
    },
  ]

  const totalCheck = t.protein * 4 + t.fat * 9 + t.carbs * 4

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/fuel/goal')}>←</button>
        <div>
          <p className={styles.stepLabel}>STEP 3 OF 3</p>
          <h1 className={styles.title}>YOUR TARGETS</h1>
        </div>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryTop}>
          <div>
            <p className={styles.summaryName}>Hey {name}! 👋</p>
            <p className={styles.summarySub}>Your personalized daily nutrition targets</p>
          </div>
          <div className={styles.goalBadge}>{goalLabel}</div>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statVal}>{setup.weight}kg</span>
            <span className={styles.statLbl}>Weight</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statVal}>{setup.height}cm</span>
            <span className={styles.statLbl}>Height</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statVal}>{t.bmi}</span>
            <span className={styles.statLbl}>BMI</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statVal}>{t.tdee}</span>
            <span className={styles.statLbl}>TDEE</span>
          </div>
        </div>
      </div>

      <p className={styles.sectionNote}>
        All macros are calculated specifically for your {setup.weight}kg body — not generic values.
      </p>

      <div className={styles.macroList}>
        {macros.map((m, i) => (
          <div
            key={i}
            className={styles.macroCard}
            style={{ borderColor: m.color + '30', animationDelay: `${i * 0.08}s` }}
          >
            <div className={styles.macroLeft}>
              <div className={styles.macroIconWrap} style={{ background: m.color + '15' }}>
                <span className={styles.macroIcon}>{m.icon}</span>
              </div>
              <div>
                <p className={styles.macroLabel}>{m.label}</p>
                <p className={styles.macroDesc}>{m.desc}</p>
              </div>
            </div>
            <div className={styles.macroRight}>
              <p className={styles.macroValue} style={{ color: m.color }}>{m.value}</p>
              <p className={styles.macroUnit}>{m.unit}</p>
              <p className={styles.macroRange}>{m.range}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.calCheck}>
        <span className={styles.calCheckIcon}>✓</span>
        <span>Total: {totalCheck} kcal from macros ≈ {t.kcal} kcal target</span>
      </div>

      <div className={styles.noteBox}>
        💡 Protein is set at <strong>{t.proteinPerKg}g × {setup.weight}kg = {t.protein}g</strong> — this keeps your calories balanced while hitting your goal.
      </div>

      <button className="gold-btn" onClick={() => navigate('/fuel/preference')}>
        Start Tracking →
      </button>
    </div>
  )
}