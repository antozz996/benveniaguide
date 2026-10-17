import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/lib/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Titolo breve usato nelle OG image generate. */
  ogTitle?: string;
  noIndex?: boolean;
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
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: ogTitle ?? `${title} · ${siteConfig.productName}`,
      description,
      url,
      siteName: siteConfig.productName,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? `${title} · ${siteConfig.productName}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
