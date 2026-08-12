const API_URL = 'https://world.openfoodfacts.org/cgi/search.pl'

export async function searchOpenFoodFacts(query) {
  if (!query.trim()) return []

  const params = new URLSearchParams({
    search_terms: query,
    json: '1',
    page_size: '20',
    fields: 'product_name,nutriments,image_url'
  })

  try {
    const response = await fetch(`${API_URL}?${params}`)

    if (!response.ok) {
      throw new Error('Open Food Facts API request failed')
    }

    const data = await response.json()

    return (data.products || [])
      .filter(product =>
        product.product_name &&
        product.nutriments?.['energy-kcal_100g'] != null
      )
      .map(product => ({
        name: product.product_name,
        kcal: Number(product.nutriments['energy-kcal_100g']) || 0,
        protein: Number(product.nutriments.proteins_100g) || 0,
        carbs: Number(product.nutriments.carbohydrates_100g) || 0,
        fat: Number(product.nutriments.fat_100g) || 0,
        fiber: Number(product.nutriments.fiber_100g) || 0,
        category: 'Food',
        image: product.image_url || null
      }))
  } catch (error) {
    console.error('Open Food Facts error:', error)
    return []
  }
}