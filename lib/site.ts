/**
 * Configurazione centrale del brand Benvenia Guide.
 * Ogni dato commerciale non ancora verificato è esplicitamente null/placeholder:
 * non inventare recapiti, ragioni sociali, prezzi o credenziali.
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.benveniaguide.it"
).replace(/\/+$/, "");

export const siteConfig = {
  brand: "Benvenia",
  productName: "Benvenia Guide",
  fullName: "Benvenia Guide",
  legalName: null as string | null, // L'attività non è formalizzata: resta null finché non esiste una ragione sociale
  vatNumber: null as string | null, // L'attività non è formalizzata: resta null finché non esiste una partita IVA
  url: siteUrl,
  locale: "it_IT",
  language: "it",
  domain: "www.benveniaguide.it",
  contact: {
    email: "info@benveniaguide.it",
    phone: null as string | null, // Nessun recapito telefonico pubblicato
    address: null as string | null, // Nessuna sede pubblicata
  },
  /** Data di ultima revisione dei contenuti (costante: evita valori non deterministici in render). */
  lastUpdated: "2026-10-17",
  tagline: "L'accoglienza migliore continua oltre il check-in.",
  description:
    "Benvenia Guide raccoglie in una guida digitale personalizzata tutte le informazioni del soggiorno: check-in, servizi, regole, consigli sul territorio e contatti dell'host, sempre disponibili per i tuoi ospiti.",
} as const;

export const ctas = {
  primary: { label: "Richiedi una demo gratuita", href: "/contatti" },
  secondary: { label: "Esplora una Guest Guide", href: "/demo" },
  tertiary: { label: "Scopri come funziona", href: "/come-funziona" },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Demo", href: "/demo" },
  { label: "Come funziona", href: "/come-funziona" },
  { label: "Funzionalità", href: "/funzionalita" },
  { label: "Soluzioni", href: "/soluzioni" },
  { label: "Prezzi", href: "/prezzi" },
  { label: "Risorse", href: "/risorse" },
];

export const footerNavigation: { title: string; items: NavItem[] }[] = [
  {
    title: "Prodotto",
    items: [
      { label: "Demo interattiva", href: "/demo" },
      { label: "Come funziona", href: "/come-funziona" },
      { label: "Funzionalità", href: "/funzionalita" },
      { label: "Prezzi e preventivi", href: "/prezzi" },
    ],
  },
  {
    title: "Per la tua struttura",
    items: [
      { label: "B&B", href: "/soluzioni#beb" },
      { label: "Case vacanza", href: "/soluzioni#case-vacanza" },
      { label: "Boutique hotel", href: "/soluzioni#boutique-hotel" },
      { label: "Property manager", href: "/soluzioni#property-manager" },
    ],
  },
  {
    title: "Informazioni",
    items: [
      { label: "Risorse", href: "/risorse" },
      { label: "Contatti", href: "/contatti" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookie policy", href: "/cookie-policy" },
    ],
  },
];

/**
 * Configurazione commerciale da completare solo se e quando l'attività verrà
 * formalizzata (società/partita IVA). Con l'attività informale la privacy
 * identifica il titolare come "Benvenia Guide", contattabile via email.
 */
export const pendingLaunchConfig = [
  "Se l'attività viene formalizzata: aggiornare legalName, vatNumber, sede e il titolare in privacy",
] as const;
