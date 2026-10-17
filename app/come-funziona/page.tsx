import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  MessagesSquare,
  RefreshCw,
  Share2,
  Sparkles,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactFaqs } from "@/data/faqs";
import { processSteps, whatWePrepare, whatYouPrepare } from "@/data/process";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Come funziona: dalla call alla guida condivisa",
  description:
    "Il percorso di Benvenia Guide in sei passaggi: richiesta, raccolta delle informazioni, personalizzazione, revisione, condivisione con gli ospiti e aggiornamenti nel tempo.",
  path: "/come-funziona",
  ogTitle: "Come funziona · Benvenia Guide",
  keywords: [
    "come funziona guest guide",
    "guida digitale struttura ricettiva",
    "creare guida per ospiti",
  ],
});

const stepIcons = {
  message: MessagesSquare,
  clipboard: ClipboardList,
  sparkles: Sparkles,
  check: CheckCircle2,
  share: Share2,
  refresh: RefreshCw,
} as const;

export default function ComeFunzionaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Come funziona", href: "/come-funziona" },
        ])}
      />
      <JsonLd data={faqJsonLd(contactFaqs)} />

      <PageHero
        eyebrow="Come funziona"
        title={
          <>
            Dalle tue informazioni alla guida nelle mani{" "}
            <em className="font-serif font-medium italic">dei tuoi ospiti</em>.
          </>
        }
        lead="Un percorso semplice e guidato, pensato per chi gestisce una struttura e non ha tempo da perdere in tecnicismi. Ogni passaggio è concordato e verificato insieme."
        crumbs={[{ label: "Home", href: "/" }, { label: "Come funziona" }]}
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <ol className="relative space-y-6">
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-[27px] hidden w-px bg-line sm:block"
            />
            {processSteps.map((step, index) => {
              const Icon = stepIcons[step.icon];
              return (
                <li key={step.id} className="relative">
                  <Reveal delayMs={index * 60}>
                    <div className="flex flex-col gap-5 rounded-[2rem] border border-line bg-paper p-6 shadow-soft sm:flex-row sm:gap-8 sm:p-8">
                      <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                        <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest text-ivory">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </span>
                        <span className="font-serif text-2xl italic text-copper sm:mt-1">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h2 className="font-display text-xl font-semibold text-forest sm:text-2xl">
                          {step.title}
                        </h2>
                        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                          {step.description}
                        </p>
                        <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
                          {step.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2 rounded-xl bg-sage-100/70 px-3.5 py-2.5 text-xs leading-relaxed text-forest/85"
                            >
                              <Check
                                aria-hidden="true"
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-copper-700"
                              />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="border-y border-line bg-paper/60 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Il lavoro condiviso"
              title="Tu porti la conoscenza della struttura. Noi, l'organizzazione."
              lead="Nessuno meglio di te conosce la tua accoglienza. Il nostro compito è trasformarla in una guida chiara, senza chiederti di diventare un esperto di web."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[2rem] border border-line bg-paper p-7 shadow-soft">
                <h3 className="font-display text-lg font-semibold text-forest">
                  Cosa prepari tu
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {whatYouPrepare.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-copper"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <div className="h-full rounded-[2rem] bg-forest p-7 text-ivory shadow-soft">
                <h3 className="font-display text-lg font-semibold">
                  Cosa facciamo noi
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {whatWePrepare.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-ivory/75"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-copper"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delayMs={150}>
            <div className="mt-10 flex flex-wrap items-center gap-4 rounded-[2rem] border border-dashed border-forest/20 bg-ivory p-6 sm:p-8">
              <p className="max-w-xl text-sm leading-relaxed text-muted">
                Vuoi vedere il risultato prima di iniziare? La demo interattiva
                ti mostra esattamente la struttura della guida che
                prepareremo.
              </p>
              <CtaLink
                href="/demo"
                variant="outline"
                event={ANALYTICS_EVENTS.ctaClick}
                eventParams={{ cta: "how_demo" }}
              >
                Esplora la demo
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Domande sul percorso"
                title="Prima di iniziare, le domande più comuni."
              />
            </Reveal>
            <Reveal delayMs={100}>
              <div className="space-y-3">
                {contactFaqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group rounded-2xl border border-line bg-paper px-5 py-4 shadow-soft"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-forest sm:text-base [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-forest transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 pr-10 text-sm leading-relaxed text-muted">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        title="Iniziamo dal primo passaggio?"
        description="Raccontaci la tua struttura con il modulo di contatto: ti ricontattiamo per una call breve e senza impegno."
      />
    </>
  );
}
