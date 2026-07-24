import { Page, Locator } from '@playwright/test';

export default class CheckoutPage {
   constructor(protected page: Page) {
   this.page = page;
   }

   public get shippingAddressHeader(): Locator {
   return this.page.getByRole('heading', { name: 'Shipping Address'});
   }

   public get addressInput(): Locator {
   return this.page.getByLabel('Address').nth(0);
   }

   public get cityInput(): Locator {
   return this.page.getByLabel('City');
   }

   public get stateInput(): Locator {
   return this.page.getByLabel('State / Province');
   }

   public get zipCodeInput(): Locator {
   return this.page.getByLabel('Zip / Postal Code');
   }

   public get placeOrderButton(): Locator {
   return this.page.getByRole('button', { name: 'Place Order' });
   }

   public get orderConfirmationHeaderBlock(): Locator {
   return this.page.locator('div.text-center.mb-10');
   }

   public get orderConfirmationHeader(): Locator {
   return this.page.locator('div.text-center.mb-10').getByRole('heading', { name: /Thanks for your order/i });
   }
   
   async fillAddress(address: string): Promise<void> {
      await this.addressInput.fill(address);
   }

   async fillCity(city: string): Promise<void> {
      await this.cityInput.fill(city);
   }

   async fillState(state: string): Promise<void> {
      await this.stateInput.selectOption(state, { timeout: 5000 });
   }

   async fillZipCode(zipCode: string): Promise<void> {
      await this.zipCodeInput.fill(zipCode);
   }

   async fillShippingAddress(address: string, city: string, state: string, zipCode: string): Promise<void> {
      await this.fillAddress(address);
      await this.fillCity(city);
      await this.fillState(state);
      await this.fillZipCode(zipCode);
   }

   async clickPlaceOrderButton(): Promise<void> {
      await this.placeOrderButton.click();
   }

}