import {Page,Locator} from '@playwright/test';

export class SDCheckoutOverviewPage{
    page:Page;
    cartList:Locator;
    cartItems:Locator;
    finishButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.cartList = page.locator('.cart_list');
        this.cartItems = this.cartList.locator('.cart_item');
        this.finishButton = page.getByRole('button',{name:'Finish'});
    }

    async verifyProductsPersist(){
        const items = await this.cartItems.locator('.inventory_item_name').allTextContents();
        return items;
    }

    async clickFinish(){
        await this.finishButton.click();
    }
}