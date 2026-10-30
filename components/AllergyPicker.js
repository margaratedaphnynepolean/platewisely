import ChipGroup from "./ChipGroup";
import { commonAllergyOptions } from "@/data/householdOptions";
import styles from "./AllergyPicker.module.css";

// Allergy chips plus a free-text box for anything not on the list.
// This matters for safety: the meal plan must never include these foods.
export default function AllergyPicker({
  allergies,
  otherAllergies,
  onToggleAllergy,
  onOtherAllergiesChange,
}) {
  return (
    <>
      <ChipGroup
        legend="Any allergies at home?"
        name="allergies"
        type="checkbox"
        options={commonAllergyOptions}
        selectedValues={allergies}
        onToggle={onToggleAllergy}
      />
      <div className={styles.otherBox}>
        <label htmlFor="other-allergies" className="field-hint">
          Anything else we should avoid? (optional)
        </label>
        <input
          id="other-allergies"
          className="text-input"
          type="text"
          value={otherAllergies}
          maxLength={150}
          placeholder="For example: brinjal, mushrooms"
          onChange={(event) => onOtherAllergiesChange(event.target.value)}
        />
      </div>
    </>
  );
}
