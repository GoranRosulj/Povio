import { Page, Locator } from '@playwright/test';

class EditAccountPage {
    
    // Locators for elements on the Edit Account page.
    editPageHeader: Locator;
    userName: Locator;
    userEmail: Locator;
    userPassword: Locator;
    userPasswordConfirm: Locator;
    userCurrentPassword: Locator;
    updateButton: Locator;
    errorExplanation: Locator;
    cancelAccountButton: Locator;
    
    constructor(private page: Page) {
        // Locator for the header (assuming "Edit User" is displayed).
        this.editPageHeader = page.locator('h3:has-text("Edit User")');
        // User information fields.
        this.userName = page.locator('#user_name');
        this.userEmail = page.locator('#user_email');
        this.userPassword = page.locator('#user_password');
        this.userPasswordConfirm = page.locator('#user_password_confirmation');
        this.userCurrentPassword = page.locator('#user_current_password');
        // Locator for the update button – from the form input with value "Update".
        this.updateButton = page.locator('input.button.right[value="Update"]');
        // Locator for the error explanation.
        this.errorExplanation = page.locator('#error_explanation');
        // Locator for the cancel account button, found in the cancellation form.
        this.cancelAccountButton = page.locator('form.button_to input[value="Cancel my account"]');
    }

    async getEditPageHeaderText(): Promise<string | null> {
        return await this.editPageHeader.textContent();
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

    async fillUserCurrentPassword(user_current_pass: string) {
        await this.userCurrentPassword.fill(user_current_pass);
    }

    async clickOnUpdate() {
        await this.updateButton.click();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.errorExplanation.textContent();
    }

    async clickOnCancelAccount() {
        await this.cancelAccountButton.click();
    }
    
    // A method to change users name
    async updateName(newName: string, currentPassword: string) {
        await this.fillUserNameField(newName);
        await this.fillUserCurrentPassword(currentPassword);
        await this.clickOnUpdate();
    }
    
    // A method to change users email
    async updateEmail(newEmail: string, currentPassword: string) {
        await this.fillUserEmailField(newEmail);
        await this.fillUserCurrentPassword(currentPassword);
        await this.clickOnUpdate();
    }
    
    // A method to change users name and email
    async updateNameAndEmail(newName: string, newEmail: string, currentPassword: string) {
        await this.fillUserNameField(newName);
        await this.fillUserEmailField(newEmail);
        await this.fillUserCurrentPassword(currentPassword);
        await this.clickOnUpdate();
    }
    
    // A method to change the password
    async updatePassword(newPassword: string, currentPassword: string) {
        await this.fillUserPassField(newPassword);
        await this.fillUserPassConfirmField(newPassword);
        await this.fillUserCurrentPassword(currentPassword);
        await this.clickOnUpdate();
    }
}

export default EditAccountPage;
