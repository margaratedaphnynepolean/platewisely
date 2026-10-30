import { useEffect, useState } from "react";
import { getAvailableIngredients } from "./ingredientFilter";
import { checkCustomName, makeCustomIngredient } from "./customIngredients";
import {
  loadCustomIngredientEntries,
  saveCustomIngredientEntries,
} from "./customIngredientStorage";

// Keeps the list of ingredients the user typed in themselves, saved on their phone.
// "builtInIngredients" is the ready-made catalog, used to spot duplicates.
export function useCustomIngredients(builtInIngredients, household) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(loadCustomIngredientEntries());
  }, []);

  const customIngredients = entries.map((entry) =>
    makeCustomIngredient(entry.name, entry.isVeg),
  );

  // Returns { message } if it could not be added, or { ingredient } if it was.
  function addCustomIngredient(typedName, isVeg) {
    const message = checkCustomName(
      typedName,
      [...builtInIngredients, ...customIngredients],
      entries.length,
    );
    if (message) return { message };

    const ingredient = makeCustomIngredient(typedName, isVeg);
    if (getAvailableIngredients([ingredient], household).length === 0) {
      return { message: "That is on your avoid list, so we left it out." };
    }

    const newEntries = [...entries, { name: ingredient.name, isVeg }];
    setEntries(newEntries);
    saveCustomIngredientEntries(newEntries);
    return { ingredient };
  }

  return { customIngredients, addCustomIngredient };
}
