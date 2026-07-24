import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from '../src/pages/base.page';
import CreateUserPage from '../src/pages/createUser.page';
import testData from '../src/data/demo.json';
import AccountOverviewPage from '../src/pages/accountOverview.page';
import ProductsPage from '../src/pages/products.page';
import ShoppingCartPage from '../src/pages/shoppingCart.page';
import CheckoutPage from '../src/pages/checkout.page';

test('Happy Path - Create new user and complete product checkout flow', async ({ page }) => {
  
    //Page instantiation
    const basePage = new BasePage(page);
    const createUserPage = new CreateUserPage(page);
    const accountOverviewPage = new AccountOverviewPage(page);
    const productPage = new ProductsPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //Constants declaration
    const simpleEmail = faker.internet.email();

    await test.step('Navigate to base URL', async () => {
        await basePage.navigateTo(process.env.BASE_URL!);
        await expect(basePage.storefrontHeader).toBeVisible();
    });

    await test.step('Click on Account link', async () => {
        await basePage.clickAccountLink();
    });

    await test.step('Click on Sign Up link', async () => {
        await basePage.clickSignUpLink();
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

    await test.step('Click on View Cart link and verify the product is in the shopping cart', async () => {
        await shoppingCartPage.clickViewCartButton();
        await expect(shoppingCartPage.shoppingCartHeader).toBeVisible();

        //Verify if product was successfully added to the shopping cart
        await expect(shoppingCartPage.productNameHeader(testData.productDetails.productName)).toBeVisible();
    });

    await test.step('Proceed to checkout', async() => {
        await shoppingCartPage.clickCheckOutButton();
        await expect(checkoutPage.shippingAddressHeader).toBeVisible();
    });

    await test.step('Populate checkout required fields and proceed with order', async() => {
        await checkoutPage.fillShippingAddress(
            testData.checkoutDetails.Address,
            testData.checkoutDetails.City,
            testData.checkoutDetails.State,
            testData.checkoutDetails.ZipCode
        );
        await checkoutPage.clickPlaceOrderButton();
      });

    await test.step('Verify order confirmation page is displayed', async() => {
        await checkoutPage.orderConfirmationHeaderBlock.waitFor({ state: 'attached', timeout: 15000 });
        await expect(checkoutPage.orderConfirmationHeader).toBeVisible({ timeout: 30000 });
    });
})