import { Reveal } from "@/components/reveal";
import type { Dictionary } from "@/lib/i18n";

type PillarsProps = {
  dict: Dictionary["pillars"];
};

export function Pillars({ dict }: PillarsProps) {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {dict.items.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.12}>
              <div className="flex flex-col">
                <div className="h-px w-12 bg-gold mb-8" />
                <div className="text-gold font-sans text-[11px] tracking-[0.3em] mb-6">
                  {p.n}
                </div>
                <h3 className="text-3xl md:text-4xl mb-6 text-black tracking-tight">
                  {p.title}
                </h3>
                <p className="font-serif italic text-lg text-black/70 leading-relaxed">
                  {p.line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
