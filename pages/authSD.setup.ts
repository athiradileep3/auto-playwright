import {test as setup} from '@playwright/test';
//import {SDPageManager} from '../pages/SDPageManager';
import dataset from '../test-data/SDTestData.json';

setup('authenticate', async ({ page }) => {
    await page.goto(dataset.urlLogin);

    await page.getByPlaceholder('Username').fill(dataset.username);
    await page.getByPlaceholder('Password').fill(dataset.password);
    await page.getByRole('button',{name:'login'}).click();

    await page.context().storageState({
        path: 'state.json'
    });
});