// Logic for deciding which ingredients to show. No screen code in here,
// so it can be tested and reused later (for example by the plan checker).

// Turns "brinjal, mushrooms" into ["brinjal", "mushrooms"].
export function splitTypedAllergies(typedText) {
  return typedText
    .toLowerCase()
    .split(",")
    .map((term) => term.trim())
    .filter((term) => term.length >= 3);
}

// Does the household's diet allow this ingredient? "Veg + eggs" allows eggs but no meat or fish.
function isAllowedByDiet(ingredient, diet) {
  if (diet === "veg") return ingredient.isVeg;
  if (diet === "veg-egg")
    return ingredient.isVeg || ingredient.category === "eggs";
  return true;
}

// Keeps only the ingredients this household can actually use:
// nothing their diet rules out, and nothing they are allergic to.
export function getAvailableIngredients(catalog, household) {
  const typedTerms = splitTypedAllergies(household.otherAllergies);

  return catalog.filter((ingredient) => {
    if (!isAllowedByDiet(ingredient, household.diet)) return false;

    const hitsTickedAllergy = ingredient.allergens.some((allergen) =>
      household.allergies.includes(allergen),
    );
    if (hitsTickedAllergy) return false;

    const lowerCaseName = ingredient.name.toLowerCase();
    return !typedTerms.some((term) => lowerCaseName.includes(term));
  });
}

// Keeps only the ingredients whose name contains what the user typed.
export function searchIngredients(ingredients, searchText) {
  const searchTerm = searchText.trim().toLowerCase();
  if (!searchTerm) return ingredients;

  return ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm),
  );
}

// Sorts ingredients into their categories, skipping categories with nothing in them.
export function groupByCategory(ingredients, categories) {
  return categories
    .map((category) => ({
      category,
      ingredients: ingredients.filter(
        (ingredient) => ingredient.category === category.id,
      ),
    }))
    .filter((group) => group.ingredients.length > 0);
}
