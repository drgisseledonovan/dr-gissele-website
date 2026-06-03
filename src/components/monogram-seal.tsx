import Image from "next/image";
import { LOGO_MONOGRAM_GOLD, LOGO_MONOGRAM_DARK } from "@/lib/media";

/* ──────────────────────────────────────────────────────────────────
   <MonogramSeal />

   A luxury editorial ornament: small crowned GD monogram flanked by
   thin gold hairlines. Used as a section opener / closer / divider
   to establish the brand's identity presence without overwhelming
   the page. Centers itself horizontally inside its container.

   Variants:
     align="center"      → hairline · monogram · hairline (default)
     align="left"        → monogram + hairline trailing right
     inverse             → for dark backgrounds (ivory accents)
   Sizes (width in px): "sm" 28 · "md" 36 · "lg" 48
   ────────────────────────────────────────────────────────────────── */

type MonogramSealProps = {
  align?: "center" | "left";
  inverse?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_MAP = {
  sm: { w: 28, h: 19, line: 32 },
  md: { w: 38, h: 25, line: 48 },
  lg: { w: 52, h: 35, line: 64 },
};

export function MonogramSeal({
  align = "center",
  inverse = false,
  size = "md",
  className = "",
}: MonogramSealProps) {
  const { w, h, line } = SIZE_MAP[size];
  const src = inverse ? LOGO_MONOGRAM_DARK.src : LOGO_MONOGRAM_GOLD.src;
  const lineClass = inverse ? "bg-ivory/40" : "bg-gold/65";

  if (align === "left") {
    return (
      <div
        className={`flex items-center gap-4 ${className}`}
        aria-hidden
      >
        <Image
          src={src}
          alt=""
          width={w}
          height={h}
          className="opacity-90 object-contain"
          style={{ width: `${w}px`, height: "auto" }}
        />
        <span
          aria-hidden
          className={`block h-px ${lineClass}`}
          style={{ width: `${line}px` }}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center gap-5 ${className}`}
      aria-hidden
    >
      <span
        aria-hidden
        className={`block h-px ${lineClass}`}
        style={{ width: `${line}px` }}
      />
      <Image
        src={src}
        alt=""
        width={w}
        height={h}
        className="opacity-90 object-contain shrink-0"
        style={{ width: `${w}px`, height: "auto" }}
      />
      <span
        aria-hidden
        className={`block h-px ${lineClass}`}
        style={{ width: `${line}px` }}
      />
    </div>
  );
}
