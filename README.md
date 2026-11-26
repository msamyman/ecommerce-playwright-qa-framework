# E-Commerce End-to-End & API Test Automation Framework

[![Playwright Tests](https://github.com/YOUR_USERNAME/ecommerce-playwright-qa-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/YOUR_USERNAME/ecommerce-playwright-qa-framework/actions/workflows/playwright.yml)

A scalable, maintainable **UI and REST API test automation framework** built with **Playwright** and **TypeScript**, targeting [Automation Exercise](https://automationexercise.com). Designed using the **Page Object Model (POM)** and **Data-Driven Testing (DDT)** patterns with automated **GitHub Actions CI/CD** execution.

---

## Tech Stack & Architecture

- **Core Framework:** Playwright (`@playwright/test`) with TypeScript
- **Design Patterns:** Page Object Model (POM), Data-Driven Testing (external JSON test data)
- **Test Scope:** Cross-browser UI E2E flows + REST API schema & negative validation
- **CI/CD & Reporting:** GitHub Actions automated pipeline with HTML Report artifacts & Trace Viewer on failure

### Project Structure

```text
ecommerce-playwright-qa-framework/
├── .github/workflows/       # GitHub Actions CI/CD pipeline configuration
├── pages/                   # Page Object Model (POM) classes
│   ├── LoginPage.ts         # Authentication locators & actions
│   ├── ProductsPage.ts      # Product catalog search & cart triggers
│   └── CartPage.ts          # Cart line-item & price assertions
├── test-data/               # Externalized JSON test datasets
│   └── products.json        # Product search & pricing test data
├── tests/
│   ├── ui/                  # End-to-End browser tests
│   │   ├── login.spec.ts
│   │   └── shopping-cart.spec.ts
│   └── api/                 # REST API integration & negative tests
│       └── products-api.spec.ts
├── playwright.config.ts     # Global timeouts, reporters, and browser projects
└── package.json
```
