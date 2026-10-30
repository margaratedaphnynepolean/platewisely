import styles from "./MealCard.module.css";

// One meal on the plan: what it is, how long it takes and how to make it.
export default function MealCard({ meal }) {
  return (
    <article className={styles.card}>
      <p className={styles.mealType}>
        {meal.mealType} <span>about {meal.prepMinutes} minutes</span>
      </p>
      <h3 className={styles.dishName}>{meal.dishName}</h3>
      <p>{meal.shortMethod}</p>
      <p className={styles.detail}>
        <strong>Per person:</strong> {meal.proteinGrams} g protein,{" "}
        {meal.fibreGrams} g fibre
      </p>
      <p className={styles.detail}>
        <strong>Uses:</strong> {meal.ingredientsUsed.join(", ")}
      </p>
      {meal.extraIngredients.length > 0 && (
        <p className={styles.detail}>
          <strong>Also buy (not on your list):</strong>{" "}
          {meal.extraIngredients.join(", ")}
        </p>
      )}
      {meal.batchCookHint && (
        <p className={styles.detail}>
          <strong>Cook ahead:</strong> {meal.batchCookHint}
        </p>
      )}
    </article>
  );
}
