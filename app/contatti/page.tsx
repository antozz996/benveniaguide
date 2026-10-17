import type { Metadata } from "next";
import { CalendarCheck, Clock3, Mail } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { contactFaqs } from "@/data/faqs";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Contatti e richiesta demo",
  description:
    "Richiedi una demo gratuita di Benvenia Guide: compila il modulo per essere ricontattato, conoscere il prodotto e ricevere un'offerta su misura per la tua struttura.",
  path: "/contatti",
  ogTitle: "Richiedi una demo · Benvenia Guide",
});

export default function ContattiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Contatti", href: "/contatti" },
        ])}
      />
      <JsonLd data={faqJsonLd(contactFaqs)} />

      <PageHero
        eyebrow="Contatti"
        title={
          <>
            Richiedi una demo{" "}
            <em className="font-serif font-medium italic">della tua guida</em>.
          </>
        }
        lead="Compila il modulo: ti ricontattiamo per una call breve e senza impegno, ascoltiamo le esigenze della tua struttura e ti mostriamo una demo dedicata."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contatti" }]}
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <LeadForm />
            </Reveal>

            <div className="space-y-5">
              <Reveal delayMs={80}>
                <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft">
                  <h2 className="font-display text-lg font-semibold text-forest">
                    Cosa succede dopo
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {[
                      {
                        icon: Mail,
                        title: "Ti ricontattiamo",
                        text: "Rispondiamo alla richiesta per fissare una call conoscitiva.",
                      },
                      {
                        icon: CalendarCheck,
                        title: "Call breve, senza impegno",
                        text: "Una ventina di minuti per capire esigenze e contesto della struttura.",
                      },
                      {
                        icon: Clock3,
                        title: "Demo dedicata",
                        text: "Ti mostriamo come apparirebbe la guida con i contenuti della tua struttura.",
                      },
                    ].map((step) => (
                      <li key={step.title} className="flex items-start gap-3.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-forest">
                          <step.icon aria-hidden="true" className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {step.title}
                          </p>
                          <p className="mt-0.5 text-sm text-muted">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delayMs={140}>
                <div className="rounded-[2rem] border border-dashed border-forest/20 bg-ivory p-6">
                  <div className="flex items-start gap-3">
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-copper-700"
                    />
                    <div>
                      <h2 className="font-display text-base font-semibold text-forest">
                        Preferisci scrivere una email?
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        Scrivici a{" "}
                        <a
                          href="mailto:info@benveniaguide.it"
                          className="font-medium text-forest underline underline-offset-2"
                        >
                          info@benveniaguide.it
                        </a>
                        : leggiamo tutte le richieste e rispondiamo direttamente
                        dal team.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="rounded-[2rem] border border-line bg-paper p-6 shadow-soft">
                  <h2 className="font-display text-base font-semibold text-forest">
                    Domande frequenti
                  </h2>
                  <div className="mt-4 space-y-3">
                    {contactFaqs.map((faq) => (
                      <details
                        key={faq.q}
                        className="group rounded-2xl border border-line bg-ivory/60 px-4 py-3"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-forest [&::-webkit-details-marker]:hidden">
                          {faq.q}
                          <span
                            aria-hidden="true"
                            className="text-lg leading-none text-copper-700 transition-transform duration-200 group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted">
                          {faq.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delayMs={260}>
                <div className="rounded-[2rem] bg-forest p-6 text-ivory">
                  <h2 className="font-display text-base font-semibold">
                    I tuoi dati, con rispetto
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/75">
                    Le informazioni inviate tramite questo modulo vengono usate
                    esclusivamente per rispondere alla tua richiesta. Non
                    iscriviamo nessuno a liste commerciali in automatico e non
                    cediamo i contatti a terzi.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
