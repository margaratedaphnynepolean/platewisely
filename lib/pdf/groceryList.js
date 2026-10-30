import { ingredientCatalog } from "@/data/ingredientCatalog";
import { ingredientCategories } from "@/data/ingredientCategories";
import { countIngredientUse, listExtraIngredients } from "./planSummary";

// Turns a plan into shopping groups: first the items that were not on the
// user's list, then everything else sorted by aisle (vegetables, dals, dairy...).
// Each group is { title, items: [{ name, note }] }. No PDF code in here.

const categoryByName = new Map(
  ingredientCatalog.map((item) => [item.name.toLowerCase(), item.category]),
);

export function buildGroceryGroups(plan) {
  const groups = [];

  const extras = listExtraIngredients(plan);
  if (extras.length > 0) {
    groups.push({
      title: "Not on your list - buy these",
      items: extras.map((item) => ({
        name: item.name,
        note: `${item.days.length} ${item.days.length === 1 ? "day" : "days"}`,
      })),
    });
  }

  const used = countIngredientUse(plan);
  for (const category of ingredientCategories) {
    const items = used
      .filter(
        (item) =>
          (categoryByName.get(item.name.toLowerCase()) ?? "custom") ===
          category.id,
      )
      .map((item) => ({
        name: item.name,
        note: `${item.meals} ${item.meals === 1 ? "meal" : "meals"}`,
      }));
    if (items.length > 0) groups.push({ title: category.label, items });
  }
  return groups;
}
