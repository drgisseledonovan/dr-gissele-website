import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";
import {
  ESSAYS_BY_DATE,
  allEssaySlugs,
  essayFor,
  formatEssayDate,
  getEssayBySlug,
} from "@/lib/essays";
import {
  LOCALES,
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
  // Cartesian: every locale × every essay slug
  return LOCALES.flatMap((locale) =>
    allEssaySlugs().map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const essay = getEssayBySlug(slug);
  if (!essay) return { title: "Not found" };
  const ll = essayFor(essay, locale);
  return {
    title: ll.title,
    description: ll.excerpt,
    alternates: {
      canonical: `${SITE.url}/${locale}/insights/${essay.slug}`,
      languages: {
        es: `${SITE.url}/es/insights/${essay.slug}`,
        en: `${SITE.url}/en/insights/${essay.slug}`,
      },
    },
    openGraph: {
      title: `${ll.title} · ${SITE.name}`,
      description: ll.excerpt,
      url: `${SITE.url}/${locale}/insights/${essay.slug}`,
      type: "article",
      publishedTime: essay.date,
    },
  };
}

export default async function EssayPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.essay;

  const essay = getEssayBySlug(slug);
  if (!essay) notFound();
  const ll = essayFor(essay, locale);

  const index = ESSAYS_BY_DATE.findIndex((e) => e.slug === essay.slug);
  const next = index >= 0 ? ESSAYS_BY_DATE[index + 1] : undefined;
  const nextLocalized = next ? essayFor(next, locale) : null;
  const inPreparation = !ll.body || ll.body.length === 0;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ll.title,
    description: ll.excerpt,
    datePublished: essay.date,
    dateModified: essay.date,
    inLanguage: locale,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Person", name: SITE.name, url: SITE.url },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/${locale}/insights/${essay.slug}`,
    },
    articleSection: ll.pillar,
  };

  return (
    <>
      <JsonLd data={articleLd} />

      {/* Masthead */}
      <section className="relative bg-ivory pt-[140px] lg:pt-[180px] pb-16 lg:pb-20 overflow-x-clip">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          <Reveal>
            <Link
              href={localePath(locale, "/insights")}
              className="eyebrow text-black/45 hover:text-burgundy transition-colors duration-300 inline-flex items-center gap-2"
            >
              <span aria-hidden>←</span>
              <span>{t.backToInsights}</span>
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 flex items-center gap-3">
              <span className="eyebrow text-burgundy">{ll.pillar}</span>
              <span aria-hidden className="block w-1 h-1 rounded-full bg-gold" />
              <span
                className="eyebrow text-black/45"
                style={{ fontSize: "10px", letterSpacing: "0.32em" }}
              >
                {formatEssayDate(essay.date, locale)}
              </span>
              <span aria-hidden className="block w-1 h-1 rounded-full bg-gold" />
              <span
                className="eyebrow text-black/45"
                style={{ fontSize: "10px", letterSpacing: "0.32em" }}
              >
                {essay.minutes} {t.minRead}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mt-8 text-[clamp(34px,5vw,68px)] font-light tracking-[-0.018em] leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {ll.title}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 font-serif italic text-lg lg:text-xl text-black/65 leading-relaxed">
              {ll.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex items-center gap-3 text-gold">
              <span className="block w-10 h-px bg-current opacity-70" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-10 h-px bg-current opacity-70" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body or "in preparation" */}
      <section className="bg-ivory pb-20 lg:pb-28">
        <div className="mx-auto max-w-[720px] px-6 lg:px-12">
          {!inPreparation ? (
            <article className="space-y-7 text-[17px] lg:text-[18px] leading-[1.85] text-black/80 font-light">
              {ll.body!.map((p, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <p
                    className={
                      i === 0
                        ? "[&::first-letter]:font-serif [&::first-letter]:text-[3.5em] [&::first-letter]:leading-[0.85] [&::first-letter]:float-left [&::first-letter]:pr-3 [&::first-letter]:pt-2 [&::first-letter]:text-burgundy [&::first-letter]:font-normal"
                        : ""
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
              <Reveal>
                <div className="mt-16 flex items-center gap-3 text-gold">
                  <span className="block w-8 h-px bg-current opacity-70" />
                  <span className="block w-1 h-1 rounded-full bg-current" />
                  <span className="block w-8 h-px bg-current opacity-70" />
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="font-serif italic text-black/60 text-base">
                  {t.signedBy}
                </p>
              </Reveal>
            </article>
          ) : (
            <Reveal>
              <div className="text-center py-16">
                <div className="eyebrow text-burgundy mb-6">
                  {t.inPreparationEyebrow}
                </div>
                <p
                  className="text-[clamp(22px,2.4vw,32px)] font-light italic text-black/70 leading-[1.45] whitespace-pre-line"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.inPreparationBody}
                </p>
                <div className="mt-12">
                  <Link
                    href={localePath(locale, "/insights")}
                    className="cta-line text-burgundy"
                  >
                    {t.returnToInsights}
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Next */}
      {next && nextLocalized && (
        <section className="bg-beige py-20 lg:py-24 border-t border-black/10">
          <div className="mx-auto max-w-[820px] px-6 lg:px-12">
            <Reveal>
              <Link
                href={localePath(locale, `/insights/${next.slug}`)}
                className="group block"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-gold tracking-[0.22em] text-[12px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.nextEssayEyebrow}
                  </span>
                  <span aria-hidden className="block w-10 h-px bg-gold/60" />
                </div>
                <div className="eyebrow text-burgundy mb-4">{nextLocalized.pillar}</div>
                <h2
                  className="text-[clamp(26px,3vw,40px)] font-light tracking-[-0.015em] leading-[1.15] group-hover:text-burgundy transition-colors duration-500"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {nextLocalized.title}
                </h2>
                <p className="font-serif italic text-base lg:text-lg text-black/60 leading-relaxed mt-5 max-w-xl">
                  {nextLocalized.excerpt}
                </p>
                <div className="mt-8">
                  <span className="cta-line text-burgundy">{t.read}</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Closing */}
      <section className="bg-ivory py-20 lg:py-24 border-t border-black/10">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <Reveal>
            <p
              className="text-[clamp(20px,2.2vw,28px)] font-light italic text-black/75 leading-[1.45]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.closingLine}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-10 gap-y-3 flex-wrap">
              <CTA
                href={localePath(locale, "/insights")}
                className="cta-line text-burgundy"
              >
                {t.backCta}
              </CTA>
              <a
                href={`mailto:${SITE.email}`}
                className="cta-line text-black/70 hover:text-black"
              >
                {t.replyCta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
