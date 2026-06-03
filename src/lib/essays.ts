import type { Locale } from "@/lib/i18n";

/* ──────────────────────────────────────────────────────────────────
   ESSAYS REGISTRY — every piece of writing lives here, in both
   languages.

   To publish a new essay:
     1) Add an entry below with `es` and `en` content.
     2) Optionally fill in `body` (paragraph array) for either language.
        If a body is empty, that locale's detail page shows the
        editorial "in preparation" note.
     3) Save. The homepage Insights section, /[locale]/insights index,
        and /[locale]/insights/[slug] template all read from here.
   ────────────────────────────────────────────────────────────────── */

export type EssayPillarKey =
  | "mindset"
  | "identity"
  | "neuroscience"
  | "leadership"
  | "faith";

/** Display label for a pillar in the requested locale. */
const PILLAR_LABELS: Record<EssayPillarKey, Record<Locale, string>> = {
  mindset: { es: "Mentalidad", en: "Mindset" },
  identity: { es: "Identidad", en: "Identity" },
  neuroscience: { es: "Neurociencia", en: "Neuroscience" },
  leadership: { es: "Liderazgo", en: "Leadership" },
  faith: { es: "Fe", en: "Faith" },
};

export type LocalizedContent = {
  title: string;
  excerpt: string;
  body?: string[];
};

export type Essay = {
  slug: string;
  pillar: EssayPillarKey;
  minutes: number;
  date: string; // ISO YYYY-MM-DD
  es: LocalizedContent;
  en: LocalizedContent;
};

/* ─── The library ────────────────────────────────────────────── */

export const ESSAYS: Essay[] = [
  {
    slug: "mind-resists",
    pillar: "mindset",
    minutes: 6,
    date: "2026-04-12",
    en: {
      title: "Why the mind resists what it wants most.",
      excerpt:
        "The brain treats every leap into a new identity as a kind of small death. Here is what the science says about why — and what to do with that knowing.",
      body: [
        "The architecture of the brain is conservative by design. Its first allegiance is to the self that has already survived — not to the self that is trying to be born.",
        "This is why the woman who knows she is meant for more often feels the strongest resistance precisely at the moment she begins. The discomfort is not a sign she is wrong. It is a sign the rewiring has begun.",
        "What we call self-sabotage is, in most cases, the nervous system completing its job. It is asking, in the only way it knows how: are you sure?",
        "The work, then, is not to silence the resistance. The work is to learn its language — and to answer it, again and again, with the steadiness of a woman who has already made up her mind.",
      ],
    },
    es: {
      title: "Por qué la mente resiste lo que más desea.",
      excerpt:
        "El cerebro trata cada salto hacia una nueva identidad como una pequeña muerte. Esto es lo que la ciencia dice sobre el porqué — y qué hacer con ese saber.",
      body: [
        "La arquitectura del cerebro es conservadora por diseño. Su primera lealtad es al yo que ya ha sobrevivido — no al yo que está intentando nacer.",
        "Por eso la mujer que sabe que está destinada a más a menudo siente la resistencia más fuerte precisamente en el momento en que comienza. La incomodidad no es una señal de que esté equivocada. Es una señal de que la reconfiguración ha comenzado.",
        "Lo que llamamos auto-sabotaje es, en la mayoría de los casos, el sistema nervioso completando su trabajo. Está preguntando, en el único lenguaje que conoce: ¿estás segura?",
        "El trabajo, entonces, no es silenciar la resistencia. El trabajo es aprender su lenguaje — y responderle, una y otra vez, con la firmeza de una mujer que ya tomó su decisión.",
      ],
    },
  },
  {
    slug: "identity-transformation",
    pillar: "identity",
    minutes: 8,
    date: "2026-03-04",
    en: {
      title: "The woman you were isn't who you're becoming.",
      excerpt:
        "Transformation is not addition. It is exchange. A study of what we must release before we can hold the next version of ourselves.",
      body: [
        "Most transformation conversations are about acquisition. Acquire the habit. Acquire the discipline. Acquire the mindset. As if becoming were a matter of stacking.",
        "The deeper truth is that becoming is an exchange. To hold the next version of yourself, you must first set down the one whose hands are full.",
        "This is the part of the work that no one promises you. The grief of letting go of the woman who got you here. The strange loneliness of standing in the gap between who you were and who you have not yet learned to be.",
        "It passes. It always passes. And what waits on the other side is not a better version of the woman you were — it is a different woman entirely.",
      ],
    },
    es: {
      title: "La mujer que fuiste no es quien estás llegando a ser.",
      excerpt:
        "La transformación no es suma. Es intercambio. Un estudio sobre lo que debemos soltar antes de sostener la próxima versión de nosotras mismas.",
      body: [
        "La mayoría de las conversaciones sobre transformación tratan de adquisición. Adquiere el hábito. Adquiere la disciplina. Adquiere la mentalidad. Como si llegar a ser fuera cuestión de apilar.",
        "La verdad más profunda es que llegar a ser es un intercambio. Para sostener la próxima versión de ti, primero debes soltar a aquella cuyas manos están llenas.",
        "Esta es la parte del trabajo que nadie te promete. El duelo de dejar ir a la mujer que te trajo hasta aquí. La extraña soledad de estar en el vacío entre quien eras y quien aún no has aprendido a ser.",
        "Pasa. Siempre pasa. Y lo que espera del otro lado no es una mejor versión de la mujer que fuiste — es una mujer enteramente diferente.",
      ],
    },
  },
  {
    slug: "neuroscience-emotional-mastery",
    pillar: "neuroscience",
    minutes: 10,
    date: "2026-02-08",
    en: {
      title: "Rewiring the nervous system for emotional mastery.",
      excerpt:
        "Emotional mastery is not the absence of feeling. It is the capacity to feel without being moved from your seat.",
    },
    es: {
      title:
        "Reconfigurar el sistema nervioso para la maestría emocional.",
      excerpt:
        "La maestría emocional no es la ausencia de sentir. Es la capacidad de sentir sin ser movida de tu asiento.",
    },
  },
  {
    slug: "leadership-from-the-inside-out",
    pillar: "leadership",
    minutes: 7,
    date: "2026-01-22",
    en: {
      title: "Leadership begins where performance ends.",
      excerpt:
        "Authority that does not arise from self-mastery is theater. A meditation on the inner architecture of the leader.",
    },
    es: {
      title: "El liderazgo comienza donde termina el rendimiento.",
      excerpt:
        "La autoridad que no nace del dominio propio es teatro. Una meditación sobre la arquitectura interior del líder.",
    },
  },
  {
    slug: "the-call-and-the-cost",
    pillar: "faith",
    minutes: 9,
    date: "2025-11-30",
    en: {
      title: "The call and the cost.",
      excerpt:
        "A doctoral note on the relationship between vocation, sacrifice, and the woman who answers anyway.",
    },
    es: {
      title: "El llamado y el precio.",
      excerpt:
        "Una nota doctoral sobre la relación entre la vocación, el sacrificio, y la mujer que responde de todas formas.",
    },
  },
  {
    slug: "becoming-unsinkable",
    pillar: "identity",
    minutes: 6,
    date: "2025-10-04",
    en: {
      title: "Becoming unsinkable.",
      excerpt:
        "On the difference between resilience and resilience-as-identity — and why the second one changes everything.",
    },
    es: {
      title: "Llegar a ser unsinkable.",
      excerpt:
        "Sobre la diferencia entre la resiliencia y la resiliencia como identidad — y por qué la segunda lo cambia todo.",
    },
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */

/** Most recent first. */
export const ESSAYS_BY_DATE: Essay[] = [...ESSAYS].sort(
  (a, b) => b.date.localeCompare(a.date)
);

/** The top N essays — used by the homepage Insights section. */
export function featuredEssays(count: number = 3): Essay[] {
  return ESSAYS_BY_DATE.slice(0, count);
}

/** Lookup a single essay by slug. */
export function getEssayBySlug(slug: string): Essay | undefined {
  return ESSAYS.find((e) => e.slug === slug);
}

/** All slugs — used by generateStaticParams. */
export function allEssaySlugs(): { slug: string }[] {
  return ESSAYS.map((e) => ({ slug: e.slug }));
}

/** Returns the localized slice of an essay for the given locale. */
export function essayFor(
  essay: Essay,
  locale: Locale
): LocalizedContent & { pillar: string } {
  const content = essay[locale] ?? essay.en;
  return {
    ...content,
    pillar: PILLAR_LABELS[essay.pillar][locale],
  };
}

/** Pretty-printed date for the byline, locale-aware. */
export function formatEssayDate(iso: string, locale: Locale): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
