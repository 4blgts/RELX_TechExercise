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

  public get hamburgerMenu(): Locator {
    return this.page.getByRole('button', { name: 'Open menu', exact: true });
    }

  public menuItem(menuItemName: string ): Locator {
    return this.page.getByRole('link', { name: menuItemName, exact: true });
    }

  public get accountLink(): Locator {
    return this.page.getByRole('link', { name: 'Account', exact: true }).first();
    }

  public get signUpLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign up', exact: true }).first();
    }

  public get storefrontHeader(): Locator {
    return this.page.getByRole('heading', { name: 'Spree Storefront' });
  }

  async clickHamburgerMenu(): Promise<void> {
        await this.hamburgerMenu.waitFor({ state: 'visible' });
        await this.hamburgerMenu.click();
     }

  async navigateToMenuItem(menuItemName: string): Promise<void> {
        await this.clickHamburgerMenu();
        await this.menuItem(menuItemName).waitFor({ state: 'visible' });
        await this.menuItem(menuItemName).click();
  }

  async clickAccountLink(): Promise<void> {
        await this.accountLink.waitFor({ state: 'visible' });
        await this.accountLink.click();
     }

  async clickSignUpLink(): Promise<void> {
        await this.signUpLink.waitFor({ state: 'visible' });
        await this.signUpLink.click();
     }  
}