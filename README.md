# Playwright TypeScript Test Framework

This is a sample test framework using Playwright and TypeScript to run UI and API tests for weather.com.

## Project Structure

- `tests/`: Contains the test files.
  - `ui/`: Contains the UI tests.
  - `api/`: Contains the API tests.
- `pages/`: Contains page objects for the UI tests.
- `utils/`: Contains utility functions.
- `playwright.config.ts`: The Playwright configuration file.
- `tsconfig.json`: The TypeScript configuration file.
- `package.json`: The project's dependencies and scripts.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up the API key:**
   The API tests use the OpenWeatherMap API. You will need to sign up for a free API key at [https://openweathermap.org/](https://openweathermap.org/).
   Once you have your API key, you can set it as an environment variable:
   ```bash
   export API_KEY=your_api_key
   ```

## Running the Tests

- **Run all tests:**
  ```bash
  npm test
  ```
- **Run only the UI tests:**
  ```bash
  npm run test:ui
  ```
- **Run only the API tests:**
  ```bash
  npm run test:api
  ```
