import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import {
  SITE,
  ACADEMIC_CREDENTIALS,
  TRAINING_LINEAGE,
  HONORS,
  CREDENTIALS,
  type Credential,
} from "@/lib/site";
import { HERO_PORTRAIT_OPTIONS, RECOGNITION_PRIMARY } from "@/lib/media";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";

const LEAD_PORTRAIT = HERO_PORTRAIT_OPTIONS.authority;

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
    title: dict.pages.about.eyebrow,
    description: dict.bios.short,
    alternates: {
      canonical: `${SITE.url}/${locale}/about`,
      languages: {
        es: `${SITE.url}/es/about`,
        en: `${SITE.url}/en/about`,
      },
    },
    openGraph: {
      title: `${dict.pages.about.eyebrow} · ${SITE.name}`,
      description: dict.bios.oneLine,
      url: `${SITE.url}/${locale}/about`,
      type: "profile",
    },
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.about;

  return (
    <>
      {/* ─── Lede ──────────────────────────────────────────────── */}
      <section className="relative bg-ivory pt-[140px] lg:pt-[180px] pb-24 lg:pb-32 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 lg:gap-20 items-center">
            <div>
              <Reveal>
                <div className="eyebrow rules left text-burgundy mb-10">
                  {t.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1
                  className="text-[clamp(40px,6vw,96px)] leading-[1.02] tracking-[-0.018em] font-light"
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
                <p className="mt-12 max-w-lg text-lg leading-relaxed text-black/70 font-light">
                  {t.lede}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3">
                  <CTA
                    href={localePath(locale, "/speaking")}
                    className="cta-line text-burgundy"
                  >
                    {t.cta1}
                  </CTA>
                  <CTA
                    href={localePath(locale, "/despierta")}
                    className="cta-line text-black/70 hover:text-black"
                  >
                    {t.cta2}
                  </CTA>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <figure className="relative">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={LEAD_PORTRAIT.src}
                    alt={LEAD_PORTRAIT.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 500px, 100vw"
                    style={{
                      objectPosition: LEAD_PORTRAIT.objectPosition ?? "50% 30%",
                    }}
                    className="object-cover [filter:contrast(1.05)_saturate(0.96)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-3 border border-gold/45 pointer-events-none"
                  />
                  <div
                    aria-hidden
                    className="absolute -inset-px border border-black/10 pointer-events-none"
                  />
                </div>
                <figcaption className="mt-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="block w-6 h-px bg-gold/70" />
                    <span
                      className="eyebrow text-black/45"
                      style={{ fontSize: "9.5px", letterSpacing: "0.34em" }}
                    >
                      {t.portraitCaption}
                    </span>
                  </div>
                  <span
                    className="eyebrow text-black/35"
                    style={{ fontSize: "9.5px", letterSpacing: "0.34em" }}
                  >
                    {t.portraitYear}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <Chapter numeral="I" title={t.chapterIPractice.title}>
        {t.chapterIPractice.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Chapter>

      <Chapter numeral="II" title={t.chapterIIOrigin.title} tone="warm">
        {t.chapterIIOrigin.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Chapter>

      <Chapter numeral="III" title={t.chapterIIIBecoming.title}>
        {t.chapterIIIBecoming.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Chapter>

      {/* Doctoral break image */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <figure className="relative aspect-[21/9] w-full overflow-hidden">
              <Image
                src={RECOGNITION_PRIMARY.src}
                alt={RECOGNITION_PRIMARY.alt}
                fill
                sizes="(min-width: 1024px) 1300px, 100vw"
                style={{
                  objectPosition:
                    RECOGNITION_PRIMARY.objectPosition ?? "60% 35%",
                }}
                className="object-cover [filter:contrast(1.06)_saturate(1.02)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0.18) 0%, rgba(11,11,11,0) 40%, rgba(11,11,11,0) 60%, rgba(11,11,11,0.55) 100%)",
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
              <figcaption className="absolute bottom-7 left-7 right-7 flex flex-wrap justify-between items-end gap-3 text-ivory">
                <span className="font-serif italic text-base sm:text-lg text-ivory/95 leading-tight">
                  {CREDENTIALS.phd.long}
                </span>
                <span
                  className="eyebrow text-ivory/60"
                  style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                >
                  {CREDENTIALS.phd.year}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* The Record */}
      <section className="bg-ivory pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20">
            <Reveal>
              <div
                className="text-gold tracking-[0.22em] text-[12px] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                IV
              </div>
              <h2
                className="text-[clamp(28px,3.2vw,42px)] font-light tracking-[-0.015em] leading-[1.12]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.chapterIVRecord.title}
              </h2>
            </Reveal>

            <div className="flex flex-col gap-12 lg:gap-16">
              <Reveal delay={0.08}>
                <RecordGroup
                  label={t.chapterIVRecord.groupEducation}
                  items={ACADEMIC_CREDENTIALS}
                />
              </Reveal>
              <Reveal delay={0.12}>
                <RecordGroup
                  label={t.chapterIVRecord.groupTraining}
                  items={TRAINING_LINEAGE}
                />
              </Reveal>
              <Reveal delay={0.16}>
                <RecordGroup label={t.chapterIVRecord.groupHonors} items={HONORS} />
              </Reveal>
              <Reveal delay={0.2}>
                <RecordGroup
                  label={t.chapterIVRecord.groupVocation}
                  items={[CREDENTIALS.founder, CREDENTIALS.donovanBusiness]}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The Movement */}
      <section className="bg-beige py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20">
            <Reveal>
              <div
                className="text-gold tracking-[0.22em] text-[12px] mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                V
              </div>
              <h2
                className="text-[clamp(28px,3.2vw,42px)] font-light tracking-[-0.015em] leading-[1.12]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.chapterVMovement.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 text-[17px] lg:text-lg leading-[1.85] text-black/75 font-light">
                {t.chapterVMovement.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="pt-6">
                  <CTA
                    href={localePath(locale, "/unsinkable-minds")}
                    className="cta-line text-burgundy"
                  >
                    {t.chapterVMovement.cta}
                  </CTA>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-ivory py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-gold mb-10">
              <span className="block w-10 h-px bg-current opacity-70" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-10 h-px bg-current opacity-70" />
            </div>
            <p
              className="text-[clamp(22px,2.4vw,32px)] font-light italic text-black/80 leading-[1.45]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.closing.quote}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <CTA
                href={localePath(locale, "/speaking")}
                className="cta-line text-burgundy"
              >
                {t.closing.cta1}
              </CTA>
              <CTA
                href={localePath(locale, "/despierta")}
                className="cta-line text-black/70 hover:text-black"
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

function Chapter({
  numeral,
  title,
  tone = "ivory",
  children,
}: {
  numeral: string;
  title: string;
  tone?: "ivory" | "warm";
  children: React.ReactNode;
}) {
  const bg = tone === "warm" ? "bg-beige" : "bg-ivory border-t border-black/10";
  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20">
          <Reveal>
            <div
              className="text-gold tracking-[0.22em] text-[12px] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {numeral}
            </div>
            <h2
              className="text-[clamp(28px,3.2vw,42px)] font-light tracking-[-0.015em] leading-[1.12]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-[17px] lg:text-lg leading-[1.85] text-black/80 font-light">
              {children}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RecordGroup({
  label,
  items,
}: {
  label: string;
  items: ReadonlyArray<Credential>;
}) {
  return (
    <div>
      <div
        className="eyebrow text-black/45 mb-5"
        style={{ fontSize: "10px", letterSpacing: "0.32em" }}
      >
        {label}
      </div>
      <ul className="flex flex-col divide-y divide-black/10">
        {items.map((c) => (
          <li
            key={c.short}
            className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2"
          >
            <div className="max-w-2xl">
              <div
                className="text-[clamp(17px,1.4vw,21px)] font-light text-black leading-[1.3]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {c.long || c.short}
              </div>
              {c.bestowedBy && (
                <div className="mt-1 font-serif italic text-[14px] text-black/55">
                  {c.bestowedBy}
                </div>
              )}
            </div>
            {c.year && (
              <span
                className="eyebrow text-black/40 shrink-0 sm:pt-1"
                style={{ fontSize: "10px", letterSpacing: "0.32em" }}
              >
                {c.year}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
