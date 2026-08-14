// @ts-check

/**
 * Single source of truth for the URL(s) under test.
 * Imported by playwright.config.js (baseURL) and by page objects (goto).
 */
export const LICENSING_PAGE_URL =
  'https://landing.medtigo.com/licensing/?utm_source=google&utm_medium=ppc&utm_campaign=licensing_searchmax';

/** Confirmation message shown after a successful consultation form submission. */
export const CONSULTATION_SUCCESS_MESSAGE =
  'Thank you for choosing medtigo for your medical licensing services. ' +
  'We’ve received your details, and our team will be in touch shortly to assist you. ' +
  'Stay tuned for more information!';

/** Subject of the confirmation email sent after a successful consultation form submission. */
export const CONSULTATION_CONFIRMATION_EMAIL_SUBJECT =
  'Request Confirmation for medtigo Medical Licensing Service';
