// Adds up the protein and fibre (grams per person) of one day's meals.
// Used by the server to check a plan and by the screen to show it.
export function sumDayNutrition(day) {
  const totals = { protein: 0, fibre: 0 };
  for (const meal of day.meals) {
    totals.protein += meal.proteinGrams;
    totals.fibre += meal.fibreGrams;
  }
  return totals;
}
