import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FuelTracker.module.css'

const TODAY = new Date().toDateString()

const MEALS = [
  { id: 'breakfast', title: 'Breakfast', desc: 'Start your day right' },
  { id: 'morning_snack', title: 'Morning Snack', desc: 'Light mid-morning fuel' },
  { id: 'lunch', title: 'Lunch', desc: 'Mid-day power meal' },
  { id: 'evening_snack', title: 'Evening Snack', desc: 'Pre-workout energy' },
  { id: 'dinner', title: 'Dinner', desc: 'Recovery & repair meal' },
]

function CircleProgress({ pct, color, size = 70, stroke = 6 }) {
  const r = (size - stroke * 2) / 2
  const C = 2 * Math.PI * r

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={C}
        strokeDashoffset={C * (1 - Math.min(pct, 100) / 100)}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  )
}

export default function FuelTracker() {
  const navigate = useNavigate()

  const targets = JSON.parse(
    localStorage.getItem('ntf_fuel_targets') || '{}'
  )

  const [intake, setIntake] = useState(() =>
    JSON.parse(localStorage.getItem('ntf_intake_' + TODAY) || '[]')
  )

  useEffect(() => {
    localStorage.setItem(
      'ntf_intake_' + TODAY,
      JSON.stringify(intake)
    )
  }, [intake])

  const total = intake.reduce(
    (acc, f) => ({
      kcal: acc.kcal + (f.kcal || 0),
      protein: acc.protein + (f.protein || 0),
      carbs: acc.carbs + (f.carbs || 0),
      fat: acc.fat + (f.fat || 0),
    }),
    {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  )

  const kcalPct = targets.kcal
    ? Math.min(
        100,
        Math.round((total.kcal / targets.kcal) * 100)
      )
    : 0

  const protPct = targets.protein
    ? Math.min(
        100,
        Math.round((total.protein / targets.protein) * 100)
      )
    : 0

  const carbPct = targets.carbs
    ? Math.min(
        100,
        Math.round((total.carbs / targets.carbs) * 100)
      )
    : 0

  const fatPct = targets.fat
    ? Math.min(
        100,
        Math.round((total.fat / targets.fat) * 100)
      )
    : 0

  function getMealKcal(id) {
    return Math.round(
      intake
        .filter(f => f.meal === id)
        .reduce((a, f) => a + (f.kcal || 0), 0)
    )
  }

  function getMealFoodNames(id) {
    return intake
      .filter(f => f.meal === id)
      .map(f => f.name)
      .join(', ')
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      {/* TOP */}
      <div className={styles.topbar}>
        <h1 className={styles.title}>NUTRITION</h1>
      </div>

      {/* CALORIES */}
      <div className={styles.caloriesCard}>
        <div className={styles.calTop}>
          <p className={styles.calLabel}>CALORIES</p>

          <div className={styles.fireCircle}>
            <span className={styles.fireEmoji}>🔥</span>
          </div>
        </div>

        <p className={styles.calNum}>
          {Math.round(total.kcal)}
          <span className={styles.calTarget}>
            {' '}
            / {targets.kcal || 2400} kcal
          </span>
        </p>

        <div className={styles.calBar}>
          <div
            className={styles.calBarFill}
            style={{ width: `${kcalPct}%` }}
          />
        </div>

        <p className={styles.calPct}>{kcalPct}%</p>
      </div>

      {/* MACROS */}
      <div className={styles.macrosRow}>
        {[
          {
            label: 'PROTEIN',
            val: Math.round(total.protein),
            target: targets.protein || 160,
            unit: 'g',
            pct: protPct,
            color: '#4ade80',
          },
          {
            label: 'CARBS',
            val: Math.round(total.carbs),
            target: targets.carbs || 280,
            unit: 'g',
            pct: carbPct,
            color: '#22d3ee',
          },
          {
            label: 'FATS',
            val: Math.round(total.fat),
            target: targets.fat || 80,
            unit: 'g',
            pct: fatPct,
            color: '#a78bfa',
          },
        ].map(m => (
          <div key={m.label} className={styles.macroCard}>
            <p className={styles.macroLabel}>{m.label}</p>

            <div className={styles.macroCircleWrap}>
              <CircleProgress
                pct={m.pct}
                color={m.color}
                size={70}
                stroke={6}
              />

              <div className={styles.macroCenter}>
                <p
                  className={styles.macroVal}
                  style={{ color: m.color }}
                >
                  {m.val}
                  <span className={styles.macroSlash}>/</span>
                  {m.target}
                  {m.unit}
                </p>

                <p
                  className={styles.macroPct}
                  style={{ color: m.color }}
                >
                  {m.pct}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MEALS */}
      <p className={styles.mealsTitle}>MEALS</p>

      <div className={styles.mealsList}>
        {MEALS.map(meal => {
          const kcal = getMealKcal(meal.id)
          const foods = getMealFoodNames(meal.id)

          return (
            <button
              key={meal.id}
              className={styles.mealCard}
              onClick={() =>
                navigate(`/fuel/meal/${meal.id}`)
              }
            >
              <div className={styles.mealInfo}>
                <p className={styles.mealName}>
                  {meal.title}
                </p>

                <p className={styles.mealDesc}>
                  {foods || meal.desc}
                </p>
              </div>

              <div className={styles.mealRight}>
                {kcal > 0 && (
                  <p className={styles.mealKcal}>
                    {kcal} kcal
                  </p>
                )}

                <span className={styles.mealDots}>⋮</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}