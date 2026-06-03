import type { Metadata } from "next";
import { Fraunces, Inter_Tight, Cinzel, Dancing_Script } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SITE, SOCIAL, CREDENTIALS } from "@/lib/site";
import {
  DEFAULT_LOCALE,
  LOCALE_HTML_LANG,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

/* Root metadata defaults to Spanish (the default locale).
   Per-page metadata in [locale]/ pages overrides locale-specific
   titles and descriptions. */
const rootDict = getDictionary(DEFAULT_LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: rootDict.meta.title,
    template: rootDict.meta.titleTemplate,
  },
  description: rootDict.meta.description,
  openGraph: {
    title: SITE.name,
    description: rootDict.meta.ogDescription,
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: SITE.url,
    languages: {
      es: `${SITE.url}/es`,
      en: `${SITE.url}/en`,
      "x-default": `${SITE.url}/es`,
    },
  },
};

/* ─── Structured data — Person + WebSite ─────────────────────
   Lives at the root so it ships on every page. Localized bio
   is taken from the requested locale's dictionary. */

function buildPersonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const sameAs = [SOCIAL.instagram, SOCIAL.linkedin, SOCIAL.youtube, SOCIAL.tiktok]
    .filter((u) => typeof u === "string" && u.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/media/portrait-hero.jpg`,
    jobTitle:
      "Dean of the School of Leadership and Business · Neuroscience-Based Coach · Co-founder, Unsinkable Minds Movement",
    description: dict.bios.oneLine,
    hasCredential: [
      CREDENTIALS.phd.long,
      CREDENTIALS.master.long,
      `${CREDENTIALS.dean.long} — ${CREDENTIALS.dean.bestowedBy}`,
      CREDENTIALS.neuroscience.long,
      CREDENTIALS.lifetimeAchievement.long,
      CREDENTIALS.compassion.long,
      CREDENTIALS.senate.long,
    ],
    award: [
      CREDENTIALS.lifetimeAchievement.long,
      `${CREDENTIALS.compassion.long} — ${CREDENTIALS.compassion.bestowedBy}`,
      `${CREDENTIALS.senate.long} — ${CREDENTIALS.senate.bestowedBy}`,
      CREDENTIALS.championBelt.long,
      CREDENTIALS.latinBusiness.long,
    ],
    founderOf: {
      "@type": "Organization",
      name: "Unsinkable Minds",
      url: `${SITE.url}/${locale}/unsinkable-minds`,
    },
    sameAs,
    email: `mailto:${SITE.email}`,
  };
}

const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  publisher: {
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
  },
  inLanguage: ["es", "en"],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale");
  const locale: Locale = isLocale(localeHeader ?? "")
    ? (localeHeader as Locale)
    : DEFAULT_LOCALE;

  return (
    <html
      lang={LOCALE_HTML_LANG[locale]}
      className={`${serif.variable} ${sans.variable} ${display.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-black flex flex-col">
        <JsonLd data={buildPersonLd(locale)} />
        <JsonLd data={WEBSITE_LD} />
        {children}
      </body>
    </html>
  );
}
