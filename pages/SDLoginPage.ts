import {Page,Locator} from '@playwright/test';

export class SDLoginPage{
    page:Page;
    username:Locator;
    password:Locator;
    loginButton:Locator;
    constructor(page:Page){
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button',{name:'login'});
    }

    async sauceDemoLogin(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    
}