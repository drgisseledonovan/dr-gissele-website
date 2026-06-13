import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { HERO_PORTRAIT_OPTIONS } from "@/lib/media";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

const PORTRAIT = HERO_PORTRAIT_OPTIONS.practice;

type IntroductionProps = {
  locale: Locale;
  dict: Dictionary["introduction"];
};

export function Introduction({ locale, dict }: IntroductionProps) {
  return (
    <section className="bg-ivory py-14 lg:py-20 overflow-x-clip">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-center">
          <Reveal>
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={PORTRAIT.src}
                  alt={PORTRAIT.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  style={{
                    objectPosition: PORTRAIT.objectPosition ?? "50% 30%",
                  }}
                  className="object-cover [filter:contrast(1.03)_saturate(0.97)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-3 border border-gold/40 pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -inset-px border border-black/10 pointer-events-none"
                />
              </div>
              <figcaption className="mt-5 flex items-center gap-3">
                <span aria-hidden className="block w-6 h-px bg-gold/70" />
                <span
                  className="eyebrow text-black/45"
                  style={{ fontSize: "9.5px", letterSpacing: "0.34em" }}
                >
                  {dict.portraitCaption}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="max-w-xl">
              <div className="eyebrow rules left text-burgundy mb-8">
                {dict.eyebrow}
              </div>
              <h2
                className="text-[clamp(34px,4.5vw,60px)] leading-[1.08] tracking-tight mb-10 font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {dict.titleLead}{" "}
                <span
                  className="text-burgundy"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  {dict.titleScript}
                </span>
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-black/75 font-light">
                {dict.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3">
                <Link
                  href={localePath(locale, "/about")}
                  className="cta-line text-burgundy"
                >
                  {dict.cta1}
                </Link>
                <Link
                  href={localePath(locale, "/speaking")}
                  className="cta-line text-black/70 hover:text-black"
                >
                  {dict.cta2}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
