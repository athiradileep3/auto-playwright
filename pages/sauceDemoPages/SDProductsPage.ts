import {Page,Locator} from '@playwright/test';
import { SDBasePage } from './SDBasePage';

export class SDProductsPage extends SDBasePage{
    readonly productItems:Locator;
    readonly cartButton:Locator;
    readonly menu:Locator;
    readonly logoutButton:Locator;

    constructor(page:Page){
        super(page);
        this.productItems = this.page.locator('.inventory_item');
        this.cartButton = this.page.locator('#shopping_cart_container');
        this.menu = this.page.getByRole('button',{name:'Open Menu'});
        this.logoutButton = this.page.locator('#logout_sidebar_link');
    }

    async open(){
        await this.page.goto('/inventory.html');
    }

    async addProductsToCart(productName:string){
        await this.page.waitForSelector('.inventory_item');
        await this.productItems.filter({hasText:productName}).
        getByRole('button',{name:'Add to cart'}).click();
    }

    async goToCart(){
        await this.cartButton.click();
    }

    async logout(){
        await this.menu.click();
        await this.logoutButton.click();
    }
}