import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from '../src/pages/base.page';
import CreateUserPage from '../src/pages/createUser.page';
import testData from '../src/data/demo.json';
import AccountOverviewPage from '../src/pages/accountOverview.page';
import ProductsPage from '../src/pages/products.page';
import ShoppingCartPage from '../src/pages/shoppingCart.page';

test('Happy Path - Create user and check out products', async ({ page }) => {
  
  //Page instantiation
  const basePage = new BasePage(page);
  const createUserPage = new CreateUserPage(page);
  const accountOverviewPage = new AccountOverviewPage(page);
  const productPage = new ProductsPage(page);
  const shoppingCartPage = new ShoppingCartPage(page);

  //Constants declaration
  const simpleEmail = faker.internet.email();

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
    await createUserPage.fillEmail(simpleEmail);
    await createUserPage.fillPassword(testData.newUserDetails.password);
    await createUserPage.fillConfirmPassword(testData.newUserDetails.password);
    await createUserPage.clickPrivacyPolicyCheckBox();
    await createUserPage.clickCreateAccountButton();

    });

    await test.step('Verify account creation and user was navigated to Account Overview page', async () => {
        await expect(accountOverviewPage.accountEmail(simpleEmail)).toBeVisible();
    });

    await test.step('Sign Out and Sign In using the new account', async () => {
        await accountOverviewPage.clickSignOutButton();

        // Sign In using the new account
        await accountOverviewPage.fillEmail(simpleEmail);
        await accountOverviewPage.fillPassword(testData.newUserDetails.password);
        await accountOverviewPage.clickSignInButton();
        await expect(accountOverviewPage.accountEmail(simpleEmail)).toBeVisible();
    });
    
     await test.step('Navigate to All Products page', async () => {
        await basePage.navigateToMenuItem('All Products');
        await expect(productPage.productsHeader).toBeVisible();
    });

    await test.step('Select a product and add to cart', async () => {
        await productPage.selectProductandAddToCart(testData.productDetails.productName);
        await expect(shoppingCartPage.viewCartLink).toBeVisible();
    });

    await test.step('Click on View Cart link and verify the product is in the cart', async () => {
        await shoppingCartPage.clickViewCartButton();});

})