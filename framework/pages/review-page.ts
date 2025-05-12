import { Locator, Page, expect } from "@playwright/test";
import { OrderSummeryComponent } from "../component/order-summery.component";
import { BasePage } from "./base-page";

export class ReviewPage extends BasePage {
  readonly pageTitle: Locator;
  readonly viewCart: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly addonTitle: Locator;
  readonly addonPrice: Locator;
  readonly priceList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = this.page.locator('[class="header-lined"] h1');
    this.viewCart = this.page.locator('[class="view-cart-items"]');
    this.productTitle = this.viewCart.locator('[class="item-title"]').first();
    this.productPrice = this.viewCart.locator('[class="col-sm-4 item-price"]').first();
    this.addonTitle = this.viewCart.locator('[class="item-title"]').last();
    this.addonPrice = this.viewCart.locator('[class="col-sm-4 item-price"]').last();
    this.priceList = this.viewCart.locator('[class="col-sm-4 item-price"] > span:first-of-type');
  }

  async verifyTotalPriceAndSubtotal() {
    const orderSummery = new OrderSummeryComponent(this.page);
    const priceList = await this.priceList.allTextContents();
    const subtotalText = await orderSummery.subTotalPrice.textContent();

    const total = priceList
      .map((text) => parseFloat(text.replace(/[^\d.]/g, "")))
      .reduce((sum, price) => sum + price, 0);

    const subtotal = parseFloat(subtotalText!.replace(/[^\d.]/g, ""));

    expect(total).toBeCloseTo(subtotal, 2);
  }
}
