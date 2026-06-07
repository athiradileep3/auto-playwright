import {Page,Locator} from '@playwright/test';

export class SDCartPage{
    page:Page;
    cartList:Locator;
    cartItems:Locator;
    checkoutButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.cartList = page.locator('.cart_list');
        this.cartItems = this.cartList.locator('.cart_item');
        this.checkoutButton = page.getByRole('button',{name:'Checkout'});
    }

    async verifyCartItems(){
        const actualItems = await this.cartItems.locator('.inventory_item_name').allTextContents();
        return actualItems;
    }

    async clickCheckout(){
        await this.checkoutButton.click();
    }
}