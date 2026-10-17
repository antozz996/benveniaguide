import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, CircleHelp } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  pricingFactors,
  pricingNotice,
  pricingPackages,
  pricingSteps,
} from "@/data/pricing";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Prezzi",
  description:
    "Come funziona l'offerta Benvenia Guide: nessun pacchetto preconfezionato, ogni struttura riceve una proposta su misura e trasparente, costruita su esigenze reali.",
  path: "/prezzi",
  ogTitle: "Prezzi trasparenti, offerte su misura · Benvenia Guide",
  keywords: [
    "costo guest guide",
    "prezzo guida digitale B&B",
    "preventivo guida per ospiti",
  ],
});

export default function PrezziPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Prezzi", href: "/prezzi" },
        ])}
      />

      <PageHero
        eyebrow="Prezzi"
        title={
          <>
            Un&apos;offerta costruita sul{" "}
            <em className="font-serif font-medium italic">tuo caso</em>, non su
            un listino.
          </>
        }
        lead="Ogni struttura accoglie ospiti diversi, con esigenze diverse. Per questo preferiamo ascoltarti prima di parlare di cifre: riceverai una proposta chiara, motivata e senza sorprese."
        crumbs={[{ label: "Home", href: "/" }, { label: "Prezzi" }]}
      />

      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-copper/40 bg-copper/5 p-7 text-center sm:p-9">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/15">
                <CircleHelp aria-hidden="true" className="h-6 w-6 text-copper-700" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-forest">
                Perché non trovi un listino
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
                {pricingNotice}
              </p>
            </div>
          </Reveal>

          {pricingPackages.length > 0 ? (
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {pricingPackages.map((pack) => (
                <div
                  key={pack.id}
                  className="flex flex-col rounded-[2rem] border border-line bg-paper p-7 shadow-soft"
                >
                  <h3 className="font-display text-lg font-semibold text-forest">
                    {pack.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{pack.description}</p>
                  <p className="mt-5 font-display text-2xl font-semibold text-forest">
                    {pack.price}
                    <span className="ml-1 text-sm font-normal text-muted">
                      {pack.period}
                    </span>
                  </p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {pack.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-charcoal"
                      >
                        <BadgeCheck
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-copper-700"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Come si arriva all'offerta"
            title="Quattro passi, nessuna sorpresa"
            lead="Un percorso semplice e trasparente, dal primo contatto all'attivazione della guida."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pricingSteps.map((step, index) => (
              <Reveal
                key={step.number}
                delayMs={index * 80}
                className="h-full"
              >
                <li className="flex h-full flex-col rounded-[2rem] border border-line bg-ivory p-6">
                  <span className="font-display text-sm font-semibold tracking-[0.2em] text-copper-700">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-forest">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Cosa influenza il prezzo"
            title="I fattori che modellano la proposta"
            lead="La nostra offerta varia in base a cinque fattori concreti. Puoi già riconoscere il tuo profilo e prepararti alla call."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pricingFactors.map((factor, index) => (
              <Reveal key={factor.title} delayMs={index * 60} className="h-full">
                <div className="h-full rounded-[2rem] border border-line bg-paper p-6 shadow-soft">
                  <h3 className="font-display text-base font-semibold text-forest">
                    {factor.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {factor.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delayMs={300} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[2rem] bg-forest p-6 text-ivory shadow-soft">
                <p className="text-sm leading-relaxed text-ivory/80">
                  Vuoi subito un&apos;idea più concreta? Raccontaci la tua
                  struttura: al primo contatto ti diciamo anche in che fascia
                  ci muoviamo, prima ancora dell&apos;offerta formale.
                </p>
                <CtaLink
                  href="/contatti"
                  variant="copper"
                  className="mt-6 self-start"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "pricing_factors" }}
                >
                  Richiedi un&apos;offerta
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        title="Pronto a conoscere la cifra giusta per te?"
        description="Nessun costo nascosto, nessun vincolo lungo: prima capiamo di cosa hai bisogno, poi mettiamo tutto nero su bianco."
      />
    </>
  );
}
