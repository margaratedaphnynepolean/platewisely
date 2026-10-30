import { siteConfig } from "@/config/siteConfig";
import { readSavedValue, writeSavedValue } from "./browserStorage";

const storageKey = siteConfig.storageKeys.mealPlan;

// Returns the last plan saved on this phone, or null if there is none.
export function loadSavedMealPlan() {
  const savedPlan = readSavedValue(storageKey);
  if (!Array.isArray(savedPlan?.days)) return null;
  // Plans saved before we added protein, fibre and extra ingredients cannot be shown properly
  const firstMeal = savedPlan.days[0]?.meals?.[0];
  if (
    typeof firstMeal?.proteinGrams !== "number" ||
    !Array.isArray(firstMeal?.extraIngredients)
  ) {
    return null;
  }
  return savedPlan;
}

export function saveMealPlan(plan) {
  return writeSavedValue(storageKey, plan);
}
