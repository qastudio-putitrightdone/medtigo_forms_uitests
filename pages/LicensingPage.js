// @ts-check

class LicensingPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    this.fullNameInput = page.locator('#fullname').first();
    this.requestConsultationButton = page.locator('#requestConsultation').first();
    this.fullNameInputInvalid = page.locator('#fullname:invalid').first();
    this.phoneNumber = page.locator('#phonenumber').first();
    this.emailAddress = page.locator('#exampleInputEmail1').first();
    this.profession = page.locator('#profession').first();
    this.successMessage = page.locator('.hover_bkgr_fricc p');
    this.consentCheckbox = page.locator('#contactLead').first();
    this.okConfirmationButton = page.locator("[onclick='refreshPage()']").first();
  }
}

export { LicensingPage };
