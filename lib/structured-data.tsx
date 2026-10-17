import { JsonLd } from "@/components/seo/JsonLd";
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
