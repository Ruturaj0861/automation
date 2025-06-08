import { Page, Locator, expect } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common method to navigate to a URL
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  // Common method to click an element
  async clickElement(element: Locator) {
    await element.waitFor({ state: "visible" });
    await element.click();
  }

  // Common method to fill out an element
  async enterValuesInElement(element: Locator, valuesToEnter: string) {
    await element.fill(valuesToEnter);
  }

  //Common method to retrieve text from an element
  async getElementText(element: Locator): Promise<string> {
    return element.innerText();
  }

  //Common method to retrieve text from an element
  async getElementTextContent(element: Locator): Promise<null | string> {
    return element.textContent();
  }

  // Common method to wait for an element to be visible
  async waitForElementVisible(element: Locator | string) {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "visible" });
    } else {
      await element.waitFor({ state: "visible" });
    }
  }

  // Common method to wait for an element to be hidden
  async waitForElementHidden(element: Locator) {
    if (typeof element === "string") {
      await this.page.waitForSelector(element, { state: "hidden" });
    } else {
      await element.waitFor({ state: "hidden" });
    }
  }

  // Common method to take a screenshot
  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: fileName });
  }

  async waitForElementToAppearAndDisappear(
    selector: string | Locator
  ): Promise<void> {
    // If the selector is a string, use waitForSelector, otherwise directly use the locator
    if (typeof selector === "string") {
      // Wait for the selector to be visible
      await this.page.waitForSelector(selector, { state: "visible" });
      // Wait for the selector to be hidden
      await this.page.waitForSelector(selector, { state: "hidden" });
    } else {
      // If it's a Locator, use the locator's API directly
      await selector.waitFor({ state: "visible" });
      await selector.waitFor({ state: "hidden" });
    }
  }

  async waitForPageToBeReady(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async isElementVisible(element: Locator): Promise<boolean> {
    await element.waitFor({ state: "visible" });
    return await element.isVisible();
  }

  async isElementDisabled(element: Locator): Promise<boolean> {
    await element.waitFor({ state: "visible" });
    return await element.isDisabled();
  }

  async isElementEnabled(element: Locator): Promise<boolean> {
    await element.waitFor({ state: "visible" });
    return await element.isEnabled();
  }

  async getAllTextContents(element: Locator): Promise<string[]> {
    return (await element.allTextContents()).map((text) => text.trim());
  }

  // Function to generate a random 5-digit number
  async generateFiveRandomDigits(): Promise<string> {
    return Math.floor(10000 + Math.random() * 90000).toString(); // ensures 5 digits
  }

  // Function to generate a random 8-digit number
  async generateEightRandomDigits(): Promise<string> {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // ensures 8 digits
  }

  // Function to generate a random 4-digit number
  async generateFourRandomDigits(): Promise<string> {
    return Math.floor(1000 + Math.random() * 9000).toString(); // ensures 4 digits
  }
  // Function to generate a random 2-digit number
  async generateTwoRandomDigits(): Promise<string> {
    return Math.floor(10 + Math.random() * 90).toString(); // ensures 2 digits
  }

  // Generates a random integer between the specified minimum and maximum values.
  async generateRandomNumberInRange(
    minValue: number,
    maxValue: number
  ): Promise<number> {
    // Generate a random number within the specified range
    return Number(
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    );
  }

  // Function to generate a random 5-character alphanumeric string
  async generateRandomString(): Promise<string> {
    return Math.random().toString(36).substring(2, 7); // generates 5 random characters
  }

  async generateNomenclatureName(modulename: string): Promise<string> {
    const randomDigits = await this.generateFiveRandomDigits();
    return "Automated_" + modulename + "_" + randomDigits;
  }

  async generateNomenclatureEditedName(modulename: string): Promise<string> {
    const randomDigits = await this.generateFiveRandomDigits();
    return "Automated_" + modulename + "_" + randomDigits + "_Edited";
  }

  async clickOnRandomOptionFromDropdown(
    dropdownElement: Locator
  ): Promise<string> {
    const options = await dropdownElement.locator("option").all();

    // Generate a random index to select an option
    const randomIndex = Math.floor(Math.random() * options.length);

    // Get the value of the random option
    const randomOptionValue = await options[randomIndex].getAttribute("value");
    if (!randomOptionValue) {
      throw new Error("Selected option does not have a valid value attribute.");
    }
    // Select the random option by its value
    await dropdownElement.selectOption(randomOptionValue);

    return randomOptionValue;
  }

  // Select specific option from dropdown
  async selectOptionFromDropdown(
    dropdownElement: Locator,
    optionValue: string
  ) {
    // Select the random option by its value
    await dropdownElement.selectOption(optionValue);
  }

  async selectRandomItemFromMultiSelectList(
    listElement: Locator
  ): Promise<null | string> {
    // Wait for the list to be visible
    await listElement.first().waitFor({ state: "visible" });
    // Get all the list items
    const items = await listElement.all();
    // Generate a random index to select an item
    const randomIndex = Math.floor(Math.random() * items.length);

    // Get text of selected item
    const selectedItem = items[randomIndex].textContent();

    // Click on item by randomly generated index
    await items[randomIndex].click();

    await this.page.waitForTimeout(3000);

    return selectedItem;
  }

  async generateNomenclatureEmail(role: string) {
    const randomDigits = await this.generateFiveRandomDigits();
    return (
      // "Automated_" + role + "_" + randomDigits + "@team507472.testinator.com"
      "automated_" + role + "_" + randomDigits + "@gmail.com"
    );
  }

  async generateNomenclatureDescription(modulename: string): Promise<string> {
    const randomString = await this.generateRandomString();
    return "Automated_" + modulename + "_Description_" + randomString;
  }

  //Function to select random option from radio group
  async selectRandomRadioOption(radiogroup: Locator) {
    const options = await radiogroup.all();
    const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1; // Ensure index is never 0
    await options[randomIndex].click();
  }

  // Function to generate a random future date in MM-DD-YYYY format
  async getRandomFutureDate(): Promise<string> {
    const currentDate = new Date();

    // Generate a random number of days in the future (up to 365 days)
    const daysInFuture = Math.floor(Math.random() * 365) + 1; // Between 1 and 365 days

    // Add the random number of days to the current date
    currentDate.setDate(currentDate.getDate() + daysInFuture);

    // Format the date as MM-DD-YYYY
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0"); // Day of the month
    const year = currentDate.getFullYear(); // Full year

    // Return the date in MM-DD-YYYY format
    return `${month}-${day}-${year}`;
  }

  // Generate a random time (in hh:mm AM/PM format)
  async generateRandomTime(): Promise<string> {
    const randomHour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
    const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
    const ampm = Math.random() > 0.5 ? "AM" : "PM"; // Randomly choose AM or PM
    // Format the time as HH:MM AM/PM
    const hour = String(randomHour).padStart(2, "0");
    const minute = String(randomMinute).padStart(2, "0");
    return `${hour}:${minute} ${ampm}`;
  }

  // Click on dropdown > Wait for list to render and select any random option from given multi-select dropdown > Close dropdown
  async pickRandomDropdownOptionAndClose(
    dropdown: Locator,
    optionsList: Locator
  ): Promise<string> {
    // Open the dropdown
    await this.clickElement(dropdown);

    // Select a random item from the dropdown list
    const selectedOption = await this.selectRandomItemFromMultiSelectList(
      optionsList
    );

    // Close the dropdown
    await this.clickElement(dropdown);

    return selectedOption ?? "";
  }

  // Initiates a file download and saves the file to a specified location.
  async downloadFileAndReturnFilePath(element: Locator): Promise<string> {
    // Start waiting for the download before clicking
    const downloadPromise = this.page.waitForEvent("download");

    // Trigger the download by clicking on the element
    await this.clickElement(element);

    // Wait for the download to complete
    const download = await downloadPromise;

    // Save the downloaded file and return the saved filename
    const savedFilePath = "./tests/download/" + download.suggestedFilename();
    await download.saveAs(savedFilePath);

    return savedFilePath;
  }

  /**
   * Opens a new browser tab and brings it to the front.
   * Waits for the new page event before returning the page object.
   */
  async openNewTab(): Promise<Page> {
    const newPage = await this.page.context().waitForEvent("page");
    await newPage.bringToFront(); // Focus on new tab
    return newPage;
  }
}
