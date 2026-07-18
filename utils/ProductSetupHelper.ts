import { SDPageManager } from "../pages/sauceDemoPages/SDPageManager";
import dataset from '../test-data/SDTestData.json';

export class ProductSetupHelper{
    
    static async addProducts(pageManager:SDPageManager){
        await pageManager.basePage.goToPage('/inventory.html');
        for(const product of dataset.products){
            console.log(`Adding ${product}`);
            await pageManager.productsPage.addProductsToCart(product);
            console.log(`Added ${product}`);
        }

    }
}