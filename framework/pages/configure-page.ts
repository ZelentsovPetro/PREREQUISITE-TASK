import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class ConfigurePage extends BasePage {
  readonly pageTitle: Locator;
  readonly ipField: Locator;
  readonly addonsContainer: Locator;
  readonly checkBoxes: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = this.page.locator('[class="header-lined"] h1');
    this.ipField = this.page.getByLabel('IP Address * Validating IP');
    this.addonsContainer = this.page.locator('#productAddonsContainer');
    this.checkBoxes = this.addonsContainer.locator('.iCheck-helper');
  }

  async fillIdField(id: { ip: string }): Promise<void> {
    await this.ipField.fill(id.ip);
    await this.ipField.press('Enter');
    await this.page.waitForResponse('https://store.cpanel.net/modules/servers/manage2/cart_validate_ip.php');
  }

  async selectCheckBoxByIndex(index: number): Promise<void> {
    await this.checkBoxes.nth(index).waitFor();
    await this.checkBoxes.nth(index).click();
    await this.page.waitForResponse('https://store.cpanel.net/cart.php');
  }
}
