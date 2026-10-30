import { siteConfig } from "@/config/siteConfig";

// Pieces both PDFs share: margins, the black-and-white table look,
// text clean-up, headings and the footer.

export const pageMargin = 12;

export const tableStyle = {
  theme: "grid",
  margin: { left: pageMargin, right: pageMargin, bottom: 16 },
  styles: {
    font: "helvetica",
    fontSize: 9,
    textColor: 0,
    lineColor: 0,
    lineWidth: 0.2,
  },
  headStyles: { fillColor: [225, 225, 225], textColor: 0, fontStyle: "bold" },
};

// The built-in PDF font only knows basic Latin letters, so curly quotes
// and dashes are swapped for plain ones.
export function plain(text) {
  return String(text)
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-");
}

export function addHeading(doc, text, y) {
  doc
    .setFont("helvetica", "bold")
    .setFontSize(14)
    .text(plain(text), pageMargin, y);
}

// Puts the app name and page number at the bottom of every page.
export function addFooters(doc) {
  const pageCount = doc.getNumberOfPages();
  const { width, height } = doc.internal.pageSize;
  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal").setFontSize(8);
    doc.text(
      `${siteConfig.name} - ${siteConfig.tagline}`,
      pageMargin,
      height - 8,
    );
    doc.text(`Page ${page} of ${pageCount}`, width - pageMargin, height - 8, {
      align: "right",
    });
  }
}
