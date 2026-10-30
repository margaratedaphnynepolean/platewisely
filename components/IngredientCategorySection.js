import ChipGroup from "./ChipGroup";
import styles from "./IngredientCategorySection.module.css";

// One collapsible group, like "Vegetables". Shows how many are ticked,
// and has a button to tick or clear the whole group at once.
export default function IngredientCategorySection({
  category,
  ingredients,
  selectedIds,
  isSearching,
  onToggleIngredient,
  onSetGroupSelection,
}) {
  const tickedCount = ingredients.filter((ingredient) =>
    selectedIds.includes(ingredient.id),
  ).length;
  const isEverythingTicked = tickedCount === ingredients.length;

  const chipOptions = ingredients.map((ingredient) => ({
    value: ingredient.id,
    label: ingredient.name,
    accentColor: ingredient.isVeg ? "var(--color-leaf)" : "var(--color-chilli)",
  }));

  return (
    <details className={styles.section} open={isSearching ? true : undefined}>
      <summary className={styles.summary}>
        <span className={styles.name}>{category.label}</span>
        <span className={styles.count}>
          {tickedCount} of {ingredients.length}
        </span>
      </summary>
      <div className={styles.body}>
        <label className={styles.selectAll}>
          <input
            type="checkbox"
            checked={isEverythingTicked}
            ref={(checkbox) => {
              // Shows a dash instead of a tick when only some are ticked
              if (checkbox) {
                checkbox.indeterminate = tickedCount > 0 && !isEverythingTicked;
              }
            }}
            onChange={() =>
              onSetGroupSelection(ingredients, !isEverythingTicked)
            }
          />
          Select all
        </label>
        <ChipGroup
          legend={category.label}
          hideLegend
          name={category.id}
          type="checkbox"
          options={chipOptions}
          selectedValues={selectedIds}
          onToggle={onToggleIngredient}
        />
      </div>
    </details>
  );
}
