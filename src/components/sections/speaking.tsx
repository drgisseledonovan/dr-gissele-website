import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { LINKS } from "@/lib/site";
import { SPEAKING_PRIMARY, SPEAKING_GALLERY } from "@/lib/media";
import type { Dictionary } from "@/lib/i18n";

type SpeakingProps = {
  dict: Dictionary["speakingHome"];
};

export function Speaking({ dict }: SpeakingProps) {
  return (
    <section className="bg-ivory text-black py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <div className="eyebrow rules left text-burgundy mb-10">
            {dict.eyebrow}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="text-[clamp(38px,5.2vw,76px)] tracking-tight font-light text-black mb-20 max-w-3xl leading-[1.06]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {dict.titleSerif}
            <br />
            <span
              className="text-burgundy"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {dict.titleScript}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <figure className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden group">
            <Image
              src={SPEAKING_PRIMARY.src}
              alt={SPEAKING_PRIMARY.alt}
              fill
              sizes="(min-width: 1024px) 1300px, 100vw"
              style={{
                objectPosition: SPEAKING_PRIMARY.objectPosition ?? "55% 40%",
              }}
              className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-[1.03] [filter:contrast(1.05)_saturate(0.97)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,11,0) 38%, rgba(11,11,11,0.30) 78%, rgba(11,11,11,0.62) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{
                background:
                  "radial-gradient(ellipse at 100% 100%, rgba(138,21,56,0.18) 0%, transparent 55%)",
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
              <div className="flex flex-col gap-1">
                <span
                  className="eyebrow text-ivory/65"
                  style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                >
                  {dict.captionEyebrow}
                </span>
                <span className="font-serif italic text-base sm:text-lg leading-tight text-ivory/95">
                  {dict.captionTitle}
                </span>
              </div>
              <span
                className="eyebrow text-ivory/55"
                style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
              >
                {dict.captionRight}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ─── Stages carousel · editorial scroll-snap rail ───── */}
        <Reveal delay={0.18}>
          <div className="mt-20 lg:mt-24 flex items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span aria-hidden className="block w-8 h-px bg-gold" />
                <span className="eyebrow text-burgundy">
                  {dict.galleryEyebrow}
                </span>
              </div>
              <h3
                className="text-[clamp(22px,2.6vw,34px)] font-light italic text-black/80 tracking-tight leading-snug"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {dict.galleryTitle}
              </h3>
            </div>
            <span
              className="eyebrow text-black/40 hidden sm:block"
              style={{ fontSize: "10px", letterSpacing: "0.32em" }}
            >
              {dict.galleryHint}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Carousel — extends to viewport edges for peek-of-next effect. */}
      <Reveal delay={0.22}>
        <div
          className="relative overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Speaking gallery"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 lg:w-20 z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(248,244,238,1) 0%, rgba(248,244,238,0) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 lg:w-20 z-10"
            style={{
              background:
                "linear-gradient(to left, rgba(248,244,238,1) 0%, rgba(248,244,238,0) 100%)",
            }}
          />

          <ul className="flex gap-5 lg:gap-7 px-6 lg:px-12">
            {SPEAKING_GALLERY.map((photo, i) => (
              <li
                key={photo.src}
                className="snap-start shrink-0 w-[72vw] sm:w-[340px] lg:w-[400px]"
              >
                <figure className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 340px, 72vw"
                    style={{
                      objectPosition: photo.objectPosition ?? "50% 35%",
                    }}
                    className="object-cover [filter:contrast(1.05)_saturate(0.98)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-3 border border-gold/35 pointer-events-none"
                  />
                  <div
                    aria-hidden
                    className="absolute -inset-px border border-black/10 pointer-events-none"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11,11,11,0) 60%, rgba(11,11,11,0.32) 100%)",
                    }}
                  />
                  <figcaption className="absolute bottom-4 left-4 right-4 flex justify-end text-ivory/75">
                    <span
                      className="eyebrow"
                      style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                    >
                      {String(i + 1).padStart(2, "0")} / {String(SPEAKING_GALLERY.length).padStart(2, "0")}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">

        <Reveal delay={0.26}>
          <div className="mt-12 border-y border-black/10 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            <span
              className="eyebrow text-black/45"
              style={{ fontSize: "9.5px", letterSpacing: "0.36em" }}
            >
              {dict.venuesLabel}
            </span>
            <span aria-hidden className="hidden sm:block w-px h-3 bg-black/20" />
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {dict.venues.map((v) => (
                <li
                  key={v}
                  className="font-serif italic text-[15px] text-black/70"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <p className="text-lg leading-relaxed text-black/70 font-light max-w-xl">
              {dict.body}
            </p>
            <div className="md:text-right">
              <CTA
                href={LINKS.speakingInquiry}
                className="cta-line text-burgundy"
              >
                {dict.cta}
              </CTA>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
