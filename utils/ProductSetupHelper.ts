import { SDProductsPage } from "../pages/sauceDemoPages/SDProductsPage";

export class ProductSetupHelper{
    
    static async addProducts(productsPage:SDProductsPage,products:string[]){
        await productsPage.open();
        for(const product of products){
            await productsPage.addProductsToCart(product);
        }

    }
}