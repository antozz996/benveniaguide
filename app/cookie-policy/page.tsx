import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Cookie policy",
  description:
    "Cookie policy di Benvenia Guide: cosa salviamo nel browser, con quali finalità e come modificare o revocare le preferenze in qualsiasi momento.",
  path: "/cookie-policy",
  ogTitle: "Cookie policy · Benvenia Guide",
});

const sectionTitle =
  "font-display text-xl font-semibold text-forest sm:text-2xl";
const paragraph = "mt-4 text-sm leading-relaxed text-charcoal sm:text-base";
const cellHead =
  "border-b border-line px-3.5 py-3 text-left text-xs font-semibold tracking-wide text-forest uppercase";
const cell = "border-b border-line px-3.5 py-3 text-sm text-charcoal align-top";

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Cookie policy", href: "/cookie-policy" },
        ])}
      />

      <PageHero
        eyebrow="Cookie"
        title="Cookie policy"
        lead="Cosa salviamo nel tuo browser quando visiti questo sito, perché lo facciamo e come cambiare idea in qualsiasi momento."
        crumbs={[{ label: "Home", href: "/" }, { label: "Cookie policy" }]}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mt-10 space-y-10">
              <div>
                <h2 className={sectionTitle}>
                  1. Approccio: prima il consenso, poi gli strumenti
                </h2>
                <p className={paragraph}>
                  Questo sito non carica alcuno strumento di analisi o
                  tracciamento prima che tu abbia espresso una scelta
                  esplicita. Senza consenso alla categoria
                  &ldquo;analytics&rdquo; non viene attivato nessuno script di
                  misurazione.
                </p>
              </div>

              <div>
                <h2 className={sectionTitle}>
                  2. Cosa salviamo nel browser
                </h2>
                <p className={paragraph}>
                  Il sito utilizza esclusivamente memorizzazioni tecniche del
                  browser (localStorage e sessionStorage). Non usiamo cookie
                  di profilazione.
                </p>
                <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-paper">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={cellHead}>Nome</th>
                        <th className={cellHead}>Strumento</th>
                        <th className={cellHead}>Finalità</th>
                        <th className={cellHead}>Durata</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={cell}>
                          <code className="text-xs">benvenia:consent:v1</code>
                        </td>
                        <td className={cell}>localStorage</td>
                        <td className={cell}>
                          Memorizza la tua scelta sul consenso (necessario /
                          analytics) per non chiedertela ad ogni visita.
                          Tecnico e indispensabile al funzionamento dichiarato.
                        </td>
                        <td className={cell}>
                          Persistente, fino a cancellazione manuale
                        </td>
                      </tr>
                      <tr>
                        <td className={cell}>
                          <code className="text-xs">benvenia:utm</code>
                        </td>
                        <td className={cell}>sessionStorage</td>
                        <td className={cell}>
                          Salva i parametri UTM della prima visita della
                          sessione, per attribuire correttamente le richieste
                          provenienti dalle nostre campagne. Solo se presenti
                          nell&apos;URL di arrivo.
                        </td>
                        <td className={cell}>
                          Sessione del browser, fino a chiusura
                        </td>
                      </tr>
                      <tr>
                        <td className={cell}>
                          <code className="text-xs">cookie di terze parti</code>
                        </td>
                        <td className={cell}>Google Analytics 4</td>
                        <td className={cell}>
                          Misurazione aggregata delle visite (pagine viste,
                          traffico da campagne). Caricato esclusivamente se
                          acconsenti alla categoria &ldquo;analytics&rdquo;.
                        </td>
                        <td className={cell}>
                          Secondo le impostazioni del fornitore; revocabile in
                          ogni momento
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className={sectionTitle}>
                  3. Modificare o revocare le preferenze
                </h2>
                <p className={paragraph}>
                  Puoi riaprire il pannello delle preferenze in qualsiasi
                  momento da questa pagina o dal collegamento &ldquo;Preferenze
                  cookie&rdquo; nel footer. La revoca del consenso alla
                  categoria analytics disattiva gli strumenti di misurazione
                  alla visita successiva.
                </p>
                <div className="mt-5">
                  <CookiePreferencesButton />
                </div>
              </div>

              <div>
                <h2 className={sectionTitle}>4. Riferimenti normativi</h2>
                <p className={paragraph}>
                  Questa policy è redatta in coerenza con il GDPR (Regolamento
                  UE 2016/679) e con le linee guida del Garante per la
                  protezione dei dati personali su cookie e altri strumenti di
                  tracciamento. Per il dettaglio sui trattamenti, consulta
                  l&apos;
                  <a
                    href="/privacy"
                    className="text-forest underline underline-offset-2"
                  >
                    informativa privacy
                  </a>
                  .
                </p>
                <p className={paragraph}>
                  Documento aggiornato al 17 ottobre 2026.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
