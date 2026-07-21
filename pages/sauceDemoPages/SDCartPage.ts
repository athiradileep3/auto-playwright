import { Page, Locator } from '@playwright/test';
import { SDBasePage } from './SDBasePage';

export class SDCartPage extends SDBasePage{
    readonly cartList: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartList = this.page.locator('.cart_list');
        this.cartItems = this.cartList.locator('.cart_item');
        this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
        
    }

    async verifyCartItems() {
        const actualItems = await this.cartItems.locator('.inventory_item_name').allTextContents();
        return actualItems;
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async removeProduct(product: string) {
        const items = await this.cartItems.all();
        for (const item of items){
            const itemName = await item.locator('.inventory_item_name').innerText();
            if(itemName === product){
                await item.getByRole('button', { name: 'Remove' }).click();
            }
        }
        
    }
}