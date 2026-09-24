import { test, expect } from '@playwright/test';
import BasePage from '../src/pages/base.page';
import testData from '../src/data/demo.json';


test('[TS002] Validation of Search Flights Functionality ', async ({ page, context }) => {
  
    //Page instantiation
    const pagePromise = context.waitForEvent('page');
    const basePage = new BasePage(page);

    await test.step('Navigate to base URL', async () => {
        await page.goto(process.env.BASE_URL!);
    });

    await test.step('Populate required fields to search for a flight', async () => {
        await basePage.clearInputField(); // Clear the origin input field before entering a new value
        await basePage.fillandSelectFromDropdown(basePage.originInput, testData.FlightSearch.origin);
        await basePage.fillandSelectFromDropdown(basePage.destinationInput, testData.FlightSearch.destination);
        await basePage.selectDateFromCalendar(testData.FlightSearch.departureDate);
        await basePage.selectDateFromCalendar(testData.FlightSearch.returnDate);
        await basePage.clickSearchButton();
    });

    await test.step('Validate if the search results page is displayed', async () => {
        const newPage = await pagePromise;
        await newPage.waitForLoadState('load');
        await expect(newPage).toHaveURL(/.*flight-search.*/);
    });
})

test('[TS003] Negative Tests Validation of Search Flights Functionality', async ({ page, context }) => {
  
    //Page instantiation
    const pagePromise = context.waitForEvent('page');
    const basePage = new BasePage(page);

    await test.step('Navigate to base URL', async () => {
        await page.goto(process.env.BASE_URL!);
    });

    await test.step('Validate Search with blank Origin Field', async () => {
        await basePage.clearInputField(); // Clear the origin input field before entering a new value
        await basePage.clickSearchButton();
        await basePage.validateAlertMessage('Origin');
        await basePage.dismissAlertMessage();
        await basePage.fillandSelectFromDropdown(basePage.originInput, testData.FlightSearch.origin);
    });

    await test.step('Validate Search with blank To Field', async () => {
        await basePage.clickSearchButton();
        await basePage.validateAlertMessage('Destination');
        await basePage.dismissAlertMessage();
        await basePage.fillandSelectFromDropdown(basePage.destinationInput, testData.FlightSearch.destination);
    });

    await test.step('Validate Search with blank Departure Date and Return Field', async () => {
        await basePage.clickSearchButton();
        await basePage.validateAlertMessage('Depart Date');
        await basePage.validateAlertMessage('Return Date');
        await basePage.dismissAlertMessage();
        await basePage.clickDepartureDateButton();
        await basePage.selectDateFromCalendar(testData.FlightSearch.departureDate);
        await basePage.selectDateFromCalendar(testData.FlightSearch.returnDate);
        await basePage.clickSearchButton();

    });

    await test.step('Validate if the search results page is displayed', async () => {
        const newPage = await pagePromise;
        await newPage.waitForLoadState('load');
        await expect(newPage).toHaveURL(/.*flight-search.*/);
    });   
})

test('[TS004] Validation of Search Flights Results', async ({ page, context }) => {
  
    //Page instantiation
    const pagePromise = context.waitForEvent('page');
    const basePage = new BasePage(page);

    await test.step('Navigate to base URL', async () => {
        await page.goto(process.env.BASE_URL!);
    });

    await test.step('Populate required fields to search for a flight', async () => {
        await basePage.clearInputField(); // Clear the origin input field before entering a new value
        await basePage.fillandSelectFromDropdown(basePage.originInput, testData.FlightSearch.origin);
        await basePage.fillandSelectFromDropdown(basePage.destinationInput, testData.FlightSearch.destination);
        await basePage.selectDateFromCalendar(testData.FlightSearch.departureDate);
        await basePage.selectDateFromCalendar(testData.FlightSearch.returnDate);
        await basePage.clickSearchButton();
    });

    await test.step('Validate if the search results page is displayed', async () => {
        const newPage = await pagePromise;
        await newPage.waitForLoadState('load');
        await expect(newPage).toHaveURL(/.*flight-search.*/);
    });

    await test.step('Validate if the search results contents were displayed correctly', async () => {
        // Add assertions to validate the search results
    });
});