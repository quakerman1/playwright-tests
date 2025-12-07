import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {

    private readonly productName: Locator;
    private readonly category: Locator;
    private readonly price: Locator;
    private readonly availability: Locator;
    private readonly condition: Locator;
    private readonly brand: Locator;

    constructor(page: Page){
        super(page);
        this.productName = page.locator('.product-information h2');
        this.category = page.getByText('Category:');
        this.price = page.getByText('Rs.');
        this.availability = page.getByText('Availability:');
        //locator('.product-information p').nth(1)
        this.condition = page.getByText('Condition:');
        //locator("p", { hasText: "Condition:" })
        this.brand = page.getByText('Availability:');
    }

    async verifyProductNameVisible(){
        await this.expectVisible(this.productName);
    }

    async verifyText(text: string){
        await this.expectVisible(this.page.getByText(text));
    }

}