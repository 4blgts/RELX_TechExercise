# TypeScript Playwright Framework

This repository contains a sample Playwright automation framework written in TypeScript.

## What this project includes

- End-to-end UI tests written with Playwright
- Page Object Model (POM) structure for better test maintainability
- Test data stored in JSON files
- Dynamic user creation using Faker
- Cross-browser execution with Chromium, Firefox, and WebKit
- HTML test reporting

## Project structure

- tests/ - Playwright test specifications
- src/pages/ - Page Object Model classes
- src/data/ - Test data files
- playwright.config.ts - Playwright configuration
- playwright-report/ - Generated HTML reports

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browser binaries:
   ```bash
   npx playwright install
   ```

## Running tests

Run the full suite:

```bash
npx playwright test
```

Run a specific browser project:

```bash
npx playwright test --project=chromium
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## Reports

HTML reports are generated after each run and can be viewed with:

```bash
npx playwright show-report
```

## Environment configuration

The framework uses the following base URL by default:

- 

You can override it by setting the BASE_URL environment variable.
