import { Poppins, Nunito } from "next/font/google";

// Headings: Poppins (friendly and rounded)
export const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Body text: Nunito (easy to read on small phone screens)
export const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
