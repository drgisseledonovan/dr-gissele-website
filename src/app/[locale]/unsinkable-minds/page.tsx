import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { MOVEMENT_COMMUNITY, MOVEMENT_SOCIAL, SITE } from "@/lib/site";
import { SPEAKING_PRIMARY, COMMUNITY_GROUP } from "@/lib/media";
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
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-end">
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-lg lg:text-xl leading-relaxed text-black/70 font-light">
                {t.lede}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <figure className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={COMMUNITY_GROUP.src}
                    alt={COMMUNITY_GROUP.alt}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    style={{
                      objectPosition:
                        COMMUNITY_GROUP.objectPosition ?? "50% 35%",
                    }}
                    className="object-cover [filter:contrast(1.05)_saturate(1.02)]"
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
                <figcaption className="mt-4 flex items-center gap-3">
                  <span aria-hidden className="block w-6 h-px bg-gold/70" />
                  <span
                    className="eyebrow text-black/55"
                    style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                  >
                    {t.communityCaption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
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

      {/* IV · On the Road
          (Despierta Tu Poder section removed per Dr. Gissele's
          direction · this page is about the MOVEMENT only. Product
          lives on /despierta.) */}
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

      {/* Join the Movement — invitation into the free Skool
          community. The public-facing home of Unsinkable Minds. */}
      <section className="bg-black text-ivory py-24 lg:py-36 relative overflow-hidden">
        {/* Subtle gold corner ornaments */}
        <span
          aria-hidden
          className="absolute top-10 left-10 hidden md:block w-16 h-px bg-gold/50"
        />
        <span
          aria-hidden
          className="absolute top-10 left-10 hidden md:block w-px h-16 bg-gold/50"
        />
        <span
          aria-hidden
          className="absolute bottom-10 right-10 hidden md:block w-16 h-px bg-gold/50"
        />
        <span
          aria-hidden
          className="absolute bottom-10 right-10 hidden md:block w-px h-16 bg-gold/50"
        />

        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-gold mb-8">
              <span className="block w-10 h-px bg-current" />
              <span className="block w-1.5 h-1.5 rounded-full bg-current" />
              <span className="block w-10 h-px bg-current" />
            </div>
            <span className="eyebrow text-gold">
              {t.joinMovement.eyebrow}
            </span>
            <h2
              className="mt-6 text-[clamp(36px,5vw,68px)] font-light leading-[1.06] tracking-[-0.015em] mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.joinMovement.titleSerif}
            </h2>
            <h2
              className="text-[clamp(40px,6vw,82px)] leading-[1] text-gold mb-10"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {t.joinMovement.titleScript}
            </h2>
            <p className="text-lg lg:text-xl leading-[1.7] text-ivory/80 font-light max-w-xl mx-auto mb-6">
              {t.joinMovement.body}
            </p>
            <p className="font-serif italic text-ivory/55 text-base lg:text-lg max-w-xl mx-auto mb-12">
              {t.joinMovement.note}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              {/* Primary CTA · FILLED gold, the loudest action on the
                  page so the visitor cannot miss the path to the
                  free Skool community. */}
              <CTA
                href={MOVEMENT_COMMUNITY}
                className="inline-block bg-gold text-black hover:bg-gold/90 transition-colors duration-500 px-10 sm:px-14 py-5 eyebrow font-medium"
              >
                {t.joinMovement.cta}
              </CTA>
              <span
                className="eyebrow text-ivory/50"
                style={{ letterSpacing: "0.32em" }}
              >
                {t.joinMovement.tag}
              </span>
            </div>

            {/* Secondary entry · WhatsApp Channel button with the
                official WhatsApp brand green + icon so the affordance
                is unmistakable. Sits below the primary as the
                lower-friction alternative for the Latin American
                audience. */}
            <div className="mt-12 flex flex-col items-center gap-5">
              <span aria-hidden className="block w-12 h-px bg-gold/35" />
              <p className="eyebrow text-ivory/55">
                {t.joinMovement.whatsappEyebrow}
              </p>
              <CTA
                href={MOVEMENT_SOCIAL.whatsapp}
                className="inline-flex items-center gap-3 bg-[#25D366] text-black hover:bg-[#1ebe57] transition-colors duration-500 px-8 sm:px-10 py-4 eyebrow font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                {t.joinMovement.whatsappCta}
              </CTA>
            </div>
          </Reveal>
        </div>
      </section>

      <Newsletter dict={dict.newsletter} />
    </>
  );
}
