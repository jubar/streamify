import { expect, test } from "@playwright/test";

// 🧠 In order to test correctly the dashboad we need to create a
// dedicated environment with its own database and a specific seed
// that allow us to test the dashboard with a specific data set.

// 🫣 Since this is just a sample test, we are going to use the default
// server with the default random seed. Artists are guaranteed.

test.describe("Dashboard rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/dashboard");
  });

  test("Should render 3 cards", async ({ page }) => {
    const mainStats = page.getByTestId("main-stats");
    await expect(mainStats.getByText(/active users/)).toBeVisible();
    await expect(
      mainStats.getByRole("link", { name: /View all/ })
    ).toBeVisible();
    await expect(mainStats.getByText(/Subscription\'s revenue/)).toBeVisible();
    await expect(mainStats.getByText(/Streams this month/)).toBeVisible();
  });

  test("Should render a growth chart with additional slides", async ({
    page,
  }) => {
    await expect(page.getByText("User growth metrics")).toBeVisible();
    const growthChart = page.getByTestId("user-growth-chart");
    // We need to review in chartJS how we can test the component.
    await expect(growthChart.locator("canvas")).toBeVisible();

    await expect(growthChart.getByLabel("Premium Users")).toHaveRole("switch");
    await expect(growthChart.getByLabel("Basic Users")).toHaveRole("switch");
    await expect(growthChart.getByLabel("Free Users")).toHaveRole("switch");
  });

  test("Should have a tabs with 2 more charts", async ({ page }) => {
    const metrics = page.getByTestId("metrics-chart");
    await expect(metrics.getByText("Metrics")).toBeVisible();
    await expect(metrics.getByRole("tab", { name: "Revenue" })).toBeVisible();
    await expect(metrics.getByRole("tab", { name: "Top songs" })).toBeVisible();

    // We need to review in chartJS how we can test the component.
    await expect(metrics.locator("canvas")).toBeVisible();
    await metrics.getByRole("tab", { name: "Top songs" }).click();
    // We need to review in chartJS how we can test the component.
    await expect(metrics.locator("canvas")).toBeVisible();
  });

  test("Should have a table with 10 rows per page", async ({ page }) => {
    const table = page.getByTestId("stream-table");
    const body = page.getByTestId("stream-table-body");

    await expect(table).toBeVisible();

    // Check the default headers
    await expect(
      table.getByRole("columnheader", { name: "Artist" })
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "Song" })
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "User" })
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "Date Streamed" })
    ).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: "Subscription" })
    ).toBeVisible();

    // Check the page size, we need to wait for the table to be populated
    // 🤌 all() function doesn't wait automatically.
    await page.waitForSelector(
      "[data-testid='stream-table-body'] [role='row']"
    );

    const rows = await body.getByRole("row").all();

    expect(rows).toHaveLength(10);
  });

  test("Should be able to search", async ({ page }) => {
    const search = page.getByRole("searchbox");
    const body = page.getByTestId("stream-table-body");

    await search.fill("Adele");
    await expect(page.getByLabel("Loading")).toHaveCount(0);
    expect((await body.getByText("Adele").all()).length).toBeGreaterThan(0);

    await search.fill("la taba");
    await expect(page.getByLabel("Loading")).toHaveCount(0);
    expect((await body.getByText("La tabaré").all()).length).toBeGreaterThan(0);

    await search.fill("invalid search");
    await expect(page.getByLabel("Loading")).toHaveCount(0);
    await expect(body.getByText("No data were found")).toBeVisible();
  });

  test("Headers should sort the table", async ({ page }) => {
    const table = page.getByTestId("stream-table");
    const body = page.getByTestId("stream-table-body");

    const artistHeader = table.getByRole("columnheader", { name: "Artist" });
    await artistHeader.click();

    await expect(page.getByLabel("Loading")).toHaveCount(0);
    expect((await body.getByText("Adele").all()).length).toBeGreaterThan(0);

    await artistHeader.click();
    await expect(page.getByLabel("Loading")).toHaveCount(0);
    expect((await body.getByText("Trotsky").all()).length).toBeGreaterThan(0);
  });
});
