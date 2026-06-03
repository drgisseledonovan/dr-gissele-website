import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { LINKS } from "@/lib/site";
import { MOVEMENT_MENTORSHIP, COHORT_GALLERY } from "@/lib/media";
import type { Dictionary } from "@/lib/i18n";

type DespiertaProps = {
  dict: Dictionary["despierta"];
};

export function Despierta({ dict }: DespiertaProps) {
  return (
    <section className="bg-beige py-20 lg:py-32 overflow-x-clip">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-center">
          {/* Copy column */}
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-10">
              <span
                className="text-gold tracking-[0.18em] text-[12px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {dict.cohortMarker}
              </span>
              <span aria-hidden className="block w-8 h-px bg-gold/60" />
              <span className="eyebrow text-burgundy">{dict.eyebrow}</span>
            </div>

            <h2
              className="text-[clamp(40px,6.5vw,92px)] leading-[0.95] tracking-tight mb-2 font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {dict.titleSerif}
            </h2>
            <h2
              className="text-[clamp(46px,7.5vw,108px)] leading-[0.95] text-burgundy mb-12"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {dict.titleScript}
            </h2>

            <p className="text-lg leading-relaxed text-black/75 font-light max-w-xl mb-6">
              {dict.body}
            </p>

            <p className="font-serif italic text-black/55 text-[15px] max-w-xl mb-10">
              {dict.spiritLine}
            </p>

            {/* Program pillars */}
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 mb-12">
              {dict.pillars.map((p, i) => (
                <li
                  key={p}
                  className="flex items-center gap-3 font-serif italic text-[15px] text-black/70"
                >
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="block w-1 h-1 rounded-full bg-gold"
                    />
                  )}
                  {p}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
              <CTA
                href={LINKS.mentorshipApplication}
                className="cta-line text-burgundy"
              >
                {dict.cta}
              </CTA>
              <span className="eyebrow text-black/45">{dict.reviewedNote}</span>
            </div>
          </Reveal>

          {/* Photo column */}
          <Reveal delay={0.15} className="lg:col-span-5">
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
                    "linear-gradient(180deg, rgba(216,203,190,0) 45%, rgba(11,11,11,0.40) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-3 border border-ivory/35 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -inset-px border border-black/10 pointer-events-none"
              />
              <figcaption className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-ivory/90">
                <span className="font-serif italic text-[13px] leading-tight">
                  {dict.photoCaption}
                </span>
                <span
                  className="eyebrow text-ivory/65"
                  style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                >
                  {dict.photoCaptionRight}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ─── Cohort gallery — horizontal scroll-snap carousel ─── */}
        <Reveal delay={0.2}>
          <div className="mt-28 lg:mt-36">
            {/* Masthead */}
            <div className="flex items-end justify-between mb-10 lg:mb-14 px-0 lg:px-2">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span aria-hidden className="block w-8 h-px bg-gold" />
                  <span className="eyebrow text-burgundy">
                    {dict.galleryEyebrow}
                  </span>
                </div>
                <h3
                  className="text-[clamp(28px,3.6vw,48px)] font-light tracking-[-0.015em] leading-[1.12]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {dict.galleryTitle}
                </h3>
              </div>
              <span
                className="eyebrow text-black/45 hidden sm:block"
                style={{ fontSize: "10px", letterSpacing: "0.32em" }}
              >
                {dict.galleryHint}
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Carousel — extends to viewport edges on the right for the
          peek-of-next-image editorial effect. */}
      <Reveal delay={0.25}>
        <div
          className="relative overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Cohort gallery"
        >
          {/* Left edge fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 lg:w-20 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(216,203,190,1) 0%, rgba(216,203,190,0) 100%)",
            }}
          />
          {/* Right edge fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 lg:w-20 z-10"
            style={{
              background:
                "linear-gradient(to left, rgba(216,203,190,1) 0%, rgba(216,203,190,0) 100%)",
            }}
          />

          <ul className="flex gap-5 lg:gap-7 px-6 lg:px-12">
            {COHORT_GALLERY.map((photo, i) => (
              <li
                key={photo.src}
                className="snap-start shrink-0 w-[80vw] sm:w-[460px] lg:w-[560px]"
              >
                <figure className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 640px) 460px, 80vw"
                    style={{
                      objectPosition: photo.objectPosition ?? "50% 50%",
                    }}
                    className="object-cover [filter:contrast(1.04)_saturate(0.98)]"
                  />
                  {/* Gold hairline inset frame */}
                  <div
                    aria-hidden
                    className="absolute inset-3 border border-gold/35 pointer-events-none"
                  />
                  {/* Outer hairline */}
                  <div
                    aria-hidden
                    className="absolute -inset-px border border-black/10 pointer-events-none"
                  />
                  {/* Subtle bottom gradient for any caption */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11,11,11,0) 60%, rgba(11,11,11,0.25) 100%)",
                    }}
                  />
                  <figcaption className="absolute bottom-4 left-4 right-4 flex justify-end text-ivory/70">
                    <span
                      className="eyebrow"
                      style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                    >
                      {String(i + 1).padStart(2, "0")} / {COHORT_GALLERY.length}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
