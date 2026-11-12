# Playwright Automation Framework - SauceDemo Application
A test automation framework built using Playwright & TypeScript, following the Page Object Model (POM) design pattern and separation of concerns.  
This project demonstrates my approach to building maintainable test automation frameworks, with an emphasis on modular architecture, reusable components, test isolation, and efficient execution.  
It automates the end-to-end purchase flow on [SauceDemo](https://www.saucedemo.com/), covering login, product selection, cart validation, checkout, order confirmation and logout.  


## Tech Stack
| Technology | Purpose |
|---|---|
| Playwright | Browser automation and testing |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| JSON | Test data management |
| GitHub Actions | CI/CD integration |
| BrowserStack | Cloud testing configuration |


## What's in it (Key Features)
- **Page Object Model (POM):** Separate classes for application pages, encapsulating locators and page-specific actions.
- **Reusable UI Components:** Common elements such as the application header and side menu are maintained separately to reduce duplication.
- **Authentication Management:** A dedicated setup project handles login and saves browser storage state, allowing purchase tests to reuse the authenticated session instead of repeating login operations.
- **Data-Driven Testing:** Product details and checkout data are maintained separately in JSON files.
- **Test Organization:** Playwright tags (`@smoke`, `@regression` and `@e2e`) are used to categorize test scenarios.
- **Environment Management:** Environment-specific settings are handled through a centralized configuration module.
- **Reporting and Debugging:** HTML and list reports are configured, with trace collection on the first retry.
- **CI/CD Integration:** GitHub Actions automates test execution on pushes and pull requests targeting `main`.


## Project Layout
The framework follows a modular structure to promote separation of concerns, reusability, and maintainability.
```text
auto-playwright/
|
|--- .github/
|    |--- workflows/
|         |--- playwright.yml
|
|--- components/
|    |--- sauceDemoComponents/
|        |--- SDHeader.ts
|        |--- SDSideMenu.ts
|
|--- config/
|    |--- env.ts
|
|--- pages/
|    |--- sauceDemoPages/
|        |--- SDBasePage.ts
|        |--- SDLoginPage.ts
|        |--- SDProductsPage.ts
|        |--- SDCartPage.ts
|        |--- SDCheckoutPage.ts
|        |--- SDCheckoutOverviewPage.ts
|        |--- SDConfirmationPage.ts
|
|--- test-data/
|    |--- SDTestData.json
|
|--- tests/
|    |--- setup/
|    |    |--- login.setup.ts
|    |--- sauceDemoPurchase.spec.ts
|
|--- utils/
|    |---ProductSetupHelper.ts
|
|--- .gitignore
|--- browserstack.yml
|--- package-lock.json
|--- package.json
|--- playwright.config.ts
|--- tsconfig.json
```

### Design Principles  
**1. Separation of Concerns**  
Page-specific locators and actions are maintained in page objects, while common UI elements are encapsulated in reusable components. Test scenarios focus on application workflows rather than implementation details.  
**2. Reusability**  
Common UI interactions and operations are encapsulated in reusable classes and components to reduce duplication and simplify maintenance.  
**3. Maintainability**  
Test data and environment-specific configurations are maintained separately from test implementation, allowing changes without modifying the core test logic.  
**4. Authentication Management**  
A dedicated setup project handles authentication and persists the browser storage state. Purchase tests reuse this state, keeping authentication setup separate from individual test scenarios.  


## Engineering decisions and challenges  
### 1. Test isolation and shared test data  
One thing I learned while working with Playwright was that browser isolation doesn't automatically guarantee test-data isolation.  
Playwright creates a separate `BrowserContext` for each test, keeping browser sessions isolated. However, tests can still interfere with each other when they modify shared backend data.  
For example, one test might change a user's settings while another test expects the default configuration. Even though both tests run in separate browser contexts, they can affect the same backend user.  
This helped me understand that reliable parallel execution requires more than isolated browser sessions. Test data must also be independently managed or controlled to avoid unintended dependencies between tests.  

### 2. Keeping the framework simple – removing unnecessary abstraction  
I initially introduced a Page Manager to centralize page-object creation. However, as I worked with the framework, I found that navigating through multiple abstraction layers made debugging and understanding test execution more complicated.  
For a framework of this size, the additional abstraction wasn't providing enough value.  
I removed the Page Manager and opted for direct page-object instantiation in the tests.  
```typescript
const productsPage = new SDProductsPage(page);
const cartPage = new SDCartPage(page);
```
This introduced a few additional constructor calls but made the test flow easier to follow, reduced indirection and simplified debugging.  
It reinforced an important design principle for me: abstractions should solve a real problem rather than add complexity.

### 3. Authentication and storage state  
Instead of repeating the login process in every test, I implemented a dedicated setup project to authenticate and save the browser storage state to `.auth/user.json`.  
The purchase tests reuse this saved state, avoiding repetitive login operations and keeping authentication setup separate from test scenarios.  
  

## Automated Test Scenarios  
The framework currently covers the following SauceDemo workflows:  
| Feature | Test Scenarios |
|---|---|
| Authentication | Login Setup and session reuse |
| Product Management | Add products to cart | 
| Shopping Cart | Validate selected products |
| Checkout | Enter customer information |
| Order Processing | Validate checkout overview |
| Order Confirmation | Complete purchase and verify confirmation |
| Logout | Verify successful logout |

Tests are organized using Playwright tags:  
- `@smoke` - Selected critical functionality (currently Logout)
- `@regression` - Product selection and checkout validation
- `@e2e` - Complete end-to-end purchase workflow


## Getting Started
You'll need:  
- Node.js (22.x recommended)
- npm
- Git
- Visual Studio Code or a similar IDE

**1. Clone the repository**  
```bash
git clone https://github.com/athiradileep3/auto-playwright.git
cd auto-playwright
```
**2. Install dependencies**  
```bash
npm ci
```
**3. Install Playwright browsers**  
```bash
npx playwright install
```
**4. Configure environment variables**  
Create the required environment file under the `config` directory.  
For example, `config/.env.qa`:  
```env
SD_BASE_URL=https://www.saucedemo.com
SD_USERNAME=your_username
SD_PASSWORD=your_password
```
The framework uses `qa` as the default environment.  
To select another environment, set:  
```bash
SD_TEST_ENV=stage
```
Then create the corresponding `config/.env.stage` file.   
Do not commit actual credentials, populated environment files or authentication state to the repository.


## Running the Tests    
**Run the complete test suite:**  
```bash
npm test
```
**Run tests in headed mode (with the browser visible):**  
```bash
npm run test:headed
```
**Run tests in Playwright UI mode:**  
```bash
npm run test:ui
```
**Run only smoke tests:**  
```bash
npm run test:smoke
```
**Run only regression tests:**  
```bash
npm run test:regression
```
**Run tests in debug mode:**  
```bash
npm run test:debug
```
**Run TypeScript type checking:**  
```bash
npm run typecheck
```
**View the HTML test report:**  
```bash
npm run report
```
## Reports and Debugging  
The framework is configured to generate HTML and list reports. After execution, open the HTML report using:  
```bash
npx playwright show-report
```
Playwright tracing is configured with `on-first-retry`. When a test fails and is retried, the trace helps investigate the failure by showing browser actions, page snapshots and related execution details.  


## CI/CD Integration  
The project uses GitHub Actions for automated test execution.  
The workflow in `.github/workflows/playwright.yml` runs on:
- Pushes to the `main` branch
- Pull requests targeting the `main` branch

The pipeline performs the following steps:
1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies.
4. Installs Playwright browsers.
5. Executes automated tests.
6. Uploads the Playwright HTML report as a workflow artifact.

Environment credentials are supplied through GitHub Actions repository secrets.  
Required secrets:  
- `SD_BASE_URL`
- `SD_USERNAME`
- `SD_PASSWORD`


## Future Enhancements  
Areas I'm considering for the next phase of framework development:  
- **Cross-browser coverage:** Extend execution to Firefox and WebKit alongside Chromium.
- **API integration:** Introduce API-based test data setup and cleanup to reduce repetitive UI operations in selected scenarios.
- **Custom fixtures:** Implement fixtures for dependency injection of page objects and common test setup.
- **Test data management:** Improve test data isolation and introduce more flexible data-driven scenarios.
- **CI/CD quality gates:** Introduce type checking, linting and test execution gates to catch issues before changes are merged.
- **Reporting and diagnostics:** Improve failure analysis through enhanced trace collection, screenshots and reporting.


## Application Under Test
[ SauceDemo ](https://www.saucedemo.com)  
This repository is maintained as a demonstration of Playwright automation framework development, test architecture, and software quality engineering practices.
