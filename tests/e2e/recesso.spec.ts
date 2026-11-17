import { expect, test } from "@playwright/test";
import { seedConsent } from "./helpers";

/**
 * Recesso (/recesso). L'invio gira in modalità "dev"
 * (LEAD_ALLOW_DEV_DELIVERY=true in playwright.config.ts): nessuna email reale.
 */

const validPayload = {
  name: "Mario Rossi",
  order: "Casa di prova",
  email: "test@example.com",
  orderDate: "2026-11-10",
  message: "",
  honeypot: "",
  elapsedMs: 4000,
};

function apiHeaders(ip: string) {
  return { "x-forwarded-for": ip };
}

test.describe("Recesso — pagina", () => {
  test("mostra modulo, pulsante e modulo di recesso tipo", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/recesso");
    const main = page.locator("main");
    await expect(
      main.getByRole("button", { name: "Conferma recesso" }),
    ).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Condizioni del servizio" }),
    ).toHaveAttribute("href", "/condizioni#recesso");
    await expect(main).toContainText(
      "Destinatario: Antonio Avella, Benvenia Guide, info@benveniaguide.it",
    );
    await expect(main).not.toContainText(/\{\{|\[Nome Cognome\]/);
  });

  test("il pulsante è un target touch di almeno 44 px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await seedConsent(page);
    await page.goto("/recesso");
    const box = await page
      .getByRole("button", { name: "Conferma recesso" })
      .boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test("l'invio a vuoto evidenzia i campi obbligatori", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/recesso");
    await page.getByRole("button", { name: "Conferma recesso" }).click();
    await expect(page.getByText("Inserisci nome e cognome.")).toBeVisible();
    await expect(
      page.getByText("Inserisci un indirizzo email valido."),
    ).toBeVisible();
    await expect(page.getByLabel("Nome e cognome")).toBeFocused();
  });

  test("un invio valido mostra la conferma con l'email", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/recesso");
    await page.getByLabel("Nome e cognome").fill(validPayload.name);
    await page
      .getByLabel("Nome della struttura o numero d'ordine")
      .fill(validPayload.order);
    await page
      .getByLabel("Email a cui mandare la conferma")
      .fill(validPayload.email);
    // Trappola temporale antispam: almeno 2 secondi di compilazione.
    await page.waitForTimeout(2200);
    await page.getByRole("button", { name: "Conferma recesso" }).click();

    await expect(
      page.getByText(/Abbiamo ricevuto la tua richiesta di recesso/),
    ).toBeVisible();
    await expect(
      page.getByText(/Ti abbiamo mandato una conferma a test@example\.com/),
    ).toBeVisible();
  });
});

test.describe("Recesso — API", () => {
  test("accetta un payload valido (modalità dev)", async ({ request }) => {
    const response = await request.post("/api/recesso", {
      data: validPayload,
      headers: apiHeaders("198.51.100.21"),
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true, delivery: "dev" });
  });

  test("rifiuta email e data non valide", async ({ request }) => {
    const response = await request.post("/api/recesso", {
      data: { ...validPayload, email: "non-valida", orderDate: "ieri" },
      headers: apiHeaders("198.51.100.22"),
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.fieldErrors.email).toBeTruthy();
    expect(body.fieldErrors.orderDate).toBeTruthy();
  });

  test("rifiuta un invio troppo rapido", async ({ request }) => {
    const response = await request.post("/api/recesso", {
      data: { ...validPayload, elapsedMs: 500 },
      headers: apiHeaders("198.51.100.23"),
    });
    expect(response.status()).toBe(400);
  });
});
