import { siteConfig } from "@/config/siteConfig";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HouseholdForm from "@/components/HouseholdForm";
import styles from "./page.module.css";

export const metadata = {
  title: `Who is eating? - ${siteConfig.name}`,
};

// Screen 1 of the planner: a few quick questions about the people at home.
export default function HouseholdPage() {
  return (
    <>
      <SiteHeader />
      <main className={`page-width ${styles.main}`}>
        <h1 className={styles.heading}>Who is eating this week?</h1>
        <p className={styles.intro}>
          Four quick questions. You can change them any time.
        </p>
        <HouseholdForm />
      </main>
      <SiteFooter />
    </>
  );
}
