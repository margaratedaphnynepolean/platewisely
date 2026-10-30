// Turns the app icon (app/icon.svg) into the PNG sizes phones need.
// Run it with: npm run make-icons
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const sourceSvg = "app/icon.svg";
const iconSizes = [
  { fileName: "public/icons/icon-192.png", size: 192 },
  { fileName: "public/icons/icon-512.png", size: 512 },
  { fileName: "public/icons/icon-maskable-512.png", size: 512 },
  { fileName: "app/apple-icon.png", size: 180 },
];

await mkdir("public/icons", { recursive: true });

for (const { fileName, size } of iconSizes) {
  await sharp(sourceSvg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(fileName);
  console.log(`Made ${fileName}`);
}
