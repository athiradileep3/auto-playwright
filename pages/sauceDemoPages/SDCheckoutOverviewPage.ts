import {Page,Locator} from '@playwright/test';
import { SDBasePage } from './SDBasePage';

export class SDCheckoutOverviewPage extends SDBasePage{
    readonly cartList:Locator;
    readonly cartItems:Locator;
    readonly finishButton:Locator;

    constructor(page:Page){
        super(page);
        this.cartList = this.page.locator('.cart_list');
        this.cartItems = this.cartList.locator('.cart_item');
        this.finishButton = this.page.getByRole('button',{name:'Finish'});
    }

    async verifyProductsPersist(){
        const items = await this.cartItems.locator('.inventory_item_name').allTextContents();
        return items;
    }

    async clickFinish(){
        await this.finishButton.click();
    }
}