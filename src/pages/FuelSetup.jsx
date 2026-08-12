import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './FuelSetup.module.css'

const STEPS = ['Details', 'Goal', 'Results']

export default function FuelSetup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ age: '', gender: 'Male', height: '', weight: '', activity: 'moderate' })
  const [goal, setGoal] = useState(null)

  const ACTIVITIES = [
    { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { id: 'light', label: 'Light', desc: '1–3 days/week' },
    { id: 'moderate', label: 'Moderate', desc: '3–5 days/week' },
    { id: 'active', label: 'Active', desc: '6–7 days/week' },
    { id: 'very_active', label: 'Very Active', desc: '2x per day' },
  ]

  const GOALS = [
    { id: 'fat_loss', icon: '🔥', title: 'Fat Loss', desc: 'Burn fat, reveal muscle, get lean', color: '#f97316' },
    { id: 'maintenance', icon: '⚖️', title: 'Maintenance', desc: 'Maintain weight and body composition', color: '#D4AF37' },
    { id: 'bulking', icon: '💪', title: 'Bulking', desc: 'Build muscle and increase strength', color: '#4ade80' },
  ]

  function calcMacros() {
    const w = parseFloat(form.weight)
    const h = parseFloat(form.height)
    const a = parseInt(form.age)
    const isMale = form.gender === 'Male'
    const bmr = isMale
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161
    const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 }
    const tdee = Math.round(bmr * (multipliers[form.activity] || 1.55))
    const kcal = goal === 'fat_loss' ? tdee - 350 : goal === 'bulking' ? tdee + 350 : tdee
    const protein = Math.round(w * (goal === 'fat_loss' ? 2.2 : goal === 'bulking' ? 2.0 : 1.8))
    const fat = Math.round((kcal * 0.25) / 9)
    const carbs = Math.round((kcal - protein * 4 - fat * 9) / 4)
    const bmi = Math.round((w / ((h / 100) ** 2)) * 10) / 10
    return { kcal, protein, carbs, fat, bmi, tdee }
  }

  const macros = step === 2 ? calcMacros() : null

  function finish() {
    const m = calcMacros()
    localStorage.setItem('ntf_fuel_setup', JSON.stringify(form))
    localStorage.setItem('ntf_fuel_goal', goal)
    localStorage.setItem('ntf_fuel_targets', JSON.stringify(m))
    navigate('/fuel/tracker')
  }

  function bmiLabel(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: '#60a5fa' }
    if (bmi < 25) return { label: 'Normal', color: '#4ade80' }
    if (bmi < 30) return { label: 'Overweight', color: '#D4AF37' }
    return { label: 'Obese', color: '#f87171' }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      {/* PROGRESS */}
      <div className={styles.header}>
        <button className={styles.back} onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/')}>←</button>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s} className={styles.stepItem}>
              <div className={styles.stepDot} style={{ background: i <= step ? '#D4AF37' : 'rgba(255,255,255,0.1)', boxShadow: i === step ? '0 0 12px rgba(212,175,55,0.5)' : 'none' }}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={styles.stepLine} style={{ background: i < step ? '#D4AF37' : 'rgba(255,255,255,0.1)' }} />}
            </div>
          ))}
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* STEP 0 — DETAILS */}
      {step === 0 && (
        <div className={styles.content}>
          <p className={styles.eye}>STEP 1 OF 3</p>
          <h1 className={styles.heading}>YOUR DETAILS</h1>
          <p className={styles.sub}>We use this to calculate your exact calorie and macro targets.</p>

          <div className={styles.fields}>
            <div className={styles.field}>
              <label className={styles.label}>Age</label>
              <input className={styles.input} type="number" placeholder="e.g. 22" value={form.age}
                onChange={e => setForm(p => ({ ...p, age: e.target.value }))} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Gender</label>
              <div className={styles.genderRow}>
                {['Male', 'Female'].map(g => (
                  <button key={g} className={styles.genderBtn}
                    style={form.gender === g ? { borderColor: '#D4AF37', color: '#D4AF37', background: 'rgba(212,175,55,0.1)' } : {}}
                    onClick={() => setForm(p => ({ ...p, gender: g }))}>
                    {g === 'Male' ? '♂' : '♀'} {g}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Height (cm)</label>
                <input className={styles.input} type="number" placeholder="e.g. 175" value={form.height}
                  onChange={e => setForm(p => ({ ...p, height: e.target.value }))} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Weight (kg)</label>
                <input className={styles.input} type="number" placeholder="e.g. 70" value={form.weight}
                  onChange={e => setForm(p => ({ ...p, weight: e.target.value }))} />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Activity Level</label>
              <div className={styles.activityList}>
                {ACTIVITIES.map(a => (
                  <button key={a.id} className={styles.activityBtn}
                    style={form.activity === a.id ? { borderColor: '#D4AF37', background: 'rgba(212,175,55,0.08)' } : {}}
                    onClick={() => setForm(p => ({ ...p, activity: a.id }))}>
                    <span className={styles.activityLabel} style={{ color: form.activity === a.id ? '#D4AF37' : '#fff' }}>{a.label}</span>
                    <span className={styles.activityDesc}>{a.desc}</span>
                    {form.activity === a.id && <span className={styles.activityCheck}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className={styles.continueBtn}
            disabled={!form.age || !form.height || !form.weight}
            onClick={() => setStep(1)}>
            Continue →
          </button>
        </div>
      )}

      {/* STEP 1 — GOAL */}
      {step === 1 && (
        <div className={styles.content}>
          <p className={styles.eye}>STEP 2 OF 3</p>
          <h1 className={styles.heading}>YOUR GOAL</h1>
          <p className={styles.sub}>Choose your primary fitness goal. This sets your calorie target.</p>

          <div className={styles.goalList}>
            {GOALS.map(g => (
              <button key={g.id} className={styles.goalCard}
                style={goal === g.id ? { borderColor: g.color, background: g.color + '10' } : {}}
                onClick={() => setGoal(g.id)}>
                <div className={styles.goalIcon} style={{ background: g.color + '15', borderColor: g.color + '30' }}>
                  <span style={{ fontSize: 32 }}>{g.icon}</span>
                </div>
                <div className={styles.goalText}>
                  <p className={styles.goalTitle} style={{ color: goal === g.id ? g.color : '#fff' }}>{g.title}</p>
                  <p className={styles.goalDesc}>{g.desc}</p>
                </div>
                <div className={styles.goalRadio} style={{ borderColor: goal === g.id ? g.color : '#333', background: goal === g.id ? g.color : 'transparent' }}>
                  {goal === g.id && <span style={{ color: '#000', fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
              </button>
            ))}
          </div>

          <button className={styles.continueBtn} disabled={!goal} onClick={() => setStep(2)}>
            Calculate My Targets →
          </button>
        </div>
      )}

      {/* STEP 2 — RESULTS */}
      {step === 2 && macros && (
        <div className={styles.content}>
          <p className={styles.eye}>STEP 3 OF 3</p>
          <h1 className={styles.heading}>YOUR TARGETS</h1>
          <p className={styles.sub}>Calculated using Mifflin-St Jeor formula — the gold standard in nutrition science.</p>

          {/* BMI */}
          <div className={styles.bmiCard}>
            <div className={styles.bmiLeft}>
              <p className={styles.bmiLabel}>BMI</p>
              <p className={styles.bmiNum} style={{ color: bmiLabel(macros.bmi).color }}>{macros.bmi}</p>
              <p className={styles.bmiStatus} style={{ color: bmiLabel(macros.bmi).color }}>{bmiLabel(macros.bmi).label}</p>
            </div>
            <div className={styles.bmiRight}>
              <p className={styles.bmiLabel}>Daily Calories</p>
              <p className={styles.bmiKcal}>{macros.kcal}</p>
              <p className={styles.bmiKcalLbl}>kcal / day</p>
            </div>
          </div>

          {/* MACROS */}
          <div className={styles.macroCards}>
            {[
              { label: 'Protein', val: macros.protein, unit: 'g', color: '#4ade80', desc: 'Muscle repair & growth' },
              { label: 'Carbs', val: macros.carbs, unit: 'g', color: '#60a5fa', desc: 'Energy & performance' },
              { label: 'Fats', val: macros.fat, unit: 'g', color: '#a78bfa', desc: 'Hormones & recovery' },
            ].map(m => (
              <div key={m.label} className={styles.macroCard} style={{ borderColor: m.color + '25' }}>
                <p className={styles.macroVal} style={{ color: m.color }}>{m.val}<span className={styles.macroUnit}>{m.unit}</span></p>
                <p className={styles.macroLabel}>{m.label}</p>
                <p className={styles.macroDesc}>{m.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.noteCard}>
            <p className={styles.noteText}>📌 These targets are based on your TDEE of <strong style={{ color: '#D4AF37' }}>{macros.tdee} kcal</strong>. Adjust as needed based on weekly progress.</p>
          </div>

          <button className={styles.continueBtn} onClick={finish}>
            Start Tracking →
          </button>
        </div>
      )}
    </div>
  )
}