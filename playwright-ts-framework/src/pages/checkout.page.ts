import { Page, Locator, expect } from '@playwright/test';

export default class CheckoutPage {
  constructor(protected page: Page) {
  this.page = page;
  }

  //Method to identify the checkout fields dynamically based on the field name
  public checkoutField(fieldName: string): Locator {
    return this.page.locator(`input[name="${fieldName}"]`);
  }

  public get paymentOption(): Locator {
    return this.page.locator('select[name="paymentMethod"]');
  }

  public get orderSubmissionMessage(): Locator {
    return this.page.locator('p[data-order-status]');
  }

  public get checkoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Registrar pedido' }).first();
  }

  //Method to fill the checkout fields dynamically based on the field name and value
  async fillCheckoutField(fieldName: string, value: string): Promise<void> {
    const field = this.checkoutField(fieldName);
    await field.waitFor({ state: 'visible' });
    await field.fill(value);
  }

  async fillCheckoutForm(checkoutData: { [key: string]: string }): Promise<void> {
    for (const [fieldName, value] of Object.entries(checkoutData)) {
      await this.fillCheckoutField(fieldName, value);
    }
  }

  async selectPaymentOption(paymentOptionName: string): Promise<void> {
    await this.paymentOption.waitFor({ state: 'visible' });
    await this.paymentOption.selectOption(paymentOptionName);
  }

  async clickCheckoutButton(): Promise<void> {
    await this.checkoutButton.waitFor({ state: 'visible' });
    await this.checkoutButton.click();
  }

  async verifyOrderSubmission(): Promise<void > {
    await expect(this.orderSubmissionMessage).toBeVisible();
    await expect(this.orderSubmissionMessage).toHaveText(/Pedido .* registrado/i);

  }

}