import { Page, Locator } from '@playwright/test';

export default class ProductsPage {
  constructor(protected page: Page) {
  this.page = page;
  }

    public get productsHeader(): Locator {
    return this.page.getByRole('heading', { name: 'All Products', exact: true });
    }

    private productLink(productName: string): Locator {
    return this.page.getByRole('heading', { name: productName, exact: true });
    }

    private get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to Cart', exact: true });
    }

     async selectProduct(productName: string): Promise<void> {
        await this.productLink(productName).click();
     }

     async selectProductandAddToCart(productName: string): Promise<void> {
        await this.productLink(productName).click();
        await this.addToCartButton.click();
     }

    
    

}