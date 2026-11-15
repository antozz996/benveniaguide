import { expect, test } from "@playwright/test";

// HOS-33: le immagini dei post Instagram sono pubbliche ma non indicizzabili.
test.describe("Immagini social (/social)", () => {
  test("un'immagine risponde 200 con X-Robots-Tag noindex", async ({
    request,
  }) => {
    const res = await request.get("/social/post-01/01.jpg");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/jpeg");
    expect(res.headers()["x-robots-tag"]).toContain("noindex");
  });

  test("la sitemap non contiene /social", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(await res.text()).not.toContain("/social/");
  });
});
