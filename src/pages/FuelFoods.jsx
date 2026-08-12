import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FOOD_DATA } from '../data/workoutData'
import styles from './FuelFoods.module.css'

const TIER_CONFIG = {
 1: { label: 'Tier 1', color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)', desc: 'Extremely High Protein' },
  2: { label: 'Tier 2', color: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.25)', desc: 'High Protein' },
  3: { label: 'Tier 3', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.25)', desc: 'Moderate Protein' },
  4: { label: 'Tier 4', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.25)', desc: 'Everyday Foods' },
  5: { label: 'Tier 5', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)', desc: 'Other Sources' },

}

export default function FuelFoods() {
  const navigate = useNavigate()
  const pref = localStorage.getItem('ntf_fuel_pref') || 'veg'
  const foods = FOOD_DATA[pref]
  const [search, setSearch] = useState('')
  const [quantities, setQuantities] = useState(() => {
    const init = {}
    foods.forEach((_, i) => { init[i] = 100 })
    return init
  })
  const [selected, setSelected] = useState([])
  const [expanded, setExpanded] = useState(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return foods.map((f, i) => ({ ...f, idx: i }))
    return foods
      .map((f, i) => ({ ...f, idx: i }))
      .filter(f => f.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, foods])

  function calcMacros(food, qty) {
    const ratio = qty / 100
    return {
      kcal: Math.round(food.kcal * ratio),
      protein: Math.round(food.protein * ratio * 10) / 10,
      carbs: Math.round(food.carbs * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
      fiber: Math.round((food.fiber || 0) * ratio * 10) / 10,
    }
  }

  function changeQty(idx, delta) {
    setQuantities(prev => ({
      ...prev,
      [idx]: Math.max(10, (prev[idx] || 100) + delta)
    }))
  }

  function toggleSelect(food, idx) {
    const qty = quantities[idx] || 100
    const macros = calcMacros(food, qty)
    const item = { name: food.name, quantity: qty, ...macros, tier: food.tier, addedAt: Date.now() }
    const exists = selected.findIndex(s => s.name === food.name)
    if (exists !== -1) {
      setSelected(prev => prev.filter((_, i) => i !== exists))
    } else {
      setSelected(prev => [...prev, item])
    }
  }

  function isSelected(name) {
    return selected.some(s => s.name === name)
  }

  const totalSelected = selected.reduce((acc, f) => ({
    kcal: acc.kcal + f.kcal,
    protein: acc.protein + f.protein,
  }), { kcal: 0, protein: 0 })

  function trackFuel() {
    if (selected.length === 0) return
    const today = new Date().toDateString()
    const key = 'ntf_intake_' + today
    const current = JSON.parse(localStorage.getItem(key) || '[]')
    localStorage.setItem(key, JSON.stringify([...current, ...selected]))
    navigate('/fuel/tracker')
  }

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/fuel/preference')}>←</button>
        <div>
          <p className={styles.pref}>{pref === 'veg' ? '🥦 Vegetarian' : '🍗 Non-Vegetarian'}</p>
          <h1 className={styles.title}>SELECT FOOD</h1>
        </div>
        <button className={styles.switchBtn} onClick={() => {
          localStorage.setItem('ntf_fuel_pref', pref === 'veg' ? 'nonveg' : 'veg')
          navigate('/fuel/foods')
          window.location.reload()
        }}>Switch</button>
      </div>

      <div className={styles.tierLegend}>
  {Object.entries(TIER_CONFIG)
    .filter(([tier]) => pref === 'veg' || Number(tier) <= 3)
    .map(([tier, cfg]) => (
          <div key={tier} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: cfg.color }} />
            <span style={{ color: cfg.color }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          placeholder="Search food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <p className={styles.count}>{filtered.length} foods found</p>

      <div className={styles.foodGrid} style={{ paddingBottom: selected.length > 0 ? '6rem' : '1rem' }}>
       {filtered
  .filter(food => pref === 'veg' || food.tier <= 3)
  .map((food) => {
          const idx = food.idx
          const qty = quantities[idx] || 100
          const macros = calcMacros(food, qty)
          const sel = isSelected(food.name)
          const tier = TIER_CONFIG[food.tier] || TIER_CONFIG[1]
          const isOpen = expanded === idx

          return (
            <div
              key={idx}
              className={styles.foodCard}
              style={{
                borderColor: sel ? tier.color : tier.border,
                background: sel ? tier.bg : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className={styles.foodCardHeader} onClick={() => setExpanded(isOpen ? null : idx)}>
                <div className={styles.foodCardLeft}>
                  <div className={styles.tierBadge} style={{ background: tier.bg, borderColor: tier.border, color: tier.color }}>
                    {tier.label}
                  </div>
                  <div>
                    <p className={styles.foodName}>{food.name}</p>
                    <p className={styles.foodTierDesc} style={{ color: tier.color }}>{tier.desc}</p>
                  </div>
                </div>
                <div className={styles.foodCardRight}>
                  <span className={styles.foodProtein} style={{ color: tier.color }}>{food.protein}g</span>
                  <span className={styles.foodProteinLbl}>protein</span>
                  <span className={styles.expandIcon}>{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {isOpen && (
                <div className={styles.foodExpanded}>
                  <div className={styles.qtyRow}>
                    <button className={styles.qtyBtn} style={{ borderColor: tier.border, color: tier.color }} onClick={() => changeQty(idx, -10)}>−</button>
                    <div className={styles.qtyDisplay}>
                      <span className={styles.qtyNum} style={{ color: tier.color }}>{qty}</span>
                      <span className={styles.qtyUnit}>g</span>
                    </div>
                    <button className={styles.qtyBtn} style={{ borderColor: tier.border, color: tier.color }} onClick={() => changeQty(idx, +10)}>+</button>
                  </div>

                  <div className={styles.macroRow}>
                    <div className={styles.macroItem}>
                      <span className={styles.macroVal} style={{ color: '#D4AF37' }}>{macros.kcal}</span>
                      <span className={styles.macroLbl}>kcal</span>
                    </div>
                    <div className={styles.macroDivider} />
                    <div className={styles.macroItem}>
                      <span className={styles.macroVal} style={{ color: '#60a5fa' }}>{macros.protein}g</span>
                      <span className={styles.macroLbl}>protein</span>
                    </div>
                    <div className={styles.macroDivider} />
                    <div className={styles.macroItem}>
                      <span className={styles.macroVal} style={{ color: '#a78bfa' }}>{macros.carbs}g</span>
                      <span className={styles.macroLbl}>carbs</span>
                    </div>
                    <div className={styles.macroDivider} />
                    <div className={styles.macroItem}>
                      <span className={styles.macroVal} style={{ color: '#f97316' }}>{macros.fat}g</span>
                      <span className={styles.macroLbl}>fat</span>
                    </div>
                  </div>

                  <button
                    className={styles.addBtn}
                    style={{
                      background: sel ? tier.bg : 'transparent',
                      borderColor: tier.border,
                      color: tier.color,
                    }}
                    onClick={() => toggleSelect(food, idx)}
                  >
                    {sel ? '✓ Added' : `+ Add ${qty}g`}
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className={styles.noResults}>
            <p>No foods found for "{search}"</p>
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className={styles.trackBar}>
          <div className={styles.trackBarLeft}>
            <span className={styles.trackBarCount}>{selected.length} items</span>
            <span className={styles.trackBarMacros}>{totalSelected.kcal} kcal · P {Math.round(totalSelected.protein)}g</span>
          </div>
          <button className={styles.trackBarBtn} onClick={trackFuel}>
            Track Your Fuel →
          </button>
        </div>
      )}
    </div>
  )
}