import { siteConfig } from "@/config/siteConfig";
import { pantryStaples } from "@/data/pantryStaples";
import { allergyKeywords } from "@/data/allergyKeywords";
import { splitTypedAllergies } from "@/lib/ingredientFilter";
import { sumDayNutrition } from "@/lib/dayNutrition";
import { checkDiet, checkExtraIngredients } from "./dietChecks";
import { findWholeWords, mealText, normalise } from "./textMatching";

// Each check looks at ONE day and returns a list of plain-English problems.
// An empty list means that check passed. "context" holds the ingredients,
// the household, and the day's position in the week (0 = Monday).

const { mealsPerDay, quickMealDays, quickMealMinutes } = siteConfig.limits;

// Does the day have exactly the four meals, in order?
function checkMeals(day) {
  const mealTypes = day.meals.map((meal) => meal.mealType);
  if (mealTypes.join() === mealsPerDay.join()) return [];
  return [
    `${day.day} must have exactly these meals in order: ${mealsPerDay.join(", ")}.`,
  ];
}

// Does every meal use only the user's ingredients and the pantry staples?
function checkIngredients(day, { ingredients }) {
  const allowedNames = new Set(
    [...ingredients.map((ingredient) => ingredient.name), ...pantryStaples].map(
      normalise,
    ),
  );
  return day.meals.flatMap((meal) =>
    meal.ingredientsUsed
      .filter((name) => !allowedNames.has(normalise(name)))
      .map(
        (name) =>
          `${day.day} ${meal.mealType} uses "${name}", which is not on the ingredient list or pantry list. Use only listed items, or put it in extraIngredients.`,
      ),
  );
}

// Is any avoided food named in a dish name, method or ingredient?
function checkAvoidList(day, { household }) {
  const avoidedWords = [
    ...splitTypedAllergies(household.otherAllergies),
    ...household.allergies.flatMap((allergy) => allergyKeywords[allergy] ?? []),
  ];
  return day.meals.flatMap((meal) =>
    findWholeWords(avoidedWords, mealText(meal)).map(
      (word) =>
        `${day.day} ${meal.mealType} mentions "${word}", which this household must avoid.`,
    ),
  );
}

// Weekday meals should be quick.
function checkSpeed(day, { dayIndex }) {
  if (dayIndex >= quickMealDays) return [];
  return day.meals
    .filter((meal) => meal.prepMinutes > quickMealMinutes)
    .map(
      (meal) =>
        `${day.day} ${meal.mealType} takes ${meal.prepMinutes} minutes. Weekday meals must be ${quickMealMinutes} minutes or less.`,
    );
}

// Does the day reach the daily protein and fibre, with believable numbers per meal?
function checkNutrition(day) {
  const { minProteinGramsPerDay, minFibreGramsPerDay, maxGramsInOneMeal } =
    siteConfig.nutrition;
  const problems = [];

  for (const meal of day.meals) {
    const isBelievable = [meal.proteinGrams, meal.fibreGrams].every(
      (grams) => grams >= 0 && grams <= maxGramsInOneMeal,
    );
    if (!isBelievable) {
      problems.push(
        `${day.day} ${meal.mealType} has protein or fibre numbers that are not realistic for one portion.`,
      );
    }
  }

  const totals = sumDayNutrition(day);
  if (
    siteConfig.nutrition.mustMeetDailyMinimums &&
    (totals.protein < minProteinGramsPerDay ||
      totals.fibre < minFibreGramsPerDay)
  ) {
    problems.push(
      `${day.day} adds up to ${Math.round(totals.protein)} g protein and ${Math.round(totals.fibre)} g fibre per person, but needs at least ${minProteinGramsPerDay} g protein and ${minFibreGramsPerDay} g fibre. Change the dishes or portions.`,
    );
  }
  return problems;
}

export const dayChecks = [
  checkMeals,
  checkIngredients,
  checkAvoidList,
  checkDiet,
  checkExtraIngredients,
  checkSpeed,
  checkNutrition,
];
