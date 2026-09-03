import { test, expect } from '@playwright/test';
import BasePage from '../src/pages/base.page';
import testData from '../src/data/demo.json';
import MyAccountPage from '../src/pages/myAccount.page';

test('Happy Path - Select Product from category and checkout', async ({ page }) => {
  
    //Page instantiation
    const basePage = new BasePage(page);
    const myAccountPage = new MyAccountPage(page);
    
    await test.step('Navigate to base URL', async () => {
        await basePage.navigateTo(process.env.BASE_URL!);
        await expect(basePage.storefrontHeader).toBeVisible();
    });

    await test.step('Click on My Account link', async () => {
        await basePage.clickMyAccountLink();
    });

    await test.step('Login with valid credentials', async () => {
        await myAccountPage.Login(testData.customerLogin.username, testData.customerLogin.password);
    });

    await test.step('Navigate to Catalog and then Categories', async () => {
        await basePage.clickElement(basePage.catalogLink);
        await basePage.clickElement(basePage.categoriesLink);
    });

})