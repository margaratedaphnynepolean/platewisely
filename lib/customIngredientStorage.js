import { siteConfig } from "@/config/siteConfig";
import { readSavedValue, writeSavedValue } from "./browserStorage";

const storageKey = siteConfig.storageKeys.customIngredients;

// Returns the items the user added last time, as a list of { name, isVeg }.
export function loadCustomIngredientEntries() {
  const savedValue = readSavedValue(storageKey);
  if (!Array.isArray(savedValue)) return [];
  return savedValue.filter(
    (entry) =>
      typeof entry?.name === "string" && typeof entry?.isVeg === "boolean",
  );
}

export function saveCustomIngredientEntries(entries) {
  return writeSavedValue(storageKey, entries);
}
