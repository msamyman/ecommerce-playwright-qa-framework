import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Authentication Flow", () => {
  test("should display error message with invalid credentials", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("invalid_user_2026@example.com", "WrongPass123!");
    await loginPage.verifyErrorMessageVisible();
  });
});
