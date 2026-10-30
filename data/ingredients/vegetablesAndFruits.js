import { makeIngredient } from "./makeIngredient";

const vegetableNames = [
  "Onion",
  "Tomato",
  "Potato",
  "Sweet potato",
  "Garlic",
  "Ginger",
  "Green chilli",
  "Spinach (palak)",
  "Methi leaves",
  "Coriander leaves",
  "Curry leaves",
  "Mint",
  "Cauliflower",
  "Cabbage",
  "Carrot",
  "Beetroot",
  "Green peas",
  "French beans",
  "Capsicum",
  "Brinjal (baingan)",
  "Okra (bhindi)",
  "Bottle gourd (lauki)",
  "Ridge gourd (turai)",
  "Bitter gourd (karela)",
  "Pumpkin",
  "Cucumber",
  "Radish (mooli)",
  "Drumstick",
  "Raw banana",
  "Mushrooms",
  "Sweet corn",
  "Broccoli",
  "Zucchini",
  "Spring onion",
];

const fruitNames = [
  "Banana",
  "Apple",
  "Mango",
  "Papaya",
  "Orange",
  "Pomegranate",
  "Grapes",
  "Watermelon",
  "Guava",
  "Pineapple",
  "Lemon",
  "Coconut (fresh)",
  "Dates",
];

export const vegetableIngredients = vegetableNames.map((name) =>
  makeIngredient(name, "vegetables"),
);

export const fruitIngredients = fruitNames.map((name) =>
  makeIngredient(name, "fruits"),
);
