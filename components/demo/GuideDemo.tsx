"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BatteryMedium,
  BedDouble,
  House,
  MapPin,
  Maximize2,
  Phone,
  Signal,
  Wifi,
  X,
} from "lucide-react";
import { PhoneFrame } from "@/components/demo/PhoneFrame";
import { PlaceDetail } from "@/components/demo/PlaceDetail";
import { WelcomeScreen } from "@/components/demo/screens/WelcomeScreen";
import { StayScreen } from "@/components/demo/screens/StayScreen";
import { ExploreScreen } from "@/components/demo/screens/ExploreScreen";
import { ContactsScreen } from "@/components/demo/screens/ContactsScreen";
import {
  demoGuide,
  demoScreenOrder,
  type DemoLang,
  type DemoPlace,
  type DemoScreen,
} from "@/data/demo-guide";
import {
  ANALYTICS_EVENTS,
  trackEvent,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

const tabIcons: Record<DemoScreen, typeof House> = {
  welcome: House,
  stay: BedDouble,
  explore: MapPin,
  contacts: Phone,
};

interface GuideDemoProps {
  /** "page": include il controllo a schermo intero (usato su /demo). */
  variant?: "compact" | "page";
}

export function GuideDemo({ variant = "compact" }: GuideDemoProps) {
  const [lang, setLang] = useState<DemoLang>("it");
  const [screen, setScreen] = useState<DemoScreen>("welcome");
  const [place, setPlace] = useState<DemoPlace | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const toastTimer = useRef<number | null>(null);
  const fullscreenTrigger = useRef<HTMLButtonElement>(null);

  const content = demoGuide[lang];

  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.demoOpen, { variant });
  }, [variant]);

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback(
    (message: string) => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
      setToast(message);
      toastTimer.current = window.setTimeout(() => setToast(null), 2800);
    },
    [],
  );

  const handleNavigate = useCallback(
    (next: DemoScreen) => {
      setScreen(next);
      setPlace(null);
      trackEvent(ANALYTICS_EVENTS.demoInteraction, {
        action: "navigate",
        screen: next,
        language: lang,
      });
    },
    [lang],
  );

  const handleLanguage = useCallback(
    (next: DemoLang) => {
      setLang(next);
      trackEvent(ANALYTICS_EVENTS.demoInteraction, {
        action: "language_switch",
        language: next,
      });
    },
    [],
  );

  const handleOpenPlace = useCallback((selected: DemoPlace) => {
    setPlace(selected);
    trackEvent(ANALYTICS_EVENTS.demoInteraction, {
      action: "open_place",
      place: selected.id,
    });
  }, []);

  const handleDemoAction = useCallback(
    (target: string) => {
      showToast(demoGuide[lang].ui.toastDemo);
      trackEvent(ANALYTICS_EVENTS.demoInteraction, {
        action: "demo_action",
        target,
        language: lang,
      });
    },
    [lang, showToast],
  );

  const handleInteraction = useCallback(
    (action: string, detail?: string) => {
      trackEvent(ANALYTICS_EVENTS.demoInteraction, { action, detail });
    },
    [],
  );

  const closeFullscreen = useCallback(() => {
    setFullscreen(false);
    fullscreenTrigger.current?.focus();
    trackEvent(ANALYTICS_EVENTS.demoInteraction, {
      action: "fullscreen_close",
    });
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFullscreen();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen, closeFullscreen]);

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return <WelcomeScreen content={content} onNavigate={handleNavigate} />;
      case "stay":
        return <StayScreen content={content} onDemoAction={handleDemoAction} />;
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
          <ContactsScreen content={content} onDemoAction={handleDemoAction} />
        );
    }
  };

  const phone = (screenClassName?: string) => (
    <PhoneFrame
      label={`Guest Guide dimostrativa — ${content.ui.tabs[screen]}`}
      screenClassName={screenClassName}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold text-forest/80">
          <span>{content.ui.statusTime}</span>
          <span className="flex items-center gap-1" aria-hidden="true">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryMedium className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 border-b border-line/70 px-4 py-2">
          <div className="min-w-0">
            <p className="truncate font-display text-[13px] leading-tight font-semibold text-forest">
              {content.structure.name}
            </p>
            <p className="truncate text-[10px] text-muted">
              {content.structure.location}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="rounded-full bg-copper/15 px-2 py-0.5 text-[9px] font-bold tracking-[0.14em] text-copper-700 uppercase">
              {content.ui.demoBadge}
            </span>
            <div
              role="group"
              aria-label={content.ui.languageLabel}
              className="flex rounded-full border border-line p-0.5"
            >
              {(["it", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={lang === code}
                  onClick={() => handleLanguage(code)}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase transition-colors",
                    lang === code
                      ? "bg-forest text-ivory"
                      : "text-muted hover:text-forest",
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div
            id="demo-panel"
            role="tabpanel"
            aria-label={content.ui.tabs[screen]}
            className="h-full overflow-y-auto no-scrollbar"
          >
            <div key={`${screen}-${lang}`} className="animate-screen-in px-4 pt-4 pb-6">
              {renderScreen()}
            </div>
          </div>

          {place ? (
            <PlaceDetail
              place={place}
              content={content}
              onClose={() => setPlace(null)}
              onDemoAction={handleDemoAction}
            />
          ) : null}

          {toast ? (
            <div
              role="status"
              className="pointer-events-none absolute inset-x-4 bottom-3 z-30 animate-toast-in rounded-xl bg-forest/95 px-3.5 py-2.5 text-[11px] leading-relaxed text-ivory shadow-lift"
            >
              {toast}
            </div>
          ) : null}
        </div>

        <nav
          aria-label="Sezioni della guida"
          className="border-t border-line/70 bg-paper/95 px-2 pt-1.5 pb-2"
        >
          <div role="tablist" className="grid grid-cols-4">
            {demoScreenOrder.map((id) => {
              const Icon = tabIcons[id];
              const isActive = screen === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`demo-tab-${id}`}
                  aria-selected={isActive}
                  aria-controls="demo-panel"
                  onClick={() => handleNavigate(id)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-xl py-1.5 transition-colors",
                    isActive
                      ? "bg-forest/8 text-forest"
                      : "text-muted hover:text-forest",
                  )}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  <span className="text-[9px] font-medium">
                    {content.ui.tabs[id]}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </PhoneFrame>
  );

  return (
    <div>
      {!fullscreen ? phone() : null}

      {variant === "page" ? (
        <div className="mt-6 flex justify-center">
          <button
            ref={fullscreenTrigger}
            type="button"
            aria-expanded={fullscreen}
            onClick={() => {
              setFullscreen(true);
              trackEvent(ANALYTICS_EVENTS.demoInteraction, {
                action: "fullscreen_open",
              });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-forest/25 px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:border-forest/60 hover:bg-forest/5"
          >
            <Maximize2 aria-hidden="true" className="h-4 w-4" />
            {content.ui.openFullscreen}
          </button>
        </div>
      ) : null}

      {fullscreen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Guest Guide dimostrativa a schermo intero"
          className="fixed inset-0 z-[80] flex flex-col bg-forest/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <p className="text-xs font-medium text-ivory/70">
              {content.ui.demoNotice}
            </p>
            <button
              type="button"
              autoFocus
              onClick={closeFullscreen}
              className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-4 py-2 text-xs font-medium text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/10"
            >
              <X aria-hidden="true" className="h-3.5 w-3.5" />
              {content.ui.closeFullscreen}
            </button>
          </div>
          <div className="flex flex-1 items-start justify-center overflow-y-auto px-4 pt-2 pb-6 sm:items-center">
            {phone("h-[min(76vh,720px)]")}
          </div>
          <div className="pb-5 text-center">
            <Link
              href="/"
              className="text-xs text-ivory/60 underline underline-offset-4 transition-colors hover:text-ivory"
            >
              {content.ui.backToSite}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
