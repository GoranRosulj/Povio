import { Page, Locator} from '@playwright/test';
import { expect } from '../base/pomFixture';
//import CommonUIComponent from '../components/commonUIComponent';

/*

Contains locators and helper methods for the Home page and pop up menus within the application.

*/
class HomePage {
    logo: Locator;
    homePageLinks: Locator;
    //signIn: Locator;
    //signUp: Locator;
    welcome: Locator;
    
    constructor(private page: Page) {
        this.page = page;
        this.logo = page.locator('a.logo');
        this.homePageLinks = page.locator('a');
        //this.signIn = page.locator('a').getByText('Sign in');
        //this.signUp = page.locator('a').getByText('Sign in');
        this.welcome = page.locator('main h3')
    }

    async navigate() {
        await this.page.goto(process.env.BASE_URL!);
    }

    async getWelcomeText(welcome) {
        await this.welcome.textContent();
    }

    async clickOnLink(linkName: string) {
        await this.homePageLinks.getByText(linkName).click();
    }
}

export default HomePage;