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
        this.errorExplanation = page.locator('#error_explanation');
    }

    async getSignUpText(): Promise<string | null> {
        return await this.singUpHeader.textContent();
    }

    async fillUserNameField(user_name: string) {
        await this.userName.fill(user_name);
    }

    async fillUserEmailField(user_email: string) {
        await this.userEmail.fill(user_email);
    }

    async fillUserPassField(user_pass: string) {
        await this.userPassword.fill(user_pass);
    }

    async fillUserPassConfirmField(user_pass_confirm: string) {
        await this.userPasswordConfirm.fill(user_pass_confirm);
    }

    async clickOnSignUp() {
        await this.signUpButon.click();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorExplanation.textContent();
    }
}   

export default SignUpPage;