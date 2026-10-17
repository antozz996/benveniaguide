import { JsonLd } from "@/components/seo/JsonLd";
import type { Article } from "@/data/articles";
import type { FaqItem } from "@/data/faqs";
import { siteConfig, siteUrl } from "@/lib/site";
import type { Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Structured data JSON-LD.
 * Solo entità fattualmente corrette: niente recensioni, valutazioni,
 * prezzi o dati societari inventati.
 */

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.productName,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: siteConfig.description,
  };
}

export function serviceJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Guest Guide digitale per strutture ricettive",
    serviceType: "Guest guide digitale personalizzata",
    url: siteUrl,
    description:
      "Realizzazione di una guida digitale personalizzata per gli ospiti di B&B, case vacanza, boutique hotel e property manager: check-in, servizi, regole, consigli sul territorio e contatti dell'host.",
    provider: {
      "@type": "Organization",
      name: siteConfig.productName,
      url: siteUrl,
    },
    areaServed: { "@type": "Country", name: "Italia" },
    audience: {
      "@type": "BusinessAudience",
      name: "Strutture ricettive (B&B, case vacanza, boutique hotel, property manager)",
    },
  };
}

export function articlesListJsonLd(items: Article[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Risorse Benvenia Guide",
    url: `${siteUrl}/risorse`,
    inLanguage: "it-IT",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/risorse/${article.slug}`,
        name: article.title,
      })),
    },
  };
}

export function articleJsonLd(article: Article): Record<string, unknown> {
  const url = `${siteUrl}/risorse/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    inLanguage: "it-IT",
    datePublished: article.date,
    dateModified: article.date,
    image: `${siteUrl}/risorse/${article.slug}/opengraph-image`,
    author: { "@type": "Organization", name: siteConfig.productName, url: siteUrl },
    publisher: { "@type": "Organization", name: siteConfig.productName, url: siteUrl },
  };
}

export function webSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.productName,
    url: siteUrl,
    inLanguage: "it-IT",
    publisher: { "@type": "Organization", name: siteConfig.productName },
  };
}

export function softwareApplicationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    inLanguage: "it-IT",
    description: siteConfig.description,
    featureList: [
      "Guest Guide digitale personalizzata",
      "Informazioni di check-in e check-out",
      "Servizi e regole della struttura",
      "Consigli sul territorio",
      "Contatti dell'host",
    ],
  };
}

export function faqJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(items: Crumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };
}

export function StructuredData() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={webSiteJsonLd()} />
    </>
  );
}
