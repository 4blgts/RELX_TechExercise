import { Page, Locator, expect } from '@playwright/test';

export default class SearchResultsPage {
  constructor(protected page: Page) {}

  public get searchedRouteResult(): Locator {
    return this.page.locator('.c20D0-details');
  }

  public quickFilterButtons(filterCriteria: string): Locator{
    return this.page.locator('.Hv20-content', { hasText: filterCriteria });
  }

  async validateSearchedRoute(origin: string, destination: string): Promise<void> {
    const routePattern = new RegExp(`${origin} - ${destination}`, 'i');
    await this.searchedRouteResult.getByText(routePattern);
  }

  async validateQuickFilterButtons (): Promise<void>{

    //Expected quick filter buttons
    const expectedQuickFilters = ['Cheapest', 'Best', 'Quickest'];

    //Looping through validation of their visibility and enablement
    for (const quickFilterName of expectedQuickFilters) {
      const filterButton = this.quickFilterButtons(quickFilterName);
      await expect(filterButton).toBeVisible;
      await expect(filterButton).toBeEnabled;
    }
  }
}