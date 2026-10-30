"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { defaultHousehold } from "@/data/householdOptions";
import { ingredientCatalog } from "@/data/ingredientCatalog";
import { ingredientCategories } from "@/data/ingredientCategories";
import { loadHousehold } from "@/lib/householdStorage";
import {
  loadSelectedIngredientIds,
  saveSelectedIngredientIds,
} from "@/lib/ingredientStorage";
import {
  getAvailableIngredients,
  searchIngredients,
  groupByCategory,
} from "@/lib/ingredientFilter";
import { useCustomIngredients } from "@/lib/useCustomIngredients";
import { useMakeMealPlan } from "@/lib/useMakeMealPlan";
import HouseholdSummary from "./HouseholdSummary";
import IngredientSearchBox from "./IngredientSearchBox";
import AddIngredientForm from "./AddIngredientForm";
import IngredientCategorySection from "./IngredientCategorySection";
import PlanProgress from "./PlanProgress";
import SelectionBar from "./SelectionBar";
import styles from "./IngredientPicker.module.css";

// The ingredient picker screen. It remembers last week's ticks, so a returning
// user only has to adjust a few things instead of starting from scratch.
export default function IngredientPicker() {
  const [household, setHousehold] = useState(defaultHousehold);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { isWorking, errorMessage, makeMealPlan } = useMakeMealPlan();

  useEffect(() => {
    const savedHousehold = loadHousehold();
    if (savedHousehold) setHousehold(savedHousehold);
    setSelectedIds(loadSelectedIngredientIds());
  }, []);

  const { customIngredients, addCustomIngredient } = useCustomIngredients(
    ingredientCatalog,
    household,
  );
  const availableIngredients = getAvailableIngredients(
    [...customIngredients, ...ingredientCatalog],
    household,
  );
  const matchingIngredients = searchIngredients(
    availableIngredients,
    searchText,
  );
  const groups = groupByCategory(matchingIngredients, ingredientCategories);
  const selectedCount = availableIngredients.filter((ingredient) =>
    selectedIds.includes(ingredient.id),
  ).length;

  // Every change goes through here so it is saved straight away
  function updateSelection(newSelectedIds) {
    setSelectedIds(newSelectedIds);
    saveSelectedIngredientIds(newSelectedIds);
  }

  function toggleIngredient(ingredientId) {
    updateSelection(
      selectedIds.includes(ingredientId)
        ? selectedIds.filter((id) => id !== ingredientId)
        : [...selectedIds, ingredientId],
    );
  }

  // Adds the user's own ingredient and ticks it. Returns a message if it failed.
  function addOwnIngredient(typedName, isVeg) {
    const result = addCustomIngredient(typedName, isVeg);
    if (result.ingredient) {
      updateSelection([...selectedIds, result.ingredient.id]);
    }
    return result.message ?? "";
  }

  function setGroupSelection(groupIngredients, shouldTick) {
    const groupIds = groupIngredients.map((ingredient) => ingredient.id);
    const idsWithoutGroup = selectedIds.filter((id) => !groupIds.includes(id));
    updateSelection(
      shouldTick ? [...idsWithoutGroup, ...groupIds] : idsWithoutGroup,
    );
  }

  // Sends only what this household can use; the server checks it all again.
  function makePlan() {
    makeMealPlan({
      household,
      ingredientIds: availableIngredients
        .filter((ingredient) => selectedIds.includes(ingredient.id))
        .map((ingredient) => ingredient.id),
      customIngredients: customIngredients.map(({ name, isVeg }) => ({
        name,
        isVeg,
      })),
    });
  }

  return (
    <>
      <HouseholdSummary household={household} />

      <IngredientSearchBox searchText={searchText} onChange={setSearchText} />

      {groups.map((group) => (
        <IngredientCategorySection
          key={group.category.id}
          category={group.category}
          ingredients={group.ingredients}
          selectedIds={selectedIds}
          isSearching={searchText.trim() !== ""}
          onToggleIngredient={toggleIngredient}
          onSetGroupSelection={setGroupSelection}
        />
      ))}
      {groups.length === 0 && (
        <p>
          Nothing matches &quot;{searchText}&quot;. Try another spelling, or add
          it below.
        </p>
      )}

      <AddIngredientForm
        isVegOnly={["veg", "veg-egg"].includes(household.diet)}
        onAdd={addOwnIngredient}
      />

      {isWorking && <PlanProgress />}
      {errorMessage && (
        <p className={styles.error} role="alert">
          {errorMessage}
        </p>
      )}

      <SelectionBar
        selectedCount={selectedCount}
        minimumCount={siteConfig.limits.minIngredientsForPlan}
        onClearAll={() => updateSelection([])}
        isBusy={isWorking}
        onDone={makePlan}
      />
    </>
  );
}
