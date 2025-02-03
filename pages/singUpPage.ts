import { Page, Locator} from '@playwright/test';

//Contains locators and helper methods for the Home page and pop up menus within the application.

class SignUpPage {
    
    singUpHeader: Locator;
    userName: Locator;
    userEmail: Locator;
    userPassword: Locator;
    userPasswordConfirm: Locator;
    signUpButon: Locator;
    errorExplanation: Locator;
    
    constructor(private page: Page) {
        this.page = page;
        this.singUpHeader = page.locator('h3:has-text("Sign up")')
        this.userName = page.locator('#user_name');
        this.userEmail = page.locator('#user_email');
        this.userPassword = page.locator('#user_password');
        this.userPasswordConfirm = page.locator('#user_password_confirmation');
        this.signUpButon = page.locator('.button');
        this.errorExplanation = page.locator('#error_explanation > ul > li');
    }

    // A method to get the sign up text
    async getSignUpText(): Promise<string | null> {
        return await this.singUpHeader.textContent();
    }

    // A method to fill the user name field
    async fillUserNameField(user_name: string) {
        await this.userName.fill(user_name);
    }

    // A method to fill the user email field
    async fillUserEmailField(user_email: string) {
        await this.userEmail.fill(user_email);
    }

    // A method to fill the user password field
    async fillUserPassField(user_pass: string) {
        await this.userPassword.fill(user_pass);
    }

    // A method to fill the user password confirmation field
    async fillUserPassConfirmField(user_pass_confirm: string) {
        await this.userPasswordConfirm.fill(user_pass_confirm);
    }

    // A method to click on the sign up button
    async clickOnSignUp() {
        await this.signUpButon.click();
    }

    // A method to get the error message
    async getErrorMessage(): Promise<string | null> {
        return await this.errorExplanation.textContent();
    }

    // A method to register new user
    async registerNewUser(userName: string, userEmail: string, userPassword: string) {
        await this.fillUserNameField(userName);
        await this.fillUserEmailField(userEmail);
        await this.fillUserPassField(userPassword);
        await this.fillUserPassConfirmField(userPassword);
        await this.clickOnSignUp();
    }
}

export default SignUpPage;