"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { FOUNDERS_COUPLE } from "@/lib/media";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

type MovementProps = {
  locale: Locale;
  dict: Dictionary["movement"];
};

export function Movement({ locale, dict }: MovementProps) {
  return (
    <section className="relative bg-beige text-black overflow-hidden py-20 lg:py-24">
      {/* Faint neural-pathway line art behind everything */}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="neural-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#8A1538" />
          </linearGradient>
        </defs>
        {[
          "M 0 400 Q 350 100 700 400 T 1400 400",
          "M 0 300 Q 400 600 800 300 T 1600 300",
          "M -200 500 Q 200 200 600 500 T 1400 500",
          "M 200 700 Q 600 300 1000 700 T 1800 700",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="url(#neural-light)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* ─── Top: centered movement masthead ─────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow rules text-burgundy mb-12 inline-flex">
            {dict.eyebrow}
          </div>

          <h2
            className="text-[clamp(44px,8vw,108px)] leading-[0.95] tracking-tight text-black font-light mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {dict.titleSerif}
          </h2>
          <h2
            className="text-[clamp(50px,9vw,124px)] leading-[0.95] text-burgundy mb-14"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {dict.titleScript}
          </h2>

          <div className="h-px w-16 bg-gold/60 mx-auto mb-12" />

          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl leading-[1.45] text-black/75 max-w-3xl mx-auto mb-8">
            {dict.lede}
          </p>

          <p className="eyebrow text-black/45">{dict.subline}</p>
        </motion.div>

        {/* ─── Founders: photo + attribution ────────────────────── */}
        <motion.div
          className="mt-24 lg:mt-32 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center max-w-[1100px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Photo */}
          <figure className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={FOUNDERS_COUPLE.src}
              alt={FOUNDERS_COUPLE.alt}
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              style={{
                objectPosition: FOUNDERS_COUPLE.objectPosition ?? "50% 35%",
              }}
              className="object-cover [filter:contrast(1.04)_saturate(0.98)]"
            />
            <div
              aria-hidden
              className="absolute inset-3 border border-gold/40 pointer-events-none"
            />
            <div
              aria-hidden
              className="absolute -inset-px border border-black/15 pointer-events-none"
            />
            <figcaption className="absolute bottom-5 left-5 right-5">
              <span
                className="eyebrow text-ivory/85"
                style={{ fontSize: "9px", letterSpacing: "0.28em" }}
              >
                {dict.foundersPhotoCaption}
              </span>
            </figcaption>
          </figure>

          {/* Attribution */}
          <div className="flex flex-col">
            {/* Gold ornament */}
            <div className="flex items-center gap-3 text-gold mb-6">
              <span className="block w-10 h-px bg-current opacity-70" />
              <span className="block w-1 h-1 rounded-full bg-current" />
              <span className="block w-10 h-px bg-current opacity-70" />
            </div>

            <div
              className="eyebrow text-burgundy mb-5"
              style={{ fontSize: "10px", letterSpacing: "0.34em" }}
            >
              {dict.foundersLabel}
            </div>

            <h3
              className="text-[clamp(28px,3.4vw,46px)] font-light tracking-[-0.015em] leading-[1.15] text-black mb-7"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {dict.foundersNames}
            </h3>

            <p className="font-serif italic text-[17px] lg:text-lg text-black/70 leading-[1.65] max-w-md mb-10">
              {dict.foundersTagline}
            </p>

            <Link
              href={localePath(locale, "/unsinkable-minds")}
              className="cta-line text-burgundy"
            >
              {dict.cta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
