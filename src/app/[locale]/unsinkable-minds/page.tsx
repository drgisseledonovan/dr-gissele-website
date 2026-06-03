import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { LINKS, SITE } from "@/lib/site";
import { MOVEMENT_MENTORSHIP, SPEAKING_PRIMARY } from "@/lib/media";
import { Newsletter } from "@/components/sections/newsletter";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

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
    title: dict.pages.unsinkableMinds.titleSerif + " " + dict.pages.unsinkableMinds.titleScript,
    description: dict.pages.unsinkableMinds.lede,
    alternates: {
      canonical: `${SITE.url}/${locale}/unsinkable-minds`,
      languages: {
        es: `${SITE.url}/es/unsinkable-minds`,
        en: `${SITE.url}/en/unsinkable-minds`,
      },
    },
    openGraph: {
      title: `Unsinkable Minds · ${SITE.name}`,
      description: dict.pages.unsinkableMinds.lede,
      url: `${SITE.url}/${locale}/unsinkable-minds`,
      type: "website",
    },
  };
}

export default async function UnsinkableMindsPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.unsinkableMinds;

  return (
    <>
      {/* Lede */}
      <section className="relative bg-ivory pt-[140px] lg:pt-[180px] pb-24 lg:pb-32 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="eyebrow rules left text-burgundy mb-10">
              {t.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className="text-[clamp(46px,8vw,140px)] leading-[0.94] tracking-[-0.018em] font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.titleSerif}
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
            <p className="mt-12 max-w-2xl text-lg lg:text-xl leading-relaxed text-black/70 font-light">
              {t.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Reach strip */}
      <section className="bg-ivory border-y border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-8 lg:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <span
            className="eyebrow text-black/45"
            style={{ fontSize: "10px", letterSpacing: "0.36em" }}
          >
            {t.reachLabel}
          </span>
          <ul className="flex items-center gap-10 sm:gap-14">
            {t.reach.map((n) => (
              <li
                key={n.label}
                className="flex items-baseline gap-2 sm:gap-3 text-black/80"
              >
                <span
                  className="text-[22px] sm:text-[26px] font-light text-burgundy leading-none"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {n.figure}
                </span>
                <span
                  className="eyebrow text-black/55"
                  style={{ fontSize: "10px", letterSpacing: "0.28em" }}
                >
                  {n.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* I · Origin */}
      <section className="bg-ivory py-20 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20">
            <Reveal>
              <div
                className="text-gold tracking-[0.22em] text-[12px] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                I
              </div>
              <h2
                className="text-[clamp(28px,3.2vw,42px)] font-light tracking-[-0.015em] leading-[1.12]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.chapterIOrigin.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 text-[17px] lg:text-lg leading-[1.85] text-black/80 font-light">
                {t.chapterIOrigin.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* II · Declaration */}
      <section className="bg-beige py-20 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20">
            <Reveal>
              <div
                className="text-gold tracking-[0.22em] text-[12px] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                II
              </div>
              <h2
                className="text-[clamp(28px,3.2vw,42px)] font-light tracking-[-0.015em] leading-[1.12]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.chapterIIDeclaration.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="flex flex-col divide-y divide-black/15">
                {t.chapterIIDeclaration.items.map((d) => (
                  <li
                    key={d}
                    className="py-7 first:pt-0 last:pb-0 font-light italic text-[clamp(20px,2.2vw,28px)] text-black/85 leading-[1.45] tracking-[-0.005em]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* III · Pillars */}
      <section className="bg-ivory py-20 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-20">
              <div className="eyebrow rules text-burgundy mb-8 inline-flex">
                {t.chapterIIIPillars.eyebrow}
              </div>
              <h2
                className="text-[clamp(32px,4vw,52px)] font-light tracking-[-0.015em] leading-[1.12] max-w-3xl mx-auto"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.chapterIIIPillars.titleLead}{" "}
                <span
                  className="text-burgundy"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  {t.chapterIIIPillars.titleScript}
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0">
            <span aria-hidden className="hidden md:block absolute top-8 bottom-8 left-1/3 w-px bg-gold/30" />
            <span aria-hidden className="hidden md:block absolute top-8 bottom-8 left-2/3 w-px bg-gold/30" />

            {t.chapterIIIPillars.items.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.12}>
                <article className="text-center px-4 md:px-8 lg:px-10">
                  <div className="flex flex-col items-center mb-8">
                    <span
                      className="text-gold tracking-[0.22em] text-[13px]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.numeral}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-8 text-gold">
                    <span className="block w-6 h-px bg-current" />
                    <span className="block w-1 h-1 rounded-full bg-current" />
                    <span className="block w-6 h-px bg-current" />
                  </div>
                  <h3
                    className="text-[clamp(26px,2.6vw,36px)] font-light tracking-tight text-black mb-5 leading-[1.18]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="font-serif italic text-base lg:text-lg text-black/70 leading-relaxed max-w-xs mx-auto">
                    {p.line}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IV · Convening */}
      <section className="bg-beige py-20 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-center">
            <Reveal className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-gold tracking-[0.22em] text-[13px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.chapterIVConvening.numeral}
                </span>
                <span aria-hidden className="block w-10 h-px bg-gold/60" />
                <span className="eyebrow text-burgundy">{t.chapterIVConvening.eyebrow}</span>
              </div>

              <h2
                className="text-[clamp(36px,5vw,68px)] leading-[1.04] tracking-[-0.018em] mb-2 font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.chapterIVConvening.titleSerif}
              </h2>
              <h2
                className="text-[clamp(40px,6vw,80px)] leading-[1] text-burgundy mb-10"
                style={{ fontFamily: "var(--font-script)" }}
              >
                {t.chapterIVConvening.titleScript}
              </h2>

              <p className="text-lg leading-[1.85] text-black/75 font-light max-w-xl mb-6">
                {t.chapterIVConvening.body}
              </p>

              <p className="font-serif italic text-black/60 text-base lg:text-lg max-w-xl mb-10">
                {t.chapterIVConvening.spirit}
              </p>

              <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                <CTA href={LINKS.mentorshipApplication} className="cta-line text-burgundy">
                  {t.chapterIVConvening.cta}
                </CTA>
                <span className="eyebrow text-black/45">{t.chapterIVConvening.note}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <figure className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={MOVEMENT_MENTORSHIP.src}
                  alt={MOVEMENT_MENTORSHIP.alt}
                  fill
                  sizes="(min-width: 1024px) 500px, 100vw"
                  style={{
                    objectPosition:
                      MOVEMENT_MENTORSHIP.objectPosition ?? "50% 40%",
                  }}
                  className="object-cover [filter:contrast(1.04)_saturate(0.98)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,11,0) 50%, rgba(11,11,11,0.45) 100%)",
                  }}
                />
                <div aria-hidden className="absolute inset-3 border border-ivory/35 pointer-events-none" />
                <div aria-hidden className="absolute -inset-px border border-black/10 pointer-events-none" />
                <figcaption className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-ivory/90">
                  <span className="font-serif italic text-[13px] leading-tight">
                    {t.chapterIVConvening.photoCaption}
                  </span>
                  <span
                    className="eyebrow text-ivory/65"
                    style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                  >
                    {t.chapterIVConvening.photoRight}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* V · On the Road */}
      <section className="bg-ivory pb-20 lg:pb-32 pt-20 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <span
                className="text-gold tracking-[0.22em] text-[13px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.chapterVRoad.numeral}
              </span>
              <span aria-hidden className="block w-10 h-px bg-gold/60" />
              <span className="eyebrow text-burgundy">{t.chapterVRoad.eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <figure className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
              <Image
                src={SPEAKING_PRIMARY.src}
                alt={SPEAKING_PRIMARY.alt}
                fill
                sizes="(min-width: 1024px) 1300px, 100vw"
                style={{ objectPosition: SPEAKING_PRIMARY.objectPosition ?? "55% 40%" }}
                className="object-cover [filter:contrast(1.05)_saturate(0.97)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0) 45%, rgba(11,11,11,0.55) 100%)",
                }}
              />
              <div aria-hidden className="absolute inset-3 border border-gold/35 pointer-events-none" />
              <div aria-hidden className="absolute -inset-px border border-black/10 pointer-events-none" />
              <figcaption className="absolute bottom-7 left-7 right-7 flex flex-wrap justify-between items-end gap-3 text-ivory">
                <span className="font-serif italic text-base sm:text-lg text-ivory/95">
                  {t.chapterVRoad.photoCaption}
                </span>
                <span
                  className="eyebrow text-ivory/60"
                  style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                >
                  {t.chapterVRoad.photoRight}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Closing quote */}
      <section className="bg-beige py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-gold mb-10">
              <span className="block w-10 h-px bg-current opacity-70" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-10 h-px bg-current opacity-70" />
            </div>
            <blockquote
              className="text-[clamp(24px,3vw,38px)] font-light italic text-black/85 leading-[1.4] tracking-[-0.005em] whitespace-pre-line"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.closingQuote.quote}
            </blockquote>
            <div className="mt-8 eyebrow text-black/55">{t.closingQuote.author}</div>
          </Reveal>
        </div>
      </section>

      <Newsletter dict={dict.newsletter} />
    </>
  );
}
