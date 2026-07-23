import { Page, Locator } from '@playwright/test';
import BasePage from './base.page';

export default class CreateUserPage{
  constructor(protected page: Page) {
  this.page = page;
  }
  
    private get firstName(): Locator {
    return this.page.getByLabel('First name');
    }

    private get lastName(): Locator {
    return this.page.getByLabel('Last name');
    }

    private get email(): Locator {
    return this.page.getByLabel('Email');
    }

    private get password(): Locator {
    return this.page.locator('form#login-form').locator('#password');
    }

    private get confirmPassword(): Locator {
    return this.page.locator('form#login-form').locator('#confirmPassword');
    }

    private get privacyPolicyCheckBox(): Locator {
    return this.page.getByRole('checkbox', { checked: false });
    }

    private get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Create Account', exact: true });
    }

     async fillFirstName(firstName: string): Promise<void> {
         await this.firstName.fill(firstName);
     }

      async fillLastName(lastName: string): Promise<void> {
         await this.lastName.fill(lastName);
     }

     async fillEmail(email: string): Promise<void> {
         await this.email.fill(email);
     }

     async fillPassword(password: string): Promise<void> {
         await this.password.fill(password);
     }

     async fillConfirmPassword(confirmPassword: string): Promise<void> {
         await this.confirmPassword.fill(confirmPassword);
     }

      async clickPrivacyPolicyCheckBox(): Promise<void> {
         await this.privacyPolicyCheckBox.click();
     }

      async clickCreateAccountButton(): Promise<void> {
         await this.createAccountButton.click();
     }


}