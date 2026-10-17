import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Check,
  Home,
  Sparkle,
  Umbrella,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { solutionSegments } from "@/data/solutions";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Soluzioni per B&B, case vacanza, boutique hotel e property manager",
  description:
    "Percorsi Benvenia Guide per ogni tipo di struttura ricettiva: B&B, case vacanza, boutique hotel e property manager. Esigenze, contenuti e benefici potenziali per ciascun segmento.",
  path: "/soluzioni",
  ogTitle: "Soluzioni per la tua struttura · Benvenia Guide",
});

const segmentIcons = {
  home: Home,
  beach: Umbrella,
  sparkle: Sparkle,
  briefcase: Briefcase,
} as const;

export default function SoluzioniPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Soluzioni", href: "/soluzioni" },
        ])}
      />

      <PageHero
        eyebrow="Soluzioni"
        title={
          <>
            Ogni struttura accoglie a modo suo.{" "}
            <em className="font-serif font-medium italic">
              La guida si adatta a te.
            </em>
          </>
        }
        lead="Quattro percorsi pensati per esigenze diverse, dall'accoglienza familiare di un B&B alla gestione di un portafoglio immobiliare. Scegli il tuo punto di partenza."
        crumbs={[{ label: "Home", href: "/" }, { label: "Soluzioni" }]}
      >
        <nav aria-label="Vai al segmento" className="flex flex-wrap gap-2.5">
          {solutionSegments.map((segment) => (
            <a
              key={segment.id}
              href={`#${segment.id}`}
              className="rounded-full border border-forest/20 bg-paper/70 px-4 py-2 text-sm font-medium text-forest transition-colors hover:border-forest/60 hover:bg-paper"
            >
              {segment.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="space-y-20 pb-16 sm:space-y-28 sm:pb-24">
        {solutionSegments.map((segment, index) => {
          const Icon = segmentIcons[segment.icon];
          const isEven = index % 2 === 0;
          return (
            <section key={segment.id} id={segment.id} className="scroll-mt-28">
              <Container>
                <div
                  className={cn(
                    "grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start",
                    !isEven && "lg:grid-cols-[0.95fr_1.05fr]",
                  )}
                >
                  <Reveal className={cn(!isEven && "lg:order-2")}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-ivory">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h2 className="text-balance mt-6 font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
                      {segment.name}
                    </h2>
                    <p className="mt-3 text-sm font-medium text-copper-700">
                      {segment.audience}
                    </p>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                      {segment.shortDescription}
                    </p>

                    <h3 className="mt-9 text-xs font-semibold tracking-[0.18em] text-forest/70 uppercase">
                      Cosa può contenere la guida
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {segment.guideHighlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-sm text-charcoal"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-copper-700"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-wrap gap-3.5">
                      <CtaLink
                        href="/contatti"
                        event={ANALYTICS_EVENTS.ctaClick}
                        eventParams={{ cta: `segment_${segment.id}_demo` }}
                      >
                        Richiedi una demo
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </CtaLink>
                      <CtaLink
                        href="/demo"
                        variant="outline"
                        event={ANALYTICS_EVENTS.ctaClick}
                        eventParams={{ cta: `segment_${segment.id}_guide` }}
                      >
                        Esplora la demo
                      </CtaLink>
                    </div>
                  </Reveal>

                  <Reveal delayMs={120} className={cn(!isEven && "lg:order-1")}>
                    <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:p-8">
                      <h3 className="font-display text-lg font-semibold text-forest">
                        Situazioni comuni nel segmento
                      </h3>
                      <ul className="mt-5 space-y-5">
                        {segment.commonNeeds.map((need) => (
                          <li key={need.title}>
                            <p className="text-sm font-medium text-charcoal">
                              {need.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-muted">
                              {need.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-5 rounded-[2rem] bg-forest p-6 text-ivory shadow-soft sm:p-8">
                      <h3 className="font-display text-lg font-semibold">
                        Benefici potenziali
                      </h3>
                      <p className="mt-1.5 text-xs text-ivory/60">
                        Formulazioni potenziali: i risultati dipendono dalla
                        struttura e da come la guida viene integrata
                        nell&apos;accoglienza.
                      </p>
                      <ul className="mt-5 space-y-3">
                        {segment.potentialBenefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-3 text-sm text-ivory/80"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-copper"
                            />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <CTASection
        title="Non sai da quale percorso partire?"
        description="Raccontaci come lavori e quante strutture gestisci: ti orientiamo verso la soluzione più adatta, senza impegno."
      />
    </>
  );
}
