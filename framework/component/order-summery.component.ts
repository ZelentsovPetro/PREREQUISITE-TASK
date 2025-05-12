import { Locator, Page } from "@playwright/test";

export class OrderSummeryComponent {
  readonly page: Page;
  readonly orderSummeryBlock: Locator;
  readonly totalSections: Locator;
  readonly productName: Locator;
  readonly addonName: Locator;
  readonly continueButton: Locator;
  readonly checkoutButton: Locator;
  readonly subTotalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderSummeryBlock = this.page.locator("#orderSummary");
    this.productName = this.orderSummeryBlock.locator('[class="product-name"]');
    this.addonName = this.orderSummeryBlock.locator('[class="pull-left float-left"]').first();
    this.totalSections = this.orderSummeryBlock.locator("span.amt");
    this.continueButton = this.orderSummeryBlock.locator('button[type= "submit"]');
    this.checkoutButton = this.orderSummeryBlock.locator("#checkout");
    this.subTotalPrice = this.orderSummeryBlock.locator("#subtotal");
  }

  async getTotalPrise() {
    const prise = await this.totalSections.textContent();

    if (!prise) {
      throw new Error("textContent is null");
    }

    return parseFloat(prise?.match(/[\d.]+/)?.[0] ?? "0");
  }

  async getProductNameFromOrderSummery(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getAddonNameFromOrderSummery(): Promise<string | null> {
    const addonName = await this.addonName.textContent();
    return (addonName ?? "").replace(/^\+\s*/, "");
  }

  async clickOnContinueButton(): Promise<void> {
    await this.continueButton.waitFor();
    await this.continueButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickOnCheckoutButton(): Promise<void> {
    await this.checkoutButton.waitFor();
    await this.checkoutButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
