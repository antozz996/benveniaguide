import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Landmark, Mail, Smartphone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { getPayableItem, payableItems } from "@/data/pricing";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { formatIban, getPaymentConfig, revolutMeUrl } from "@/lib/payments";
import { siteConfig } from "@/lib/site";

// Pagine statiche, una per voce del listino.
// NON esportare dynamicParams/dynamic/revalidate (vietati con cacheComponents).
export function generateStaticParams() {
  return payableItems.map((item) => ({ pacchetto: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/paga/[pacchetto]">): Promise<Metadata> {
  const { pacchetto } = await params;
  const item = getPayableItem(pacchetto);
  if (!item) return { robots: { index: false, follow: false } };

  return buildMetadata({
    title: `Pagamento ${item.name}`,
    description: `Paga il pacchetto ${item.name} di Benvenia Guide con bonifico o Revolut.`,
    path: `/paga/${item.id}`,
    noIndex: true,
  });
}

export default async function PagaPage({
  params,
}: PageProps<"/paga/[pacchetto]">) {
  const { pacchetto } = await params;
  const item = getPayableItem(pacchetto);
  if (!item) notFound();

  const { bankTransfer, revolutUsername } = getPaymentConfig();
  const hasMethods = Boolean(bankTransfer || revolutUsername);
  const reference = `Benvenia Guide ${item.name} - [nome struttura]`;
  const receiptHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `Pagamento Benvenia Guide ${item.name}`,
  )}`;

  return (
    <>
      <PageHero
        eyebrow="Pagamento"
        title={<>Pacchetto {item.name}</>}
        lead="Paghi una volta sola, con bonifico o Revolut. Nessun abbonamento."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Prezzi", href: "/prezzi" },
          { label: item.name },
        ]}
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="rounded-[2rem] border border-copper/40 bg-copper/5 p-7 text-center">
              <p className="font-display text-3xl font-semibold text-forest">
                {item.listAmount ? (
                  <span className="mr-3 text-xl font-normal text-muted line-through">
                    €{item.listAmount}
                  </span>
                ) : null}
                €{item.amount}
                {item.perUnit ? (
                  <span className="ml-1 text-base font-normal text-muted">
                    a {item.perUnit}
                  </span>
                ) : null}
              </p>
              {item.note ? (
                <p className="mt-3 text-sm leading-relaxed text-charcoal">{item.note}</p>
              ) : null}
            </div>

            {hasMethods ? (
              <>
                {bankTransfer ? (
                  <div className="rounded-[2rem] border border-line bg-paper p-7 shadow-soft">
                    <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold text-forest">
                      <Landmark aria-hidden="true" className="h-5 w-5 text-copper-700" />
                      Bonifico bancario
                    </h2>
                    <dl className="mt-5 space-y-3 text-sm">
                      <div>
                        <dt className="text-muted">Intestatario</dt>
                        <dd className="font-medium text-forest">{bankTransfer.holder}</dd>
                      </div>
                      <div>
                        <dt className="text-muted">IBAN</dt>
                        <dd className="font-mono font-medium text-forest select-all">
                          {formatIban(bankTransfer.iban)}
                        </dd>
                      </div>
                      {bankTransfer.bank ? (
                        <div>
                          <dt className="text-muted">Banca</dt>
                          <dd className="font-medium text-forest">{bankTransfer.bank}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="text-muted">Causale</dt>
                        <dd className="font-medium text-forest">{reference}</dd>
                      </div>
                    </dl>
                  </div>
                ) : null}

                {revolutUsername ? (
                  <div className="rounded-[2rem] border border-line bg-paper p-7 shadow-soft">
                    <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold text-forest">
                      <Smartphone aria-hidden="true" className="h-5 w-5 text-copper-700" />
                      Revolut
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      Apri il link, inserisci l&apos;importo e nella nota scrivi:{" "}
                      <strong className="text-forest">{reference}</strong>.
                    </p>
                    <CtaLink
                      href={revolutMeUrl(revolutUsername)}
                      variant="copper"
                      className="mt-5"
                      event={ANALYTICS_EVENTS.ctaClick}
                      eventParams={{ cta: `pay_revolut_${item.id}` }}
                    >
                      Paga con Revolut
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </CtaLink>
                  </div>
                ) : null}

                <div className="rounded-[2rem] bg-forest p-7 text-ivory shadow-soft">
                  <h2 className="flex items-center gap-2.5 font-display text-lg font-semibold">
                    <Mail aria-hidden="true" className="h-5 w-5" />
                    Dopo il pagamento
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/80">
                    Inviaci la conferma del pagamento con il nome della struttura: ti
                    mandiamo il modulo da compilare e la guida è online in 48 ore.
                  </p>
                  <CtaLink
                    href={receiptHref}
                    variant="copper"
                    className="mt-5"
                    event={ANALYTICS_EVENTS.ctaClick}
                    eventParams={{ cta: `pay_receipt_${item.id}` }}
                  >
                    Invia la conferma
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </CtaLink>
                </div>
              </>
            ) : (
              <div className="rounded-[2rem] border border-line bg-paper p-7 text-center shadow-soft">
                <p className="text-sm leading-relaxed text-muted">
                  Scrivici indicando il pacchetto: ti inviamo subito i dati per il
                  pagamento con bonifico o Revolut.
                </p>
                <CtaLink
                  href="/contatti"
                  variant="copper"
                  className="mt-5"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: `pay_contact_${item.id}` }}
                >
                  Contattaci
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </CtaLink>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
