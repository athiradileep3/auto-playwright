import { Page, Locator } from '@playwright/test';


export class SDCartPage {
    page: Page;
    cartList: Locator;
    cartItems: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartList = page.locator('.cart_list');
        this.cartItems = this.cartList.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        
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