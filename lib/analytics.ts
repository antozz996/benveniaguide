/**
 * Analytics e consenso — utilità client-side.
 * Regola: nessuno script di analytics viene caricato senza consenso esplicito
 * (categoria "analytics"). GA4 è configurato solo via variabili d'ambiente.
 */

"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __benveniaAnalyticsQueue?: Array<{
      name: string;
      params: Record<string, unknown>;
    }>;
  }
}

export const ANALYTICS_EVENTS = {
  pageView: "page_view",
  demoOpen: "demo_open",
  demoInteraction: "demo_interaction",
  ctaClick: "cta_click",
  leadFormStart: "lead_form_start",
  leadFormSubmit: "lead_form_submit",
  leadFormSuccess: "lead_form_success",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const UTM_STORAGE_KEY = "benvenia:utm";
export const CONSENT_STORAGE_KEY = "benvenia:consent:v1";

export const CONSENT_CHANGED_EVENT = "benvenia:consent-changed";
export const OPEN_CONSENT_EVENT = "benvenia:open-consent";

export type ConsentCategory = "necessary" | "analytics";

export interface ConsentPreferences {
  version: 1;
  necessary: true;
  analytics: boolean;
  decidedAt: string;
}

export function readConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentPreferences>;
    if (parsed.version !== 1 || typeof parsed.analytics !== "boolean") {
      return null;
    }
    return {
      version: 1,
      necessary: true,
      analytics: parsed.analytics,
      decidedAt:
        typeof parsed.decidedAt === "string"
          ? parsed.decidedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean): ConsentPreferences {
  const preferences: ConsentPreferences = {
    version: 1,
    necessary: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify(preferences),
      );
    } catch {
      /* storage non disponibile: il consenso vale per la sessione corrente */
    }
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: preferences }));
  }
  return preferences;
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function trackEvent(
  name: AnalyticsEventName,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  // GA4 non ancora caricato: accoda e invia al momento del load.
  window.__benveniaAnalyticsQueue = window.__benveniaAnalyticsQueue ?? [];
  window.__benveniaAnalyticsQueue.push({ name, params });
}

/** Invia alla coda GA4 gli eventi raccolti prima del caricamento dello script. */
export function flushAnalyticsQueue(): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  const queue = window.__benveniaAnalyticsQueue ?? [];
  for (const item of queue) {
    window.gtag("event", item.name, item.params);
  }
  window.__benveniaAnalyticsQueue = [];
}

/**
 * Salva i parametri UTM della prima visita della sessione (first touch),
 * per attribuire correttamente le campagne email.
 */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;
  try {
    const search = new URLSearchParams(window.location.search);
    const incoming: UtmParams = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ] as const) {
      const value = search.get(key);
      if (value) incoming[key] = value.slice(0, 200);
    }
    if (Object.keys(incoming).length === 0) return;

    const existing = getStoredUtmParams();
    if (existing && Object.keys(existing).length > 0) return; // first touch vince

    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(incoming));
  } catch {
    /* sessionStorage non disponibile */
  }
}

export function getStoredUtmParams(): UtmParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UtmParams;
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

export function openConsentPreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
}
