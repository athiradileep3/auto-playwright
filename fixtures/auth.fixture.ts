
import { test as base, expect } from '@playwright/test';
import { SDLoginPage } from '../pages/sauceDemoPages/SDLoginPage';
import { env } from '../config/env';

type AuthFixtures = {
    authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
    storageState: async ({}, use) => {
        if (process.env.TEST_ENV === 'browserstack') {
            await use(undefined);
        } else {
            await use('.auth/user.json');
        }
    },

    authenticatedPage: async ({ page }, use) => {
        if (process.env.TEST_ENV === 'browserstack') {
            const loginPage = new SDLoginPage(page);

            await page.goto(env.baseUrl);
            await loginPage.login(env.username, env.password);
            await page.waitForURL('**/inventory.html');
        }

        await use();
    },
});

export { expect };