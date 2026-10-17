"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  ANALYTICS_EVENTS,
  CONSENT_CHANGED_EVENT,
  flushAnalyticsQueue,
  hasAnalyticsConsent,
  trackEvent,
} from "@/lib/analytics";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function subscribeConsent(callback: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
}

const getServerConsent = () => false;

/**
 * Caricamento GA4 gated dal consenso (categoria "analytics").
 * Se NEXT_PUBLIC_GA_MEASUREMENT_ID non è configurato, non viene caricato nulla.
 */
export function Analytics() {
  const pathname = usePathname();
  const enabled = useSyncExternalStore(
    subscribeConsent,
    hasAnalyticsConsent,
    getServerConsent,
  );

  useEffect(() => {
    if (!enabled) return;
    trackEvent(ANALYTICS_EVENTS.pageView, {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [enabled, pathname]);

  if (!GA_MEASUREMENT_ID || !enabled) return null;

  return (
    <>
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{send_page_view:false});`,
        }}
      />
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => flushAnalyticsQueue()}
      />
    </>
  );
}
