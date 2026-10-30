import { makeIngredient } from "./makeIngredient";

const gluten = { allergens: ["gluten"] };

export const grainIngredients = [
  makeIngredient("Basmati rice", "grains"),
  makeIngredient("Regular rice", "grains"),
  makeIngredient("Brown rice", "grains"),
  makeIngredient("Wheat atta", "grains", gluten),
  makeIngredient("Maida", "grains", gluten),
  makeIngredient("Sooji (rava)", "grains", gluten),
  makeIngredient("Dalia (broken wheat)", "grains", gluten),
  makeIngredient("Poha (flattened rice)", "grains"),
  makeIngredient("Oats", "grains", gluten),
  makeIngredient("Ragi flour", "grains"),
  makeIngredient("Jowar flour", "grains"),
  makeIngredient("Bajra flour", "grains"),
  makeIngredient("Rice flour", "grains"),
  makeIngredient("Cornflour", "grains"),
  makeIngredient("Vermicelli (seviyan)", "grains", gluten),
  makeIngredient("Pasta", "grains", gluten),
  makeIngredient("Bread", "grains", gluten),
];

export const pulseIngredients = [
  makeIngredient("Toor dal", "pulses"),
  makeIngredient("Moong dal (yellow)", "pulses"),
  makeIngredient("Whole green moong", "pulses"),
  makeIngredient("Masoor dal", "pulses"),
  makeIngredient("Chana dal", "pulses"),
  makeIngredient("Urad dal", "pulses"),
  makeIngredient("Rajma", "pulses"),
  makeIngredient("Kabuli chana (chickpeas)", "pulses"),
  makeIngredient("Kala chana", "pulses"),
  makeIngredient("Lobia (black-eyed peas)", "pulses"),
  makeIngredient("Soya chunks", "pulses", { allergens: ["soy"] }),
  makeIngredient("Tofu", "pulses", { allergens: ["soy"] }),
];
