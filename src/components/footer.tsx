import Link from "next/link";
import Image from "next/image";
import { LOGO_MONOGRAM_DARK } from "@/lib/media";
import { SITE } from "@/lib/site";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  dict: Dictionary["footer"];
};

export function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="bg-black text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-20 lg:pt-24 pb-16">
        {/* Crowned monogram — gold against true black for luxury contrast */}
        <div className="flex flex-col items-center text-center mb-20 lg:mb-24">
          <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px]">
            <Image
              src={LOGO_MONOGRAM_DARK.src}
              alt={LOGO_MONOGRAM_DARK.alt}
              fill
              sizes="(min-width: 640px) 240px, 200px"
              className="object-contain"
            />
          </div>

          {/* Wordmark in type — set in Cinzel for editorial restraint */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <span
              className="tracking-[0.32em] text-[13px] sm:text-[14px] uppercase font-medium text-ivory"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {SITE.name}
            </span>
            <span
              className="tracking-[0.34em] text-[9px] sm:text-[10px] uppercase text-gold/80"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {SITE.tagline}
            </span>
          </div>

          <div className="h-px w-12 bg-gold mt-10 mb-8" />
          <p className="font-serif italic text-[13px] sm:text-sm text-ivory/60 max-w-md leading-relaxed">
            {dict.recognitionLine}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <FooterColumn title={dict.movementTitle}>
            <FooterLink href={localePath(locale, "/unsinkable-minds")}>
              {dict.links.unsinkableMinds}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={dict.programsTitle}>
            <FooterLink href={localePath(locale, "/programs#mentorship")}>
              {dict.links.mentorship}
            </FooterLink>
            <FooterLink href={localePath(locale, "/speaking")}>
              {dict.links.speaking}
            </FooterLink>
            <FooterLink href={localePath(locale, "/programs#digital")}>
              {dict.links.digital}
            </FooterLink>
            <FooterLink href={localePath(locale, "/programs#community")}>
              {dict.links.community}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={dict.connectTitle}>
            <FooterLink href="https://instagram.com">{dict.links.instagram}</FooterLink>
            <FooterLink href="https://linkedin.com">{dict.links.linkedin}</FooterLink>
            <FooterLink href={`mailto:${SITE.email}`}>
              {dict.links.email}
            </FooterLink>
          </FooterColumn>

          <FooterColumn title={dict.indexTitle}>
            <FooterLink href={localePath(locale, "/about")}>{dict.links.about}</FooterLink>
            <FooterLink href={localePath(locale, "/insights")}>{dict.links.insights}</FooterLink>
            <FooterLink href={localePath(locale, "/press")}>{dict.links.press}</FooterLink>
            <FooterLink href={localePath(locale, "/contact")}>{dict.links.contact}</FooterLink>
          </FooterColumn>
        </div>

        <div className="hairline mb-10 bg-ivory/20" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[11px] tracking-[0.18em] uppercase opacity-60">
          <span>© {new Date().getFullYear()} {dict.copyright}</span>
          <span className="font-serif normal-case tracking-normal text-sm opacity-80 italic">
            {dict.italicLine}
          </span>
          <div className="flex gap-6">
            <Link href={localePath(locale, "/privacy")}>{dict.privacy}</Link>
            <Link href={localePath(locale, "/terms")}>{dict.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="eyebrow opacity-50 mb-5">{title}</div>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm hover:text-gold transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}
