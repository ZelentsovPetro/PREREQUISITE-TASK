import { test, expect } from "@playwright/test";
import { UserFactory } from "../framework/data/userFactory";
import {OrderSummeryComponent} from "../framework/component/order-summery.component";
import { PageFactory } from "../framework/pages/pageFactory";

test("Some e2e title", async ({ page }) => {
  //Ideally, in order not to create objects constantly,
  // you should use fixtures and create a separate file for the test date,
  // but this will take a lot of time
  PageFactory.init(page);
  const { licensesPage, configurePage, reviewPage, checkoutPage } = PageFactory;
  const ip = UserFactory.getRandomIP();
  const orderSummeryBlock = new OrderSummeryComponent(page);
  let firstTotalPrise:number;

  await test.step("Open cPanel page", async () => {
    await licensesPage.goto();

    await expect(licensesPage.pageLogo).toBeVisible();
  });

  await test.step("Click [Order Now] for any product", async () => {
    await licensesPage.clickRandomOrderNowButton();

    await expect(page).toHaveURL(new RegExp('confproduct'));
    await expect(configurePage.pageTitle).toHaveText('Configure');
  });

  await test.step(`Enter ${ip} ip address`, async () => {
    firstTotalPrise = await orderSummeryBlock.getTotalPrise();

    await configurePage.fillIdField(ip);
  });

  await test.step('Choose first addon', async () => {
    const firstAddon = 0;

    await configurePage.selectCheckBoxByIndex(firstAddon);
  });

  await test.step('Verify the [Order Summary] is updated', async () => {
    const totalPrise   = await orderSummeryBlock.getTotalPrise();

    expect.soft(totalPrise).toBeGreaterThan(firstTotalPrise);
  });

  await test.step('Click on [Continue] button', async () => {
    await orderSummeryBlock.clickOnContinueButton();
    await expect(reviewPage.pageTitle).toHaveText('Review & Checkout');
  });

  await test.step('Verify the expected products and addons are present on review page', async () => {
    await expect(reviewPage.viewCart).toBeVisible();
    await expect(reviewPage.productTitle).toBeVisible();
    await expect(reviewPage.productPrice).toBeVisible();
    await expect(reviewPage.addonTitle).toBeVisible();
    await expect(reviewPage.addonPrice).toBeVisible();
  });

  await test.step('Compare the total price with the subtotal', async () => {
    await reviewPage.verifyTotalPriceAndSubtotal();
  });

  await test.step('Click on [Checkout] button', async () => {
    await orderSummeryBlock.checkoutButton.click();
    await expect(page).toHaveURL(new RegExp('checkout'));
    await expect(checkoutPage.pageTitle).toHaveText('Checkout');
  });

  // await test.step('Check product Ip', async () => {
  //    expect(checkoutPage.productIp).toHaveText(`${ip}`);
  // });

  await test.step('Observe [Personal Information] block', async () => {
    await expect(checkoutPage.firstNameField).toBeVisible()
    await expect(checkoutPage.firstNameField).toBeEnabled();
    await expect(checkoutPage.lastNameField).toBeVisible()
    await expect(checkoutPage.lastNameField).toBeEnabled();
    await expect(checkoutPage.emailField).toBeVisible()
    await expect(checkoutPage.emailField).toBeEnabled();
    await expect(checkoutPage.phoneNumberField).toBeVisible()
    await expect(checkoutPage.phoneNumberField).toBeEnabled();
  });

  await test.step('Observe [Billing Address] block', async () => {
    await expect(checkoutPage.companyNameField).toBeVisible()
    await expect(checkoutPage.companyNameField).toBeEnabled();
    await expect(checkoutPage.streetAddressField).toBeVisible()
    await expect(checkoutPage.streetAddressField).toBeEnabled();
    await expect(checkoutPage.streetAddressTwoField).toBeVisible()
    await expect(checkoutPage.streetAddressTwoField).toBeEnabled();
    await expect(checkoutPage.cityField).toBeVisible()
    await expect(checkoutPage.cityField).toBeEnabled();
    await expect(checkoutPage.countryField).toBeVisible()
    await expect(checkoutPage.countryField).toBeEnabled();
    await expect(checkoutPage.taxIdField).toBeVisible()
    await expect(checkoutPage.taxIdField).toBeEnabled();
  });

  await test.step('Observe [Account Security] block', async () => {
    await expect(checkoutPage.passwordField).toBeVisible()
    await expect(checkoutPage.passwordField).toBeEnabled();
    await expect(checkoutPage.confirmPasswordField).toBeVisible();
    await expect(checkoutPage.confirmPasswordField).toBeEnabled();
    await expect(checkoutPage.generatePasswordButton).toBeVisible()
  });

  await test.step('Observe [Terms & Conditions] block', async () => {
    const firstButtonName = 'cPanel & WHM Pricing & Term Agreement';
    const secondButtonName = 'End User License Agreement';
    const thirdButtonName = 'Technical Support Agreement';
    const fourthButtonName = 'CloudLinux Agreement';

    await expect(checkoutPage.firstTermButton).toBeVisible();
    await expect(checkoutPage.firstTermButton).toHaveText(firstButtonName);
    await expect(checkoutPage.secondTermButton).toBeVisible();
    await expect(checkoutPage.secondTermButton).toHaveText(secondButtonName);
    await expect(checkoutPage.thirdTermButton).toBeVisible();
    await expect(checkoutPage.thirdTermButton).toHaveText(thirdButtonName);
    await expect(checkoutPage.fourthTermButton).toBeVisible();
    await expect(checkoutPage.fourthTermButton).toHaveText(fourthButtonName);
    await expect(checkoutPage.termsAndConditionsCheckBox).toBeVisible();
    await expect(checkoutPage.termsAndConditionsCheckBox).not.toBeChecked();
  });

  await test.step('Observe [Payment Details] block', async () => {
    await expect(checkoutPage.creditCardCheckBox).toBeVisible();
    await expect(checkoutPage.creditCardCheckBox).toBeChecked();
    await expect(checkoutPage.payPalCheckBox).toBeVisible();
    await expect(checkoutPage.payPalCheckBox).not.toBeChecked();
  });

  await test.step('Observe [Complete Order] button', async () => {
    await expect(checkoutPage.completeOrderButton).toBeVisible();
    await expect(checkoutPage.completeOrderButton).toBeDisabled();
  });
});
