import { Reveal } from "@/components/reveal";
import { CTA } from "@/components/cta";
import {
  FEATURED_PRODUCTS,
  STAN_STORE_URL,
  stanProductUrl,
} from "@/lib/site";
import type { Dictionary } from "@/lib/i18n";

type LibraryProps = {
  dict: Dictionary["library"];
};

export function Library({ dict }: LibraryProps) {
  return (
    <section className="bg-ivory py-14 lg:py-20 border-t border-black/10">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-14">
          <Reveal>
            <div>
              <div className="eyebrow rules left text-burgundy mb-8">
                {dict.eyebrow}
              </div>
              <h2
                className="text-[clamp(36px,5vw,72px)] tracking-[-0.018em] font-light leading-[1.06] max-w-2xl"
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
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <CTA
              href={STAN_STORE_URL}
              className="cta-line text-burgundy hidden md:inline-flex"
            >
              {dict.cta}
            </CTA>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
          {FEATURED_PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="bg-ivory">
              <a
                href={stanProductUrl(p.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col h-full p-10 lg:p-12 transition-colors duration-500 hover:bg-beige/30"
              >
                <div className="flex items-baseline justify-between gap-4 mb-8">
                  <span className="eyebrow text-burgundy">{p.category}</span>
                  {p.price && (
                    <span
                      className="text-gold tracking-[0.18em] text-[12px]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.price}
                    </span>
                  )}
                </div>

                <h3
                  className="text-[clamp(22px,2.2vw,30px)] font-light tracking-[-0.01em] leading-[1.18] text-black mb-6 group-hover:text-burgundy transition-colors duration-500"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {p.name}
                </h3>

                <p className="font-serif italic text-[15px] text-black/65 leading-relaxed mb-10 grow">
                  {p.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="cta-line text-burgundy">{dict.viewOn}</span>
                  <span
                    aria-hidden
                    className="text-burgundy opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0"
                  >
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <CTA href={STAN_STORE_URL} className="cta-line text-burgundy">
            {dict.cta}
          </CTA>
        </div>
      </div>
    </section>
  );
}
