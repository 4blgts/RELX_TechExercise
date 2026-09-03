import { Page, Locator } from '@playwright/test';

export default class MyAccountPage {
   constructor(protected page: Page) {
   this.page = page;
   }

  public get signInEmail(): Locator {
    return this.page.getByPlaceholder('Correo').first();
    }

  public get signInPassword(): Locator {
    return this.page.getByPlaceholder('Contraseña').first();
    }

  public get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Ingresar' });
    }
  
  async Login(email: string, password: string): Promise<void> {
    await this.signInEmail.waitFor({ state: 'visible' });
    await this.signInEmail.fill(email);
    await this.signInPassword.waitFor({ state: 'visible' });
    await this.signInPassword.fill(password);
    await this.signInButton.waitFor({ state: 'visible' });
    await this.signInButton.click();
    }
 
}