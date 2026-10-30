import {
  grainIngredients,
  pulseIngredients,
} from "./ingredients/grainsAndPulses";
import {
  vegetableIngredients,
  fruitIngredients,
} from "./ingredients/vegetablesAndFruits";
import {
  dairyIngredients,
  eggIngredients,
  meatIngredients,
  fishIngredients,
} from "./ingredients/dairyEggsMeatFish";
import {
  spiceIngredients,
  oilIngredients,
  stapleIngredients,
} from "./ingredients/spicesOilsStaples";

// Every ingredient the picker can show. This is a starter list;
// add more items to the files in data/ingredients/ and they appear automatically.
export const ingredientCatalog = [
  ...vegetableIngredients,
  ...grainIngredients,
  ...pulseIngredients,
  ...dairyIngredients,
  ...eggIngredients,
  ...meatIngredients,
  ...fishIngredients,
  ...fruitIngredients,
  ...spiceIngredients,
  ...oilIngredients,
  ...stapleIngredients,
];
