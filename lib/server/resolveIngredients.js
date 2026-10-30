import { ingredientCatalog } from "@/data/ingredientCatalog";
import { getAvailableIngredients } from "@/lib/ingredientFilter";
import { makeCustomIngredient } from "@/lib/customIngredients";

// Turns the ids the app sent into real ingredients, and drops anything that
// does not belong: unknown ids, or foods this household's diet or allergies rule out.
// The user's own typed items are rebuilt here too, so we never trust the app's copy.
export function resolveSelectedIngredients(
  ingredientIds,
  customIngredients,
  household,
) {
  const customItems = customIngredients.map((entry) =>
    makeCustomIngredient(entry.name, entry.isVeg),
  );
  const allowedIngredients = getAvailableIngredients(
    [...customItems, ...ingredientCatalog],
    household,
  );
  const wantedIds = new Set(ingredientIds);
  return allowedIngredients.filter((ingredient) =>
    wantedIds.has(ingredient.id),
  );
}
