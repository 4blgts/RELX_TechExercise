import { test, expect } from '@playwright/test';
import BasePage from '../src/pages/base.page';
import testData from '../src/data/demo.json';


test('Happy Path - Select Product from category and checkout', async ({ page }) => {
  
    //Page instantiation
    const basePage = new BasePage(page);

    await test.step('Navigate to base URL', async () => {
        await basePage.navigateTo(process.env.BASE_URL!);
        await expect(basePage.storefrontHeader).toBeVisible();
    });

    await test.step('Click on My Account link', async () => {
        await basePage.clickMyAccountLink();
    });

})