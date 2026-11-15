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
          "Prezzi chiari da €49, una tantum: nessun abbonamento.",
      },
      {
        label: "Richiedi una demo",
        href: "/contatti",
        description:
          "Raccontaci la tua struttura e vediamo come apparirebbe la tua guida.",
      },
    ],
  },
  {
    slug: "cosa-scrivere-guida-ospiti-casa-vacanza",
    title:
      "Cosa scrivere nella guida per gli ospiti di una casa vacanza: esempi di testi pronti",
    seoTitle: "Cosa scrivere nella guida ospiti: esempi",
    description:
      "Testi di esempio da copiare e adattare per la guida ospiti della tua casa vacanza: benvenuto, arrivo, Wi-Fi, regole, rifiuti, check-out e consigli di zona.",
    topic: "Guide agli ospiti",
    date: "2026-11-15",
    displayDate: "15 novembre 2026",
    readingMinutes: 7,
    intro:
      "Sai già cosa deve esserci nella guida per gli ospiti: orari, Wi-Fi, regole, qualche consiglio sulla zona. Il difficile è scriverlo. Davanti alla pagina bianca si finisce per copiare un modello anonimo o per scrivere tre righe di fretta. Qui trovi esempi di testi pronti, sezione per sezione, da adattare con le tue parole e i dettagli della tua casa.",
    sections: [
      {
        heading: "1. Il benvenuto: due righe, con il tuo nome",
        paragraphs: [
          "Il benvenuto non deve essere lungo: deve far capire che dietro la casa ci sono persone. Esempio:",
          "“Ciao e benvenuti a CasaDemo! Siamo Anna e Marco: abitiamo a dieci minuti e per qualsiasi cosa ci trovate su WhatsApp. In questa guida trovate tutto quello che serve per il soggiorno, e i nostri posti preferiti della zona. Buona vacanza!”",
          "Evita le formule da hotel (“La Direzione augura un piacevole soggiorno”): in una casa vacanza l'ospite sceglie anche te.",
        ],
      },
      {
        heading: "2. Come arrivare e come entrare",
        paragraphs: [
          "È la sezione che, se scritta male, genera le chiamate più urgenti. Scrivi il percorso come lo descriveresti al telefono a un amico, dal parcheggio alla porta:",
          "“Arrivati in Via Demo 12, il portone è quello verde accanto alla farmacia. Il citofono non serve: la cassetta con le chiavi è a sinistra del portone, codice che vi mandiamo il giorno dell'arrivo. Salite al secondo piano, porta a destra. Se il codice non funziona, chiamateci al numero in fondo alla guida.”",
          "Aggiungi una foto del portone e una della cassetta o della serratura: valgono più di qualsiasi descrizione. Per il check-in senza incontro c'è una guida dedicata, che trovi tra i link in fondo a questa pagina: “Check-in autonomo: istruzioni chiare per gli ospiti”.",
        ],
      },
      {
        heading: "3. Orari di check-in e check-out",
        paragraphs: [
          "Scrivi l'orario e cosa succede fuori da quell'orario: è la domanda che segue sempre.",
          "“Il check-in è dalle 15:00. Arrivate più tardi? Nessun problema: il self check-in è disponibile fino a mezzanotte, scriveteci solo l'orario previsto. Arrivate prima? Se la casa è pronta ve lo diciamo volentieri; intanto potete lasciare i bagagli da…”",
          "“Il check-out è entro le 10:00. Se vi serve più tempo chiedetecelo il giorno prima: quando possiamo, diciamo di sì.”",
        ],
      },
      {
        heading: "4. Wi-Fi",
        paragraphs: [
          "Nome della rete e password esattamente come appaiono, più cosa fare se non funziona.",
          "“Rete: CasaDemo_Guest — Password: demo-2026 (tutto minuscolo, con il trattino). Il router è nel mobile dell'ingresso: se la connessione si blocca, staccate la spina per 10 secondi e attendete due minuti.”",
        ],
      },
      {
        heading: "5. La casa: elettrodomestici e piccole istruzioni",
        paragraphs: [
          "Solo ciò che non è intuitivo: caldaia, climatizzatore, piano a induzione, lavatrice, tapparelle elettriche.",
          "“Climatizzatore: telecomando sul comodino, tasto MODE fino al fiocco di neve per il freddo. Per favore spegnetelo quando uscite e tenete le finestre chiuse mentre è acceso.”",
          "“Lavatrice: il detersivo è sotto il lavello. Programma consigliato: 40° rapido (manopola sul numero 6).”",
        ],
      },
      {
        heading: "6. Regole della casa, con il perché",
        paragraphs: ["Le regole spiegate vengono accettate meglio. Esempi:"],
        list: [
          "“Dopo le 23 teniamo le voci basse: i vicini dormono con le finestre aperte.”",
          "“La casa è non fumatori; il terrazzo è tutto vostro.”",
          "“Possono dormire in casa solo le persone indicate nella prenotazione: dobbiamo registrare tutti gli ospiti.”",
          "“Animali: sono benvenuti, vi chiediamo solo di non farli salire su letti e divani.”",
        ],
      },
      {
        heading: "7. Rifiuti e raccolta differenziata",
        paragraphs: [
          "È una delle domande più frequenti, soprattutto per gli ospiti stranieri.",
          "“Facciamo la raccolta differenziata: sotto il lavello trovate i contenitori per organico (umido), plastica e metalli, carta, vetro e indifferenziato. Prima di partire potete lasciare i sacchetti chiusi nei bidoni in cortile, a destra del cancello.”",
        ],
      },
      {
        heading: "8. Consigli di zona: pochi, ma tuoi",
        paragraphs: [
          "Cinque-dieci consigli personali valgono più di una lista di attrazioni che l'ospite trova ovunque. Per ognuno: nome, perché andarci, un consiglio pratico.",
        ],
        list: [
          "“Trattoria Demo — la pasta fresca della signora Lucia. Prenotate il venerdì e sabato, chiude il lunedì.”",
          "“Spiaggia della Baia — si raggiunge a piedi in 15 minuti. Andate prima delle 10: dopo il parcheggio è pieno.”",
          "“Panificio sotto casa — focaccia appena sfornata dalle 7:30.”",
        ],
      },
      {
        heading: "9. Contatti e numeri utili",
        paragraphs: [
          "“Per qualsiasi cosa: Anna, +39 000 000 0000 (WhatsApp, rispondiamo dalle 8 alle 22). Emergenze: 112. Guardia medica turistica: [numero locale]. Farmacia più vicina: Farmacia Demo, Via Demo 10.”",
        ],
      },
      {
        heading: "10. Il saluto finale e la recensione",
        paragraphs: [
          "Chiudi come hai aperto: con calore. Se vuoi, chiedi un feedback in modo semplice.",
          "“Grazie per aver scelto CasaDemo. Se qualcosa si può migliorare, diteci tutto: leggiamo ogni messaggio. E se vi siete trovati bene, una recensione ci aiuta tantissimo.”",
        ],
      },
      {
        heading: "Come usare questi testi",
        paragraphs: [
          "Copia la struttura, cambia i dettagli, rileggi ad alta voce: se suona come parleresti tu, va bene. Poi mettili in un unico posto che l'ospite apre dal telefono, prima dell'arrivo e durante il soggiorno.",
          "Per verificare di non aver dimenticato nulla, usa la checklist completa della guida per gli ospiti, tra i link qui sotto.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Cosa deve contenere la guida per gli ospiti",
        href: "/risorse/cosa-deve-contenere-guida-ospiti",
        description:
          "La checklist completa per non dimenticare nulla di importante.",
      },
      {
        label: "Check-in autonomo: istruzioni chiare per gli ospiti",
        href: "/risorse/check-in-autonomo-istruzioni-ospiti",
        description:
          "Cosa inviare, quando, con quali foto, e il piano B se qualcosa va storto.",
      },
      {
        label: "Prova la demo interattiva",
        href: "/demo",
        description: "Guarda questi testi dentro una Guest Guide completa.",
      },
      {
        label: "Prezzi",
        href: "/prezzi",
        description:
          "Non hai tempo di scriverla? La prepariamo noi, una tantum.",
      },
    ],
  },
  {
    slug: "check-in-autonomo-istruzioni-ospiti",
    title: "Check-in autonomo: come scrivere istruzioni chiare per gli ospiti",
    seoTitle: "Check-in autonomo: istruzioni per gli ospiti",
    description:
      "Come preparare istruzioni di self check-in chiare per B&B e case vacanza: cosa inviare, quando, con quali foto, e il piano B se qualcosa va storto.",
    topic: "Ospitalità",
    date: "2026-11-15",
    displayDate: "15 novembre 2026",
    readingMinutes: 6,
    intro:
      "Il check-in autonomo libera tempo, ma sposta tutto il peso dell'arrivo su un testo: se le istruzioni sono chiare, l'ospite entra sereno; se manca un dettaglio, il telefono suona alle undici di sera. Ecco come scriverle bene, cosa inviare e quando, e cosa prevedere quando qualcosa non va come previsto.",
    sections: [
      {
        heading:
          "Prima di tutto: verifica le regole sull'identificazione degli ospiti",
        paragraphs: [
          "In Italia chi ospita, anche con affitti brevi, deve identificare gli ospiti con un documento valido e comunicarne le generalità alla Questura tramite il portale Alloggiati Web entro 24 ore dall'arrivo. Le istruzioni di questo articolo riguardano l'accesso alla casa: l'identificazione resta un obbligo a parte. Negli ultimi anni le modalità di identificazione nel check-in senza incontro sono state oggetto di circolari ministeriali e ricorsi, e alcuni Comuni hanno regole proprie su cassette portachiavi e segnaletica. Prima di organizzare il self check-in verifica le indicazioni aggiornate con il tuo Comune, la Questura o un'associazione di categoria.",
        ],
      },
      {
        heading: "Le 5 informazioni che non possono mancare",
        paragraphs: [
          "Ogni messaggio di check-in autonomo dovrebbe coprire questi cinque punti:",
        ],
        list: [
          "Indirizzo completo e preciso: via, numero, interno, scala, piano, nome sul citofono se serve",
          "Come raggiungere la porta: dal parcheggio o dalla fermata, con i punti di riferimento visibili (“il portone verde accanto alla farmacia”)",
          "Come prendere le chiavi o aprire: cassetta con codice, serratura smart, chiave in custodia presso un esercizio vicino",
          "Cosa fare appena entrati: luce, quadro elettrico, Wi-Fi, dove trovare la guida della casa",
          "Il piano B: chi chiamare e cosa fare se qualcosa non funziona",
        ],
      },
      {
        heading: "Le foto valgono più delle parole",
        paragraphs: [
          "Una foto del portone, una della cassetta o della serratura e una della porta dell'appartamento eliminano la maggior parte delle incertezze. Aggiungi una freccia o un cerchio sul punto giusto.",
          "Scatta le foto di giorno ma ricorda che molti ospiti arrivano col buio: segnala se il portone ha una luce o un interruttore difficile da trovare.",
        ],
      },
      {
        heading: "Quando inviare le istruzioni",
        paragraphs: ["Tre momenti, tre messaggi diversi:"],
        list: [
          "Alla prenotazione: un messaggio breve con indirizzo e orari (“vi manderemo le istruzioni dettagliate due giorni prima”)",
          "24–48 ore prima dell'arrivo: le istruzioni complete, con foto e link alla guida",
          "Il giorno dell'arrivo: il codice (se cambia a ogni soggiorno) e un promemoria del piano B",
        ],
      },
      {
        heading: "Un esempio di messaggio da adattare",
        paragraphs: [
          "Mandare tutto troppo presto rischia che l'ospite perda il messaggio; mandarlo all'ultimo rischia che non lo legga in viaggio. Ecco un esempio per il messaggio completo:",
          "“Ciao Laura, ecco come entrare a CasaDemo venerdì.",
          "📍 Via Demo 12, Comune Demo. Il portone è quello verde accanto alla farmacia (foto 1).",
          "🔑 A sinistra del portone c'è una cassetta grigia (foto 2): codice 0000, giratelo e tirate lo sportello verso di voi. Dentro trovate due chiavi: la grande apre il portone, la piccola l'appartamento.",
          "🏠 Secondo piano, porta a destra (foto 3). L'interruttore della luce è subito a sinistra.",
          "📶 Wi-Fi e tutte le info della casa sono nella guida: [link].",
          "☎️ Problemi? Chiamate Anna al +39 000 000 0000, fino a mezzanotte. Buon viaggio!”",
        ],
      },
      {
        heading: "Il piano B: cosa succede se qualcosa va storto",
        paragraphs: [
          "Batteria della serratura scarica, codice digitato male, cassetta bloccata dal gelo: succede. Scrivi in anticipo:",
          "Controlla periodicamente batterie, codici e funzionamento della cassetta: le istruzioni migliori non servono se l'hardware non risponde.",
        ],
        list: [
          "Un numero da chiamare e fino a che ora risponde qualcuno",
          "Un'alternativa concreta: chiave di riserva presso un vicino o un esercizio, codice di emergenza",
          "Cosa fare in attesa (“il bar all'angolo è aperto fino alle 23”)",
        ],
      },
      {
        heading: "Ospiti stranieri: semplifica",
        paragraphs: [
          "Frasi brevi, una istruzione per riga, numeri e codici ben separati dal testo. Evita modi di dire. Se usi una traduzione automatica, rileggila o falla rileggere: un “tirare” tradotto “spingere” basta a bloccare l'ospite davanti alla porta.",
        ],
      },
      {
        heading: "Metti tutto in un posto solo",
        paragraphs: [
          "Il messaggio di arrivo funziona meglio se rimanda a una pagina unica, sempre aggiornata, con le stesse istruzioni, le foto, il Wi-Fi e le regole della casa. Così l'ospite non deve scorrere la chat per ritrovare il codice, e tu aggiorni un solo testo quando cambia qualcosa.",
          "Per sapere cosa inserire nel resto della guida, leggi gli esempi di testi pronti tra i link qui sotto.",
        ],
      },
    ],
    relatedLinks: [
      {
        label: "Cosa scrivere nella guida per gli ospiti",
        href: "/risorse/cosa-scrivere-guida-ospiti-casa-vacanza",
        description:
          "Esempi di testi pronti, sezione per sezione, da adattare alla tua casa.",
      },
      {
        label: "Ridurre le domande ripetitive degli ospiti",
        href: "/risorse/ridurre-domande-ripetitive-ospiti",
        description:
          "Perché le domande si ripetono e come dare un posto unico alle risposte.",
      },
      {
        label: "Prova la demo interattiva",
        href: "/demo",
        description:
          "Esplora una Guest Guide completa: soggiorno, territorio e contatti.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
