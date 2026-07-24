import { Page, Locator } from '@playwright/test';

export default class ShoppingCartPage {
   constructor(protected page: Page) {
   this.page = page;
   }

   public get viewCartLink(): Locator {
   return this.page.getByRole('link', { name: 'View Cart', exact: true })
   }

   public get shoppingCartHeader(): Locator {
   return this.page.getByRole('heading', { name: 'Shopping Cart' })
   }
    
   public productNameHeader(productName: string): Locator {
   return this.page.getByRole('heading', { name: productName, exact: true });
   }

   public get checkoutButton(): Locator {
   return this.page.getByRole('link', { name: 'Proceed to Checkout', exact: true })
   }

   async clickViewCartButton(): Promise<void> {
      await this.viewCartLink.click();
   }

   async clickCheckOutButton(): Promise<void> {
      await this.checkoutButton.click();
   }
   

}