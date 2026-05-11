import { test, expect } from "@playwright/test";

test.describe("Kontaktformular", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("zeigt Fehlermeldung bei leerem Absenden", async ({ page }) => {
    await page.click("#contact-submit");
    const errors = page.locator(".text-red-600");
    await expect(errors.first()).toBeVisible();
  });

  test("zeigt Fehler bei ungültiger E-Mail", async ({ page }) => {
    await page.fill("#Vorname", "Max");
    await page.fill("#Nachname", "Mustermann");
    await page.fill("#email", "keine-email");
    await page.fill("#message", "Testnachricht");
    await page.click("#contact-submit");
    const errors = page.locator(".text-red-600");
    await expect(errors.first()).toBeVisible();
  });

  test("blendet Formular aus und zeigt Erfolgsmeldung nach Absenden", async ({ page }) => {
    await page.fill("#Vorname", "Max");
    await page.fill("#Nachname", "Mustermann");
    await page.fill("#email", "max@example.com");
    await page.fill("#message", "Das ist eine Testnachricht.");

    // Netlify-Request abfangen damit kein echter POST gesendet wird
    await page.route("/", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({ status: 200 });
      } else {
        await route.continue();
      }
    });

    await page.click("#contact-submit");
    await expect(page.locator("#message-success")).toBeVisible();
    await expect(page.locator("#contactForm")).toBeHidden();
  });
});
