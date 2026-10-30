import { makeIngredient } from "./makeIngredient";

const spiceNames = [
  "Hing (asafoetida)",
  "Cardamom",
  "Cloves",
  "Cinnamon",
  "Bay leaf",
  "Black pepper",
  "Star anise",
  "Fennel seeds (saunf)",
  "Fenugreek seeds (methi dana)",
  "Ajwain",
  "Kasuri methi",
  "Amchur (dry mango powder)",
  "Chaat masala",
  "Sambar powder",
  "Pav bhaji masala",
  "Biryani masala",
  "Kashmiri chilli powder",
  "Dry red chilli",
  "Saffron",
  "Nutmeg",
];

const stapleNames = [
  "Besan (gram flour)",
  "Jaggery",
  "Tamarind",
  "Dry coconut",
  "Coconut milk",
  "Sabudana (sago)",
  "Papad",
  "Pickle (achar)",
  "Honey",
  "Baking powder",
  "Baking soda",
  "Cocoa powder",
  "Raisins",
  "Chia seeds",
  "Flax seeds",
];

export const spiceIngredients = [
  ...spiceNames.map((name) => makeIngredient(name, "spices")),
  makeIngredient("Sesame seeds (til)", "spices", { allergens: ["sesame"] }),
];

export const oilIngredients = [
  makeIngredient("Mustard oil", "oils"),
  makeIngredient("Coconut oil", "oils"),
  makeIngredient("Olive oil", "oils"),
  makeIngredient("Sesame oil", "oils", { allergens: ["sesame"] }),
  makeIngredient("Groundnut oil", "oils", { allergens: ["peanuts"] }),
];

export const stapleIngredients = [
  ...stapleNames.map((name) => makeIngredient(name, "staples")),
  makeIngredient("Peanuts", "staples", { allergens: ["peanuts"] }),
  makeIngredient("Peanut butter", "staples", { allergens: ["peanuts"] }),
  makeIngredient("Cashews", "staples", { allergens: ["tree-nuts"] }),
  makeIngredient("Almonds", "staples", { allergens: ["tree-nuts"] }),
  makeIngredient("Walnuts", "staples", { allergens: ["tree-nuts"] }),
  makeIngredient("Pistachios", "staples", { allergens: ["tree-nuts"] }),
];
