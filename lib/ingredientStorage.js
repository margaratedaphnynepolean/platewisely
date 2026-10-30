import { siteConfig } from "@/config/siteConfig";
import { readSavedValue, writeSavedValue } from "./browserStorage";

const storageKey = siteConfig.storageKeys.ingredients;

// Returns the ids of the ingredients ticked last time (an empty list if none).
export function loadSelectedIngredientIds() {
  const savedValue = readSavedValue(storageKey);
  if (!Array.isArray(savedValue)) return [];
  return savedValue.filter((id) => typeof id === "string");
}

export function saveSelectedIngredientIds(selectedIds) {
  return writeSavedValue(storageKey, selectedIds);
}
