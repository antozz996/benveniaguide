import { expect, test } from "@playwright/test";
import { seedConsent } from "./helpers";

const SLUG = "esempio-casa-del-borgo";

test.describe("Guide pubbliche (/g/[slug])", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await seedConsent(page);
  });

  test("la guida di esempio si apre a tutto schermo senza il sito marketing", async ({
    page,
  }) => {
    const response = await page.goto(`/g/${SLUG}`);
    expect(response?.status()).toBe(200);

    await expect(page.getByText("Casa del Borgo").first()).toBeVisible();
    await expect(page.getByRole("tablist").first()).toBeVisible();
    await expect(page.getByRole("tab", { name: "Soggiorno" })).toBeVisible();
    await expect(page.getByText("Guest Guide dimostrativa")).toHaveCount(0);
    await expect(page.locator("[data-site-chrome]").first()).toBeHidden();
  });

  test("la guida e' noindex, nofollow", async ({ page }) => {
    await page.goto(`/g/${SLUG}`);
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robots).toContain("noindex");
    expect(robots).toContain("nofollow");
  });

  for (const path of [
    "/g/slug-che-non-esiste",
    `/g/${SLUG}/xx`,
    "/g",
  ]) {
    test(`${path} risponde 404`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.getByText("Errore 404")).toBeVisible();
    });
  }

  test("il cambio lingua porta alla versione inglese e ritorno", async ({
    page,
  }) => {
    await page.goto(`/g/${SLUG}`);
    await page.getByRole("link", { name: "en", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/g/${SLUG}/en$`));
    // Con cacheComponents la pagina precedente resta nel DOM nascosta
    // (Activity): si verifica solo quella visibile.
    await expect(page.locator("[data-guest-guide]:visible")).toHaveAttribute(
      "lang",
      "en",
    );
    await expect(page.getByRole("tab", { name: "Stay" })).toBeVisible();
    await expect(page.getByText("Welcome to Casa del Borgo!")).toBeVisible();

    await page.getByRole("link", { name: "it", exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/g/${SLUG}$`));
    await expect(page.getByRole("tab", { name: "Soggiorno" })).toBeVisible();
  });

  test("la versione inglese e' noindex", async ({ page }) => {
    const response = await page.goto(`/g/${SLUG}/en`);
    expect(response?.status()).toBe(200);
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("il bottone copia Wi-Fi mostra la conferma", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(`/g/${SLUG}`);
    await page.getByRole("tab", { name: "Soggiorno" }).click();
    await page.getByRole("button", { name: "Copia password" }).click();
    await expect(page.getByRole("status")).toBeVisible();
  });

  test("i contatti usano link reali", async ({ page }) => {
    await page.goto(`/g/${SLUG}`);
    await page.getByRole("tab", { name: "Contatti" }).click();
    await expect(
      page.getByRole("link", { name: "Scrivi un'email" }),
    ).toHaveAttribute("href", /^mailto:/);
    await expect(
      page.getByRole("link", { name: "Indicazioni per arrivare" }),
    ).toHaveAttribute("href", /^https:\/\/www\.google\.com\/maps\//);
    // Senza telefono configurato l'azione "Chiama" non viene mostrata.
    await expect(page.getByText("Chiama l'host")).toHaveCount(0);
  });

  test("la sitemap non include le guide", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);
    expect(await response.text()).not.toContain("/g/");
  });
});
