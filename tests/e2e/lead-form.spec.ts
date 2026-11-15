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

const CONFIRMATION =
  "Grazie! Ti ricontattiamo entro 24 ore con i prossimi passi e le istruzioni di pagamento.";

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

    await expect(page.getByText(CONFIRMATION)).toBeVisible();
    // Nei test la build gira senza variabili Resend: modalità dev esplicita.
    await expect(page.getByText(/Modalità sviluppo/)).toBeVisible();
  });
});

test.describe("Form contatti — pacchetto scelto da /prezzi", () => {
  test("i bottoni di /prezzi portano il pacchetto nel form", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/prezzi");

    await page.getByRole("link", { name: /Scegli Completa/ }).click();
    await expect(page).toHaveURL(/\/contatti\?pacchetto=completa$/);
    await expect(page.getByLabel("Pacchetto")).toHaveValue("completa");
  });

  for (const pkg of ["base", "completa", "multi"] as const) {
    test(`?pacchetto=${pkg} precompila il select`, async ({ page }) => {
      await seedConsent(page);
      await page.goto(`/contatti?pacchetto=${pkg}`);
      await expect(page.getByLabel("Pacchetto")).toHaveValue(pkg);
    });
  }

  test("senza parametro (o con valore ignoto) il pacchetto è 'Non so ancora'", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/contatti?pacchetto=premium");
    await expect(page.getByLabel("Pacchetto")).toHaveValue("non-so");
    await expect(page.getByLabel("Numero di strutture")).toHaveCount(0);
  });

  test("Multi richiede il numero di strutture e invia l'ordine", async ({
    page,
  }) => {
    await seedConsent(page);
    let sent: Record<string, unknown> | null = null;
    page.on("request", (request) => {
      if (request.url().endsWith("/api/lead") && request.method() === "POST") {
        sent = request.postDataJSON() as Record<string, unknown>;
      }
    });
    await page.goto("/contatti?pacchetto=multi");
    await expect(page.getByLabel("Pacchetto")).toHaveValue("multi");

    await page.getByLabel("Nome e cognome").fill(validPayload.name);
    await page.getByLabel("Nome della struttura").fill(validPayload.structureName);
    await page.getByLabel("Email").fill(validPayload.email);
    await page.getByLabel(/Ho preso visione/).check();

    await page.getByRole("button", { name: "Invia la richiesta" }).click();
    await expect(page.getByText(/parte da 3 strutture/)).toBeVisible();

    await page.getByLabel("Numero di strutture").fill("4");
    await page.waitForTimeout(1700);
    await page.getByRole("button", { name: "Invia la richiesta" }).click();

    await expect(page.getByText(CONFIRMATION)).toBeVisible();
    expect(sent).toMatchObject({ package: "multi", structuresCount: "4" });
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

  test("richiesta con pacchetto accettata", async ({ request }) => {
    const response = await request.post("/api/lead", {
      headers: { "x-forwarded-for": "198.51.100.11" },
      data: { ...validPayload, package: "completa", elapsedMs: 5000 },
    });
    expect(response.ok()).toBe(true);
    expect((await response.json()).delivery).toBe("dev");
  });

  test("pacchetto non valido o Multi senza strutture rifiutati (400)", async ({
    request,
  }) => {
    const invalid = await request.post("/api/lead", {
      headers: { "x-forwarded-for": "198.51.100.12" },
      data: { ...validPayload, package: "premium", elapsedMs: 5000 },
    });
    expect(invalid.status()).toBe(400);
    expect((await invalid.json()).fieldErrors.package).toBeTruthy();

    const multi = await request.post("/api/lead", {
      headers: { "x-forwarded-for": "198.51.100.12" },
      data: { ...validPayload, package: "multi", structuresCount: "2", elapsedMs: 5000 },
    });
    expect(multi.status()).toBe(400);
    expect((await multi.json()).fieldErrors.structuresCount).toBeTruthy();
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
