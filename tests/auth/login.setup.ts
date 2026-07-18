import {test as setup} from '@playwright/test';
import {env} from '../../config/env';


setup('authenticate', async ({ page }) => {
    await page.goto(env.baseUrl);

    await page.getByPlaceholder('Username').fill(env.username);
    await page.getByPlaceholder('Password').fill(env.password);
    await page.getByRole('button',{name:'login'}).click();
    await page.waitForURL('/inventory.html');

    await page.context().storageState({
        path: 'tests/auth/user.json'
    });
});