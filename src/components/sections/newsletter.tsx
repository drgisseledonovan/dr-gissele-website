"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { LOGO_SIGNATURE } from "@/lib/media";
import type { Dictionary } from "@/lib/i18n";

/* Kit form endpoint for the closing Newsletter capture. Same Form
   ID as the hero so every subscriber lands in the same Kit list,
   gets RENACER instantly, and enters the nurture sequence.
   Submitted via a hidden-iframe form post (see onSubmit below). */
const CONVERTKIT_ACTION =
  "https://app.kit.com/forms/672196ab87/subscriptions";

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

    /* Hidden-iframe form post to Kit · same technique as the hero
       capture. Real browser form submission, response lands inside
       a hidden iframe so the visitor stays on the page. */
    try {
      const iframeName = `kit-frame-${Date.now()}`;
      const iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const f = document.createElement("form");
      f.action = CONVERTKIT_ACTION;
      f.method = "POST";
      f.target = iframeName;
      f.style.display = "none";

      const i = document.createElement("input");
      i.type = "hidden";
      i.name = "email_address";
      i.value = email;
      f.appendChild(i);

      document.body.appendChild(f);
      f.submit();

      setState("sent");
      setEmail("");

      setTimeout(() => f.remove(), 1500);
      setTimeout(() => iframe.remove(), 10000);
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="newsletter"
      className="relative bg-ivory text-black py-20 lg:py-28 overflow-hidden"
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
          <div className="relative w-[260px] sm:w-[300px] h-[100px] sm:h-[110px] mx-auto mb-10">
            <Image
              src={LOGO_SIGNATURE.src}
              alt={LOGO_SIGNATURE.alt}
              fill
              sizes="(min-width: 640px) 300px, 260px"
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
