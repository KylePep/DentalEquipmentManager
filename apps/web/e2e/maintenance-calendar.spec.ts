import { expect, test } from "@playwright/test";

test("calendar toolbar navigates between months", async ({ page }) => {
  await page.goto("/dashboard");

  const label = page.locator(".rbc-toolbar-label");
  const before = (await label.textContent())?.trim() ?? "";

  await page.getByRole("button", { name: "Next", exact: true }).click();

  await expect(label).not.toHaveText(before);
});

test("calendar toolbar switches to week view", async ({ page }) => {
  await page.goto("/dashboard");

  await page.getByRole("button", { name: "Week", exact: true }).click();

  await expect(page.locator(".rbc-time-view")).toBeVisible();
});
