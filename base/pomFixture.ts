import { test as baseTest } from '@playwright/test';
import HomePage from '../pages/homePage';
import SignInPage from '../pages/signInPage';
import CommonUIComponent from '../components/commonUIComponents';

type pages = {
    homePage: HomePage;
    signInPage: SignInPage;
    commonUIComponent: CommonUIComponent;
    
}

const testPages = baseTest.extend<pages>({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },

    commonUIComponent: async ({ page }, use) => {
        await use(new CommonUIComponent(page));
    }
});

export const test = testPages;
export const expect = baseTest.expect;