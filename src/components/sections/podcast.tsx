import Image from "next/image";
import { Reveal } from "@/components/reveal";
import {
  PODCAST_URL,
  PODCAST_HANDLE,
  MOVEMENT_SOCIAL,
} from "@/lib/site";
import { PODCAST_STUDIO } from "@/lib/media";
import type { Dictionary } from "@/lib/i18n";

/* Podcast — visual editorial section.
   Split layout: studio photo + copy. Promotes the Unsinkable Minds
   podcast and surfaces the movement's social handles
   (@unsinkableminds). Uses MOVEMENT_SOCIAL from site.ts. */

type PodcastProps = {
  dict: Dictionary["podcast"];
};

const MOVEMENT_PLATFORMS: ReadonlyArray<{
  key: keyof typeof MOVEMENT_SOCIAL;
  label: string;
}> = [
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "facebook", label: "Facebook" },
];

export function Podcast({ dict }: PodcastProps) {
  return (
    <section className="bg-ivory py-20 lg:py-28 border-t border-black/10 overflow-x-clip">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo — left on desktop */}
          <Reveal className="lg:col-span-7 order-2 lg:order-1">
            <figure className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={PODCAST_STUDIO.src}
                alt={PODCAST_STUDIO.alt}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                style={{
                  objectPosition: PODCAST_STUDIO.objectPosition ?? "50% 40%",
                }}
                className="object-cover [filter:contrast(1.05)_saturate(0.98)]"
              />
              {/* Soft cinematic gradient */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,11,11,0) 60%, rgba(11,11,11,0.45) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-3 border border-gold/35 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -inset-px border border-black/15 pointer-events-none"
              />
              <figcaption className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-ivory">
                <span
                  className="eyebrow text-ivory/80"
                  style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                >
                  {dict.photoCaption}
                </span>
                <span
                  className="eyebrow text-ivory/55"
                  style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                >
                  {dict.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Copy — right on desktop */}
          <Reveal delay={0.1} className="lg:col-span-5 order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden className="block w-8 h-px bg-gold" />
              <span className="eyebrow text-burgundy">{dict.eyebrow}</span>
            </div>

            <h2
              className="text-[clamp(32px,4vw,52px)] font-light tracking-[-0.015em] leading-[1.12] mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {dict.titleLead}
            </h2>
            <h2
              className="text-[clamp(34px,4.4vw,56px)] text-burgundy leading-[1.05] mb-8"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {dict.titleScript}
            </h2>

            <div className="space-y-5 text-[16px] lg:text-[17px] leading-[1.75] text-black/75 font-light mb-10 max-w-xl">
              {dict.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <a
              href={PODCAST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory transition-colors duration-500 px-10 py-4 eyebrow mb-10"
            >
              {dict.cta}
            </a>

            {/* Movement social row */}
            <div className="pt-8 border-t border-black/10">
              <div
                className="eyebrow text-black/45 mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.32em" }}
              >
                {dict.socialLabel} · {PODCAST_HANDLE}
              </div>
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {MOVEMENT_PLATFORMS.map((p) => (
                  <li key={p.key}>
                    <a
                      href={MOVEMENT_SOCIAL[p.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tracking-[0.22em] text-[11.5px] uppercase font-medium text-black/75 hover:text-burgundy transition-colors duration-300"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
