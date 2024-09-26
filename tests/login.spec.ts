import { test, expect } from "@playwright/test";
import { LoginPage } from "../framework/pages/loginPage";
import { UserFactory } from "../framework/data/userFactory";

const testTitle = "Login with random login and password";

test(testTitle, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const randomUser = UserFactory.getRandomUser();

  await test.step("Open base url", async () => {
    const welcomeHeader = "Welcome,login to your account";

    await loginPage.goto();

    await expect(loginPage.welcomeHeader).toHaveText(welcomeHeader);
  });

  await test.step("Login with random login and password", async () => {
    const errorMessage = "Bad Credentials";
    await loginPage.signIn(randomUser);

    await expect(loginPage.errorMessage).toHaveText(errorMessage);
  });
});
