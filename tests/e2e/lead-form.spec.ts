import { expect, test } from "@playwright/test";
import { seedConsent } from "./helpers";

const validPayload = {
  name: "Utente di Test",
  structureName: "Struttura di Test",
  email: "test@example.com",
  structureType: "beb",
  website: "",
  message: "Richiesta inviata dai test end-to-end.",
  privacy: true,
};

test.describe("Form contatti — validazione UI", () => {
  test("l'invio a vuoto evidenzia i campi obbligatori", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/contatti");

    await page.getByRole("button", { name: "Invia la richiesta" }).click();

    await expect(page.getByText("Inserisci almeno 2 caratteri.")).toBeVisible();
    await expect(
      page.getByText("Inserisci un indirizzo email valido."),
    ).toBeVisible();
    await expect(
      page.getByText(/prendere visione dell'informativa/),
    ).toBeVisible();
  });

  test("un'email non valida blocca l'invio con messaggio dedicato", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/contatti");

    await page.getByLabel("Nome e cognome").fill("Utente di Test");
    await page.getByLabel("Nome della struttura").fill("Struttura di Test");
    await page.getByLabel("Email").fill("non-una-email");
    await page.getByLabel(/Ho preso visione/).check();
    await page.getByRole("button", { name: "Invia la richiesta" }).click();

    await expect(
      page.getByText("Inserisci un indirizzo email valido."),
    ).toBeVisible();
  });

  test("una richiesta valida (dopo il tempo minimo) mostra la conferma", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/contatti");

    await page.getByLabel("Nome e cognome").fill(validPayload.name);
    await page.getByLabel("Nome della struttura").fill(validPayload.structureName);
    await page.getByLabel("Email").fill(validPayload.email);
    await page
      .getByLabel("Messaggio")
      .fill(validPayload.message);
    await page.getByLabel(/Ho preso visione/).check();

    // La trappola temporale antispam richiede almeno 1500 ms di compilazione.
    await page.waitForTimeout(1700);

    await page.getByRole("button", { name: "Invia la richiesta" }).click();

    await expect(
      page.getByText("Richiesta ricevuta, grazie!"),
    ).toBeVisible();
    // Nei test la build gira senza variabili Resend: modalità dev esplicita.
    await expect(page.getByText(/Modalità sviluppo/)).toBeVisible();
  });
});

test.describe("API lead — regole antispam", () => {
  test("compilazione troppo rapida rifiutata (400)", async ({ request }) => {
    const response = await request.post("/api/lead", {
      data: { ...validPayload, elapsedMs: 10, honeypot: "" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toMatch(/rapido/i);
  });

  test("payload non valido rifiutato con errori per campo (400)", async ({
    request,
  }) => {
    const response = await request.post("/api/lead", {
      data: { ...validPayload, email: "rotta", elapsedMs: 5000 },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.fieldErrors.email).toBeTruthy();
  });

  test("richiesta valida accettata in modalità dev (nessun invio reale)", async ({
    request,
  }) => {
    const response = await request.post("/api/lead", {
      data: { ...validPayload, elapsedMs: 5000, honeypot: "" },
    });
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.delivery).toBe("dev");
  });

  test("campo trappola compilato: risposta neutra senza invio", async ({
    request,
  }) => {
    const response = await request.post("/api/lead", {
      data: { ...validPayload, elapsedMs: 5000, honeypot: "spam-bot" },
    });
    expect(response.ok()).toBe(true);
    const body = await response.json();
    expect(body.ok).toBe(true);
  });
});
