import {Page,Locator} from '@playwright/test';

export class SDProductsPage{
    page:Page;
    productItems:Locator;
    cartButton:Locator;
    menu:Locator;
    logoutButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.productItems = page.locator('.inventory_item');
        this.cartButton = page.locator('#shopping_cart_container');
        this.menu = page.getByRole('button',{name:'Open Menu'});
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async addProductsToCart(productName:string){
        await this.productItems.filter({hasText:productName}).
        getByRole('button',{name:'Add to cart'}).click();
    }

    async goTocart(){
        await this.cartButton.click();
    }

    async logout(){
        await this.menu.click();
        await this.logoutButton.click();
    }
}