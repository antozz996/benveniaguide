"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  hasAnalyticsConsent,
  saveConsent,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

function subscribeToStoredConsent(callback: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getStoredConsentSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

const getServerStoredConsent = () => null;

function subscribeToHydration() {
  return () => {};
}

/** false in SSR/primo render, true dopo l'idratazione: evita flash del banner. */
function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
}

export function CookieConsent() {
  const hydrated = useHydrated();
  const storedConsent = useSyncExternalStore(
    subscribeToStoredConsent,
    getStoredConsentSnapshot,
    getServerStoredConsent,
  );
  const [dismissed, setDismissed] = useState(false);
  const [manuallyOpened, setManuallyOpened] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setAnalyticsEnabled(hasAnalyticsConsent());
      setShowDetails(true);
      setManuallyOpened(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  const visible =
    hydrated && (manuallyOpened || (!dismissed && storedConsent === null));

  if (!visible) return null;

  const finish = () => {
    setDismissed(true);
    setManuallyOpened(false);
  };

  const acceptAll = () => {
    saveConsent(true);
    finish();
  };

  const acceptNecessary = () => {
    saveConsent(false);
    finish();
  };

  const savePreferences = () => {
    saveConsent(analyticsEnabled);
    finish();
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md"
    >
      <div className="rounded-3xl border border-line bg-paper p-5 shadow-lift sm:p-6">
        <h2
          id="cookie-consent-title"
          className="font-display text-lg font-semibold text-forest"
        >
          Cookie e privacy
        </h2>
        <p
          id="cookie-consent-description"
          className="mt-2 text-sm leading-relaxed text-muted"
        >
          Usiamo cookie tecnici necessari al funzionamento del sito. Con il tuo
          consenso possiamo attivare anche cookie di misurazione (GA4) per
          capire come migliorare il sito. Puoi cambiare scelta in qualsiasi
          momento.{" "}
          <Link
            href="/cookie-policy"
            className="text-forest underline underline-offset-2"
          >
            Cookie policy
          </Link>
        </p>

        {showDetails ? (
          <div className="mt-4 space-y-3 rounded-2xl border border-line bg-ivory/60 p-4">
            <label className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-sm font-medium text-forest">
                  Necessari
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Sempre attivi: necessari al funzionamento e alla sicurezza.
                </span>
              </span>
              <input
                type="checkbox"
                checked
                disabled
                aria-label="Cookie necessari, sempre attivi"
                className="mt-1 h-5 w-5 rounded accent-forest"
              />
            </label>
            <label className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-sm font-medium text-forest">
                  Misurazione (GA4)
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Statistiche aggregate e anonime sulle visite.
                </span>
              </span>
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                className="mt-1 h-5 w-5 rounded accent-forest"
                aria-label="Cookie di misurazione"
              />
            </label>
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
          {showDetails ? (
            <button
              type="button"
              onClick={savePreferences}
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest-700",
              )}
            >
              Salva preferenze
            </button>
          ) : (
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-forest-700"
            >
              Accetta tutti
            </button>
          )}
          <button
            type="button"
            onClick={acceptNecessary}
            className="inline-flex items-center justify-center rounded-full border border-forest/25 px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:border-forest/60"
          >
            Solo necessari
          </button>
          {!showDetails ? (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium text-muted underline-offset-2 transition-colors hover:text-forest hover:underline"
            >
              Personalizza
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
