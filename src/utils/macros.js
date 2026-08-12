export function calculateMacros(food, quantity) {
  const ratio = quantity / 100
  return {
    kcal: Math.round(food.per100g.kcal * ratio),
    protein: Math.round(food.per100g.protein * ratio * 10) / 10,
    carbs: Math.round(food.per100g.carbs * ratio * 10) / 10,
    fat: Math.round(food.per100g.fat * ratio * 10) / 10,
    fiber: Math.round(food.per100g.fiber * ratio * 10) / 10,
  }
}