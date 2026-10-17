import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { articles, getArticle } from "@/data/articles";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/risorse/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.seoTitle,
    description: article.description,
    path: `/risorse/${article.slug}`,
    ogTitle: article.title,
    keywords: ["guida per ospiti", article.topic.toLowerCase(), "ospitalità"],
    article: { publishedTime: article.date, modifiedTime: article.date },
  });
}

export default async function ArticlePage({
  params,
}: PageProps<"/risorse/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const otherArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Risorse", href: "/risorse" },
          { label: article.seoTitle, href: `/risorse/${article.slug}` },
        ])}
      />
      <JsonLd data={articleJsonLd(article)} />

      <PageHero
        eyebrow={article.topic}
        title={article.title}
        lead={article.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Risorse", href: "/risorse" },
          { label: article.seoTitle },
        ]}
      >
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <span>{article.displayDate}</span>
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" className="h-4 w-4" />
            Lettura di ~{article.readingMinutes} min
          </span>
        </p>
      </PageHero>

      <section className="pb-16 sm:pb-24">
        <Container>
          <article className="mx-auto max-w-3xl">
            <div className="space-y-12">
              {article.sections.map((section, index) => (
                <Reveal key={section.heading} delayMs={index * 40}>
                  <section aria-label={section.heading}>
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-forest sm:text-3xl">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mt-4 text-base leading-relaxed text-charcoal/90"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.list ? (
                      <ul className="mt-5 space-y-2.5">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-base text-charcoal/90"
                          >
                            <Check
                              aria-hidden="true"
                              className="mt-1 h-4 w-4 shrink-0 text-copper-700"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-14 rounded-[2rem] border border-line bg-paper p-7 shadow-soft sm:p-9">
                <h2 className="font-display text-lg font-semibold text-forest">
                  Link utili per approfondire
                </h2>
                <div className="mt-5 space-y-4">
                  {article.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-ivory/60 px-5 py-4 transition-colors hover:border-forest/40"
                    >
                      <span>
                        <span className="block text-sm font-medium text-forest">
                          {link.label}
                        </span>
                        <span className="mt-1 block text-sm text-muted">
                          {link.description}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1 h-4 w-4 shrink-0 text-copper-700 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/risorse"
                className="inline-flex items-center gap-2 text-sm font-medium text-forest underline-offset-4 hover:underline"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Tutti gli articoli
              </Link>
              <CtaLink
                href="/demo"
                variant="outline"
                event={ANALYTICS_EVENTS.ctaClick}
                eventParams={{ cta: "article_demo", article: article.slug }}
              >
                Esplora la demo interattiva
              </CtaLink>
            </div>
          </article>

          {otherArticles.length > 0 ? (
            <div className="mx-auto mt-16 max-w-3xl border-t border-line pt-10">
              <h2 className="font-display text-lg font-semibold text-forest">
                Continua a leggere
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {otherArticles.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/risorse/${item.slug}`}
                    className="group rounded-[1.75rem] border border-line bg-paper p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1"
                  >
                    <span className="text-xs font-semibold tracking-[0.18em] text-copper-700 uppercase">
                      {item.topic}
                    </span>
                    <h3 className="text-balance mt-3 font-display text-base leading-snug font-semibold text-forest">
                      {item.title}
                    </h3>
                    <span className="mt-4 flex items-center gap-1.5 text-xs font-medium text-forest">
                      Leggi l&apos;articolo
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <CTASection
        title="Ti piacerebbe una guida così per i tuoi ospiti?"
        description="Partiamo dai contenuti della tua struttura e costruiamo una Guest Guide con il tuo tono, ordinata e sempre aggiornata."
      />
    </>
  );
}
