import { siteConfig } from "@/config/siteConfig";
import { defaultHousehold } from "@/data/householdOptions";
import { readSavedValue, writeSavedValue } from "./browserStorage";

const storageKey = siteConfig.storageKeys.household;

// Returns the saved household, or null if nothing usable is saved.
export function loadHousehold() {
  const savedValue = readSavedValue(storageKey);
  if (!savedValue || typeof savedValue !== "object") return null;

  const savedHousehold = { ...defaultHousehold, ...savedValue };
  if (!Array.isArray(savedHousehold.allergies)) {
    savedHousehold.allergies = [];
  }
  return savedHousehold;
}

export function saveHousehold(household) {
  return writeSavedValue(storageKey, household);
}
