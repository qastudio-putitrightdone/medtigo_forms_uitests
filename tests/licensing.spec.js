// @ts-check
import { test } from '../fixtures/base';
import { randomFullName, randomPhoneNumber, randomEmail, randomProfession } from '../utils/testData';

test('Verify error message for blank mandatory fields', async ({ licensingSteps }) => {
  await licensingSteps.clickRequestConsultation();

  await licensingSteps.expectFieldErrorMessageVisible();
});

test('Submit consultation form with random valid data', async ({ licensingSteps, emailSteps }) => {
  test.setTimeout(180_000);

  const email = randomEmail();

  await licensingSteps.enterFullName(randomFullName());
  await licensingSteps.enterPhoneNumber(randomPhoneNumber());
  await licensingSteps.enterEmailAddress(email);
  await licensingSteps.selectProfession(randomProfession());
  await licensingSteps.checkConsentCheckbox();

  await licensingSteps.clickRequestConsultation();

  await licensingSteps.expectSuccessMessageVisible();
  await licensingSteps.clickOkConfirmationButton();

  await emailSteps.expectConsultationConfirmationEmailReceived(email);
});
