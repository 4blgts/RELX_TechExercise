import { Page, Locator, expect } from '@playwright/test';

export default class ProductsPage {
   constructor(protected page: Page) {
   this.page = page;
   }

  // Method to get the category card based on the category name 
  public categoryCard(categoryName: string): Locator {
    return this.page.getByRole('link', { name: categoryName }).first();
    }

  //Method to add a product to the cart based on the product name
  public productCard(productName: string): Locator {
    return this.page.locator(`button[data-product-name="${productName}"]`);
  }

  public get cartCount(): Locator {
    return this.page.locator('span[data-cart-count]');
  }

  async selectCategory(categoryName: string): Promise<void> {
    const categoryCard = this.categoryCard(categoryName);
    await categoryCard.waitFor({ state: 'visible' });
    await categoryCard.click();
    }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.productCard(productName);
    await this.page.waitForLoadState('domcontentloaded');
    await productCard.waitFor({ state: 'visible' });
    await expect(async () => {
      await productCard.click();
      await expect(this.cartCount).not.toHaveText('0');
    }).toPass({ intervals: [500], timeout: 10000 });
    }
}