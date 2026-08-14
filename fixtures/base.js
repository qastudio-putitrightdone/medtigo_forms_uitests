// @ts-check
import { test as base, expect } from '@playwright/test';
import { LicensingSteps } from '../steps/LicensingSteps';
import { EmailSteps } from '../steps/EmailSteps';
import { LICENSING_PAGE_URL } from '../utils/constants';

/**
 * Custom test extended with:
 * - `page` already navigated to LICENSING_PAGE_URL before every test body runs.
 * - ready-to-use `licensingSteps` / `emailSteps` fixtures, so tests don't need
 *   to instantiate them (`new LicensingSteps(page)`, `new EmailSteps()`) themselves.
 *
 * @type {import('@playwright/test').TestType<
 *   import('@playwright/test').PlaywrightTestArgs &
 *   import('@playwright/test').PlaywrightTestOptions &
 *   { licensingSteps: LicensingSteps, emailSteps: EmailSteps },
 *   import('@playwright/test').PlaywrightWorkerArgs &
 *   import('@playwright/test').PlaywrightWorkerOptions
 * >}
 */
const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto(LICENSING_PAGE_URL);
    await use(page);
  },

  licensingSteps: async ({ page }, use) => {
    await use(new LicensingSteps(page));
  },

  emailSteps: async ({}, use) => {
    await use(new EmailSteps());
  },
});

export { test, expect };
