import { test, expect } from '../fixtures/auth.fixture';
import { SDProductsPage } from '../pages/sauceDemoPages/SDProductsPage';
import { SDCartPage } from '../pages/sauceDemoPages/SDCartPage';
import { SDCheckoutPage } from '../pages/sauceDemoPages/SDCheckoutPage';
import { SDCheckoutOverviewPage } from '../pages/sauceDemoPages/SDCheckoutOverviewPage';
import { SDConfirmationPage } from '../pages/sauceDemoPages/SDConfirmationPage';
import { ProductSetupHelper } from '../utils/ProductSetupHelper';
import dataset from '../test-data/SDTestData.json';

test.describe('SauceDemo Purchase', () =>{

    test('@regression Add Products & Validate Cart',async({page, authenticatedPage}) => {
        const productsPage = new SDProductsPage(page);
        const cartPage = new SDCartPage(page);
        await ProductSetupHelper.addProducts(productsPage,dataset.products);
        await productsPage.goToCart();
        await expect(cartPage.cartItems).toHaveCount(dataset.products.length);
        const actualItems = await cartPage.getCartItems();
        expect(actualItems).toEqual(dataset.products);
    });

   /* 
    test('Remove Product',async({page, authenticatedPage}) => {
        const pageManager = new SDPageManager(page);
        await ProductSetupHelper.addProducts(pageManager);
        await pageManager.cartPage.removeProduct(dataset.productToRemove);
        await expect(page.getByText(dataset.productToRemove)).not.toBeVisible();
    
    });
    
*/
    test('@regression Checkout', async({page, authenticatedPage}) => {
        const productsPage = new SDProductsPage(page);
        const cartPage = new SDCartPage(page);
        const checkoutPage = new SDCheckoutPage(page);
        const checkoutOverview = new SDCheckoutOverviewPage(page);
        await ProductSetupHelper.addProducts(productsPage,dataset.products);
        await productsPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.continueCheckout(dataset.fName,dataset.lName,dataset.zipCode);
        //Verify if user on Checkout Overview page
        await expect(page).toHaveURL('/checkout-step-two.html');
        await expect(checkoutOverview.cartItems).toHaveCount(dataset.products.length);
        const items = await checkoutOverview.getProducts();
        expect(items).toEqual(dataset.products);
    });

    test ('@e2e Complete Order', async({page, authenticatedPage}) => {
        const productsPage = new SDProductsPage(page);
        const cartPage = new SDCartPage(page);
        const checkoutPage = new SDCheckoutPage(page);
        const checkoutOverview = new SDCheckoutOverviewPage(page);
        const confirmationPage = new SDConfirmationPage(page);
        await ProductSetupHelper.addProducts(productsPage,dataset.products);
        await productsPage.goToCart();
        await cartPage.clickCheckout();
        await checkoutPage.continueCheckout(dataset.fName,dataset.lName,dataset.zipCode);
        await checkoutOverview.clickFinish();
        await expect(confirmationPage.success).toBeVisible();
        await expect(page).toHaveURL('/checkout-complete.html');
    });

    test('@smoke Logout', async({page, authenticatedPage}) => {
        const productsPage = new SDProductsPage(page);
        await productsPage.open();
        await productsPage.logout();
        await expect(page).toHaveURL('/');
    })

});

