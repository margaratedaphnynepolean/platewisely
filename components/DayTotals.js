import { siteConfig } from "@/config/siteConfig";
import styles from "./DayTotals.module.css";

// Shows what the whole day adds up to, next to the daily goal.
// The numbers are estimates made when the plan was written.
export default function DayTotals({ totals }) {
  const { minProteinGramsPerDay, minFibreGramsPerDay } = siteConfig.nutrition;

  return (
    <div className={styles.box}>
      <p>
        <strong>Today, per person:</strong> about {Math.round(totals.protein)} g
        protein (goal {minProteinGramsPerDay} g) and {Math.round(totals.fibre)}{" "}
        g fibre (goal {minFibreGramsPerDay} g).
      </p>
      <p className={styles.note}>
        These are estimates, not medical advice. Children and anyone with a
        health condition may need different amounts.
      </p>
    </div>
  );
}
