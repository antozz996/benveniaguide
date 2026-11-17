import { expect, test, type Page } from "@playwright/test";
import { seedConsent } from "./helpers";

/**
 * Modulo struttura (/modulo). L'invio gira in modalità "dev"
 * (LEAD_ALLOW_DEV_DELIVERY=true in playwright.config.ts): nessuna email reale.
 */

const CONFIRMATION = /Scriviamo la tua guida e te la mandiamo da approvare/;

const places = Array.from({ length: 5 }, (_, i) => ({
  name: `Luogo di prova ${i + 1}`,
  category: i % 3 === 0 ? "vedere" : i % 3 === 1 ? "mangiare" : "esperienze",
  description: "A dieci minuti a piedi, bello al tramonto.",
  mapsUrl: "",
}));

const validPayload = {
  package: "completa",
  structuresCount: "",
  structureName: "Struttura di Test",
  location: "Bardolino, Lago di Garda",
  tagline: "",
  welcomeMessage: "Benvenuti! Siamo felici di avervi qui con noi.",
  signature: "Giulia e Marco",
  setting: "lago",
  english: "no",
  checkinTime: "15:00-20:00",
  checkinDetail: "Vi accogliamo di persona all'arrivo.",
  checkoutTime: "entro le 10:30",
  checkoutDetail: "Lasciate le chiavi sul tavolo della cucina.",
  wifiNetwork: "TestWiFi",
  wifiPassword: "password-di-prova",
  wifiNote: "",
  parking: "Parcheggio gratuito in cortile.",
  breakfast: "",
  services: "",
  waste: "",
  rules: "Vietato fumare all'interno.",
  hostContact: "Giulia, host",
  guestPhone: "+39 333 000 0000",
  guestEmail: "",
  propertyMapsUrl: "https://maps.app.goo.gl/esempio",
  contactPreference: "",
  usefulNumbers: "",
  faq: "",
  places,
  billingName: "Utente di Test",
  taxCode: "RSSMRA80A01H501U",
  billingAddress: "Via Roma 1, 37011 Bardolino (VR)",
  withholdingAgent: "no",
  clientEmail: "test@example.com",
  slug: "",
  notes: "",
  privacy: true,
  elapsedMs: 60_000,
};

/** IP distinto per ogni chiamata API: il rate limit non interferisce tra test. */
function apiHeaders(ip: string) {
  return { "x-forwarded-for": ip };
}

async function fillValidForm(page: Page) {
  await page.getByLabel("Nome della struttura").fill(validPayload.structureName);
  await page.getByLabel("Località").fill(validPayload.location);
  await page
    .getByLabel("Messaggio di benvenuto per gli ospiti")
    .fill(validPayload.welcomeMessage);
  await page.getByLabel("Firma").fill(validPayload.signature);
  await page
    .getByRole("group", { name: "Vuoi la guida anche in inglese?" })
    .getByLabel("No")
    .check();
  await page
    .getByRole("group", { name: "Ambientazione prevalente" })
    .getByLabel("Lago")
    .check();

  await page.getByLabel("Orario di check-in").fill(validPayload.checkinTime);
  await page.getByLabel("Orario di check-out").fill(validPayload.checkoutTime);
  await page
    .getByLabel("Come avviene il check-in")
    .fill(validPayload.checkinDetail);
  await page
    .getByLabel("Istruzioni per il check-out")
    .fill(validPayload.checkoutDetail);
  await page.getByLabel("Nome della rete Wi-Fi").fill(validPayload.wifiNetwork);
  await page.getByLabel("Password del Wi-Fi").fill(validPayload.wifiPassword);
  await page.getByLabel("Parcheggio").fill(validPayload.parking);
  await page.getByLabel("Regole della casa").fill(validPayload.rules);

  await page
    .getByLabel("Nome e ruolo del referente")
    .fill(validPayload.hostContact);
  await page
    .getByLabel("Telefono / WhatsApp per gli ospiti")
    .fill(validPayload.guestPhone);
  await page
    .getByLabel("Link Google Maps della struttura")
    .fill(validPayload.propertyMapsUrl);

  for (const [i, place] of places.entries()) {
    const n = i + 1;
    await page.getByLabel(`Nome del luogo ${n}`, { exact: true }).fill(place.name);
    await page
      .getByLabel(`Categoria del luogo ${n}`, { exact: true })
      .selectOption(place.category);
    await page
      .getByLabel(`Perché andarci (luogo ${n})`, { exact: true })
      .fill(place.description);
  }

  await page
    .getByLabel("Nome e cognome o ragione sociale")
    .fill(validPayload.billingName);
  await page
    .getByLabel("Codice fiscale o partita IVA")
    .fill(validPayload.taxCode);
  await page.getByLabel("Indirizzo", { exact: true }).fill(validPayload.billingAddress);
  await page.getByLabel("La tua email").fill(validPayload.clientEmail);
  await page
    .getByRole("group", { name: "Sei sostituto d'imposta?" })
    .getByLabel("No")
    .check();
  await page.getByLabel(/acconsento al trattamento/).check();
}

test.describe("Modulo struttura — pagina", () => {
  test("è noindex (meta e header) e fuori dalla sitemap", async ({
    page,
    request,
  }) => {
    const response = await request.get("/modulo");
    expect(response.status()).toBe(200);
    expect(response.headers()["x-robots-tag"]).toContain("noindex");

    await seedConsent(page);
    await page.goto("/modulo");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("/modulo");
  });

  test("il parametro ?pacchetto= preseleziona il pacchetto", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/modulo?pacchetto=multi");
    await expect(page.getByLabel("Pacchetto scelto")).toHaveValue("multi");
    await expect(page.getByLabel("Numero di strutture")).toBeVisible();
  });

  test("non chiede codici porta o keybox e linka la privacy", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/modulo");
    await expect(
      page.getByText(/Non scrivere codici della porta o della keybox/),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "informativa privacy" }),
    ).toHaveAttribute("href", "/privacy");
  });

  test("l'invio a vuoto evidenzia i campi obbligatori", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/modulo");
    await page.getByRole("button", { name: "Invia il modulo" }).click();

    await expect(page.getByText("Seleziona il pacchetto.")).toBeVisible();
    await expect(
      page.getByText("Inserisci il nome della struttura."),
    ).toBeVisible();
    await expect(page.getByText("Inserisci il nome del luogo.").first()).toBeVisible();
    await expect(
      page.getByText(/codice fiscale \(16 caratteri\) o una partita IVA/),
    ).toBeVisible();
    await expect(
      page.getByText(/prendere visione dell'informativa/),
    ).toBeVisible();
    await expect(page.getByLabel("Pacchetto scelto")).toBeFocused();
  });

  test("si possono aggiungere luoghi fino a 10 e rimuoverli fino a 5", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/modulo");
    const add = page.getByRole("button", { name: "Aggiungi un luogo" });

    await expect(page.getByLabel(/^Nome del luogo \d+$/)).toHaveCount(5);
    for (let i = 0; i < 5; i++) await add.click();
    await expect(page.getByLabel(/^Nome del luogo \d+$/)).toHaveCount(10);
    await expect(add).toHaveCount(0);

    await page.getByRole("button", { name: "Rimuovi il luogo 10" }).click();
    await expect(page.getByLabel(/^Nome del luogo \d+$/)).toHaveCount(9);
  });

  test("un modulo valido mostra la conferma", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/modulo?pacchetto=completa");
    await fillValidForm(page);

    // Trappola temporale antispam: almeno 5 secondi di compilazione.
    await page.waitForTimeout(5200);
    await page.getByRole("button", { name: "Invia il modulo" }).click();

    await expect(page.getByText(CONFIRMATION)).toBeVisible();
    await expect(page.getByText(/Modalità sviluppo/)).toBeVisible();
  });
});

test.describe("Modulo struttura — API", () => {
  test("accetta un payload valido (modalità dev)", async ({ request }) => {
    const response = await request.post("/api/modulo", {
      data: validPayload,
      headers: apiHeaders("198.51.100.1"),
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ ok: true, delivery: "dev" });
  });

  test("rifiuta codice fiscale non valido e meno di 5 luoghi", async ({
    request,
  }) => {
    const response = await request.post("/api/modulo", {
      data: {
        ...validPayload,
        taxCode: "ABC",
        places: places.slice(0, 3),
      },
      headers: apiHeaders("198.51.100.2"),
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.fieldErrors.taxCode).toMatch(/codice fiscale/);
    expect(body.fieldErrors.places).toMatch(/almeno 5 luoghi/);
  });

  test("rifiuta un invio troppo rapido", async ({ request }) => {
    const response = await request.post("/api/modulo", {
      data: { ...validPayload, elapsedMs: 800 },
      headers: apiHeaders("198.51.100.3"),
    });
    expect(response.status()).toBe(400);
  });
});

test.describe("Modulo struttura con consenso analytics già dato", () => {
  test("nessuna richiesta GA4 su /modulo", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "benvenia:consent:v1",
        JSON.stringify({
          version: 1,
          necessary: true,
          analytics: true,
          decidedAt: "2026-01-01T00:00:00.000Z",
        }),
      );
    });
    const tracked: string[] = [];
    page.on("request", (req) => {
      if (/googletagmanager\.com|google-analytics\.com/.test(req.url())) {
        tracked.push(req.url());
      }
    });

    await page.goto("/modulo");
    await expect(page.getByLabel("Pacchetto scelto")).toBeVisible();
    await page.waitForLoadState("networkidle");

    expect(tracked).toEqual([]);
    expect(await page.locator("#ga4-src, #ga4-init").count()).toBe(0);
  });
});
