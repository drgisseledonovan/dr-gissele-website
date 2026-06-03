import { en } from "./en";
import { es } from "./es";
import type { Dictionary, Locale } from "./types";

export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  LOCALE_HTML_LANG,
  isLocale,
} from "./types";
export type { Locale, Dictionary } from "./types";

/* ─── Dictionary registry ────────────────────────────────────
   Every supported locale points at its dictionary. Adding a new
   locale = add to LOCALES (in types.ts) + add an entry here.
   ─────────────────────────────────────────────────────────── */

const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  es,
};

/** Returns the dictionary for a given locale. */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Returns the "other" locale — used by the language switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

/** Builds a localized path. localePath("es", "/about") → "/es/about". */
export function localePath(locale: Locale, path: string): string {
  if (path === "/" || path === "") return `/${locale}`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
