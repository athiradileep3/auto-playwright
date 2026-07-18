import {test,expect, BrowserContext} from '@playwright/test';
import {SDPageManager} from '../pages/sauceDemoPages/SDPageManager';
import { ProductSetupHelper } from '../utils/ProductSetupHelper';
import dataset from '../test-data/SDTestData.json';

test.use({storageState:'tests/auth/user.json'});


test.describe('SauceDemo Purchase', () =>{

    test('@regression Add Products & Validate Cart',async({page}) => {
        const pageManager = new SDPageManager(page);
        await ProductSetupHelper.addProducts(pageManager);
        await pageManager.productsPage.goToCart();
        const actualItems = await pageManager.cartPage.verifyCartItems();
        expect(actualItems).toEqual(dataset.products);
    });

   /* 
    test('Remove Product',async({page}) => {
        const pageManager = new SDPageManager(page);
        await ProductSetupHelper.addProducts(pageManager);
        await pageManager.cartPage.removeProduct(dataset.productToRemove);
        await expect(page.getByText(dataset.productToRemove)).not.toBeVisible();
    
    });
    
*/
    test('@regression Checkout', async({page}) => {
        const pageManager = new SDPageManager(page);
        await ProductSetupHelper.addProducts(pageManager);
        await pageManager.productsPage.goToCart();
        await pageManager.cartPage.clickCheckout();
        await pageManager.checkoutpage.continueCheckout(dataset.fName,dataset.lName,dataset.zipCode);
        //Verify if user on Checkout Overview page
        await expect(page).toHaveURL('/checkout-step-two.html');
        const items = await pageManager.checkoutOverview.verifyProductsPersist();
        expect(items).toEqual(dataset.products);
    });

    test ('@e2e Complete Order', async({page}) => {
        const pageManager = new SDPageManager(page);
        await ProductSetupHelper.addProducts(pageManager);
        await pageManager.productsPage.goToCart();
        await pageManager.cartPage.clickCheckout();
        await pageManager.checkoutpage.continueCheckout(dataset.fName,dataset.lName,dataset.zipCode);
        await pageManager.checkoutOverview.clickFinish();
        await expect(pageManager.confirmation.success).toBeVisible();
        await expect(page).toHaveURL('/checkout-complete.html');
    });

    test('@smoke Logout', async({page}) => {
        const pageManager = new SDPageManager(page);
        await pageManager.basePage.goToPage('/inventory.html');
        await pageManager.productsPage.logout();
        await expect(page).toHaveURL('/');
    })

});

