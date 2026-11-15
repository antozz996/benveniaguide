/**
 * Tipi condivisi della Guest Guide: usati dalla demo (`data/demo-guide.ts`)
 * e dalle guide reali (`data/guides/*`).
 * Restano serializzabili (niente funzioni o JSX): in FASE 3 i contenuti
 * passeranno in DB come JSON validato con zod derivato da questi tipi.
 */

export type GuideLang = "it" | "en";

export type GuideScreen = "welcome" | "stay" | "explore" | "contacts";

export const guideScreenOrder: GuideScreen[] = [
  "welcome",
  "stay",
  "explore",
  "contacts",
];

export type PlaceArtKind =
  | "lake"
  | "village"
  | "hills"
  | "garden"
  | "table"
  | "coffee"
  | "gelato"
  | "boat"
  | "market"
  | "path";

export interface GuidePlace {
  id: string;
  name: string;
  category: string;
  distance: string;
  description: string;
  tip: string;
  art: PlaceArtKind;
  /** Link a Google Maps/Apple Maps: se presente "Indicazioni" diventa un link. */
  mapsUrl?: string;
}

export interface GuidePlaceGroup {
  id: "attractions" | "dining" | "experiences";
  label: string;
  places: GuidePlace[];
}

export type ServiceIcon =
  | "coffee"
  | "car"
  | "waves"
  | "bath"
  | "snowflake"
  | "recycle";

export interface GuideService {
  id: string;
  name: string;
  detail: string;
  hours?: string;
  icon: ServiceIcon;
}

export interface GuideRule {
  id: string;
  title: string;
  detail: string;
}

export interface GuideFaqItem {
  q: string;
  a: string;
}

export interface GuideQuickLink {
  id: string;
  screen: GuideScreen;
  label: string;
  hint: string;
  icon: "bed" | "wifi" | "book" | "map" | "phone";
}

export interface GuideUi {
  languageLabel: string;
  tabs: Record<GuideScreen, string>;
  /** aria-label della barra delle sezioni. Default: "Sezioni della guida". */
  sectionsLabel?: string;
  /** Prefisso dell'aria-label del bottone copia. Default: "Copia". */
  copyLabel?: string;
  toastCopied?: string;
  toastCopyFailed?: string;
}

export interface DemoUi extends GuideUi {
  demoBadge: string;
  demoNotice: string;
  toastDemo: string;
  openFullscreen: string;
  closeFullscreen: string;
  backToSite: string;
  statusTime: string;
}

export interface GuideContactLinks {
  /** Numero in formato E.164 (es. "+390000000000"). */
  phone?: string;
  email?: string;
  mapsUrl?: string;
}

export interface GuideContent<U extends GuideUi = GuideUi> {
  structure: {
    name: string;
    location: string;
    tagline: string;
    /** Avviso mostrato in Benvenuto e Contatti (es. dati fittizi). */
    disclaimer?: string;
  };
  welcome: {
    eyebrow: string;
    title: string;
    message: string;
    signature: string;
    quickLinksTitle: string;
    quickLinks: GuideQuickLink[];
    /** Illustrazione della copertina. Default: "lake". */
    heroArt?: PlaceArtKind;
  };
  stay: {
    eyebrow: string;
    title: string;
    intro: string;
    checkin: {
      title: string;
      time: string;
      detail: string;
    };
    checkout: {
      title: string;
      time: string;
      detail: string;
    };
    wifi: {
      title: string;
      networkLabel: string;
      network: string;
      passwordLabel: string;
      password: string;
      note: string;
    };
    servicesTitle: string;
    services: GuideService[];
    rulesTitle: string;
    rulesIntro: string;
    rules: GuideRule[];
  };
  explore: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: GuidePlaceGroup[];
    detailLabels: {
      distance: string;
      tip: string;
      close: string;
    };
  };
  contacts: {
    eyebrow: string;
    title: string;
    intro: string;
    host: {
      name: string;
      role: string;
      note: string;
    };
    actions: {
      call: string;
      email: string;
      directions: string;
    };
    /** Recapiti reali: se assenti le azioni restano bottoni gestiti dal genitore. */
    links?: GuideContactLinks;
    faqTitle: string;
    faq: GuideFaqItem[];
  };
  ui: U;
}

export interface GuideDefinition {
  slug: string;
  /** Guida di esempio con dati fittizi (mostra il badge "Esempio"). */
  isSample?: boolean;
  defaultLang: "it";
  content: { it: GuideContent; en?: GuideContent };
}
