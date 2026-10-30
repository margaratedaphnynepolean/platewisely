// All the app's settings live here, so nothing is scattered through the code.
// Change a colour or a limit here and the whole app follows.

export const siteConfig = {
  name: "PlateWisely",
  tagline: "Pick your ingredients. We plan the week.",
  description:
    "Tell PlateWisely what is in your kitchen and get a balanced 7-day Indian meal plan, ready to print.",

  // Brand colours (from the build plan)
  colors: {
    turmeric: "#F29F05", // main colour: warm, spicy
    leaf: "#4C9A2A", // fresh, veg
    chilli: "#D64933", // non-veg tag, alerts
    cream: "#FFF8EC", // page background
    charcoal: "#2B2B2B", // text
  },

  // Limits for the plans (free tier numbers are placeholders until the pricing decision)
  // How many plans can be made in 24 hours. Each plan costs AI usage.
  rateLimit: {
    plansPerVisitorPerDay: 3,
    plansPerDayForEveryone: 20,
  },
  limits: {
    daysInPlan: 7,
    mealsPerDay: ["Breakfast", "Lunch", "Dinner", "Snacks"],
    dayNames: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    quickMealDays: 5, // Monday to Friday should be quick
    quickMealMinutes: 30,
    minDaysBetweenSameDish: 3, // no dish (any meal) may come back sooner than this
    maxExtraIngredientsPerDay: 2, // items not on the user's list that a day may add
    freePlansPerMonth: 3,
    maxHouseholdMembers: 12,
    minIngredientsForPlan: 5,
    maxCustomIngredients: 20,
    minCustomNameLength: 2,
    maxCustomNameLength: 40,
  },

  // What each person's day of meals must add up to. These are common guideline
  // numbers for an adult woman, so they are easy to change here.
  nutrition: {
    minProteinGramsPerDay: 50,
    minFibreGramsPerDay: 25,
    mustMeetDailyMinimums: false, // turned off while testing, so days are not redone. Set true to enforce.
    maxGramsInOneMeal: 60, // anything higher is a wrong guess, not real food
  },

  // Names under which things are saved in the phone's browser storage
  pdf: {
    planFileName: "platewisely-weekly-plan.pdf",
    groceryFileName: "platewisely-grocery-list.pdf",
  },

  storageKeys: {
    household: "platewise.household",
    ingredients: "platewise.ingredients",
    customIngredients: "platewise.customIngredients",
    mealPlan: "platewise.mealPlan",
  },

  // Which Gemini model writes the meal plans, and how much room it gets.
  ai: {
    model: "gemini-3.1-flash-lite",
    maxOutputTokens: 4000, // for one day of meals
    thinkingLevel: "low", // less thinking time: plans arrive faster and cost less
    expectedPlanSeconds: 60, // only used to pace the progress bar
    maxParallelDays: 4, // free plan allows only a few requests a minute. Raise it on a paid plan.
    maxAttempts: 3, // how many times we let Gemini try before giving up
    maxOtherAllergiesLength: 150,
  },

  // Where the backend lives. Empty means "this same website" (our /api routes).
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
};
