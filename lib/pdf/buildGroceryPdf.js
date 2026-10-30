import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { buildGroceryGroups } from "./groceryList";
import {
  addFooters,
  addHeading,
  pageMargin,
  plain,
  tableStyle,
} from "./pdfCommon";

// Builds the grocery checklist: A4 portrait, one table, with a tick box
// beside every item so it can be crossed off in the shop.

const boxSize = 3.5;

// One heading row per group, then one row per item.
function makeRows(groups) {
  return groups.flatMap((group) => [
    [
      {
        content: plain(group.title),
        colSpan: 3,
        styles: { fillColor: [225, 225, 225], fontStyle: "bold" },
      },
    ],
    ...group.items.map((item) => ["", plain(item.name), item.note]),
  ]);
}

// Draws an empty square in the first column of each item row.
function drawTickBox(data) {
  const isItemCell =
    data.section === "body" &&
    data.column.index === 0 &&
    data.cell.colSpan === 1;
  if (!isItemCell) return;
  const { x, y, height } = data.cell;
  data.doc.setLineWidth(0.3);
  data.doc.rect(x + 2.5, y + (height - boxSize) / 2, boxSize, boxSize);
}

// Returns the finished PDF document. Call .save(fileName) on it to download.
export function buildGroceryPdf(plan) {
  const doc = new jsPDF({ orientation: "portrait", format: "a4" });
  addHeading(doc, "Grocery list for the week", 16);
  doc
    .setFont("helvetica", "normal")
    .setFontSize(9)
    .text(
      "Tick off what you need. Check your kitchen first, as you may already have some.",
      pageMargin,
      22,
    );

  autoTable(doc, {
    ...tableStyle,
    startY: 27,
    body: makeRows(buildGroceryGroups(plan)),
    columnStyles: { 0: { cellWidth: 9 }, 2: { cellWidth: 30 } },
    didDrawCell: drawTickBox,
  });

  addFooters(doc);
  return doc;
}
