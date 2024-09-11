import { expect, test } from "@playwright/test";

test.describe("Navigation in desktop", () => {
  test.use({
    viewport: { width: 1600, height: 1200 },
  });

  test("should have a sidebar with nav links", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page.getByRole("menubar")).toBeVisible();
    await expect(page.getByTestId("topbar")).not.toBeVisible();

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Users" })).toBeVisible();
  });

  test("Navigate between pages", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL("http://localhost:3000/dashboard");

    await page.getByRole("link", { name: "Users" }).click();
    await expect(page).toHaveURL("http://localhost:3000/dashboard/users");

    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});

test.describe("Navigation in mobile", () => {
  test.use({
    viewport: { width: 480, height: 700 },
  });

  test("Should have a top bar with a drawer", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const topbar = page.getByTestId("topbar");
    await expect(page.getByRole("menubar")).not.toBeVisible();
    // Check the links in the drawer menu
    await topbar.getByRole("button").click();
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();

    await expect(menu.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Users" })).toBeVisible();
  });

  test("Navigate between pages", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const topbar = page.getByTestId("topbar");
    await topbar.getByRole("button").click();
    const menu = page.getByRole("menu");

    await menu.getByRole("link", { name: "Dashboard" }).click();
    await expect(page).toHaveURL("http://localhost:3000/dashboard");

    await topbar.getByRole("button").click();
    await menu.getByRole("link", { name: "Users" }).click();
    await expect(page).toHaveURL("http://localhost:3000/dashboard/users");

    await topbar.getByRole("button").click();
    await menu.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
