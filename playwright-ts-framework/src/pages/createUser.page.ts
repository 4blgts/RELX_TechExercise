import { Page, Locator } from '@playwright/test';

export default class CreateUserPage{
   constructor(protected page: Page) {
   this.page = page;
   }
  
   public get firstName(): Locator {
   return this.page.getByLabel('First name');
   }

   public get lastName(): Locator {
   return this.page.getByLabel('Last name');
   }

   public get email(): Locator {
   return this.page.getByLabel('Email');
   }

   private get password(): Locator {
   return this.page.getByLabel('Password').first();
   }

   public get confirmPassword(): Locator {
   return this.page.getByLabel('Confirm Password').first();
   }

   public get privacyPolicyCheckBox(): Locator {
   return this.page.getByRole('checkbox', { checked: false });
   }

   public get createAccountButton(): Locator {
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