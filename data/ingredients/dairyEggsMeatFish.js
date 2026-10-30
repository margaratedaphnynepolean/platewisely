import { makeIngredient } from "./makeIngredient";

const milk = { allergens: ["milk"] };
const nonVeg = { isVeg: false };
const egg = { isVeg: false, allergens: ["eggs"] };
const fish = { isVeg: false, allergens: ["fish"] };
const shellfish = { isVeg: false, allergens: ["shellfish"] };

export const dairyIngredients = [
  makeIngredient("Milk", "dairy", milk),
  makeIngredient("Curd (dahi)", "dairy", milk),
  makeIngredient("Paneer", "dairy", milk),
  makeIngredient("Ghee", "dairy", milk),
  makeIngredient("Butter", "dairy", milk),
  makeIngredient("Cheese", "dairy", milk),
  makeIngredient("Fresh cream", "dairy", milk),
];

export const eggIngredients = [
  makeIngredient("Eggs", "eggs", egg),
  makeIngredient("Duck eggs", "eggs", egg),
  makeIngredient("Quail eggs", "eggs", egg),
  makeIngredient("Egg whites", "eggs", egg),
];

export const meatIngredients = [
  makeIngredient("Chicken (curry cut)", "meat", nonVeg),
  makeIngredient("Chicken breast", "meat", nonVeg),
  makeIngredient("Chicken mince", "meat", nonVeg),
  makeIngredient("Mutton", "meat", nonVeg),
  makeIngredient("Mutton keema", "meat", nonVeg),
];

export const fishIngredients = [
  makeIngredient("Rohu", "fish", fish),
  makeIngredient("Pomfret", "fish", fish),
  makeIngredient("Surmai (kingfish)", "fish", fish),
  makeIngredient("Basa", "fish", fish),
  makeIngredient("Salmon", "fish", fish),
  makeIngredient("Prawns", "fish", shellfish),
  makeIngredient("Crab", "fish", shellfish),
];
