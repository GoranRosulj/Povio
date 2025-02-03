import { test, expect } from '../base/pomFixture';
import { faker } from '@faker-js/faker';

test.describe('Edit Account Page Tests', () => {
    let randomName: string;
    let randomEmail: string;
    let randomPassword: string;

    test.beforeEach(async ({ homePage, commonUIComponent, signUpPage, editAccountPage }) => {
        // Generate random user data
        randomName = faker.person.firstName();
        randomEmail = faker.internet.email();
        randomPassword = faker.internet.password({ length: 10 });
        //Navigate to Sign up page
        await homePage.navigate();
        await commonUIComponent.clickOnLink('Sign up');
        const signUpText = await signUpPage.getSignUpText();
        await expect(signUpText, 'Expected the Sign Up text to be visible on the registration page').toBe('Sign up');
        // Register a new user
        await signUpPage.registerNewUser(randomName, randomEmail, randomPassword);
        const successMessage = await commonUIComponent.getFlashNoticeText();
            expect(
                successMessage,
                'Expected flash message to confirm account creation'
            ).toBe('Welcome! You have signed up successfully.');

        // Navigate to Edit Account page
        await commonUIComponent.clickOnLink('Edit account');
        // Verify the Edit Account page is loaded
        const headerText = await editAccountPage.getEditPageHeaderText();
        await expect(headerText, 'Expected Edit Account header to be visible').toContain('Edit User');
    });

    test.afterEach(async ({ page, commonUIComponent, editAccountPage }, testInfo) => {
        // Skip afterEach for "Cancel Account" test
        if (testInfo.title === 'Cancel Account') {
            console.log('Skipping afterEach for:', testInfo.title);
            return;
        }
        // For tear down, cancel the account via the UI
        // Navigate to the Edit Account page:
        await commonUIComponent.clickOnLink('Edit account');
        // Set up a dialog handler to accept the confirmation alert
        page.once('dialog', async dialog => {
        await dialog.accept();
        });
        // Click the "Cancel my account" button
        await editAccountPage.clickOnCancelAccount();
        // Verify successful account deletion
        const successMessage = await commonUIComponent.getFlashNoticeText()
        await expect(successMessage, 'Expected user account to be canceled').toBe(
            'Bye! Your account has been successfully cancelled. We hope to see you again soon.'
        );
        
    });

    test('Edit Profile: Update Name and Email', async ({ editAccountPage, commonUIComponent }) => {
        // Generate new random user data
        const newName = faker.person.firstName();
        const newEmail = faker.internet.email();

        // Change profile information
        await editAccountPage.updateNameAndEmail(newName, newEmail, randomPassword);

        // Verify update succeeded
        const successMessage = await commonUIComponent.getFlashNoticeText();
        await expect(successMessage, 'Expected user account to be updated').toBe(
            'Your account has been updated successfully.'
        );
    });

    test('Change Password', async ({ editAccountPage, commonUIComponent }) => {
        // Generate new password
        const newPassword = faker.internet.password({ length: 10 });

        // Change password
        await editAccountPage.updatePassword(newPassword, randomPassword);

        // Verify update succeeded
        const successMessage = await commonUIComponent.getFlashNoticeText();
        await expect(successMessage, 'Expected user account to be updated').toBe(
            'Your account has been updated successfully.'
        );

        // Update our randomPassword variable for subsequent steps or tear down
        randomPassword = newPassword;
    });

    test('Cancel Account', async ({ page, editAccountPage, commonUIComponent, signInPage }) => {
        // Set up a dialog handler to accept the confirmation alert
        page.once('dialog', async dialog => {
        await dialog.accept();
        });
        // Click the "Cancel my account" button
        await editAccountPage.clickOnCancelAccount();
        // Verify successful account deletion
        const successMessage = await commonUIComponent.getFlashNoticeText()
        await expect(successMessage, 'Expected user account to be canceled').toBe(
            'Bye! Your account has been successfully cancelled. We hope to see you again soon.'
        );

        // Verify account cancellation by attempting to log in
        await commonUIComponent.clickOnLink('Sign in');
        await signInPage.fillUserEmailField(randomEmail);
        await signInPage.fillUserPassField(randomPassword);
        await signInPage.clickSignInButton();
        
        // Expect that login fails
        const errorMessage = await commonUIComponent.getFlashAlertText();
        expect(errorMessage, 'Expected login to fail after account cancellation').toBe('Invalid Email or password.');
    });
});
