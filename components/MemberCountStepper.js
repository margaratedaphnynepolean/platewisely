import styles from "./MemberCountStepper.module.css";

// A "minus  3  plus" control for choosing how many people are eating.
export default function MemberCountStepper({
  count,
  minimum,
  maximum,
  onChange,
}) {
  return (
    <div className="field-group" role="group" aria-labelledby="member-count">
      <span id="member-count" className="field-label">
        How many people are you cooking for?
      </span>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(count - 1)}
          disabled={count <= minimum}
          aria-label="One person fewer"
        >
          -
        </button>
        <output className={styles.count} aria-live="polite">
          {count}
        </output>
        <button
          type="button"
          className={styles.button}
          onClick={() => onChange(count + 1)}
          disabled={count >= maximum}
          aria-label="One person more"
        >
          +
        </button>
      </div>
    </div>
  );
}
