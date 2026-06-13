import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { RECOGNITION_PRIMARY, HONOR_PHOTOS, HONOR_GALLERY } from "@/lib/media";
import type { Dictionary } from "@/lib/i18n";

type RecognitionProps = {
  dict: Dictionary["recognitionHome"];
  honorTitles: Dictionary["honors"]["titles"];
};

const HONOR_META = [
  {
    numeral: "I",
    year: "2025",
    bestowedBy: "Cornerstone Christian University",
  },
  {
    numeral: "II",
    year: "2024",
    bestowedBy: "Office of the President of the United States",
  },
  {
    numeral: "III",
    year: "2026",
    bestowedBy: "Senate of Puerto Rico",
  },
];

export function Recognition({ dict, honorTitles }: RecognitionProps) {
  return (
    <section className="relative bg-ivory py-16 lg:py-36 overflow-x-clip">
      {/* Faint gold corner ornaments */}
      <div aria-hidden className="absolute top-10 left-10 hidden lg:block">
        <div className="flex items-center gap-3 text-gold/55">
          <span className="block w-10 h-px bg-current" />
          <span className="block w-1 h-1 rounded-full bg-current" />
        </div>
      </div>
      <div aria-hidden className="absolute top-10 right-10 hidden lg:block">
        <div className="flex items-center gap-3 text-gold/55">
          <span className="block w-1 h-1 rounded-full bg-current" />
          <span className="block w-10 h-px bg-current" />
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-14 lg:mb-16">
            <div className="eyebrow rules text-burgundy mb-10 inline-flex">
              {dict.eyebrow}
            </div>
            <h2
              className="text-[clamp(36px,4.8vw,64px)] tracking-[-0.018em] font-light text-black leading-[1.08] mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {dict.titleLead}
              <span
                className="text-burgundy ml-3"
                style={{ fontFamily: "var(--font-script)" }}
              >
                {dict.titleScript}
              </span>
            </h2>
            <p className="font-serif italic text-lg md:text-xl text-black/55 max-w-xl mx-auto leading-relaxed">
              {dict.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden mb-16 lg:mb-14">
            <Image
              src={RECOGNITION_PRIMARY.src}
              alt={RECOGNITION_PRIMARY.alt}
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
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
                  "linear-gradient(180deg, rgba(11,11,11,0.18) 0%, rgba(11,11,11,0) 35%, rgba(11,11,11,0) 55%, rgba(11,11,11,0.65) 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 100%, rgba(138,21,56,0.22) 0%, transparent 60%)",
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

            <div className="absolute top-6 left-6 right-6 flex items-start justify-between text-ivory">
              <div className="flex items-center gap-3">
                <span className="block w-6 h-px bg-gold/80" />
                <span
                  className="eyebrow text-ivory/80"
                  style={{ fontSize: "9.5px", letterSpacing: "0.36em" }}
                >
                  {dict.photoMasthead}
                </span>
              </div>
              <span
                className="eyebrow text-ivory/60"
                style={{ fontSize: "9.5px", letterSpacing: "0.36em" }}
              >
                {dict.photoYear}
              </span>
            </div>

            <figcaption className="absolute bottom-7 left-7 right-7 flex flex-wrap justify-between items-end gap-3 text-ivory">
              <div className="flex flex-col gap-1">
                <span
                  className="eyebrow text-ivory/65"
                  style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                >
                  {dict.photoConferred}
                </span>
                <span className="font-serif italic text-base sm:text-lg leading-tight text-ivory/95">
                  {dict.photoTitle}
                </span>
              </div>
              <span
                className="eyebrow text-ivory/55"
                style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
              >
                {dict.photoTitleRight}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.15}>
          <blockquote className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
            <span
              className="block text-burgundy text-4xl leading-none mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;
            </span>
            <p
              className="text-[clamp(20px,2vw,28px)] font-light italic text-black/75 leading-[1.5] tracking-[-0.005em]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {dict.pullQuote}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-gold">
              <span className="block w-8 h-px bg-current opacity-70" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-8 h-px bg-current opacity-70" />
            </div>
          </blockquote>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0">
          <span
            aria-hidden
            className="hidden md:block absolute top-12 bottom-12 left-1/3 w-px bg-gold/30"
          />
          <span
            aria-hidden
            className="hidden md:block absolute top-12 bottom-12 left-2/3 w-px bg-gold/30"
          />

          {honorTitles.map((h, i) => {
            const meta = HONOR_META[i];
            const photo = HONOR_PHOTOS[i];
            return (
              <Reveal key={`${h.title}-${h.titleLine2}`} delay={i * 0.12}>
                <article className="text-center px-4 md:px-8 lg:px-10">
                  {photo && (
                    <figure className="relative mx-auto mb-10 w-full max-w-[260px] aspect-[3/4] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 768px) 260px, 80vw"
                        style={{
                          objectPosition: photo.objectPosition ?? "50% 30%",
                        }}
                        className="object-cover [filter:contrast(1.04)_saturate(0.98)]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-2 border border-gold/35 pointer-events-none"
                      />
                      <span
                        aria-hidden
                        className="absolute -inset-px border border-black/10 pointer-events-none"
                      />
                    </figure>
                  )}

                  <div className="flex flex-col items-center mb-8">
                    <span
                      className="text-gold tracking-[0.18em] text-[13px] mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {meta.numeral}
                    </span>
                    <span
                      className="eyebrow text-black/40"
                      style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                    >
                      {meta.year}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3 mb-8 text-gold">
                    <span className="block w-6 h-px bg-current" />
                    <span className="block w-1 h-1 rounded-full bg-current" />
                    <span className="block w-6 h-px bg-current" />
                  </div>

                  <h3
                    className="text-[clamp(22px,2.2vw,30px)] leading-[1.15] tracking-tight text-black mb-3 font-light"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {h.title}
                    <br />
                    {h.titleLine2}
                  </h3>

                  <div className="mt-7">
                    <div
                      className="eyebrow text-black/40 mb-3"
                      style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                    >
                      {dict.bestowedBy}
                    </div>
                    <p className="font-serif italic text-[15px] lg:text-base text-black/70 leading-snug">
                      {meta.bestowedBy}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ─── Momentos del Linaje · supporting gallery ───── */}
        <div className="mt-18 lg:mt-20">
          <Reveal>
            <div className="text-center mb-14 lg:mb-16">
              <div className="eyebrow rules text-burgundy mb-6 inline-flex">
                {dict.galleryEyebrow}
              </div>
              <h3
                className="text-[clamp(22px,2.4vw,32px)] font-light italic text-black/75 tracking-tight leading-snug max-w-2xl mx-auto"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {dict.galleryTitle}
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-14">
            {(["phd", "presidential", "senate"] as const).map((key, colIdx) => {
              const photos = HONOR_GALLERY[key];
              const caption = dict.galleryCaptions[colIdx];
              return (
                <Reveal
                  key={key}
                  delay={colIdx * 0.1}
                  className="flex flex-col gap-8"
                >
                  <div
                    className="eyebrow text-gold/80 text-center"
                    style={{ fontSize: "9.5px", letterSpacing: "0.36em" }}
                  >
                    {caption.event}
                  </div>

                  {photos.map((photo, photoIdx) => (
                    <figure key={photo.src} className="flex flex-col gap-3">
                      <div className="relative w-full aspect-[4/5] overflow-hidden">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 768px) 360px, 90vw"
                          style={{
                            objectPosition:
                              photo.objectPosition ?? "50% 35%",
                          }}
                          className="object-cover [filter:contrast(1.04)_saturate(0.98)]"
                        />
                        <span
                          aria-hidden
                          className="absolute inset-2 border border-gold/30 pointer-events-none"
                        />
                        <span
                          aria-hidden
                          className="absolute -inset-px border border-black/10 pointer-events-none"
                        />
                      </div>
                      <figcaption
                        className="font-serif italic text-[13.5px] text-black/55 leading-snug text-center px-2"
                      >
                        {photoIdx === 0 ? caption.first : caption.second}
                      </figcaption>
                    </figure>
                  ))}
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-16 flex flex-col items-center gap-3">
            <span className="block w-12 h-px bg-gold/60" />
            <span
              className="eyebrow text-black/40"
              style={{ fontSize: "9.5px", letterSpacing: "0.42em" }}
            >
              {dict.inServiceOfBecoming}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
