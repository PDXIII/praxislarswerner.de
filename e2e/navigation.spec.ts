import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("Startseite lädt korrekt", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Lars Werner/i);
  });

  test("Desktop-Navigation ist sichtbar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const nav = page.locator("nav ul.hidden.md\\:flex");
    await expect(nav).toBeVisible();
  });

  test("Mobile-Navigation ist sichtbar", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const nav = page.locator("nav ul.md\\:hidden");
    await expect(nav).toBeVisible();
  });

  test("Partner-Links öffnen sich in neuem Tab", async ({ page }) => {
    await page.goto("/");
    const partnerLinks = page.locator("section a[target='_blank']");
    const count = await partnerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
