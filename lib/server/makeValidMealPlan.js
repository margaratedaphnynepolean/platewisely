import { siteConfig } from "@/config/siteConfig";
import { PlanError } from "./planError";
import { generateDayPlan } from "./generateDayPlan";
import { findPlanProblems } from "./validateMealPlan";
import { runWithLimit } from "./runWithLimit";

const { dayNames } = siteConfig.limits;
const maxProblemsPerDay = 6; // keeps the retry note short

// Plans the 7 days a few at a time, checks the week, then redoes ONLY the days
// that broke a rule (telling Gemini what was wrong) until the week passes or we
// run out of tries. A plan that breaks the rules is never returned,
// because a wrong plan could include an allergen.
// "generateDay" can be swapped for a fake one when testing.
export async function makeValidMealPlan(
  household,
  ingredients,
  generateDay = generateDayPlan,
) {
  const { maxParallelDays } = siteConfig.ai;
  const days = await runWithLimit(dayNames, maxParallelDays, (_, dayIndex) =>
    generateDay(household, ingredients, dayIndex, {}),
  );

  for (let attempt = 1; attempt <= siteConfig.ai.maxAttempts; attempt++) {
    const problems = findPlanProblems({ days }, ingredients, household);
    if (problems.length === 0) return { days };
    if (attempt === siteConfig.ai.maxAttempts) break;

    const badDayIndexes = [...new Set(problems.map((p) => p.dayIndex))];
    console.warn(
      `Plan check ${attempt}: redoing ${badDayIndexes.length} day(s).`,
    );

    const redoneDays = await runWithLimit(
      badDayIndexes,
      maxParallelDays,
      (dayIndex) =>
        generateDay(household, ingredients, dayIndex, {
          problems: problems
            .filter((problem) => problem.dayIndex === dayIndex)
            .slice(0, maxProblemsPerDay)
            .map((problem) => problem.text),
          dishesToAvoid: dishesOnOtherDays(days, dayIndex),
        }),
    );
    badDayIndexes.forEach((dayIndex, position) => {
      days[dayIndex] = redoneDays[position];
    });
  }

  throw new PlanError(
    "We could not make a plan that fits everything you asked for. Try ticking a few more ingredients, especially protein foods like dal, paneer, eggs or chicken, and try again.",
    422,
  );
}

// Every dish planned on the other days, so a redone day does not copy them.
function dishesOnOtherDays(days, dayIndex) {
  return days
    .filter((_, index) => index !== dayIndex)
    .flatMap((day) => day.meals)
    .map((meal) => meal.dishName);
}
