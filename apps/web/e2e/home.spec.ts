import { expect, test } from "@playwright/test";

test("home page renders the heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Dental Equipment Manager", level: 1 })).toBeVisible();
});
