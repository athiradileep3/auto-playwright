import {Page,Locator} from '@playwright/test';

export class SDConfirmationPage{
    page:Page;
    success:Locator;
    constructor(page:Page){
        this.page = page;
        this.success = page.getByText('Thank you for your order!');
    }
}