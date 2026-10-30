// Picks one protein food and one vegetable to build each day around, so the
// seven days do not all lean on the same few ingredients. They rotate through
// the user's list. Protein types take turns: dal, eggs, meat, fish.
const proteinCategories = ["pulses", "eggs", "meat", "fish"];

function pickRotating(groups, dayIndex) {
  const filledGroups = groups.filter((group) => group.length > 0);
  if (filledGroups.length === 0) return null;
  const group = filledGroups[dayIndex % filledGroups.length];
  return group[Math.floor(dayIndex / filledGroups.length) % group.length];
}

export function pickStarIngredients(ingredients, dayIndex) {
  const byCategory = (category) =>
    ingredients.filter((ingredient) => ingredient.category === category);

  const protein = pickRotating(proteinCategories.map(byCategory), dayIndex);
  const vegetable = pickRotating([byCategory("vegetables")], dayIndex);
  return [protein, vegetable].filter(Boolean).map((item) => item.name);
}
