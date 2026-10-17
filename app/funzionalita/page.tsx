import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  LayoutGrid,
  Languages,
  MapPin,
  MessageCircle,
  Palette,
  PhoneCall,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  plannedFeatures,
  verifiedDemoFeatures,
  type FeatureIcon,
} from "@/data/features";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Funzionalità della Guest Guide",
  description:
    "Cosa contiene una Guest Guide Benvenia: sezioni, esperienza mobile, doppia lingua e contenuti di soggiorno. Distinguiamo con chiarezza le funzionalità verificabili nella demo da quelle concordate in fase di attivazione.",
  path: "/funzionalita",
  ogTitle: "Funzionalità · Benvenia Guide",
  keywords: [
    "funzionalità guest guide",
    "guida digitale check-in",
    "wifi ospiti B&B",
    "guida per ospiti struttura ricettiva",
  ],
});

const featureIcons: Record<FeatureIcon, typeof LayoutGrid> = {
  layout: LayoutGrid,
  smartphone: Smartphone,
  languages: Languages,
  wifi: Wifi,
  map: MapPin,
  phone: PhoneCall,
  sparkles: Sparkles,
  refresh: RefreshCw,
  palette: Palette,
  qr: QrCode,
  shield: ShieldCheck,
  message: MessageCircle,
};

export default function FunzionalitaPage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Funzionalità", href: "/funzionalita" },
        ])}
      />

      <PageHero
        eyebrow="Funzionalità"
        title={
          <>
            Tutto il soggiorno in una guida,{" "}
            <em className="font-serif font-medium italic">sezione per sezione</em>.
          </>
        }
        lead="La struttura della Guest Guide è progettata attorno ai momenti reali del soggiorno: l'arrivo, la permanenza, l'esplorazione del territorio e il contatto con chi ospita."
        crumbs={[{ label: "Home", href: "/" }, { label: "Funzionalità" }]}
      />

      <section className="pb-6">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 rounded-[2rem] border border-dashed border-forest/20 bg-ivory p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div className="flex items-start gap-3">
                <Clock3
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-copper-700"
                />
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  <strong className="font-medium text-charcoal">
                    Trasparenza prima di tutto.
                  </strong>{" "}
                  Benvenia Guide è in fase di lancio controllato. In questa
                  pagina distinguiamo ciò che puoi già verificare nella demo
                  da ciò che viene definito e concordato in fase di
                  attivazione con ogni struttura.
                </p>
              </div>
              <CtaLink
                href="/demo"
                variant="outline"
                className="shrink-0"
                event={ANALYTICS_EVENTS.ctaClick}
                eventParams={{ cta: "features_demo" }}
              >
                Apri la demo
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Verificabili nella demo"
              title="Cosa puoi già provare, adesso."
              lead="Queste funzionalità sono attive nella demo interattiva di questo sito: puoi verificarle direttamente, senza registrazione."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedDemoFeatures.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              return (
                <li key={feature.id}>
                  <Reveal delayMs={(index % 3) * 90}>
                    <div className="flex h-full flex-col rounded-[2rem] border border-line bg-paper p-6 shadow-soft">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-ivory">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-[11px] font-medium text-forest">
                          <CheckCircle2
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-copper-700"
                          />
                          In demo
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-base font-semibold text-forest">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="border-y border-line bg-paper/60 py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Previste per la tua guida"
              title="Ciò che definiremo insieme, in fase di attivazione."
              lead="Queste funzionalità fanno parte del progetto Benvenia Guide ma vengono confermate e calibrate caso per caso: la disponibilità effettiva viene comunicata durante la richiesta di demo."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plannedFeatures.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              return (
                <li key={feature.id}>
                  <Reveal delayMs={(index % 3) * 90}>
                    <div className="flex h-full flex-col rounded-[2rem] border border-line bg-ivory p-6">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-forest">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-copper/40 px-3 py-1 text-[11px] font-medium text-copper-700">
                          In attivazione
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-base font-semibold text-forest">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="La struttura della guida"
              title="Quattro sezioni, i quattro momenti del soggiorno."
            />
          </Reveal>
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Benvenuto",
                text: "Il saluto della struttura, il messaggio di benvenuto e l'accesso rapido a tutto il resto: è la prima cosa che l'ospite vede.",
              },
              {
                title: "Il tuo soggiorno",
                text: "Check-in e check-out, Wi-Fi, servizi disponibili e regole della casa: le informazioni pratiche, ordinate.",
              },
              {
                title: "Esplora",
                text: "Attrazioni, ristoranti ed esperienze con distanze e suggerimenti: il territorio raccontato dalla struttura.",
              },
              {
                title: "Contatti",
                text: "Chi ospita, come raggiungerlo e le domande frequenti del soggiorno: il filo diretto con l'host.",
              },
            ].map((section, index) => (
              <li key={section.title}>
                <Reveal delayMs={(index % 2) * 100}>
                  <div className="flex h-full gap-5 rounded-[2rem] border border-line bg-paper p-7 shadow-soft">
                    <span className="font-serif text-3xl italic text-copper">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-forest">
                        {section.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {section.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CTASection
        title="Vuoi vedere queste funzionalità applicate alla tua struttura?"
        description="Nella demo dedicata partiamo dai tuoi contenuti reali: vedrai subito come apparirebbe la guida della tua struttura."
      />
    </>
  );
}
