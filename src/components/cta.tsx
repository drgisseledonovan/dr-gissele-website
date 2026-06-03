import Link from "next/link";
import { isExternalHref } from "@/lib/site";
import type { ReactNode } from "react";

/* CTA — small wrapper so any URL in src/lib/site.ts "just works".
   - Internal routes (/about, /speaking) render as <Link> for soft nav.
   - External URLs (https://, mailto:, tel:) render as <a> with
     target="_blank" and proper rel for security.
   - Inherits the editorial .cta-line class by default; pass a
     different className to override (e.g. for nav links). */

type CTAProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Force-open externally regardless of detection. */
  external?: boolean;
  /** Aria label (use when text is just an icon/arrow). */
  ariaLabel?: string;
};

export function CTA({
  href,
  children,
  className = "cta-line",
  external,
  ariaLabel,
}: CTAProps) {
  const isExt = external ?? isExternalHref(href);

  if (isExt) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
