import { test } from "../../fixtures/baseTest";

test.describe("Authentication Flow", () => {
  test("should display error message with invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("invalid_user_2026@example.com", "WrongPass123!");
    await loginPage.verifyErrorMessageVisible();
  });
});