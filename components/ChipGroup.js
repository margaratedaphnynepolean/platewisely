import styles from "./ChipGroup.module.css";

// A row of tappable options. Use type="radio" when only one can be chosen
// (like Veg or Non-veg) and type="checkbox" when several can be chosen (like allergies).
export default function ChipGroup({
  legend,
  hideLegend = false,
  name,
  type,
  options,
  selectedValues,
  onToggle,
}) {
  return (
    <fieldset className="field-group">
      <legend className={hideLegend ? "visually-hidden" : "field-label"}>
        {legend}
      </legend>
      <div className={styles.chips}>
        {options.map((option) => (
          <label
            key={option.value}
            className={styles.chip}
            style={
              option.accentColor
                ? {
                    "--chip-accent": option.accentColor,
                    "--chip-text": "var(--color-cream)",
                  }
                : undefined
            }
          >
            <input
              className={styles.input}
              type={type}
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => onToggle(option.value)}
            />
            <span className={styles.label}>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
