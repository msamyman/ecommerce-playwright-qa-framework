import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly productCards: Locator;
  readonly viewCartModalLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
    this.searchedProductsHeading = page.getByRole("heading", {
      name: "Searched Products",
    });
    this.productCards = page.locator(".productinfo");
    this.viewCartModalLink = page.getByRole("link", { name: "View Cart" });
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/products");
  }

  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await expect(this.searchedProductsHeading).toBeVisible();
  }

  async expectProductInResults(productName: string) {
    await expect(
      this.productCards.filter({ hasText: productName }).first(),
    ).toBeVisible();
  }

  async addFirstProductToCartAndGoToCart() {
    // Click the visible "Add to cart" button on the first search result card
    await this.productCards.first().locator("a.add-to-cart").click();
    await this.viewCartModalLink.click();
  }
}
