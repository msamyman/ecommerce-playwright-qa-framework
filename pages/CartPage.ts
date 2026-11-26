import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator("#cart_info_table tbody tr");
  }

  async verifyProductInCart(
    productName: string,
    expectedPrice: string,
    expectedQuantity: string,
  ) {
    const row = this.cartRows.filter({ hasText: productName });
    await expect(row).toBeVisible();
    await expect(row.locator(".cart_price")).toHaveText(expectedPrice);
    await expect(row.locator(".cart_quantity button")).toHaveText(
      expectedQuantity,
    );
    await expect(row.locator(".cart_total_price")).toHaveText(expectedPrice);
  }
}
