// The choices shown on the household setup screen, kept apart from the layout
// so wording can change without touching any screen code.

export const dietOptions = [
  { value: "veg", label: "Veg", accentColor: "var(--color-leaf)" },
  { value: "veg-egg", label: "Veg + eggs", accentColor: "var(--color-leaf)" },
  { value: "non-veg", label: "Non-veg", accentColor: "var(--color-chilli)" },
  { value: "both", label: "Both" },
];

export const spiceLevelOptions = [
  { value: "mild", label: "Mild" },
  { value: "medium", label: "Medium" },
  { value: "spicy", label: "Spicy" },
];

export const commonAllergyOptions = [
  { value: "peanuts", label: "Peanuts" },
  { value: "tree-nuts", label: "Tree nuts" },
  { value: "milk", label: "Milk and dairy" },
  { value: "eggs", label: "Eggs" },
  { value: "gluten", label: "Wheat and gluten" },
  { value: "soy", label: "Soy" },
  { value: "fish", label: "Fish" },
  { value: "shellfish", label: "Shellfish" },
  { value: "sesame", label: "Sesame" },
];

// What the form shows the first time, before anything is saved
export const defaultHousehold = {
  memberCount: 2,
  diet: "veg",
  spiceLevel: "medium",
  allergies: [],
  otherAllergies: "",
};
