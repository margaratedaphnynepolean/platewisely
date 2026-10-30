import { howItWorksSteps } from "@/data/howItWorksSteps";
import styles from "./HowItWorks.module.css";

// A numbered list, like steps jotted in a recipe notebook.
export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className="page-width">
        <h2 className={styles.heading}>How it works</h2>
        <ol className={styles.steps}>
          {howItWorksSteps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.number}>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
