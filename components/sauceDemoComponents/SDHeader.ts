import {Page,Locator} from '@playwright/test';

export class SDHeader{
    protected readonly page: Page;
    readonly cart: Locator;
    readonly hamburgerMenu: Locator;
    constructor(page:Page){
        this.page = page;
        this.cart = this.page.locator('#shopping_cart_container');
        this.hamburgerMenu = this.page.getByRole('button',{name:'Open Menu'});
    }

    async openMenu(){
        await this.hamburgerMenu.click();
    }

    async goToCart(){
        await this.cart.click();
    }
}