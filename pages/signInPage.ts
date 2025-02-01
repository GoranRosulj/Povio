import { Page, Locator} from '@playwright/test';

//Contains locators and helper methods for the Home page and pop up menus within the application.

class SignUpPage {
    
    singInHeader: Locator;
    userEmail: Locator;
    userPassword: Locator;
    signInButon: Locator;
    rememberMe: Locator;
    
    constructor(private page: Page) {
        this.page = page;
        this.singInHeader = page.locator('main h3')
        this.userEmail = page.locator('#user_email');
        this.userPassword = page.locator('#user_password');
        this.signInButon = page.locator('.button');
        this.rememberMe = page.locator('#user_remember_me');
    }

    async fillUserEmailField(user_email: string) {
        await this.userEmail.fill(user_email);
    }

    async fillUserPassField(user_pass: string) {
        await this.userPassword.fill(user_pass);
    }

    async toggleRememberMe() {
        await this.rememberMe.click();
    }

    async clickSignInButton() {
        await this.signInButon.click();
    }
}   

export default SignUpPage;