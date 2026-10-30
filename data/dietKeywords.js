// Everyday words for foods a diet rules out, so we can spot them in a dish name,
// a method or an ingredient. Keys match the diet choices on the household screen.
const meatWords = [
  "chicken",
  "mutton",
  "lamb",
  "beef",
  "pork",
  "bacon",
  "sausage",
  "keema",
  "meat",
];
const fishWords = [
  "fish",
  "prawn",
  "shrimp",
  "crab",
  "salmon",
  "tuna",
  "pomfret",
  "rohu",
  "basa",
  "surmai",
];
const eggWords = ["egg", "omelette", "omelet"];

export const dietBannedWords = {
  veg: [...meatWords, ...fishWords, ...eggWords],
  "veg-egg": [...meatWords, ...fishWords],
  "non-veg": [],
  both: [],
};
