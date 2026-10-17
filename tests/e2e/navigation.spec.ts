import { expect, test } from "@playwright/test";
import { seedConsent } from "./helpers";

const pages = [
  { path: "/demo", title: "Guest Guide" },
  { path: "/come-funziona", title: "Come funziona" },
  { path: "/funzionalita", title: "Funzionalit" },
  { path: "/soluzioni", title: "Soluzioni" },
  { path: "/prezzi", title: "Prezzi" },
  { path: "/risorse", title: "Risorse" },
  { path: "/contatti", title: "Contatti" },
  { path: "/privacy", title: "privacy" },
  { path: "/cookie-policy", title: "Cookie" },
] as const;

test.describe("Pagine informative", () => {
  for (const { path, title } of pages) {
    test(`${path} risponde 200 con h1 e titolo coerenti`, async ({ page }) => {
      await seedConsent(page);
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.title()).toContain("Benvenia Guide");
      if (title !== "Guest Guide") {
        expect(await page.title()).toContain(title);
      }
    });
  }

  test("la pagina 404 è personalizzata con ritorno alla home", async ({
    page,
  }) => {
    await seedConsent(page);
    const response = await page.goto("/pagina-che-non-esiste");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Errore 404")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Torna alla home", exact: true }),
    ).toBeVisible();
  });
});

test.describe("Risorse", () => {
  test("la pagina articolo risponde 200 con titolo, JSON-LD Article e link utili", async ({
    page,
  }) => {
    await seedConsent(page);
    const response = await page.goto(
      "/risorse/ridurre-domande-ripetitive-ospiti",
    );
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.title()).toContain("Benvenia Guide");

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const joined = jsonLd.join("\n");
    expect(joined).toContain('"Article"');
    expect(joined).toContain("BreadcrumbList");

    await expect(
      page.getByRole("link", { name: /Tutti gli articoli/ }),
    ).toBeVisible();
  });

  test("uno slug inesistente restituisce la 404 personalizzata", async ({
    page,
  }) => {
    await seedConsent(page);
    const response = await page.goto("/risorse/articolo-che-non-esiste");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Errore 404")).toBeVisible();
  });
});

test.describe("SEO tecnico", () => {
  test("sitemap.xml elenca le pagine principali", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("/demo");
    expect(body).toContain("/contatti");
    expect(body).toContain("/risorse");
    expect(body).toContain("/risorse/ridurre-domande-ripetitive-ospiti");
  });

  test("robots.txt consente la scansione e indica la sitemap", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toContain("sitemap");
    expect(body).not.toContain("Disallow: /");
  });

  test("i dati strutturati JSON-LD sono presenti nella home", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/");
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    expect(jsonLd.length).toBeGreaterThanOrEqual(2);
    expect(jsonLd.join("\n")).toContain("Organization");
    expect(jsonLd.join("\n")).toContain('"Service"');
  });
});

test.describe("Consenso cookie", () => {
  test("il banner compare senza consenso e 'Solo necessari' lo chiude", async ({
    page,
  }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: "Cookie e privacy" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Solo necessari" }).click();
    await expect(dialog).toBeHidden();

    const stored = await page.evaluate(() =>
      window.localStorage.getItem("benvenia:consent:v1"),
    );
    expect(stored).toContain('"analytics":false');
  });

  test("'Personalizza' permette di attivare la categoria analytics", async ({
    page,
  }) => {
    await page.goto("/");
    const dialog = page.getByRole("dialog", { name: "Cookie e privacy" });
    await dialog.getByRole("button", { name: "Personalizza" }).click();
    await dialog.getByRole("checkbox", { name: "Cookie di misurazione" }).check();
    await dialog.getByRole("button", { name: "Salva preferenze" }).click();
    await expect(dialog).toBeHidden();

    const stored = await page.evaluate(() =>
      window.localStorage.getItem("benvenia:consent:v1"),
    );
    expect(stored).toContain('"analytics":true');
  });

  test("senza consenso nessuno script di analytics viene caricato", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("dialog", { name: "Cookie e privacy" });
    const trackingScripts = await page
      .locator('script[src*="googletagmanager"], script[src*="google-analytics"]')
      .count();
    expect(trackingScripts).toBe(0);
  });
});
