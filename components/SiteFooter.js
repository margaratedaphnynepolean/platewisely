import { siteConfig } from "@/config/siteConfig";
import styles from "./SiteFooter.module.css";

// A quiet line at the bottom of the page.
export default function SiteFooter() {
  return (
    <footer className={`page-width ${styles.footer}`}>
      <p>{siteConfig.name}. Made for busy kitchens.</p>
    </footer>
  );
}
