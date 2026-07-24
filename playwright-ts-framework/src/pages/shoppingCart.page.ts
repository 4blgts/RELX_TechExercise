import { Page, Locator } from '@playwright/test';

export default class ShoppingCartPage {
  constructor(protected page: Page) {
  this.page = page;
  }

    public get viewCartLink(): Locator {
    return this.page.getByRole('link', { name: 'View Cart', exact: true })
    }


     async clickViewCartButton(): Promise<void> {
        await this.viewCartLink.click();
     }
   

}