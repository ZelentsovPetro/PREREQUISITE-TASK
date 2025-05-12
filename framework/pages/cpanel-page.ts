import { Locator, Page } from "@playwright/test";
import {BasePage} from "./base-page";

export class CPanelLicensesPage extends BasePage {
  readonly pageLogo: Locator;
  readonly orderNowButtonsList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageLogo = this.page.locator('#header');
    this.orderNowButtonsList = this.page.locator('[class*="btn-order-now"]');
  }

  async clickRandomOrderNowButton(): Promise<void> {
    //Addons are not displayed on the fifth product
    const randomNumber = Math.floor(Math.random() * 4);

    await this.orderNowButtonsList.nth(randomNumber).click();
    await this.page.waitForLoadState("networkidle");
  }
}
