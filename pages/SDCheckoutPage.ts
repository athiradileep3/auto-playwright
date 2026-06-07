import {Page,Locator} from '@playwright/test';

export class SDCheckoutPage{
    page:Page;
    fName:Locator;
    lName:Locator;
    zipCode:Locator;
    continueButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.fName = page.getByPlaceholder('First Name');
        this.lName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button',{name:'Continue'});
    }

    async continueCheckout(fName:string,lName:string,zipCode:string){
        await this.fName.fill(fName);
        await this.lName.fill(lName);
        await this.zipCode.fill(zipCode);
        await this.continueButton.click();
    }
}