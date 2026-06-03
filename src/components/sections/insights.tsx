import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { featuredEssays, essayFor } from "@/lib/essays";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

type InsightsProps = {
  locale: Locale;
  dict: Dictionary["insightsHome"];
};

export function Insights({ locale, dict }: InsightsProps) {
  const essays = featuredEssays(3);

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex items-end justify-between mb-20">
          <Reveal>
            <div>
              <div className="eyebrow text-burgundy mb-6">{dict.eyebrow}</div>
              <h2 className="text-[clamp(36px,5vw,72px)] tracking-tight font-light">
                {dict.title}
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={localePath(locale, "/insights")}
              className="cta-line hidden md:inline-flex !pb-1"
            >
              {dict.cta}
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
          {essays.map((essay, i) => {
            const localized = essayFor(essay, locale);
            return (
              <Reveal key={essay.slug} delay={i * 0.1} className="bg-ivory">
                <Link
                  href={localePath(locale, `/insights/${essay.slug}`)}
                  className="group block p-8 lg:p-10 h-full transition-colors duration-500 hover:bg-beige/30"
                >
                  <div className="eyebrow text-burgundy mb-8">
                    {localized.pillar}
                  </div>
                  <h3 className="text-2xl lg:text-[28px] leading-tight tracking-tight mb-12 min-h-[5rem] group-hover:text-burgundy transition-colors duration-500">
                    {localized.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-black/50">
                      {essay.minutes} {dict.minRead}
                    </span>
                    <span className="text-burgundy opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 md:hidden">
          <Link href={localePath(locale, "/insights")} className="cta-line">
            {dict.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
