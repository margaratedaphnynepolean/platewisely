import { siteConfig } from "@/config/siteConfig";
import SiteHeader from "@/components/SiteHeader";
import WeeklyPlan from "@/components/WeeklyPlan";
import styles from "../ingredients/page.module.css";

export const metadata = {
  title: `Your week of meals - ${siteConfig.name}`,
};

// Screen 3 of the planner: the 7-day plan, one day at a time.
export default function PlanPage() {
  return (
    <>
      <SiteHeader />
      <main className={`page-width ${styles.main}`}>
        <h1 className={styles.heading}>Your week of meals</h1>
        <WeeklyPlan />
      </main>
    </>
  );
}
