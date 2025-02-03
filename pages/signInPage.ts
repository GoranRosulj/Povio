import { Page, Locator} from '@playwright/test';

//Contains locators and helper methods for the Home page and pop up menus within the application.

class SignInPage {
    
    singInHeader: Locator;
    userEmail: Locator;
    userPassword: Locator;
    signInButon: Locator;
    rememberMe: Locator;
    errorExplanation: Locator;
    constructor(private page: Page) {
        this.page = page;
        this.singInHeader = page.locator('h3:has-text("Sign in")')
        this.userEmail = page.locator('#user_email');
        this.userPassword = page.locator('#user_password');
        this.signInButon = page.locator('.button');
        this.rememberMe = page.locator('#user_remember_me');
        this.errorExplanation = page.locator('#error_explanation');
    }

    // A method to fill the user email field
    async fillUserEmailField(user_email: string) {
        await this.userEmail.fill(user_email);
    }

    // A method to fill the user password field
    async fillUserPassField(user_pass: string) {
        await this.userPassword.fill(user_pass);
    }

    // A method to toggle the remember me checkbox
    async toggleRememberMe() {
        await this.rememberMe.click();
    }

    // A method to click on the sign in button
    async clickSignInButton() {
        await this.signInButon.click();
    }

    // A method to get the error message
    async getErrorMessage(): Promise<string | null> {
        return await this.errorExplanation.textContent();
    }
}   

export default SignInPage;