import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Informativa privacy",
  description:
    "Informativa sul trattamento dei dati personali del sito Benvenia Guide: dati raccolti, finalità, basi giuridiche, conservazione e diritti degli interessati.",
  path: "/privacy",
  ogTitle: "Informativa privacy · Benvenia Guide",
});

const sectionTitle = "font-display text-xl font-semibold text-forest sm:text-2xl";
const paragraph = "mt-4 text-sm leading-relaxed text-charcoal sm:text-base";

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
        lead="Come trattiamo i dati personali raccolti tramite questo sito, in linguaggio chiaro."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mt-10 space-y-10">
              <div>
                <h2 className={sectionTitle}>1. Titolare del trattamento</h2>
                <p className={paragraph}>
                  Il titolare del trattamento è Benvenia Guide. Per qualsiasi
                  richiesta relativa ai dati personali puoi scrivere a{" "}
                  <a
                    href="mailto:info@benveniaguide.it"
                    className="text-forest underline underline-offset-2"
                  >
                    info@benveniaguide.it
                  </a>{" "}
                  oppure usare il modulo nella pagina{" "}
                  <a href="/contatti" className="text-forest underline underline-offset-2">
                    Contatti
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>
                  2. Quali dati raccogliamo
                </h2>
                <p className={paragraph}>
                  Tramite il modulo di contatto raccogliamo: nome e cognome,
                  nome della struttura, indirizzo email, tipologia di
                  struttura, eventuale sito web e il contenuto del messaggio.
                  Insieme alla richiesta possono essere salvati i parametri di
                  attribuzione della campagna (utm_source, utm_medium,
                  utm_campaign, utm_content, utm_term), quando presenti
                  nell&apos;indirizzo di arrivo.
                </p>
                <p className={paragraph}>
                  L&apos;infrastruttura di hosting registra inoltre dati
                  tecnici minimi necessari a erogare e proteggere il sito
                  (ad esempio indirizzo IP nelle richieste al server).
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>3. Finalità e basi giuridiche</h2>
                <p className={paragraph}>
                  I dati del modulo sono trattati per rispondere alla richiesta
                  di informazioni o di demo e per l&apos;eventuale gestione del
                  rapporto (base giuridica: esecuzione di misure
                  precontrattuali su richiesta dell&apos;interessato, art.
                  6.1.b GDPR). Le misure tecniche di protezione dalla
                  compilazione automatizzata (antispam) si fondano sul
                  legittimo interesse del titolare a mantenere sicuro il sito
                  (art. 6.1.f GDPR).
                </p>
                <p className={paragraph}>
                  Non effettuiamo profilazione e non prendiamo decisioni
                  automatizzate che producano effetti significativi sulle
                  persone.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>4. Conservazione</h2>
                <p className={paragraph}>
                  Le richieste ricevute vengono conservate per il tempo
                  necessario a gestirle e a documentare l&apos;attività svolta.
                  Puoi chiedere in qualsiasi momento la cancellazione dei tuoi
                  dati quando non siano più necessari alle finalità descritte.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>5. Destinatari e fornitori</h2>
                <p className={paragraph}>
                  Per erogare il sito ci avvaliamo di fornitori che trattano
                  dati per nostro conto, nominati responsabili del trattamento:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-charcoal sm:text-base">
                  <li>
                    servizio di hosting e distribuzione del sito (Vercel);
                  </li>
                  <li>
                    servizio di invio email transazionali per inoltrare le
                    richieste del modulo (Resend);
                  </li>
                  <li>
                    eventuale servizio di analytics (Google Analytics 4),
                    attivato esclusivamente previo consenso e limitatamente
                    alla categoria &ldquo;analytics&rdquo;.
                  </li>
                </ul>
                <p className={paragraph}>
                  I dati non vengono ceduti a terzi per finalità di marketing
                  e non sono diffusi.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>6. Trasferimenti extra UE</h2>
                <p className={paragraph}>
                  Alcuni fornitori possono trattare dati al di fuori
                  dell&apos;Unione Europea. Ove necessario, i trasferimenti si
                  basano su garanzie adeguate previste dal GDPR, come le
                  clausole contrattuali standard.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>7. I tuoi diritti</h2>
                <p className={paragraph}>
                  Puoi esercitare in ogni momento i diritti previsti dagli
                  articoli 15-22 del GDPR: accesso ai dati, rettifica,
                  cancellazione, limitazione, opposizione al trattamento e
                  portabilità. Puoi inoltre revocare il consenso quando il
                  trattamento si basa su di esso, senza pregiudicare la
                  liceità del trattamento precedente.
                </p>
                <p className={paragraph}>
                  Per esercitare i diritti puoi scrivere a{" "}
                  <a
                    href="mailto:info@benveniaguide.it"
                    className="text-forest underline underline-offset-2"
                  >
                    info@benveniaguide.it
                  </a>{" "}
                  o usare il modulo nella pagina Contatti. Se ritieni che il
                  trattamento violi la normativa, puoi proporre reclamo
                  all&apos;Autorità Garante per la protezione dei dati
                  personali (garanteprivacy.it).
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>8. Aggiornamenti</h2>
                <p className={paragraph}>
                  Questa informativa è aggiornata al 17 ottobre 2026. In caso
                  di modifiche pubblicheremo la nuova versione in questa
                  pagina, con la data di aggiornamento.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
