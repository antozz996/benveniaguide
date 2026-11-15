/**
 * Elenco leggero delle guide pubblicate (/g/<slug>, /g/<slug>/en).
 * E' importato anche da proxy.ts: qui NON vanno importati i contenuti.
 *
 * VINCOLI (cacheComponents):
 * - generateStaticParams deve restituire almeno un param, altrimenti la build
 *   fallisce: la guida di esempio non va mai rimossa;
 * - almeno una guida deve avere "en" (la guida di esempio ce l'ha), per
 *   /g/[slug]/en.
 */
export const guideManifest = [
  { slug: "esempio-casa-del-borgo", languages: ["it", "en"] },
] as const satisfies readonly {
  slug: string;
  languages: readonly ("it" | "en")[];
}[];

export type GuideSlug = (typeof guideManifest)[number]["slug"];

export function guideHasLanguage(
  entry: (typeof guideManifest)[number],
  lang: "it" | "en",
): boolean {
  return (entry.languages as readonly string[]).includes(lang);
}

/** Path validi delle guide, senza slash finale. */
export const knownGuidePaths: ReadonlySet<string> = new Set(
  guideManifest.flatMap((guide) => [
    `/g/${guide.slug}`,
    ...(guideHasLanguage(guide, "en") ? [`/g/${guide.slug}/en`] : []),
  ]),
);
