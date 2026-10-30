// Everyday words that point to each allergy, so we can spot them in a dish name
// or method even if Gemini did not list them as an ingredient.
// The ids match the allergy chips on the household screen.
export const allergyKeywords = {
  peanuts: ["peanut", "groundnut"],
  "tree-nuts": ["almond", "cashew", "walnut", "pistachio", "hazelnut"],
  milk: [
    "milk",
    "paneer",
    "curd",
    "yogurt",
    "yoghurt",
    "ghee",
    "butter",
    "cheese",
    "cream",
  ],
  eggs: ["egg"],
  gluten: ["wheat", "atta", "maida", "semolina", "rava", "suji", "bread"],
  soy: ["soy", "soya", "tofu"],
  fish: ["fish"],
  shellfish: ["prawn", "shrimp", "crab"],
  sesame: ["sesame", "gingelly"],
};
