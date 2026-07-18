import {Page,Locator} from '@playwright/test';
import { SDBasePage } from './SDBasePage';
import { SDHeader } from '../../components/sauceDemoComponents/SDHeader';
import { SDSideMenu } from '../../components/sauceDemoComponents/SDSideMenu';

export class SDProductsPage extends SDBasePage{
    readonly productItems:Locator;
    readonly header: SDHeader;
    readonly menu: SDSideMenu;

    constructor(page:Page){
        super(page);
        this.header = new SDHeader(page);
        this.menu = new SDSideMenu(page);
        this.productItems = this.page.locator('.inventory_item');
    }

    async open(){
        await this.page.goto('/inventory.html');
    }

    async goToCart(){
        await this.header.goToCart();
    }

    async addProductsToCart(productName:string){
        await this.page.waitForSelector('.inventory_item');
        await this.productItems.filter({hasText:productName}).
        getByRole('button',{name:'Add to cart'}).click();
    }

    async logout(){
        await this.header.openMenu();
        await this.menu.logoutFromApplication();
    }
}