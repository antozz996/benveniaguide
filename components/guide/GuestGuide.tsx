"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GuideShell } from "@/components/guide/GuideShell";
import type { GuideContent, GuideLang } from "@/lib/guide/types";
import { cn } from "@/lib/utils";

interface GuestGuideProps {
  slug: string;
  lang: GuideLang;
  content: GuideContent;
  hasEnglish: boolean;
  isSample: boolean;
}

/**
 * Guida reale per l'ospite, a tutto schermo sul telefono.
 * Nessun evento analytics (follow-up: evento dedicato in lib/analytics).
 */
export function GuestGuide({
  slug,
  lang,
  content,
  hasEnglish,
  isSample,
}: GuestGuideProps) {
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const handleAction = useCallback(
    async (target: string) => {
      if (target !== "wifi_copy") return;
      const fallbackOk = lang === "en" ? "Copied" : "Copiato";
      const fallbackKo = lang === "en" ? "Copy failed" : "Copia non riuscita";
      try {
        await navigator.clipboard.writeText(content.stay.wifi.password);
        showToast(content.ui.toastCopied ?? fallbackOk);
      } catch {
        showToast(content.ui.toastCopyFailed ?? fallbackKo);
      }
    },
    [content, lang, showToast],
  );

  const basePath = `/g/${slug}`;
  const languageSwitch = hasEnglish ? (
    <nav
      aria-label={content.ui.languageLabel}
      className="flex rounded-full border border-line p-0.5"
    >
      {(["it", "en"] as const).map((code) => {
        const isCurrent = lang === code;
        return (
          <Link
            key={code}
            href={code === "it" ? basePath : `${basePath}/en`}
            hrefLang={code}
            replace
            scroll={false}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold uppercase transition-colors",
              isCurrent ? "bg-forest text-ivory" : "text-muted hover:text-forest",
            )}
          >
            {code}
          </Link>
        );
      })}
    </nav>
  ) : null;

  const badge = isSample ? (
    <span className="rounded-full bg-copper/15 px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] text-copper-700 uppercase">
      {lang === "en" ? "Sample" : "Esempio"}
    </span>
  ) : null;

  return (
    <GuideShell
      variant="fullpage"
      idPrefix="guide"
      content={content}
      lang={lang}
      languageSwitch={languageSwitch}
      badge={badge}
      onAction={(target) => void handleAction(target)}
      hideUnlinkedActions
      toast={toast}
    />
  );
}
