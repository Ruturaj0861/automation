import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class createOrderPage extends BasePage {
  public createOrderButton: Locator;
  public packagesButton: Locator;
  public coordinatorError: Locator;
  public approvingManagerNameError: Locator;
  public approvingManagerEmailError: Locator;
  public businessUseError: Locator;
  public inviteCategoryError: Locator;
  public billingTypeError: Locator;
  public ethicsComplianceError: Locator;
  public financialCommitmentError: Locator;
  public requiredFieldAgreementError: Locator;
  public selectCoordinatorButton: Locator;
  public approvingManagerNameInput: Locator;
  public approvingManagerEmailInput: Locator;
  public intendedBusinessUseInput: Locator;
  public orderPurposeDropdown: Locator;
  public groupBusinessUnitFunctionInput: Locator;
  public departmentCompanyCodeInput: Locator;
  public departmentCostCentreInput: Locator;
  public departmentGLAccountDropdown: Locator;
  public financeContactNameInput: Locator;
  public billingTypeInput: Locator;


  constructor(page: Page) {
    super(page);
    this.coordinatorError = page.locator(
      '//span[contains(text(), "Coordinator is required")]'
    );
    this.approvingManagerNameError = page.locator(
      '//span[contains(text(), "Approving manager name can not be empty.")]'
    );
    this.approvingManagerEmailError = page.locator(
      '//span[contains(text(), "Approving manager name can not be empty.")]'
    );
    this.businessUseError = page.locator(
      '//span[contains(text(), "Intended business use can not be empty.")]'
    );
    this.inviteCategoryError = page.locator(
      '//span[contains(text(), "Intended invitee category is required.")]'
    );
    this.billingTypeError = page.locator(
      '//span[contains(text(), "Billing type is required.")]'
    );
    this.ethicsComplianceError = page.locator(
      '//span[contains(text(), "You must agree to the Ethics and Compliance.")]'
    );
  }

  async addInvalidBasicOrderDetails(): Promise<Locator> {
    await this.enterValuesInElement(
      this.approvingManagerEmailInput,
      await this.generateNomenclatureName("Coordinator")
    );
    await this.waitForPageToBeReady();
    await this.selectCoordinatorFromDropdown("");
    await this.clickOnRandomOptionFromDropdown(this.orderPurposeDropdown);
    const selectedOrderPurpose = await this.getElementText(
      this.billingTypeInput
    );
    ) {
      return this.invalidAccountPayableContactEmail;
    } else {
      throw new Error("Unexpected Order Purpose selected");
    }
  }

  async getorderName(orderName: string) {
    return this.page.locator(
      `(//span[@title='${orderName}'] | //span[contains(text(), '${orderName}')])`
    );
  }
}
