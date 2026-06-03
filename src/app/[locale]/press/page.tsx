import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import {
  CREDENTIALS,
  PRESS_ASSETS,
  SITE,
  type Credential,
  type PressAsset,
} from "@/lib/site";
import { HERO_PORTRAIT_OPTIONS, LOGO_MONOGRAM_DARK } from "@/lib/media";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

const PRESS_PORTRAIT = HERO_PORTRAIT_OPTIONS.authority;

const CREDENTIALS_LIST: Credential[] = [
  CREDENTIALS.phd,
  CREDENTIALS.master,
  CREDENTIALS.dean,
  CREDENTIALS.neuroscience,
  CREDENTIALS.lifetimeAchievement,
  CREDENTIALS.compassion,
  CREDENTIALS.senate,
  CREDENTIALS.authorAnthology,
  CREDENTIALS.donovanBusiness,
  CREDENTIALS.founder,
];

function assetsByKind(kind: PressAsset["kind"]): PressAsset[] {
  return PRESS_ASSETS.filter((a) => a.kind === kind);
}

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
    title: dict.pages.press.eyebrow,
    description: dict.pages.press.lede,
    alternates: {
      canonical: `${SITE.url}/${locale}/press`,
      languages: {
        es: `${SITE.url}/es/press`,
        en: `${SITE.url}/en/press`,
      },
    },
    openGraph: {
      title: `${dict.pages.press.eyebrow} · ${SITE.name}`,
      description: dict.pages.press.lede,
      url: `${SITE.url}/${locale}/press`,
      type: "website",
    },
  };
}

export default async function PressPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.press;
  const photos = assetsByKind("Photograph");
  const logos = assetsByKind("Logo");

  return (
    <>
      {/* Lede */}
      <section className="relative bg-ivory pt-[140px] lg:pt-[180px] pb-24 lg:pb-32 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-center">
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
                <p className="mt-12 max-w-xl text-lg leading-relaxed text-black/70 font-light">
                  {t.lede}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3">
                  <a
                    href={`mailto:${SITE.pressEmail}?subject=Press%20Inquiry`}
                    className="cta-line text-burgundy"
                  >
                    {t.cta1}
                  </a>
                  <a href="#assets" className="cta-line text-black/70 hover:text-black">
                    {t.cta2}
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <figure className="relative">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={PRESS_PORTRAIT.src}
                    alt={PRESS_PORTRAIT.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 460px, 100vw"
                    style={{
                      objectPosition: PRESS_PORTRAIT.objectPosition ?? "50% 30%",
                    }}
                    className="object-cover [filter:contrast(1.05)_saturate(0.96)]"
                  />
                  <div aria-hidden className="absolute inset-3 border border-gold/45 pointer-events-none" />
                  <div aria-hidden className="absolute -inset-px border border-black/10 pointer-events-none" />
                </div>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span aria-hidden className="block w-6 h-px bg-gold/70" />
                  <span
                    className="eyebrow text-black/45"
                    style={{ fontSize: "9.5px", letterSpacing: "0.34em" }}
                  >
                    {t.portraitCaption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Biographies */}
      <section className="bg-ivory py-20 lg:py-28 border-t border-black/10">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span
                className="text-gold tracking-[0.22em] text-[12px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                I
              </span>
              <span aria-hidden className="block w-10 h-px bg-gold/60" />
              <span className="eyebrow text-burgundy">{t.biosEyebrow}</span>
            </div>
          </Reveal>

          <Reveal>
            <article className="mb-16 lg:mb-20">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h3
                  className="text-[clamp(20px,2vw,26px)] font-light tracking-tight text-black"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.biosOneLineTitle}
                </h3>
                <span
                  className="eyebrow text-black/40"
                  style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                >
                  {t.biosOneLineFor}
                </span>
              </div>
              <p className="font-serif italic text-lg lg:text-xl text-black/75 leading-relaxed">
                {dict.bios.oneLine}
              </p>
            </article>
          </Reveal>

          <div className="h-px w-full bg-black/10 mb-16 lg:mb-20" />

          <Reveal>
            <article className="mb-16 lg:mb-20">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h3
                  className="text-[clamp(20px,2vw,26px)] font-light tracking-tight text-black"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.biosShortTitle}
                </h3>
                <span
                  className="eyebrow text-black/40"
                  style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                >
                  {t.biosShortFor}
                </span>
              </div>
              <p className="text-[17px] lg:text-lg leading-[1.85] text-black/75 font-light max-w-3xl">
                {dict.bios.short}
              </p>
            </article>
          </Reveal>

          <div className="h-px w-full bg-black/10 mb-16 lg:mb-20" />

          <Reveal>
            <article>
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h3
                  className="text-[clamp(20px,2vw,26px)] font-light tracking-tight text-black"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.biosLongTitle}
                </h3>
                <span
                  className="eyebrow text-black/40"
                  style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                >
                  {t.biosLongFor}
                </span>
              </div>
              <div className="space-y-5 text-[17px] lg:text-lg leading-[1.85] text-black/75 font-light max-w-3xl">
                {dict.bios.long.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Recognitions */}
      <section className="bg-beige py-20 lg:py-28">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span
                className="text-gold tracking-[0.22em] text-[12px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                II
              </span>
              <span aria-hidden className="block w-10 h-px bg-gold/60" />
              <span className="eyebrow text-burgundy">{t.recognitionsEyebrow}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <ul className="flex flex-col divide-y divide-black/10">
              {CREDENTIALS_LIST.map((c) => (
                <li
                  key={c.short}
                  className="py-7 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                >
                  <div className="max-w-2xl">
                    <div
                      className="text-[clamp(19px,1.6vw,24px)] font-light text-black leading-[1.25]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {c.long}
                    </div>
                    {c.bestowedBy && (
                      <div className="mt-2 font-serif italic text-[14px] text-black/55">
                        {c.bestowedBy}
                      </div>
                    )}
                  </div>
                  {c.year && (
                    <span
                      className="eyebrow text-black/40 shrink-0 sm:pt-2"
                      style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                    >
                      {c.year}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Press assets */}
      <section id="assets" className="bg-ivory py-20 lg:py-28 border-t border-black/10 scroll-mt-24">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span
                className="text-gold tracking-[0.22em] text-[12px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                III
              </span>
              <span aria-hidden className="block w-10 h-px bg-gold/60" />
              <span className="eyebrow text-burgundy">{t.assetsEyebrow}</span>
            </div>
          </Reveal>

          <Reveal>
            <h3
              className="text-[clamp(26px,3vw,40px)] font-light tracking-[-0.015em] leading-[1.12] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.photographsTitle}
            </h3>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {photos.map((asset, i) => (
              <Reveal key={asset.href} delay={i * 0.05}>
                <a href={asset.href} download className="group block">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige/40">
                    <Image
                      src={asset.href}
                      alt={asset.label}
                      fill
                      sizes="(min-width: 1024px) 280px, 50vw"
                      className="object-cover [filter:contrast(1.03)_saturate(0.97)] transition-transform duration-[1500ms] ease-out group-hover:scale-[1.02]"
                    />
                    <div aria-hidden className="absolute inset-3 border border-gold/40 pointer-events-none" />
                    <div aria-hidden className="absolute -inset-px border border-black/10 pointer-events-none" />
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(11,11,11,0) 55%, rgba(11,11,11,0.45) 100%)",
                      }}
                    />
                    <span className="absolute bottom-4 left-4 eyebrow text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {t.downloadLabel}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="font-serif italic text-[15px] text-black/80 leading-tight">
                      {asset.label}
                    </p>
                    {asset.note && (
                      <p
                        className="eyebrow text-black/40 mt-1"
                        style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                      >
                        {asset.note}
                      </p>
                    )}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h3
              className="text-[clamp(26px,3vw,40px)] font-light tracking-[-0.015em] leading-[1.12] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.logosTitle}
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {logos.map((asset, i) => (
              <Reveal key={asset.href} delay={i * 0.05}>
                <a href={asset.href} download className="group block">
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-beige/40 flex items-center justify-center p-10">
                    <Image
                      src={asset.href}
                      alt={asset.label}
                      width={400}
                      height={266}
                      sizes="(min-width: 1024px) 480px, 100vw"
                      className="object-contain max-h-full max-w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div aria-hidden className="absolute inset-3 border border-gold/40 pointer-events-none" />
                    <div aria-hidden className="absolute -inset-px border border-black/10 pointer-events-none" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <p className="font-serif italic text-[15px] text-black/80 leading-tight">
                      {asset.label}
                    </p>
                    <span className="cta-line text-burgundy">{t.downloadLabel}</span>
                  </div>
                  {asset.note && (
                    <p
                      className="eyebrow text-black/40 mt-1"
                      style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                    >
                      {asset.note}
                    </p>
                  )}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press contact */}
      <section className="relative bg-black text-ivory py-20 lg:py-32 overflow-hidden">
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
              {t.pressEyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="text-[clamp(36px,5.5vw,72px)] font-light leading-[1.05] tracking-[-0.018em] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.pressTitleLead}{" "}
              <span style={{ fontFamily: "var(--font-script)" }}>
                {t.pressTitleScript}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif italic text-lg md:text-xl text-ivory/70 leading-relaxed max-w-xl mx-auto mb-14">
              {t.pressBody}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <a
                href={`mailto:${SITE.pressEmail}?subject=Press%20Inquiry`}
                className="inline-block border border-gold/80 text-gold hover:bg-gold hover:text-black transition-colors duration-500 px-12 py-5 eyebrow"
              >
                {t.pressCta}
              </a>
              <a
                href={`mailto:${SITE.pressEmail}`}
                className="cta-line text-ivory/80 hover:text-gold"
              >
                {SITE.pressEmail}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
