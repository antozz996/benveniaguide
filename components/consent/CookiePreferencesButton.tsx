"use client";

import { openConsentPreferences } from "@/lib/analytics";

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className="rounded text-xs text-ivory/55 underline-offset-2 transition-colors hover:text-ivory hover:underline"
    >
      Preferenze cookie
    </button>
  );
}
