// @ts-check
import { expect } from '@playwright/test';
import { step } from 'allure-js-commons';
import { waitForEmail } from '../utils/mailClient';
import { CONSULTATION_CONFIRMATION_EMAIL_SUBJECT } from '../utils/constants';

/**
 * EmailSteps
 * ----------
 * Verifies emails triggered by the licensing form land in the shared
 * qaarchitect@putitrightdone.com inbox, via IMAP (see utils/mailClient.js).
 */
class EmailSteps {
  /** @param {string} toAddress */
  async expectConsultationConfirmationEmailReceived(toAddress) {
    return step(`Verify confirmation email received at "${toAddress}"`, async () => {
      const email = await waitForEmail({
        subject: CONSULTATION_CONFIRMATION_EMAIL_SUBJECT,
        to: toAddress,
      });

      expect(email.subject).toContain(CONSULTATION_CONFIRMATION_EMAIL_SUBJECT);

      const recipients = /** @type {any} */ (email.to);
      const recipientText = (Array.isArray(recipients) ? recipients : [recipients])
        .filter(Boolean)
        .map((r) => r.text)
        .join(', ');
      expect(recipientText).toContain(toAddress);
    });
  }
}

export { EmailSteps };
