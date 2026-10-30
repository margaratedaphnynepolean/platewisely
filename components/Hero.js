import Link from "next/link";
import HandUnderline from "./HandUnderline";
import styles from "./Hero.module.css";

// The first thing a visitor reads: what the app does, in one breath.
export default function Hero() {
  return (
    <section className={`page-width ${styles.hero}`}>
      <h1 className={styles.heading}>
        Pick your ingredients.
        <br />
        <HandUnderline>We plan the week.</HandUnderline>
      </h1>
      <p className={styles.intro}>
        Tell us what is in your kitchen and whether you are cooking veg, non-veg
        or both. You get breakfast, lunch, dinner and snacks for all seven days,
        cooked with the masalas you already know. Print it and stick it on the
        fridge.
      </p>
      <div className={styles.actions}>
        <Link className="button" href="/household">
          Start planning
        </Link>
        <a href="#how-it-works">See how it works</a>
      </div>
    </section>
  );
}
