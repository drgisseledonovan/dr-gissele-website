"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { LOGO_SIGNATURE } from "@/lib/media";
import type { Dictionary } from "@/lib/i18n";

/* Submissions go through our server-side /api/subscribe route which
   uses Kit's v3 Forms API. Same form ID as the hero capture so every
   subscriber lands in the same Kit list and gets RENACER instantly. */
const CONVERTKIT_ACTION = "/api/subscribe";

type NewsletterProps = {
  dict: Dictionary["newsletter"];
};

export function Newsletter({ dict }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    try {
      const res = await fetch(CONVERTKIT_ACTION, {
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
    <section
      id="newsletter"
      className="relative bg-ivory text-black py-14 lg:py-20 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(216,203,190,0.45) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Closing brand signature · the full gold script wordmark.
              The cinematic name treatment that anchors the homepage
              as a signed editorial piece. */}
          <div className="relative w-[420px] sm:w-[520px] max-w-full h-[160px] sm:h-[200px] mx-auto mb-10">
            <Image
              src={LOGO_SIGNATURE.src}
              alt={LOGO_SIGNATURE.alt}
              fill
              sizes="(min-width: 640px) 520px, 420px"
              className="object-contain"
            />
          </div>

          <div className="eyebrow rules text-burgundy mb-10 inline-flex">
            {dict.eyebrow}
          </div>

          <h2
            className="text-[clamp(40px,6vw,84px)] leading-[1.05] tracking-tight text-black font-light mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {dict.titleLead}
          </h2>
          <h2
            className="text-[clamp(46px,7vw,96px)] leading-[1] text-burgundy mb-10"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {dict.titleScript}
          </h2>

          <div className="h-px w-12 bg-gold/60 mx-auto mb-10" />

          <p className="text-lg leading-relaxed text-black/65 font-light max-w-xl mx-auto mb-14">
            {dict.description}
          </p>

          {state === "sent" ? (
            <p className="font-serif italic text-xl text-burgundy">
              {dict.sentMessage}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {dict.emailLabel}
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email_address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.emailPlaceholder}
                className="flex-1 bg-transparent border-b border-black/30 focus:border-burgundy focus:outline-none py-4 px-2 text-black placeholder:text-black/40 text-base"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="border border-burgundy text-burgundy hover:bg-burgundy hover:text-ivory transition-colors duration-500 px-10 py-4 eyebrow disabled:opacity-50"
              >
                {state === "sending" ? dict.submitting : dict.submit}
              </button>
            </form>
          )}

          {state === "error" && (
            <p className="eyebrow text-burgundy mt-6">{dict.errorMessage}</p>
          )}

          <p
            className="eyebrow text-black/40 mt-12"
            style={{ letterSpacing: "0.32em" }}
          >
            {dict.quiet}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
