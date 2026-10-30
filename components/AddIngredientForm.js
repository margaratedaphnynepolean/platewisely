import { useState } from "react";
import { dietOptions } from "@/data/householdOptions";
import { siteConfig } from "@/config/siteConfig";
import ChipGroup from "./ChipGroup";
import styles from "./AddIngredientForm.module.css";

// Veg or non-veg only. "Both" makes no sense for a single ingredient.
const vegChoices = dietOptions.filter((option) =>
  ["veg", "non-veg"].includes(option.value),
);

// For anything missing from the list. "onAdd" returns a message if it
// could not add the item, or an empty text if it worked.
export default function AddIngredientForm({ isVegOnly, onAdd }) {
  const [typedName, setTypedName] = useState("");
  const [vegChoice, setVegChoice] = useState("veg");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const problem = onAdd(typedName, isVegOnly || vegChoice === "veg");
    setMessage(problem);
    if (!problem) setTypedName("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Not on the list?</h2>
      <label htmlFor="own-ingredient" className="field-hint">
        Type it in and we will add it to your week.
      </label>
      <input
        id="own-ingredient"
        className="text-input"
        type="text"
        value={typedName}
        maxLength={siteConfig.limits.maxCustomNameLength}
        placeholder="For example: drumstick leaves"
        onChange={(event) => setTypedName(event.target.value)}
      />
      {!isVegOnly && (
        <ChipGroup
          legend="Is it veg or non-veg?"
          name="own-ingredient-diet"
          type="radio"
          options={vegChoices}
          selectedValues={[vegChoice]}
          onToggle={setVegChoice}
        />
      )}
      <button type="submit" className="button">
        Add to my list
      </button>
      <p className={styles.message} role="status">
        {message}
      </p>
    </form>
  );
}
