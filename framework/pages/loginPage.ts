import { Locator, Page } from "@playwright/test";
import "dotenv/config";

import { IUser } from "../interfaces/user";
import { environments } from "../data/environment";

export class LoginPage {
  readonly page: Page;
  readonly url: string;
  readonly welcomeHeader: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = environments.PROD;
    this.welcomeHeader = page.getByText("Welcome,login to your account");
    this.userNameInput = page.getByPlaceholder("Login");
    this.passwordInput = page.getByPlaceholder("Password");
    this.logInButton = page.getByRole("button", { name: "Login", exact: true });
    this.errorMessage = page.locator(
      ".loginForm__login-field--AEtls .inputOutside__light--mVHHb.inputOutside__error--Lsiyi",
    );
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async signIn(user: IUser) {
    await this.userNameInput.fill(user.userName);
    await this.passwordInput.fill(user.password);
    await this.logInButton.click();
  }
  async clickOnLogInButton() {
    await this.logInButton.waitFor();
    await this.logInButton.click();
  }
}
