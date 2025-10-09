import { test, expect, request } from '@playwright/test';


test.describe('Login Automation', ()=>{
    const baseURL = 'https://automationexercise.com';
    const user = 'chitaimpetuoso@gmail.com';
    const password = 'test';
    
    test.beforeEach('Navigate to baseURL', async ({ page })=>{
        // Go to the starting url before each test.
        await page.goto(baseURL);
        await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
    })


    test.only('Login User with correct email and password', {
        tag: '@smoke',
    }, async ({ page }) => {
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        
        await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(user);
        //This is another option for previous step...
        //await page.locator('[data-qa="login-email"]').fill(user);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Login' }).click();                                
        await expect(page.getByText('Logged in as Agustin Rojas')).toBeVisible();
        await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();

    //Validate user via public API
        // const apiContext = await request.newContext();
        // const response = await apiContext.post(`${baseURL}/api/verifyLogin`, {
        // form: { email: user,
        //         password: password
        // }
        // });

        // await expect(response.ok()).toBeTruthy();

        // const json = await response.json();
        // console.log('📦 Datos devueltos por API:', json);
        // //Verify message match
        // expect(json.message).toBe('User exists!');
    })

    test('Login User with incorrect email and password', async ({ page }) => {
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        await page.locator('[data-qa="login-email"]').fill('incorrectemail@gmail.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('incorrectpassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
    })

    test('Logout User', async ({ page }) => {
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        await page.locator('[data-qa="login-email"]').fill(user);
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Logged in as Agustin Rojas')).toBeVisible();
        await page.getByRole('link', { name: ' Logout' }).click();
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
    })

})