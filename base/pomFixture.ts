import { test as baseTest } from '@playwright/test';
import HomePage from '../pages/homePage';
import SignUpPage from '../pages/singUpPage';
import SignInPage from '../pages/signInPage';
import EditAccountPage from '../pages/editAccountPage';
import CampaignsPage from '../pages/campaignsPage';
import CommonUIComponent from '../components/commonUIComponents';
import ApiWebComponents from '../components/apiWebComponents';

type pages = {
    homePage: HomePage;
    signUpPage: SignUpPage;
    signInPage: SignInPage;
    editAccountPage: EditAccountPage;
    campaignsPage: CampaignsPage;
    commonUIComponent: CommonUIComponent;
    apiWebComponent: ApiWebComponents;
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

    campaignsPage: async ({ page }, use) => {
        await use(new CampaignsPage(page));
    },

    commonUIComponent: async ({ page }, use) => {
        await use(new CommonUIComponent(page));

    },

    apiWebComponent: async ({}, use) => {
        await use(new ApiWebComponents());
    }
});

export const test = testPages;
export const expect = baseTest.expect;