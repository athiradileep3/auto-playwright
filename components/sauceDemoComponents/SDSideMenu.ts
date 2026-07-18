import {Page,Locator} from '@playwright/test';

export class SDSideMenu{
    protected readonly page: Page;
    readonly allItemsLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page:Page){
        this.page = page;
        this.allItemsLink = this.page.getByRole('link',{name:'All Items'});
        this.aboutLink = this.page.getByRole('link',{name:'About'});
        this.logoutLink = this.page.getByRole('link',{name:'Logout'});
        this.resetAppStateLink = this.page.getByRole('link',{name:'Reset App State'});
    }

    async logoutFromApplication(){
        await this.logoutLink.click();
    }
}