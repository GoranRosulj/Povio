import { test, expect } from '../base/pomFixture';
import { faker } from '@faker-js/faker';

test.describe('User Registration', () => {
    let randomName: string;
    let randomEmail: string;
    let randomPassword: string;

    test.beforeEach(async ({ homePage, commonUIComponent, signUpPage }) => {
        await test.step('Open the homepage and navigate to the Sign Up page', async () => {
            await homePage.navigate();
            // Click on the "Sign Up" link using the common UI component
            await commonUIComponent.clickOnLink('Sign up');
            // Verify that the Sign Up header is visible
            const signUpText = await signUpPage.getSignUpText();
            await expect(signUpText, 'Expected the Sign Up text to be visible on the registration page').toBe('Sign up');

        });

        await test.step('Generate random registration data', async () => {
            randomName = faker.person.firstName();
            randomEmail = faker.internet.email();
            randomPassword = faker.internet.password({ length: 10 });
        });
    });

    test.afterEach(async ({ page, commonUIComponent, editAccountPage }, testInfo) => {
        // For tear down, cancel the account via the UI
        // Navigate to the Edit Account page
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

    test('Successful Registration with Valid Credentials', async ({ signUpPage, commonUIComponent }) => {
        await test.step('Fill out the registration form with valid data', async () => {
            await signUpPage.fillUserNameField(randomName);
            await signUpPage.fillUserEmailField(randomEmail);
            await signUpPage.fillUserPassField(randomPassword);
            await signUpPage.fillUserPassConfirmField(randomPassword);
        });

        await test.step('Submit the registration form and verify success notification', async () => {
            await signUpPage.clickOnSignUp();
            const successMessage = await commonUIComponent.getFlashNoticeText();
            expect(
                successMessage,
                'Expected flash message to confirm account creation'
            ).toBe('Welcome! You have signed up successfully.');
        });
    });
});
