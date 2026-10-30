import { siteConfig } from "@/config/siteConfig";
import { colorCssVariables } from "@/lib/themeVariables";
import { headingFont, bodyFont } from "@/styles/fonts";
import "./globals.css";

// Page title and description shown in browser tabs and search results
export const metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
};

// Colours the phone's address bar to match the app
export const viewport = {
  themeColor: siteConfig.colors.turmeric,
};

// The outer frame every page sits inside.
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      style={colorCssVariables}
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
