import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuestGuidePage } from "@/components/guide/GuestGuidePage";
import { getGuide, guideStaticParams } from "@/data/guides";
import { buildMetadata } from "@/lib/metadata";

// Con cacheComponents servono >= 1 param: la guida di esempio lo garantisce.
// NON esportare dynamicParams/dynamic/revalidate (vietati con cacheComponents).
// Gli slug sconosciuti ricevono un vero 404 da proxy.ts; notFound() resta
// come difesa in profondita'.
export function generateStaticParams() {
  return guideStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/g/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { robots: { index: false, follow: false } };
  const content = guide.content.it;

  return buildMetadata({
    title: `${content.structure.name} · Guida ospiti`,
    description: content.structure.tagline,
    path: `/g/${guide.slug}`,
    noIndex: true,
  });
}

export default async function GuidePage({ params }: PageProps<"/g/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return <GuestGuidePage guide={guide} lang="it" />;
}
