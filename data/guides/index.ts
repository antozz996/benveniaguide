/**
 * Registro delle guide pubblicate (contenuti versionati nel repo).
 * Per pubblicare la guida di un cliente vedi INIZIA-DA-QUI.md
 * ("Come pubblicare la guida di un cliente").
 */
import type { GuideDefinition, GuideLang } from "@/lib/guide/types";
import {
  guideHasLanguage,
  guideManifest,
  type GuideSlug,
} from "@/data/guides/manifest";
import { guide as esempioCasaDelBorgo } from "@/data/guides/esempio-casa-del-borgo";

/** Se il manifest ha uno slug senza contenuti, la build fallisce (tipi). */
const guides = {
  "esempio-casa-del-borgo": esempioCasaDelBorgo,
} satisfies Record<GuideSlug, GuideDefinition>;

// Coerenza manifest <-> contenuti: rompe la build, mai la produzione.
for (const entry of guideManifest) {
  const definition: GuideDefinition = guides[entry.slug];
  if (definition.slug !== entry.slug) {
    throw new Error(`Guida "${entry.slug}": slug diverso nel file (${definition.slug}).`);
  }
  for (const lang of ["it", "en"] as const satisfies GuideLang[]) {
    if (guideHasLanguage(entry, lang) !== Boolean(definition.content[lang])) {
      throw new Error(`Guida "${entry.slug}": lingua "${lang}" incoerente tra manifest e contenuti.`);
    }
  }
}

export function getGuide(slug: string): GuideDefinition | undefined {
  return Object.hasOwn(guides, slug) ? guides[slug as GuideSlug] : undefined;
}

/** Params di /g/[slug]: sempre almeno uno (guida di esempio). */
export function guideStaticParams(): { slug: string }[] {
  return guideManifest.map((entry) => ({ slug: entry.slug }));
}

/** Params di /g/[slug]/en: sempre almeno uno (la guida di esempio ha EN). */
export function guideEnStaticParams(): { slug: string }[] {
  return guideManifest
    .filter((entry) => guideHasLanguage(entry, "en"))
    .map((entry) => ({ slug: entry.slug }));
}
