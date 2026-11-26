import { test, expect } from "@playwright/test";

const BASE_API_URL = "https://automationexercise.com/api";

test.describe("E-Commerce REST API Tests", () => {
  test("GET /productsList - should return 200 and non-empty product list", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_API_URL}/productsList`);

    expect(response.status()).toBe(200);

    // automationexercise API returns JSON string inside text/html body, so parse safely
    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    // Verify schema of the first product
    const firstProduct = body.products[0];
    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("name");
    expect(firstProduct).toHaveProperty("price");
    expect(firstProduct).toHaveProperty("category");
  });

  test("POST /searchProduct - should return matching products for search keyword", async ({
    request,
  }) => {
    const response = await request.post(`${BASE_API_URL}/searchProduct`, {
      form: {
        search_product: "top",
      },
    });

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test("POST /searchProduct - negative test when search_product parameter is missing", async ({
    request,
  }) => {
    const response = await request.post(`${BASE_API_URL}/searchProduct`);

    expect(response.status()).toBe(200);

    const body = JSON.parse(await response.text());
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain(
      "Bad request, search_product parameter is missing",
    );
  });
});
