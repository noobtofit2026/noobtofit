import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './MealPage.module.css'
import rawFoods from '../data/foodData.json'
import { searchOpenFoodFacts } from '../services/openFoodFacts'

const TODAY = new Date().toDateString()

const MEAL_INFO = {
  breakfast: { title: 'Breakfast' },
  morning_snack: { title: 'Morning Snack' },
  lunch: { title: 'Lunch'},
  evening_snack: { title: 'Evening Snack' },
  dinner: { title: 'Dinner' },
}


const ALL_FOODS = rawFoods.filter(f =>
  f.name &&
  f.kcal > 0 &&
  f.protein >= 0 &&
  f.carbs >= 0 &&
  f.fat >= 0
)

const CAT_COLORS = {
  Protein: '#4ade80',
  Dairy: '#60a5fa',
  Grains: '#D4AF37',
  Pulses: '#f59e0b',
  Vegetables: '#4ade80',
  Fruits: '#f97316',
  Nuts: '#a78bfa',
  Fats: '#f87171',
  Beverages: '#22d3ee',
  Indian: '#f87171',
}

export default function MealPage() {
  const { mealId } = useParams()
  const navigate = useNavigate()
  const meal = MEAL_INFO[mealId] || { title: 'Meal' }

  const [intake, setIntake] = useState(() =>
    JSON.parse(localStorage.getItem('ntf_intake_' + TODAY) || '[]')
  )
const [search, setSearch] = useState('')
const [selected, setSelected] = useState(null)
const [qty, setQty] = useState(100)
const [apiFoods, setApiFoods] = useState([])
const [loadingFoods, setLoadingFoods] = useState(false)
  useEffect(() => {
    localStorage.setItem('ntf_intake_' + TODAY, JSON.stringify(intake))
  }, [intake])

  const mealFoods = intake.filter(f => f.meal === mealId)
  const mealTotal = mealFoods.reduce(
    (a, f) => ({ kcal: a.kcal + f.kcal, protein: a.protein + f.protein }),
    { kcal: 0, protein: 0 }
  )

 const filtered = useMemo(() => {
  if (!search.trim()) return ALL_FOODS
  return apiFoods
}, [search, apiFoods])
useEffect(() => {
  const query = search.trim()

  if (!query) {
    setApiFoods([])
    return
  }

  const timer = setTimeout(async () => {
    setLoadingFoods(true)

    const results = await searchOpenFoodFacts(query)

    setApiFoods(results)
    setLoadingFoods(false)
  }, 700)

  return () => clearTimeout(timer)
}, [search])

  function addFood(food) {
    const ratio = qty / 100
    const item = {
      id: Date.now(),
      meal: mealId,
      name: food.name,
      qty,
      kcal: Math.round(food.kcal * ratio),
      protein: Math.round(food.protein * ratio * 10) / 10,
      carbs: Math.round(food.carbs * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
    }
    setIntake(p => [...p, item])
    setSelected(null)
    setQty(100)
  }

  function removeFood(id) {
    setIntake(p => p.filter(f => f.id !== id))
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      {/* TOP BAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/fuel/tracker')}>←</button>
        <div className={styles.topInfo}>
          <h1 className={styles.title}>{meal.title.toUpperCase()}</h1>
        </div>
        {mealFoods.length > 0 && (
          <div className={styles.totalBadge}>
            <span className={styles.totalKcal}>{Math.round(mealTotal.kcal)}</span>
            <span className={styles.totalLbl}>kcal</span>
          </div>
        )}
      </div>

      {/* ADDED FOODS */}
      {mealFoods.length > 0 && (
        <div className={styles.addedSection}>
          <p className={styles.addedTitle}>ADDED TO {meal.title.toUpperCase()}</p>
          {mealFoods.map(f => (
            <div key={f.id} className={styles.addedItem}>
              <div className={styles.addedLeft}>
                <p className={styles.addedName}>{f.name}</p>
                <p className={styles.addedMacros}>
                  {f.qty}g · P {f.protein}g · C {f.carbs}g · F {f.fat}g
                </p>
              </div>
              <div className={styles.addedRight}>
                <span className={styles.addedKcal}>{f.kcal} kcal</span>
                <button className={styles.removeBtn} onClick={() => removeFood(f.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEARCH BAR */}
      <div className={styles.searchWrap}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#ffffff" strokeWidth="2"/>
          <path d="M16.5 16.5L21 21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          className={styles.searchInput}
          placeholder="Search by Food Name / Dish"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      <p className={styles.resultCount}>{filtered.length} foods found</p>

      {/* FOOD LIST */}
      <div className={styles.foodList}>
        {filtered.map(food => {
          const isSel = selected?.name === food.name
          return (
            <div key={food.name}>
              <button
                className={styles.foodItem}
                style={isSel ? {
                  borderColor: 'rgba(212,175,55,0.35)',
                  background: 'rgba(212,175,55,0.04)'
                } : {}}
                onClick={() => {
                  setSelected(isSel ? null : food)
                  setQty(100)
                }}
              >
                <div className={styles.foodLeft}>
                  <div
                    className={styles.foodDot}
                    style={{ background: CAT_COLORS[food.category] || '#ffffff' }}
                  />
                  <div>
                    <p className={styles.foodName}>{food.name}</p>
                    <p className={styles.foodMeta}>
                      per 100g · P {food.protein}g · C {food.carbs}g · F {food.fat}g
                    </p>
                  </div>
                </div>
                <div className={styles.foodRight}>
                  <p className={styles.foodKcal}>{food.kcal}</p>
                  <p className={styles.foodKcalLbl}>kcal</p>
                </div>
              </button>

              {isSel && (
                <div className={styles.addPanel}>
                  <div className={styles.qtyRow}>
                    <p className={styles.qtyLabel}>Quantity</p>
                    <div className={styles.qtyControl}>
                      <button className={styles.qtyBtn}
                        onClick={() => setQty(q => Math.max(10, q - 10))}>−</button>
                      <span className={styles.qtyVal}>{qty}g</span>
                      <button className={styles.qtyBtn}
                        onClick={() => setQty(q => q + 10)}>+</button>
                    </div>
                  </div>
                  <div className={styles.macroPreview}>
                    {[
                      { label: 'Kcal', val: Math.round(food.kcal * qty / 100), color: '#D4AF37' },
                      { label: 'Protein', val: `${Math.round(food.protein * qty / 100 * 10) / 10}g`, color: '#4ade80' },
                      { label: 'Carbs', val: `${Math.round(food.carbs * qty / 100 * 10) / 10}g`, color: '#60a5fa' },
                      { label: 'Fat', val: `${Math.round(food.fat * qty / 100 * 10) / 10}g`, color: '#a78bfa' },
                    ].map(m => (
                      <div key={m.label} className={styles.previewItem}>
                        <span className={styles.previewVal} style={{ color: m.color }}>{m.val}</span>
                        <span className={styles.previewLbl}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <button className={styles.addBtn} onClick={() => addFood(food)}>
                    + Add {food.name}
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className={styles.noResult}>
            <p>No food found for "{search}"</p>
            <p className={styles.noResultSub}>Try a different name or dish</p>
          </div>
        )}
      </div>
    </div>
  )
}