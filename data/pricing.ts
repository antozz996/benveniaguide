/**
 * Prezzi.
 *
 * IMPORTANTE: non esistono ancora listini commerciali verificati.
 * Non inventare prezzi o pacchetti. Questa configurazione è predisposta
 * per accogliere in futuro pacchetti e fasce da un'unica fonte centrale:
 * basterà compilare l'array `pricingPackages`.
 */

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

/** Vuoto di proposito: i pacchetti verranno configurati dal team commerciale. */
export const pricingPackages: PricingPackage[] = [];

export const pricingFactors: { title: string; description: string }[] = [
  {
    title: "Numero di strutture",
    description:
      "Offerta calibrata su una singola struttura o su un portafoglio di immobili gestiti.",
  },
  {
    title: "Ricchezza dei contenuti",
    description:
      "Dalla guida essenziale con le informazioni di soggiorno fino a un racconto completo del territorio.",
  },
  {
    title: "Lingue della guida",
    description:
      "Una o più lingue, in base agli ospiti che accogli abitualmente.",
  },
  {
    title: "Personalizzazioni",
    description:
      "Immagini, identità visiva e contenuti studiati sui dettagli della tua accoglienza.",
  },
  {
    title: "Supporto e aggiornamenti",
    description:
      "Livello di affiancamento nella gestione dei contenuti nel tempo.",
  },
];

export const pricingSteps: { number: string; title: string; description: string }[] = [
  {
    number: "01",
    title: "Racconti la tua struttura",
    description:
      "Dal modulo di contatto: tipologia, dimensioni e cosa vorresti comunicare agli ospiti.",
  },
  {
    number: "02",
    title: "Capiamo le esigenze",
    description:
      "In una call breve analizziamo contenuti, lingue e livello di personalizzazione che ti servono davvero.",
  },
  {
    number: "03",
    title: "Ricevi un'offerta su misura",
    description:
      "Prepariamo una proposta chiara e trasparente, costruita sul tuo caso: senza pacchetti preconfezionati.",
  },
  {
    number: "04",
    title: "Attiviamo la guida insieme",
    description:
      "Approvata l'offerta, partiamo con la raccolta dei contenuti e la preparazione della guida.",
  },
];

export const pricingNotice =
  "Stiamo definendo i pacchetti commerciali di Benvenia Guide. Fino ad allora preferiamo non pubblicare cifre indicative: ogni struttura riceve un'offerta personalizzata e trasparente, costruita sulle sue reali esigenze.";
