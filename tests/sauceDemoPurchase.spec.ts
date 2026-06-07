import {test,expect} from '@playwright/test';
import {SDPageManager} from '../pages/SDPageManager';
import dataset from '../test-data/SDTestData.json';

let webContext:any;
test.use({storageState:'state.json'});

test.beforeAll(async({browser}) => {
    const context = await browser.newContext();
    const firstPage = await context.newPage();
    const pm = new SDPageManager(firstPage);

    await pm.basePage.goToPage(dataset.urlLogin);
    await pm.loginPage.sauceDemoLogin(dataset.username,dataset.password);
    await firstPage.locator('.inventory_item').first().waitFor();

    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
});

test.describe('SauceDemo Purchase', () =>{
    test('Add products', async() => {
        const page = await webContext.newPage();
        const pageManager = new SDPageManager(page);
        await pageManager.basePage.goToPage(dataset.urlProducts);
        for(const product of dataset.products){
            await pageManager.productsPage.addProductsToCart(product);
        }
    });

    test('Cart Validation',async() => {
        const page = await webContext.newPage();
        const pageManager = new SDPageManager(page);
        await pageManager.basePage.goToPage(dataset.urlProducts);
        await pageManager.productsPage.goTocart();
        const actualItems = await pageManager.cartPage.verifyCartItems();
        expect(actualItems).toEqual(dataset.products);
    });

    /*
    test('Remove Product',async() => {
    
    });
    */

    test('Checkout', async() => {
        const page = await webContext.newPage();
        const pageManager = new SDPageManager(page);
        await pageManager.basePage.goToPage(dataset.urlProducts);
        await pageManager.productsPage.goTocart();
        await pageManager.cartPage.clickCheckout();
        await pageManager.checkoutpage.continueCheckout(dataset.fName,dataset.lName,dataset.zipCode);
        //Verify if user on Checkout Overview page
        await expect(page).toHaveURL(dataset.urlCheckoutOverview);
        const items = await pageManager.checkoutOverview.verifyProductsPersist();
        expect(items).toEqual(dataset.products);
    });

    test ('Complete Order', async() => {
        const page = await webContext.newPage();
        const pageManager = new SDPageManager(page);
        await pageManager.basePage.goToPage(dataset.urlCheckoutOverview);
        await pageManager.checkoutOverview.clickFinish();
        await expect(pageManager.confirmation.success).toBeVisible();
        await expect(page).toHaveURL(dataset.urlCheckoutComplete);
    });

    test('Logout', async() => {
        const page = await webContext.newPage();
        const pageManager = new SDPageManager(page);
        await pageManager.basePage.goToPage(dataset.urlProducts);
        await pageManager.productsPage.logout();
        await expect(page).toHaveURL(dataset.urlLogin);
    })

});

