import { useState, useEffect } from 'react'
import styles from './Recovery.module.css'

const TODAY = new Date().toDateString()
const KEY = 'ntf_recovery_' + TODAY

function getDefault() {
  return { sleep: 7.5, energy: 'High', soreness: 2 }
}

function sleepScore(h) {
  if (h >= 8 && h <= 9) return 100
  if (h >= 7 && h < 8) return 85
  if (h >= 9 && h <= 10) return 80
  if (h >= 6 && h < 7) return 60
  if (h > 10) return 65
  if (h >= 5 && h < 6) return 35
  return 15
}

function sleepLabel(h) {
  if (h >= 8 && h <= 9) return 'Optimal'
  if (h >= 7 && h < 8) return 'Good'
  if (h >= 9 && h <= 10) return 'Slightly High'
  if (h >= 6 && h < 7) return 'Moderate'
  if (h > 10) return 'Oversleeping'
  if (h >= 5 && h < 6) return 'Poor'
  return 'Very Poor'
}

function sleepDesc(h) {
  if (h >= 8 && h <= 9) return '8–9 hrs is the sweet spot for full muscle repair and hormonal recovery.'
  if (h >= 7 && h < 8) return '7–8 hrs supports solid recovery. Aim for 8+ on heavy training days.'
  if (h >= 9 && h <= 10) return 'Slightly above ideal. Your body may be compensating for fatigue.'
  if (h >= 6 && h < 7) return '6–7 hrs reduces recovery efficiency. Growth hormone release is limited.'
  if (h > 10) return 'Oversleeping can cause grogginess. Check your sleep quality.'
  if (h >= 5 && h < 6) return 'Under 6 hrs significantly impairs muscle recovery and performance.'
  return 'Severe sleep deprivation. Prioritize rest before training hard.'
}

function energyScore(e) {
  if (e === 'High') return 95
  if (e === 'Medium') return 60
  return 25
}

function energyDesc(e) {
  if (e === 'High') return 'High energy = high readiness. CNS is recovered and you can train hard today.'
  if (e === 'Medium') return 'Moderate energy. Train but avoid max effort. Listen to your body.'
  return 'Low energy signals fatigue or overtraining. Consider active recovery or rest.'
}

function sorenessScore(v) {
  if (v === 0) return 100
  if (v <= 2) return 90
  if (v <= 4) return 70
  if (v <= 6) return 45
  if (v <= 8) return 25
  return 10
}

function sorenessLabel(v) {
  if (v === 0) return 'None'
  if (v <= 2) return 'Mild'
  if (v <= 4) return 'Moderate'
  if (v <= 6) return 'High'
  if (v <= 8) return 'Severe'
  return 'Extreme'
}

function sorenessDesc(v) {
  if (v === 0) return 'No soreness. Muscles are fully recovered and ready to perform.'
  if (v <= 2) return 'Mild DOMS. Normal after training. You can train the same muscle group.'
  if (v <= 4) return 'Moderate soreness. Avoid training the same muscle group today.'
  if (v <= 6) return 'High soreness. Focus on mobility, stretching and nutrition today.'
  if (v <= 8) return 'Severe DOMS. Rest is the priority. Overtraining risk is high.'
  return 'Extreme soreness. Seek professional advice if this persists.'
}

function calcScore(sleep, energy, soreness) {
  return Math.round(
    sleepScore(sleep) * 0.40 +
    energyScore(energy) * 0.35 +
    sorenessScore(soreness) * 0.25
  )
}

function rColor(score) {
  if (score >= 80) return '#4ade80'
  if (score >= 55) return '#D4AF37'
  return '#f87171'
}

function rLabel(score) {
  if (score >= 80) return 'Great Recovery'
  if (score >= 55) return 'Moderate Recovery'
  return 'Rest Needed'
}

function rStatus(score) {
  if (score >= 80) return 'Ready to Train Hard'
  if (score >= 55) return 'Train Light Today'
  return 'Prioritize Rest'
}

function rDesc(score) {
  if (score >= 80) return 'Your body is fully recovered and primed to perform. Push hard today.'
  if (score >= 55) return 'Partial recovery. Keep intensity moderate and focus on form over weight.'
  return 'Your body is asking for rest. Sleep, eat well, and recover before your next session.'
}

export default function Recovery() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return saved ? JSON.parse(saved) : getDefault()
    } catch {
      return getDefault()
    }
  })

 const [saved, setSaved] = useState(!!localStorage.getItem(KEY))

useEffect(() => {
  // Auto reset check — if saved data is from yesterday, clear it
  const lastDate = localStorage.getItem('ntf_recovery_date')
  if (lastDate && lastDate !== TODAY) {
    localStorage.removeItem('ntf_recovery_' + lastDate)
  }
}, [])

function saveCheckin() {
  localStorage.setItem(KEY, JSON.stringify(data))
  localStorage.setItem('ntf_recovery_date', TODAY)
  setSaved(true)
}

  const { sleep, energy, soreness } = data

  const sScore = sleepScore(sleep)
  const eScore = energyScore(energy)
  const sorScore = sorenessScore(soreness)

  const recovery = calcScore(sleep, energy, soreness)
  const color = rColor(recovery)

  const C = 2 * Math.PI * 52

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.topbar}>
        <h1 className={styles.title}>RECOVERY</h1>
      </div>

      <p className={styles.sectionLbl}>DAILY CHECK-IN</p>

      <div className={styles.card}>

        {/* SLEEP */}
        <div className={styles.block}>
          <div className={styles.blockTop}>
            <div
              className={styles.iconCircle}
              style={{
                borderColor: 'rgba(96,165,250,0.35)',
                background: 'rgba(96,165,250,0.08)'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
                  fill="rgba(96,165,250,0.15)"
                  stroke="#60a5fa"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="6" r="1" fill="#60a5fa" />
                <circle cx="19" cy="9" r="0.7" fill="#60a5fa" />
              </svg>
            </div>

            <div>
              <p className={styles.blockLabel} style={{ color: '#60a5fa' }}>
                SLEEP
              </p>

              <p className={styles.blockValue} style={{ color: '#60a5fa' }}>
                {sleep} HRS
              </p>

              <p className={styles.blockStatus} style={{ color: '#60a5fa' }}>
                {sleepLabel(sleep)}
              </p>
            </div>
          </div>

          <p className={styles.blockDesc}>{sleepDesc(sleep)}</p>

          <div className={styles.sliderRow}>
            <span className={styles.sliderEdge} style={{ color: '#60a5fa' }}>
              3h
            </span>

            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={sleep}
              className={styles.slider}
              style={{ '--c': '#60a5fa' }}
              onChange={e =>
                setData(p => ({
                  ...p,
                  sleep: parseFloat(e.target.value)
                }))
              }
            />

            <span className={styles.sliderEdge} style={{ color: '#60a5fa' }}>
              12h
            </span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* ENERGY */}
        <div className={styles.block}>
          <div className={styles.blockTop}>
            <div
              className={styles.iconCircle}
              style={{
                borderColor: 'rgba(74,222,128,0.35)',
                background: 'rgba(74,222,128,0.08)'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z"
                  fill="rgba(74,222,128,0.15)"
                  stroke="#4ade80"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div>
              <p className={styles.blockLabel} style={{ color: '#4ade80' }}>
                ENERGY
              </p>

              <p className={styles.blockValue} style={{ color: '#4ade80' }}>
                {energy.toUpperCase()}
              </p>

              <p className={styles.blockStatus} style={{ color: '#4ade80' }}>
                {energy === 'High'
                  ? 'Feeling great'
                  : energy === 'Medium'
                  ? 'Doing okay'
                  : 'Feeling low'}
              </p>
            </div>
          </div>

          <p className={styles.blockDesc}>{energyDesc(energy)}</p>

          <div className={styles.energyRow}>
            {['Low', 'Medium', 'High'].map(e => (
              <button
                key={e}
                className={styles.energyBtn}
                style={
                  data.energy === e
                    ? {
                        borderColor: '#4ade80',
                        color: '#4ade80',
                        background: 'rgba(74,222,128,0.1)',
                        fontWeight: 700,
                      }
                    : {}
                }
                onClick={() =>
                  setData(p => ({
                    ...p,
                    energy: e
                  }))
                }
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        {/* SORENESS */}
        <div className={styles.block}>
          <div className={styles.blockTop}>
            <div
              className={styles.iconCircle}
              style={{
                borderColor: 'rgba(248,113,113,0.35)',
                background: 'rgba(248,113,113,0.08)'
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8 2 5 5.5 5 9.5C5 13 7 15.5 9 17L12 22L15 17C17 15.5 19 13 19 9.5C19 5.5 16 2 12 2Z"
                  fill="rgba(248,113,113,0.15)"
                  stroke="#f87171"
                  strokeWidth="1.8"
                />
                <circle cx="12" cy="9" r="2.5" fill="#f87171" opacity="0.5" />
              </svg>
            </div>

            <div>
              <p className={styles.blockLabel} style={{ color: '#f87171' }}>
                SORENESS
              </p>

              <p className={styles.blockValue} style={{ color: '#f87171' }}>
                {soreness}/10
              </p>

              <p className={styles.blockStatus} style={{ color: '#f87171' }}>
                {sorenessLabel(soreness)}
              </p>
            </div>
          </div>

          <p className={styles.blockDesc}>{sorenessDesc(soreness)}</p>

          <div className={styles.sliderRow}>
            <span className={styles.sliderEdge} style={{ color: '#4ade80' }}>
              0
            </span>

            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={soreness}
              className={styles.slider}
              style={{ '--c': '#f87171' }}
              onChange={e =>
                setData(p => ({
                  ...p,
                  soreness: parseInt(e.target.value)
                }))
              }
            />

            <span className={styles.sliderEdge} style={{ color: '#f87171' }}>
              10
            </span>
          </div>
        </div>
      </div>

      {/* RECOVERY SCORE */}
      <p className={styles.sectionLbl}>RECOVERY SCORE</p>

      <div className={styles.scoreCard}>
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          className={styles.scoreSvg}
        >
          <circle
            cx="65"
            cy="65"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />

          <circle
            cx="65"
            cy="65"
            r="52"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - recovery / 100)}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
            style={{ transition: 'stroke-dashoffset 1.2s ease' }}
          />

          <text
            x="65"
            y="60"
            textAnchor="middle"
            fill={color}
            fontSize="26"
            fontFamily="Bebas Neue, sans-serif"
            letterSpacing="1"
          >
            {recovery}%
          </text>

          <text
            x="65"
            y="78"
            textAnchor="middle"
            fill="#555"
            fontSize="9"
            fontFamily="Inter, sans-serif"
            letterSpacing="2"
          >
            RECOVERY
          </text>
        </svg>

        <div className={styles.scoreInfo}>
          <h3 className={styles.scoreLabel} style={{ color }}>
            {rLabel(recovery)}
          </h3>

          <p className={styles.scoreDesc}>{rDesc(recovery)}</p>

          <div
            className={styles.scoreBadge}
            style={{
              background: color + '12',
              borderColor: color + '35',
              color
            }}
          >
            {rStatus(recovery)}
          </div>
        </div>
      </div>

      {/* RECOVERY FACTORS */}
      <p className={styles.sectionLbl}>RECOVERY FACTORS</p>

      <div className={styles.factorsCard}>
        {[
          {
            label: 'Sleep Quality',
            status: sleepLabel(sleep),
            score: sScore,
            color: '#60a5fa'
          },
          {
            label: 'Energy Level',
            status: energy,
            score: eScore,
            color: '#4ade80'
          },
          {
            label: 'Muscle Soreness',
            status: sorenessLabel(soreness),
            score: sorScore,
            color: '#f87171'
          },
        ].map(f => (
          <div key={f.label} className={styles.factorRow}>
            <span className={styles.factorLabel}>{f.label}</span>

            <span
              className={styles.factorStatus}
              style={{ color: f.color }}
            >
              {f.status}
            </span>

            <div className={styles.factorBar}>
              <div
                className={styles.factorFill}
                style={{
                  width: `${f.score}%`,
                  background: f.color
                }}
              />
            </div>

            <span className={styles.factorPct}>{f.score}%</span>
          </div>
        ))}
      </div>
      {/* SAVE BUTTON */}
<button
  className={styles.saveBtn}
  onClick={saveCheckin}
  style={{
    background: saved ? 'transparent' : 'linear-gradient(135deg, #D4AF37, #F0C93A)',
    color: saved ? '#4ade80' : '#000',
    border: saved ? '1px solid rgba(74,222,128,0.3)' : 'none',
  }}
>
  {saved ? '✓ Check-in Saved for Today' : '💾 Save Today\'s Check-in'}
</button>
    </div>
  )
}