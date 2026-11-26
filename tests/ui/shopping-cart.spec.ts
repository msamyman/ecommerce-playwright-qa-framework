import { test } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import productData from "../../test-data/products.json";

test.describe("Product Search & Shopping Cart E2E Flow", () => {
  test("should search for a product, add to cart, and verify cart details", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const { keyword, expectedProductName, unitPrice } = productData.searchItem;

    // 1. Navigate and search
    await productsPage.goto();
    await productsPage.searchProduct(keyword);
    await productsPage.expectProductInResults(expectedProductName);

    // 2. Add to cart and navigate to cart page
    await productsPage.addFirstProductToCartAndGoToCart();

    // 3. Verify item name, unit price, quantity, and total
    await cartPage.verifyProductInCart(expectedProductName, unitPrice, "1");
  });
});
