"use client";

import { useCallback, useState, type ReactNode } from "react";
import { BedDouble, House, MapPin, Phone } from "lucide-react";
import { PlaceDetail } from "@/components/guide/PlaceDetail";
import { WelcomeScreen } from "@/components/guide/screens/WelcomeScreen";
import { StayScreen } from "@/components/guide/screens/StayScreen";
import { ExploreScreen } from "@/components/guide/screens/ExploreScreen";
import { ContactsScreen } from "@/components/guide/screens/ContactsScreen";
import {
  guideScreenOrder,
  type GuideContent,
  type GuideLang,
  type GuidePlace,
  type GuideScreen,
} from "@/lib/guide/types";
import { cn } from "@/lib/utils";

const tabIcons: Record<GuideScreen, typeof House> = {
  welcome: House,
  stay: BedDouble,
  explore: MapPin,
  contacts: Phone,
};

export type GuideShellEvent = (
  action: string,
  params: Record<string, string | undefined>,
) => void;

export interface GuideShellProps {
  content: GuideContent;
  lang: GuideLang;
  /** "phone": dentro il mock PhoneFrame (demo). "fullpage": telefono reale. */
  variant: "phone" | "fullpage";
  /** Slot del selettore lingua (bottoni nella demo, link nelle guide reali). */
  languageSwitch?: ReactNode;
  /** Badge accanto al nome ("Demo", "Esempio"). */
  badge?: ReactNode;
  /** Riga sopra l'intestazione (barra di stato finta della demo). */
  statusBar?: ReactNode;
  /** Azioni senza link reale (copia Wi-Fi, chiama, indicazioni...). */
  onAction: (target: string) => void;
  /** Notifica il cambio di sezione (la demo aggiorna la label del PhoneFrame). */
  onScreenChange?: (screen: GuideScreen) => void;
  /** Eventi di interazione (analytics, solo demo). */
  onEvent?: GuideShellEvent;
  /** Prefisso degli id di tab e pannello. */
  idPrefix?: string;
  actionLabelSuffix?: string;
  srNotice?: string;
  /** Nasconde chiama/email/indicazioni senza recapito (guide reali). */
  hideUnlinkedActions?: boolean;
  /** Toast controllato dal genitore (null = nascosto). */
  toast: string | null;
}

export function GuideShell({
  content,
  lang,
  variant,
  languageSwitch,
  badge,
  statusBar,
  onAction,
  onScreenChange,
  onEvent,
  idPrefix = "demo",
  actionLabelSuffix,
  srNotice,
  hideUnlinkedActions = false,
  toast,
}: GuideShellProps) {
  const [screen, setScreen] = useState<GuideScreen>("welcome");
  const [place, setPlace] = useState<GuidePlace | null>(null);
  const isPage = variant === "fullpage";
  const panelId = `${idPrefix}-panel`;

  const handleNavigate = useCallback(
    (next: GuideScreen) => {
      setScreen(next);
      setPlace(null);
      onScreenChange?.(next);
      if (isPage) window.scrollTo({ top: 0 });
      onEvent?.("navigate", { screen: next, language: lang });
    },
    [isPage, lang, onEvent, onScreenChange],
  );

  const handleOpenPlace = useCallback(
    (selected: GuidePlace) => {
      setPlace(selected);
      onEvent?.("open_place", { place: selected.id });
    },
    [onEvent],
  );

  const handleInteraction = useCallback(
    (action: string, detail?: string) => {
      onEvent?.(action, { detail });
    },
    [onEvent],
  );

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return (
          <WelcomeScreen
            content={content}
            onNavigate={handleNavigate}
            srNotice={srNotice}
          />
        );
      case "stay":
        return (
          <StayScreen
            content={content}
            onAction={onAction}
            actionLabelSuffix={actionLabelSuffix}
          />
        );
      case "explore":
        return (
          <ExploreScreen
            content={content}
            onOpenPlace={handleOpenPlace}
            onInteraction={handleInteraction}
          />
        );
      case "contacts":
        return (
          <ContactsScreen
            content={content}
            onAction={onAction}
            hideUnlinkedActions={hideUnlinkedActions}
          />
        );
    }
  };

  const header = (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border-b border-line/70",
        isPage
          ? "sticky top-0 z-30 bg-ivory/95 px-4 py-3 backdrop-blur-md"
          : "px-4 py-2",
      )}
    >
      <div className="min-w-0">
        <p
          className={cn(
            "truncate font-display leading-tight font-semibold text-forest",
            isPage ? "text-base" : "text-[13px]",
          )}
        >
          {content.structure.name}
        </p>
        <p
          className={cn(
            "truncate text-muted",
            isPage ? "text-xs" : "text-[10px]",
          )}
        >
          {content.structure.location}
        </p>
      </div>
      {badge || languageSwitch ? (
        <div className="flex shrink-0 items-center gap-1.5">
          {badge}
          {languageSwitch}
        </div>
      ) : null}
    </div>
  );

  const panel = (
    <div
      id={panelId}
      role="tabpanel"
      aria-label={content.ui.tabs[screen]}
      className={
        isPage
          ? "pb-[calc(5.5rem+env(safe-area-inset-bottom))]"
          : "h-full overflow-y-auto no-scrollbar"
      }
    >
      <div
        key={`${screen}-${lang}`}
        className={cn(
          "animate-screen-in px-4 pt-4 pb-6",
          // Le schermate usano px pensati per il mock: sul telefono reale
          // ingrandiamo leggermente il contenuto (follow-up: scala responsive).
          isPage && "[zoom:1.125]",
        )}
      >
        {renderScreen()}
      </div>
    </div>
  );

  const placeOverlay = place ? (
    <PlaceDetail
      place={place}
      content={content}
      onClose={() => setPlace(null)}
      onAction={onAction}
      hideUnlinkedActions={hideUnlinkedActions}
      {...(isPage
        ? {
            className:
              "fixed inset-x-0 top-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-40 mx-auto w-full max-w-md",
            contentClassName: "[zoom:1.125]",
          }
        : {})}
    />
  ) : null;

  const toastNode = toast ? (
    <div
      role="status"
      className={cn(
        "pointer-events-none animate-toast-in rounded-xl bg-forest/95 px-3.5 py-2.5 leading-relaxed text-ivory shadow-lift",
        isPage
          ? "fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-sm text-sm"
          : "absolute inset-x-4 bottom-3 z-30 text-[11px]",
      )}
    >
      {toast}
    </div>
  ) : null;

  const nav = (
    <nav
      aria-label={content.ui.sectionsLabel ?? "Sezioni della guida"}
      className={cn(
        "border-t border-line/70 bg-paper/95 px-2 pt-1.5",
        isPage
          ? "fixed inset-x-0 bottom-0 z-50 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md"
          : "pb-2",
      )}
    >
      <div
        role="tablist"
        className={cn("grid grid-cols-4", isPage && "mx-auto max-w-md")}
      >
        {guideScreenOrder.map((id) => {
          const Icon = tabIcons[id];
          const isActive = screen === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${id}`}
              aria-selected={isActive}
              aria-controls={panelId}
              onClick={() => handleNavigate(id)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl transition-colors",
                isPage ? "py-2" : "py-1.5",
                isActive
                  ? "bg-forest/8 text-forest"
                  : "text-muted hover:text-forest",
              )}
            >
              <Icon
                aria-hidden="true"
                className={isPage ? "h-5 w-5" : "h-4 w-4"}
              />
              <span
                className={cn(
                  "font-medium",
                  isPage ? "text-[11px]" : "text-[9px]",
                )}
              >
                {content.ui.tabs[id]}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );

  if (isPage) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-ivory">
        {statusBar}
        {header}
        <div className="relative flex-1">{panel}</div>
        {placeOverlay}
        {toastNode}
        {nav}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {statusBar}
      {header}
      <div className="relative flex-1 overflow-hidden">
        {panel}
        {placeOverlay}
        {toastNode}
      </div>
      {nav}
    </div>
  );
}
