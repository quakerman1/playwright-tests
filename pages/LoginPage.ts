import {Page, Locator} from  '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    
    private readonly signupLoginLink: Locator;
    private readonly emailTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly loginButton: Locator;

    constructor (page: Page){
        super(page);
        this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' });
        this.emailTextBox = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        //This is another option for previous step...
        //page.locator('[data-qa="login-email"]');
        this.passwordTextBox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async clickSignupLoginLink(){
        await this.signupLoginLink.click();
    }

    async setEmail(email: string){
        await this.emailTextBox.fill(email);
    }

    async setPassword(password: string){
        await this.passwordTextBox.fill(password);
    }

    async clickLogin(){
       await this.loginButton.click();
    }

    async clickLogoutLink(){
       await this.page.getByRole('link', { name: ' Logout' }).click();
    }

    async verifyText(text: string){
       await this.expectVisible(this.page.getByText(text));
    }

    async verifyLink(linkName: string){
        await this.expectVisible(this.page.getByRole('link', { name: linkName }));
    }

}