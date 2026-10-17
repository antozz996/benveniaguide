import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Languages,
  MapPin,
  Smartphone,
  Wifi,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { GuideDemo } from "@/components/demo/GuideDemo";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { ctas } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Demo interattiva della Guest Guide",
  description:
    "Esplora la Guest Guide dimostrativa di Benvenia Guide: naviga benvenuto, soggiorno, territorio e contatti come farebbe un tuo ospite. Demo interattiva su smartphone, anche a schermo intero.",
  path: "/demo",
  ogTitle: "Demo interattiva · Benvenia Guide",
});

const focusPoints = [
  {
    icon: Smartphone,
    title: "Un'esperienza mobile-first",
    text: "La guida è pensata per lo smartphone: apre subito, senza app da installare e senza menu complicati.",
  },
  {
    icon: Wifi,
    title: "Le informazioni di servizio",
    text: "Prova la sezione Soggiorno: check-in, Wi-Fi, servizi e regole in un colpo d'occhio.",
  },
  {
    icon: MapPin,
    title: "Le schede del territorio",
    text: "Apri una scheda in Esplora: descrizione, distanza e il consiglio dell'host, come per i tuoi luoghi preferiti.",
  },
  {
    icon: Languages,
    title: "La doppia lingua",
    text: "Passa da italiano a inglese con un tocco: utile quando accogli ospiti internazionali.",
  },
];

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Demo interattiva"
        title={
          <>
            Esplora una Guest Guide,{" "}
            <em className="font-serif font-medium italic">
              esattamente come la vedrà il tuo ospite
            </em>
            .
          </>
        }
        lead="Questa demo è realmente navigabile: tocca le sezioni, apri i dettagli, cambia lingua. Struttura, nomi e dati sono fittizi e chiaramente identificati come dimostrativi."
        crumbs={[{ label: "Home", href: "/" }, { label: "Demo" }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <CtaLink
            href={ctas.primary.href}
            size="lg"
            event={ANALYTICS_EVENTS.ctaClick}
            eventParams={{ cta: "demo_page_demo" }}
          >
            {ctas.primary.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </CtaLink>
          <p className="text-sm text-muted">
            Oppure continua a esplorare qui sotto: nessun download, nessuna
            registrazione.
          </p>
        </div>
      </PageHero>

      <section className="pb-16 sm:pb-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-paper px-4 py-12 shadow-soft sm:px-10 sm:py-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-sage-200/50 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-copper/10 blur-3xl"
              />
              <div className="relative">
                <GuideDemo variant="page" />
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <p className="mt-6 text-center text-sm text-muted">
              Suggerimento: usa lo schermo intero per un&apos;esperienza più
              vicina a quella reale, oppure continua sul telefono — la demo è
              identica.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-line bg-paper/60 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Cosa osservare"
              title="Quattro dettagli che fanno la differenza per l'ospite."
              lead="Mentre navighi la demo, presta attenzione a questi aspetti: sono gli stessi che curiamo nella guida della tua struttura."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {focusPoints.map((point, index) => (
              <li key={point.title}>
                <Reveal delayMs={(index % 2) * 100}>
                  <div className="flex h-full gap-4 rounded-[2rem] border border-line bg-paper p-6 shadow-soft">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-ivory">
                      <point.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-forest">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {point.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delayMs={150}>
            <div className="mt-10 rounded-[2rem] border border-dashed border-forest/20 bg-ivory p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-forest">
                Come leggere questa demo
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "I contenuti (struttura, luoghi, credenziali Wi-Fi) sono fittizi: la guida reale conterrà solo le informazioni che ci fornisci tu.",
                  "I pulsanti di contatto mostrano un avviso di demo invece di avviare chiamate o email.",
                  "Nella versione per la tua struttura, le sezioni e il tono vengono adattati alla tua accoglienza.",
                ].map((note) => (
                  <li key={note} className="flex items-start gap-3 text-sm text-muted">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-copper-700"
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Ti piacerebbe una guida così per la tua struttura?"
        description="Raccontaci chi sei e come accogli: prepariamo una demo dedicata con i contenuti della tua struttura e ti mostriamo il potenziale."
      />
    </>
  );
}
