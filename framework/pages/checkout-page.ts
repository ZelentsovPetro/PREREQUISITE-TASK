import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class CheckoutPage extends BasePage {
  readonly pageTitle: Locator;
  readonly responsiveTable: Locator;
  readonly productIp: Locator;
  readonly addonIp: Locator;
  readonly newUserContainer: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly phoneNumberField: Locator;
  readonly companyNameField: Locator;
  readonly streetAddressField: Locator;
  readonly streetAddressTwoField: Locator;
  readonly cityField: Locator;
  readonly countryField: Locator;
  readonly taxIdField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly generatePasswordButton: Locator;
  readonly termsAndConditionsContainer: Locator;
  readonly firstTermButton: Locator;
  readonly secondTermButton: Locator;
  readonly thirdTermButton: Locator;
  readonly fourthTermButton: Locator;
  readonly termsAndConditionsCheckBox: Locator;
  readonly paymentContainer: Locator;
  readonly creditCardCheckBox: Locator;
  readonly payPalCheckBox: Locator;
  readonly completeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = this.page.locator('[class="header-lined"] h1');
    this.responsiveTable = this.page.locator('[class="table-responsive"]');
    this.productIp = this.responsiveTable.locator('[class="table-responsive"] tbody td').nth(2);
    this.addonIp = this.responsiveTable.locator('[class="table-responsive"] tbody td').nth(7);
    this.newUserContainer = this.page.locator('#containerNewUserSignup');
    this.firstNameField =  this.newUserContainer.getByPlaceholder('First Name');
    this.lastNameField = this.newUserContainer.locator('#inputLastName');
    this.emailField = this.newUserContainer.getByRole('textbox', { name: '' });
    this.phoneNumberField = this.newUserContainer.getByPlaceholder('Phone Number');
    this.companyNameField = this.newUserContainer.getByPlaceholder('Company Name (Optional)');
    this.streetAddressField = this.newUserContainer.getByPlaceholder('Street Address', { exact: true });
    this.streetAddressTwoField = this.newUserContainer.getByPlaceholder('Street Address 2');
    this.cityField = this.newUserContainer.getByPlaceholder('City');
    this.countryField = this.newUserContainer.locator('#inputCountry');
    this.taxIdField = this.newUserContainer.getByPlaceholder('Tax ID (Optional)');
    this.passwordField = this.page.locator('#inputNewPassword1');
    this.confirmPasswordField = this.page.getByPlaceholder('Confirm Password');
    this.generatePasswordButton = this.page.getByRole('button', { name: 'Generate Password' });
    this.termsAndConditionsContainer = this.page.getByText('Terms & Conditions Notice of');
    this.firstTermButton = this.termsAndConditionsContainer.locator('[class="btn btn-sm btn-outline-secondary"]').nth(0);
    this.secondTermButton = this.termsAndConditionsContainer.locator('[class="btn btn-sm btn-outline-secondary"]').nth(1);
    this.thirdTermButton = this.termsAndConditionsContainer.locator('[class="btn btn-sm btn-outline-secondary"]').nth(2);
    this.fourthTermButton = this.termsAndConditionsContainer.locator('[class="btn btn-sm btn-outline-secondary"]').nth(3);
    this.termsAndConditionsCheckBox = this.termsAndConditionsContainer.locator('#iCheck-accepttos_custom');
    this.paymentContainer = this.page.locator('#paymentGatewaysContainer');
    this.creditCardCheckBox = this.paymentContainer.locator('[class="payment-methods is-credit-card"]').first();
    this.payPalCheckBox = this.paymentContainer.locator('[value="paypal_ppcpv"]');
    this.completeOrderButton = this.page.locator('button[id="btnCompleteOrder"]');
  }
}
