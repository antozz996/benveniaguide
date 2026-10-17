/**
 * Contenuti delle landing di settore (/soluzioni).
 * Linguaggio commerciale ma prudente: i benefici sono descritti come
 * potenziali, senza statistiche, recensioni o casi studio inventati.
 */

export interface SolutionSegment {
  id: string;
  name: string;
  shortDescription: string;
  audience: string;
  /** Esempi di informazioni utili tipiche del segmento. */
  guideHighlights: string[];
  /** Situazioni comuni nel segmento, descritte come possibilità e non come certezze. */
  commonNeeds: { title: string; description: string }[];
  /** Cosa può cambiare con una Guest Guide ben fatta (formulato come potenziale). */
  potentialBenefits: string[];
  icon: "home" | "beach" | "sparkle" | "briefcase";
}

export const solutionSegments: SolutionSegment[] = [
  {
    id: "beb",
    name: "B&B",
    shortDescription:
      "Per chi accoglie in prima persona e vuole che ogni ospite si senta atteso, anche quando la giornata è piena.",
    audience:
      "Ideale per B&B a gestione familiare, dalla singola camera agli appartamenti per gli ospiti.",
    guideHighlights: [
      "Orari di check-in e check-out chiari e sempre consultabili",
      "Colazione: servizio, orari e attenzioni alimentari",
      "Wi-Fi, spazi comuni e servizi della casa",
      "Regole semplici per la convivenza",
      "I tuoi indirizzi preferiti per cena e passeggiate",
    ],
    commonNeeds: [
      {
        title: "Le stesse domande, ogni settimana",
        description:
          "Orari, Wi-Fi, parcheggio, colazione: le informazioni più richieste possono essere ripetute innumerevoli volte via messaggio.",
      },
      {
        title: "Informazioni distribuite ovunque",
        description:
          "Dettagli sparsi tra email di conferma, chat, note sul frigorifero e fogli stampati: trovare la versione aggiornata diventa complicato.",
      },
      {
        title: "Accoglienza che cambia con la fretta",
        description:
          "Quando il telefono squilla o arriva un ospite in anticipo, il tempo per spiegare tutto con calma si riduce.",
      },
    ],
    potentialBenefits: [
      "Le informazioni essenziali sempre a portata di mano dell'ospite",
      "Un benvenuto curato e coerente anche quando sei occupato",
      "Meno richieste ripetitive, più tempo per l'accoglienza di persona",
      "I tuoi consigli locali valorizzati e facili da aggiornare",
    ],
    icon: "home",
  },
  {
    id: "case-vacanza",
    name: "Case vacanza",
    shortDescription:
      "Per chi ospita a distanza e ha bisogno che tutto sia chiaro anche senza essere presente di persona.",
    audience:
      "Per case vacanza, appartamenti turistici e affitti brevi, inclusi gli immobili gestiti a distanza.",
    guideHighlights: [
      "Self check-in: istruzioni passo a passo",
      "Accesso, chiavi, allarmi e utenze della casa",
      "Elettrodomestici e dotazioni dell'appartamento",
      "Regole della casa e gestione dei rifiuti",
      "Supermercati, farmacie e servizi utili nei dintorni",
    ],
    commonNeeds: [
      {
        title: "Ospiti a distanza, dubbi immediati",
        description:
          "Senza un riferimento chiaro, una domanda semplice può trasformarsi in una telefonata nel momento meno opportuno.",
      },
      {
        title: "Istruzioni difficili da spiegare a parole",
        description:
          "Caldaia, allarme, cassetta di sicurezza: descrivere questi passaggi in una chat è dispersivo per te e confuso per l'ospite.",
      },
      {
        title: "Check-in fai da te da rendere fluido",
        description:
          "Le istruzioni di accesso funzionano al meglio quando sono strutturate, ordinate e facili da seguire.",
      },
    ],
    potentialBenefits: [
      "Check-in autonomo più fluido e rassicurante",
      "Meno messaggi urgenti durante il soggiorno",
      "Indicazioni chiare che riducono fraintendimenti e improvvisazioni",
      "Un riferimento digitale che resta valido nel tempo",
    ],
    icon: "beach",
  },
  {
    id: "boutique-hotel",
    name: "Boutique hotel",
    shortDescription:
      "Per strutture con un'identità precisa, dove ogni dettaglio dell'esperienza ospite comunica il brand.",
    audience:
      "Per boutique hotel e piccoli hotel indipendenti con un posizionamento riconoscibile.",
    guideHighlights: [
      "Benvenuto in linea con il tono della struttura",
      "Servizi, orari e spazi dell'hotel",
      "Esperienze selezionate e consigli del concierge",
      "Informazioni utili per la città",
      "Contatti diretti dei reparti, sempre aggiornati",
    ],
    commonNeeds: [
      {
        title: "Coerenza del racconto di marca",
        description:
          "Materiali improvvisati o fogli stampati rischiano di non raccontare la stessa cura che si vive nei dettagli della struttura.",
      },
      {
        title: "Reception sotto pressione nei momenti di punta",
        description:
          "Nei picchi di arrivi, ogni minuto del front desk conta: ridurre le richieste ripetitive aiuta a dedicare tempo agli ospiti presenti.",
      },
      {
        title: "Esperienze da valorizzare",
        description:
          "Le migliori raccomandazioni spesso restano nella testa dello staff e non arrivano mai all'ospite al momento giusto.",
      },
    ],
    potentialBenefits: [
      "Un'esperienza digitale allineata al posizionamento della struttura",
      "Meno richieste repetitive al front desk",
      "Esperienze e servizi più facili da scoprire per l'ospite",
      "Contenuti aggiornabili senza ristampare nulla",
    ],
    icon: "sparkle",
  },
  {
    id: "property-manager",
    name: "Property manager",
    shortDescription:
      "Per chi gestisce più immobili e ha bisogno di un formato replicabile, ordinato e facile da mantenere.",
    audience:
      "Per property manager e gestori di portafogli di strutture ricettive.",
    guideHighlights: [
      "Struttura coerente, replicabile su ogni immobile",
      "Contenuti specifici per ciascuna casa o appartamento",
      "Processi di check-in standardizzati",
      "Informazioni di servizio per gli ospiti ricorrenti",
      "Riferimenti chiari per tempi di risposta e supporto",
    ],
    commonNeeds: [
      {
        title: "Molti immobili, formati diversi",
        description:
          "Senza uno schema comune, ogni struttura raccoglie e comunica le informazioni in modo diverso dal resto del portafoglio.",
      },
      {
        title: "Onboarding lento dei nuovi immobili",
        description:
          "Partire da un modello consolidato rende più semplice e rapido preparare la guida di ogni nuova struttura.",
      },
      {
        title: "Consistenza del servizio al cliente",
        description:
          "Gli ospiti si aspettano lo stesso standard di chiarezza in ogni struttura, anche con team diversi.",
      },
    ],
    potentialBenefits: [
      "Un formato unico e riconoscibile per tutto il portafoglio",
      "Tempi di preparazione più brevi per ogni nuova struttura",
      "Standard di comunicazione coerenti tra immobili e team",
      "Aggiornamenti centralizzati quando qualcosa cambia",
    ],
    icon: "briefcase",
  },
];
