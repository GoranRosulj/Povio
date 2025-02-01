import { test, expect  } from '../base/pomFixture';

test.describe('Application Health Check', () => {

    test.beforeEach(async ({ homePage }) => {
        // Navigate to the homepage before each test.
        await homePage.navigate();
    });

    test('Homepage loads with core elements visible', async ( { homePage, commonUIComponent }) => {
        await expect(commonUIComponent.logo, 'Expected the homepage logo to be visible').toBeVisible();
        await expect(homePage.welcome, 'Expected the welcome message to be visible').toBeVisible();
    });

    test('Navigation bar links are present', async ({ homePage, commonUIComponent }) => {
        await test.step('Home link is present', async () => {
            const homeLink = commonUIComponent.getLink('Home');
            await expect(homeLink, 'Expected Home link to be visible on the homepage').toBeVisible();
        });

        await test.step('Sign in link is present', async () => {
            const signInLink = commonUIComponent.getLink('Sign in');
            await expect(signInLink, 'Expected Sign in link to be visible on the homepage').toBeVisible();
        });
        
        await test.step('Sing link is present', async () => {
            const signUpLink = commonUIComponent.getLink('Sign up');
            await expect(signUpLink, 'Expected Sign up link to be visible on the homepage').toBeVisible();
        });
    });
});

