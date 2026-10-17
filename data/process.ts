/**
 * Il processo di Benvenia Guide, dalla richiesta alla condivisione.
 * Nessuna promessa di tempi rigidi: le durate dipendono dai materiali
 * e dalle esigenze della struttura.
 */

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: "message" | "clipboard" | "sparkles" | "check" | "share" | "refresh";
}

/** I tre passaggi chiave mostrati in home. */
export const homeSteps: { title: string; description: string; icon: ProcessStep["icon"] }[] = [
  {
    title: "Personalizziamo le informazioni",
    description:
      "Partiamo dai contenuti reali della tua struttura: orari, servizi, regole e i consigli che ami dare a voce.",
    icon: "clipboard",
  },
  {
    title: "Organizziamo la tua guida",
    description:
      "Ogni informazione trova il posto giusto: chiara, ordinata e piacevole da leggere dal telefono.",
    icon: "sparkles",
  },
  {
    title: "La condividi con i tuoi ospiti",
    description:
      "La guida diventa il riferimento del soggiorno: gli ospiti sanno dove trovare tutto, anche quando tu sei occupato.",
    icon: "share",
  },
];

/** Il percorso esteso mostrato in /come-funziona. */
export const processSteps: ProcessStep[] = [
  {
    id: "richiesta",
    number: "01",
    title: "Richiesta e primo confronto",
    description:
      "Ci racconti la tua struttura tramite il modulo. Fissiamo una call breve per capire contesto, esigenze e domande: senza impegno e senza costo.",
    details: [
      "Modulo con quattro informazioni essenziali",
      "Call conoscitiva di circa venti minuti",
      "Prime risposte su tempi e modalità di attivazione",
    ],
    icon: "message",
  },
  {
    id: "raccolta",
    number: "02",
    title: "Raccolta delle informazioni",
    description:
      "Ti guidiamo con una checklist semplice: cosa serve per check-in, servizi, regole e territorio. Tu integri i contenuti, noi li organizziamo.",
    details: [
      "Checklist condivisa, compilabile senza tecnicismi",
      "I tuoi materiali esistenti valorizzati",
      "Un unico punto di raccolta, niente informazioni disperse",
    ],
    icon: "clipboard",
  },
  {
    id: "personalizzazione",
    number: "03",
    title: "Personalizzazione della guida",
    description:
      "Trasformiamo le informazioni in una guida chiara: testi curati, sezioni ordinate e un tono coerente con l'accoglienza della struttura.",
    details: [
      "Struttura in quattro sezioni collaudate",
      "Testi e ordine pensati per chi legge dal telefono",
      "Ampio spazio ai tuoi consigli locali",
    ],
    icon: "sparkles",
  },
  {
    id: "revisione",
    number: "04",
    title: "Revisione insieme",
    description:
      "Ti mostriamo la guida prima della pubblicazione: ogni dettaglio viene verificato con te, dagli orari al tono di voce.",
    details: [
      "Confronto su ogni sezione",
      "Correzioni illimitate prima della pubblicazione",
      "Nessuna sorpresa: approvi tutto prima voi",
    ],
    icon: "check",
  },
  {
    id: "condivisione",
    number: "05",
    title: "Pubblicazione e condivisione",
    description:
      "La guida diventa disponibile per i tuoi ospiti con le modalità concordate: pronta da aprire dal telefono, senza installazioni.",
    details: [
      "Accesso immediato dal browser",
      "Modalità di condivisione concordate insieme",
      "Un riferimento unico per tutto il soggiorno",
    ],
    icon: "share",
  },
  {
    id: "aggiornamenti",
    number: "06",
    title: "Aggiornamenti nel tempo",
    description:
      "Orari che cambiano, un servizio nuovo, un ristorante da aggiungere: la guida si aggiorna e gli ospiti trovano sempre la versione corretta.",
    details: [
      "Aggiornamenti senza ristampare nulla",
      "Contenuti sempre allineati alla struttura",
      "La guida cresce con la tua accoglienza",
    ],
    icon: "refresh",
  },
];

export const whatYouPrepare = [
  "Gli orari e le modalità di check-in e check-out",
  "Le informazioni su Wi-Fi e servizi della struttura",
  "Le regole della casa che tieni a comunicare",
  "I tuoi consigli preferiti su ristoranti e dintorni",
  "I recapiti giusti per contattarti durante il soggiorno",
];

export const whatWePrepare = [
  "La struttura e i testi della guida",
  "L'organizzazione delle sezioni e delle schede",
  "Il tono di voce coerente con la struttura",
  "L'impaginazione pensata per il telefono",
  "Il collegamento tra guida e aggiornamenti futuri",
];
