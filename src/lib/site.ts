/* ──────────────────────────────────────────────────────────────────
   SITE CONFIG — single source of truth for editable links & copy.

   This file is intentionally simple. Most long-term maintenance
   happens here: paste a Calendly / Tally / Stan Store URL into the
   matching constant, save, and every CTA across the site updates.

   No env vars, no CMS, no build steps required.
   ────────────────────────────────────────────────────────────────── */

export const SITE = {
  /** Public production origin. Used for canonical URLs and OG. */
  url: "https://drgisseledonovan.com",
  /** Brand owner. */
  name: "Dr. Gissele Donovan",
  /** Editorial tagline. */
  tagline: "Transforming Minds · Elevating Destinies",
  /** Public contact email. */
  email: "contact@drgisseledonovan.com",
  /** Press / media contact — Dr. Gissele uses a single inbox for
      both general and press inquiries (no separate press@ mailbox). */
  pressEmail: "contact@drgisseledonovan.com",
} as const;

/* ─── BIOS ───────────────────────────────────────────────────
   Used by /press in three lengths so journalists can copy the
   one that fits their format. Edit here, both kit and page update.
   ─────────────────────────────────────────────────────────── */

export const BIOS = {
  oneLine:
    "Dr. Gissele Donovan is a Colombian-born international transformational leader, neuroscience-based coach, doctoral scholar, Dean of the School of Leadership and Business at Cornerstone Christian University, author, entrepreneur, and co-founder of the Unsinkable Minds Movement.",
  short:
    "Dr. Gissele Donovan is a Colombian-born international transformational leader, neuroscience-based coach, and co-founder of the Unsinkable Minds Movement. She holds a Doctor of Philosophy in Christian Leadership and Business and serves as Dean of the School of Leadership and Business at Cornerstone Christian University. A Certified Neuroscience Coach with public speaking training under Les Brown (recognized among the Top 20 Power Voices), and high-performance mentorship through the Proctor Gallagher Institute, she is the recipient of the Lifetime Achievement Award, The Compassion Award, and a Motion of Congratulations and Medal from the Senate of Puerto Rico.",
  long: [
    "Dr. Gissele Donovan is an international transformational leader, neuroscience-based coach, doctoral scholar, entrepreneur, author, and co-founder of the Unsinkable Minds Movement. Colombian-born and shaped by both dysfunction and strong values, she built her life across two countries, two languages, and multiple disciplines: from chemical engineering to academic leadership, from entrepreneurship to identity transformation.",
    "She holds an Associate Degree in Chemical Engineering from Miami Dade College, a Bachelor's in Christian Leadership and Business, a Master of Science in Christian Psychology, and a Doctor of Philosophy in Christian Leadership and Business; the last three conferred by Cornerstone Christian University, where she now serves as Dean of the School of Leadership and Business. She is a Certified Neuroscience Coach, a Certified Public Speaker trained under Les Brown (recognized among the Top 20 Power Voices out of more than 5,000 participants), and a graduate of the Proctor Gallagher Institute's Thinking Into Results program.",
    "Dr. Donovan is the recipient of the Lifetime Achievement Award (2024) and The Compassion Award, presented by Believe In Your Dreams TV. In 2026, the Senate of Puerto Rico honored her with a Motion of Congratulations and Medal. That same year, she became a published co-author of the anthology Mujeres Líderes Resilientes, contributing Chapter 9 alongside eleven women on resilience, leadership, and transformation.",
    "Alongside her husband Wally Donovan, she co-founded the Unsinkable Minds Movement and Donovan Smart Home Technology, a multi-service company twice named East Region Champions and recognized in the 2025 Latin Business Awards. Today she leads identity-transformation work through the Despierta Tu Poder Experience, convening people across two languages and three continents in the rebuilding of the mind, the body, and the spirit. Her keynotes have reached boardrooms, conferences, universities, and faith communities throughout the United States, Puerto Rico, and Latin America.",
  ],
} as const;

/* ─── PRESS ASSETS ───────────────────────────────────────────
   Direct download links for the media kit. Files live in
   /public/media/. To add a new asset, drop the file into that
   folder and add an entry here.
   ─────────────────────────────────────────────────────────── */

export type PressAsset = {
  label: string;
  href: string;
  kind: "Photograph" | "Logo" | "Document";
  /** Optional note shown beneath the asset name. */
  note?: string;
};

export const PRESS_ASSETS: PressAsset[] = [
  {
    label: "Portrait  ·  Leader (June 2026)",
    href: "/media/portrait-leader.jpg",
    kind: "Photograph",
    note: "3308 × 4962 · JPG · Editorial Hero",
  },
  {
    label: "Portrait  ·  Becoming (June 2026)",
    href: "/media/portrait-becoming.jpg",
    kind: "Photograph",
    note: "3265 × 4898 · JPG · Authority",
  },
  {
    label: "Portrait  ·  Crown + Smile (June 2026)",
    href: "/media/portrait-crown-smile.jpg",
    kind: "Photograph",
    note: "5012 × 6662 · JPG · Recognition",
  },
  {
    label: "On Stage  ·  Unsinkable Minds",
    href: "/media/speaking-stage.jpg",
    kind: "Photograph",
    note: "3960 × 2640 · JPG",
  },
  {
    label: "Doctoral Ceremony",
    href: "/media/recognition-phd.jpg",
    kind: "Photograph",
    note: "1600 × 1066 · JPG",
  },
  {
    label: "Wordmark  ·  Full",
    href: "/media/logo-wordmark.png",
    kind: "Logo",
    note: "1536 × 1024 · PNG",
  },
  {
    label: "Monogram  ·  Crowned GD (Light)",
    href: "/media/logo-monogram.png",
    kind: "Logo",
    note: "1536 × 1024 · PNG · for light backgrounds",
  },
  {
    label: "Monogram  ·  Crowned GD (Dark)",
    href: "/media/logo-monogram-dark.png",
    kind: "Logo",
    note: "1536 × 1024 · PNG · for dark backgrounds",
  },
];

/* ─── OPTIONAL FORM ENDPOINT ─────────────────────────────────
   The /contact page works fully without any form processor —
   inquiry buttons open prefilled mailto: links. When you're
   ready to add a hosted form (Formspree, Web3Forms, Tally),
   paste the endpoint URL below and the contact form will POST
   to it. Leave empty to keep using mailto: only.
   ─────────────────────────────────────────────────────────── */

export const FORM_ENDPOINT: string = ""; // e.g. "https://formspree.io/f/your-id"

/** Your public Stan Store handle. Edit once; the URLs below
    inherit it. Replace with your real handle from stan.store. */
export const STAN_HANDLE = "drgisseledonovan";

/** Base storefront URL. */
export const STAN_STORE_URL = `https://stan.store/${STAN_HANDLE}`;

/* ─── CTA URLs — STAN-STORE-READY ─────────────────────────────
   Every button on the site routes through this object.
   The user journey is:

     Website → Discovery (/programs)
                  ├── Application (Despierta cohort)
                  ├── Stan Store (digital products)
                  └── Booking (private mentorship / speaking)

   To go live, replace the bracketed product slugs with the
   real ones from your Stan Store dashboard. The <CTA> wrapper
   auto-detects external URLs and opens them in a new tab.

   Example slugs once products exist:
     https://stan.store/drgisseledonovan/p/despierta-application
     https://stan.store/drgisseledonovan/p/discovery-call
     https://stan.store/drgisseledonovan
   ─────────────────────────────────────────────────────────── */

export const LINKS = {
  /** Discovery / consult booking — 1:1 mentorship intake. */
  booking: `${STAN_STORE_URL}/p/discovery-call`,

  /** Storefront — Stan Store, now exclusively for the digital
      Library (ebooks) and the 1:1 mentorship intake. The Despierta
      Tu Poder program lives on Skool — link via MOVEMENT_COMMUNITY
      (free tier) or the /despierta sales page for the paid tiers. */
  stanStore: STAN_STORE_URL,

  /** Speaking inquiry — anchors visitor into /speaking. */
  speakingInquiry: "/speaking#inquire",

  /** Newsletter signup (the actual form lives in the Newsletter
      component; this link drops visitors at it). */
  newsletter: "/#newsletter",
} as const;

/** The free Skool community — the public-facing home of the
    Unsinkable Minds Movement. Visitors join for free; the paid
    tiers (Despierta Tu Poder, Expansión) live inside the same
    Skool community as an upgrade path. */
export const MOVEMENT_COMMUNITY = "https://www.skool.com/unsinkableminds";

/* ─── DIGITAL PRODUCTS ───────────────────────────────────────
   Featured products shown on the /programs Digital Products
   row. Each entry maps to a Stan Store product page.
   To add a product: drop a new entry below. To hide one from
   the featured row, set `featured: false`.
   ─────────────────────────────────────────────────────────── */

export type DigitalProduct = {
  /** Stan Store product slug (the bit after /p/). */
  slug: string;
  /** Display name. */
  name: string;
  /** Editorial pillar tag, e.g. "Masterclass". */
  category: string;
  /** One-to-two sentence positioning. */
  description: string;
  /** Optional price label, e.g. "$97" or "From $47". */
  price?: string;
  /** Set to false to hide from the featured row. */
  featured?: boolean;
};

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    slug: "neuroscience-of-becoming",
    name: "The Neuroscience of Becoming",
    category: "Masterclass",
    description:
      "A self-paced masterclass on identity transformation: the foundational vocabulary of the work.",
    price: "$97",
    featured: true,
  },
  {
    slug: "unsinkable-minds-meditations",
    name: "Unsinkable Minds Meditations",
    category: "Audio Library",
    description:
      "Guided meditations for nervous-system regulation and emotional mastery.",
    price: "$47",
    featured: true,
  },
  {
    slug: "leadership-from-the-inside-out",
    name: "Leadership From the Inside Out",
    category: "Workbook",
    description:
      "A printable workbook for leaders rebuilding authority from self-mastery.",
    price: "$29",
    featured: true,
  },
];

/** Featured products, in registry order. */
export const FEATURED_PRODUCTS: DigitalProduct[] = DIGITAL_PRODUCTS.filter(
  (p) => p.featured !== false
);

/** Build a Stan Store product URL from a slug. */
export function stanProductUrl(slug: string): string {
  return `${STAN_STORE_URL}/p/${slug}`;
}

/* ─── SOCIAL ─────────────────────────────────────────────────── */

/* Dr. Gissele's personal social handles (@gisseledonovan). */
export const SOCIAL = {
  instagram: "https://instagram.com/gisseledonovan",
  tiktok: "https://www.tiktok.com/@gisseledonovan",
  youtube: "https://www.youtube.com/@gisseledonovan",
  linkedin: "https://www.linkedin.com/in/gisseledonovan",
  facebook: "https://www.facebook.com/DrGisseleDonovan",
} as const;

/* Unsinkable Minds Movement social handles (@unsinkableminds). */
export const MOVEMENT_SOCIAL = {
  instagram: "https://instagram.com/unsinkableminds",
  tiktok: "https://www.tiktok.com/@unsinkableminds",
  youtube: "https://www.youtube.com/@unsinkableminds",
  facebook: "https://www.facebook.com/unsinkableminds",
  /** WhatsApp Channel — broadcast-only, the movement's voice
      delivered to the pocket of Latin American audiences. The
      third layer of the architecture: Skool free community +
      WhatsApp Channel (broadcast) + Skool paid tiers. */
  whatsapp: "https://whatsapp.com/channel/0029VbCVRaILSmbdGxhPee1g",
} as const;

export const MOVEMENT_HANDLE = "@unsinkableminds";

/** Podcast — lives on the Unsinkable Minds YouTube channel. */
export const PODCAST_URL = MOVEMENT_SOCIAL.youtube;
export const PODCAST_HANDLE = MOVEMENT_HANDLE;

/* ─── CREDENTIALS ────────────────────────────────────────────
   The four real recognitions that anchor authority across the
   site (Hero, About, Speaking, Footer). Edit here and they update
   everywhere they're referenced.
   ─────────────────────────────────────────────────────────── */

export type Credential = {
  /** Short form — for credential lists. */
  short: string;
  /** Long form — for plaques and bio prose. */
  long: string;
  /** Conferring body. */
  bestowedBy?: string;
  /** Year conferred (or null for ongoing roles like Founder). */
  year?: string;
};

export const CREDENTIALS = {
  // ─── Academic ─────────────────────────────────────────────
  phd: {
    short: "PhD · Christian Leadership & Business",
    long: "Doctor of Philosophy in Christian Leadership and Business",
    bestowedBy: "Cornerstone Christian University",
    year: "2025",
  },
  master: {
    short: "MS · Christian Psychology",
    long: "Master of Science in Christian Psychology",
    bestowedBy: "Cornerstone Christian University",
    year: "2025",
  },
  bachelor: {
    short: "BA · Christian Leadership & Business",
    long: "Bachelor of Arts in Christian Leadership and Business",
    bestowedBy: "Cornerstone Christian University",
    year: "2022",
  },
  associate: {
    short: "Associate · Chemical Engineering",
    long: "Associate Degree in Chemical Engineering",
    bestowedBy: "Miami Dade College",
    year: "2014",
  },

  // ─── Faculty / Academic Role ──────────────────────────────
  dean: {
    short: "Dean · School of Leadership & Business",
    long: "Dean of the School of Leadership and Business",
    bestowedBy: "Cornerstone Christian University",
  },

  // ─── Certifications & mentorship lineage ──────────────────
  neuroscience: {
    short: "Certified Neuroscience Coach",
    long: "Certified Neuroscience Coach",
    year: "2025",
  },
  lesBrown: {
    short: "Certified Public Speaker · Les Brown (Top 20 Power Voices)",
    long: "Certified Public Speaker  ·  Les Brown Program  ·  Top 20 Power Voices out of 5,000+ participants",
    year: "2021",
  },
  proctor: {
    short: "Thinking Into Results · Proctor Gallagher Institute",
    long: "Thinking Into Results  ·  Proctor Gallagher Institute",
  },

  // ─── Honors ───────────────────────────────────────────────
  lifetimeAchievement: {
    short: "Presidential Lifetime Achievement Award",
    long: "Presidential Lifetime Achievement Award",
    bestowedBy: "Office of the President of the United States",
    year: "2024",
  },
  compassion: {
    short: "The Compassion Award",
    long: "The Compassion Award",
    bestowedBy: "Believe In Your Dreams TV",
    year: "2024",
  },
  senate: {
    short: "Senate of Puerto Rico  ·  Motion of Congratulations & Medal",
    long: "Motion of Congratulations & Medal",
    bestowedBy: "Senate of Puerto Rico",
    year: "2026",
  },

  // ─── Author ───────────────────────────────────────────────
  authorAnthology: {
    short: "Co-author · Mujeres Líderes Resilientes (Chapter 9)",
    long: "Co-author of Mujeres Líderes Resilientes  ·  Chapter 9",
    year: "2026",
  },

  // ─── Business ─────────────────────────────────────────────
  donovanBusiness: {
    short: "Co-founder · Donovan Smart Home Technology",
    long: "Co-founder of Donovan Smart Home Technology",
  },
  championBelt: {
    short: "Two-Time East Region Champions",
    long: "Two-Time East Region Champions · Championship Belt Title",
  },
  latinBusiness: {
    short: "Latin Business Awards Recognition",
    long: "Latin Business Awards Recognition",
    year: "2025",
  },

  // ─── Vocation / Movement ──────────────────────────────────
  founder: {
    short: "Co-founder of Unsinkable Minds",
    long: "Co-founder of the Unsinkable Minds Movement",
  },
} as const satisfies Record<string, Credential>;

/** Hero credentials strip — three lines, in order.
    PhD · Dean · Co-founder is the strongest authority trio. */
export const PRIMARY_CREDENTIALS: ReadonlyArray<Credential> = [
  CREDENTIALS.phd,
  CREDENTIALS.dean,
  CREDENTIALS.founder,
];

/** Complete academic record — used on /about and /press. */
export const ACADEMIC_CREDENTIALS: ReadonlyArray<Credential> = [
  CREDENTIALS.phd,
  CREDENTIALS.master,
  CREDENTIALS.bachelor,
  CREDENTIALS.associate,
];

/** Faculty appointment — used in dedicated section on /about and /speaking. */
export const FACULTY_CREDENTIALS: ReadonlyArray<Credential> = [
  CREDENTIALS.dean,
];

/** Certifications & mentorship lineage — used on /about and /speaking. */
export const TRAINING_LINEAGE: ReadonlyArray<Credential> = [
  CREDENTIALS.neuroscience,
  CREDENTIALS.lesBrown,
  CREDENTIALS.proctor,
];

/** Honors — used on /about, /recognition, /press. */
export const HONORS: ReadonlyArray<Credential> = [
  CREDENTIALS.lifetimeAchievement,
  CREDENTIALS.compassion,
  CREDENTIALS.senate,
];

/** Business credentials — used on /about and /press. */
export const BUSINESS_CREDENTIALS: ReadonlyArray<Credential> = [
  CREDENTIALS.donovanBusiness,
  CREDENTIALS.championBelt,
  CREDENTIALS.latinBusiness,
];

/** Author credit — used on /about and /press. */
export const AUTHOR_CREDENTIALS: ReadonlyArray<Credential> = [
  CREDENTIALS.authorAnthology,
];

/* ─── HELPERS ────────────────────────────────────────────────── */

/** Returns true for any link that should open in a new tab. */
export function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}
