import { siteConfig } from "@/config/siteConfig";
import { dayChecks } from "./dayChecks";
import { normalise } from "./textMatching";

const { minDaysBetweenSameDish } = siteConfig.limits;

// The same dish (at any meal) must not come back within a few days.
// The later day gets the blame, because that is the one we will redo.
function findRepeatProblems(plan) {
  const problems = [];
  const lastSeenOnDay = new Map();
  plan.days.forEach((day, dayIndex) => {
    for (const meal of day.meals) {
      const dishKey = normalise(meal.dishName);
      const lastDay = lastSeenOnDay.get(dishKey);
      if (
        lastDay !== undefined &&
        dayIndex - lastDay < minDaysBetweenSameDish
      ) {
        problems.push({
          dayIndex,
          text: `${day.day} ${meal.mealType} "${meal.dishName}" is repeated within ${minDaysBetweenSameDish} days. Choose a different dish.`,
        });
      }
      lastSeenOnDay.set(dishKey, dayIndex);
    }
  });
  return problems;
}

// Returns a list of { dayIndex, text } problems in plain English, so we know
// which day to redo. An empty list means the whole plan is good.
export function findPlanProblems(plan, ingredients, household) {
  const problems = [];
  plan.days.forEach((day, dayIndex) => {
    const context = { ingredients, household, dayIndex };
    for (const check of dayChecks) {
      for (const text of check(day, context)) problems.push({ dayIndex, text });
    }
  });
  return [...problems, ...findRepeatProblems(plan)];
}
