/**
 * Contenuti della home: problema e benefici.
 * I problemi sono presentati come situazioni ricorrenti del settore e non
 * come caratteristiche certe di ogni struttura. I benefici sono descritti
 * come potenziali, senza numeri o risultati garantiti.
 */

export interface ProblemItem {
  id: string;
  question: string;
  context: string;
}

export const problemItems: ProblemItem[] = [
  {
    id: "checkin",
    question: "«A che ora possiamo fare il check-in?»",
    context: "La stessa risposta, riscritta ogni settimana su chat ed email.",
  },
  {
    id: "wifi",
    question: "«Qual è la password del Wi-Fi?»",
    context: "Un dettaglio minuscolo che interrompe il tuo lavoro in giornata.",
  },
  {
    id: "parcheggio",
    question: "«Dove lasciamo l'auto?»",
    context: "Spiegazioni che funzionano molto meglio con una mappa o due righe chiare.",
  },
  {
    id: "checkout",
    question: "«Come funziona il check-out?»",
    context: "Un'indicazione semplice che, se fuori posto, diventa una telefonata.",
  },
  {
    id: "cena",
    question: "«Dove si cena qui vicino?»",
    context: "I tuoi consigli migliori esistono: è solo difficile darli al momento giusto.",
  },
];

export const problemFragments = [
  { label: "Email di conferma", note: "Prima della partenza, poi sepolta tra i messaggi." },
  { label: "Chat e messaggistica", note: "Due righe qui, una risposta lì." },
  { label: "Note e fogli stampati", note: "In cucina, allo sportello, ovunque tranne che nelle mani dell'ospite." },
  { label: "Telefonate al momento sbagliato", note: "Durante la colazione, con il forno acceso." },
];

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: "search" | "heart" | "messages" | "map" | "spring";
}

export const benefits: BenefitItem[] = [
  {
    id: "accessibili",
    title: "Informazioni più facilmente accessibili",
    description:
      "Check-in, Wi-Fi, servizi e regole in un unico posto, ordinate e facili da trovare dal telefono.",
    icon: "search",
  },
  {
    id: "brand",
    title: "Accoglienza digitale coerente con il brand",
    description:
      "Ogni ospite ritrova lo stesso tono e la stessa cura che vive nella struttura, anche in digitale.",
    icon: "heart",
  },
  {
    id: "richieste",
    title: "Potenziale riduzione delle richieste ripetitive",
    description:
      "Quando le risposte sono sempre a portata di mano, molte domande trovano risposta da sole.",
    icon: "messages",
  },
  {
    id: "consigli",
    title: "Valorizzazione dei consigli locali",
    description:
      "I tuoi posti preferiti diventano una sezione curata della guida, pronta per l'ospite giusto al momento giusto.",
    icon: "map",
  },
  {
    id: "chiarezza",
    title: "Maggiore chiarezza per gli ospiti",
    description:
      "Meno incertezze nei momenti chiave del soggiorno: arrivo, permanenza e ripartenza.",
    icon: "spring",
  },
];
