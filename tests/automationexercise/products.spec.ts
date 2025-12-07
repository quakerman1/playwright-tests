import{ test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';


test.describe('Products suite', ()=>{

    test.beforeEach('Navigate to baseURL', async ({ page })=>{
        // Go to the starting url before each test.
        await page.goto('');
        await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
    })

    test('Verify All Products and product detail page', async({ page })=>{

        const productPage = new ProductsPage(page);
        const productDetailsPage = new ProductDetailsPage(page);

        await productPage.clickProductsLink();
        await productPage.verifyText("ALL PRODUCTS")
        await productPage.clickViewProduct();

        await productPage.verifyProductDetailSection();
      //  await expect(productPage.getByText('All Products  Added! Your')).toBeVisible();
        await productDetailsPage.verifyProductNameVisible();
        await productDetailsPage.verifyText('Category:');
        await productDetailsPage.verifyText('Rs.');
        await productDetailsPage.verifyText('Availability:');
        await productDetailsPage.verifyText('Condition:');
        await productDetailsPage.verifyText('Brand:');
        

    });

});