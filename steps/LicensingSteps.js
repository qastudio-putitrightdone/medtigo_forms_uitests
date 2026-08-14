// @ts-check
import { expect } from '@playwright/test';
import { step } from 'allure-js-commons';
import { LicensingPage } from '../pages/LicensingPage';
import { CONSULTATION_SUCCESS_MESSAGE } from '../utils/constants';

class LicensingSteps {
  /** @param {import('@playwright/test').Page} page */

  constructor(page) {
    this.page = page;
    this.licensingPage = new LicensingPage(page);
  }

  /** @param {string} fullName */
  async enterFullName(fullName) {
    return step(`Enter full name "${fullName}"`, async () => {
      await this.licensingPage.fullNameInput.fill(fullName);
    });
  }

  async clickRequestConsultation() {
    return step('Click "Request Consultation" button', async () => {
      await this.licensingPage.requestConsultationButton.click();
    });
  }

  async getFullNameValidationMessage() {
    return step('Get full name field validation message', async () => {
      return this.licensingPage.fullNameInput.evaluate(
        /** @param {HTMLInputElement} el */ (el) => el.validationMessage
      );
    });
  }

  async expectFieldErrorMessageVisible() {
    return step('Expect full name field to show a validation error', async () => {
      await expect(this.licensingPage.fullNameInputInvalid).toBeVisible();
    });
  }

  /** @param {string} phoneNumber */
  async enterPhoneNumber(phoneNumber) {
    return step(`Enter phone number "${phoneNumber}"`, async () => {
      await this.licensingPage.phoneNumber.fill(phoneNumber);
    });
  }

  /** @param {string} emailAddress */
  async enterEmailAddress(emailAddress) {
    return step(`Enter email address "${emailAddress}"`, async () => {
      await this.licensingPage.emailAddress.fill(emailAddress);
    });
  }

  /** @param {string} profession */
  async selectProfession(profession) {
    return step(`Select profession "${profession}"`, async () => {
      await this.licensingPage.profession.selectOption(profession);
    });
  }

  async expectSuccessMessageVisible() {
    return step('Wait for consultation submission success message', async () => {
      await expect(this.licensingPage.successMessage).toHaveText(CONSULTATION_SUCCESS_MESSAGE, {
        timeout: 15000,
      });
    });
  }

  async checkConsentCheckbox() {
    return step('Check the consent checkbox', async () => {
      await this.licensingPage.consentCheckbox.check();
    });
  }

  async clickOkConfirmationButton() {
    return step('Click the OK button on the confirmation dialog', async () => {
      await this.licensingPage.okConfirmationButton.click();
    });
  }
}

export { LicensingSteps };
