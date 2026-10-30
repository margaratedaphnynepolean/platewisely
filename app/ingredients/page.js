import { siteConfig } from "@/config/siteConfig";
import SiteHeader from "@/components/SiteHeader";
import IngredientPicker from "@/components/IngredientPicker";
import styles from "./page.module.css";

export const metadata = {
  title: `What is in your kitchen? - ${siteConfig.name}`,
};

// Screen 2 of the planner: tick what you have at home this week.
export default function IngredientsPage() {
  return (
    <>
      <SiteHeader />
      <main className={`page-width ${styles.main}`}>
        <h1 className={styles.heading}>What is in your kitchen?</h1>
        <p className={styles.intro}>
          Tick what you have this week. Skip anything you have run out of.
        </p>
        <IngredientPicker />
      </main>
    </>
  );
}
