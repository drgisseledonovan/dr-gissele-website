import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import {
  LINKS,
  SITE,
  FEATURED_PRODUCTS,
  STAN_STORE_URL,
  stanProductUrl,
} from "@/lib/site";
import { MOVEMENT_MENTORSHIP, LOGO_MONOGRAM_DARK } from "@/lib/media";
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
    title: dict.pages.programs.eyebrow,
    description: dict.pages.programs.lede,
    alternates: {
      canonical: `${SITE.url}/${locale}/programs`,
      languages: {
        es: `${SITE.url}/es/programs`,
        en: `${SITE.url}/en/programs`,
      },
    },
    openGraph: {
      title: `${dict.pages.programs.eyebrow} · ${SITE.name}`,
      description: dict.pages.programs.lede,
      url: `${SITE.url}/${locale}/programs`,
      type: "website",
    },
  };
}

export default async function ProgramsPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.programs;

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
          <Reveal delay={0.15}>
            <nav
              aria-label="Programs sections"
              className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              {t.sectionsNav.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className="eyebrow text-black/55 hover:text-burgundy transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* Journey strip */}
      <section className="bg-ivory border-y border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <span
              className="eyebrow text-black/45"
              style={{ fontSize: "10px", letterSpacing: "0.36em" }}
            >
              {t.journeyLabel}
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 flex-1">
              {t.journey.map((j) => (
                <li key={j.label} className="flex items-baseline gap-4">
                  <span
                    className="text-gold tracking-[0.22em] text-[12px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {j.numeral}
                  </span>
                  <div>
                    <div
                      className="text-[15px] font-light text-black mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {j.label}
                    </div>
                    <div className="font-serif italic text-[14px] text-black/55 leading-snug">
                      {j.line}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* I · Mentorship */}
      <section id="mentorship" className="bg-ivory py-14 lg:py-20 scroll-mt-16">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <span
                className="text-gold tracking-[0.22em] text-[13px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                I
              </span>
              <span aria-hidden className="block w-10 h-px bg-gold/60" />
              <span className="eyebrow text-burgundy">{t.mentorship.eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="text-[clamp(36px,5vw,68px)] leading-[1.04] tracking-[-0.018em] font-light max-w-3xl mb-14"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.mentorship.titleLead}{" "}
              <span
                className="text-burgundy"
                style={{ fontFamily: "var(--font-script)" }}
              >
                {t.mentorship.titleScript}
              </span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <Reveal className="lg:col-span-5">
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
                  className="object-cover [filter:contrast(1.05)_saturate(0.97)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,11,0) 55%, rgba(11,11,11,0.45) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-3 border border-gold/40 pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -inset-px border border-black/10 pointer-events-none"
                />
                <figcaption className="absolute bottom-5 left-5 right-5 text-ivory/90 font-serif italic text-[13px]">
                  {t.mentorship.photoCaption}
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-7 flex flex-col divide-y divide-black/10">
              {/* Cohort */}
              <Reveal delay={0.05}>
                <article className="pb-10 lg:pb-12">
                  <div
                    className="eyebrow text-black/45 mb-4"
                    style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                  >
                    {t.mentorship.cohortEyebrow}
                  </div>
                  <h3
                    className="text-[clamp(28px,3.4vw,44px)] font-light tracking-tight leading-[1.1] mb-5"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {t.mentorship.cohortTitleSerif}{" "}
                    <span
                      className="text-burgundy"
                      style={{ fontFamily: "var(--font-script)" }}
                    >
                      {t.mentorship.cohortTitleScript}
                    </span>
                  </h3>
                  <p className="text-[16.5px] leading-[1.85] text-black/75 font-light max-w-xl mb-4">
                    {t.mentorship.cohortBody}
                  </p>
                  <p className="font-serif italic text-black/60 text-[15px] max-w-xl mb-8">
                    {t.mentorship.cohortSpirit}
                  </p>
                  <dl className="grid grid-cols-3 gap-x-6 gap-y-4 mb-8 max-w-md">
                    {t.mentorship.cohortDetails.map((d) => (
                      <Detail key={d.label} label={d.label} value={d.value} />
                    ))}
                  </dl>
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                    <CTA
                      href={localePath(locale, "/despierta")}
                      className="cta-line text-burgundy"
                    >
                      {t.mentorship.cohortCta}
                    </CTA>
                    <span className="eyebrow text-black/45">
                      {t.mentorship.cohortNote}
                    </span>
                  </div>
                </article>
              </Reveal>

              {/* Private */}
              <Reveal delay={0.1}>
                <article className="pt-10 lg:pt-12">
                  <div
                    className="eyebrow text-black/45 mb-4"
                    style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                  >
                    {t.mentorship.privateEyebrow}
                  </div>
                  <h3
                    className="text-[clamp(28px,3.4vw,44px)] font-light tracking-tight leading-[1.1] mb-5"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {t.mentorship.privateTitleSerif}{" "}
                    <span
                      className="text-burgundy"
                      style={{ fontFamily: "var(--font-script)" }}
                    >
                      {t.mentorship.privateTitleScript}
                    </span>
                  </h3>
                  <p className="text-[16.5px] leading-[1.85] text-black/75 font-light max-w-xl mb-6">
                    {t.mentorship.privateBody}
                  </p>
                  <dl className="grid grid-cols-3 gap-x-6 gap-y-4 mb-8 max-w-md">
                    {t.mentorship.privateDetails.map((d) => (
                      <Detail key={d.label} label={d.label} value={d.value} />
                    ))}
                  </dl>
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                    <CTA href={LINKS.booking} className="cta-line text-burgundy">
                      {t.mentorship.privateCta}
                    </CTA>
                    <span className="eyebrow text-black/45">
                      {t.mentorship.privateNote}
                    </span>
                  </div>
                </article>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* II · Speaking */}
      <section
        id="speaking"
        className="bg-beige py-14 lg:py-16 border-t border-black/10 scroll-mt-16"
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-gold tracking-[0.22em] text-[13px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  II
                </span>
                <span aria-hidden className="block w-10 h-px bg-gold/60" />
                <span className="eyebrow text-burgundy">{t.speaking.eyebrow}</span>
              </div>
              <h2
                className="text-[clamp(30px,4vw,52px)] font-light tracking-[-0.015em] leading-[1.1] mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.speaking.title}
              </h2>
              <p className="text-[16.5px] leading-[1.85] text-black/75 font-light max-w-xl">
                {t.speaking.body}
              </p>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-4 lg:text-right">
              <CTA href={localePath(locale, "/speaking")} className="cta-line text-burgundy">
                {t.speaking.cta}
              </CTA>
            </Reveal>
          </div>
        </div>
      </section>

      {/* III · Digital Products */}
      <section
        id="digital"
        className="bg-ivory py-14 lg:py-20 border-t border-black/10 scroll-mt-16"
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <span
                className="text-gold tracking-[0.22em] text-[13px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                III
              </span>
              <span aria-hidden className="block w-10 h-px bg-gold/60" />
              <span className="eyebrow text-burgundy">{t.digital.eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <h2
                className="text-[clamp(32px,4.4vw,58px)] font-light tracking-[-0.015em] leading-[1.1] max-w-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.digital.titleLead}{" "}
                <span
                  className="text-burgundy"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  {t.digital.titleScript}
                </span>
              </h2>
              <p className="font-serif italic text-base lg:text-lg text-black/55 max-w-md lg:text-right">
                {t.digital.description}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
            {FEATURED_PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="bg-ivory">
                <a
                  href={stanProductUrl(p.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full p-10 lg:p-12 transition-colors duration-500 hover:bg-beige/30"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-8">
                    <span className="eyebrow text-burgundy">{p.category}</span>
                    {p.price && (
                      <span
                        className="text-gold tracking-[0.18em] text-[12px]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.price}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-[clamp(22px,2.2vw,30px)] font-light tracking-[-0.01em] leading-[1.18] text-black mb-6 group-hover:text-burgundy transition-colors duration-500"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="font-serif italic text-[15px] text-black/65 leading-relaxed mb-10 grow">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="cta-line text-burgundy">{t.digital.viewOn}</span>
                    <span
                      aria-hidden
                      className="text-burgundy opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0"
                    >
                      ↗
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex justify-center">
              <CTA href={STAN_STORE_URL} className="cta-line text-burgundy">
                {t.digital.visitFull}
              </CTA>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IV · Community */}
      <section
        id="community"
        className="bg-beige py-14 lg:py-20 border-t border-black/10 scroll-mt-16"
      >
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            <Reveal className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-gold tracking-[0.22em] text-[13px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  IV
                </span>
                <span aria-hidden className="block w-10 h-px bg-gold/60" />
                <span className="eyebrow text-burgundy">{t.community.eyebrow}</span>
              </div>
              <h2
                className="text-[clamp(32px,4.4vw,58px)] font-light tracking-[-0.015em] leading-[1.1] mb-8"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.community.titleLead}{" "}
                <span
                  className="text-burgundy"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  {t.community.titleScript}
                </span>
              </h2>
              <p className="text-[16.5px] leading-[1.85] text-black/75 font-light max-w-xl mb-10">
                {t.community.body}
              </p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
                <a href="#newsletter" className="cta-line text-burgundy">
                  {t.community.cta1}
                </a>
                <CTA
                  href={localePath(locale, "/unsinkable-minds")}
                  className="cta-line text-black/70 hover:text-black"
                >
                  {t.community.cta2}
                </CTA>
              </div>
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-5">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-gold mb-6">
                  <span className="block w-8 h-px bg-current opacity-70" />
                  <span className="block w-1 h-1 rounded-full bg-current" />
                  <span className="block w-8 h-px bg-current opacity-70" />
                </div>
                <blockquote
                  className="font-serif italic text-[clamp(20px,2.2vw,26px)] text-black/80 leading-[1.45] whitespace-pre-line"
                >
                  {t.community.quote}
                </blockquote>
                <div className="mt-5 eyebrow text-black/50">{t.community.author}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div id="newsletter">
        <Newsletter dict={dict.newsletter} />
      </div>

      {/* Closing inquire */}
      <section
        id="inquire"
        className="relative bg-black text-ivory py-14 lg:py-20 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(138,21,56,0.35) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <Reveal>
            <div className="flex justify-center mb-10">
              <div className="relative w-[110px] h-[110px]">
                <Image
                  src={LOGO_MONOGRAM_DARK.src}
                  alt=""
                  fill
                  sizes="110px"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="eyebrow rules text-gold/80 mb-10 inline-flex">
              {t.closing.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="text-[clamp(32px,4.8vw,60px)] font-light leading-[1.08] tracking-[-0.018em] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.closing.titleLead}{" "}
              <span style={{ fontFamily: "var(--font-script)" }}>
                {t.closing.titleScript}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <a
                href={`mailto:${SITE.email}?subject=Working%20Together`}
                className="inline-block border border-gold/80 text-gold hover:bg-gold hover:text-black transition-colors duration-500 px-12 py-5 eyebrow"
              >
                {t.closing.cta1}
              </a>
              <CTA
                href={localePath(locale, "/contact")}
                className="cta-line text-ivory/80 hover:text-gold"
              >
                {t.closing.cta2}
              </CTA>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt
        className="eyebrow text-black/40"
        style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
      >
        {label}
      </dt>
      <dd className="font-serif italic text-[14.5px] text-black/75 leading-snug">
        {value}
      </dd>
    </div>
  );
}
