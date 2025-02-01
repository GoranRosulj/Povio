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
            await expect(signUpText, 'Expected the Sign Up text to be visible on the registration page').toBe('Welcome');

        });

        await test.step('Generate random registration data', async () => {
            randomName = faker.person.firstName();
            console.log(randomName);
            randomEmail = faker.internet.email();
            console.log(randomEmail);
            randomPassword = faker.internet.password({ length: 10 });
            console.log(randomPassword);
        });
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
            const flashText = await commonUIComponent.getFlashNoticeText();
            expect(
                flashText,
                'Expected flash message to confirm account creation'
            ).toBe('Welcome! You have signed up successfully.');
        });
    });
});
