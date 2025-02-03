import { test, expect } from '../base/pomFixture';

test.describe('Sign In Page - Login flow', () => {

    test.beforeEach(async ({ homePage }) => {
        // Navigate to the homepage before each test
        await homePage.navigate();
        await expect(homePage.welcome, 'Expected the welcome text to be visible on the homepage').toBeVisible();
    });
    
    test('Successful Login with Valid Credentials', async ( { homePage, commonUIComponent, signInPage } ) => {
        await test.step('Navigate to Sing in page', async () => {
            await commonUIComponent.clickOnLink('Sign In');
            await expect(signInPage.singInHeader).toBeVisible();
        });
        await test.step('Fill input fields', async () => {
            const userEmail = process.env.USER_EMAIL!;
            const userPass = process.env.USER_PASS!;
            await signInPage.fillUserEmailField(userEmail);
            await signInPage.fillUserPassField(userPass);
        });
        await test.step('Submit form', async () => {
            await signInPage.clickSignInButton();
            const flashText = await commonUIComponent.getFlashNoticeText();
            await expect(flashText, 'Expected flash notification to confirm successful sign in').toBe('Signed in successfully.');
        });
    });
});