import {Page, Locator} from  '@playwright/test';
import { BasePage } from './basePage';

export class RegisterPage extends BasePage {

    private readonly signupLoginLink: Locator;
    private readonly userNameTextBox: Locator;
    private readonly emailTextBox: Locator;
    private readonly signUpButton: Locator;

    private readonly passwordTextBox: Locator;
    private readonly daySelector: Locator;
    private readonly monthSelector: Locator;
    private readonly yearSelector: Locator;
    private readonly firstNameTextBox: Locator;
    private readonly lastNameTextBox: Locator;
    private readonly addressTextBox: Locator;
    private readonly countrySelector: Locator;
    private readonly stateTextBox: Locator;
    private readonly cityTextBox: Locator;
    private readonly zipCodeTextBox: Locator;
    private readonly mobileNumberTextBox: Locator;
    private readonly createAccountButton: Locator;
    private readonly continueButton: Locator;
    private readonly deleteAccountButton: Locator;
    
    

    constructor (page: Page) {
        super(page);

        this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' });
        this.userNameTextBox = page.getByRole('textbox', { name: 'Name' });
        this.emailTextBox = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });

        this.passwordTextBox = page.getByRole('textbox', { name: 'Password *' });
        this.daySelector = page.locator('#days');
        this.monthSelector = page.locator('#months');
        this.yearSelector = page.locator('#years');
        this.firstNameTextBox = page.getByRole('textbox', { name: 'First name *' });
        this.lastNameTextBox = page.getByRole('textbox', { name: 'Last name *' });
        this.addressTextBox = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.countrySelector = page.getByLabel('Country *');
        this.stateTextBox = page.getByRole('textbox', { name: 'State *' });
        this.cityTextBox = page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.zipCodeTextBox = page.locator('#zipcode');
        this.mobileNumberTextBox = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    
        this.continueButton = page.getByRole('link', { name: 'Continue' });
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' });
    }

    async clickSignupLoginLink(){
        await this.signupLoginLink.click();
    }

    async setUserName(userName: string){
        await this.userNameTextBox.fill(userName);
    }

    async setEmail(email: string){
        await this.emailTextBox.fill(email);
    }

    async clickSignup(){
       await this.signUpButton.click();
    }


    async setTitle(title: string){
        await this.page.getByRole('radio', { name: title }).check();
    }

    async setPassword(password: string){
        await this.passwordTextBox.fill(password);
    }

    async setDay(day: string){
        await this.daySelector.selectOption(day);
    }

    async setMonth(month: string){
        await this.monthSelector.selectOption(month);
    }

    async setYear(year: string){
        await this.yearSelector.selectOption(year);
    }

    async setFirstName(name: string){
        await this.firstNameTextBox.fill(name);
    }
    
    async setLastName(lastName: string){
        await this.lastNameTextBox.fill(lastName);
    }

    async setAddress(address: string){
        await this.addressTextBox.fill(address);
    }

    async setCountry(country: string){
        await this.countrySelector.selectOption(country);
    }

    async setState(state: string){
        await this.stateTextBox.fill(state);
    }

    async setCity(city: string){
        await this.cityTextBox.fill(city);
    }

    async setZipCode(zipCode: string){
        await this.zipCodeTextBox.fill(zipCode);
    }

    async setMobileNumber(mobileNumber: string){
        await this.mobileNumberTextBox.fill(mobileNumber);
    }

    async clickCreateAccount(){
        await this.createAccountButton.click();
    }

    async clickContinue(){
        await this.continueButton.click();
    }

    async clickDeleteAccount(){
        await this.deleteAccountButton.click();
    }

    async verifyText(text: string){
       await this.expectVisible(this.page.getByText(text));
    }

    async verifyLink(linkName: string){
        await this.expectVisible(this.page.getByRole('link', { name: linkName, exact: true }));
    }

}