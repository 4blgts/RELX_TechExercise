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

  private get hamburgerMenu(): Locator {
    return this.page.getByRole('button', { name: 'Open menu', exact: true })
    }

  private menuItem(menuItemName: string ): Locator {
    return this.page.getByRole('link', { name: menuItemName, exact: true })
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
}