"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import {
  HERO_PORTRAIT_OPTIONS,
  LOGO_MONOGRAM_GOLD,
  COMMUNITY_GROUP,
} from "@/lib/media";
import { MOVEMENT_COMMUNITY } from "@/lib/site";

/* Para esta landing usamos el retrato sonriente con micrófono
   (portrait-joy-mic) en vez del Hero principal del sitio, porque
   la energía de un ad debe ser más cálida y acogedora que la
   autoridad seria del Hero del homepage. */
const HERO_PORTRAIT = HERO_PORTRAIT_OPTIONS.joyMic;

/* ─── /movimiento ─────────────────────────────────────────────────
   Dedicated landing page funnel for Meta ads (Facebook / Instagram).

   SIMPLIFIED ARCHITECTURE · only TWO actions:
     1. Drop email → receive RENACER PDF (Kit form)
     2. Join the free Skool community

   The Mastermind July 5 invitation lives INSIDE Skool as a welcome
   message so visitors don't get paralyzed by three choices here.
   Hick's Law: every extra choice slows the decision.

   Reuses /api/subscribe Kit endpoint.
   ───────────────────────────────────────────────────────────────── */

const RENACER_FORM_ACTION = "/api/subscribe";
const SKOOL_FREE_URL = MOVEMENT_COMMUNITY;
const RENACER_PDF_URL = "/RENACER-Guia-Editorial.pdf";

type LocalizedCopy = {
  eyebrow: string;
  title1: string;
  title2: string;
  sub: string;
  formPlaceholder: string;
  formButton: string;
  formSending: string;
  formTrust: string;
  sentTitle: string;
  sentSub: string;
  sentDownload: string;
  sentCommunity: string;
  sentError: string;
  bridgeEyebrow: string;
  bridgeTitle: string;
  bridgeSub: string;
  bridgeCta: string;
  whoEyebrow: string;
  whoTitle: string;
  whoBody: string;
  whoCreds: string[];
  proofEyebrow: string;
  proofTitle: string;
  proofSub: string;
  finalEyebrow: string;
  finalTitle: string;
  finalSub: string;
  finalCta: string;
};

const COPY: Record<"es" | "en", LocalizedCopy> = {
  es: {
    eyebrow: "RENACER · MOVIMIENTO",
    title1: "Naciste para",
    title2: "más.",
    sub: "Descarga RENACER y únete al Movimiento Unsinkable Minds. Tu próxima versión empieza con un correo.",
    formPlaceholder: "tu correo electrónico",
    formButton: "RECIBE RENACER GRATIS",
    formSending: "Enviando…",
    formTrust: "Una guía editorial · Sin spam · Solo Renacer.",
    sentTitle: "Tu RENACER está en camino.",
    sentSub: "Te llegará en los próximos minutos. Da el siguiente paso:",
    sentDownload: "Descargar RENACER ahora",
    sentCommunity: "Únete a la comunidad gratis",
    sentError: "Algo no salió bien. Inténtalo de nuevo en un momento.",
    bridgeEyebrow: "EL SIGUIENTE PASO",
    bridgeTitle: "Únete al Movimiento.",
    bridgeSub:
      "RENACER es la guía. El Movimiento Unsinkable Minds es la comunidad. Es gratis. Y es donde construimos juntos.",
    bridgeCta: "Únete gratis a la comunidad",
    whoEyebrow: "TU MENTORA",
    whoTitle: "Dr. Gissele Donovan",
    whoBody:
      "Líder transformacional colombiana. Doctora en Filosofía en Liderazgo Cristiano y Negocios. Decana de la Escuela de Liderazgo y Negocios en Cornerstone Christian University. Coach certificada en neurociencia. Co-Fundadora del Movimiento Unsinkable Minds junto a su esposo, el empresario Wally Donovan.",
    whoCreds: [
      "Galardonada con el Presidential Lifetime Achievement Award (2024)",
      "Honrada por el Senado de Puerto Rico con Moción y Medalla (2026)",
      "Reconocida entre las Top 20 Power Voices bajo Les Brown",
      "Co-autora del libro Mujeres Líderes Resilientes (2026)",
    ],
    proofEyebrow: "EL MOVIMIENTO",
    proofTitle: "Esta comunidad no se construye en silencio.",
    proofSub:
      "Líderes, emprendedores y visionarios reconstruyendo identidad, mente, cuerpo y espíritu. Hombres y mujeres que se rehúsan a vivir en la versión pequeña de sí mismos.",
    finalEyebrow: "EL LLAMADO",
    finalTitle: "Las mentes fuertes no se hunden.",
    finalSub:
      "Tu transformación no es accidente. Es decisión. Empieza hoy descargando RENACER y uniéndote a la comunidad gratuita.",
    finalCta: "Únete a la comunidad gratis",
  },
  en: {
    eyebrow: "RENACER · MOVEMENT",
    title1: "Born for",
    title2: "more.",
    sub: "Download RENACER and join the Unsinkable Minds Movement. Your next version begins with one email.",
    formPlaceholder: "your email address",
    formButton: "GET RENACER FREE",
    formSending: "Sending…",
    formTrust: "An editorial guide · No spam · Just Renacer.",
    sentTitle: "Your RENACER is on the way.",
    sentSub: "Check your inbox in the next few minutes. Take the next step:",
    sentDownload: "Download RENACER now",
    sentCommunity: "Join the free community",
    sentError: "Something went wrong. Please try again in a moment.",
    bridgeEyebrow: "THE NEXT STEP",
    bridgeTitle: "Join the Movement.",
    bridgeSub:
      "RENACER is the guide. The Unsinkable Minds Movement is the community. It's free. And it's where we build together.",
    bridgeCta: "Join the free community",
    whoEyebrow: "YOUR MENTOR",
    whoTitle: "Dr. Gissele Donovan",
    whoBody:
      "Colombian transformational leader. Doctor of Philosophy in Christian Leadership and Business. Dean of the School of Leadership and Business at Cornerstone Christian University. Certified neuroscience coach. Co-Founder of the Unsinkable Minds Movement alongside her husband, entrepreneur Wally Donovan.",
    whoCreds: [
      "Presidential Lifetime Achievement Award (2024)",
      "Senate of Puerto Rico Motion and Medal (2026)",
      "Top 20 Power Voices under Les Brown",
      "Co-author · Mujeres Líderes Resilientes (2026)",
    ],
    proofEyebrow: "THE MOVEMENT",
    proofTitle: "This community is not built in silence.",
    proofSub:
      "Leaders, entrepreneurs and visionaries rebuilding identity, mind, body, and spirit. Men and women who refuse to live in the smallest version of themselves.",
    finalEyebrow: "THE CALL",
    finalTitle: "Strong minds don't sink.",
    finalSub:
      "Your transformation is not an accident. It's a decision. Start today by downloading RENACER and joining the free community.",
    finalCta: "Join the free community",
  },
};

export default function MovimientoPage() {
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale === "en" ? "en" : "es") as "es" | "en";
  const t = COPY[locale];

  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    try {
      const res = await fetch(RENACER_FORM_ACTION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        setState("sent");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <main className="bg-ivory text-black overflow-x-clip">
      {/* ─── HERO con email capture ────────────────────────── */}
      <section className="relative pt-[120px] lg:pt-[130px] pb-14 lg:pb-20 overflow-hidden">
        {/* Soft beige radial */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 35% 45%, rgba(216,203,190,0.55) 0%, rgba(138,21,56,0.04) 55%, transparent 78%)",
          }}
        />

        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* LEFT · copy + form */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span aria-hidden className="block w-12 h-px bg-gold" />
                <span
                  className="eyebrow text-burgundy"
                  style={{ fontSize: "10px", letterSpacing: "0.34em" }}
                >
                  {t.eyebrow}
                </span>
              </div>

              <h1
                className="text-[clamp(46px,6.8vw,96px)] leading-[1.02] tracking-[-0.018em] font-light mb-8"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {t.title1}
                <br />
                <span
                  className="text-burgundy italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.title2}
                </span>
              </h1>

              <p className="text-lg lg:text-xl leading-relaxed text-black/70 font-light max-w-xl mb-10">
                {t.sub}
              </p>

              {state !== "sent" ? (
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-xl"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.formPlaceholder}
                    disabled={state === "sending"}
                    className="flex-1 bg-transparent border-b border-black/40 focus:border-burgundy outline-none py-3 text-base font-light placeholder:text-black/35 transition-colors disabled:opacity-50"
                    style={{ fontFamily: "var(--font-serif)" }}
                  />
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="bg-burgundy text-ivory px-7 py-4 rounded-full font-medium tracking-[0.18em] uppercase text-[12px] hover:bg-burgundy/90 transition-colors disabled:opacity-50 shrink-0"
                  >
                    {state === "sending" ? t.formSending : t.formButton}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl bg-burgundy text-ivory p-7 lg:p-9"
                >
                  <h3
                    className="text-2xl mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {t.sentTitle}
                  </h3>
                  <p className="text-ivory/85 mb-6 leading-relaxed">
                    {t.sentSub}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={RENACER_PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-gold text-burgundy px-6 py-3 rounded-full font-medium uppercase text-[11px] tracking-[0.2em] hover:bg-gold/90 transition-colors"
                    >
                      {t.sentDownload} →
                    </a>
                    <a
                      href={SKOOL_FREE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-ivory/60 text-ivory px-6 py-3 rounded-full font-medium uppercase text-[11px] tracking-[0.2em] hover:bg-ivory hover:text-burgundy transition-colors"
                    >
                      {t.sentCommunity} →
                    </a>
                  </div>
                </motion.div>
              )}

              {state !== "sent" && (
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-black/45">
                  {t.formTrust}
                </p>
              )}

              {state === "error" && (
                <p className="mt-3 text-sm text-burgundy">{t.sentError}</p>
              )}
            </motion.div>
          </div>

          {/* RIGHT · portrait */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="relative w-full max-w-[480px] aspect-[3/4] mx-auto">
              <div className="absolute inset-0 overflow-hidden bg-beige/40">
                <Image
                  src={HERO_PORTRAIT.src}
                  alt={HERO_PORTRAIT.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 90vw"
                  style={{
                    objectPosition: HERO_PORTRAIT.objectPosition ?? "50% 22%",
                  }}
                  className="object-cover [filter:contrast(1.05)_saturate(0.97)_brightness(1.01)]"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-3 border border-gold/45 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -inset-px border border-black/10 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BRIDGE · invitation to Skool community ─────────── */}
      <section className="bg-beige/40 border-t border-black/10 py-14 lg:py-18">
        <div className="mx-auto max-w-[900px] px-6 lg:px-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <span aria-hidden className="block w-8 h-px bg-gold" />
            <span
              className="eyebrow text-burgundy"
              style={{ fontSize: "10px", letterSpacing: "0.34em" }}
            >
              {t.bridgeEyebrow}
            </span>
            <span aria-hidden className="block w-8 h-px bg-gold" />
          </div>
          <h2
            className="text-[clamp(30px,3.8vw,52px)] font-light tracking-[-0.015em] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t.bridgeTitle}
          </h2>
          <p className="text-base lg:text-lg leading-relaxed text-black/70 font-light max-w-2xl mx-auto mb-10">
            {t.bridgeSub}
          </p>
          <a
            href={SKOOL_FREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-burgundy text-ivory px-9 py-4 rounded-full font-medium uppercase text-[12px] tracking-[0.22em] hover:bg-burgundy/90 transition-colors"
          >
            {t.bridgeCta} →
          </a>
        </div>
      </section>

      {/* ─── WHO IS DR. GISSELE ─────────────────────────────── */}
      <section className="bg-ivory py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-center">
          <div className="relative w-full max-w-[400px] mx-auto lg:mx-0 aspect-[3/4]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/media/portrait-becoming.jpg"
                alt="Dr. Gissele Donovan"
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                style={{ objectPosition: "50% 22%" }}
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute inset-3 border border-gold/45 pointer-events-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden className="block w-8 h-px bg-gold" />
              <span
                className="eyebrow text-burgundy"
                style={{ fontSize: "10px", letterSpacing: "0.34em" }}
              >
                {t.whoEyebrow}
              </span>
            </div>
            <h2
              className="text-[clamp(32px,4vw,52px)] font-light tracking-[-0.015em] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.whoTitle}
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-black/75 font-light mb-8">
              {t.whoBody}
            </p>
            <ul className="space-y-3">
              {t.whoCreds.map((cred, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 text-black/75 font-serif italic text-[15px]"
                >
                  <span
                    aria-hidden
                    className="block w-5 h-px bg-gold/70 shrink-0 mt-2.5"
                  />
                  {cred}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── MOVEMENT proof (community photo) ───────────────── */}
      <section className="bg-beige/30 py-14 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-3 mb-6">
              <span aria-hidden className="block w-8 h-px bg-gold" />
              <span
                className="eyebrow text-burgundy"
                style={{ fontSize: "10px", letterSpacing: "0.34em" }}
              >
                {t.proofEyebrow}
              </span>
              <span aria-hidden className="block w-8 h-px bg-gold" />
            </div>
            <h2
              className="text-[clamp(28px,3.6vw,48px)] font-light tracking-[-0.015em] leading-[1.12] mb-5 max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {t.proofTitle}
            </h2>
            <p className="text-base lg:text-lg leading-relaxed text-black/65 font-light max-w-2xl mx-auto">
              {t.proofSub}
            </p>
          </div>
          <figure className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={COMMUNITY_GROUP.src}
              alt={COMMUNITY_GROUP.alt}
              fill
              sizes="(min-width: 1024px) 1200px, 100vw"
              style={{
                objectPosition: COMMUNITY_GROUP.objectPosition ?? "50% 35%",
              }}
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-3 border border-gold/45 pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -inset-px border border-black/10 pointer-events-none"
            />
          </figure>
        </div>
      </section>

      {/* ─── FINAL CTA ──────────────────────────────────────── */}
      <section className="bg-black text-ivory py-16 lg:py-22 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(138,21,56,0.42) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-[900px] px-6 lg:px-12 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <span aria-hidden className="block w-8 h-px bg-gold" />
            <span
              className="eyebrow text-gold"
              style={{ fontSize: "10px", letterSpacing: "0.34em" }}
            >
              {t.finalEyebrow}
            </span>
            <span aria-hidden className="block w-8 h-px bg-gold" />
          </div>
          <h2
            className="text-[clamp(36px,5vw,68px)] font-light leading-[1.06] tracking-[-0.018em] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t.finalTitle}
          </h2>
          <p className="text-ivory/75 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            {t.finalSub}
          </p>
          <a
            href={SKOOL_FREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gold text-black hover:bg-gold/90 transition-colors duration-500 px-10 py-4 uppercase text-[12px] tracking-[0.22em] rounded-full font-medium"
          >
            {t.finalCta} →
          </a>

          {/* Closing monogram */}
          <div className="relative w-[80px] h-[80px] mx-auto mt-14 opacity-90">
            <Image
              src={LOGO_MONOGRAM_GOLD.src}
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
