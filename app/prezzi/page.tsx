import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  pricingExtras,
  pricingIncluded,
  pricingLaunchOffer,
  pricingPackages,
  pricingSteps,
} from "@/data/pricing";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Prezzi",
  description:
    "Prezzi Benvenia Guide: la guida digitale per i tuoi ospiti scritta da noi, pronta in 48 ore, da €49. Paghi una volta, nessun abbonamento.",
  path: "/prezzi",
  ogTitle: "Da €49, una tantum, nessun abbonamento · Benvenia Guide",
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
            Paghi{" "}
            <em className="font-serif font-medium italic">una volta</em>.
            Nessun abbonamento.
          </>
        }
        lead="La guida per i tuoi ospiti la scriviamo noi: pronta in 48 ore, da €49."
        crumbs={[{ label: "Home", href: "/" }, { label: "Prezzi" }]}
      />

      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-copper/40 bg-copper/5 p-7 text-center sm:p-9">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-copper/15">
                <Sparkles aria-hidden="true" className="h-6 w-6 text-copper-700" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-forest">
                {pricingLaunchOffer.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal sm:text-base">
                {pricingLaunchOffer.description}
              </p>
            </div>
          </Reveal>

          {pricingPackages.length > 0 ? (
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {pricingPackages.map((pack) => (
                <div
                  key={pack.id}
                  className={`flex flex-col rounded-[2rem] border bg-paper p-7 shadow-soft ${
                    pack.highlighted ? "border-copper ring-2 ring-copper/30" : "border-line"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-forest">
                      {pack.name}
                    </h3>
                    {pack.highlighted ? (
                      <span className="rounded-full bg-copper/15 px-3 py-1 text-xs font-semibold text-copper-700">
                        Più scelto
                      </span>
                    ) : null}
                  </div>
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
                  <CtaLink
                    href="/contatti"
                    variant={pack.highlighted ? "copper" : undefined}
                    className="mt-6 self-start"
                    event={ANALYTICS_EVENTS.ctaClick}
                    eventParams={{ cta: `pricing_${pack.id}` }}
                  >
                    Scegli {pack.name}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </CtaLink>
                </div>
              ))}
            </div>
          ) : null}

          <ul className="mx-auto mt-8 max-w-3xl space-y-1 text-center text-sm text-muted">
            {pricingExtras.map((extra) => (
              <li key={extra.label}>
                {extra.label}: <strong className="text-forest">{extra.price}</strong>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Come funziona"
            title="Quattro passi, nessuna sorpresa"
            lead="Dal primo contatto alla guida online in 48 ore."
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
            eyebrow="Sempre incluso"
            title="Cosa ottieni con ogni pacchetto"
            lead="Un prezzo chiaro, una volta sola."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pricingIncluded.map((factor, index) => (
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
                  Hai dubbi su quale pacchetto scegliere? Scrivici: ti
                  rispondiamo in giornata.
                </p>
                <CtaLink
                  href="/contatti"
                  variant="copper"
                  className="mt-6 self-start"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "pricing_factors" }}
                >
                  Contattaci
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        title="La tua guida, pronta in 48 ore"
        description="Da €49, una volta sola. Nessun abbonamento, nessun costo nascosto."
      />
    </>
  );
}
