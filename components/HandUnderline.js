import styles from "./HandUnderline.module.css";

// Wraps a few words and draws a wobbly, pen-style line under them,
// like someone underlined it in a kitchen notebook.
export default function HandUnderline({ children }) {
  return (
    <span className={styles.wrapper}>
      {children}
      <svg
        className={styles.line}
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2 8 C30 2, 55 11, 85 6 S140 3, 170 8 S190 6, 198 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
