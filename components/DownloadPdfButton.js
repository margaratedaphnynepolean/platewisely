"use client";

import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";

// The PDFs we can make. Each one's code is loaded only when its button is
// pressed, so it does not slow down opening the plan.
const pdfKinds = {
  plan: {
    label: "Download plan as PDF",
    fileName: siteConfig.pdf.planFileName,
    build: async (plan) =>
      (await import("@/lib/pdf/buildPlanPdf")).buildPlanPdf(plan),
  },
  grocery: {
    label: "Download grocery list as PDF",
    fileName: siteConfig.pdf.groceryFileName,
    build: async (plan) =>
      (await import("@/lib/pdf/buildGroceryPdf")).buildGroceryPdf(plan),
  },
};

// A button that saves the plan (kind="plan") or its grocery list (kind="grocery") as a PDF.
export default function DownloadPdfButton({ plan, kind }) {
  const [status, setStatus] = useState("idle"); // idle, working or failed
  const pdfKind = pdfKinds[kind];

  async function downloadPdf() {
    setStatus("working");
    try {
      const doc = await pdfKind.build(plan);
      doc.save(pdfKind.fileName);
      setStatus("idle");
    } catch (error) {
      console.error("Could not make the PDF:", error);
      setStatus("failed");
    }
  }

  return (
    <>
      <button
        type="button"
        className="button"
        onClick={downloadPdf}
        disabled={status === "working"}
      >
        {status === "working" ? "Making your PDF..." : pdfKind.label}
      </button>
      {status === "failed" && (
        <p role="alert">
          We could not make the PDF this time. Please try again.
        </p>
      )}
    </>
  );
}
