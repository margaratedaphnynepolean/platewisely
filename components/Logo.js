import { siteConfig } from "@/config/siteConfig";

// The PlateWisely logo: a plate seen from above, split into grains, protein and veg,
// with a small leaf on the rim. Pass showName to put the name beside it.
export default function Logo({ size = 40, showName = false }) {
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="PlateWisely logo"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="#fff"
          stroke="#2B2B2B"
          strokeWidth="2"
        />
        <g stroke="#FFF8EC" strokeWidth="2" strokeLinejoin="round">
          <path d="M50 50 L50 26 A24 24 0 0 1 70.78 62 Z" fill="#4C9A2A" />
          <path d="M50 50 L70.78 62 A24 24 0 0 1 29.22 62 Z" fill="#D64933" />
          <path d="M50 50 L29.22 62 A24 24 0 0 1 50 26 Z" fill="#F29F05" />
        </g>
        <path
          d="M68 33 C68 23 76 20 82 20 C83 28 78 35 68 33 Z"
          fill="#4C9A2A"
          stroke="#2B2B2B"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {showName && (
        <strong
          style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem" }}
        >
          {siteConfig.name}
        </strong>
      )}
    </span>
  );
}
