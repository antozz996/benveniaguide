/**
 * Dati della Guest Guide dimostrativa (IT/EN).
 * ATTENZIONE: struttura, nomi, credenziali e luoghi sono fittizi e chiaramente
 * identificati come demo. La demo pubblica non deve mai contenere dati reali.
 */

export type DemoLang = "it" | "en";

export type DemoScreen = "welcome" | "stay" | "explore" | "contacts";

export type PlaceArt =
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

export interface DemoPlace {
  id: string;
  name: string;
  category: string;
  distance: string;
  description: string;
  tip: string;
  art: PlaceArt;
}

export interface DemoPlaceGroup {
  id: "attractions" | "dining" | "experiences";
  label: string;
  places: DemoPlace[];
}

export type ServiceIcon =
  | "coffee"
  | "car"
  | "waves"
  | "bath"
  | "snowflake"
  | "recycle";

export interface DemoService {
  id: string;
  name: string;
  detail: string;
  hours?: string;
  icon: ServiceIcon;
}

export interface DemoRule {
  id: string;
  title: string;
  detail: string;
}

export interface DemoFaqItem {
  q: string;
  a: string;
}

export interface DemoQuickLink {
  id: string;
  screen: DemoScreen;
  label: string;
  hint: string;
  icon: "bed" | "wifi" | "book" | "map" | "phone";
}

export interface DemoGuideContent {
  structure: {
    name: string;
    location: string;
    tagline: string;
    disclaimer: string;
  };
  welcome: {
    eyebrow: string;
    title: string;
    message: string;
    signature: string;
    quickLinksTitle: string;
    quickLinks: DemoQuickLink[];
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
    services: DemoService[];
    rulesTitle: string;
    rulesIntro: string;
    rules: DemoRule[];
  };
  explore: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: DemoPlaceGroup[];
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
    faqTitle: string;
    faq: DemoFaqItem[];
  };
  ui: {
    demoBadge: string;
    demoNotice: string;
    toastDemo: string;
    openFullscreen: string;
    closeFullscreen: string;
    backToSite: string;
    languageLabel: string;
    statusTime: string;
    tabs: Record<DemoScreen, string>;
  };
}

export const demoGuide: Record<DemoLang, DemoGuideContent> = {
  it: {
    structure: {
      name: "Casa Demo · Vista Lago",
      location: "Lago di Como · struttura dimostrativa",
      tagline: "La tua guida per un soggiorno sereno.",
      disclaimer: "Demo: struttura, nomi e dati sono fittizi.",
    },
    welcome: {
      eyebrow: "Benvenuti",
      title: "Ciao Marta e Paolo, benvenuti a Casa Demo!",
      message:
        "Siamo felici di ospitarvi. In questa guida trovate tutto ciò che serve per il vostro soggiorno: orari, Wi-Fi, regole della casa e i nostri consigli preferiti sul territorio. Se vi serve qualcosa, scriveteci: siamo a un messaggio di distanza.",
      signature: "Giulia · Host (demo)",
      quickLinksTitle: "Accesso rapido",
      quickLinks: [
        {
          id: "quick-stay",
          screen: "stay",
          label: "Il tuo soggiorno",
          hint: "Check-in, Wi-Fi e servizi",
          icon: "bed",
        },
        {
          id: "quick-wifi",
          screen: "stay",
          label: "Wi-Fi",
          hint: "Rete e password (demo)",
          icon: "wifi",
        },
        {
          id: "quick-rules",
          screen: "stay",
          label: "Regole della casa",
          hint: "Buona convivenza",
          icon: "book",
        },
        {
          id: "quick-explore",
          screen: "explore",
          label: "Esplora il territorio",
          hint: "Luoghi e consigli",
          icon: "map",
        },
        {
          id: "quick-contact",
          screen: "contacts",
          label: "Contatta l'host",
          hint: "Siamo qui per voi",
          icon: "phone",
        },
      ],
    },
    stay: {
      eyebrow: "Il tuo soggiorno",
      title: "Tutte le informazioni pratiche",
      intro:
        "Gli orari, i servizi e le poche regole che rendono il soggiorno piacevole per tutti.",
      checkin: {
        title: "Check-in",
        time: "Dalle 15:00 alle 20:00",
        detail:
          "Ti accogliamo di persona con un benvenuto e le chiavi. Se arrivi dopo le 20:00, scrivici: attiviamo il self check-in con codice.",
      },
      checkout: {
        title: "Check-out",
        time: "Entro le 10:00",
        detail:
          "Lascia le chiavi sul tavolo dell'ingresso e chiudi la porta. Late check-out su richiesta, in base alla disponibilità.",
      },
      wifi: {
        title: "Wi-Fi",
        networkLabel: "Rete",
        network: "CasaDemo_Guest",
        passwordLabel: "Password",
        password: "demo-2026",
        note: "Credenziali dimostrative: nella guida reale vedrai solo quelle della tua struttura.",
      },
      servicesTitle: "Servizi disponibili",
      services: [
        {
          id: "colazione",
          name: "Colazione",
          detail: "Dolce e salata, con prodotti della zona.",
          hours: "8:00 – 10:00",
          icon: "coffee",
        },
        {
          id: "parcheggio",
          name: "Parcheggio interno",
          detail: "Posto gratuito all'interno della proprietà.",
          icon: "car",
        },
        {
          id: "piscina",
          name: "Piscina",
          detail: "Aperta in stagione, con lettini e ombrelloni.",
          hours: "9:00 – 19:00",
          icon: "waves",
        },
        {
          id: "biancheria",
          name: "Biancheria e asciugamani",
          detail: "Set extra disponibili su richiesta.",
          icon: "bath",
        },
        {
          id: "clima",
          name: "Aria condizionata",
          detail: "Regolabile in ogni camera. Tieni le finestre chiuse quando è accesa.",
          icon: "snowflake",
        },
        {
          id: "differenziata",
          name: "Raccolta differenziata",
          detail: "I contenitori sono nel cortile: segui le etichette colorate.",
          icon: "recycle",
        },
      ],
      rulesTitle: "Regole della casa",
      rulesIntro: "Poche e semplici, per il benessere di tutti gli ospiti.",
      rules: [
        {
          id: "fumo",
          title: "Non si fuma all'interno",
          detail: "È possibile fumare in terrazza, lontano dalle camere.",
        },
        {
          id: "silenzio",
          title: "Silenzio dalle 23:00 alle 7:00",
          detail: "Rispetta il riposo degli altri ospiti e dei vicini.",
        },
        {
          id: "animali",
          title: "Animali su richiesta",
          detail: "Segnalaci in anticipo: troveremo la sistemazione migliore per tutti.",
        },
        {
          id: "ospiti",
          title: "Ospiti aggiuntivi da segnalare",
          detail: "Comunicaci in anticipo eventuali visitatori durante il soggiorno.",
        },
        {
          id: "cucina",
          title: "Cucina condivisa",
          detail: "Si può usare; lasciala in ordine dopo ogni utilizzo.",
        },
      ],
    },
    explore: {
      eyebrow: "Esplora",
      title: "Il territorio, secondo noi",
      intro:
        "Luoghi che amiamo, a due passi da qui. Tocca una scheda per i dettagli e il nostro consiglio.",
      groups: [
        {
          id: "attractions",
          label: "Attrazioni",
          places: [
            {
              id: "lungolago",
              name: "Lungolago di Esempio",
              category: "Passeggiata",
              distance: "5 min a piedi",
              description:
                "Una passeggiata lungo l'acqua con vista sul promontorio e sulle barche ormeggiate. Panchine e fontanelle lungo tutto il percorso.",
              tip: "Il momento migliore è il tramonto: la luce colora la riva opposta.",
              art: "lake",
            },
            {
              id: "borgo-alto",
              name: "Borgo Alto",
              category: "Centro storico",
              distance: "12 min a piedi",
              description:
                "Vicoli in pietra, una piazzetta raccolta e il campanile che segna le ore. Botteghe e piccole botteghe artigiane.",
              tip: "Il sabato mattina il mercato riempie la piazza principale.",
              art: "village",
            },
            {
              id: "belvedere",
              name: "Belvedere del Faro",
              category: "Panorama",
              distance: "20 min a piedi · 5 min in auto",
              description:
                "Il punto più panoramico della zona: si abbraccia tutto il lago e le montagne sullo sfondo.",
              tip: "Indossa scarpe comode: l'ultimo tratto è in salita.",
              art: "hills",
            },
            {
              id: "parco-rose",
              name: "Parco delle Rose",
              category: "Giardini",
              distance: "8 min a piedi",
              description:
                "Giardini pubblici curati, con un'area gioco per i bambini e prati ombreggiati.",
              tip: "Perfetto per una pausa pomeridiana con i più piccoli.",
              art: "garden",
            },
          ],
        },
        {
          id: "dining",
          label: "Dove mangiare",
          places: [
            {
              id: "trattoria-vela",
              name: "Trattoria La Vela",
              category: "Cucina di lago",
              distance: "10 min a piedi",
              description:
                "Piatti di pesce d'acqua dolce e ricette di famiglia, con terrazza sulla riva.",
              tip: "Chiedi il tavolo esterno: la vista vale tutta la cena.",
              art: "table",
            },
            {
              id: "osteria-borgo",
              name: "Osteria del Borgo",
              category: "Cucina tipica",
              distance: "12 min a piedi",
              description:
                "Cucina del territorio, materie prime locali e cantina con etichette di piccoli produttori.",
              tip: "Nel weekend conviene prenotare qualche giorno prima.",
              art: "table",
            },
            {
              id: "caffe-panorama",
              name: "Caffè Panorama",
              category: "Colazioni e aperitivi",
              distance: "6 min a piedi",
              description:
                "Caffè, brioche e aperitivi serviti con calma. Terrazza al primo piano affacciata sul golfo.",
              tip: "La terrazza al primo piano è la più tranquilla della zona.",
              art: "coffee",
            },
            {
              id: "gelateria-riviera",
              name: "Gelateria Riviera",
              category: "Gelateria artigianale",
              distance: "4 min a piedi",
              description:
                "Gelato artigianale con gusti che cambiano con le stagioni e le materie prime.",
              tip: "I gusti alla frutta sono i nostri preferiti d'estate.",
              art: "gelato",
            },
          ],
        },
        {
          id: "experiences",
          label: "Esperienze",
          places: [
            {
              id: "tour-barca",
              name: "Tour in barca al tramonto",
              category: "Esperienza",
              distance: "Partenza dal molo · 3 min",
              description:
                "Due ore tra le insenature del lago, con sosta per un brindisi al tramonto.",
              tip: "Prenota con un giorno di anticipo: i posti sono limitati.",
              art: "boat",
            },
            {
              id: "mercato",
              name: "Mercato del sabato",
              category: "Esperienza",
              distance: "12 min a piedi",
              description:
                "Prodotti locali, formaggi, miele e artigianato nel cuore del Borgo Alto.",
              tip: "Arriva presto: i banchi migliori si svuotano entro mezzogiorno.",
              art: "market",
            },
            {
              id: "sentiero-ulivi",
              name: "Sentiero degli Ulivi",
              category: "Escursione facile",
              distance: "15 min in auto",
              description:
                "Un anello di un'ora e mezza tra ulivi e muretti a secco, con vista continua sul lago.",
              tip: "Porta acqua e un cappello: c'è poca ombra.",
              art: "path",
            },
          ],
        },
      ],
      detailLabels: {
        distance: "Distanza",
        tip: "Il consiglio di Giulia",
        close: "Chiudi",
      },
    },
    contacts: {
      eyebrow: "Contatti",
      title: "Siamo qui per voi",
      intro:
        "Per qualsiasi necessità durante il soggiorno, scrivici o chiamaci: rispondiamo volentieri.",
      host: {
        name: "Giulia",
        role: "Host della struttura (demo)",
        note: "Disponibile ogni giorno dalle 8:00 alle 21:00. Per emergenze notturne, il numero è sempre attivo.",
      },
      actions: {
        call: "Chiama l'host",
        email: "Scrivi un'email",
        directions: "Indicazioni per arrivare",
      },
      faqTitle: "Domande frequenti",
      faq: [
        {
          q: "Possiamo arrivare dopo le 20:00?",
          a: "Sì. Scrivici e ti invieremo il codice per il self check-in; troverai le istruzioni complete nella guida.",
        },
        {
          q: "Dove parcheggiamo l'auto?",
          a: "Il parcheggio interno è gratuito per gli ospiti. Il posto ti verrà indicato al check-in.",
        },
        {
          q: "La colazione è inclusa?",
          a: "Sì, dalle 8:00 alle 10:00. Segnalaci eventuali intolleranze o esigenze particolari.",
        },
      ],
    },
    ui: {
      demoBadge: "Demo",
      demoNotice: "Stai esplorando una guida dimostrativa",
      toastDemo:
        "Nella guida reale questa azione è attiva: qui sei in modalità demo.",
      openFullscreen: "Apri a schermo intero",
      closeFullscreen: "Chiudi la demo",
      backToSite: "Torna al sito",
      languageLabel: "Lingua della guida",
      statusTime: "9:41",
      tabs: {
        welcome: "Benvenuto",
        stay: "Soggiorno",
        explore: "Esplora",
        contacts: "Contatti",
      },
    },
  },
  en: {
    structure: {
      name: "Casa Demo · Lake View",
      location: "Lake Como · demo property",
      tagline: "Your guide to a peaceful stay.",
      disclaimer: "Demo: property, names and data are fictional.",
    },
    welcome: {
      eyebrow: "Welcome",
      title: "Hi Marta and Paolo, welcome to Casa Demo!",
      message:
        "We are happy to host you. In this guide you will find everything you need for your stay: times, Wi-Fi, house rules and our favorite local tips. If you need anything, just write to us: we are one message away.",
      signature: "Giulia · Host (demo)",
      quickLinksTitle: "Quick access",
      quickLinks: [
        {
          id: "quick-stay",
          screen: "stay",
          label: "Your stay",
          hint: "Check-in, Wi-Fi and services",
          icon: "bed",
        },
        {
          id: "quick-wifi",
          screen: "stay",
          label: "Wi-Fi",
          hint: "Network and password (demo)",
          icon: "wifi",
        },
        {
          id: "quick-rules",
          screen: "stay",
          label: "House rules",
          hint: "Living well together",
          icon: "book",
        },
        {
          id: "quick-explore",
          screen: "explore",
          label: "Explore the area",
          hint: "Places and tips",
          icon: "map",
        },
        {
          id: "quick-contact",
          screen: "contacts",
          label: "Contact the host",
          hint: "We are here for you",
          icon: "phone",
        },
      ],
    },
    stay: {
      eyebrow: "Your stay",
      title: "All the practical information",
      intro:
        "Times, services and the few rules that make the stay pleasant for everyone.",
      checkin: {
        title: "Check-in",
        time: "From 3:00 PM to 8:00 PM",
        detail:
          "We welcome you in person with a warm hello and the keys. If you arrive after 8:00 PM, write to us: we activate self check-in with a code.",
      },
      checkout: {
        title: "Check-out",
        time: "By 10:00 AM",
        detail:
          "Leave the keys on the entrance table and close the door. Late check-out on request, subject to availability.",
      },
      wifi: {
        title: "Wi-Fi",
        networkLabel: "Network",
        network: "CasaDemo_Guest",
        passwordLabel: "Password",
        password: "demo-2026",
        note: "Demo credentials: the real guide only shows your own property details.",
      },
      servicesTitle: "Available services",
      services: [
        {
          id: "breakfast",
          name: "Breakfast",
          detail: "Sweet and savory, with local products.",
          hours: "8:00 – 10:00 AM",
          icon: "coffee",
        },
        {
          id: "parking",
          name: "On-site parking",
          detail: "Free spot inside the property.",
          icon: "car",
        },
        {
          id: "pool",
          name: "Pool",
          detail: "Open in season, with sun loungers and umbrellas.",
          hours: "9:00 AM – 7:00 PM",
          icon: "waves",
        },
        {
          id: "linen",
          name: "Linen and towels",
          detail: "Extra sets available on request.",
          icon: "bath",
        },
        {
          id: "ac",
          name: "Air conditioning",
          detail: "Adjustable in every room. Keep windows closed while it is on.",
          icon: "snowflake",
        },
        {
          id: "recycling",
          name: "Recycling",
          detail: "Bins are in the courtyard: follow the colored labels.",
          icon: "recycle",
        },
      ],
      rulesTitle: "House rules",
      rulesIntro: "Few and simple, for the comfort of every guest.",
      rules: [
        {
          id: "smoking",
          title: "No smoking indoors",
          detail: "You can smoke on the terrace, away from the rooms.",
        },
        {
          id: "quiet",
          title: "Quiet hours from 11:00 PM to 7:00 AM",
          detail: "Please respect the rest of other guests and neighbors.",
        },
        {
          id: "pets",
          title: "Pets on request",
          detail: "Let us know in advance: we will find the best arrangement for everyone.",
        },
        {
          id: "visitors",
          title: "Please report extra visitors",
          detail: "Tell us in advance about any visitors during your stay.",
        },
        {
          id: "kitchen",
          title: "Shared kitchen",
          detail: "You are welcome to use it; please leave it tidy after each use.",
        },
      ],
    },
    explore: {
      eyebrow: "Explore",
      title: "The area, our way",
      intro:
        "Places we love, a short walk from here. Tap a card for details and our tip.",
      groups: [
        {
          id: "attractions",
          label: "Attractions",
          places: [
            {
              id: "lungolago",
              name: "Esempio Lakefront",
              category: "Walk",
              distance: "5 min on foot",
              description:
                "A walk along the water with views of the promontory and moored boats. Benches and drinking fountains along the way.",
              tip: "The best time is at sunset: the light colors the opposite shore.",
              art: "lake",
            },
            {
              id: "borgo-alto",
              name: "Borgo Alto",
              category: "Old town",
              distance: "12 min on foot",
              description:
                "Stone alleys, a small square and the bell tower marking the hours. Shops and small artisan workshops.",
              tip: "On Saturday mornings the market fills the main square.",
              art: "village",
            },
            {
              id: "belvedere",
              name: "Lighthouse Belvedere",
              category: "Viewpoint",
              distance: "20 min on foot · 5 min by car",
              description:
                "The most scenic spot in the area: you can take in the whole lake with the mountains behind.",
              tip: "Wear comfortable shoes: the last stretch is uphill.",
              art: "hills",
            },
            {
              id: "parco-rose",
              name: "Rose Park",
              category: "Gardens",
              distance: "8 min on foot",
              description:
                "Well-kept public gardens with a playground for children and shaded lawns.",
              tip: "Perfect for an afternoon break with little ones.",
              art: "garden",
            },
          ],
        },
        {
          id: "dining",
          label: "Where to eat",
          places: [
            {
              id: "trattoria-vela",
              name: "Trattoria La Vela",
              category: "Lake cuisine",
              distance: "10 min on foot",
              description:
                "Freshwater fish dishes and family recipes, with a terrace on the shore.",
              tip: "Ask for an outdoor table: the view is worth the whole dinner.",
              art: "table",
            },
            {
              id: "osteria-borgo",
              name: "Osteria del Borgo",
              category: "Local cuisine",
              distance: "12 min on foot",
              description:
                "Regional cooking, local ingredients and a wine list from small producers.",
              tip: "On weekends it is best to book a few days ahead.",
              art: "table",
            },
            {
              id: "caffe-panorama",
              name: "Caffè Panorama",
              category: "Breakfast and aperitivo",
              distance: "6 min on foot",
              description:
                "Coffee, pastries and aperitivi served without rush. First-floor terrace overlooking the gulf.",
              tip: "The first-floor terrace is the quietest spot in town.",
              art: "coffee",
            },
            {
              id: "gelateria-riviera",
              name: "Riviera Gelato",
              category: "Artisan gelato",
              distance: "4 min on foot",
              description:
                "Artisan gelato with flavors that change with the seasons and local ingredients.",
              tip: "The fruit flavors are our summer favorites.",
              art: "gelato",
            },
          ],
        },
        {
          id: "experiences",
          label: "Experiences",
          places: [
            {
              id: "tour-barca",
              name: "Sunset boat tour",
              category: "Experience",
              distance: "Departs from the pier · 3 min",
              description:
                "Two hours among the lake inlets, with a stop for a toast at sunset.",
              tip: "Book one day ahead: seats are limited.",
              art: "boat",
            },
            {
              id: "mercato",
              name: "Saturday market",
              category: "Experience",
              distance: "12 min on foot",
              description:
                "Local produce, cheese, honey and crafts in the heart of Borgo Alto.",
              tip: "Come early: the best stalls sell out by noon.",
              art: "market",
            },
            {
              id: "sentiero-ulivi",
              name: "Olive Grove Trail",
              category: "Easy hike",
              distance: "15 min by car",
              description:
                "A one-and-a-half-hour loop through olive groves and dry-stone walls, with constant lake views.",
              tip: "Bring water and a hat: there is little shade.",
              art: "path",
            },
          ],
        },
      ],
      detailLabels: {
        distance: "Distance",
        tip: "Giulia's tip",
        close: "Close",
      },
    },
    contacts: {
      eyebrow: "Contact",
      title: "We are here for you",
      intro:
        "For anything you need during your stay, write or call us: we are happy to help.",
      host: {
        name: "Giulia",
        role: "Property host (demo)",
        note: "Available every day from 8:00 AM to 9:00 PM. For night emergencies, the number is always reachable.",
      },
      actions: {
        call: "Call the host",
        email: "Send an email",
        directions: "Directions to the property",
      },
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "Can we arrive after 8:00 PM?",
          a: "Yes. Write to us and we will send the self check-in code; you will find full instructions in the guide.",
        },
        {
          q: "Where can we park the car?",
          a: "On-site parking is free for guests. We will show you your spot at check-in.",
        },
        {
          q: "Is breakfast included?",
          a: "Yes, from 8:00 to 10:00 AM. Let us know about any intolerances or special needs.",
        },
      ],
    },
    ui: {
      demoBadge: "Demo",
      demoNotice: "You are exploring a demo guide",
      toastDemo:
        "In the real guide this action is live: here you are in demo mode.",
      openFullscreen: "Open full screen",
      closeFullscreen: "Close the demo",
      backToSite: "Back to the website",
      languageLabel: "Guide language",
      statusTime: "9:41",
      tabs: {
        welcome: "Welcome",
        stay: "Stay",
        explore: "Explore",
        contacts: "Contact",
      },
    },
  },
};

export const demoScreenOrder: DemoScreen[] = [
  "welcome",
  "stay",
  "explore",
  "contacts",
];
