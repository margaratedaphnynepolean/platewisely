import { siteConfig } from "@/config/siteConfig";

// Turns the colours in siteConfig into CSS variables like --color-turmeric.
// Think of it as writing the brand colours on a card that every stylesheet can read.
export const colorCssVariables = Object.fromEntries(
  Object.entries(siteConfig.colors).map(([colorName, hexValue]) => [
    `--color-${colorName}`,
    hexValue,
  ]),
);
