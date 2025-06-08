import { test, Browser, Page, chromium, expect } from "@playwright/test";
import BasePage from "../pageObjects/basePage";
import { adminLoginPage } from "../pageObjects/adminLoginPage";
import { config } from "../config/config.qa";

let browser: Browser;
let page: Page;
let loginPage: adminLoginPage;
let basePage: BasePage;

test.beforeEach(async () => {
  browser = await chromium.launch({ headless: false, channel: "chrome" });
  page = await browser.newPage();
  loginPage = new adminLoginPage(page);
  basePage = new BasePage(page);
  await basePage.navigateTo(config.url);
  await loginPage.login(config.email, config.password);
});

test.afterEach(async () => {
  await browser.close();
});

test("T2334 - Verify required fields validation for creating an checkout.", async () => {
  try {
    await basePage.clickElement(createOrderPage.createOrderButton);
    await basePage.clickElement(createOrderPage.packagesButton);

    expect(
      await basePage.isElementVisible(createOrderPage.coordinatorError)
    ).toBe(true);
    expect(
      await basePage.isElementVisible(createOrderPage.approvingManagerNameError)
    ).toBe(true);
    expect(
      await basePage.isElementVisible(
        createOrderPage.approvingManagerEmailError
      )
    ).toBe(true);
    expect(
      await basePage.isElementVisible(createOrderPage.businessUseError)
    ).toBe(true);
    expect(
      await basePage.isElementVisible(createOrderPage.inviteCategoryError)
    ).toBe(true);
    expect(
      await basePage.isElementVisible(createOrderPage.billingTypeError)
    ).toBe(true);
    expect(
      await basePage.isElementVisible(createOrderPage.ethicsComplianceError)
    ).toBe(true);
    expect(
      await basePage.isElementVisible(createOrderPage.financialCommitmentError)
    ).toBe(true);
    expect(
      await basePage.isElementVisible(
        createOrderPage.requiredFieldAgreementError
      )
    ).toBe(true);
  } catch (error: any) {
    console.error(`Test failed: ${error.message}`);
    throw error;
  }
});


test("TC0516 - Verify that can manually create an order successfully.", async () => {
  try {
    // Create new order
    const approvingManagerName =
      await createOrderPage.createOrderWithValidDetails("", "");

    // validate order successfully created.
    expect(
      await basePage.isElementVisible(
        createOrderPage.orderCreationSuccessMessage
      )
    ).toBe(true);

    expect(
      await basePage.isElementVisible(
        await createOrderPage.getApprovingManagerName(approvingManagerName)
      )
    ).toBe(true);
  } catch (error: any) {
    console.error(`Test failed: ${error.message}`);
    throw error;
  }
});

