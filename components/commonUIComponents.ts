import { Page, Locator } from '@playwright/test';



class CommonUIComponent {

    //Contains locators and helper methods for the Home page and pop up menus within the application.

    logo: Locator;
    homePageLinks: Locator;
    flashNotice: Locator;
    flashAlert: Locator;
    flashXButton: Locator;
        
    constructor(private page: Page) {
        this.page = page;
        this.logo = page.locator('a.logo');
        this.homePageLinks = page.locator('a');
        this.flashNotice = page.locator('#flash_notice');
        this.flashAlert = page.locator('#flash_alert');
        this.flashXButton = page.locator('.close');
    }

    async clickOnLink(linkName: string) {
        await this.homePageLinks.getByText(linkName).click();
    }

    getLink(linkName: string): Locator {
        return this.homePageLinks.getByText(linkName);
    }
    
    async getFlashNoticeText(): Promise<string | null> {
        return await this.flashNotice.textContent();
    }

    async getFlashAlertText(): Promise<string | null> {
        return await this.flashAlert.textContent();
    }
    
    async clickonFlashXButton() {
        await this.flashXButton.click();
    }
}

export default CommonUIComponent;