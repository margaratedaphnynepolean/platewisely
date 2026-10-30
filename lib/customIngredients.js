import { siteConfig } from "@/config/siteConfig";

// Rules for ingredients the user types in themselves. Both the app and the
// server use these, so a name that passes here is safe to send to Gemini.

const { minCustomNameLength, maxCustomNameLength, maxCustomIngredients } =
  siteConfig.limits;

// Letters (any language), numbers, spaces, hyphens and apostrophes only.
export const customNamePattern = /^[\p{L}\p{N} '’-]+$/u;

// Tidies what was typed: trims it and squashes repeated spaces.
export function cleanCustomName(typedName) {
  return typedName.trim().replace(/\s+/g, " ");
}

// Builds a custom ingredient in the same shape as the built-in ones.
export function makeCustomIngredient(typedName, isVeg) {
  const name = cleanCustomName(typedName);
  return {
    id: `custom-${name.toLowerCase().replace(/ /g, "-")}`,
    name,
    category: "custom",
    isVeg,
    allergens: [],
  };
}

// Returns a friendly message if the name cannot be added, or "" if it is fine.
// "takenIngredients" is everything already on the screen (built-in and custom).
export function checkCustomName(typedName, takenIngredients, customCount) {
  const name = cleanCustomName(typedName);

  if (customCount >= maxCustomIngredients) {
    return `You can add up to ${maxCustomIngredients} of your own items.`;
  }
  if (name.length < minCustomNameLength) {
    return "Please type the ingredient's name.";
  }
  if (name.length > maxCustomNameLength) {
    return `Please keep the name under ${maxCustomNameLength} letters.`;
  }
  if (!customNamePattern.test(name)) {
    return "Please use only letters, numbers and spaces.";
  }
  const alreadyThere = takenIngredients.some(
    (ingredient) => ingredient.name.toLowerCase() === name.toLowerCase(),
  );
  if (alreadyThere)
    return "That one is already on the list. Try searching for it.";

  return "";
}
