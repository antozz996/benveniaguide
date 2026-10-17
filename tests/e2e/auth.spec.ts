import { expect, test, type APIRequestContext } from "@playwright/test";
import { seedConsent } from "./helpers";

const ADMIN_EMAIL = "info@benveniaguide.it";

/** Recupera un link di accesso valido per l'admin (solo via dev-link). */
async function fetchAdminMagicLink(
  request: APIRequestContext,
): Promise<string> {
  const response = await request.get(
    `/api/auth/dev-link?email=${encodeURIComponent(ADMIN_EMAIL)}`,
  );
  expect(response.ok()).toBe(true);
  const data = (await response.json()) as { ok: boolean; url: string };
  expect(data.ok).toBe(true);
  return data.url;
}

test.describe("Accesso all'area riservata", () => {
  test("senza sessione /area reindirizza ad /accedi", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/area");
    await expect(page).toHaveURL(/\/accedi$/);
    await expect(
      page.getByRole("heading", { name: "Accedi alla tua area" }),
    ).toBeVisible();
  });

  test("/area/admin è protetta senza sessione", async ({ page }) => {
    await seedConsent(page);
    await page.goto("/area/admin");
    await expect(page).toHaveURL(/\/accedi$/);
  });

  test("un cookie di sessione non valido non apre l'area", async ({
    page,
    context,
  }) => {
    await seedConsent(page);
    await context.addCookies([
      {
        name: "bg_session",
        value: "cookie-non-valido",
        url: "http://localhost:3000",
      },
    ]);
    await page.goto("/area");
    await expect(page).toHaveURL(/\/accedi$/);
  });

  test("il form dà risposta neutra per un'email sconosciuta", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/accedi");
    await page
      .getByLabel("Email")
      .fill("indirizzo-sconosciuto-0000@example.com");
    await page.getByRole("button", { name: "Inviami il link di accesso" }).click();
    await expect(
      page.getByText("Controlla la tua casella di posta"),
    ).toBeVisible();
  });

  test("il magic link autentica l'admin e mostra il pannello", async ({
    page,
    request,
  }) => {
    await seedConsent(page);
    const url = await fetchAdminMagicLink(request);

    await page.goto(url);
    await expect(page).toHaveURL(/\/area\/admin$/);
    await expect(
      page.getByRole("heading", { name: "Pannello admin" }),
    ).toBeVisible();
    await expect(page.getByText(ADMIN_EMAIL).first()).toBeVisible();
  });

  test("il link di accesso è monouso", async ({ page, request }) => {
    await seedConsent(page);
    const url = await fetchAdminMagicLink(request);

    await page.goto(url);
    await expect(page).toHaveURL(/\/area\/admin$/);

    await page.context().clearCookies();
    await page.goto(url);
    await expect(page).toHaveURL(/\/accedi\/link-non-valido$/);
  });

  test("un token inventato porta alla pagina link non valido", async ({
    page,
  }) => {
    await seedConsent(page);
    await page.goto("/accedi/verifica?token=token-inventato");
    await expect(page).toHaveURL(/\/accedi\/link-non-valido$/);
    await expect(
      page.getByRole("heading", { name: "Link non valido o già usato" }),
    ).toBeVisible();
  });

  test("il logout chiude la sessione", async ({ page, request }) => {
    await seedConsent(page);
    const url = await fetchAdminMagicLink(request);

    await page.goto(url);
    await expect(page).toHaveURL(/\/area\/admin$/);

    await page.getByRole("button", { name: "Esci" }).click();
    await expect(page).toHaveURL(/\/$/);

    await page.goto("/area");
    await expect(page).toHaveURL(/\/accedi$/);
  });

  test("le pagine dell'area non sono indicizzabili", async ({
    page,
    request,
  }) => {
    await seedConsent(page);
    const url = await fetchAdminMagicLink(request);

    await page.goto(url);
    await expect(page).toHaveURL(/\/area\/admin$/);

    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("robots.txt esclude area, accesso e guide", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBe(true);
    const body = await response.text();
    expect(body).toContain("Disallow: /area/");
    expect(body).toContain("Disallow: /accedi");
    expect(body).toContain("Disallow: /g/");
  });
});
