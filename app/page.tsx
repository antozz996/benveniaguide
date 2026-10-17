import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Check,
  Compass,
  Heart,
  Home,
  Map as MapIcon,
  MessagesSquare,
  Search,
  Sparkle,
  Sparkles,
  Umbrella,
} from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { GuideDemo } from "@/components/demo/GuideDemo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { benefits, problemFragments, problemItems, type BenefitItem } from "@/data/home";
import { articles } from "@/data/articles";
import { homeFaqs } from "@/data/faqs";
import { homeSteps } from "@/data/process";
import { solutionSegments } from "@/data/solutions";
import {
  faqJsonLd,
  serviceJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/structured-data";
import { buildMetadata } from "@/lib/metadata";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { ctas, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Guest Guide digitale per B&B, case vacanza e hotel",
  description:
    "Benvenia Guide raccoglie check-in, Wi-Fi, servizi, regole e consigli locali in una guida digitale personalizzata e sempre disponibile per i tuoi ospiti. Prova la demo interattiva.",
  path: "/",
  ogTitle: "Benvenia Guide — L'accoglienza continua oltre il check-in",
  keywords: [
    "guest guide digitale",
    "guida digitale per B&B",
    "guida per ospiti",
    "guida digitale casa vacanza",
    "guest guide boutique hotel",
  ],
});

const benefitIcons: Record<BenefitItem["icon"], typeof Heart> = {
  search: Search,
  heart: Heart,
  messages: MessagesSquare,
  map: MapIcon,
  spring: Compass,
};

const segmentIcons = {
  home: Home,
  beach: Umbrella,
  sparkle: Sparkle,
  briefcase: Briefcase,
} as const;

const stepIcons = {
  message: MessagesSquare,
  clipboard: BadgeCheck,
  sparkles: Sparkles,
  check: Check,
  share: ArrowUpRight,
  refresh: Sparkle,
} as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={serviceJsonLd()} />
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* A. HERO */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-6rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-sage-200/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-10rem] left-[-10rem] h-[24rem] w-[24rem] rounded-full bg-copper/10 blur-3xl"
        />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-forest/15 bg-paper/70 px-4 py-2 text-xs font-medium text-forest">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-copper"
                />
                Guest guide digitale per strutture ricettive
              </p>
              <h1
                className="animate-fade-up text-balance mt-6 font-display text-4xl leading-[1.06] font-semibold tracking-tight text-forest sm:text-5xl lg:text-6xl"
                style={{ animationDelay: "80ms" }}
              >
                L&apos;accoglienza migliore continua{" "}
                <em className="font-serif font-medium italic">
                  oltre il check-in
                </em>
                .
              </h1>
              <p
                className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted"
                style={{ animationDelay: "160ms" }}
              >
                Tutte le informazioni del soggiorno in una guida digitale
                personalizzata per la tua struttura: check-in, servizi, regole e
                i tuoi consigli sul territorio, sempre a portata di mano
                dell&apos;ospite.
              </p>
              <div
                className="animate-fade-up mt-9 flex flex-wrap items-center gap-4"
                style={{ animationDelay: "240ms" }}
              >
                <CtaLink
                  href={ctas.primary.href}
                  size="lg"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "hero_demo" }}
                >
                  {ctas.primary.label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </CtaLink>
                <CtaLink
                  href={ctas.secondary.href}
                  size="lg"
                  variant="outline"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "hero_guide" }}
                >
                  {ctas.secondary.label}
                </CtaLink>
              </div>
              <ul
                className="animate-fade-up mt-8 flex flex-wrap gap-x-7 gap-y-2.5 text-sm text-muted"
                style={{ animationDelay: "320ms" }}
              >
                {[
                  "Demo gratuita e senza impegno",
                  "Guida pronta in tre passaggi",
                  "Nessuna app da installare per gli ospiti",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 text-copper-700"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-10 bottom-0 rounded-[3rem] bg-forest/90"
              />
              <div className="relative flex justify-center py-8">
                <GuideDemo variant="compact" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-16 -left-6 hidden animate-hero-float rounded-2xl border border-line bg-paper px-4 py-3 shadow-lift xl:block"
              >
                <p className="text-[10px] font-semibold tracking-[0.16em] text-copper-700 uppercase">
                  Wi-Fi
                </p>
                <p className="font-mono text-xs font-semibold text-forest">
                  CasaDemo_Guest
                </p>
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-20 hidden animate-hero-float rounded-2xl border border-line bg-paper px-4 py-3 shadow-lift xl:block"
                style={{ animationDelay: "1.2s" }}
              >
                <p className="text-[10px] font-semibold tracking-[0.16em] text-copper-700 uppercase">
                  Check-in
                </p>
                <p className="text-xs font-semibold text-forest">
                  Dalle 15:00 alle 20:00
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* B. IL PROBLEMA */}
      <section className="border-y border-line bg-paper/60 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Il problema"
              title="Le stesse domande, ogni settimana. Le risposte, ovunque tranne che nelle mani dell'ospite."
              lead="In molte strutture ricettive le informazioni più richieste tornano a ripetersi su canali diversi. È una situazione comune, non un difetto: semplicemente, senza un punto di riferimento unico, ogni risposta ricomincia da capo."
            />
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <ul className="space-y-3.5">
                {problemItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3.5 rounded-2xl border border-line bg-paper px-5 py-4 shadow-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs font-semibold text-forest"
                    >
                      ?
                    </span>
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {item.question}
                      </p>
                      <p className="mt-1 text-sm text-muted">{item.context}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delayMs={120}>
              <div className="rounded-[2rem] border border-dashed border-forest/20 bg-ivory p-6 sm:p-8">
                <h3 className="font-display text-lg font-semibold text-forest">
                  Dove finiscono oggi le informazioni
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Un&apos;email di conferma, due messaggi in chat, un foglio in
                  cucina: informazioni preziose distribuite in posti che
                  l&apos;ospite non conosce.
                </p>
                <ul className="mt-6 space-y-4">
                  {problemFragments.map((fragment) => (
                    <li key={fragment.label} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-copper"
                      />
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {fragment.label}
                        </p>
                        <p className="text-sm text-muted">{fragment.note}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* C. LA SOLUZIONE */}
      <section className="bg-forest py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="La soluzione"
                title="Benvenia Guide: un unico punto di riferimento digitale per l'ospite."
                lead="Accogliamo le informazioni della tua struttura in una guida ordinata, curata e piacevole da leggere dal telefono. L'ospite trova subito ciò che serve; tu continui ad accogliere come sai fare."
              />
              <div className="mt-8">
                <CtaLink
                  href="/funzionalita"
                  variant="ghost-dark"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "solution_features" }}
                >
                  Scopri tutte le funzionalità
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </CtaLink>
              </div>
            </Reveal>
            <Reveal delayMs={120}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Informazioni chiare",
                    text: "Check-in, Wi-Fi, servizi e regole organizzati come li cercherebbe un ospite, non come sono capitati nei tuoi appunti.",
                  },
                  {
                    title: "Coerente con il tuo brand",
                    text: "Il tono e i contenuti raccontano la stessa cura che si vive nella struttura.",
                  },
                  {
                    title: "Sempre aggiornata",
                    text: "Un orario cambia? La guida si aggiorna: niente fogli da ristampare.",
                  },
                  {
                    title: "Sul territorio",
                    text: "I tuoi consigli su dove mangiare ed esplorare diventano una sezione curata e utile.",
                  },
                ].map((pillar) => (
                  <li
                    key={pillar.title}
                    className="rounded-2xl border border-ivory/12 bg-ivory/5 p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-ivory">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                      {pillar.text}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* D. DEMO PREVIEW */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Provala adesso"
              title="Questa non è uno screenshot: esplora la Guest Guide."
              lead="Naviga la demo come farebbe un tuo ospite: sfoglia le sezioni, apri i dettagli, cambia lingua. Struttura, nomi e dati sono fittizi."
            />
          </Reveal>
          <Reveal delayMs={120}>
            <div className="mt-12">
              <GuideDemo variant="compact" />
            </div>
            <div className="mt-8 flex justify-center">
              <CtaLink
                href="/demo"
                variant="primary"
                event={ANALYTICS_EVENTS.ctaClick}
                eventParams={{ cta: "home_demo_page" }}
              >
                Apri la demo completa
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* E. COME FUNZIONA */}
      <section className="border-y border-line bg-paper/60 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Come funziona"
              title="Tre passaggi, nessun tecnicismo."
              lead="Dalla prima call alla guida nelle mani dei tuoi ospiti, il percorso è guidato: pensiamo noi all'organizzazione, tu porti la conoscenza della tua struttura."
            />
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {homeSteps.map((step, index) => {
              const Icon = stepIcons[step.icon];
              return (
                <li key={step.title}>
                  <Reveal delayMs={index * 100}>
                    <div className="relative flex h-full flex-col rounded-[2rem] border border-line bg-paper p-7 shadow-soft">
                      <span className="font-serif text-3xl italic text-copper">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-5 flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-forest">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-semibold text-forest">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
          <Reveal delayMs={200}>
            <div className="mt-10">
              <CtaLink
                href={ctas.tertiary.href}
                variant="outline"
                event={ANALYTICS_EVENTS.ctaClick}
                eventParams={{ cta: "home_how_it_works" }}
              >
                Scopri come funziona nel dettaglio
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* F. BENEFICI */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Benefici"
              title="Cosa può cambiare con una Guest Guide ben fatta."
              lead="Benefici potenziali, non garanzie: il risultato dipende dalla struttura, dai contenuti e da come la guida viene integrata nell'accoglienza quotidiana."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[benefit.icon];
              return (
                <li key={benefit.id}>
                  <Reveal delayMs={(index % 3) * 90}>
                    <div className="flex h-full flex-col rounded-[2rem] border border-line bg-paper p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-ivory">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-base font-semibold text-forest">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {benefit.description}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* G. TIPOLOGIE DI STRUTTURE */}
      <section className="border-y border-line bg-paper/60 py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Per chi è"
              title="Una guida per ogni modo di accogliere."
              lead="Ogni tipologia di struttura ha esigenze diverse: le nostre soluzioni partono da casi d'uso concreti, non da un modello unico."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutionSegments.map((segment, index) => {
              const Icon = segmentIcons[segment.icon];
              return (
                <li key={segment.id}>
                  <Reveal delayMs={index * 80}>
                    <Link
                      href={`/soluzioni#${segment.id}`}
                      className="group flex h-full flex-col rounded-[2rem] border border-line bg-paper p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-forest/25"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-forest transition-colors group-hover:bg-forest group-hover:text-ivory">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-lg font-semibold text-forest">
                        {segment.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {segment.shortDescription}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-copper-700">
                        Scopri di più
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* H-bis. Risorse */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Risorse"
              title="Idee e guide pratiche per chi accoglie."
              lead="Metodi e spunti per organizzare le informazioni della tua struttura: cosa scrivere nella guida per gli ospiti, come ridurre le domande ripetitive, quando ha senso il digitale e quando no."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delayMs={index * 80} className="h-full">
                <Link
                  href={`/risorse/${article.slug}`}
                  className="group flex h-full flex-col rounded-[2rem] border border-line bg-paper p-7 shadow-soft transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-semibold tracking-[0.18em] text-copper-700 uppercase">
                    {article.topic}
                  </span>
                  <h3 className="text-balance mt-4 font-display text-lg leading-snug font-semibold text-forest">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {article.description}
                  </p>
                  <span className="mt-5 flex items-center justify-between text-xs text-muted">
                    <span>Lettura di ~{article.readingMinutes} min</span>
                    <span className="flex items-center gap-1.5 font-medium text-forest">
                      Leggi
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink
              href="/risorse"
              variant="outline"
              event={ANALYTICS_EVENTS.ctaClick}
              eventParams={{ cta: "home_risorse" }}
            >
              Tutte le risorse
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </CtaLink>
          </div>
        </Container>
      </section>

      {/* H. FAQ */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Domande frequenti"
                title="Le risposte alle domande che riceviamo più spesso."
                lead="Se non trovi la tua domanda, scrivici dal modulo di contatto: rispondiamo volentieri."
              />
              <div className="mt-8">
                <CtaLink
                  href="/contatti"
                  variant="outline"
                  event={ANALYTICS_EVENTS.ctaClick}
                  eventParams={{ cta: "faq_contact" }}
                >
                  Fai una domanda
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </CtaLink>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <div className="space-y-3">
                {homeFaqs.map((faq) => (
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

      {/* I. CTA FINALE */}
      <CTASection />

      <Container className="pb-14">
        <p className="text-xs text-muted">
          {siteConfig.productName} è in fase di lancio controllato: le
          funzionalità disponibili vengono confermate durante la richiesta di
          demo.
        </p>
      </Container>
    </>
  );
}
