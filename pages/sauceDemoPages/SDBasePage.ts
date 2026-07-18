import {Page} from '@playwright/test';

export class SDBasePage{
    protected readonly page:Page;
    constructor(page:Page){
        this.page = page;
    }

}