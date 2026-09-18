import { Page, Locator } from '@playwright/test';

export default class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  public get storefrontHeader(): Locator {
    return this.page.getByRole('img', { name: 'Plaza San Juan Macías' }).first();
    }

  public get myAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Mi Cuenta' }).first();
    }

  public get catalogLink(): Locator {
    return this.page.getByRole('link', { name: 'Catálogo' });
    }

  public get categoriesLink(): Locator {
    return this.page.getByRole('link', { name: 'Categorías' }).first();
    }
  
  public get cartLink(): Locator {
    return this.page.getByRole('link', { name: 'Carrito' }).first();
  }

  async clickMyAccountLink(): Promise<void> {
        await this.myAccountLink.waitFor({ state: 'visible' });
        await this.myAccountLink.click();
     }

 
}