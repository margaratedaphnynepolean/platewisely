import styles from "./DayTabs.module.css";

// A row of buttons, one per day. The chosen day is highlighted.
export default function DayTabs({ dayNames, selectedIndex, onSelect }) {
  return (
    <div className={styles.tabs} role="group" aria-label="Choose a day">
      {dayNames.map((dayName, index) => (
        <button
          key={dayName}
          type="button"
          className={styles.tab}
          aria-pressed={index === selectedIndex}
          aria-label={dayName}
          onClick={() => onSelect(index)}
        >
          {dayName.slice(0, 3)}
        </button>
      ))}
    </div>
  );
}
