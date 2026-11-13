
import { test as base, expect } from '@playwright/test';
import { SDLoginPage } from '../pages/sauceDemoPages/SDLoginPage';
import { env } from '../config/env';

type BrowserStackFixtures = {
    authenticatedPage: void;
};

export const test = base.extend<BrowserStackFixtures>({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new SDLoginPage(page);

        await page.goto(env.baseUrl);
        await loginPage.login(env.username, env.password);
        await page.waitForURL('**/inventory.html');

        await use();
    },
});

export { expect };