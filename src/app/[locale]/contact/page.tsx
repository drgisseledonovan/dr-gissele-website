import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { SITE, FORM_ENDPOINT, SOCIAL } from "@/lib/site";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

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
    title: dict.pages.contact.eyebrow,
    description: dict.pages.contact.lede,
    alternates: {
      canonical: `${SITE.url}/${locale}/contact`,
      languages: {
        es: `${SITE.url}/es/contact`,
        en: `${SITE.url}/en/contact`,
      },
    },
    openGraph: {
      title: `${dict.pages.contact.eyebrow} · ${SITE.name}`,
      description: dict.pages.contact.lede,
      url: `${SITE.url}/${locale}/contact`,
      type: "website",
    },
  };
}

const hasForm = FORM_ENDPOINT.length > 0;

export default async function ContactPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.pages.contact;

  return (
    <>
      {/* Lede */}
      <section className="relative bg-ivory pt-[110px] lg:pt-[130px] pb-16 lg:pb-24 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="eyebrow rules left text-burgundy mb-10">
              {t.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className="text-[clamp(40px,6vw,96px)] leading-[1.02] tracking-[-0.018em] font-light max-w-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.titleLead}{" "}
              <span
                className="text-burgundy"
                style={{ fontFamily: "var(--font-script)" }}
              >
                {t.titleScript}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-12 max-w-2xl text-lg leading-relaxed text-black/70 font-light">
              {t.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Inquiry routes */}
      <section className="bg-ivory pb-14 lg:pb-20 border-t border-black/10 pt-14 lg:pt-16">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-black/10">
            {t.routes.map((r, i) => {
              const recipient = r.eyebrow === "Media" || r.eyebrow === "Medios" ? SITE.pressEmail : SITE.email;
              const href = `mailto:${recipient}?subject=${encodeURIComponent(
                r.subject
              )}&body=${encodeURIComponent(r.body)}`;
              return (
                <Reveal key={r.title} delay={i * 0.08} className="bg-ivory">
                  <a
                    href={href}
                    className="group block p-10 lg:p-12 h-full transition-colors duration-500 hover:bg-beige/30"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <span
                        className="text-gold tracking-[0.22em] text-[13px]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {r.numeral}
                      </span>
                      <span aria-hidden className="block w-8 h-px bg-gold/60" />
                    </div>
                    <div className="eyebrow text-burgundy mb-6">{r.eyebrow}</div>
                    <h2
                      className="text-[clamp(28px,3vw,40px)] font-light tracking-[-0.015em] leading-[1.1] mb-6 group-hover:text-burgundy transition-colors duration-500"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {r.title}
                    </h2>
                    <p className="font-serif italic text-base lg:text-lg text-black/65 leading-relaxed mb-10 max-w-sm">
                      {r.lede}
                    </p>
                    <span className="cta-line text-burgundy">{r.cta}</span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct details */}
      <section className="bg-beige py-14 lg:py-16">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <Reveal>
              <div>
                <div
                  className="eyebrow text-black/40 mb-3"
                  style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                >
                  {t.detailsGeneral}
                </div>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-serif italic text-lg lg:text-xl text-black/85 hover:text-burgundy transition-colors duration-300 break-all"
                >
                  {SITE.email}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <div
                  className="eyebrow text-black/40 mb-3"
                  style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                >
                  {t.detailsPress}
                </div>
                <a
                  href={`mailto:${SITE.pressEmail}`}
                  className="font-serif italic text-lg lg:text-xl text-black/85 hover:text-burgundy transition-colors duration-300 break-all"
                >
                  {SITE.pressEmail}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div
                  className="eyebrow text-black/40 mb-3"
                  style={{ fontSize: "10px", letterSpacing: "0.32em" }}
                >
                  {t.detailsResponse}
                </div>
                <p className="font-serif italic text-lg lg:text-xl text-black/85">
                  {t.detailsResponseValue}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Optional form */}
      {hasForm && (
        <section className="bg-ivory py-14 lg:py-20">
          <div className="mx-auto max-w-[820px] px-6 lg:px-12">
            <Reveal>
              <div className="text-center mb-14">
                <div className="eyebrow rules text-burgundy mb-8 inline-flex">
                  {t.formEyebrow}
                </div>
                <h2
                  className="text-[clamp(28px,3.4vw,44px)] font-light tracking-[-0.015em] leading-[1.12]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.formTitle}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <form action={FORM_ENDPOINT} method="POST" className="flex flex-col gap-8">
                <Field label={t.formName} name="name" required />
                <Field label={t.formEmail} name="email" type="email" required autoComplete="email" />
                <Field
                  label={t.formSubject}
                  name="subject"
                  placeholder={t.formSubjectPlaceholder}
                />
                <FieldTextarea label={t.formMessage} name="message" required />
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />
                <button
                  type="submit"
                  className="self-start border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory transition-colors duration-500 px-12 py-5 eyebrow"
                >
                  {t.formSubmit}
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      )}

      {/* Social */}
      <section className="bg-ivory py-14 lg:py-16 border-t border-black/10">
        <div className="mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-gold mb-10">
              <span className="block w-10 h-px bg-current opacity-70" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-10 h-px bg-current opacity-70" />
            </div>
            <div
              className="eyebrow text-black/45 mb-6"
              style={{ fontSize: "10px", letterSpacing: "0.32em" }}
            >
              {t.socialEyebrow}
            </div>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {SOCIAL.instagram && (
                <li>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-line text-black/75 hover:text-burgundy"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {SOCIAL.linkedin && (
                <li>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-line text-black/75 hover:text-burgundy"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {SOCIAL.youtube && (
                <li>
                  <a
                    href={SOCIAL.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-line text-black/75 hover:text-burgundy"
                  >
                    YouTube
                  </a>
                </li>
              )}
              {SOCIAL.tiktok && (
                <li>
                  <a
                    href={SOCIAL.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-line text-black/75 hover:text-burgundy"
                  >
                    TikTok
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="eyebrow text-black/50"
        style={{ fontSize: "10px", letterSpacing: "0.32em" }}
      >
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="bg-transparent border-b border-black/30 focus:border-burgundy focus:outline-none py-3 text-base text-black placeholder:text-black/40 font-light"
      />
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  required = false,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span
        className="eyebrow text-black/50"
        style={{ fontSize: "10px", letterSpacing: "0.32em" }}
      >
        {label}
      </span>
      <textarea
        name={name}
        required={required}
        rows={6}
        className="bg-transparent border-b border-black/30 focus:border-burgundy focus:outline-none py-3 text-base text-black placeholder:text-black/40 font-light resize-y"
      />
    </label>
  );
}
