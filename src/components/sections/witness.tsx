import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/i18n";

type WitnessProps = {
  dict: Dictionary["witness"];
};

export function Witness({ dict }: WitnessProps) {
  return (
    <section className="bg-ivory py-14 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-14 lg:mb-16">
            <div className="eyebrow rules text-burgundy mb-8 inline-flex">
              {dict.eyebrow}
            </div>
            <h2
              className="text-[clamp(32px,4vw,52px)] font-light tracking-[-0.015em] text-black leading-[1.12]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {dict.title}
            </h2>
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0">
          <span
            aria-hidden
            className="hidden md:block absolute top-8 bottom-8 left-1/3 w-px bg-gold/30"
          />
          <span
            aria-hidden
            className="hidden md:block absolute top-8 bottom-8 left-2/3 w-px bg-gold/30"
          />

          {dict.items.map((w, i) => (
            <Reveal key={w.quote} delay={i * 0.1}>
              <article className="text-center px-4 md:px-8 lg:px-10">
                <span
                  aria-hidden
                  className="block text-burgundy text-3xl leading-none mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  &ldquo;
                </span>

                <blockquote>
                  <p
                    className="font-light italic text-[clamp(17px,1.4vw,21px)] leading-[1.55] text-black/85 tracking-[-0.003em]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {w.quote}
                  </p>
                </blockquote>

                <div className="flex items-center justify-center gap-3 mt-8 mb-5 text-gold">
                  <span className="block w-6 h-px bg-current opacity-70" />
                  <span className="block w-1 h-1 rounded-full bg-current" />
                  <span className="block w-6 h-px bg-current opacity-70" />
                </div>

                <footer>
                  <div
                    className="eyebrow text-black/45 mb-1"
                    style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                  >
                    {w.attribution}
                  </div>
                  <div className="font-serif italic text-[13px] text-black/55">
                    {w.context}
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
