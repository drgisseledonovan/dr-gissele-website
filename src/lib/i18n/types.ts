/* ──────────────────────────────────────────────────────────────────
   i18n TYPES — the contract every dictionary must satisfy.

   Edit the dictionaries in src/lib/i18n/es.ts and en.ts. TypeScript
   will scream at you if you drop a key, so both languages stay in
   structural lock-step.
   ────────────────────────────────────────────────────────────────── */

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

/** Returns true if a string is one of the supported locales. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Friendly label for the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

/** HTML lang attribute per locale. */
export const LOCALE_HTML_LANG: Record<Locale, string> = {
  es: "es",
  en: "en",
};

/* ─── The dictionary type ───────────────────────────────────── */

export type Dictionary = {
  meta: {
    title: string;
    titleTemplate: string;
    description: string;
    ogDescription: string;
  };
  nav: {
    about: string;
    unsinkableMinds: string;
    speaking: string;
    programs: string;
    insights: string;
    apply: string;
    openMenu: string;
    closeMenu: string;
    tagline: string;
    switchToOtherLocale: string;
  };
  footer: {
    movementTitle: string;
    programsTitle: string;
    connectTitle: string;
    indexTitle: string;
    links: {
      unsinkableMinds: string;
      mentorship: string;
      speaking: string;
      digital: string;
      community: string;
      instagram: string;
      linkedin: string;
      email: string;
      about: string;
      insights: string;
      press: string;
      contact: string;
    };
    copyright: string;
    italicLine: string;
    privacy: string;
    terms: string;
    recognitionLine: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2Script: string;
    line2Serif: string;
    lede: string;
    cta1: string;
    cta2: string;
    credentialPhd: string;
    credentialTraining: string;
    credentialFounder: string;
    reachLabel: string;
    reach: ReadonlyArray<{ figure: string; label: string }>;
    scrollLabel: string;
    captionVolume: string;
    captionLocation: string;
    /** RENACER lead-capture block (hero-integrated). */
    renacerEyebrow: string;
    renacerLede: string;
    renacerEmailLabel: string;
    renacerEmailPlaceholder: string;
    renacerSubmit: string;
    renacerSubmitting: string;
    renacerSent: string;
    renacerError: string;
    renacerTrust: string;
  };
  pillars: {
    items: ReadonlyArray<{ n: string; title: string; line: string }>;
  };
  introduction: {
    eyebrow: string;
    titleLead: string;
    titleScript: string;
    body: ReadonlyArray<string>;
    cta1: string;
    cta2: string;
    portraitCaption: string;
  };
  movement: {
    eyebrow: string;
    titleSerif: string;
    titleScript: string;
    lede: string;
    subline: string;
    cta: string;
    foundersLabel: string;
    foundersNames: string;
    foundersTagline: string;
    foundersPhotoCaption: string;
  };
  despierta: {
    cohortMarker: string;
    eyebrow: string;
    titleSerif: string;
    titleScript: string;
    body: string;
    spiritLine: string;
    pillars: ReadonlyArray<string>;
    cta: string;
    reviewedNote: string;
    photoCaption: string;
    photoCaptionRight: string;
    galleryEyebrow: string;
    galleryTitle: string;
    galleryHint: string;
  };
  communityNext: {
    eyebrow: string;
    titleLead: string;
    titleScript: string;
    quote: string;
    cta: string;
    note: string;
    photoCaption: string;
  };
  speakingHome: {
    eyebrow: string;
    titleSerif: string;
    titleScript: string;
    captionEyebrow: string;
    captionTitle: string;
    captionRight: string;
    venuesLabel: string;
    venues: ReadonlyArray<string>;
    body: string;
    cta: string;
    galleryEyebrow: string;
    galleryTitle: string;
    galleryHint: string;
  };
  library: {
    eyebrow: string;
    titleLead: string;
    titleScript: string;
    cta: string;
    viewOn: string;
    visitFullLibrary: string;
  };
  recognitionHome: {
    eyebrow: string;
    titleLead: string;
    titleScript: string;
    description: string;
    photoMasthead: string;
    photoYear: string;
    photoConferred: string;
    photoTitle: string;
    photoTitleRight: string;
    pullQuote: string;
    bestowedBy: string;
    inServiceOfBecoming: string;
    galleryEyebrow: string;
    galleryTitle: string;
    galleryCaptions: ReadonlyArray<{
      event: string;
      first: string;
      second: string;
    }>;
  };
  witness: {
    eyebrow: string;
    title: string;
    items: ReadonlyArray<{ quote: string; attribution: string; context: string }>;
  };
  insightsHome: {
    eyebrow: string;
    title: string;
    cta: string;
    minRead: string;
  };
  podcast: {
    eyebrow: string;
    titleLead: string;
    titleScript: string;
    body: ReadonlyArray<string>;
    cta: string;
    caption: string;
    socialLabel: string;
    photoCaption: string;
  };
  social: {
    eyebrow: string;
    title: string;
    handle: string;
  };
  newsletter: {
    eyebrow: string;
    titleLead: string;
    titleScript: string;
    description: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    sentMessage: string;
    errorMessage: string;
    quiet: string;
    emailLabel: string;
  };
  honors: {
    titles: ReadonlyArray<{ title: string; titleLine2: string }>;
  };
  bios: {
    oneLine: string;
    short: string;
    long: ReadonlyArray<string>;
  };
  common: {
    nextEssay: string;
    backToInsights: string;
    inPreparation: string;
    inPreparationBody: string;
    returnHome: string;
    returnToInsights: string;
    readEssay: string;
    latest: string;
    archive: string;
    siteName: string;
    minRead: string;
  };
  pages: {
    about: {
      eyebrow: string;
      titleLead: string;
      titleScript: string;
      lede: string;
      cta1: string;
      cta2: string;
      portraitCaption: string;
      portraitYear: string;
      chapterIPractice: { title: string; body: ReadonlyArray<string> };
      chapterIIOrigin: { title: string; body: ReadonlyArray<string> };
      chapterIIIBecoming: { title: string; body: ReadonlyArray<string> };
      chapterIVRecord: {
        title: string;
        groupEducation: string;
        groupTraining: string;
        groupHonors: string;
        groupVocation: string;
      };
      chapterVMovement: { title: string; body: ReadonlyArray<string>; cta: string };
      closing: { quote: string; cta1: string; cta2: string };
    };
    programs: {
      eyebrow: string;
      titleLead: string;
      titleScript: string;
      lede: string;
      sectionsNav: ReadonlyArray<{ href: string; label: string }>;
      journeyLabel: string;
      journey: ReadonlyArray<{ numeral: string; label: string; line: string }>;
      mentorship: {
        eyebrow: string;
        titleLead: string;
        titleScript: string;
        cohortEyebrow: string;
        cohortTitleSerif: string;
        cohortTitleScript: string;
        cohortBody: string;
        cohortSpirit: string;
        cohortDetails: ReadonlyArray<{ label: string; value: string }>;
        cohortCta: string;
        cohortNote: string;
        privateEyebrow: string;
        privateTitleSerif: string;
        privateTitleScript: string;
        privateBody: string;
        privateDetails: ReadonlyArray<{ label: string; value: string }>;
        privateCta: string;
        privateNote: string;
        photoCaption: string;
      };
      speaking: {
        eyebrow: string;
        title: string;
        body: string;
        cta: string;
      };
      digital: {
        eyebrow: string;
        titleLead: string;
        titleScript: string;
        description: string;
        viewOn: string;
        visitFull: string;
      };
      community: {
        eyebrow: string;
        titleLead: string;
        titleScript: string;
        body: string;
        cta1: string;
        cta2: string;
        quote: string;
        author: string;
      };
      closing: {
        eyebrow: string;
        titleLead: string;
        titleScript: string;
        cta1: string;
        cta2: string;
      };
    };
    speaking: {
      eyebrow: string;
      titleSerif: string;
      titleScript: string;
      lede: string;
      cta1: string;
      cta2: string;
      stageCaption: string;
      stageRight: string;
      topicsEyebrow: string;
      topicsTitle: string;
      topics: ReadonlyArray<{ numeral: string; title: string; line: string }>;
      formatsEyebrow: string;
      formatsTitle: string;
      formats: ReadonlyArray<string>;
      audiencesEyebrow: string;
      audiencesTitle: string;
      audiences: ReadonlyArray<string>;
      credentialsEyebrow: string;
      credentialsTitle: string;
      credentialsGroupEducation: string;
      credentialsGroupTraining: string;
      credentialsGroupHonors: string;
      credentialsGroupVocation: string;
      inquireEyebrow: string;
      inquireTitleLead: string;
      inquireTitleScript: string;
      inquireBody: string;
      inquireCta: string;
      inquireFooter: string;
    };
    unsinkableMinds: {
      eyebrow: string;
      titleSerif: string;
      titleScript: string;
      lede: string;
      reachLabel: string;
      reach: ReadonlyArray<{ figure: string; label: string }>;
      chapterIOrigin: { title: string; body: ReadonlyArray<string> };
      chapterIIDeclaration: {
        title: string;
        items: ReadonlyArray<string>;
      };
      chapterIIIPillars: {
        eyebrow: string;
        titleLead: string;
        titleScript: string;
        items: ReadonlyArray<{ numeral: string; title: string; line: string }>;
      };
      chapterIVConvening: {
        numeral: string;
        eyebrow: string;
        titleSerif: string;
        titleScript: string;
        body: string;
        spirit: string;
        cta: string;
        note: string;
        photoCaption: string;
        photoRight: string;
      };
      chapterVRoad: {
        numeral: string;
        eyebrow: string;
        photoCaption: string;
        photoRight: string;
      };
      closingQuote: { quote: string; author: string };
    };
    insights: {
      eyebrow: string;
      titleLead: string;
      titleScript: string;
      lede: string;
      latestEyebrow: string;
      archiveEyebrow: string;
      readEssay: string;
      minRead: string;
    };
    essay: {
      backToInsights: string;
      minRead: string;
      signedBy: string;
      inPreparationEyebrow: string;
      inPreparationBody: string;
      returnToInsights: string;
      nextEssayEyebrow: string;
      read: string;
      closingLine: string;
      backCta: string;
      replyCta: string;
    };
    press: {
      eyebrow: string;
      titleLead: string;
      titleScript: string;
      lede: string;
      cta1: string;
      cta2: string;
      portraitCaption: string;
      biosEyebrow: string;
      biosOneLineTitle: string;
      biosOneLineFor: string;
      biosShortTitle: string;
      biosShortFor: string;
      biosLongTitle: string;
      biosLongFor: string;
      recognitionsEyebrow: string;
      assetsEyebrow: string;
      photographsTitle: string;
      logosTitle: string;
      downloadLabel: string;
      pressEyebrow: string;
      pressTitleLead: string;
      pressTitleScript: string;
      pressBody: string;
      pressCta: string;
      pressFooter: string;
    };
    contact: {
      eyebrow: string;
      titleLead: string;
      titleScript: string;
      lede: string;
      routes: ReadonlyArray<{
        numeral: string;
        eyebrow: string;
        title: string;
        lede: string;
        subject: string;
        body: string;
        cta: string;
      }>;
      detailsGeneral: string;
      detailsPress: string;
      detailsResponse: string;
      detailsResponseValue: string;
      formEyebrow: string;
      formTitle: string;
      formName: string;
      formEmail: string;
      formSubject: string;
      formSubjectPlaceholder: string;
      formMessage: string;
      formSubmit: string;
      socialEyebrow: string;
    };
    privacy: {
      eyebrow: string;
      title: string;
      lastUpdatedLabel: string;
      lede: string;
      sections: ReadonlyArray<{ title: string; body: string }>;
      returnHome: string;
    };
    terms: {
      eyebrow: string;
      title: string;
      lastUpdatedLabel: string;
      lede: string;
      sections: ReadonlyArray<{ title: string; body: string }>;
      returnHome: string;
    };
  };
};
