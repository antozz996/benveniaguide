import { GuestGuide } from "@/components/guide/GuestGuide";
import type { GuideDefinition, GuideLang } from "@/lib/guide/types";

/**
 * Pagina pubblica della guida (server). `data-guest-guide` nasconde header e
 * footer del sito marketing (regola in app/globals.css).
 */
export function GuestGuidePage({
  guide,
  lang,
}: {
  guide: GuideDefinition;
  lang: GuideLang;
}) {
  const content = guide.content[lang] ?? guide.content.it;

  return (
    <div data-guest-guide lang={lang} className="min-h-dvh bg-ivory">
      <GuestGuide
        slug={guide.slug}
        lang={lang}
        content={content}
        hasEnglish={Boolean(guide.content.en)}
        isSample={Boolean(guide.isSample)}
      />
    </div>
  );
}
