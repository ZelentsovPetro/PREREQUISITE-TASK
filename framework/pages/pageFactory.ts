import { Page } from "@playwright/test";
import { CPanelLicensesPage } from "./cpanel-page";
import { ConfigurePage } from "./configure-page";
import { ReviewPage } from "./review-page";
import {CheckoutPage} from "./checkout-page";

//Ideally, in order not to create objects constantly,
// you should use fixtures and create a separate file for the test date,
// but this will take a lot of time

class PageFactory {
  static licensesPage: CPanelLicensesPage;
  static configurePage: ConfigurePage;
  static reviewPage: ReviewPage;
  static checkoutPage: CheckoutPage;

  static init(page: Page) {
    this.licensesPage = new CPanelLicensesPage(page);
    this.configurePage = new ConfigurePage(page);
    this.reviewPage = new ReviewPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }
}

export { PageFactory };
