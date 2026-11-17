import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";
import { withdrawalFormLines } from "@/lib/recesso";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Condizioni del servizio",
  description:
    "Condizioni del servizio Benvenia Guide: pacchetti e prezzi una tantum, tempi, correzioni, pagamento dopo l'approvazione, durata della pubblicazione e diritto di recesso.",
  path: "/condizioni",
  ogTitle: "Condizioni del servizio · Benvenia Guide",
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

const packages: { name: string; price: string; includes: string }[] = [
  {
    name: "Base",
    price: "€ 49",
    includes:
      "Guida in italiano per 1 struttura: benvenuto, check-in, Wi-Fi, regole e contatti; QR code",
  },
  {
    name: "Completa",
    price: "€ 79",
    includes:
      "Tutto il Base, versione in inglese, sezione sul territorio (cosa vedere, dove mangiare), cartello QR da stampare, 1 modifica gratuita entro 12 mesi dalla pubblicazione",
  },
  {
    name: "Multi-struttura",
    price: "€ 59 a struttura, da 3 strutture",
    includes:
      "Pacchetto Completa per ogni struttura, stile coerente, un unico referente",
  },
  {
    name: "Modifica extra",
    price: "€ 15",
    includes:
      "Un aggiornamento di contenuti già presenti (orari, Wi-Fi, luoghi consigliati). Le sezioni nuove si concordano a parte",
  },
];

export default function CondizioniPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Condizioni del servizio", href: "/condizioni" },
        ])}
      />

      <PageHero
        eyebrow="Condizioni"
        title="Condizioni del servizio"
        lead="Cosa comprende la guida, come si ordina, quando paghi e quali sono i tuoi diritti. Aggiornate al 17 novembre 2026."
        crumbs={[{ label: "Home", href: "/" }, { label: "Condizioni" }]}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mt-10 space-y-10">
              <div>
                <h2 className={sectionTitle}>1. Chi siamo</h2>
                <p className={paragraph}>
                  Benvenia Guide è il marchio con cui opera{" "}
                  <strong>Antonio Avella</strong>, email {email}. Lavoriamo in
                  prestazione occasionale e non abbiamo partita IVA.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>2. Il servizio</h2>
                <p className={paragraph}>
                  Scriviamo e pubblichiamo una guida digitale per gli ospiti
                  della tua struttura: una pagina web per smartphone,
                  raggiungibile con un link e un QR code. La scriviamo noi
                  partendo dalle informazioni che ci dai nel modulo struttura.
                </p>
                <ul className="mt-6 space-y-4">
                  {packages.map((pack) => (
                    <li
                      key={pack.name}
                      className="rounded-2xl border border-line bg-paper p-5"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-base font-semibold text-forest">
                          {pack.name}
                        </h3>
                        <p className="text-sm font-semibold text-forest">
                          {pack.price}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal">
                        {pack.includes}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className={paragraph}>
                  <strong>Offerta lancio:</strong> per i primi 10 clienti il
                  pacchetto Completa costa € 49 invece di € 79. In cambio ci
                  lasci una recensione e ci permetti di mostrare la tua guida
                  come esempio, senza i tuoi recapiti personali, codici e
                  password.
                </p>
                <p className={paragraph}>
                  I prezzi sono finali e si pagano una volta sola, senza
                  abbonamento. Non applichiamo IVA (operazione fuori campo IVA,
                  art. 5 D.P.R. 633/1972). Non ci sono costi aggiuntivi:
                  l&apos;eventuale imposta di bollo sulla ricevuta è a nostro
                  carico. Se sei un sostituto d&apos;imposta, applichi la
                  ritenuta d&apos;acconto del 20% e ci versi il resto: il costo
                  totale per te resta il prezzo indicato.
                </p>
                <p className={paragraph}>
                  Il servizio non comprende la gestione delle prenotazioni, i
                  rapporti con gli ospiti né adempimenti di legge della tua
                  struttura. Non garantiamo risultati su prenotazioni o
                  recensioni.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>3. Come si ordina</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-charcoal sm:text-base">
                  <li>
                    Ci scrivi dalla pagina{" "}
                    <Link href="/contatti" className={link}>
                      Contatti
                    </Link>{" "}
                    indicando il pacchetto.
                  </li>
                  <li>
                    Ti mandiamo il modulo struttura. Inviando il modulo accetti
                    queste Condizioni: in quel momento il contratto è concluso.
                  </li>
                  <li>
                    Ti mandiamo via email la conferma dell&apos;ordine con queste
                    Condizioni e l&apos;indirizzo geografico a cui puoi
                    rivolgerti per reclami.
                  </li>
                </ol>
              </div>

              <div>
                <h2 className={sectionTitle}>4. Tempi</h2>
                <p className={paragraph}>
                  Entro <strong>48 ore</strong> da quando riceviamo il modulo
                  completo ti mandiamo l&apos;anteprima della guida. Il modulo è
                  completo quando contiene tutte le risposte obbligatorie; se
                  manca qualcosa te lo diciamo subito e il tempo parte quando
                  arriva.
                </p>
                <p className={paragraph}>
                  Dopo la tua approvazione e il pagamento pubblichiamo la guida
                  entro <strong>1 giorno lavorativo</strong> e ti mandiamo il
                  link definitivo e il QR code.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>5. Correzioni e modifiche</h2>
                <ul className={list}>
                  <li>
                    <strong>Prima dell&apos;approvazione</strong> puoi chiederci
                    correzioni sull&apos;anteprima, comprese nel prezzo:{" "}
                    <strong>1 giro</strong> di revisione con il pacchetto Base,{" "}
                    <strong>2 giri</strong> con il Completa,{" "}
                    <strong>2 giri per struttura</strong> con il
                    Multi-struttura. In un giro ci mandi tutte le correzioni
                    insieme e noi ti rimandiamo l&apos;anteprima aggiornata.
                  </li>
                  <li>
                    <strong>Dopo la pubblicazione</strong>, se troviamo o ci
                    segnali un nostro errore lo correggiamo gratis.
                  </li>
                  <li>
                    <strong>Aggiornamenti</strong> delle tue informazioni (nuovi
                    orari, nuova password Wi-Fi, nuovi consigli): il pacchetto
                    Completa ne include uno entro 12 mesi; gli altri costano
                    € 15 ciascuno. Li facciamo entro 2 giorni lavorativi.
                  </li>
                </ul>
                <p className={paragraph}>
                  <strong>Codici d&apos;accesso:</strong> nella guida pubblica
                  non inseriamo codici di porte, keybox, cassette di sicurezza o
                  allarmi. Al loro posto la guida dice: &ldquo;Il codice ti
                  arriva in privato dall&apos;host&rdquo;. Sei tu a mandarlo
                  all&apos;ospite.
                </p>
                <p className={paragraph}>
                  Sei responsabile della correttezza delle informazioni sulla
                  tua struttura e dei diritti su foto e testi che ci mandi. Le
                  informazioni sul territorio le verifichiamo noi alla data di
                  stesura, ma orari e servizi di terzi possono cambiare.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>6. Pagamento</h2>
                <p className={paragraph}>
                  Paghi <strong>solo dopo aver approvato l&apos;anteprima</strong>
                  , con bonifico o PayPal. Ti mandiamo le istruzioni in privato:
                  non le troverai mai pubblicate sul sito. Dopo il pagamento
                  ricevi la ricevuta per prestazione occasionale.
                </p>
                <p className={paragraph}>
                  Se non approvi l&apos;anteprima, non paghi nulla. Se approvi
                  ma il pagamento non arriva entro 30 giorni, disattiviamo
                  l&apos;anteprima e chiudiamo l&apos;ordine.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>7. Durata della pubblicazione</h2>
                <p className={paragraph}>
                  La guida resta online senza costi di rinnovo per{" "}
                  <strong>almeno 24 mesi</strong> dalla consegna, cioè dalla
                  pubblicazione, e, dopo, finché il servizio resta attivo. Se un
                  giorno dovessimo chiudere il servizio, ti avvisiamo almeno 60
                  giorni prima e ti mandiamo i testi della guida.
                </p>
                <p className={paragraph}>
                  Puoi chiederci di togliere la guida dal sito in qualsiasi
                  momento.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>8. Rimborsi</h2>
                <p className={paragraph}>
                  Siccome paghi dopo aver approvato la guida, di norma non sono
                  previsti rimborsi. Se dopo la pubblicazione la guida non
                  corrisponde a quanto approvato e non riusciamo a correggerla
                  entro 7 giorni dalla tua segnalazione, ti rimborsiamo
                  l&apos;importo pagato. Restano salvi i diritti di legge del
                  consumatore.
                </p>
              </div>

              <div id="recesso" className="scroll-mt-28">
                <h2 className={sectionTitle}>
                  9. Diritto di recesso per i consumatori
                </h2>
                <p className={paragraph}>
                  Questo punto vale se sei un <strong>consumatore</strong>, cioè
                  se acquisti per scopi estranei a un&apos;attività d&apos;impresa
                  o professionale.
                </p>
                <ul className={list}>
                  <li>
                    Hai <strong>14 giorni</strong> dalla conclusione del
                    contratto per recedere senza dare motivi (art. 52 Codice
                    del Consumo).
                  </li>
                  <li>
                    Per avere la guida in 48 ore, nel modulo struttura ci chiedi
                    espressamente di <strong>iniziare subito</strong> il lavoro
                    durante quei 14 giorni (art. 50, c. 3).
                  </li>
                  <li>
                    Quando la guida è <strong>pubblicata</strong>, il servizio è
                    completamente eseguito e{" "}
                    <strong>perdi il diritto di recesso</strong>, se ci hai dato
                    il tuo accordo e hai preso atto di questa conseguenza (art.
                    59, c. 1, lett. a).
                  </li>
                  <li>
                    Prima della pubblicazione puoi sempre recedere{" "}
                    <strong>senza alcun costo</strong>: se non hai ancora pagato
                    non devi nulla; se hai già pagato ti rimborsiamo tutto entro
                    14 giorni, con lo stesso mezzo di pagamento.
                  </li>
                </ul>
                <p className={paragraph}>
                  <strong>Come recedere:</strong> usa il pulsante{" "}
                  <Link href="/recesso" className={`${link} font-semibold`}>
                    Recedi dal contratto qui
                  </Link>
                  , oppure mandaci una dichiarazione esplicita a {email}, anche
                  con il modulo qui sotto. Ti confermiamo la ricezione per
                  email.
                </p>
                <div className="mt-5 rounded-2xl border border-dashed border-forest/25 bg-paper p-5">
                  <p className="text-sm font-semibold text-forest">
                    Modulo di recesso{" "}
                    <span className="font-normal text-charcoal">
                      (compilare e restituire solo se si desidera recedere dal
                      contratto)
                    </span>
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed break-words text-charcoal">
                    {withdrawalFormLines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h2 className={sectionTitle}>10. Dati personali</h2>
                <p className={paragraph}>
                  Trattiamo i tuoi dati come spiegato nell&apos;
                  <Link href="/privacy" className={link}>
                    Informativa privacy
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>11. Legge applicabile e reclami</h2>
                <p className={paragraph}>
                  Si applica la legge italiana. Per qualsiasi problema scrivici
                  a {email}: rispondiamo entro 7 giorni. Se sei un consumatore,
                  per le controversie è competente il giudice del luogo in cui
                  risiedi (art. 66-bis Codice del Consumo).
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
