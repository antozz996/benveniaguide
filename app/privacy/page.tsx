import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Informativa privacy",
  description:
    "Informativa sul trattamento dei dati personali di Benvenia Guide: titolare, dati trattati, finalità, basi giuridiche, conservazione, fornitori e diritti.",
  path: "/privacy",
  ogTitle: "Informativa privacy · Benvenia Guide",
});

const sectionTitle = "font-display text-xl font-semibold text-forest sm:text-2xl";
const paragraph = "mt-4 text-sm leading-relaxed text-charcoal sm:text-base";
const list =
  "mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-charcoal sm:text-base";
const link = "text-forest underline underline-offset-2";

const email = (
  <a href="mailto:info@benveniaguide.it" className={link}>
    info@benveniaguide.it
  </a>
);

interface Treatment {
  situation: string;
  data: string;
  purpose: string;
  basis: string;
  retention: ReactNode;
}

const treatments: Treatment[] = [
  {
    situation: "Visiti il sito",
    data: "Dati tecnici di navigazione (indirizzo IP, browser, pagine richieste)",
    purpose: "Far funzionare il sito e proteggerlo da abusi",
    basis: "Legittimo interesse (art. 6.1.f GDPR)",
    retention: "Per il tempo previsto dal fornitore di hosting, di norma pochi giorni",
  },
  {
    situation: "Accetti i cookie di statistica",
    data: "Dati di utilizzo pseudonimi tramite Google Analytics 4",
    purpose: "Capire quali pagine sono utili",
    basis: "Consenso (art. 6.1.a), revocabile dal pulsante “Preferenze cookie”",
    retention: (
      <>
        Vedi la{" "}
        <Link href="/cookie-policy" className={link}>
          Cookie policy
        </Link>
      </>
    ),
  },
  {
    situation: "Compili il modulo contatti",
    data: "Nome e cognome, nome e tipologia della struttura, email, eventuale sito web, messaggio, parametri della campagna da cui arrivi (utm)",
    purpose: "Rispondere alla tua richiesta e prepararti una proposta",
    basis: "Misure precontrattuali su tua richiesta (art. 6.1.b)",
    retention: "12 mesi dall'ultimo scambio se non diventi cliente",
  },
  {
    situation: "Ci scrivi su WhatsApp, Instagram, Facebook o via email",
    data: "Nome, numero di telefono o nome utente, contenuto dei messaggi",
    purpose: "Rispondere e gestire la tua richiesta",
    basis: "Misure precontrattuali o contratto (art. 6.1.b)",
    retention: "12 mesi dall'ultimo scambio se non diventi cliente",
  },
  {
    situation: "Ti contattiamo noi per la prima volta",
    data: "Nome della struttura, nome del referente se pubblicato, numero di telefono pubblicato dalla struttura, fonte del dato",
    purpose: "Presentarti il servizio con una telefonata",
    basis:
      "Legittimo interesse (art. 6.1.f e art. 130, c. 3 e 3-bis, Codice Privacy). Non chiamiamo i numeri iscritti al Registro delle opposizioni",
    retention: "12 mesi dalla telefonata",
  },
  {
    situation: "Ci autorizzi a scriverti dopo la telefonata",
    data: "Email o numero WhatsApp che ci indichi",
    purpose: "Mandarti la presentazione e l'offerta",
    basis: "Consenso (art. 6.1.a), revocabile in ogni momento",
    retention: "Fino alla revoca, e comunque non oltre 12 mesi dall'ultimo scambio",
  },
  {
    situation: "Ci chiedi di non contattarti più",
    data: "Numero, email o nome utente e data della richiesta",
    purpose: "Rispettare la tua scelta nel tempo",
    basis: "Obbligo di legge e legittimo interesse (art. 6.1.c e 6.1.f)",
    retention: "Finché serve a non ricontattarti",
  },
  {
    situation: "Diventi cliente",
    data: "Dati del referente, dati della struttura e risposte al modulo struttura (orari, istruzioni di arrivo, nome e password della rete Wi-Fi, recapiti per gli ospiti, consigli sul territorio)",
    purpose: "Scrivere, pubblicare e aggiornare la guida; gestire l'ordine e l'assistenza",
    basis: "Contratto (art. 6.1.b)",
    retention:
      "Per tutta la durata della pubblicazione della guida. Poi li cancelliamo entro 90 giorni, salvo quanto serve per le ricevute",
  },
  {
    situation: "Accedi all'area clienti",
    data: "Email, nome, collegamento alla tua struttura, link di accesso temporanei",
    purpose: "Farti vedere e gestire la tua guida",
    basis: "Contratto (art. 6.1.b)",
    retention: "Finché l'account è attivo; i link di accesso scadono e vengono cancellati",
  },
  {
    situation: "Paghi",
    data: "Nome e cognome o ragione sociale, indirizzo, codice fiscale o partita IVA, importo, data e mezzo di pagamento",
    purpose: "Emettere la ricevuta e rispettare gli obblighi fiscali e contabili",
    basis: "Obbligo di legge (art. 6.1.c)",
    retention: "10 anni dall'emissione della ricevuta",
  },
  {
    situation: "Ci dai il permesso di mostrare la tua guida come esempio (offerta lancio)",
    data: "Testi e immagini della guida, nome della struttura, la tua recensione",
    purpose: "Mostrare il nostro lavoro a potenziali clienti",
    basis: "Contratto (art. 6.1.b), come previsto dall'offerta",
    retention:
      "Finché la guida è pubblicata. Dall'esempio togliamo recapiti personali, codici e password",
  },
  {
    situation: "Apri una guida come ospite (pagine /g/)",
    data: "Solo i dati tecnici di navigazione e una preferenza salvata sul tuo dispositivo (ad es. la lingua)",
    purpose: "Mostrarti la guida",
    basis: "Legittimo interesse (art. 6.1.f)",
    retention:
      "Come per la visita al sito. Nelle guide non usiamo statistiche né cookie di profilazione",
  },
  {
    situation: "Eserciti un diritto o nasce una contestazione",
    data: "I dati necessari a gestire la richiesta",
    purpose: "Rispondere e, se serve, tutelare i nostri diritti",
    basis: "Obbligo di legge e legittimo interesse (art. 6.1.c e 6.1.f)",
    retention: "Per il tempo necessario, al massimo fino alla prescrizione",
  },
];

const treatmentFields: { key: keyof Omit<Treatment, "situation">; label: string }[] = [
  { key: "data", label: "Dati" },
  { key: "purpose", label: "Perché li usiamo" },
  { key: "basis", label: "Base giuridica" },
  { key: "retention", label: "Per quanto tempo" },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
        ])}
      />

      <PageHero
        eyebrow="Privacy"
        title="Informativa privacy"
        lead="Questa pagina spiega come trattiamo i dati personali di chi visita il sito, di chi ci contatta, dei clienti e degli ospiti che aprono le guide. Aggiornata al 17 novembre 2026."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mt-10 space-y-10">
              <div>
                <h2 className={sectionTitle}>1. Titolare del trattamento</h2>
                <p className={paragraph}>
                  Il titolare del trattamento è{" "}
                  <strong>
                    Antonio Avella, che opera con il marchio Benvenia Guide
                  </strong>
                  . Per qualsiasi domanda sui tuoi dati puoi scrivere a {email}{" "}
                  oppure usare il modulo nella pagina{" "}
                  <Link href="/contatti" className={link}>
                    Contatti
                  </Link>
                  .
                </p>
                <p className={paragraph}>
                  Non abbiamo nominato un responsabile della protezione dei dati
                  (DPO), perché per un&apos;attività di queste dimensioni non è
                  obbligatorio.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>
                  2. Quali dati trattiamo, perché e per quanto tempo
                </h2>
                <ul className="mt-6 space-y-4">
                  {treatments.map((treatment) => (
                    <li
                      key={treatment.situation}
                      className="rounded-2xl border border-line bg-paper p-5"
                    >
                      <h3 className="font-display text-base font-semibold text-forest">
                        {treatment.situation}
                      </h3>
                      <dl className="mt-3 space-y-2.5 text-sm leading-relaxed">
                        {treatmentFields.map((field) => (
                          <div key={field.key}>
                            <dt className="font-medium text-forest">
                              {field.label}
                            </dt>
                            <dd className="text-charcoal">
                              {treatment[field.key]}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </li>
                  ))}
                </ul>
                <p className={paragraph}>
                  <strong>Altri canali.</strong> Se ci scrivi in DM su Instagram
                  o Facebook, via email o WhatsApp, oppure ci lasci un numero
                  per essere richiamato, usiamo nome, contatto e contenuto dei
                  messaggi solo per rispondere alla tua richiesta (art. 6.1.b
                  GDPR). Il numero di telefono non viene usato per altri
                  contatti. Instagram, Facebook e WhatsApp sono servizi di
                  Meta, che tratta i dati come titolare autonomo secondo la
                  propria informativa.
                </p>
                <p className={paragraph}>
                  <strong>Clienti.</strong> Per scrivere la guida trattiamo le
                  informazioni del modulo struttura. Per la ricevuta trattiamo
                  nome o ragione sociale, indirizzo e codice fiscale o partita
                  IVA (art. 6.1.b e 6.1.c GDPR). I dati della ricevuta si
                  conservano per 10 anni, come previsto dalla normativa fiscale
                  (art. 2220 c.c.). Le richieste che non diventano un ordine si
                  cancellano entro 12 mesi dall&apos;ultimo contatto.
                </p>
                <p className={paragraph}>
                  Non facciamo profilazione e non prendiamo decisioni
                  automatizzate che abbiano effetti significativi su di te. Non
                  vendiamo e non cediamo i dati a terzi per fini di marketing.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>3. Le guide degli ospiti</h2>
                <p className={paragraph}>
                  Le guide sono pagine raggiungibili da chi ha il link o il QR
                  code. Non compaiono nei motori di ricerca (sono marcate
                  &ldquo;noindex&rdquo;), ma chi ha il link può aprirle.
                </p>
                <p className={paragraph}>
                  Per questo chiediamo ai clienti di inserire solo le
                  informazioni utili agli ospiti. Codici di accesso alla porta
                  o della cassetta chiavi <strong>non</strong> vanno pubblicati
                  nella guida: è meglio mandarli all&apos;ospite in privato. La
                  password del Wi-Fi viene pubblicata solo se il cliente lo
                  conferma nel modulo.
                </p>
                <p className={paragraph}>
                  Il cliente può chiederci in ogni momento di modificare o
                  togliere un&apos;informazione dalla guida.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>4. Da dove prendiamo i dati</h2>
                <p className={paragraph}>
                  Quasi tutti i dati ce li dai tu. Solo per il primo contatto
                  telefonico usiamo il numero che la struttura pubblica sul
                  proprio sito o su elenchi pubblici: in quel caso ti diciamo
                  da dove l&apos;abbiamo preso all&apos;inizio della telefonata e
                  ti chiediamo se vuoi essere ricontattato.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>5. Chi tratta i dati con noi</h2>
                <p className={paragraph}>
                  Ci avvaliamo di fornitori che trattano i dati per nostro
                  conto, come responsabili del trattamento (art. 28 GDPR):
                </p>
                <ul className={list}>
                  <li>Vercel Inc., hosting e distribuzione del sito e delle guide;</li>
                  <li>Neon, database dell&apos;area clienti;</li>
                  <li>
                    Resend, invio delle email del modulo contatti e dei link di
                    accesso;
                  </li>
                  <li>
                    Google, per il modulo struttura (Google Moduli e Fogli) e,
                    solo con il tuo consenso, per Google Analytics 4.
                  </li>
                </ul>
                <p className={paragraph}>
                  Alcuni soggetti trattano i dati come{" "}
                  <strong>titolari autonomi</strong>, con le proprie
                  informative:
                </p>
                <ul className={list}>
                  <li>
                    Meta Platforms (WhatsApp, Instagram, Facebook), quando ci
                    scrivi su queste piattaforme;
                  </li>
                  <li>PayPal e la banca, quando paghi;</li>
                  <li>
                    l&apos;eventuale commercialista, per gli adempimenti
                    fiscali.
                  </li>
                </ul>
                <p className={paragraph}>
                  I dati possono essere comunicati alle autorità quando la
                  legge lo richiede.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>
                  6. Trasferimenti fuori dall&apos;Unione Europea
                </h2>
                <p className={paragraph}>
                  Alcuni fornitori hanno sede negli Stati Uniti. I
                  trasferimenti avvengono sulla base della decisione di
                  adeguatezza della Commissione europea (EU-U.S. Data Privacy
                  Framework) per i fornitori aderenti, oppure delle clausole
                  contrattuali standard approvate dalla Commissione.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>7. I tuoi diritti</h2>
                <p className={paragraph}>
                  Puoi chiedere in ogni momento di accedere ai tuoi dati,
                  correggerli, cancellarli, limitarne l&apos;uso, riceverli in un
                  formato leggibile (portabilità) e opporti al trattamento
                  basato sul legittimo interesse (artt. 15-22 GDPR). Puoi anche
                  revocare un consenso, senza effetti sul trattamento già
                  avvenuto.
                </p>
                <p className={paragraph}>
                  Puoi sempre chiederci di non contattarti più: basta
                  rispondere &ldquo;stop&rdquo; al messaggio, dircelo al
                  telefono o scrivere a {email}. Rispondiamo entro un mese.
                </p>
                <p className={paragraph}>
                  Se ritieni che il trattamento violi la normativa, puoi
                  presentare reclamo al{" "}
                  <a
                    href="https://www.garanteprivacy.it"
                    className={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Garante per la protezione dei dati personali
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>8. Sicurezza</h2>
                <p className={paragraph}>
                  Usiamo connessioni cifrate (HTTPS), accesso all&apos;area
                  clienti tramite link temporanei e accesso ai dati limitato a
                  chi lavora sulla guida. Le ricevute sono conservate fuori dal
                  sito.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>9. Aggiornamenti</h2>
                <p className={paragraph}>
                  Quando cambiamo questa informativa pubblichiamo qui la nuova
                  versione con la data di aggiornamento.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
