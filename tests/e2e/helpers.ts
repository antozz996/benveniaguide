import type { Page } from "@playwright/test";

/**
 * Pre-registra il consenso (solo cookie necessari) così il banner non copre
 * la pagina durante i test. Deve essere chiamato prima della navigazione.
 */
export async function seedConsent(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "benvenia:consent:v1",
      JSON.stringify({
        version: 1,
        necessary: true,
        analytics: false,
        decidedAt: "2026-01-01T00:00:00.000Z",
      }),
    );
  });
}
