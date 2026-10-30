"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSavedMealPlan } from "@/lib/mealPlanStorage";
import { sumDayNutrition } from "@/lib/dayNutrition";
import DayTabs from "./DayTabs";
import DownloadPdfButton from "./DownloadPdfButton";
import DayTotals from "./DayTotals";
import MealCard from "./MealCard";
import styles from "./WeeklyPlan.module.css";

// The plan screen: pick a day, see that day's four meals.
export default function WeeklyPlan() {
  // undefined = still reading the phone's storage, null = no plan saved yet
  const [plan, setPlan] = useState(undefined);
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    setPlan(loadSavedMealPlan());
  }, []);

  if (plan === undefined) return null;

  if (plan === null) {
    return (
      <p>
        You do not have a plan yet.{" "}
        <Link href="/ingredients">Pick your ingredients</Link> and we will make
        one.
      </p>
    );
  }

  const day = plan.days[dayIndex];
  return (
    <>
      <DayTabs
        dayNames={plan.days.map((planDay) => planDay.day)}
        selectedIndex={dayIndex}
        onSelect={setDayIndex}
      />
      <h2 className={styles.dayName}>{day.day}</h2>
      <DayTotals totals={sumDayNutrition(day)} />
      {day.meals.map((meal) => (
        <MealCard key={meal.mealType} meal={meal} />
      ))}
      <div className={styles.download}>
        <DownloadPdfButton plan={plan} kind="plan" />
        <DownloadPdfButton plan={plan} kind="grocery" />
      </div>
      <p className={styles.again}>
        Different ingredients this week?{" "}
        <Link href="/ingredients">Make a new plan</Link>
      </p>
    </>
  );
}
