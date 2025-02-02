import { Page, Locator} from '@playwright/test';

//Contains locators and helper methods for the Home page and pop up menus within the application.

class HomePage {
    
    welcome: Locator;
    
    constructor(private page: Page) {
        this.page = page;
        this.welcome = page.locator('h3:has-text("Welcome")')
    }

    async navigate() {
        await this.page.goto(process.env.BASE_URL!);
    }

    async getWelcomeText() {
        await this.welcome.textContent();
    }
}

export default HomePage;