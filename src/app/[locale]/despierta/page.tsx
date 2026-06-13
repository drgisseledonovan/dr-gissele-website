import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Newsletter } from "@/components/sections/newsletter";
import { SITE } from "@/lib/site";
import {
  HERO_PORTRAIT,
  HERO_PORTRAIT_OPTIONS,
  LOGO_SEAL,
  LOGO_MONOGRAM_GOLD,
} from "@/lib/media";

const MENTOR_PORTRAIT = HERO_PORTRAIT_OPTIONS.mastermindLaugh;
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

/* ─── Skool checkout URLs ──────────────────────────────────────────
   The two tiers live in Dr. Gissele's Skool community "Unsinkable
   Minds". Skool's checkout flow runs on the community's /plans page
   where the three tiers (Standard free, Premium Despierta, VIP
   Expansión) are presented side-by-side with the JOIN buttons.
   Sending visitors directly to /plans skips the community discovery
   step and lands them on the conversion screen with monthly/annual
   billing toggle ready.
   ──────────────────────────────────────────────────────────────── */
const SKOOL_PLANS = "https://www.skool.com/unsinkableminds/plans";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  return {
    title: "Despierta Tu Poder · Dra. Gissele Donovan",
    description:
      "Programa de Alto Rendimiento Mental y Cognitivo. 12 módulos de transformación neurociencia, identidad y liderazgo. Comunidad Unsinkable Minds.",
    alternates: {
      canonical: `${SITE.url}/${locale}/despierta`,
      languages: {
        es: `${SITE.url}/es/despierta`,
        en: `${SITE.url}/en/despierta`,
      },
    },
    openGraph: {
      title: "Despierta Tu Poder · Programa Insignia de Dra. Gissele Donovan",
      description:
        "12 semanas de transformación profunda. Neurociencia. Identidad. Liderazgo. Comunidad activa.",
      url: `${SITE.url}/${locale}/despierta`,
      type: "website",
    },
  };
}

const MODULES = [
  { n: "I",   title: "El Poder de la Mentalidad",          tagline: "Tu poder está en tu mente." },
  { n: "II",  title: "La Neurociencia del Hábito",         tagline: "Cómo crear y romper hábitos con éxito." },
  { n: "III", title: "Creencias Limitantes",                tagline: "Conviértete en tu mejor versión." },
  { n: "IV",  title: "Reprograma tu Mente",                 tagline: "Creencias nuevas, resultados nuevos." },
  { n: "V",   title: "Disciplina y Fuerza de Voluntad",     tagline: "Disciplina sin depender de la motivación." },
  { n: "VI",  title: "El Poder de la Consistencia",         tagline: "Mantener hábitos sin abandonar." },
  { n: "VII", title: "Domina tu Diálogo Interno",           tagline: "Transforma tu voz interior y autoimagen." },
  { n: "VIII",title: "Mentalidad de Crecimiento vs. Fija",  tagline: "Ver los desafíos como oportunidades." },
  { n: "IX",  title: "Convertir Fracasos en Éxitos",        tagline: "Cambia la percepción del fracaso." },
  { n: "X",   title: "Estrategias Sostenibles",             tagline: "Sistema para mantener el éxito." },
  { n: "XI",  title: "Tu Entorno y tu Éxito",               tagline: "Tu ambiente te potencia o te destruye." },
  { n: "XII", title: "Magnificando tu Potencial",           tagline: "Plan de 30 días. Integración total." },
];

/* Tier benefits · Synced with the final architecture set up in Skool
   (June 2026). Keep these in sync with the Skool checkmarks on
   skool.com/unsinkableminds/plans so the sales page and the Skool
   checkout tell the same story. */
const DESPIERTA_BENEFITS = [
  "DESPIERTA · Acceso completo a los 12 módulos",
  "Acceso al programa desde la app móvil de Skool",
  "Workbook PDF · Guía editorial luxury descargable",
  "Acceso a todos los eventos en línea y presenciales",
  "Biblioteca de Códigos Exclusivos · Recursos descargables",
  "Certificado al completar Despierta Tu Poder",
];

const EXPANSION_BENEFITS = [
  "EXPANSIÓN · Todo de Despierta + privilegios VIP",
  "Mastermind + Q&A en vivo mensual con Dra. Gissele",
  "Acceso PRIMORDIAL a eventos presenciales y en línea",
  "Camiseta + Gorra Unsinkable Minds (solo plan anual)",
  "Libro firmado de Dra. Gissele (solo plan anual)",
  "1 llamada estratégica 1:1 al ingresar",
];

const FAQ = [
  {
    q: "¿Para quién es Despierta Tu Poder?",
    a: "Para personas — líderes, emprendedores, profesionales, visionarios — que saben que nacieron para más y están listos para reconstruir su mente, su cuerpo y su espíritu desde la raíz. No es un curso de motivación superficial. Es un proceso de identidad.",
  },
  {
    q: "¿Cuándo empieza?",
    a: "Cuando tú decidas. La Introducción y el Módulo 1 están disponibles desde el momento que te suscribes. Cada 3 días se libera un módulo nuevo automáticamente. En aproximadamente 5 semanas tienes acceso a los 12 módulos completos.",
  },
  {
    q: "¿Cuál es la diferencia entre Despierta y Expansión?",
    a: "Despierta ($59/mes) te da acceso al curso completo y a la comunidad básica. Expansión ($97/mes) te incluye todo lo anterior + sesión grupal mensual en vivo conmigo, Q&A directo cada mes, canales premium, y acceso prioritario a futuros cursos. Expansión es para quienes quieren acompañamiento más cercano.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. Tu suscripción se renueva mes a mes (o año a año si elegiste anual). Puedes cancelar en cualquier momento desde tu perfil en Skool. Mantienes acceso hasta el final del período pagado.",
  },
  {
    q: "¿Dónde vive el programa?",
    a: "Despierta Tu Poder vive en Skool, una plataforma premium de comunidades y cursos. Tienes acceso desde tu navegador y desde la app móvil de Skool (iOS + Android). Una vez te suscribes, recibes un email con instrucciones para entrar.",
  },
  {
    q: "¿Tiene certificado?",
    a: "Sí. Al completar los 12 módulos descargas tu certificado oficial de graduación firmado por la Dra. Gissele Donovan, Co-Fundadora del Movimiento Unsinkable Minds.",
  },
];

export default async function DespiertaPage({ params }: { params: Params }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      {/* ─── Cinematic Hero ──────────────────────────────────────── */}
      <section className="relative bg-ivory pt-[140px] lg:pt-[180px] pb-20 lg:pb-28 overflow-x-clip">
        {/* Gold radial wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 25% 30%, rgba(216,203,190,0.45) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                >
                  PROGRAMA INSIGNIA · UNSINKABLE MINDS
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1
                className="text-[clamp(48px,7vw,108px)] leading-[1.02] tracking-[-0.018em] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Despierta
                <br />
                <span
                  className="text-burgundy italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  tu Poder.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                className="mt-10 max-w-xl text-[19px] leading-relaxed text-black/75 font-light italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Programa de Alto Rendimiento Mental y Cognitivo. 12 módulos.
                Neurociencia, identidad, liderazgo y fe. Para quienes
                decidieron volver a quien fueron diseñados a ser.
              </p>
            </Reveal>

            {/* Hero CTA · single editorial scroll anchor. Per
                Dr. Gissele's brand-coherent strategy: ENDULZAR
                PRIMERO, PRECIO DESPUÉS. The visitor falls in
                love with the transformation across the page, then
                discovers the price after the value has been
                anchored. Mirrors Marie Forleo / Amy Porterfield
                / Joe Dispenza sales page patterns. */}
            <Reveal delay={0.15}>
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
                <a
                  href="#pricing"
                  className="group inline-flex items-center gap-4 bg-burgundy text-ivory hover:bg-black transition-colors duration-500 py-5 px-10 eyebrow"
                  style={{ letterSpacing: "0.22em", fontSize: "11px" }}
                >
                  <span>VER EL PROGRAMA</span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-500 group-hover:translate-y-0.5"
                  >
                    ↓
                  </span>
                </a>
                <span
                  className="eyebrow text-black/45"
                  style={{ fontSize: "9.5px", letterSpacing: "0.32em" }}
                >
                  ACCESO INMEDIATO  ·  APP MÓVIL INCLUIDA
                </span>
              </div>
            </Reveal>
          </div>

          {/* Portrait right column · hidden on mobile */}
          <Reveal delay={0.2}>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[3/4] overflow-hidden bg-beige/40">
                <Image
                  src={HERO_PORTRAIT.src}
                  alt={HERO_PORTRAIT.alt}
                  fill
                  sizes="500px"
                  style={{ objectPosition: HERO_PORTRAIT.objectPosition ?? "50% 30%" }}
                  className="object-cover [filter:contrast(1.05)_saturate(0.96)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,11,11,0) 60%, rgba(11,11,11,0.32) 100%)",
                  }}
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-3 border border-gold/45 pointer-events-none"
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-ivory pointer-events-none">
                <span
                  className="font-serif italic text-[13px] leading-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Dra. Gissele Donovan
                </span>
                <span
                  className="eyebrow text-ivory/80"
                  style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                >
                  PROGRAMA INSIGNIA
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── The Promise ─────────────────────────────────────────── */}
      <section className="relative bg-burgundy text-ivory py-24 lg:py-32 overflow-hidden">
        <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12 text-center">
          <Reveal>
            <div
              aria-hidden
              className="block w-12 h-px bg-gold mx-auto mb-8"
            />
            <span
              className="eyebrow text-gold"
              style={{ fontSize: "10px", letterSpacing: "0.4em" }}
            >
              POR QUÉ ESTÁS AQUÍ
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="mt-10 text-[clamp(32px,4.5vw,64px)] leading-[1.15] font-light italic max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Muchas personas comienzan a perderse a sí mismas mucho antes
              de que la vida realmente las quiebre.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-12 max-w-2xl mx-auto text-lg leading-relaxed text-ivory/80 font-light"
            >
              La motivación dura unos días. Los hábitos viejos vuelven. La
              voz interior susurra que esto no es para ti. Y la vida sigue
              corriendo sin que tú te muevas hacia lo que sabes que mereces.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-ivory/90 font-light"
            >
              No es falta de ganas. Es falta de un sistema. Y eso es
              exactamente lo que Despierta Tu Poder te da.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── What is Despierta · 3 Pillars ──────────────────────── */}
      <section className="relative bg-ivory py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                >
                  LA RESPUESTA
                </span>
                <span aria-hidden className="block w-12 h-px bg-gold" />
              </div>
              <h2
                className="text-[clamp(36px,5vw,72px)] leading-[1.08] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Un proceso completo
                <br />
                <span className="text-burgundy italic">
                  para reconstruirte desde la raíz.
                </span>
              </h2>
              <p className="mt-10 text-lg leading-relaxed text-black/70 font-light">
                Despierta Tu Poder integra neurociencia, liderazgo, identidad
                y fe en un sistema de 12 módulos diseñado para llevarte de
                quien fuiste a quien estás decidiendo ser.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {[
              {
                n: "01",
                title: "La Mente",
                line: "La arquitectura del llegar a ser. La identidad, reconstruida desde adentro.",
              },
              {
                n: "02",
                title: "El Cuerpo",
                line: "El vehículo de la transformación. La disciplina como forma de devoción.",
              },
              {
                n: "03",
                title: "El Espíritu",
                line: "La brújula del llamado. El propósito, vivido como práctica diaria.",
              },
            ].map((pillar, i) => (
              <Reveal key={pillar.n} delay={0.05 + i * 0.08}>
                <div className="relative">
                  <span
                    className="block text-burgundy text-[64px] leading-none font-light italic mb-6"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {pillar.n}
                  </span>
                  <div className="block w-10 h-px bg-gold mb-6" />
                  <h3
                    className="text-[28px] font-light mb-4"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-base leading-relaxed text-black/70 font-light italic">
                    {pillar.line}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── The 12 Modules ────────────────────────────────────── */}
      <section className="relative bg-beige/30 py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                >
                  EL CAMINO · 12 MÓDULOS
                </span>
                <span aria-hidden className="block w-12 h-px bg-gold" />
              </div>
              <h2
                className="text-[clamp(36px,5vw,72px)] leading-[1.08] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Doce códigos.
                <br />
                <span className="text-burgundy italic">
                  Una transformación.
                </span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-black/65 font-light italic">
                Un módulo nuevo se libera cada 3 días. Cinco semanas
                aproximadas. Acceso para siempre mientras tu suscripción
                esté activa.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {MODULES.map((m, i) => (
              <Reveal key={m.n} delay={(i % 6) * 0.04}>
                <div className="relative border-l-2 border-gold/40 pl-6 py-2">
                  <span
                    className="block text-burgundy text-[24px] italic font-light mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {m.n}
                  </span>
                  <h3
                    className="text-[20px] font-light leading-tight mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-sm text-black/60 italic leading-relaxed">
                    {m.tagline}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Workbook callout ──────────────────────────────────── */}
      <section className="relative bg-ivory py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                >
                  INCLUIDO · WORKBOOK EDITORIAL
                </span>
              </div>
              <h2
                className="text-[clamp(36px,4.5vw,60px)] leading-[1.08] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Una guía editorial
                <br />
                <span className="text-burgundy italic">
                  para acompañar cada paso.
                </span>
              </h2>
              <p className="mt-10 text-lg leading-relaxed text-black/70 font-light">
                36 páginas diseñadas en luxury editorial · Una página por
                módulo con prompts profundos, espacio para escribir, plan
                de 30 días y certificado de graduación. Descargable desde
                tu primer módulo.
              </p>
              <ul className="mt-10 space-y-3 text-black/75">
                {[
                  "Worksheet por cada uno de los 12 módulos",
                  "Carta de Compromiso firmable",
                  "Plan de Acción de 30 Días",
                  "Certificado oficial de graduación",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <span aria-hidden className="block w-6 h-px bg-gold/75 shrink-0" />
                    <span className="font-serif italic">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              {/* Workbook stylized card */}
              <div className="relative aspect-[3/4] bg-burgundy overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory text-center px-8">
                  <Image
                    src={LOGO_SEAL.src}
                    alt={LOGO_SEAL.alt}
                    width={130}
                    height={130}
                    className="mb-6"
                  />
                  <h3
                    className="text-[44px] leading-tight font-light"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    DESPIERTA
                    <br />
                    TU PODER.
                  </h3>
                  <p
                    className="mt-6 text-base italic text-gold/90"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Guía Editorial · Workbook
                  </p>
                  <div aria-hidden className="block w-12 h-px bg-gold mt-8 mb-6" />
                  <span
                    className="eyebrow text-ivory/70"
                    style={{ fontSize: "9px", letterSpacing: "0.32em" }}
                  >
                    36 PÁGINAS · DRA. GISSELE DONOVAN
                  </span>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-3 border border-gold/45 pointer-events-none"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Pricing Tiers ──────────────────────────────────────── */}
      <section
        id="pricing"
        className="relative bg-ivory py-24 lg:py-32 overflow-x-clip"
      >
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                >
                  LA INVITACIÓN
                </span>
                <span aria-hidden className="block w-12 h-px bg-gold" />
              </div>
              <h2
                className="text-[clamp(36px,5vw,72px)] leading-[1.08] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Elige tu nivel
                <br />
                <span className="text-burgundy italic">
                  de transformación.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Tier 1 · Despierta */}
            <Reveal delay={0.05}>
              <div className="relative bg-ivory border border-black/15 p-10 lg:p-12 flex flex-col h-full">
                <div className="mb-8">
                  <span
                    className="eyebrow text-burgundy"
                    style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                  >
                    TIER 1
                  </span>
                  <h3
                    className="mt-3 text-[44px] font-light"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Despierta
                  </h3>
                  <p className="mt-2 text-black/60 italic">
                    El programa completo. 12 módulos. App. Eventos.
                  </p>
                </div>

                <div className="mb-10 pb-8 border-b border-black/10">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[56px] font-light leading-none"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      $59
                    </span>
                    <span className="text-black/60">/mes</span>
                  </div>
                  <p
                    className="eyebrow text-gold mt-3"
                    style={{ fontSize: "10px", letterSpacing: "0.3em" }}
                  >
                    O $497/AÑO · AHORRA ~30%
                  </p>
                </div>

                <ul className="space-y-4 flex-1 mb-10">
                  {DESPIERTA_BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="text-gold mt-1 shrink-0 text-xl leading-none"
                      >
                        ✓
                      </span>
                      <span className="text-black/80 leading-relaxed text-[15px]">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={SKOOL_PLANS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full text-center border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory transition-colors duration-500 py-5 eyebrow"
                  style={{ letterSpacing: "0.24em", fontSize: "11px" }}
                >
                  ELEGIR DESPIERTA
                  <span
                    aria-hidden
                    className="inline-block ml-3 transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </Reveal>

            {/* Tier 2 · Expansión RECOMMENDED */}
            <Reveal delay={0.1}>
              <div className="relative bg-burgundy text-ivory p-10 lg:p-12 flex flex-col h-full">
                {/* Recommended badge */}
                <div className="absolute -top-4 left-10 px-4 py-1.5 bg-gold text-burgundy">
                  <span
                    className="eyebrow"
                    style={{
                      fontSize: "9.5px",
                      letterSpacing: "0.32em",
                      fontWeight: 600,
                    }}
                  >
                    ⭐ RECOMENDADO
                  </span>
                </div>

                <div className="mb-8">
                  <span
                    className="eyebrow text-gold"
                    style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                  >
                    TIER 2
                  </span>
                  <h3
                    className="mt-3 text-[44px] font-light italic"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Expansión
                  </h3>
                  <p className="mt-2 text-ivory/70 italic">
                    Todo + masterclasses en vivo + acceso VIP.
                  </p>
                </div>

                <div className="mb-10 pb-8 border-b border-ivory/20">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[56px] font-light leading-none"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      $97
                    </span>
                    <span className="text-ivory/60">/mes</span>
                  </div>
                  <p
                    className="eyebrow text-gold mt-3"
                    style={{ fontSize: "10px", letterSpacing: "0.3em" }}
                  >
                    O $847/AÑO · AHORRA ~27%
                  </p>
                </div>

                <ul className="space-y-4 flex-1 mb-10">
                  {EXPANSION_BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="text-gold mt-1 shrink-0 text-xl leading-none"
                      >
                        ✓
                      </span>
                      <span className="text-ivory/90 leading-relaxed text-[15px]">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={SKOOL_PLANS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full text-center bg-gold text-burgundy hover:bg-ivory transition-colors duration-500 py-5 eyebrow"
                  style={{ letterSpacing: "0.24em", fontSize: "11px", fontWeight: 600 }}
                >
                  ELEGIR EXPANSIÓN
                  <span
                    aria-hidden
                    className="inline-block ml-3 transition-transform duration-500 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <p
              className="eyebrow text-black/45 text-center mt-12"
              style={{ fontSize: "10px", letterSpacing: "0.32em" }}
            >
              CANCELA CUANDO QUIERAS  ·  PAGOS SEGUROS VÍA STRIPE  ·  APP MÓVIL INCLUIDA
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── About Dra. Gissele · Authority ──────────────────────── */}
      <section className="relative bg-beige/30 py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-beige/40">
                <Image
                  src={MENTOR_PORTRAIT.src}
                  alt={MENTOR_PORTRAIT.alt}
                  fill
                  sizes="400px"
                  style={{ objectPosition: MENTOR_PORTRAIT.objectPosition ?? "50% 30%" }}
                  className="object-cover [filter:contrast(1.05)_saturate(0.96)]"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-3 border border-gold/45 pointer-events-none"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                >
                  TU MENTORA
                </span>
              </div>
              <h2
                className="text-[clamp(36px,4.5vw,60px)] leading-[1.08] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Dra. Gissele
                <br />
                <span className="text-burgundy italic">Donovan.</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-black/75 font-light">
                Líder transformacional colombiana. Doctora en Filosofía en
                Liderazgo Cristiano y Negocios. Decana de la Escuela de
                Liderazgo y Negocios en Cornerstone Christian University.
                Coach certificada en neurociencia. Co-Fundadora del
                Movimiento Unsinkable Minds junto a su esposo, el
                empresario Wally Donovan.
              </p>
              <ul className="mt-10 space-y-4 text-black/80">
                {[
                  "Galardonada con el Presidential Lifetime Achievement Award (2024)",
                  "Honrada por el Senado de Puerto Rico con Moción de Felicitación y Medalla (2026)",
                  "Reconocida entre las Top 20 Power Voices bajo Les Brown",
                  "Co-autora del libro Mujeres Líderes Resilientes (2026)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span aria-hidden className="block w-6 h-px bg-gold/75 shrink-0 mt-3" />
                    <span className="font-serif italic">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────── */}
      <section className="relative bg-ivory py-24 lg:py-32 overflow-x-clip">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.36em" }}
                >
                  PREGUNTAS FRECUENTES
                </span>
                <span aria-hidden className="block w-12 h-px bg-gold" />
              </div>
              <h2
                className="text-[clamp(32px,4vw,56px)] leading-[1.08] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Todo lo que necesitas saber
                <br />
                <span className="text-burgundy italic">
                  antes de decidir.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={0.04 * i}>
                <details className="group border-t border-black/15 py-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3
                      className="text-[20px] lg:text-[22px] font-light pr-6"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.q}
                    </h3>
                    <span
                      aria-hidden
                      className="text-gold text-2xl shrink-0 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-6 text-base leading-relaxed text-black/70 font-light italic">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ──────────────────────────────────────────── */}
      <section className="relative bg-burgundy text-ivory py-24 lg:py-32 overflow-hidden">
        {/* Subtle gold dots scatter */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(198,161,91,0.2) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(198,161,91,0.15) 0%, transparent 40%)",
          }}
        />

        <div className="relative mx-auto max-w-[1000px] px-6 lg:px-12 text-center">
          <Reveal>
            <Image
              src={LOGO_MONOGRAM_GOLD.src}
              alt=""
              width={100}
              height={100}
              className="mx-auto mb-10"
            />
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              className="text-[clamp(40px,6vw,84px)] leading-[1.08] font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Las puertas
              <br />
              <span className="italic text-gold">están abiertas.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mt-12 max-w-2xl mx-auto text-lg leading-relaxed text-ivory/85 italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              No esperes el permiso. No esperes las condiciones. No
              esperes la temporada perfecta. Decide hoy. La persona que
              estás llamada a ser ya te está esperando del otro lado.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <a
                href={SKOOL_PLANS}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 group inline-flex items-center justify-center gap-3 border border-ivory text-ivory hover:bg-ivory hover:text-burgundy transition-colors duration-500 py-5 px-6 eyebrow"
                style={{ letterSpacing: "0.22em", fontSize: "11px" }}
              >
                DESPIERTA · $59/MES
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <a
                href={SKOOL_PLANS}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 group inline-flex items-center justify-center gap-3 bg-gold text-burgundy hover:bg-ivory transition-colors duration-500 py-5 px-6 eyebrow"
                style={{ letterSpacing: "0.22em", fontSize: "11px", fontWeight: 600 }}
              >
                EXPANSIÓN · $97/MES ⭐
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="eyebrow text-ivory/55 mt-12"
              style={{ fontSize: "9.5px", letterSpacing: "0.36em" }}
            >
              CANCELA CUANDO QUIERAS  ·  PAGOS SEGUROS  ·  ACCESO INMEDIATO
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-16 max-w-md mx-auto">
              <div aria-hidden className="block w-12 h-px bg-gold/60 mx-auto mb-6" />
              <p
                className="font-serif italic text-base text-ivory/70"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Las mentes fuertes no se hunden.
              </p>
              <p
                className="eyebrow text-gold mt-3"
                style={{ fontSize: "9px", letterSpacing: "0.36em" }}
              >
                — UNSINKABLE MINDS
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Newsletter dict={dict.newsletter} />
    </>
  );
}
