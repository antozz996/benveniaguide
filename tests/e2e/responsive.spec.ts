import { expect, test } from "@playwright/test";
import { seedConsent } from "./helpers";

const viewports = [
  { width: 375, height: 812, label: "mobile" },
  { width: 768, height: 1024, label: "tablet" },
  { width: 1440, height: 900, label: "desktop" },
] as const;

const checkPages = ["/", "/demo", "/contatti", "/prezzi"] as const;

for (const viewport of viewports) {
  test.describe(`Responsività ${viewport.label} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const path of checkPages) {
      test(`${path} senza overflow orizzontale`, async ({ page }) => {
        await seedConsent(page);
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(1);
      });
    }

    if (viewport.width < 1024) {
      test("il menu mobile si apre, naviga e si chiude", async ({ page }) => {
        await seedConsent(page);
        await page.goto("/");

        const openButton = page.getByRole("button", { name: "Apri il menu" });
        await expect(openButton).toBeVisible();
        await openButton.click();

        const panel = page.getByRole("navigation", {
          name: "Navigazione mobile",
        });
        await expect(panel).toBeVisible();

        await panel.getByRole("link", { name: "Prezzi" }).click();
        await expect(page).toHaveURL(/\/prezzi$/);
        await expect(panel).toBeHidden();
      });
    } else {
      test("la navigazione desktop è visibile e il bottone menu no", async ({
        page,
      }) => {
        await seedConsent(page);
        await page.goto("/");
        await expect(
          page.getByRole("navigation", { name: "Navigazione principale" }),
        ).toBeVisible();
        await expect(
          page.getByRole("button", { name: "Apri il menu" }),
        ).toBeHidden();
      });
    }
  });
}
