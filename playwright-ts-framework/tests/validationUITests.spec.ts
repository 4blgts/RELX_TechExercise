import { test, expect } from '@playwright/test';
import BasePage from '../src/pages/base.page';
import testData from '../src/data/demo.json';

/*This is the test case to validate if the logo and login button is displayed on the home page. 
 *The test case will navigate to the base URL and check if the logo and login button is visible. 
 *If the logo and login button is not visible, the test case will fail.
*/

test('[TS001] Validation if the logo and login button is displayed', async ({ page }) => {
  
    //Page instantiations
    const basePage = new BasePage(page);

    await test.step('Navigate to URL', async () => {
        await page.goto(process.env.BASE_URL!);

    });

    await test.step('validate if logo and login button is displayed', async () => {
        await basePage.verifyImageAttributes(basePage.homePageLogo);
        await basePage.verifyImageAttributes(basePage.loginButton);
    });
});