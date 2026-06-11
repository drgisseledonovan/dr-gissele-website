import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import { MOVEMENT_COMMUNITY } from "@/lib/site";
import { COMMUNITY_GROUP } from "@/lib/media";
import type { Dictionary } from "@/lib/i18n";

/* Community / Join the Movement — the emotional invitation.
   Full-bleed cohort group photo, dark cinematic overlay,
   centered editorial copy + primary CTA pointing to the FREE Skool
   community of the Unsinkable Minds Movement (low-friction entry
   to the movement, not the paid Despierta sales page). */

type CommunityNextProps = {
  dict: Dictionary["communityNext"];
};

export function CommunityNext({ dict }: CommunityNextProps) {
  return (
    <section className="relative bg-black text-ivory overflow-hidden">
      {/* Full-bleed photograph */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] min-h-[520px] lg:min-h-[640px]">
        <Image
          src={COMMUNITY_GROUP.src}
          alt={COMMUNITY_GROUP.alt}
          fill
          priority={false}
          sizes="100vw"
          style={{
            objectPosition: COMMUNITY_GROUP.objectPosition ?? "50% 35%",
          }}
          className="object-cover [filter:contrast(1.05)_saturate(0.95)_brightness(0.92)]"
        />

        {/* Cinematic darken — strongest at top + bottom, softer mid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,11,0.55) 0%, rgba(11,11,11,0.25) 35%, rgba(11,11,11,0.35) 60%, rgba(11,11,11,0.75) 100%)",
          }}
        />

        {/* Subtle burgundy edge wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-multiply"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(138,21,56,0.25) 0%, transparent 65%)",
          }}
        />

        {/* Gold hairline frames */}
        <div
          aria-hidden
          className="absolute inset-3 lg:inset-5 border border-gold/30 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -inset-px border border-black pointer-events-none"
        />

        {/* Overlay copy — vertically centered, with breathing room */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <Reveal>
              <div className="eyebrow rules text-gold/85 mb-10 inline-flex">
                {dict.eyebrow}
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                className="text-[clamp(36px,5.5vw,76px)] leading-[1.05] tracking-[-0.018em] font-light mb-10"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {dict.titleLead}{" "}
                <span style={{ fontFamily: "var(--font-script)" }}>
                  {dict.titleScript}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-serif italic text-lg md:text-xl text-ivory/80 leading-[1.55] max-w-2xl mx-auto mb-12">
                {dict.quote}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                <CTA
                  href={MOVEMENT_COMMUNITY}
                  className="inline-block bg-gold text-black hover:bg-gold/90 transition-colors duration-500 px-10 sm:px-14 py-5 eyebrow font-medium"
                >
                  {dict.cta}
                </CTA>
                <span
                  className="eyebrow text-ivory/55"
                  style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                >
                  {dict.note}
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Photo caption — bottom-right corner */}
        <div className="absolute bottom-5 right-6 lg:bottom-7 lg:right-8 text-ivory/55">
          <span
            className="eyebrow"
            style={{ fontSize: "9px", letterSpacing: "0.32em" }}
          >
            {dict.photoCaption}
          </span>
        </div>
      </div>
    </section>
  );
}
