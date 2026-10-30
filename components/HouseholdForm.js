"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import {
  defaultHousehold,
  dietOptions,
  spiceLevelOptions,
} from "@/data/householdOptions";
import { loadHousehold, saveHousehold } from "@/lib/householdStorage";
import ChipGroup from "./ChipGroup";
import MemberCountStepper from "./MemberCountStepper";
import AllergyPicker from "./AllergyPicker";
import styles from "./HouseholdForm.module.css";

// The household setup form. "State" below means the form's memory:
// what is currently ticked or typed, which the screen redraws whenever it changes.
export default function HouseholdForm() {
  const [household, setHousehold] = useState(defaultHousehold);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle, saved or failed

  // On first open, fill the form with what was saved last time (if anything)
  useEffect(() => {
    const savedHousehold = loadHousehold();
    if (savedHousehold) setHousehold(savedHousehold);
  }, []);

  function updateField(fieldName, newValue) {
    setHousehold((current) => ({ ...current, [fieldName]: newValue }));
    setSaveStatus("idle");
  }

  function toggleAllergy(allergyValue) {
    const isAlreadyTicked = household.allergies.includes(allergyValue);
    updateField(
      "allergies",
      isAlreadyTicked
        ? household.allergies.filter((allergy) => allergy !== allergyValue)
        : [...household.allergies, allergyValue],
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaveStatus(saveHousehold(household) ? "saved" : "failed");
  }

  return (
    <form onSubmit={handleSubmit}>
      <MemberCountStepper
        count={household.memberCount}
        minimum={1}
        maximum={siteConfig.limits.maxHouseholdMembers}
        onChange={(newCount) => updateField("memberCount", newCount)}
      />
      <ChipGroup
        legend="What will you eat this week?"
        name="diet"
        type="radio"
        options={dietOptions}
        selectedValues={[household.diet]}
        onToggle={(diet) => updateField("diet", diet)}
      />
      <ChipGroup
        legend="How spicy do you like it?"
        name="spiceLevel"
        type="radio"
        options={spiceLevelOptions}
        selectedValues={[household.spiceLevel]}
        onToggle={(level) => updateField("spiceLevel", level)}
      />
      <AllergyPicker
        allergies={household.allergies}
        otherAllergies={household.otherAllergies}
        onToggleAllergy={toggleAllergy}
        onOtherAllergiesChange={(text) => updateField("otherAllergies", text)}
      />

      <button type="submit" className="button">
        Save
      </button>

      <p className={styles.status} role="status">
        {saveStatus === "saved" && (
          <>
            Saved on this phone.
            <Link href="/ingredients" className={`button ${styles.nextStep}`}>
              Now pick your ingredients
            </Link>
          </>
        )}
        {saveStatus === "failed" &&
          "We could not save this. Your browser may be blocking storage, for example in private mode."}
      </p>
    </form>
  );
}
