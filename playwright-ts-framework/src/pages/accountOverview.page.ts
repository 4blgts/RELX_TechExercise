import { Page, Locator } from '@playwright/test';

export default class AccountOverviewPage {
    constructor(protected page: Page) {
    this.page = page;
    }

    private get accountOverview(): Locator {
    return this.page.getByRole('heading', { name: 'Account Overview', exact: true })
    }

    public accountEmail(generatedEmail: string): Locator {
    return this.page.locator('p.truncate').filter({ hasText: generatedEmail });
    }

    private get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign In', exact: true });
    }

    private get signOutButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign Out', exact: true });
    }

    private get email(): Locator {
    return this.page.getByLabel('Email');
    }

    private get password(): Locator {
    return this.page.getByLabel('Password').first();
    }

    async verifyAccountOverviewHeaderIsDisplayed(): Promise<boolean> {
        return this.accountOverview.isVisible();
    }

    async verifyAccountEmailIsDisplayed(generatedEmail: string): Promise<boolean> {
        return this.accountEmail(generatedEmail).isVisible();
    }

    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
     }

    async clickSignOutButton(): Promise<void> {
        await this.signOutButton.click();
    }

    async fillEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.password.fill(password);
    }

}