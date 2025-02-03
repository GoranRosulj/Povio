import { Page, Locator } from '@playwright/test';

class CampaignsPage {
    
    // Locators for elements on the Edit Account page.
    campaignsPageHeader: Locator;
    addNewCampaignLink: Locator;
    campaignNameField: Locator;
    campaignDescriptionField: Locator;
    oneTimeRadio: Locator;
    repeatableRadio: Locator;
    createCampaignButton: Locator;
    updateCampaignButton: Locator;
    campaignTable: Locator;
    campaignRows: Locator;
    campaignEditLink: (name: string) => Locator;
    campaignDeleteLink: (name: string) => Locator;
    
    constructor(private page: Page) {
        this.page = page;
        this.campaignsPageHeader = page.locator('h3:has-text("Campaigns")');
        this.addNewCampaignLink = page.locator('a:has-text("Add New Campaign")');
        this.campaignNameField = page.locator('input[name="campaign[name]"]');
        this.campaignDescriptionField = page.locator('input[name="campaign[description]"]');
        this.oneTimeRadio = page.locator('input[type="radio"][value="one_time"]');
        this.repeatableRadio = page.locator('input[type="radio"][value="repeatable"]');
        this.createCampaignButton = page.locator('input[type="submit"][value="Create Campaign"]');
        this.updateCampaignButton = page.locator('input[type="submit"][value="Update Campaign"]');
        this.campaignTable = page.locator('table.table');
        this.campaignRows = page.locator('table.table tbody tr');
        this.campaignEditLink = (name: string) => page.locator(`table.table tbody tr:has-text("${name}") a:has-text("Edit")`);
        this.campaignDeleteLink = (name: string) => page.locator(`table.table tbody tr:has-text("${name}") a[data-method="delete"]`);
        
    }async getCampaignsPageHeaderText(): Promise<string | null> {
        return await this.campaignsPageHeader.textContent();
    }

    async navigateToNewCampaign() {
        await this.addNewCampaignLink.click();
    }

    async createCampaign(name: string, description: string, type: 'one_time' | 'repeatable') {
        await this.campaignNameField.fill(name);
        await this.campaignDescriptionField.fill(description);
        if (type === 'one_time') {
            await this.oneTimeRadio.check();
        } else {
            await this.repeatableRadio.check();
        }
        await this.createCampaignButton.click();
    }

    async editCampaign(oldName: string, newName: string, newDescription: string) {
        await this.campaignEditLink(oldName).click();
        await this.campaignNameField.fill(newName);
        await this.campaignDescriptionField.fill(newDescription);
        await this.updateCampaignButton.click();
    }

    async deleteCampaign(name: string) {
        await this.campaignDeleteLink(name).click();
    }

    async editCampaignByName(campaignName: string) {
        await this.campaignEditLink(campaignName).click();
    }

    async deleteCampaignByName(campaignName: string) {
        await this.campaignDeleteLink(campaignName).click();
    }

    async campaignExists(campaignName: string): Promise<boolean> {
        const count = await this.campaignRows.filter({ hasText: campaignName }).count();
        return count > 0;
    }
}

export default CampaignsPage;
