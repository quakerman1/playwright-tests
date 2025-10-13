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


    test('Register User', async({ page }) =>{
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Name' }).fill('New User Name');
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('newuseremail@test.com');
        await page.getByRole('button', { name: 'Signup' }).click();
        await page.getByRole('radio', { name: 'Mr.' }).check();
        await page.getByRole('textbox', { name: 'Password *' }).fill('test');
        await page.locator('#days').selectOption('28');
        await page.locator('#months').selectOption('6');
        await page.locator('#years').selectOption('1982');
        await page.getByRole('textbox', { name: 'First name *' }).fill('Agus');
        await page.getByRole('textbox', { name: 'Last name *' }).fill('Rojas');
        await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Avenida Simpreviva 742');
        await page.getByLabel('Country *').selectOption('United States');
        await page.getByRole('textbox', { name: 'State *' }).fill('Nevada');
        await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('Henderson');
        await page.locator('#zipcode').fill('1234');
        await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('01987654321');
        await page.getByRole('button', { name: 'Create Account' }).click();
        await expect(page.getByText('Account Created!')).toBeVisible();
        await expect(page.getByText('Congratulations! Your new')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByText('Logged in as New User Name')).toBeVisible();
        await page.getByRole('link', { name: ' Delete Account' }).click();
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await expect(page.getByText('Your account has been')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByRole('link', { name: ' Signup / Login' })).toBeVisible(); 
    })


    test('Login User with correct email and password', {
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

    test('Register User with existing email', async({page }) => {
        await page.getByRole('link', { name: ' Signup / Login' }).click();
        await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
        await page.getByRole('textbox', { name: 'Name' }).fill('Agustin Rojas');
        await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(user);
        await page.getByRole('button', { name: 'Signup' }).click();
        await expect(page.getByText('Email Address already exist!')).toBeVisible();
    })

})