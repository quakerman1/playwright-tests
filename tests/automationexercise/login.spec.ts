import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { log } from 'console';
import { RegisterPage } from '../../pages/RegisterPage';


test.describe('Login suite', ()=>{
    const email = 'chitaimpetuoso@gmail.com';
    const password = 'test';
    const user = 'Agustin Rojas';
    
    test.beforeEach('Navigate to baseURL', async ({ page })=>{
        // Go to the starting url before each test.
        await page.goto('');
        await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
    })


    test('Register User', async({ page }) =>{
        
        const registerPage = new RegisterPage(page);

        await registerPage.clickSignupLoginLink();
        await registerPage.verifyText('New User Signup!');
        await registerPage.setUserName('New User Name');
        await registerPage.setEmail('newuseremail@test.com');
        await registerPage.clickSignup();

        await registerPage.setTitle('Mr.');
        await registerPage.setPassword('test');
        await registerPage.setDay('28');
        await registerPage.setMonth('6');
        await registerPage.setYear('1982');
        await registerPage.setFirstName('Agus');
        await registerPage.setLastName('Rojas');
        await registerPage.setAddress('Avenida Simpreviva 742');
        await registerPage.setCountry('United States');
        await registerPage.setState('Nevada');
        await registerPage.setCity('Henderson');
        await registerPage.setZipCode('1234');
        await registerPage.setMobileNumber('01987654321');
        await registerPage.clickCreateAccount();
        await registerPage.verifyText('Account Created!');
        await registerPage.verifyText('Congratulations! Your new');
        await registerPage.clickContinue();
        await registerPage.verifyText('Logged in as New User Name');

        await registerPage.clickDeleteAccount();     
        await registerPage.verifyText('Account Deleted!');
        await registerPage.verifyText('Your account has been');
        await registerPage.clickContinue();
        await registerPage.verifyLink('Test Cases');

    })


    test('Login User with correct email and password', {
        tag: '@smoke',
    }, async ({ page }) => {
        const loginPage = new LoginPage(page);   
        await loginPage.clickSignupLoginLink();
        await loginPage.verifyText('Login to your account');
        await loginPage.setEmail(email);
        await loginPage.setPassword(password);
        await loginPage.clickLogin();
        await loginPage.verifyText('Logged in as ' + user);
        await loginPage.verifyLink(' Logout');

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
        const loginPage = new LoginPage(page);   
        await loginPage.clickSignupLoginLink();
        await loginPage.verifyText('Login to your account');
        await loginPage.setEmail('incorrectemail@gmail.com');
        await loginPage.setPassword('incorrectpassword');
        await loginPage.clickLogin();
        await loginPage.verifyText('Your email or password is incorrect!');
    })

    test('Logout User', async ({ page }) => {
        const loginPage = new LoginPage(page);   
        await loginPage.clickSignupLoginLink();
        await loginPage.setEmail(email);
        await loginPage.setPassword(password);
        await loginPage.clickLogin();
        await loginPage.verifyLink(' Logout');
        await loginPage.clickLogoutLink();
        await loginPage.verifyText('Login to your account');
    })

    test('Register User with existing email', async({page }) => {

        const registerPage = new RegisterPage(page);

        await registerPage.clickSignupLoginLink();
        await registerPage.verifyText('New User Signup!');
        await registerPage.setUserName(user);
        await registerPage.setEmail(email);
        await registerPage.clickSignup();
        await registerPage.verifyText('Email Address already exist!');
    })

})