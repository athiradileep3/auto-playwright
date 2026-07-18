import {Page,Locator} from '@playwright/test';
import { SDBasePage } from './SDBasePage';

export class SDLoginPage extends SDBasePage{
    readonly username:Locator;
    readonly password:Locator;
    readonly loginButton:Locator;
    constructor(page:Page){
        super(page);
        this.username = this.page.getByPlaceholder('Username');
        this.password = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button',{name:'login'});
    }

    async login(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    
}