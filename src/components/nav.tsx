"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LOGO_MONOGRAM } from "@/lib/media";
import {
  LOCALE_LABELS,
  localePath,
  otherLocale,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

type NavProps = {
  locale: Locale;
  dict: Dictionary["nav"];
};

export function Nav({ locale, dict }: NavProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Build a path on the OTHER locale that mirrors the current path
  const other = otherLocale(locale);
  const switcherHref = pathname.startsWith(`/${locale}`)
    ? pathname.replace(`/${locale}`, `/${other}`) || `/${other}`
    : `/${other}`;

  const NAV_LINKS = [
    { href: localePath(locale, "/about"), label: dict.about },
    { href: localePath(locale, "/unsinkable-minds"), label: dict.unsinkableMinds },
    { href: localePath(locale, "/speaking"), label: dict.speaking },
    { href: localePath(locale, "/programs"), label: dict.programs },
    { href: localePath(locale, "/insights"), label: dict.insights },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "bg-ivory/85 backdrop-blur-md border-b border-black/10 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex items-center justify-between">
          <Link
            href={localePath(locale, "/")}
            aria-label="Dr. Gissele Donovan — home"
            className="group flex items-center gap-3 sm:gap-4"
          >
            <span className="relative block h-14 w-14 sm:h-16 sm:w-16 shrink-0">
              <Image
                src={LOGO_MONOGRAM.src}
                alt=""
                fill
                priority
                sizes="64px"
                className="object-contain"
              />
            </span>
            <span
              className="tracking-[0.22em] text-[11.5px] sm:text-[13px] uppercase font-medium leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Dr. Gissele Donovan
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="eyebrow !text-[10.5px] hover:text-burgundy transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={localePath(locale, "/programs")}
              className="eyebrow !text-[10.5px] text-burgundy"
            >
              {dict.apply}
            </Link>

            {/* Language switcher */}
            <Link
              href={switcherHref}
              aria-label={`${LOCALE_LABELS[other]} — ${dict.switchToOtherLocale}`}
              className="eyebrow !text-[10.5px] text-black/55 hover:text-black border-l border-black/15 pl-6 ml-2 transition-colors duration-300"
            >
              {LOCALE_LABELS[other]}
            </Link>
          </nav>

          <button
            type="button"
            aria-label={dict.openMenu}
            aria-expanded={open}
            className="lg:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setOpen(true)}
          >
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-6 bg-current" />
            <span className="block h-px w-4 bg-current ml-auto" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ivory flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="flex items-center gap-3">
                <span className="relative block h-14 w-14">
                  <Image
                    src={LOGO_MONOGRAM.src}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </span>
                <span
                  className="tracking-[0.22em] text-[13px] uppercase font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Dr. Gissele Donovan
                </span>
              </span>
              <button
                type="button"
                aria-label={dict.closeMenu}
                onClick={() => setOpen(false)}
                className="eyebrow"
              >
                {dict.closeMenu}
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.07,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-black/10"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-6 font-serif text-[40px] leading-none tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile language switcher */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + NAV_LINKS.length * 0.07,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-black/10"
              >
                <Link
                  href={switcherHref}
                  onClick={() => setOpen(false)}
                  className="block py-6 font-serif text-[28px] leading-none tracking-tight text-black/55"
                >
                  {LOCALE_LABELS[other]}
                </Link>
              </motion.div>
            </nav>

            <div className="px-6 pb-10 flex flex-col gap-4">
              <Link
                href={localePath(locale, "/programs")}
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-burgundy text-ivory py-5 tracking-[0.22em] uppercase text-xs"
              >
                {dict.apply.replace("→", "").trim()}
              </Link>
              <p className="eyebrow text-center opacity-50">{dict.tagline}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
