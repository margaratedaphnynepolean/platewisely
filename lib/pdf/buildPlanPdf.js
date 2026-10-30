import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { siteConfig } from "@/config/siteConfig";
import { sumDayNutrition } from "@/lib/dayNutrition";
import {
  countIngredientUse,
  listCookAheadTips,
  listExtraIngredients,
} from "./planSummary";
import {
  addFooters,
  addHeading,
  pageMargin,
  plain,
  tableStyle,
} from "./pdfCommon";

// Builds the printable PDF: A4 landscape, black and white so it prints cheaply.
// Page 1 is the week in a table. Page 2 is what to buy and how to prep.

function addWeekTable(doc, plan) {
  const mealTypes = siteConfig.limits.mealsPerDay;
  addHeading(doc, "Your week of meals", 16);

  autoTable(doc, {
    ...tableStyle,
    startY: 21,
    head: [["Day", ...mealTypes, "Per person"]],
    body: plan.days.map((day) => {
      const totals = sumDayNutrition(day);
      return [
        day.day,
        ...mealTypes.map((type) => {
          const meal = day.meals.find((entry) => entry.mealType === type);
          return plain(meal?.dishName ?? "");
        }),
        `${Math.round(totals.protein)} g protein\n${Math.round(totals.fibre)} g fibre`,
      ];
    }),
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 24 },
      5: { cellWidth: 28 },
    },
  });

  doc.setFont("helvetica", "normal").setFontSize(8);
  doc.text(
    "Protein and fibre are estimates for one person, not medical advice.",
    pageMargin,
    doc.lastAutoTable.finalY + 6,
  );
}

// A short wrapped list like "Ginger (16), Onion (13)", which takes far less room than a table.
function addIngredientList(doc, plan, startY) {
  const pageWidth = doc.internal.pageSize.width - pageMargin * 2;
  const listText = countIngredientUse(plan)
    .map((item) => `${plain(item.name)} (${item.meals})`)
    .join(", ");

  doc.setFont("helvetica", "bold").setFontSize(10);
  doc.text("Ingredients and how many meals use them", pageMargin, startY);
  doc.setFont("helvetica", "normal").setFontSize(9);
  const lines = doc.splitTextToSize(listText, pageWidth);
  doc.text(lines, pageMargin, startY + 6);
  return startY + 6 + lines.length * 4.5 + 6;
}

function addSummaryPage(doc, plan) {
  doc.addPage();
  addHeading(doc, "What to buy and how to prep", 16);
  let nextY = 21;

  const extras = listExtraIngredients(plan);
  if (extras.length > 0) {
    autoTable(doc, {
      ...tableStyle,
      startY: nextY,
      head: [["Also buy (not on your list)", "Needed on"]],
      body: extras.map((item) => [plain(item.name), item.days.join(", ")]),
    });
    nextY = doc.lastAutoTable.finalY + 8;
  }

  nextY = addIngredientList(doc, plan, nextY);

  const tips = listCookAheadTips(plan);
  if (tips.length > 0) {
    autoTable(doc, {
      ...tableStyle,
      startY: nextY,
      head: [["Cook ahead", "Tip"]],
      body: tips.map((entry) => [entry.meal, plain(entry.tip)]),
    });
  }
}

// Returns the finished PDF document. Call .save(fileName) on it to download.
export function buildPlanPdf(plan) {
  const doc = new jsPDF({ orientation: "landscape", format: "a4" });
  addWeekTable(doc, plan);
  addSummaryPage(doc, plan);
  addFooters(doc);
  return doc;
}
