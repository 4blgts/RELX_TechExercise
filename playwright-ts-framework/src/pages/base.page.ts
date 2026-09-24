import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  public get homePageLogo(): Locator {
    return this.page.getByRole('link', { name: 'Go to the cheapflights homepage' });
    }

  public get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign in' });
    }
  
  public get originInput(): Locator {
    return this.page.getByRole('combobox', { name: 'Origin location' });
    } 

  public get destinationInput(): Locator {
    return this.page.getByRole('combobox', { name: /Ask anything|To?/i }).nth(2);
    }

  public get inputValueDeleteButton(): Locator {
    return this.page.getByRole("button", { name: "Remove value" });
    }

  public get selectDateButton(): Locator {
    return this.page.getByRole('button', { name: 'Select this dates' });
    }

  public get searchButton(): Locator {
    return this.page.getByRole('button', { name: 'Search' });
    }

  public alertMessage(value: string): Locator {
    return this.page.getByText(value, { exact: false});
  }

  public dismissButton(): Locator {
    return this.page.getByRole('button', { name: 'Dismiss' });
  }

  public depatureDateButton(): Locator {
    return this.page.getByRole('button', { name: 'Departure date' })
  }

  async verifyImageAttributes(imageLocator: Locator): Promise<void> {
        
        //Fetching the bounding box of the image to verify its position on the page
        await this.page.waitForLoadState('load');
        await expect(imageLocator).toBeVisible();
        const viewport = this.page.viewportSize();
        const box = await imageLocator.boundingBox();

        //Checking of bounding box is not null before performing assertions to avoid runtime errors
        if (box) {
          // Check if the image is within the top header viewport Y Axis
          expect(box.y).toBeLessThan(100);
          
          //Validate if the image/button is within the header viewport in X Axis
          const buttonPercentX = (box.x / viewport.width) * 100;
          expect(buttonPercentX).toBeGreaterThan(5);
          expect(buttonPercentX).toBeLessThan(95);
        } 
          else {
          throw new Error('Could not retrieve bounding box. Element might not be loaded properly.');
        }      
     }

  async fillandSelectFromDropdown(dropdownLocator: Locator, value: string): Promise<void> {
    await dropdownLocator.fill(value);
    const dropdownOption = this.page.getByRole('option', { name: new RegExp(`^${value}`, 'i') }).first();
    await dropdownOption.click();
    await this.page.waitForTimeout(1000);
  }

  async clearInputField(): Promise<void> {
    await this.inputValueDeleteButton.click();
  }

  async selectDateFromCalendar(date: string): Promise<void> {
    const targetDate = new RegExp(date, 'i');
    await this.page.getByRole('button', { name: targetDate }).click();
  }

  async clickSelectDatesButton(): Promise<void> {
    await this.selectDateButton.click();
  }

  async clickSearchButton(): Promise<void> {
    await this.searchButton.click({ delay: 2000 }); // Adding a delay to ensure the click is registered
  }

  async validateAlertMessage(fieldValue: string): Promise<void> {
    switch (fieldValue) {
      case 'Origin':
        await expect(this.alertMessage("Please enter a 'From' airport.")).toBeVisible();
        break;
      case 'Destination':
        await expect(this.alertMessage("Please enter a 'To' airport.")).toBeVisible();
        break;
      case 'Depart Date':
        await expect(this.alertMessage("Please enter a valid 'Depart' date.")).toBeVisible();
        break;
      case 'Return Date':
        await expect(this.alertMessage("Please enter a valid 'Return' date. If you wish to search for a one-way flight, please click the 'One-way' button above.")).toBeVisible();
        break;
      default:
        throw new Error(`No validation defined for field: ${fieldValue}`);
    }
  }

  async dismissAlertMessage(): Promise<void> {
    await this.dismissButton().click();
    await this.page.waitForTimeout(1000); 
  }

  async clickDepartureDateButton(): Promise<void> {
    await this.depatureDateButton().click();
  }
}