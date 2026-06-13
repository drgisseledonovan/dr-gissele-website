import { Reveal } from "@/components/reveal";
import { SOCIAL } from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

/* Social — elegant editorial row.
   Five platforms (Instagram, TikTok, YouTube, LinkedIn, Facebook)
   in typographic Cinzel buttons. Pulls URLs from SOCIAL in
   src/lib/site.ts so edits live in one place. */

type SocialProps = {
  dict: Dictionary["social"];
};

const PLATFORMS: ReadonlyArray<{ key: keyof typeof SOCIAL; label: string }> = [
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "facebook", label: "Facebook" },
];

export function Social({ dict }: SocialProps) {
  return (
    <section className="bg-beige py-14 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12 lg:mb-14">
            <div
              className="eyebrow text-black/45 mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.36em" }}
            >
              {dict.eyebrow}
            </div>
            <h2
              className="text-[clamp(28px,3.4vw,44px)] font-light tracking-[-0.015em] leading-[1.15] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {dict.title}
            </h2>
            <div className="flex items-center justify-center gap-3 text-gold">
              <span className="block w-8 h-px bg-current opacity-70" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-8 h-px bg-current opacity-70" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-black/10">
            {PLATFORMS.map((p) => (
              <li key={p.key} className="bg-beige">
                <a
                  href={SOCIAL[p.key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center text-center py-10 px-6 transition-colors duration-500 hover:bg-ivory"
                >
                  <span
                    className="tracking-[0.22em] text-[11.5px] sm:text-[13px] uppercase font-medium text-black group-hover:text-burgundy transition-colors duration-500"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="mt-3 font-serif italic text-[13px] text-black/55 group-hover:text-burgundy transition-colors duration-500"
                  >
                    {dict.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
