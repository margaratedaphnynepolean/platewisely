import styles from "./SelectionBar.module.css";

// The bar stuck to the bottom of the screen: how many are ticked, and the Done button.
export default function SelectionBar({
  selectedCount,
  minimumCount,
  onClearAll,
  isBusy,
  onDone,
}) {
  const needsMore = selectedCount < minimumCount;

  return (
    <div className={styles.bar}>
      <div className={`page-width ${styles.inner}`}>
        <p className={styles.message}>
          <strong>{selectedCount}</strong> ticked
          {needsMore && ` (pick at least ${minimumCount})`}
        </p>
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClearAll}
          disabled={selectedCount === 0 || isBusy}
        >
          Clear all
        </button>
        <button
          type="button"
          className="button"
          onClick={onDone}
          disabled={needsMore || isBusy}
        >
          {isBusy ? "Making your plan..." : "Make my plan"}
        </button>
      </div>
    </div>
  );
}
