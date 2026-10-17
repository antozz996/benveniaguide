import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/data/articles";
import { buildMetadata } from "@/lib/metadata";
import { articlesListJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Risorse per host e property manager",
  description:
    "Articoli pratici per chi accoglie: ridurre le domande ripetitive, costruire la guida perfetta per gli ospiti, scegliere tra digitale e stampato. Niente teoria, solo metodo.",
  path: "/risorse",
  ogTitle: "Risorse per chi accoglie · Benvenia Guide",
  keywords: [
    "guida per ospiti",
    "gestione B&B",
    "ospitalità",
    "guest guide",
    "accoglienza digitale",
  ],
});

export default function RisorsePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Risorse", href: "/risorse" },
        ])}
      />
      <JsonLd data={articlesListJsonLd(articles)} />

      <PageHero
        eyebrow="Risorse"
        title={
          <>
            Idee e guide pratiche{" "}
            <em className="font-serif font-medium italic">per chi accoglie</em>.
          </>
        }
        lead="Metodi e spunti per gestire meglio le informazioni della tua struttura: cosa scrivere nella guida per gli ospiti, come ridurre le domande ripetitive, quando ha senso il digitale e quando no."
        crumbs={[{ label: "Home", href: "/" }, { label: "Risorse" }]}
      />

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delayMs={index * 80} className="h-full">
                <Link
                  href={`/risorse/${article.slug}`}
                  className="group flex h-full flex-col rounded-[2rem] border border-line bg-paper p-7 shadow-soft transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="text-xs font-semibold tracking-[0.18em] text-copper-700 uppercase">
                    {article.topic}
                  </span>
                  <h2 className="text-balance mt-4 font-display text-xl leading-snug font-semibold text-forest">
                    {article.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {article.description}
                  </p>
                  <span className="mt-6 flex items-center justify-between text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                      Lettura di ~{article.readingMinutes} min
                    </span>
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

          <p className="mt-10 text-sm text-muted">
            {articles.length} articoli pubblicati · aggiornati al{" "}
            {articles[articles.length - 1].displayDate}. Nuovi contenuti in
            arrivo: questa sezione cresce insieme a chi ci segue.
          </p>
        </Container>
      </section>

      <CTASection
        title="Vuoi applicare questi spunti alla tua struttura?"
        description="Raccontaci come accogli: ti mostriamo come apparirebbe la tua Guest Guide e quali informazioni vale la pena organizzare per prime."
      />
    </>
  );
}
