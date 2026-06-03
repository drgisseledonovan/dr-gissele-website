import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ESSAYS_BY_DATE } from "@/lib/essays";
import { LOCALES } from "@/lib/i18n";

/* /sitemap.xml — generated at build time.
   Emits both locales for every route, with hreflang alternates
   so Google indexes the right language for each region. */

const STATIC: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/programs", changeFrequency: "monthly", priority: 0.95 },
  { path: "/speaking", changeFrequency: "monthly", priority: 0.9 },
  { path: "/unsinkable-minds", changeFrequency: "monthly", priority: 0.85 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.85 },
  { path: "/press", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

function buildAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const l of LOCALES) {
    alternates[l] = `${SITE.url}/${l}${path}`;
  }
  alternates["x-default"] = `${SITE.url}/es${path}`;
  return alternates;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const s of STATIC) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE.url}/${locale}${s.path}`,
        lastModified: now,
        changeFrequency: s.changeFrequency,
        priority: s.priority,
        alternates: { languages: buildAlternates(s.path) },
      });
    }
  }

  for (const essay of ESSAYS_BY_DATE) {
    const path = `/insights/${essay.slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: new Date(essay.date),
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: { languages: buildAlternates(path) },
      });
    }
  }

  return entries;
}
