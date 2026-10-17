import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Titolo breve usato nelle OG image generate. */
  ogTitle?: string;
  noIndex?: boolean;
  /** Parole chiave principali della pagina (max ~6, nessun keyword stuffing). */
  keywords?: string[];
  /** Per gli articoli: attiva og:type=article con data di pubblicazione. */
  article?: { publishedTime: string; modifiedTime: string };
}

/**
 * Genera metadati coerenti (canonical, Open Graph, Twitter) per ogni pagina.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  noIndex = false,
  keywords,
  article,
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: ogTitle ?? `${title} · ${siteConfig.productName}`,
      description,
      url,
      siteName: siteConfig.productName,
      locale: siteConfig.locale,
      type: article ? "article" : "website",
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? `${title} · ${siteConfig.productName}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
