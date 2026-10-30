// Builds one ingredient entry in a standard shape, so every list looks the same.
// isVeg: false marks non-veg items (eggs, meat, fish).
// allergens: which allergy groups this item belongs to, so we can hide it
// for households that avoid them. The ids match the allergy chips on the household screen.
export function makeIngredient(name, category, options = {}) {
  const { isVeg = true, allergens = [] } = options;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return { id: `${category}-${slug}`, name, category, isVeg, allergens };
}
