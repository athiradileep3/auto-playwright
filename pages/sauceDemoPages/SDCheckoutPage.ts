import {Page,Locator} from '@playwright/test';
import { SDBasePage } from './SDBasePage';

export class SDCheckoutPage extends SDBasePage{
    readonly fName:Locator;
    readonly lName:Locator;
    readonly zipCode:Locator;
    readonly continueButton:Locator;

    constructor(page:Page){
        super(page);
        this.fName = this.page.getByPlaceholder('First Name');
        this.lName = this.page.getByPlaceholder('Last Name');
        this.zipCode = this.page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = this.page.getByRole('button',{name:'Continue'});
    }

    async continueCheckout(fName:string,lName:string,zipCode:string){
        await this.fName.fill(fName);
        await this.lName.fill(lName);
        await this.zipCode.fill(zipCode);
        await this.continueButton.click();
    }
}