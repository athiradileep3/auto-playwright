import {Page} from '@playwright/test';

export class SDBasePage{
    readonly page:Page;
    constructor(page:Page){
        this.page = page;
    }

}