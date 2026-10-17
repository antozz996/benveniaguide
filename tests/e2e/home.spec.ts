import { expect, test } from "@playwright/test";
import { seedConsent } from "./helpers";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await seedConsent(page);
    await page.goto("/");
  });

  test("mostra hero, claim e CTA principali", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "accoglienza migliore",
    );
    await expect(
      page.getByRole("link", { name: /Richiedi una demo gratuita/ }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Esplora una Guest Guide/ }).first(),
    ).toBeVisible();
  });

  test("la navigazione principale porta alle sezioni chiave", async ({
    page,
  }) => {
    const nav = page.getByRole("navigation", { name: "Navigazione principale" });
    await expect(nav.getByRole("link", { name: "Demo" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Prezzi" })).toBeVisible();

    await nav.getByRole("link", { name: "Demo" }).click();
    await expect(page).toHaveURL(/\/demo$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("la demo è incorporata nella home ed esplorabile", async ({ page }) => {
    const demoSection = page
      .locator("section")
      .filter({ hasText: "Provala adesso" });
    await expect(
      demoSection.getByRole("tab", { name: "Soggiorno" }),
    ).toBeVisible();
    await demoSection.getByRole("tab", { name: "Esplora" }).click();
    await expect(
      demoSection.getByRole("button", { name: /Lungolago di Esempio/ }),
    ).toBeVisible();
  });

  test("il footer espone i link informativi", async ({ page }) => {
    const footer = page.getByRole("contentinfo");
    await expect(
      footer.getByRole("link", { name: "Privacy" }).first(),
    ).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "Cookie policy" }).first(),
    ).toBeVisible();
    await expect(
      footer.getByRole("link", { name: "Contatti" }).first(),
    ).toBeVisible();
  });

  test("le FAQ rispondono al click", async ({ page }) => {
    const firstFaq = page.locator("main details").first();
    await firstFaq.locator("summary").click();
    await expect(firstFaq).toHaveAttribute("open", "");
  });
});
