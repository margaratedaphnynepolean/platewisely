import { siteConfig } from "@/config/siteConfig";
import { pantryStaples } from "@/data/pantryStaples";
import { dayThemes } from "@/data/dayThemes";
import { pickStarIngredients } from "./starIngredients";

// The standing instructions Gemini gets every time. These are our meal rules
// from the build plan, written the way you would brief a helpful cook.
export function buildSystemPrompt() {
  const { mealsPerDay } = siteConfig.limits;
  const { minProteinGramsPerDay: minProtein, minFibreGramsPerDay: minFibre } =
    siteConfig.nutrition;
  const { maxExtraIngredientsPerDay: maxExtras } = siteConfig.limits;

  return `You plan one day of home meals for a busy working mother in India.
Write warm, practical, family-friendly food that a tired parent would be happy to cook.
The day has exactly these meals, in this order: ${mealsPerDay.join(", ")}.

Rules you must follow:
1. Cook with the ingredients the user lists, plus these pantry staples they always have:
   ${pantryStaples.join(", ")}. If a dish would clearly be better with an everyday item that is
   NOT on their list (for example curry leaves, lemon, coriander leaves or paneer), you may add
   at most ${maxExtras} such items across the whole day. Write them only in "extraIngredients",
   never in "ingredientsUsed". They must be cheap, easy to buy in India, and fit the diet and
   the avoid list. Most meals need none. Never use anything else, not even "a little" of it.
2. Never use a food from the avoid list, and never use anything made from it.
3. Follow the diet exactly. "Veg" means no meat, fish or eggs.
   "Veg with eggs" means no meat or fish, but eggs are welcome.
   "Non-veg" or "Both" means non-veg dishes are allowed, so mix them with veg dishes.
4. Follow the food style suggested for the day, but only when the ingredients truly allow it.
   Never invent an ingredient to fit a dish. Otherwise cook everyday Indian food.
5. The day should cover carbs, protein, vegetables and dairy or fruit across its meals.
6. Never repeat a dish from the list of dishes already planned, if one is given.
   Every meal inside this day must also be a different dish.
7. Where it helps, add a batch-cook hint (cook once, use twice). Otherwise leave it empty.
8. Match the spice level asked for.
9. Name ingredients in "ingredientsUsed" exactly as they appear in the user's list.
10. "shortMethod" is a real recipe in one or two plain sentences: the key steps
    in order, with the main spices and the cooking time. No vague lines like "cook until done".
11. Choose dishes that taste good together and that a family would actually enjoy.
12. For every meal, estimate "proteinGrams" and "fibreGrams" for ONE person's portion.
    Be honest: use realistic numbers for the ingredients and portion in that dish.
13. The day's meals added together MUST give at least ${minProtein} g protein and
    ${minFibre} g fibre per person. Check the sums before you answer.
    Reach them with the user's ingredients: lentils, beans, paneer, curd, eggs, chicken, fish,
    soy, nuts and seeds for protein; vegetables, fruit, whole grains, millets, lentils and beans for fibre.
    Do not make a meal unrealistic just to hit the numbers.
14. If eggs are on the list, give them real variety. Use a different preparation each time,
    never the same one twice in a week: boiled, omelette, bhurji, egg curry, egg paratha,
    egg fried rice, French toast, egg sandwich, muffins, shakshuka-style eggs.
15. Build the day around the "star foods" given for it, when they fit the day's food style.`;
}

const dietDescriptions = {
  veg: "Veg only (no meat, fish or eggs)",
  "veg-egg": "Veg with eggs (no meat or fish, eggs are allowed)",
  "non-veg": "Non-veg (meat, fish and eggs are allowed)",
  both: "Both veg and non-veg (mix them through the week)",
};

// The details for one day of this family's week. Their typed allergy note is placed
// inside quotes and labelled as data, so it is read as a food list, not as instructions.
// On a retry, "problems" lists what was wrong last time, and "dishesToAvoid"
// lists the dishes already planned on the other days.
export function buildDayPrompt(
  household,
  ingredients,
  dayIndex,
  { problems = [], dishesToAvoid = [] } = {},
) {
  const { dayNames, quickMealDays, quickMealMinutes } = siteConfig.limits;

  const avoidList = [...household.allergies];
  if (household.otherAllergies.trim()) {
    avoidList.push(`"${household.otherAllergies.trim()}"`);
  }

  const speedLine =
    dayIndex < quickMealDays
      ? `This is a weekday: every meal must take ${quickMealMinutes} minutes or less.`
      : "This is a weekend day: meals can take longer and be more elaborate.";

  const dishesNote =
    dishesToAvoid.length > 0
      ? `\nDishes already planned on other days (do not repeat them): ${dishesToAvoid.join(", ")}`
      : "";

  const retryNote =
    problems.length > 0
      ? `\n\nYour previous plan for this day broke some rules. Write the day again and fix all of these:\n${problems.map((problem) => `- ${problem}`).join("\n")}`
      : "";

  return `Plan ${dayNames[dayIndex]} for this household.
${speedLine}
Food style for the day: ${dayThemes[dayIndex]}

People eating: ${household.memberCount}
Diet: ${dietDescriptions[household.diet]}
Spice level: ${household.spiceLevel}
Star foods for the day: ${pickStarIngredients(ingredients, dayIndex).join(", ") || "none"}
Foods to avoid (allergies): ${avoidList.length > 0 ? avoidList.join(", ") : "none"}${dishesNote}

Ingredients they have this week:
${ingredients.map((ingredient) => `- ${ingredient.name}`).join("\n")}${retryNote}`;
}
