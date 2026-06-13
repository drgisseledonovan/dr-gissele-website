import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";
import {
  ESSAYS_BY_DATE,
  essayFor,
  formatEssayDate,
} from "@/lib/essays";
import { Newsletter } from "@/components/sections/newsletter";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return {
    title: dict.pages.insights.eyebrow,
    description: dict.pages.insights.lede,
    alternates: {
      canonical: `${SITE.url}/${locale}/insights`,
      languages: {
        es: `${SITE.url}/es/insights`,
        en: `${SITE.url}/en/insights`,
      },
    },
    openGraph: {
      title: `${dict.pages.insights.eyebrow} · ${SITE.name}`,
      description: dict.pages.insights.lede,
      url: `${SITE.url}/${locale}/insights`,
      type: "website",
    },
  };
}

export default async function InsightsPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.insights;

  const [featured, ...archive] = ESSAYS_BY_DATE;
  const featuredLocalized = featured ? essayFor(featured, locale) : null;

  return (
    <>
      {/* Lede */}
      <section className="relative bg-ivory pt-[110px] lg:pt-[130px] pb-16 lg:pb-24 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="eyebrow rules left text-burgundy mb-10">
              {t.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className="text-[clamp(40px,6vw,96px)] leading-[1.02] tracking-[-0.018em] font-light max-w-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.titleLead}
              <br />
              <span
                className="text-burgundy"
                style={{ fontFamily: "var(--font-script)" }}
              >
                {t.titleScript}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-black/70 font-light">
              {t.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured && featuredLocalized && (
        <section className="bg-ivory pb-16 lg:pb-24 border-t border-black/10 pt-14 lg:pt-16">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            <Reveal>
              <div className="flex items-center gap-4 mb-10">
                <span
                  className="text-gold tracking-[0.22em] text-[12px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.latestEyebrow}
                </span>
                <span aria-hidden className="block w-12 h-px bg-gold/60" />
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <Link
                href={localePath(locale, `/insights/${featured.slug}`)}
                className="group block"
              >
                <article className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
                  <header>
                    <div className="eyebrow text-burgundy mb-6">
                      {featuredLocalized.pillar}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="eyebrow text-black/45"
                        style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                      >
                        {formatEssayDate(featured.date, locale)}
                      </span>
                      <span aria-hidden className="block w-1 h-1 rounded-full bg-gold" />
                      <span
                        className="eyebrow text-black/45"
                        style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                      >
                        {featured.minutes} {t.minRead}
                      </span>
                    </div>
                  </header>
                  <div>
                    <h2
                      className="text-[clamp(32px,4.4vw,56px)] font-light tracking-[-0.015em] leading-[1.1] mb-8 group-hover:text-burgundy transition-colors duration-500"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {featuredLocalized.title}
                    </h2>
                    <p className="font-serif italic text-lg lg:text-xl text-black/65 leading-relaxed max-w-2xl mb-10">
                      {featuredLocalized.excerpt}
                    </p>
                    <span className="cta-line text-burgundy">{t.readEssay}</span>
                  </div>
                </article>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Archive */}
      {archive.length > 0 && (
        <section className="bg-ivory pb-14 lg:pb-20 border-t border-black/10 pt-14 lg:pt-16">
          <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
            <Reveal>
              <div className="flex items-center gap-4 mb-14">
                <span
                  className="text-gold tracking-[0.22em] text-[12px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.archiveEyebrow}
                </span>
                <span aria-hidden className="block w-12 h-px bg-gold/60" />
              </div>
            </Reveal>

            <ul className="flex flex-col divide-y divide-black/10">
              {archive.map((essay, i) => {
                const ll = essayFor(essay, locale);
                return (
                  <li key={essay.slug}>
                    <Reveal delay={i * 0.04}>
                      <Link
                        href={localePath(locale, `/insights/${essay.slug}`)}
                        className="group block py-10 lg:py-12 transition-colors duration-500 hover:bg-beige/15 -mx-4 px-4 lg:-mx-6 lg:px-6"
                      >
                        <article className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-6 lg:gap-12 items-baseline">
                          <div className="flex items-center gap-3">
                            <span className="eyebrow text-burgundy">{ll.pillar}</span>
                            <span aria-hidden className="block w-1 h-1 rounded-full bg-gold" />
                            <span
                              className="eyebrow text-black/45"
                              style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                            >
                              {formatEssayDate(essay.date, locale)}
                            </span>
                          </div>
                          <h3
                            className="text-[clamp(22px,2.3vw,30px)] font-light tracking-tight leading-[1.2] text-black group-hover:text-burgundy transition-colors duration-500"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {ll.title}
                          </h3>
                          <span className="eyebrow text-black/45 shrink-0">
                            {essay.minutes} min
                          </span>
                        </article>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <Newsletter dict={dict.newsletter} />
    </>
  );
}
