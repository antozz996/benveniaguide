/**
 * Prezzi — listino a pagamento unico (una tantum), nessun abbonamento.
 * Fonte unica per le pagine /prezzi e /paga. Regime forfettario: nessuna IVA.
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

export const pricingPackages: PricingPackage[] = [
  {
    id: "base",
    name: "Base",
    description: "L'essenziale per accogliere i tuoi ospiti senza ripetere le stesse risposte.",
    price: "€49",
    period: "una tantum",
    features: [
      "Guida in italiano per 1 struttura",
      "Benvenuto, check-in, Wi-Fi, regole e contatti",
      "QR code da condividere con gli ospiti",
      "Online in 48 ore",
    ],
  },
  {
    id: "completa",
    name: "Completa",
    description: "La guida che racconta anche il tuo territorio, in due lingue.",
    price: "€79",
    period: "una tantum",
    highlighted: true,
    features: [
      "Tutto il pacchetto Base",
      "Versione in inglese",
      "Sezione territorio: cosa vedere e dove mangiare",
      "Cartello QR pronto da stampare",
      "1 modifica gratuita entro 12 mesi",
    ],
  },
  {
    id: "multi",
    name: "Multi-struttura",
    description: "Per property manager e host con più immobili.",
    price: "€59",
    period: "a struttura, una tantum",
    features: [
      "Pacchetto Completo per ogni struttura",
      "Da 3 strutture in su",
      "Stile coerente su tutte le guide",
      "Un unico referente per tutte le strutture",
    ],
  },
];

export const pricingExtras: { label: string; price: string }[] = [
  { label: "Modifica extra (orari, Wi-Fi, luoghi…)", price: "€15" },
];

/**
 * Voci pagabili su /paga/[id] (bonifico o Revolut). `amount` in euro;
 * `perUnit` = prezzo moltiplicato per il numero di strutture/modifiche.
 * Per chiudere l'offerta lancio: impostare `launchOffer: false`.
 */
export interface PayableItem {
  id: string;
  name: string;
  amount: number;
  /** Prezzo di listino barrato (offerta lancio). */
  listAmount?: number;
  perUnit?: string;
  note?: string;
}

const launchOfferActive = true;

export const payableItems: PayableItem[] = [
  { id: "base", name: "Base", amount: 49 },
  launchOfferActive
    ? {
        id: "completa",
        name: "Completa",
        amount: 49,
        listAmount: 79,
        note: "Offerta lancio riservata ai primi 10 clienti, in cambio di una recensione e del permesso di mostrare la guida come esempio.",
      }
    : { id: "completa", name: "Completa", amount: 79 },
  {
    id: "multi",
    name: "Multi-struttura",
    amount: 59,
    perUnit: "struttura",
    note: "Da 3 strutture in su: importo totale = €59 × numero di strutture.",
  },
  { id: "modifica", name: "Modifica extra", amount: 15, perUnit: "modifica" },
];

export function getPayableItem(id: string): PayableItem | undefined {
  return payableItems.find((item) => item.id === id);
}

export const pricingLaunchOffer = {
  title: "Offerta lancio: Completa a €49",
  description:
    "Per i primi 10 clienti il pacchetto Completo costa €49 invece di €79. In cambio ti chiediamo una recensione e il permesso di mostrare la tua guida come esempio.",
};

export const pricingIncluded: { title: string; description: string }[] = [
  {
    title: "Paghi una volta sola",
    description: "Nessun abbonamento e nessun rinnovo: la guida resta online.",
  },
  {
    title: "La scriviamo noi",
    description: "Tu compili un breve modulo, al resto pensiamo noi.",
  },
  {
    title: "Pronta in 48 ore",
    description: "Ricevi il link e il QR code da inviare ai tuoi ospiti.",
  },
  {
    title: "Funziona su ogni telefono",
    description: "Nessuna app da scaricare: l'ospite apre un link.",
  },
  {
    title: "Affianca ciò che usi già",
    description: "Puoi condividere il link su Airbnb, Booking, WhatsApp o nel tuo gestionale.",
  },
];

export const pricingSteps: { number: string; title: string; description: string }[] = [
  {
    number: "01",
    title: "Scegli il pacchetto",
    description: "Paghi con bonifico o Revolut e ci invii la conferma con il nome della struttura.",
  },
  {
    number: "02",
    title: "Compili il modulo",
    description: "Ci mandi le informazioni della struttura: check-in, Wi-Fi, regole, consigli.",
  },
  {
    number: "03",
    title: "Scriviamo la guida",
    description: "Prepariamo testi e sezioni e ti mandiamo l'anteprima da approvare.",
  },
  {
    number: "04",
    title: "Online in 48 ore",
    description: "Ricevi link e QR code da condividere con gli ospiti.",
  },
];
