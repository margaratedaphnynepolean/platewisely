// Lower-cases and trims, so "Paneer " and "paneer" count as the same thing.
export function normalise(text) {
  return text.trim().toLowerCase();
}

// All the words of one meal in lower case: its name, method and every ingredient.
export function mealText(meal) {
  return [
    meal.dishName,
    meal.shortMethod,
    ...meal.ingredientsUsed,
    ...meal.extraIngredients,
  ]
    .join(" ")
    .toLowerCase();
}

// Which of these words appear in the text? \b makes it match whole words,
// so "egg" does not flag "eggplant".
export function findWholeWords(words, text) {
  return words.filter((word) => new RegExp(`\\b${word}s?\\b`).test(text));
}
