import Link from "next/link";
import { dietOptions } from "@/data/householdOptions";
import { pantryStaples } from "@/data/pantryStaples";
import styles from "./HouseholdSummary.module.css";

// The two lines at the top of the ingredient screen: who we are planning for,
// and which basics we assume everyone has.
export default function HouseholdSummary({ household }) {
  const dietLabel = dietOptions.find(
    (option) => option.value === household.diet,
  )?.label;
  const peopleWord = household.memberCount === 1 ? "person" : "people";

  return (
    <>
      <p className={styles.householdLine}>
        Planning for {household.memberCount} {peopleWord},{" "}
        {dietLabel?.toLowerCase()}. <Link href="/household">Change</Link>
      </p>
      <p className={styles.pantryNote}>
        We take these for granted, so no need to tick them:{" "}
        {pantryStaples.join(", ").toLowerCase()}.
      </p>
    </>
  );
}
