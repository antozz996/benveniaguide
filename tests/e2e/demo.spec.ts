import { expect, test } from "@playwright/test";
import { seedConsent } from "./helpers";

test.describe("Demo interattiva (/demo)", () => {
  test.beforeEach(async ({ page }) => {
    await seedConsent(page);
    await page.goto("/demo");
  });

  test("parte dalla schermata di benvenuto con la struttura dimostrativa", async ({
    page,
  }) => {
    await expect(
      page.getByText("Casa Demo · Vista Lago").first(),
    ).toBeVisible();
    await expect(page.getByText("Demo", { exact: true }).first()).toBeVisible();
  });

  test("le azioni dimostrative mostrano il toast informativo", async ({
    page,
  }) => {
    await page.getByRole("tab", { name: "Soggiorno" }).click();
    await page.getByRole("button", { name: /Copia .*\(demo\)/ }).click();
    const toast = page.getByRole("status");
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("modalità demo");
  });

  test("i consigli sul territorio aprono la scheda del luogo", async ({
    page,
  }) => {
    await page.getByRole("tab", { name: "Esplora" }).click();
    await page
      .getByRole("button", { name: /Lungolago di Esempio/ })
      .click();

    await expect(
      page.getByRole("heading", { name: "Lungolago di Esempio" }),
    ).toBeVisible();

    await page.getByRole("tab", { name: "Contatti" }).click();
    await expect(
      page.getByRole("heading", { name: "Lungolago di Esempio" }),
    ).toBeHidden();
  });

  test("il cambio lingua traduce l'intera guida", async ({ page }) => {
    await page.getByRole("button", { name: "en", exact: true }).click();
    await expect(page.getByText("Casa Demo · Lake View").first()).toBeVisible();
    await expect(page.getByRole("tab", { name: "Stay" })).toBeVisible();

    await page.getByRole("button", { name: "it", exact: true }).click();
    await expect(page.getByText("Casa Demo · Vista Lago").first()).toBeVisible();
  });

  test("la modalità schermo intero si apre e si chiude", async ({ page }) => {
    await page.getByRole("button", { name: "Apri a schermo intero" }).click();
    const dialog = page.getByRole("dialog", {
      name: "Guest Guide dimostrativa a schermo intero",
    });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByText("Stai esplorando una guida dimostrativa").first(),
    ).toBeVisible();

    await dialog.getByRole("button", { name: "Chiudi la demo" }).click();
    await expect(dialog).toBeHidden();
  });

  test("il disclaimer chiarisce che i contenuti sono fittizi", async ({
    page,
  }) => {
    await expect(
      page.getByText(/fittizi|dimostrativ/i).first(),
    ).toBeVisible();
  });
});
