import { test, expect } from '@playwright/test';
import BasePage from '../src/pages/base.page';
import CreateUserPage from '../src/pages/createUser.page';
import testData from '../src/data/demo.json';

test('Happy Path - Create user and check out products', async ({ page }) => {
  const basePage = new BasePage(page);
  const createUserPage = new CreateUserPage(page);

  await test.step('Navigate to base URL', async () => {
    await basePage.navigateTo(process.env.BASE_URL!);
  });

  await test.step('Click on Account link', async () => {
    await page.getByRole('link', { name: 'Account', exact: true }).first().click();
  });

  await test.step('Click on Sign Up link', async () => {
    await page.getByRole('link', { name: 'Sign up', exact: true }).first().click();
  });

  await test.step('Fill in the user details and create account', async () => {
    await createUserPage.fillFirstName(testData.newUserDetails.firstName);
    await createUserPage.fillLastName(testData.newUserDetails.lastName);
    await createUserPage.fillEmail(testData.newUserDetails.email);
    await createUserPage.fillPassword(testData.newUserDetails.password);
    await createUserPage.fillConfirmPassword(testData.newUserDetails.password);
    await createUserPage.clickPrivacyPolicyCheckBox();
    await createUserPage.clickCreateAccountButton();
    });
 })

