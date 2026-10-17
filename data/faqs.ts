export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ commerciali e operative. Le risposte non contengono promesse
 * quantitative, statistiche o prezzi non verificati.
 */
export const homeFaqs: FaqItem[] = [
  {
    q: "Che cos'è Benvenia Guide?",
    a: "È una guida digitale personalizzata per la tua struttura ricettiva: raccoglie benvenuto, informazioni di check-in, Wi-Fi, servizi, regole della casa, consigli sul territorio e contatti dell'host, in un'unica pagina pensata per gli ospiti.",
  },
  {
    q: "Serve un sito web della struttura per usarla?",
    a: "No. La guida è pensata per essere aperta direttamente dal browser dello smartphone, senza installare applicazioni e senza bisogno di un sito dedicato.",
  },
  {
    q: "Come faccio vedere la guida agli ospiti?",
    a: "La condivisione con gli ospiti viene definita in fase di attivazione: nella demo di questo sito puoi farti un'idea concreta dell'esperienza che vivranno i tuoi ospiti.",
  },
  {
    q: "Quanto costa?",
    a: "Non pubblichiamo listini standard perché ogni struttura ha esigenze diverse. Nella pagina Prezzi trovi come funziona la richiesta di offerta personalizzata: la prima demo è gratuita e senza impegno.",
  },
  {
    q: "Posso aggiornare i contenuti nel tempo?",
    a: "Sì, l'aggiornamento dei contenuti è parte del progetto: quando un orario o un servizio cambia, la guida si aggiorna di conseguenza. Le modalità vengono concordate in fase di attivazione.",
  },
  {
    q: "In quali lingue può essere la guida?",
    a: "Questa demo è navigabile in italiano e in inglese. Le lingue della guida della tua struttura vengono definite insieme in fase di richiesta.",
  },
  {
    q: "Cosa succede ai dati che inserisco nel form?",
    a: "I dati vengono usati solo per rispondere alla tua richiesta di demo. Puoi leggere i dettagli nell'informativa privacy: non cediamo né rivendiamo i contatti acquisiti tramite questo sito.",
  },
  {
    q: "Benvenia Guide è già disponibile per tutte le strutture?",
    a: "Il prodotto è in fase di lancio controllato. Richiedendo una demo ti confermiamo le funzionalità disponibili in quel momento e valutiamo insieme l'attivazione più adatta alla tua struttura.",
  },
];

export const contactFaqs: FaqItem[] = [
  {
    q: "Cosa succede dopo la richiesta di demo?",
    a: "Ti ricontattiamo per fissare una call breve e senza impegno, capire le esigenze della struttura e mostrarti la guida applicata al tuo caso.",
  },
  {
    q: "La demo è davvero gratuita?",
    a: "Sì: la richiesta di demo e il primo confronto non prevedono alcun costo né impegno.",
  },
  {
    q: "Quanto dura il primo confronto?",
    a: "Una ventina di minuti in genere bastano per capire esigenze e contesto della struttura e rispondere alle domande principali.",
  },
  {
    q: "Posso chiedere la cancellazione dei miei dati?",
    a: "Sì, in qualsiasi momento scrivendo tramite il modulo o rispondendo ai nostri messaggi. Trovi le modalità nell'informativa privacy.",
  },
];
