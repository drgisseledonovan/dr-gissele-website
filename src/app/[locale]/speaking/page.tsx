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
import { SPEAKING_PRIMARY, RECOGNITION_PRIMARY, LOGO_MONOGRAM_DARK } from "@/lib/media";
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
    title: dict.pages.speaking.eyebrow,
    description: dict.pages.speaking.lede,
    alternates: {
      canonical: `${SITE.url}/${locale}/speaking`,
      languages: {
        es: `${SITE.url}/es/speaking`,
        en: `${SITE.url}/en/speaking`,
      },
    },
    openGraph: {
      title: `${dict.pages.speaking.eyebrow} · ${SITE.name}`,
      description: dict.pages.speaking.lede,
      url: `${SITE.url}/${locale}/speaking`,
      type: "website",
    },
  };
}

export default async function SpeakingPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.speaking;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ivory pt-[140px] lg:pt-[180px] pb-24 lg:pb-32 overflow-x-clip">
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
            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-black/70 font-light">
              {t.lede}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3">
              <CTA href="#inquire" className="cta-line text-burgundy">
                {t.cta1}
              </CTA>
              <a
                href={`mailto:${SITE.email}?subject=Speaking%20Inquiry`}
                className="cta-line text-black/70 hover:text-black"
              >
                {t.cta2}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stage still */}
      <section className="bg-ivory pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <figure className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
              <Image
                src={SPEAKING_PRIMARY.src}
                alt={SPEAKING_PRIMARY.alt}
                fill
                priority
                sizes="(min-width: 1024px) 1300px, 100vw"
                style={{
                  objectPosition:
                    SPEAKING_PRIMARY.objectPosition ?? "55% 40%",
                }}
                className="object-cover [filter:contrast(1.05)_saturate(0.97)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0) 50%, rgba(11,11,11,0.55) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-3 border border-gold/35 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -inset-px border border-black/10 pointer-events-none"
              />
              <figcaption className="absolute bottom-7 left-7 right-7 flex flex-wrap justify-between items-end gap-3 text-ivory">
                <span className="font-serif italic text-base sm:text-lg text-ivory/95">
                  {t.stageCaption}
                </span>
                <span
                  className="eyebrow text-ivory/60"
                  style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                >
                  {t.stageRight}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-ivory py-20 lg:py-28 border-t border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-20">
              <div className="eyebrow rules text-burgundy mb-8 inline-flex">
                {t.topicsEyebrow}
              </div>
              <h2
                className="text-[clamp(32px,4.4vw,56px)] font-light tracking-[-0.015em] leading-[1.1] max-w-3xl mx-auto"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.topicsTitle}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {t.topics.map((topic, i) => (
              <Reveal key={topic.title} delay={i * 0.08} className="bg-ivory">
                <article className="p-10 lg:p-14 h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <span
                      className="text-gold tracking-[0.18em] text-[13px]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {topic.numeral}
                    </span>
                    <span aria-hidden className="block w-8 h-px bg-gold/60" />
                  </div>
                  <h3
                    className="text-[clamp(22px,2.2vw,30px)] font-light tracking-tight text-black mb-5 leading-[1.18]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {topic.title}
                  </h3>
                  <p className="font-serif italic text-lg text-black/65 leading-relaxed max-w-md">
                    {topic.line}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formats + Audiences */}
      <section className="bg-beige py-20 lg:py-28 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <Reveal>
              <div>
                <div className="eyebrow rules left text-burgundy mb-8">
                  {t.formatsEyebrow}
                </div>
                <h3
                  className="text-[clamp(28px,3.4vw,44px)] font-light tracking-tight leading-[1.15] mb-10"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.formatsTitle}
                </h3>
                <ul className="flex flex-col gap-4">
                  {t.formats.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-4 font-serif text-[17px] italic text-black/75"
                    >
                      <span
                        aria-hidden
                        className="block w-6 h-px bg-gold/70 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <div className="eyebrow rules left text-burgundy mb-8">
                  {t.audiencesEyebrow}
                </div>
                <h3
                  className="text-[clamp(28px,3.4vw,44px)] font-light tracking-tight leading-[1.15] mb-10"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.audiencesTitle}
                </h3>
                <ul className="flex flex-col gap-4">
                  {t.audiences.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-4 font-serif text-[17px] italic text-black/75"
                    >
                      <span
                        aria-hidden
                        className="block w-6 h-px bg-gold/70 shrink-0"
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-ivory py-20 lg:py-28 border-t border-black/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <figure className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={RECOGNITION_PRIMARY.src}
                  alt={RECOGNITION_PRIMARY.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  style={{
                    objectPosition:
                      RECOGNITION_PRIMARY.objectPosition ?? "60% 35%",
                  }}
                  className="object-cover [filter:contrast(1.05)_saturate(1)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-3 border border-gold/40 pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -inset-px border border-black/10 pointer-events-none"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-xl">
                <div className="eyebrow rules left text-burgundy mb-8">
                  {t.credentialsEyebrow}
                </div>
                <h3
                  className="text-[clamp(28px,3.4vw,48px)] font-light tracking-tight leading-[1.15] mb-10"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.credentialsTitle}
                </h3>
                <CredentialGroup label={t.credentialsGroupEducation} items={ACADEMIC_CREDENTIALS} />
                <CredentialGroup label={t.credentialsGroupTraining} items={TRAINING_LINEAGE} />
                <CredentialGroup label={t.credentialsGroupHonors} items={HONORS} />
                <CredentialGroup
                  label={t.credentialsGroupVocation}
                  items={[CREDENTIALS.founder, CREDENTIALS.donovanBusiness]}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Inquire */}
      <section id="inquire" className="relative bg-black text-ivory py-20 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(138,21,56,0.35) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-12 text-center">
          {/* Crowned monogram ornament — luxury masthead */}
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
              {t.inquireEyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="text-[clamp(36px,5.5vw,72px)] font-light leading-[1.05] tracking-[-0.018em] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.inquireTitleLead}{" "}
              <span style={{ fontFamily: "var(--font-script)" }}>
                {t.inquireTitleScript}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif italic text-lg md:text-xl text-ivory/70 leading-relaxed max-w-xl mx-auto mb-14">
              {t.inquireBody}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <a
                href={`mailto:${SITE.email}?subject=Speaking%20Inquiry`}
                className="inline-block border border-gold/80 text-gold hover:bg-gold hover:text-black transition-colors duration-500 px-12 py-5 eyebrow"
              >
                {t.inquireCta}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="cta-line text-ivory/80 hover:text-gold"
              >
                {SITE.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p
              className="eyebrow text-ivory/40 mt-14"
              style={{ letterSpacing: "0.32em" }}
            >
              {t.inquireFooter}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CredentialGroup({
  label,
  items,
}: {
  label: string;
  items: ReadonlyArray<Credential>;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <div
        className="eyebrow text-black/45 mb-3"
        style={{ fontSize: "10px", letterSpacing: "0.32em" }}
      >
        {label}
      </div>
      <ul className="flex flex-col gap-2.5 text-black/75">
        {items.map((c) => (
          <li
            key={c.short}
            className="flex items-start gap-4 font-serif text-[15.5px] italic leading-snug"
          >
            <span
              aria-hidden
              className="block w-6 h-px bg-gold/70 shrink-0 mt-2.5"
            />
            <span>{c.long || c.short}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
