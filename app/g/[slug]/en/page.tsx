import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuestGuidePage } from "@/components/guide/GuestGuidePage";
import { getGuide, guideEnStaticParams } from "@/data/guides";
import { buildMetadata } from "@/lib/metadata";

// Con cacheComponents servono >= 1 param: almeno una guida deve avere EN
// (la guida di esempio ce l'ha). NON esportare dynamicParams/dynamic.
export function generateStaticParams() {
  return guideEnStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/g/[slug]/en">): Promise<Metadata> {
  const { slug } = await params;
  const content = getGuide(slug)?.content.en;
  if (!content) return { robots: { index: false, follow: false } };

  const metadata = buildMetadata({
    title: `${content.structure.name} · Guest guide`,
    description: content.structure.tagline,
    path: `/g/${slug}/en`,
    noIndex: true,
  });
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, locale: "en_GB" },
  };
}

export default async function GuideEnPage({
  params,
}: PageProps<"/g/[slug]/en">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide || !guide.content.en) notFound();

  return <GuestGuidePage guide={guide} lang="en" />;
}
