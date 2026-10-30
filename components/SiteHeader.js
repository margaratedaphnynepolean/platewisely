import Link from "next/link";
import Logo from "./Logo";
import styles from "./SiteHeader.module.css";

// The strip at the very top of every page. The logo takes you back home.
export default function SiteHeader() {
  return (
    <header className={`page-width ${styles.header}`}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Logo showName />
      </Link>
    </header>
  );
}
