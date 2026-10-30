import { pantryStaples } from "@/data/pantryStaples";

// Plain-English facts pulled out of a plan, for page 2 of the PDF.
// No PDF code in here, so it is easy to test on its own.

const pantryNames = new Set(pantryStaples.map((name) => name.toLowerCase()));

// Every meal in the week, with the day it belongs to.
function allMeals(plan) {
  return plan.days.flatMap((day) =>
    day.meals.map((meal) => ({ ...meal, day: day.day })),
  );
}

// How many meals use each ingredient, most used first. Pantry staples are left out.
export function countIngredientUse(plan) {
  const counts = new Map();
  for (const meal of allMeals(plan)) {
    for (const name of meal.ingredientsUsed) {
      const key = name.trim().toLowerCase();
      if (pantryNames.has(key)) continue;
      const entry = counts.get(key) ?? { name: name.trim(), meals: 0 };
      entry.meals += 1;
      counts.set(key, entry);
    }
  }
  return [...counts.values()].sort((a, b) => b.meals - a.meals);
}

// Items to buy that were not on the user's list, each with the days it is needed.
export function listExtraIngredients(plan) {
  const extras = new Map();
  for (const meal of allMeals(plan)) {
    for (const name of meal.extraIngredients) {
      const key = name.trim().toLowerCase();
      const entry = extras.get(key) ?? { name: name.trim(), days: [] };
      if (!entry.days.includes(meal.day)) entry.days.push(meal.day);
      extras.set(key, entry);
    }
  }
  return [...extras.values()];
}

// The "cook once, use twice" hints, each with the meal it came from.
export function listCookAheadTips(plan) {
  return allMeals(plan)
    .filter((meal) => meal.batchCookHint)
    .map((meal) => ({
      meal: `${meal.day} ${meal.mealType}`,
      tip: meal.batchCookHint,
    }));
}
