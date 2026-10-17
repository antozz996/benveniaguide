/**
 * Funzionalità della Guest Guide.
 *
 * Distinzione esplicita richiesta:
 * - "verifiedDemo": ciò che è realmente presente in questa demo interattiva
 *   e quindi verificabile direttamente sul sito.
 * - "planned": funzionalità previste a livello di prodotto, da confermare
 *   durante l'onboarding di ogni struttura. Non vengono presentate come
 *   già disponibili.
 */

export type FeatureIcon =
  | "layout"
  | "smartphone"
  | "languages"
  | "wifi"
  | "map"
  | "phone"
  | "sparkles"
  | "refresh"
  | "palette"
  | "qr"
  | "shield"
  | "message";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: FeatureIcon;
}

/** Funzionalità verificabili nella demo presente su questo sito. */
export const verifiedDemoFeatures: FeatureItem[] = [
  {
    id: "sezioni",
    title: "Quattro sezioni di guida",
    description:
      "Benvenuto, Il tuo soggiorno, Esplora e Contatti: la struttura completa descritta in questo sito, realmente navigabile nella demo.",
    icon: "layout",
  },
  {
    id: "mobile",
    title: "Esperienza mobile-first",
    description:
      "Interfaccia progettata per lo smartphone, con navigazione inferiore, schede dettaglio e schermo intero.",
    icon: "smartphone",
  },
  {
    id: "lingue",
    title: "Doppia lingua IT/EN",
    description:
      "La demo è interamente navigabile in italiano e in inglese con un selettore di lingua.",
    icon: "languages",
  },
  {
    id: "wifi-servizi",
    title: "Informazioni di servizio",
    description:
      "Check-in e check-out, Wi-Fi, servizi della struttura e regole della casa, organizzati e leggibili.",
    icon: "wifi",
  },
  {
    id: "territorio",
    title: "Consigli sul territorio",
    description:
      "Attrazioni, ristoranti ed esperienze con schede di dettaglio, distanze e suggerimenti dell'host.",
    icon: "map",
  },
  {
    id: "contatti-host",
    title: "Contatto diretto con l'host",
    description:
      "Una sezione dedicata con azioni di contatto e domande frequenti del soggiorno.",
    icon: "phone",
  },
];

/** Funzionalità di prodotto previste: da confermare in fase di onboarding. */
export const plannedFeatures: FeatureItem[] = [
  {
    id: "contenuti-su-misura",
    title: "Contenuti su misura",
    description:
      "Immagini, testi e identità visiva calibrati sulla struttura, con un tono di voce coerente con la tua accoglienza.",
    icon: "palette",
  },
  {
    id: "condivisione",
    title: "Condivisione semplice con gli ospiti",
    description:
      "Un link dedicato alla tua guida, pensato per essere inviato nei messaggi di benvenuto e aperto senza installare nulla.",
    icon: "qr",
  },
  {
    id: "aggiornamenti",
    title: "Aggiornamenti centralizzati",
    description:
      "Quando cambia un orario o un servizio, si aggiorna la guida: nessun foglio da ristampare.",
    icon: "refresh",
  },
  {
    id: "esperienze",
    title: "Sezione esperienze locale",
    description:
      "Raccolta curata di luoghi ed esperienze del territorio, allineata con i tuoi consigli.",
    icon: "sparkles",
  },
  {
    id: "privacy",
    title: "Attenzione alla riservatezza",
    description:
      "Nessuna password Wi-Fi reale o dato sensibile esposto nella demo pubblica: i contenuti riservati restano nella guida privata della struttura.",
    icon: "shield",
  },
  {
    id: "supporto",
    title: "Supporto alla configurazione",
    description:
      "Un confronto guidato per raccogliere e organizzare le informazioni durante l'attivazione.",
    icon: "message",
  },
];
