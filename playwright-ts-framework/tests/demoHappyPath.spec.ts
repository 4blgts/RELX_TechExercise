import { test, expect } from '@playwright/test';
import BasePage from '../src/pages/base.page';
import testData from '../src/data/demo.json';
import MyAccountPage from '../src/pages/myAccount.page';
import ProductsPage from '../src/pages/products.page';
import CheckoutPage from '../src/pages/checkout.page';

test('Happy Path - Select Product from category and checkout', async ({ page }) => {
  
    //Page instantiation
    const basePage = new BasePage(page);
    const myAccountPage = new MyAccountPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);
    
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

    await test.step('Select a category', async () => {
        await productsPage.selectCategory(testData.productDetails.categoryName);
    });

    await test.step('Add a product to the cart', async () => {
        await expect(productsPage.productCard(testData.productDetails.productName)).toBeVisible();
        await productsPage.addProductToCart(testData.productDetails.productName);
    });

    await test.step('Navigate to shopping cart', async () => {
        await basePage.clickElement(basePage.cartLink);
    });

    await test.step('Populate checkout form and place order', async () => {
        await checkoutPage.fillCheckoutForm(testData.checkoutData.checkoutForm);
        await checkoutPage.selectPaymentOption(testData.checkoutData.paymentOptionName);
        await checkoutPage.clickCheckoutButton();
    });

    await test.step('Verify order submission', async () => {
        await checkoutPage.verifyOrderSubmission();
    });

})