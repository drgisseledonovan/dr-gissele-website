import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";

const LAST_UPDATED = "May 17, 2026";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  return {
    title: dict.pages.privacy.eyebrow,
    description: dict.pages.privacy.lede,
    alternates: {
      canonical: `${SITE.url}/${locale}/privacy`,
      languages: {
        es: `${SITE.url}/es/privacy`,
        en: `${SITE.url}/en/privacy`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.privacy;

  return (
    <article className="bg-ivory pt-[140px] lg:pt-[180px] pb-20 lg:pb-28">
      <div className="mx-auto max-w-[760px] px-6 lg:px-12">
        <header className="mb-16 lg:mb-20">
          <div className="eyebrow rules left text-burgundy mb-10">
            {t.eyebrow}
          </div>
          <h1
            className="text-[clamp(36px,5vw,68px)] leading-[1.05] tracking-[-0.018em] font-light"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t.title}
          </h1>
          <p
            className="mt-6 eyebrow text-black/45"
            style={{ fontSize: "10px", letterSpacing: "0.32em" }}
          >
            {t.lastUpdatedLabel} · {LAST_UPDATED}
          </p>
          <div className="mt-10 flex items-center gap-3 text-gold">
            <span className="block w-10 h-px bg-current opacity-70" />
            <span className="block w-1 h-1 rounded-full bg-current" />
            <span className="block w-10 h-px bg-current opacity-70" />
          </div>
        </header>

        <div className="space-y-12 text-[16.5px] lg:text-[17px] leading-[1.85] text-black/80 font-light">
          <p className="font-serif italic text-black/65 text-lg">{t.lede}</p>

          {t.sections.map((s) => (
            <Section key={s.title} title={s.title}>
              <p>{s.body}</p>
            </Section>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t border-black/10">
          <Link href={localePath(locale, "/")} className="cta-line text-burgundy">
            {t.returnHome}
          </Link>
        </footer>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="text-[clamp(22px,2.2vw,30px)] font-light tracking-[-0.015em] leading-[1.18] text-black mb-5"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
