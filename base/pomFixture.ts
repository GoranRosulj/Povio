import { test as baseTest } from '@playwright/test';
import HomePage from '../pages/homePage';
import SignUpPage from '../pages/singUpPage';
import SignInPage from '../pages/signInPage';
import EditAccountPage from '../pages/editAccountPage';
import CommonUIComponent from '../components/commonUIComponents';

type pages = {
    homePage: HomePage;
    signUpPage: SignUpPage;
    signInPage: SignInPage;
    editAccountPage: EditAccountPage;
    commonUIComponent: CommonUIComponent;
    
}

const testPages = baseTest.extend<pages>({

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    signUpPage: async ({ page }, use) => {
        await use(new SignUpPage(page));
    },

    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },

    editAccountPage: async ({ page }, use) => {
        await use(new EditAccountPage(page));
    },

    commonUIComponent: async ({ page }, use) => {
        await use(new CommonUIComponent(page));
    }
});

export const test = testPages;
export const expect = baseTest.expect;