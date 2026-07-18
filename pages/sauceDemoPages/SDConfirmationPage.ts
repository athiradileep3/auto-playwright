import {Page,Locator} from '@playwright/test';
import { SDBasePage } from './SDBasePage';

export class SDConfirmationPage extends SDBasePage{
    readonly success:Locator;
    constructor(page:Page){
        super(page);
        this.success = this.page.getByText('Thank you for your order!');
    }
}