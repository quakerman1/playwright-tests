import { test, expect, request, defineConfig } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { log } from 'console';
import { RegisterPage } from '../../pages/RegisterPage';
import users from '../../data/users.json';


test.describe('Login suite', ()=>{
    
    test.beforeEach('Navigate to baseURL', async ({ page })=>{
        // Go to the starting url before each test.
        await page.goto('');
        await expect(page.getByRole('link', { name: 'Website for automation' })).toBeVisible();
    })


    test('Register User', async({ page }) =>{
        
        const registerPage = new RegisterPage(page);

        await registerPage.clickSignupLoginLink();
        await registerPage.verifyText('New User Signup!');
        await registerPage.setUserName(users.newUser.user);
        await registerPage.setEmail(users.newUser.email);
        await registerPage.clickSignup();

        await registerPage.setTitle(users.newUser.title);
        await registerPage.setPassword(users.newUser.password);
        await registerPage.setDay(users.newUser.day);
        await registerPage.setMonth(users.newUser.month);
        await registerPage.setYear(users.newUser.year);
        await registerPage.setFirstName(users.newUser.firstName);
        await registerPage.setLastName(users.newUser.lastName);
        await registerPage.setAddress(users.newUser.address);
        await registerPage.setCountry(users.newUser.country);
        await registerPage.setState(users.newUser.state);
        await registerPage.setCity(users.newUser.city);
        await registerPage.setZipCode(users.newUser.zipCode);
        await registerPage.setMobileNumber(users.newUser.mobileNumber);
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
        await loginPage.setEmail(users.validUser.email);
        await loginPage.setPassword(users.validUser.password);
        await loginPage.clickLogin();
        await loginPage.verifyText('Logged in as ' + users.validUser.user);
        await loginPage.verifyLink(' Logout');

    })

    test('Login User with incorrect email and password', async ({ page }) => {
        const loginPage = new LoginPage(page);   
        await loginPage.clickSignupLoginLink();
        await loginPage.verifyText('Login to your account');
        await loginPage.setEmail(users.invalidUser.email);
        await loginPage.setPassword(users.invalidUser.password);
        await loginPage.clickLogin();
        await loginPage.verifyText('Your email or password is incorrect!');
    })

    test('Logout User', async ({ page }) => {
        const loginPage = new LoginPage(page);   
        await loginPage.clickSignupLoginLink();
        await loginPage.setEmail(users.validUser.email);
        await loginPage.setPassword(users.validUser.password);
        await loginPage.clickLogin();
        await loginPage.verifyLink(' Logout');
        await loginPage.clickLogoutLink();
        await loginPage.verifyText('Login to your account');
    })

    test('Register User with existing email', async({page }) => {

        const registerPage = new RegisterPage(page);

        await registerPage.clickSignupLoginLink();
        await registerPage.verifyText('New User Signup!');
        await registerPage.setUserName(users.validUser.user);
        await registerPage.setEmail(users.validUser.email);
        await registerPage.clickSignup();
        await registerPage.verifyText('Email Address already exist!');
    })

})