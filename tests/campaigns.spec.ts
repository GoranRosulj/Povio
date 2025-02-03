import { test, expect } from '../base/pomFixture';
import { faker } from '@faker-js/faker';

test.describe('Campaign Tests', () => {
    let randomCampaignName: string;
    let randomCampaignDescription: string;
    let currentCampaignName: string;
    let randomName: string;
    let randomEmail: string;
    let randomPassword: string;

    test.beforeEach(async ({ homePage, signUpPage, campaignsPage, commonUIComponent }) => {
        // Generate user test data
        randomName = faker.person.firstName();
        randomEmail = faker.internet.email();
        randomPassword = faker.internet.password({ length: 10 });
        // Generate campaign test data
        randomCampaignName = faker.commerce.productName();
        currentCampaignName = randomCampaignName;
        randomCampaignDescription = faker.lorem.sentence();

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

        // Navigate to Campaigns page
        await commonUIComponent.clickOnLink('Campaigns');
        // Verify the Campaigns page is loaded
        const headerText = await campaignsPage.getCampaignsPageHeaderText();
        await expect(headerText).toContain('Campaigns');
    });

    test.afterEach(async ({ page, campaignsPage, commonUIComponent, editAccountPage }, testInfo) => {
        // Navigate to Campaigns page
        await commonUIComponent.clickOnLink('Campaigns');
        if (testInfo.title !== 'Delete a campaign') {
            // Set up a dialog handler to accept the confirmation alert
        page.once('dialog', async dialog => {
            await dialog.accept();
            });
            // Cleanup: Delete campaign after test execution
            await campaignsPage.deleteCampaign(currentCampaignName);
        }
        // Verify the Campaigns page is loaded
        const headerText = await campaignsPage.getCampaignsPageHeaderText();
        await expect(headerText).toBe('Campaigns');
        // Cleanup: Delete user after test execution
        // Navigate to the Edit Account page:
        await commonUIComponent.clickOnLink('Edit account');
        // Set up a dialog handler to accept the confirmation alert
        page.once('dialog', async dialog => {
        await dialog.accept();
        });
        // Click the "Cancel my account" button
        await editAccountPage.clickOnCancelAccount();
        // Verify successful account deletion
        const successMessage = await commonUIComponent.getFlashNoticeText();
        await expect(successMessage, 'Expected user account to be canceled').toBe(
            'Bye! Your account has been successfully cancelled. We hope to see you again soon.'
        );
    });

    test('Create a new campaign', async ({ campaignsPage }) => {
        await test.step('Navigate to new campaign page', async () => {
            await campaignsPage.navigateToNewCampaign();
        });

        await test.step('Create campaign with test data', async () => {
            await campaignsPage.createCampaign(randomCampaignName, randomCampaignDescription, 'one_time');
        });

        await test.step('Verify campaign was created successfully', async () => {
            const campaignExists = await campaignsPage.campaignExists(randomCampaignName);
            await expect(campaignExists).toBeTruthy();
        });
    });

    test('Edit an existing campaign', async ({ campaignsPage, commonUIComponent }) => {
        await test.step('Create initial campaign', async () => {
            await campaignsPage.navigateToNewCampaign();
            await campaignsPage.createCampaign(randomCampaignName, randomCampaignDescription, 'one_time');
        });

        await test.step('Update campaign with new details', async () => {
            const updatedCampaignName = faker.commerce.productName();
            const updatedCampaignDescription = faker.lorem.sentence();
            
            await campaignsPage.editCampaign(randomCampaignName, updatedCampaignName, updatedCampaignDescription);
            currentCampaignName = updatedCampaignName;
        });

        await test.step('Verify campaign was updated successfully', async () => {
            await expect(commonUIComponent.flashNotice).toContainText('Campaign was successfully updated');
            
            const campaignExists = await campaignsPage.campaignExists(currentCampaignName);
            await expect(campaignExists, 'Expected updated campaign to be visible in the list').toBeTruthy();
        });
    });

    test('Delete a campaign', async ({ page, campaignsPage, commonUIComponent }) => {
        await test.step('Create initial campaign', async () => {
            await campaignsPage.navigateToNewCampaign();
            await campaignsPage.createCampaign(randomCampaignName, randomCampaignDescription, 'one_time');
        });

        await test.step('Delete the campaign', async () => {
            // Set up dialog handler for delete confirmation
            page.once('dialog', async dialog => {
                await dialog.accept();
            });
            await campaignsPage.deleteCampaign(randomCampaignName);
        });

        await test.step('Verify campaign was deleted successfully', async () => {
            await expect(commonUIComponent.flashNotice).toContainText('Campaign was successfully destroyed');
            
            const campaignExists = await campaignsPage.campaignExists(randomCampaignName);
            await expect(campaignExists, 'Expected campaign to be removed from the list').toBeFalsy();
        });
    });
});