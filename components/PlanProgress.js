"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import styles from "./PlanProgress.module.css";

// What we tell the user as the bar fills up.
const progressMessages = [
  { upToPercent: 25, text: "Looking at what is in your kitchen..." },
  { upToPercent: 55, text: "Planning each day's meals..." },
  { upToPercent: 85, text: "Writing the recipes..." },
  { upToPercent: 100, text: "Checking it against your diet and allergies..." },
];

const barStopsAtPercent = 95; // never shows 100% until the plan has really arrived

// A progress bar for the wait. The server cannot tell us how far along it is,
// so the bar moves by the clock, using the usual wait time from the settings.
export default function PlanProgress() {
  const [secondsPassed, setSecondsPassed] = useState(0);

  useEffect(() => {
    const timerId = setInterval(
      () => setSecondsPassed((seconds) => seconds + 1),
      1000,
    );
    return () => clearInterval(timerId);
  }, []);

  const percent = Math.min(
    barStopsAtPercent,
    Math.round((secondsPassed / siteConfig.ai.expectedPlanSeconds) * 100),
  );
  const message = progressMessages.find(
    (step) => percent <= step.upToPercent,
  ).text;

  return (
    <div className={styles.wrapper} role="status">
      <progress
        className={styles.bar}
        max="100"
        value={percent}
        aria-label="Making your plan"
      />
      <p>{message} This can take a couple of minutes.</p>
    </div>
  );
}
