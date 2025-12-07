import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {

    private readonly productsLink: Locator;
    private readonly viewProductLink: Locator;
    private readonly productDetailSection: Locator;

    constructor(page: Page){
        super(page);
        this.productsLink = page.getByRole('link', { name: ' Products' })
        this.viewProductLink = page.locator('.nav.nav-pills.nav-justified > li > a').first();
//      locator('.nav.nav-pills.nav-justified > li > a').first().click();
        this.productDetailSection = page.locator('.product-details');
    }

    async clickProductsLink(){
        await this.productsLink.click();
    }

    async clickViewProduct(){
        await this.viewProductLink.click();
    }

    async verifyText(text: string){
        await this.expectVisible(this.page.getByText(text));
      //  await expect(page.locator('body')).toContainText('All Products');
    
    }

    async verifyProductDetailSection(){
        await this.expectVisible(this.productDetailSection);
    }
}