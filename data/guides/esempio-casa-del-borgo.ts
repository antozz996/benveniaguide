/**
 * Guida di ESEMPIO con dati FITTIZI (struttura, persone, recapiti e luoghi).
 * Serve come modello per le guide dei clienti e come base per gli e2e.
 * Non rimuoverla: garantisce almeno un param a generateStaticParams.
 */
import type { GuideDefinition } from "@/lib/guide/types";

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const guide = {
  slug: "esempio-casa-del-borgo",
  isSample: true,
  defaultLang: "it",
  content: {
    it: {
      structure: {
        name: "Casa del Borgo",
        location: "Borgo di Esempio · guida di esempio",
        tagline: "Tutto quello che serve per il tuo soggiorno, a portata di telefono.",
        disclaimer: "Guida di esempio: struttura, nomi e recapiti sono fittizi.",
      },
      welcome: {
        eyebrow: "Benvenuti",
        title: "Benvenuti a Casa del Borgo!",
        message:
          "Siamo felici di ospitarvi. Qui trovate orari, Wi-Fi, regole della casa e i nostri consigli sul territorio. Per qualsiasi necessità scriveteci.",
        signature: "Anna · Host (esempio)",
        quickLinksTitle: "Accesso rapido",
        heroArt: "village",
        quickLinks: [
          { id: "quick-stay", screen: "stay", label: "Il tuo soggiorno", hint: "Check-in, Wi-Fi e servizi", icon: "bed" },
          { id: "quick-wifi", screen: "stay", label: "Wi-Fi", hint: "Rete e password", icon: "wifi" },
          { id: "quick-rules", screen: "stay", label: "Regole della casa", hint: "Buona convivenza", icon: "book" },
          { id: "quick-explore", screen: "explore", label: "Dintorni", hint: "Luoghi e consigli", icon: "map" },
          { id: "quick-contact", screen: "contacts", label: "Contatta l'host", hint: "Siamo qui per voi", icon: "phone" },
        ],
      },
      stay: {
        eyebrow: "Il tuo soggiorno",
        title: "Informazioni pratiche",
        intro: "Orari, servizi e poche regole per un soggiorno sereno.",
        checkin: {
          title: "Check-in",
          time: "Dalle 15:00 alle 19:00",
          detail: "Ti accogliamo all'ingresso. Se arrivi più tardi, scrivici: ti inviamo il codice del self check-in.",
        },
        checkout: {
          title: "Check-out",
          time: "Entro le 10:30",
          detail: "Lascia le chiavi nella cassetta accanto alla porta.",
        },
        wifi: {
          title: "Wi-Fi",
          networkLabel: "Rete",
          network: "CasaDelBorgo_Ospiti",
          passwordLabel: "Password",
          password: "esempio-2026",
          note: "Credenziali di esempio: nella guida reale trovi quelle della tua struttura.",
        },
        servicesTitle: "Servizi",
        services: [
          { id: "colazione", name: "Colazione", detail: "Servita in sala comune.", hours: "8:00 – 10:00", icon: "coffee" },
          { id: "parcheggio", name: "Parcheggio", detail: "Posto auto nel cortile interno.", icon: "car" },
          { id: "biancheria", name: "Biancheria", detail: "Cambio asciugamani su richiesta.", icon: "bath" },
          { id: "differenziata", name: "Raccolta differenziata", detail: "Bidoni in cortile, segui i colori.", icon: "recycle" },
        ],
        rulesTitle: "Regole della casa",
        rulesIntro: "Poche e semplici, per il benessere di tutti.",
        rules: [
          { id: "fumo", title: "Non si fuma all'interno", detail: "Puoi fumare in cortile." },
          { id: "silenzio", title: "Silenzio dalle 23:00 alle 7:00", detail: "Rispetta il riposo di ospiti e vicini." },
          { id: "animali", title: "Animali su richiesta", detail: "Avvisaci prima dell'arrivo." },
        ],
      },
      explore: {
        eyebrow: "Dintorni",
        title: "I nostri consigli",
        intro: "Luoghi a due passi da casa. Tocca una scheda per i dettagli.",
        groups: [
          {
            id: "attractions",
            label: "Da vedere",
            places: [
              {
                id: "piazza",
                name: "Piazza di Esempio",
                category: "Centro storico",
                distance: "3 min a piedi",
                description: "La piazza principale del borgo, con la fontana e il campanile.",
                tip: "La sera si anima con musica e tavolini all'aperto.",
                art: "village",
                mapsUrl: mapsSearch("Piazza di Esempio"),
              },
              {
                id: "sentiero",
                name: "Sentiero dei Colli",
                category: "Passeggiata",
                distance: "10 min a piedi",
                description: "Un anello facile tra uliveti e vigne, adatto a tutti.",
                tip: "Parti presto la mattina per goderti il fresco.",
                art: "path",
              },
            ],
          },
          {
            id: "dining",
            label: "Mangiare",
            places: [
              {
                id: "trattoria",
                name: "Trattoria di Esempio",
                category: "Cucina locale",
                distance: "5 min a piedi",
                description: "Piatti della tradizione e pasta fatta in casa.",
                tip: "Prenota nel weekend: è sempre piena.",
                art: "table",
              },
            ],
          },
          {
            id: "experiences",
            label: "Esperienze",
            places: [
              {
                id: "mercato",
                name: "Mercato del Sabato",
                category: "Mercato",
                distance: "4 min a piedi",
                description: "Prodotti del territorio, formaggi e frutta di stagione.",
                tip: "Arriva entro le 10 per la scelta migliore.",
                art: "market",
              },
            ],
          },
        ],
        detailLabels: { distance: "Distanza", tip: "Il nostro consiglio", close: "Chiudi" },
      },
      contacts: {
        eyebrow: "Contatti",
        title: "Siamo qui per voi",
        intro: "Per qualsiasi necessità durante il soggiorno.",
        host: {
          name: "Anna",
          role: "Host (esempio)",
          note: "Rispondo di solito entro un'ora, dalle 8:00 alle 21:00.",
        },
        actions: { call: "Chiama l'host", email: "Scrivi un'email", directions: "Indicazioni per arrivare" },
        links: {
          email: "ospiti@example.com",
          mapsUrl: mapsSearch("Borgo di Esempio"),
        },
        faqTitle: "Domande frequenti",
        faq: [
          { q: "Posso lasciare i bagagli dopo il check-out?", a: "Sì, fino alle 14:00 nella sala comune." },
          { q: "C'è un supermercato vicino?", a: "Sì, a 5 minuti a piedi in direzione della piazza." },
        ],
      },
      ui: {
        languageLabel: "Lingua",
        sectionsLabel: "Sezioni della guida",
        copyLabel: "Copia",
        toastCopied: "Password copiata negli appunti.",
        toastCopyFailed: "Copia non riuscita: seleziona e copia la password a mano.",
        tabs: { welcome: "Benvenuto", stay: "Soggiorno", explore: "Esplora", contacts: "Contatti" },
      },
    },
    en: {
      structure: {
        name: "Casa del Borgo",
        location: "Sample Village · sample guide",
        tagline: "Everything you need for your stay, right on your phone.",
        disclaimer: "Sample guide: property, names and contacts are fictitious.",
      },
      welcome: {
        eyebrow: "Welcome",
        title: "Welcome to Casa del Borgo!",
        message:
          "We're glad to have you. Here you'll find times, Wi-Fi, house rules and our local tips. Message us for anything you need.",
        signature: "Anna · Host (sample)",
        quickLinksTitle: "Quick access",
        heroArt: "village",
        quickLinks: [
          { id: "quick-stay", screen: "stay", label: "Your stay", hint: "Check-in, Wi-Fi and services", icon: "bed" },
          { id: "quick-wifi", screen: "stay", label: "Wi-Fi", hint: "Network and password", icon: "wifi" },
          { id: "quick-rules", screen: "stay", label: "House rules", hint: "Living together", icon: "book" },
          { id: "quick-explore", screen: "explore", label: "Nearby", hint: "Places and tips", icon: "map" },
          { id: "quick-contact", screen: "contacts", label: "Contact the host", hint: "We're here for you", icon: "phone" },
        ],
      },
      stay: {
        eyebrow: "Your stay",
        title: "Practical information",
        intro: "Times, services and a few rules for a relaxing stay.",
        checkin: {
          title: "Check-in",
          time: "3:00 pm – 7:00 pm",
          detail: "We'll meet you at the entrance. Arriving later? Message us and we'll send the self check-in code.",
        },
        checkout: {
          title: "Check-out",
          time: "By 10:30 am",
          detail: "Leave the keys in the box next to the door.",
        },
        wifi: {
          title: "Wi-Fi",
          networkLabel: "Network",
          network: "CasaDelBorgo_Ospiti",
          passwordLabel: "Password",
          password: "esempio-2026",
          note: "Sample credentials: the real guide shows your property's own.",
        },
        servicesTitle: "Services",
        services: [
          { id: "colazione", name: "Breakfast", detail: "Served in the common room.", hours: "8:00 – 10:00 am", icon: "coffee" },
          { id: "parcheggio", name: "Parking", detail: "Parking space in the inner courtyard.", icon: "car" },
          { id: "biancheria", name: "Linen", detail: "Towel change on request.", icon: "bath" },
          { id: "differenziata", name: "Recycling", detail: "Bins in the courtyard, follow the colours.", icon: "recycle" },
        ],
        rulesTitle: "House rules",
        rulesIntro: "Few and simple, for everyone's comfort.",
        rules: [
          { id: "fumo", title: "No smoking indoors", detail: "You can smoke in the courtyard." },
          { id: "silenzio", title: "Quiet hours 11 pm – 7 am", detail: "Please respect guests and neighbours." },
          { id: "animali", title: "Pets on request", detail: "Let us know before arrival." },
        ],
      },
      explore: {
        eyebrow: "Nearby",
        title: "Our tips",
        intro: "Places just a few steps away. Tap a card for details.",
        groups: [
          {
            id: "attractions",
            label: "Sights",
            places: [
              {
                id: "piazza",
                name: "Piazza di Esempio",
                category: "Old town",
                distance: "3 min walk",
                description: "The village's main square, with the fountain and bell tower.",
                tip: "In the evening it comes alive with music and outdoor tables.",
                art: "village",
                mapsUrl: mapsSearch("Piazza di Esempio"),
              },
              {
                id: "sentiero",
                name: "Hills Trail",
                category: "Walk",
                distance: "10 min walk",
                description: "An easy loop through olive groves and vineyards.",
                tip: "Start early in the morning to enjoy the cool air.",
                art: "path",
              },
            ],
          },
          {
            id: "dining",
            label: "Eat",
            places: [
              {
                id: "trattoria",
                name: "Trattoria di Esempio",
                category: "Local cuisine",
                distance: "5 min walk",
                description: "Traditional dishes and homemade pasta.",
                tip: "Book at weekends: it's always full.",
                art: "table",
              },
            ],
          },
          {
            id: "experiences",
            label: "Experiences",
            places: [
              {
                id: "mercato",
                name: "Saturday Market",
                category: "Market",
                distance: "4 min walk",
                description: "Local produce, cheese and seasonal fruit.",
                tip: "Arrive by 10 am for the best choice.",
                art: "market",
              },
            ],
          },
        ],
        detailLabels: { distance: "Distance", tip: "Our tip", close: "Close" },
      },
      contacts: {
        eyebrow: "Contact",
        title: "We're here for you",
        intro: "For anything you need during your stay.",
        host: {
          name: "Anna",
          role: "Host (sample)",
          note: "I usually reply within an hour, 8 am – 9 pm.",
        },
        actions: { call: "Call the host", email: "Send an email", directions: "Directions" },
        links: {
          email: "ospiti@example.com",
          mapsUrl: mapsSearch("Borgo di Esempio"),
        },
        faqTitle: "FAQ",
        faq: [
          { q: "Can I leave my luggage after check-out?", a: "Yes, until 2 pm in the common room." },
          { q: "Is there a supermarket nearby?", a: "Yes, a 5-minute walk towards the square." },
        ],
      },
      ui: {
        languageLabel: "Language",
        sectionsLabel: "Guide sections",
        copyLabel: "Copy",
        toastCopied: "Password copied to clipboard.",
        toastCopyFailed: "Copy failed: please select and copy the password manually.",
        tabs: { welcome: "Welcome", stay: "Stay", explore: "Explore", contacts: "Contact" },
      },
    },
  },
} satisfies GuideDefinition;
