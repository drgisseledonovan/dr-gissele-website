/* ──────────────────────────────────────────────────────────────────
   MEDIA REGISTRY
   Single source of truth for hero portraits, logos, and section
   imagery. Swap any visual by changing one line below.

   File locations: everything lives under /public/media/ so paths are
   served as `/media/...`.
   ────────────────────────────────────────────────────────────────── */

export type MediaAsset = {
  /** Public path served by Next (e.g. "/media/portrait-hero.jpg"). */
  src: string;
  /** Accessible alt text. */
  alt: string;
  /** Native intrinsic dimensions — used for next/image sizing math. */
  width: number;
  height: number;
  /** Optional CSS object-position to fine-tune cropping. */
  objectPosition?: string;
};

/* ─── HERO PORTRAIT ──────────────────────────────────────────────
   To swap the hero portrait: change HERO_PORTRAIT to point at one
   of the alternates (or any new file you drop into /public/media).
   The hero will pick up the new image, dimensions, and crop.
   ─────────────────────────────────────────────────────────────── */

export const HERO_PORTRAIT_OPTIONS = {
  /* ── HISTORICAL OPTIONS (pre-June 2026) ───────────────────────── */

  /** On stage with award — global speaker + honoree in a single frame. */
  award: {
    src: "/media/portrait-award.jpg",
    alt: "Dr. Gissele Donovan — on stage receiving recognition",
    width: 852,
    height: 1280,
    objectPosition: "50% 18%",
  },
  /** Editorial, serious, arms-crossed — authority pose. White studio. */
  authority: {
    src: "/media/portrait-hero.jpg",
    alt: "Dr. Gissele Donovan — editorial portrait",
    width: 2000,
    height: 3000,
    objectPosition: "50% 30%",
  },
  /** Smiling, warm, black backdrop — approachable warmth. */
  warm: {
    src: "/media/portrait-warm.jpg",
    alt: "Dr. Gissele Donovan — portrait",
    width: 2000,
    height: 2855,
    objectPosition: "50% 32%",
  },

  /* ── JUNE 2026 EDITORIAL SHOOT ────────────────────────────────── */

  /** White shirt + black tie standing — modern leader. The new Hero. */
  leader: {
    src: "/media/portrait-leader.jpg",
    alt: "Dr. Gissele Donovan — editorial portrait, white shirt and tie",
    width: 3308,
    height: 4962,
    objectPosition: "50% 22%",
  },
  /** Black blazer, arms crossed — intellectual feminine authority.
      The About page lead + Press page portrait. */
  becoming: {
    src: "/media/portrait-becoming.jpg",
    alt: "Dr. Gissele Donovan — black blazer, arms crossed",
    width: 3265,
    height: 4898,
    objectPosition: "50% 22%",
  },
  /** Smiling with microphone — for the Introduction section
      ("La obra interior"). Joyful, present, warm authority. */
  practice: {
    src: "/media/portrait-joy-smile.jpg",
    alt: "Dr. Gissele Donovan — smiling with microphone, editorial portrait",
    width: 4000,
    height: 6000,
    objectPosition: "50% 18%",
  },
  /** Caramel one-shoulder jumpsuit — expansion, femininity,
      Hollywood pose. The Despierta visual centerpiece. */
  expansion: {
    src: "/media/portrait-expansion.jpg",
    alt: "Dr. Gissele Donovan — expansion portrait, caramel jumpsuit",
    width: 4820,
    height: 6447,
    objectPosition: "50% 28%",
  },
  /** Crown + smile + flores — feminine queen archetype.
      The Recognition section masthead. */
  crownSmile: {
    src: "/media/portrait-crown-smile.jpg",
    alt: "Dr. Gissele Donovan — crowned, smiling, holding flowers",
    width: 5012,
    height: 6662,
    objectPosition: "50% 25%",
  },
  /** Crown + Bible + gaze upward — faith and reflection. */
  crownReflection: {
    src: "/media/portrait-crown-reflection.jpg",
    alt: "Dr. Gissele Donovan — crowned, in faithful reflection",
    width: 4279,
    height: 5646,
    objectPosition: "50% 25%",
  },
  /** Crown + open Bible in hands — spiritual leadership. */
  crownBible: {
    src: "/media/portrait-crown-bible.jpg",
    alt: "Dr. Gissele Donovan — crowned, with open Bible",
    width: 3884,
    height: 5826,
    objectPosition: "50% 25%",
  },
  /** Open laugh with microphone — the Mastermind cover photo. */
  mastermindLaugh: {
    src: "/media/portrait-mastermind-laugh.jpg",
    alt: "Dr. Gissele Donovan — joyful editorial portrait with microphone",
    width: 2851,
    height: 4276,
    objectPosition: "50% 25%",
  },
  /** White shirt + tie + microphone — orator on the move. */
  oratorTie: {
    src: "/media/portrait-orator-tie.jpg",
    alt: "Dr. Gissele Donovan — speaking, white shirt and tie",
    width: 3841,
    height: 5762,
    objectPosition: "50% 22%",
  },
  /** Crown + white shirt + black skirt — sitting editorial moment. */
  tiaraMic: {
    src: "/media/portrait-tiara-mic.jpg",
    alt: "Dr. Gissele Donovan — editorial portrait with tiara",
    width: 3819,
    height: 5728,
    objectPosition: "50% 22%",
  },
  /** Open laugh with microphone — close-up of joy. */
  joyMic: {
    src: "/media/portrait-joy-mic.jpg",
    alt: "Dr. Gissele Donovan — laughing on stage with microphone",
    width: 3356,
    height: 5034,
    objectPosition: "50% 22%",
  },
  /** Finger on chin — contemplative thinker pose. */
  thinker: {
    src: "/media/portrait-thinker.jpg",
    alt: "Dr. Gissele Donovan — thoughtful editorial portrait",
    width: 3543,
    height: 5314,
    objectPosition: "50% 22%",
  },
  /** White suit standing — corporate authority. */
  whiteSuitStanding: {
    src: "/media/portrait-white-suit-standing.jpg",
    alt: "Dr. Gissele Donovan — white suit, standing",
    width: 3623,
    height: 5435,
    objectPosition: "50% 22%",
  },
  /** White suit sitting on stool — confident editorial pose. */
  whiteSuitSitting: {
    src: "/media/portrait-white-suit-sitting.jpg",
    alt: "Dr. Gissele Donovan — white suit, seated editorial pose",
    width: 5050,
    height: 6305,
    objectPosition: "50% 22%",
  },
  /** Sheer brown blouse + white blazer — feminine editorial. */
  editorialSheer: {
    src: "/media/portrait-editorial-sheer.jpg",
    alt: "Dr. Gissele Donovan — feminine editorial portrait",
    width: 4394,
    height: 5858,
    objectPosition: "50% 22%",
  },
} as const satisfies Record<string, MediaAsset>;

/** ← Change this single line to swap the hero portrait site-wide. */
export const HERO_PORTRAIT: MediaAsset = HERO_PORTRAIT_OPTIONS.leader;

/* ─── LOGOS ──────────────────────────────────────────────────────
   The full wordmark stacks the crowned GD mark above
   "DR. GISSELE DONOVAN / TRANSFORMING MINDS, ELEVATING DESTINIES."
   The monogram is just the gold crowned GD mark — best as a
   compact horizontal lockup partner in the nav.
   ─────────────────────────────────────────────────────────────── */

export const LOGO_WORDMARK: MediaAsset = {
  src: "/media/logo-wordmark.png",
  alt: "Dr. Gissele Donovan — wordmark",
  width: 1536,
  height: 1024,
};

export const LOGO_MONOGRAM: MediaAsset = {
  src: "/media/logo-monogram.png",
  alt: "Dr. Gissele Donovan — monogram",
  width: 1536,
  height: 1024,
};

/* Dark-background version of the crowned GD monogram.
   Use this against black/burgundy surfaces — the gold mark glows
   against true black without the ivory halo of the light version. */
export const LOGO_MONOGRAM_DARK: MediaAsset = {
  src: "/media/logo-monogram-dark.png",
  alt: "Dr. Gissele Donovan — monogram (dark)",
  width: 1536,
  height: 1024,
};

/* Pure gold crowned GD on TRANSPARENT background.
   The universal monogram — works on ivory, beige, burgundy, or black.
   This is the canonical logo going forward. */
export const LOGO_MONOGRAM_GOLD: MediaAsset = {
  src: "/media/logo-monogram-gold.png",
  alt: "Dr. Gissele Donovan — crowned GD monogram",
  width: 1536,
  height: 1024,
};

/* Full ceremonial seal: crowned GD inside a gold ring with
   "Transforming Minds · Elevating Destinies" curved around it.
   Used for editorial moments that deserve maximum brand presence:
   the homepage closing signature, the RENACER PDF cover, and
   the press kit. */
export const LOGO_SEAL: MediaAsset = {
  src: "/media/logo-seal.png",
  alt: "Dr. Gissele Donovan — official seal",
  width: 1536,
  height: 1024,
};

/* Signature wordmark: "Dr. Gissele Donovan" in gold script with
   the crown above and "Transforming Minds / Elevating Destinies"
   in tracked caps beneath. The cinematic name treatment for the
   closing of major sections, PDF pages, and email signatures. */
export const LOGO_SIGNATURE: MediaAsset = {
  src: "/media/logo-signature.png",
  alt: "Dr. Gissele Donovan — signature wordmark",
  width: 1536,
  height: 1024,
};

/* Horizontal brand lockup: crowned GD monogram on the left, full name
   "DR. GISSELE DONOVAN" + tagline stacked on the right. Best for the
   nav bar, footer brand mark, and any horizontal real estate. */
export const LOGO_LOCKUP_HORIZONTAL: MediaAsset = {
  src: "/media/logo-lockup-horizontal.png",
  alt: "Dr. Gissele Donovan — horizontal lockup",
  width: 1000,
  height: 1000,
};

/* Stacked brand lockup: crowned GD monogram on top, "DR. GISSELE
   DONOVAN" + tagline beneath. Best for press kit hero, formal
   document covers, and centered editorial moments. */
export const LOGO_LOCKUP_STACKED: MediaAsset = {
  src: "/media/logo-lockup-stacked.png",
  alt: "Dr. Gissele Donovan — stacked lockup",
  width: 1000,
  height: 1000,
};

/* ─── SECTION IMAGERY ───────────────────────────────────────────
   Surface the strongest stage and recognition photos here so the
   relevant sections can pull from one named registry.
   ─────────────────────────────────────────────────────────────── */

export const SPEAKING_PRIMARY: MediaAsset = {
  src: "/media/speaking-stage.jpg",
  alt: "Dr. Gissele Donovan speaking at an Unsinkable Minds event",
  width: 3960,
  height: 2640,
  objectPosition: "55% 40%",
};

/* ─── SPEAKING GALLERY ──────────────────────────────────────────
   Editorial carousel of stage and event moments — shown below the
   masthead photo in the homepage Speaking section. Mixed orientations
   render side-by-side in a horizontal scroll-snap rail, cropping to
   a tall 3:4 frame so the carousel reads as a unified portrait set.
   ─────────────────────────────────────────────────────────────── */

export const SPEAKING_GALLERY: ReadonlyArray<MediaAsset> = [
  {
    src: "/media/speaking-01.jpg",
    alt: "Dr. Gissele Donovan en el escenario — Managing Market Mentor USA",
    width: 960,
    height: 1280,
    objectPosition: "50% 40%",
  },
  {
    src: "/media/speaking-02.jpg",
    alt: "Dr. Gissele Donovan ante el backdrop del Movimiento Unsinkable Minds — Strong Minds Don't Sink",
    width: 853,
    height: 1280,
    objectPosition: "50% 35%",
  },
  {
    src: "/media/speaking-03.jpg",
    alt: "Dr. Gissele Donovan dirigiendo una sala de mujeres en una convocatoria privada",
    width: 640,
    height: 426,
    objectPosition: "50% 45%",
  },
  {
    src: "/media/speaking-04.jpg",
    alt: "Dr. Gissele Donovan al micrófono — retrato editorial con sombrero blanco",
    width: 853,
    height: 1280,
    objectPosition: "50% 8%",
  },
  {
    src: "/media/speaking-05.jpg",
    alt: "Dr. Gissele Donovan hablando ante una audiencia en convocatoria privada",
    width: 1280,
    height: 853,
    objectPosition: "50% 40%",
  },
  {
    src: "/media/speaking-06.jpg",
    alt: "Dr. Gissele Donovan en el escenario del Presidential Lifetime Achievement Award",
    width: 480,
    height: 640,
    objectPosition: "50% 35%",
  },
  {
    src: "/media/speaking-07.jpg",
    alt: "Dr. Gissele Donovan en escenario con iluminación cinematográfica",
    width: 720,
    height: 1280,
    objectPosition: "50% 35%",
  },
  {
    src: "/media/speaking-08.jpg",
    alt: "Dr. Gissele Donovan en la ceremonia de graduación de Cornerstone Christian University",
    width: 720,
    height: 1280,
    objectPosition: "50% 30%",
  },
];

export const RECOGNITION_PRIMARY: MediaAsset = {
  src: "/media/recognition-phd.jpg",
  alt: "Dr. Gissele Donovan at her PhD doctoral ceremony",
  width: 1600,
  height: 1066,
  objectPosition: "60% 35%",
};

export const MOVEMENT_MENTORSHIP: MediaAsset = {
  src: "/media/movement-mentorship.jpg",
  alt: "Dr. Gissele Donovan leading a Despierta Tu Poder Experience in a private boardroom",
  width: 960,
  height: 1280,
  objectPosition: "50% 38%",
};

/* ─── HONOR PHOTOS ──────────────────────────────────────────────
   One representative image per honor card in the Recognition
   section. Each crops to a 3:4 portrait inside the card.
   File names map directly to /public/media/.
   ─────────────────────────────────────────────────────────────── */

export const HONOR_PHD: MediaAsset = {
  src: "/media/honor-phd.jpg",
  alt: "Dr. Gissele Donovan at her PhD doctoral hooding ceremony",
  width: 1600,
  height: 2133,
  objectPosition: "50% 30%",
};

export const HONOR_PRESIDENTIAL: MediaAsset = {
  src: "/media/honor-presidential.jpg",
  alt: "Dr. Gissele Donovan with the Presidential Lifetime Achievement Award",
  width: 1600,
  height: 2133,
  objectPosition: "50% 30%",
};

export const HONOR_SENATE: MediaAsset = {
  src: "/media/honor-senate.jpg",
  alt: "Dr. Gissele Donovan honored by the Senate of Puerto Rico",
  width: 1600,
  height: 2133,
  objectPosition: "50% 30%",
};

/** Ordered to match the three honor cards in the Recognition
    section: Doctorate · Presidential Lifetime Achievement · Senate. */
export const HONOR_PHOTOS: ReadonlyArray<MediaAsset> = [
  HONOR_PHD,
  HONOR_PRESIDENTIAL,
  HONOR_SENATE,
];

/* ─── HONOR GALLERY ─────────────────────────────────────────────
   Six supporting photos — two per honor — for the "Momentos del
   Linaje" editorial strip beneath the three primary honor cards.
   ─────────────────────────────────────────────────────────────── */

export const HONOR_GALLERY = {
  phd: [
    {
      src: "/media/honor-phd-02.jpg",
      alt: "Dr. Gissele Donovan recibiendo el diploma doctoral en Cornerstone Christian University",
      width: 960,
      height: 640,
      objectPosition: "50% 30%",
    },
    {
      src: "/media/honor-phd-03.jpg",
      alt: "Dr. Gissele Donovan tomando la palabra en la ceremonia de investidura doctoral",
      width: 1280,
      height: 853,
      objectPosition: "50% 35%",
    },
  ],
  presidential: [
    {
      src: "/media/honor-presidential-02.jpg",
      alt: "Lifetime Achievement Award — el certificado, la corona y el reconocimiento sobre la mesa",
      width: 720,
      height: 960,
      objectPosition: "50% 45%",
    },
    {
      src: "/media/honor-presidential-03.jpg",
      alt: "Dr. Gissele Donovan en el escenario del Presidential Lifetime Achievement Award",
      width: 640,
      height: 1138,
      objectPosition: "50% 35%",
    },
  ],
  senate: [
    {
      src: "/media/honor-senate-02.jpg",
      alt: "Dr. Gissele Donovan al micrófono con la medalla del Senado de Puerto Rico",
      width: 640,
      height: 960,
      objectPosition: "50% 35%",
    },
    {
      src: "/media/honor-senate-03.jpg",
      alt: "Medalla oficial del Senado de Puerto Rico — Gobierno de Puerto Rico",
      width: 720,
      height: 960,
      objectPosition: "50% 50%",
    },
  ],
} as const satisfies Record<string, ReadonlyArray<MediaAsset>>;

/* Co-founders portrait — Dr. Gissele Donovan and Wally Donovan
   at the Unsinkable Minds Movement backdrop. 2:3 native — fits
   the section's aspect-[2/3] frame with no cropping. */
export const FOUNDERS_COUPLE: MediaAsset = {
  src: "/media/founders-couple.jpg",
  alt: "Dr. Gissele Donovan and Wally Donovan — co-founders of the Unsinkable Minds Movement",
  width: 2640,
  height: 3960,
  objectPosition: "50% 50%",
};

/* Podcast studio — Dr. Gissele and Wally Donovan in the
   Unsinkable Minds Movement podcast studio. Editorial setup
   with mic, books, globe and the movement logo behind them. */
export const PODCAST_STUDIO: MediaAsset = {
  src: "/media/podcast-studio.jpg",
  alt: "Dr. Gissele Donovan and Wally Donovan recording the Unsinkable Minds podcast",
  width: 1280,
  height: 720,
  objectPosition: "50% 40%",
};

/* Community group portrait — the full cohort with vision boards,
   in front of the Strong Minds Don't Sink banner. The emotional
   anchor for the "Be part of the next" CTA. */
export const COMMUNITY_GROUP: MediaAsset = {
  src: "/media/community-group.jpg",
  alt: "Despierta Tu Poder cohort — the full community with their vision boards",
  width: 1280,
  height: 853,
  objectPosition: "50% 35%",
};

/* Cohort gallery — moments from Despierta Tu Poder events and
   mentorship sessions. Used in the homepage Despierta carousel.
   All cards crop to 3:2 landscape; portrait sources are centered. */
export const COHORT_GALLERY: ReadonlyArray<MediaAsset> = [
  {
    src: "/media/cohort-01.jpg",
    alt: "Despierta Tu Poder — cohort working session",
    width: 2600,
    height: 1733,
    objectPosition: "50% 50%",
  },
  {
    src: "/media/cohort-02.jpg",
    alt: "Despierta Tu Poder — Plan Maestro workshop",
    width: 2600,
    height: 1733,
    objectPosition: "50% 50%",
  },
  {
    src: "/media/cohort-03.jpg",
    alt: "Despierta Tu Poder — moment of prayer",
    width: 2600,
    height: 1733,
    objectPosition: "50% 50%",
  },
  {
    src: "/media/cohort-04.jpg",
    alt: "Despierta Tu Poder — Dr. Gissele and Wally addressing the room",
    width: 2600,
    height: 1733,
    objectPosition: "50% 50%",
  },
  {
    src: "/media/cohort-05.jpg",
    alt: "Dr. Gissele speaking at an Unsinkable Minds session",
    width: 1733,
    height: 2600,
    objectPosition: "50% 30%",
  },
  {
    src: "/media/cohort-06.jpg",
    alt: "Dr. Gissele speaking — second moment",
    width: 1733,
    height: 2600,
    objectPosition: "50% 30%",
  },
];
