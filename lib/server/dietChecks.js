import { siteConfig } from "@/config/siteConfig";
import { dietBannedWords } from "@/data/dietKeywords";
import { findWholeWords, mealText, normalise } from "./textMatching";

// Two checks about food that is not allowed or not on the user's list.
// Like the other day checks, each returns a list of plain-English problems.

const { maxExtraIngredientsPerDay } = siteConfig.limits;

// Does any dish go against the diet, for example chicken in a veg day?
// This also covers the extra ingredients, which are not on the user's list.
export function checkDiet(day, { household }) {
  const bannedWords = dietBannedWords[household.diet] ?? [];
  return day.meals.flatMap((meal) =>
    findWholeWords(bannedWords, mealText(meal)).map(
      (word) =>
        `${day.day} ${meal.mealType} mentions "${word}", which the diet does not allow.`,
    ),
  );
}

// A day may add only a few everyday items that are not on the user's list.
export function checkExtraIngredients(day) {
  const extras = new Set(
    day.meals.flatMap((meal) => meal.extraIngredients.map(normalise)),
  );
  if (extras.size <= maxExtraIngredientsPerDay) return [];
  return [
    `${day.day} adds ${extras.size} ingredients that are not on the list, but only ${maxExtraIngredientsPerDay} are allowed. Use fewer.`,
  ];
}
