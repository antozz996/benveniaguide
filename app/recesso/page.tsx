import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { RecessoForm } from "@/components/forms/RecessoForm";
import { buildMetadata } from "@/lib/metadata";
import { withdrawalFormLines } from "@/lib/recesso";
import { breadcrumbJsonLd } from "@/lib/structured-data";

/**
 * Funzione di recesso (art. 54-bis Codice del Consumo, approvata dal board
 * il 17/11/2026 su BENAA-48). Il modulo invia la richiesta al team e la
 * conferma con data e ora al cliente (/api/recesso).
 */
export const metadata: Metadata = buildMetadata({
  title: "Recesso dal contratto",
  description:
    "Recedi dal contratto con Benvenia Guide: se sei un consumatore hai 14 giorni, senza dare motivi. Compila il modulo e ricevi subito la conferma per email.",
  path: "/recesso",
  ogTitle: "Recesso dal contratto · Benvenia Guide",
});

const link = "text-forest underline underline-offset-2";

const email = (
  <a href="mailto:info@benveniaguide.it" className={link}>
    info@benveniaguide.it
  </a>
);

export default function RecessoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Recesso dal contratto", href: "/recesso" },
        ])}
      />

      <PageHero
        eyebrow="Recesso"
        title="Recesso dal contratto"
        lead="Se sei un consumatore hai 14 giorni dalla conclusione del contratto per recedere, senza dare motivi."
        crumbs={[{ label: "Home", href: "/" }, { label: "Recesso" }]}
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mt-10 space-y-4 text-sm leading-relaxed text-charcoal sm:text-base">
              <p>
                Una volta pubblicata la guida, se hai chiesto di iniziare subito
                e hai preso atto della perdita del diritto, il recesso non è più
                possibile. Trovi tutti i dettagli al punto 9 delle{" "}
                <Link href="/condizioni#recesso" className={link}>
                  Condizioni del servizio
                </Link>
                .
              </p>
              <p>
                Compila i campi e premi il pulsante. Ti mandiamo subito per
                email la conferma di ricezione, con data e ora.
              </p>
            </div>

            <div className="mt-8">
              <RecessoForm />
            </div>

            <p className="mt-8 text-sm leading-relaxed text-charcoal sm:text-base">
              Puoi recedere anche scrivendo a {email}, con una dichiarazione
              esplicita o con il modulo di recesso tipo.
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
        </Container>
      </section>
    </>
  );
}
