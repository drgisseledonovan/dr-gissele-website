"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { HERO_PORTRAIT, LOGO_MONOGRAM_GOLD } from "@/lib/media";
import { MonogramSeal } from "@/components/monogram-seal";
import { type Dictionary, type Locale } from "@/lib/i18n";

/* ─── Sticky RENACER CTA banner ────────────────────────────────────────
   Visible at every breakpoint (mobile AND desktop). Sits at the very
   top of the page above the nav and stays put while the visitor
   scrolls. The whole bar is the tap target.

   Loud + luxury at the same time: burgundy backdrop, two-line copy
   (gold eyebrow + ivory serif italic sub-line), and a bright gold pill
   button with a soft pulse so the eye lands on it the moment the page
   loads. Anchors to #newsletter so a tap scrolls straight to the
   editorial RENACER capture. Padding and type sizes scale up at
   lg+ so the bar feels balanced on wide screens. */
function StickyRenacerBar({
  label,
  cta,
}: {
  label: string;
  cta: string;
}) {
  return (
    <a
      href="#newsletter"
      className="fixed top-0 inset-x-0 z-[60] bg-burgundy text-ivory shadow-[0_4px_24px_rgba(11,11,11,0.28)] flex items-center justify-between gap-3 lg:gap-6 pl-5 lg:pl-12 pr-3 lg:pr-10 py-3 lg:py-3.5"
      aria-label={`${label} — ${cta}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-baseline lg:gap-5 gap-0.5 flex-1 min-w-0">
        <span
          className="eyebrow text-gold truncate"
          style={{ fontSize: "9px", letterSpacing: "0.28em" }}
        >
          {label}
        </span>
        <span
          className="font-serif italic text-ivory text-[13px] lg:text-[15px] leading-tight truncate"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Descarga tu guía editorial.
        </span>
      </div>

      <motion.span
        className="inline-flex items-center gap-1.5 lg:gap-2 bg-gold text-burgundy px-4 lg:px-6 py-2.5 lg:py-3 rounded-full font-medium shrink-0 shadow-[0_3px_12px_rgba(198,161,91,0.45)]"
        style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {cta}
        <span aria-hidden className="text-[13px] lg:text-[15px]">→</span>
      </motion.span>
    </a>
  );
}

/* Submissions go through our server-side /api/subscribe route,
   which calls Kit's documented v3 Forms API. Auto-confirm is
   enabled on Form ID 672196ab87 so the Incentive Email (with the
   RENACER PDF link) is delivered to the subscriber immediately. */
const RENACER_FORM_ACTION = "/api/subscribe";

/* ─── HERO PORTRAIT ─────────────────────────────────────────────────
   Image, crop, and alt all defined in src/lib/media.ts.
   ─────────────────────────────────────────────────────────────────── */

type HeroProps = {
  locale: Locale;
  dict: Dictionary["hero"];
};

export function Hero({ dict }: HeroProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmitRenacer(e: React.FormEvent<HTMLFormElement>) {
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
        setEmail("");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="relative w-full bg-ivory text-black overflow-x-clip grid grid-cols-1 lg:grid-cols-[58%_42%] pt-[152px] lg:pt-[160px] min-h-screen">
      {/* Sticky RENACER CTA bar · top of viewport, above the nav.
          Visible on every breakpoint so the lead-magnet invitation is
          always one tap away, just like Jamie Kern Lima's "Access Now"
          banner that lives on every page. */}
      <StickyRenacerBar
        label={dict.renacerStickyLabel}
        cta={dict.renacerStickyCTA}
      />

      {/* ─── Left: editorial copy ────────────────────────────────── */}
      <div className="relative flex flex-col justify-center min-w-0 px-6 sm:px-10 lg:px-14 xl:px-20 py-10 lg:py-24">
        {/* Luxury brand seal — crowned GD monogram + gold hairline */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-9"
        >
          <MonogramSeal align="left" size="md" />
        </motion.div>

        <motion.div
          className="eyebrow rules left text-burgundy mb-12"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          {dict.eyebrow}
        </motion.div>

        <h1
          className="leading-[1.06] mb-2"
          style={{
            maxWidth: "920px",
            whiteSpace: "normal",
            overflowWrap: "break-word",
            wordBreak: "normal",
          }}
        >
          {/* Line 1 — serif */}
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block text-[clamp(36px,4.6vw,68px)] font-light tracking-[-0.018em]"
              style={{
                fontFamily: "var(--font-serif)",
                whiteSpace: "normal",
              }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {dict.line1}
            </motion.span>
          </span>

          {/* Line 2 — script + serif italic */}
          <span className="block overflow-hidden pb-2 leading-[1.12]">
            <motion.span
              className="block"
              style={{ whiteSpace: "normal" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.0, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="text-burgundy text-[clamp(44px,5.4vw,80px)] align-baseline"
                style={{ fontFamily: "var(--font-script)", lineHeight: 1 }}
              >
                {dict.line2Script}
              </span>
              {" "}
              <span
                className="italic font-light tracking-[-0.018em] align-baseline text-[clamp(36px,4.6vw,68px)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {dict.line2Serif}
              </span>
            </motion.span>
          </span>
        </h1>

        {/* ─── Mobile-only cinematic portrait ──────────────────────
            On mobile Dr. Gissele wanted the visual hook to land
            immediately, the way Mario Alonso Puig and Codie Sanchez
            anchor their pages with a dominant photo. This block is
            hidden on lg+ where the side portrait already plays that
            role. Frame: gold inset · soft burgundy glow · gradient
            base for legibility · cinematic caption. */}
        <motion.div
          className="lg:hidden mt-10 -mx-6 sm:-mx-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-beige/40">
            <Image
              src={HERO_PORTRAIT.src}
              alt={HERO_PORTRAIT.alt}
              fill
              priority
              sizes="100vw"
              style={{ objectPosition: HERO_PORTRAIT.objectPosition ?? "50% 30%" }}
              className="object-cover [filter:contrast(1.05)_saturate(0.96)_brightness(1.01)]"
            />
            {/* Cinematic gradient base · keeps the caption readable */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,11,0) 55%, rgba(11,11,11,0.55) 100%)",
              }}
            />
            {/* Gold inset border · the brand frame */}
            <div
              aria-hidden
              className="absolute inset-3 border border-gold/55 pointer-events-none"
            />
            {/* Editorial caption · bottom-right, ivory italic */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-ivory/90 pointer-events-none">
              <span className="font-serif italic text-[13px] leading-tight">
                {dict.mobilePortraitCaption}
              </span>
              <span
                className="eyebrow text-gold"
                style={{ fontSize: "9px", letterSpacing: "0.32em" }}
              >
                {dict.captionLocation}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── Mobile-only BIG primary CTA ──────────────────────────
            Right after the photo. Filled gold pill so it's impossible
            to miss · the Jamie Kern Lima "Access Now" energy in
            Dr. Gissele's brand language. Anchors to the RENACER form
            beneath so a tap scrolls the visitor straight into the
            capture flow. */}
        <motion.a
          href="#newsletter"
          className="lg:hidden group/cta mt-8 relative inline-flex items-center justify-center gap-3 w-full bg-burgundy text-ivory hover:bg-black transition-colors duration-500 py-5 px-6 eyebrow"
          style={{ letterSpacing: "0.22em", fontSize: "12px" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span aria-hidden className="block w-6 h-px bg-gold" />
          <span className="relative z-10">{dict.renacerStickyCTA}  ·  RENACER™</span>
          <span
            aria-hidden
            className="inline-block transition-transform duration-500 ease-out group-hover/cta:translate-x-1.5"
          >
            →
          </span>
        </motion.a>

        <motion.p
          className="mt-12 max-w-lg text-[15.5px] sm:text-[16px] leading-[1.7] lg:leading-[1.85] text-black/65 font-light line-clamp-4 lg:line-clamp-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {dict.lede}
        </motion.p>

        {/* ─── RENACER™ · hero-integrated lead capture ─────────────
            Cinematic single primary action. Designed as an editorial
            moment within the hero — a curated invitation, not a form.
            Each piece reveals on a stagger; the input has a gold
            underline that draws on focus; the button reveals an arrow
            on hover; the sent state fades in with a gold ornament.
            ──────────────────────────────────────────────────────── */}
        <motion.div
          className="mt-16 max-w-xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 1.85 } },
          }}
        >
          {/* Eyebrow row · gold hairline + RENACER™ label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <motion.span
              aria-hidden
              className="block h-px bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.95, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "44px" }}
            />
            <span
              className="eyebrow text-burgundy"
              style={{ fontSize: "10px", letterSpacing: "0.34em" }}
            >
              {dict.renacerEyebrow}
            </span>
          </motion.div>

          {/* Sub-lede — the emotional promise (serif italic) */}
          <motion.p
            className="font-serif italic text-[17px] sm:text-[18px] lg:text-[19px] leading-[1.55] text-black/80 mb-9 max-w-lg"
            style={{ fontFamily: "var(--font-serif)" }}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {dict.renacerLede}
          </motion.p>

          {/* Form (idle/sending/error) — or — Sent state */}
          {state === "sent" ? (
            <motion.div
              className="max-w-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span aria-hidden className="block w-8 h-px bg-gold" />
                <span
                  className="eyebrow text-gold"
                  style={{ fontSize: "9.5px", letterSpacing: "0.34em" }}
                >
                  Recibido
                </span>
                <span aria-hidden className="block w-8 h-px bg-gold" />
              </div>
              <p
                className="font-serif italic text-[18px] sm:text-[19px] leading-[1.55] text-burgundy"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {dict.renacerSent}
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={onSubmitRenacer}
              className="flex flex-col sm:flex-row gap-4 sm:gap-3 max-w-lg"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <label htmlFor="hero-renacer-email" className="sr-only">
                {dict.renacerEmailLabel}
              </label>

              {/* Email input — underline-only with animated gold underline on focus */}
              <div className="relative flex-1">
                <input
                  id="hero-renacer-email"
                  type="email"
                  name="email_address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.renacerEmailPlaceholder}
                  autoComplete="email"
                  className="peer w-full bg-transparent border-b border-black/25 focus:outline-none py-4 px-1 text-black placeholder:text-black/40 text-[15px]"
                />
                {/* Gold underline that draws on focus */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 bottom-0 h-[1.5px] bg-gold origin-left scale-x-0 transition-transform duration-500 ease-out peer-focus:scale-x-100"
                />
              </div>

              {/* Submit button — burgundy outline · arrow slides on hover */}
              <button
                type="submit"
                disabled={state === "sending"}
                className="group/btn relative inline-flex items-center justify-center gap-3 border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory transition-all duration-500 ease-out px-7 sm:px-9 py-4 eyebrow disabled:opacity-50 whitespace-nowrap overflow-hidden"
                style={{ letterSpacing: "0.24em" }}
              >
                <span className="relative z-10">
                  {state === "sending" ? dict.renacerSubmitting : dict.renacerSubmit}
                </span>
                <span
                  aria-hidden
                  className="relative z-10 inline-block transition-transform duration-500 ease-out group-hover/btn:translate-x-1.5"
                >
                  →
                </span>
              </button>
            </motion.form>
          )}

          {state === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="eyebrow text-burgundy mt-4"
              style={{ fontSize: "10px", letterSpacing: "0.28em" }}
            >
              {dict.renacerError}
            </motion.p>
          )}

          {/* Trust line · luxury micro-promise */}
          <motion.p
            className="eyebrow text-black/45 mt-8"
            style={{ fontSize: "9.5px", letterSpacing: "0.36em" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
            }}
          >
            {dict.renacerTrust}
          </motion.p>
        </motion.div>

        {/* Credentials · authority strip · enters after RENACER block */}
        <motion.ul
          className="mt-20 pt-8 border-t border-black/10 flex flex-col gap-3 text-black/70 max-w-md"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.14, delayChildren: 2.85 },
            },
          }}
        >
          {[dict.credentialPhd, dict.credentialTraining, dict.credentialFounder].map((c) => (
            <motion.li
              key={c}
              className="flex items-center gap-4 font-serif text-[15px] italic"
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <span aria-hidden className="block w-6 h-px bg-gold/75 shrink-0" />
              {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* ─── Right: portrait ────────────────────────────────────── */}
      <motion.div
        className="relative hidden lg:flex items-center justify-center min-w-0 px-8 lg:px-12 xl:px-16 py-16 lg:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3 }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 58% 48%, rgba(216,203,190,0.55) 0%, rgba(138,21,56,0.05) 55%, transparent 78%)",
          }}
        />

        {/* Oversized crowned-GD monogram watermark · ambient brand presence.
            Uses the transparent gold version so the ivory background bleeds
            naturally through the negative space of the mark. */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.13]"
        >
          <div className="relative w-[105%] aspect-square">
            <Image
              src={LOGO_MONOGRAM_GOLD.src}
              alt=""
              fill
              sizes="700px"
              className="object-contain"
            />
          </div>
        </div>

        <motion.div
          aria-hidden
          className="absolute top-12 left-12 hidden xl:flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.8 }}
        >
          <span
            className="eyebrow text-black/35"
            style={{ fontSize: "9.5px", letterSpacing: "0.4em" }}
          >
            {dict.captionVolume}
          </span>
          <span className="block w-6 h-px bg-gold/60" />
        </motion.div>

        <div className="relative w-full max-w-[500px] aspect-[3/4]">
          <div
            aria-hidden
            className="absolute -inset-2 -z-10 blur-2xl"
            style={{
              background:
                "linear-gradient(160deg, rgba(138,21,56,0.10) 0%, rgba(11,11,11,0.18) 100%)",
            }}
          />
          <div className="absolute inset-0 overflow-hidden bg-beige/40">
            <Image
              src={HERO_PORTRAIT.src}
              alt={HERO_PORTRAIT.alt}
              fill
              priority
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 100vw"
              style={{ objectPosition: HERO_PORTRAIT.objectPosition ?? "50% 30%" }}
              className="object-cover [filter:contrast(1.05)_saturate(0.96)_brightness(1.01)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,11,11,0) 60%, rgba(11,11,11,0.28) 100%)",
              }}
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
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-ivory/85 pointer-events-none">
            <span className="font-serif italic text-[13px] leading-tight">
              Dr. Gissele Donovan
            </span>
            <span
              className="eyebrow text-ivory/70"
              style={{ fontSize: "9px", letterSpacing: "0.32em" }}
            >
              {dict.captionLocation}
            </span>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 text-center">
          <span
            className="eyebrow text-black/40"
            style={{ fontSize: "9.5px", letterSpacing: "0.42em" }}
          >
            {/* Same tagline as Nav */}
            {dict.eyebrow}
          </span>
        </div>
      </motion.div>

      {/* ─── Bottom global-reach strip ─────────────────────────── */}
      <motion.div
        className="lg:col-span-2 relative z-10 border-t border-black/10 bg-ivory/40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-14 xl:px-20 py-6 lg:py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <span
            className="eyebrow text-black/45"
            style={{ fontSize: "10px", letterSpacing: "0.36em" }}
          >
            {dict.reachLabel}
          </span>
          <ul className="flex items-center gap-8 sm:gap-12">
            {dict.reach.map((r) => (
              <li
                key={r.label}
                className="flex items-baseline gap-2 sm:gap-3 text-black/80"
              >
                <span
                  className="text-[20px] sm:text-[22px] font-light text-burgundy leading-none"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {r.figure}
                </span>
                <span
                  className="eyebrow text-black/55"
                  style={{ fontSize: "9.5px", letterSpacing: "0.28em" }}
                >
                  {r.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.6 }}
      >
        <span
          className="eyebrow text-black/40"
          style={{ fontSize: "9px", letterSpacing: "0.3em" }}
        >
          {dict.scrollLabel}
        </span>
        <motion.span
          className="block w-px h-10 bg-black/30 origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
