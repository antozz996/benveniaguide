import { getArticle } from "@/data/articles";
import { ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Articolo — Risorse Benvenia Guide";

export const size = ogImageSize;

export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return renderOgImage({
    eyebrow: article?.topic ?? "Risorse",
    title: article?.seoTitle ?? "Idee e guide pratiche per chi accoglie.",
  });
}
