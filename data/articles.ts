/**
 * Risorse editoriali (articoli).
 *
 * Contenuti di consulenza e metodo, senza dati inventati: niente statistiche,
 * percentuali, recensioni o citazioni non verificabili. Le date sono costanti
 * (render deterministico con cacheComponents).
 */

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface ArticleLink {
  label: string;
  href: string;
  description: string;
}

export interface Article {
  slug: string;
  /** Titolo H1 e og:title. */
  title: string;
  /** Titolo breve per <title> e card. */
  seoTitle: string;
  description: string;
  topic: string;
  /** Data di pubblicazione, costante. */
  date: string;
  displayDate: string;
  readingMinutes: number;
  intro: string;
  sections: ArticleSection[];
  relatedLinks: ArticleLink[];
}

export const articles: Article[] = [
  {
    slug: "ridurre-domande-ripetitive-ospiti",
    title:
      "Come ridurre le domande ripetitive degli ospiti (senza rispondere più in fretta)",
    seoTitle: "Ridurre le domande ripetitive degli ospiti",
    description:
      "Check-in, Wi-Fi, parcheggio, check-out: le richieste che tornano ogni settimana si riducono quando le risposte hanno un posto unico e prevedibile. Metodo pratico per B&B e case vacanza.",
    topic: "Ospitalità",
    date: "2026-10-10",
    displayDate: "10 ottobre 2026",
    readingMinutes: 5,
    intro:
      "Se gestisci una struttura ricettiva, conosci bene quel momento: stai preparando la colazione o sei in macchina, e arriva il messaggio \u201cscusa, qual è la password del Wi-Fi?\u201d. La tentazione è rispondere più velocemente. Il problema, però, non è la velocità: è che quella risposta non ha un posto dove restare.",
    sections: [
      {
        heading: "Perché le domande si ripetono",
        paragraphs: [
          "Le domande degli ospiti non si ripetono perché sono distratti: si ripetono perché le informazioni vivono in posti diversi e nessuno di questi posti è prevedibile. L'orario di check-in è nell'email di conferma, la password del Wi-Fi è su un foglietto in cucina, il consiglio per cena l'hai dato a voce a un ospite su dieci.",
          "Ogni informazione dispersa ha un costo silenzioso: chi non la trova torna da te. E tu rispondi di nuovo, a mano, magari la sera tardi. Il ciclo si ripete finché le risposte non hanno una casa comune.",
        ],
      },
      {
        heading: "Le informazioni che generano più messaggi",
        paragraphs: [
          "Nella pratica dell'accoglienza, le richieste ricorrenti riguardano quasi sempre lo stesso nucleo di informazioni. Riconoscerle è il primo passo per organizzarle:",
        ],
        list: [
          "Orari di check-in e check-out, e cosa fare in caso di arrivo tardivo",
          "Wi-Fi: nome della rete e password, scritti in modo chiaro",
          "Parcheggio: dove, come, eventuali regole",
          "Come funziona la colazione o i servizi della struttura",
          "Regole di buona convivenza: silenzio, ospiti, spazi condivisi",
          "Consigli pratici: dove mangiare, cosa vedere, cosa evitare",
        ],
      },
      {
        heading: "Il principio: rispondere una volta, bene",
        paragraphs: [
          "Invece di rincorrere le domande, conviene spostare l'attenzione sulla risposta: scrivila una volta, completa e piacevole da leggere, e rendila sempre raggiungibile. È lo stesso principio di un buon cartello ben posizionato, applicato al telefono dell'ospite.",
          "Questo cambia anche la qualità della risposta. Un messaggio scritto di fretta \u201cil Wi-Fi è quello di prima\u201d lascia dubbi; una pagina che dice \u201crete CasaDemo_Guest, password demo-2026, posizionata nel corridoio vicino alla cucina\u201d li elimina.",
        ],
      },
      {
        heading: "Un punto unico di riferimento",
        paragraphs: [
          "Il modo più semplice per dare una casa alle risposte è una guida per gli ospiti: una pagina pensata per essere aperta dal telefono, con le informazioni di soggiorno in sezioni riconoscibili, e i tuoi consigli sul territorio nella stessa pagina.",
          "Quando ogni ospite riceve il link della guida al momento giusto \u2014 prima dell'arrivo o al check-in \u2014 le domande non spariscono, ma cambiano natura: molte trovano risposta da sole, e quelle che restano sono di solito quelle che vuoi ricevere davvero, perché riguardano il rapporto con le persone.",
        ],
      },
      {
        heading: "Da dove iniziare questa settimana",
        paragraphs: [
          "Non serve riscrivere tutto in una volta. Un percorso realistico in tre mosse:",
        ],
        list: [
          "Annota per una settimana le domande che ricevi: bastano cinque o sei voci ricorrenti",
          "Scrivi le risposte con calma, in modo completo e in tono tuo",
          "Metti tutte le risposte in un unico link da condividere con gli ospiti",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Come funziona Benvenia Guide",
        href: "/come-funziona",
        description:
          "Il percorso in tre passaggi: dai tuoi contenuti alla guida nelle mani degli ospiti.",
      },
      {
        label: "Prova la demo interattiva",
        href: "/demo",
        description:
          "Esplora una Guest Guide completa: soggiorno, territorio e contatti.",
      },
    ],
  },
  {
    slug: "cosa-deve-contenere-guida-ospiti",
    title: "Cosa deve contenere la guida per gli ospiti: la checklist completa",
    seoTitle: "Cosa deve contenere una guida per gli ospiti",
    description:
      "La checklist pratica per la guida agli ospiti di un B&B o casa vacanza: benvenuto, informazioni di soggiorno, regole, territorio e contatti. Con gli errori più comuni da evitare.",
    topic: "Guide agli ospiti",
    date: "2026-10-14",
    displayDate: "14 ottobre 2026",
    readingMinutes: 6,
    intro:
      "Una buona guida per gli ospiti fa una cosa semplice: risponde alle domande giuste, nel momento in cui l'ospite se le fa. Questa checklist nasce dall'ascolto delle esigenze più comuni delle strutture ricettive e ti aiuta a non dimenticare nulla di importante.",
    sections: [
      {
        heading: "1. Il benvenuto: il tono della struttura",
        paragraphs: [
          "La guida si apre come si apre una porta: con un saluto. Un breve messaggio di benvenuto con il nome dell'host e un tocco personale (\u201csiamo felici di ospitarvi\u201d, \u201cse ci vediamo in giardino, chiedeteci i nostri posti preferiti\u201d) comunica subito che dietro la struttura ci sono persone.",
          "Evita i testi impersonali copiati da modelli: due righe scritte da te valgono più di un paragrafo perfetto ma anonimo.",
        ],
      },
      {
        heading: "2. Le informazioni di soggiorno",
        paragraphs: [
          "È il cuore operativo della guida: tutto ciò che serve per vivere la struttura senza attriti. Verifica di aver incluso almeno questi elementi:",
        ],
        list: [
          "Orari di check-in e check-out, con cosa fare per arrivi tardivi",
          "Wi-Fi: nome della rete e password, ben visibili",
          "Colazione o servizi: orari, luogo, eventuali opzioni",
          "Parcheggio o come arrivare, se non è intuitivo",
          "Climatizzazione, riscaldamento, biancheria: come funzionano",
          "Dove trovare ciò che serve: asciugamani extra, ferro da stiro, kit di cortesia",
        ],
      },
      {
        heading: "3. Le regole di buona convivenza",
        paragraphs: [
          "Le regole non servono a mettere paletti: servono a far convivere ospiti con abitudini diverse. Scritte con il giusto tono, diventano parte dell'accoglienza. Meglio ancora se le spieghi con il perché (\u201cdopo le 23 teniamo le voci basse: le camere sono vicine\u201d).",
        ],
        list: [
          "Orari di silenzio e rispetto degli spazi condivisi",
          "Politica su ospiti aggiuntivi e visite",
          "Animali: ammessi o no, e con quali accortezze",
          "Fumo, candele, e altri comportamenti legati alla sicurezza",
          "Raccolta differenziata: due righe con le indicazioni locali",
        ],
      },
      {
        heading: "4. Il territorio: i tuoi consigli personali",
        paragraphs: [
          "Questa è la sezione che gli ospiti leggono con più piacere, ed è quella che nessuna piattaforma può scrivere al posto tuo. Non serve una guida turistica: bastano i tuoi posti, raccontati come li racconteresti a voce.",
        ],
        list: [
          "Dove mangiare: due o tre indirizzi per occasioni diverse, non dieci",
          "Cosa vedere a piedi: una passeggiata o un giro breve",
          "Esperienze: mercati, sentieri, tour che conosci e sai consigliare",
          "Logistica: supermercati, farmacie, fermate dei mezzi",
        ],
      },
      {
        heading: "5. I contatti e le richieste",
        paragraphs: [
          "Chiudi la guida dicendo con chiarezza come raggiungerti per cose urgenti e per tutto il resto. Distinguere i canali aiuta anche te: nelle prime righe indica come arrivare e stare nella struttura, alla fine come scriverti.",
          "Se hai canali diversi (telefono per le urgenze, messaggi per il resto), dillo esplicitamente: eviterai sia i silenzi sia le telefonate fuori orario.",
        ],
      },
      {
        heading: "Gli errori più comuni",
        paragraphs: [
          "Alcuni inciampi ricorrenti, facili da evitare:",
        ],
        list: [
          "Informazioni sparse tra email, fogli e chat, senza un posto unico",
          "Password e orari sepolti in fondo al testo: le cose pratiche vanno in alto",
          "Testi troppo lunghi: meglio sezioni brevi e titoli chiari",
          "Regole scritte in tono burocratico, come un avviso di condominio",
          "Contenuti vecchi: un orario cambiato e non aggiornato crea più problemi di quanti ne risolva",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Scopri le funzionalità",
        href: "/funzionalita",
        description:
          "Cosa può contenere la tua Guest Guide, sezione per sezione.",
      },
      {
        label: "Prova la demo interattiva",
        href: "/demo",
        description:
          "Vedi la checklist applicata a una struttura dimostrativa.",
      },
    ],
  },
  {
    slug: "guida-digitale-o-foglio-stampato",
    title:
      "Guida digitale o foglio stampato? Cosa cambia davvero per i tuoi ospiti",
    seoTitle: "Guida digitale o foglio stampato",
    description:
      "Confronto onesto tra guida per ospiti digitale e materiale stampato: aggiornamenti, raggiungibilità, lingue e cura del brand. Quando il foglio funziona ancora e quando il digitale fa la differenza.",
    topic: "Confronti",
    date: "2026-10-17",
    displayDate: "17 ottobre 2026",
    readingMinutes: 5,
    intro:
      "Il foglio stampato non è il nemico, e il digitale non è automaticamente meglio: sono strumenti diversi. Questo confronto guarda i criteri che contano davvero nella gestione quotidiana di una struttura, senza parteggiare per nessuno dei due.",
    sections: [
      {
        heading: "Aggiornare le informazioni",
        paragraphs: [
          "Un orario cambia, una password viene aggiornata, il forno della colazione si sposta di mezz'ora. Con un foglio stampato ogni modifica significa ristampare tutto e sostituire le copie già distribuite, comprese quelle che l'ospite si è portato in camera o ha fotografato.",
          "Con una guida digitale l'aggiornamento è immediato: correggi una volta e l'informazione è nuova per tutti, anche per l'ospite arrivato ieri. È il vantaggio più tangibile nella vita di tutti i giorni.",
        ],
      },
      {
        heading: "Raggiungere l'ospite al momento giusto",
        paragraphs: [
          "Il foglio ha un punto di forza: è fisico, lo trovi sulla scrivania, non chiede nulla. Il suo limite è che vive dove è stato messo: in cucina, sul bancone, nel cassetto.",
          "La guida digitale viaggia con l'ospite: può arrivare prima dell'arrivo, quando serve l'indirizzo e l'orario; durante il soggiorno, quando serve il Wi-Fi; e dopo la partenza, quando serve il consiglio per chi resta un altro giorno. Un link si condivide in un messaggio; un foglio no.",
        ],
      },
      {
        heading: "Lingue e accessibilità",
        paragraphs: [
          "Ristampare in tre lingue significa gestire tre fogli, tre versioni, tre aggiornamenti. In digitale le lingue sono versioni della stessa guida: si aggiungono e si mantengono senza moltiplicare la carta, e lo stesso vale per i caratteri grandi per chi vede poco, o il testo letto ad alta voce dallo smartphone.",
        ],
      },
      {
        heading: "Cura del brand e percezione",
        paragraphs: [
          "Il formato comunica prima del contenuto. Un foglio fotocopiato dice \u201csiamo una struttura pratica\u201d; un foglio piegato con cura dice \u201ccuriamo i dettagli\u201d. Allo stesso modo, una guida digitale ben fatta \u2014 con il tono della casa, la stessa palette dei tuoi materiali, foto o illustrazioni coerenti \u2014 estende l'esperienza del soggiorno nel telefono dell'ospite.",
          "Nessuno dei due formati è più \u201cserio\u201d dell'altro: conta la coerenza con il modo in cui accogli.",
        ],
      },
      {
        heading: "Quando il foglio stampato funziona ancora",
        paragraphs: [
          "Sarebbe disonesto dire che il digitale vince sempre. Il foglio resta utile quando: gli ospiti sono nella struttura e serve un promemoria a portata di mano; la connessione non è affidabile e vuoi un riferimento che non dipenda dalla rete; ci sono indicazioni che funzionano meglio come segnaposto fisico, come un QR code appeso o un piccolo promemoria sul tavolo.",
          "La scelta migliore, per molte strutture, è ibrida: guida digitale come riferimento completo, più un QR code stampato nei punti giusti che porta alla guida \u2014 il foglio non contiene l'informazione, la collega.",
        ],
      },
      {
        heading: "Il criterio di scelta",
        paragraphs: [
          "Prima di decidere, fai una domanda sola: quante volte all'anno le informazioni della tua struttura cambiano, e quanto ti costa ogni cambiamento? Se la risposta ti fa sorridere, il foglio va benissimo. Se ti fa sospirare, una guida digitale è probabilmente il passo giusto \u2014 e puoi iniziare con una versione semplice, senza stravolgere l'accoglienza che già funziona.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Prezzi e preventivi",
        href: "/prezzi",
        description:
          "Come funziona l'offerta: nessun listino, proposta su misura per la tua struttura.",
      },
      {
        label: "Richiedi una demo",
        href: "/contatti",
        description:
          "Raccontaci la tua struttura e vediamo come apparirebbe la tua guida.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
