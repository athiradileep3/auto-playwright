import {Page} from '@playwright/test';
import {SDBasePage} from './SDBasePage';
import {SDLoginPage} from './SDLoginPage';
import {SDProductsPage} from './SDProductsPage';
import {SDCartPage} from './SDCartPage';
import {SDCheckoutPage} from './SDCheckoutPage';
import {SDCheckoutOverviewPage} from './SDCheckoutOverviewPage';
import {SDConfirmationPage} from './SDConfirmationPage';

export class SDPageManager{
    page:Page;
    basePage:SDBasePage;
    loginPage:SDLoginPage;
    productsPage:SDProductsPage;
    cartPage:SDCartPage;
    checkoutpage:SDCheckoutPage;
    checkoutOverview:SDCheckoutOverviewPage;
    confirmation:SDConfirmationPage;

    constructor(page:Page){
        this.page = page;
        this.basePage = new SDBasePage(page);
        this.loginPage = new SDLoginPage(page);
        this.productsPage = new SDProductsPage(page);
        this.cartPage = new SDCartPage(page);
        this.checkoutpage = new SDCheckoutPage(page);
        this.checkoutOverview = new SDCheckoutOverviewPage(page);
        this.confirmation = new SDConfirmationPage(page);
    }
}