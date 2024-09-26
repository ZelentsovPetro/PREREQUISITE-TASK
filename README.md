# Test Automation Framework

## Based on
* [Node.js](https://nodejs.org/en/) as a JavaScript runtime;
* [Playwright](https://playwright.dev) as a main automation tool.

## Getting started
1. Install:
  * [Git](https://git-scm.com/downloads);
  * [Node.js](https://nodejs.org/en/) (requires v.18).
2. Clone this repository to any folder.
3. Open repository folder `cd PREREQUISITE-TASK`.
4. Install dependencies `npm install`.
5. Install Playwright `npx playwright install`
6. Create local `.env` file in the root of this project for managing test config (example provided below):
7. Run some tests (more about CLI options you can read below).


## CLI options
Usage:
* `npm run tests` — runs all existing tests against all browser configurations.
* `npm test -- --headed --project=[BROWSER] ` — runs specific tests by browsers `BROWSER`.

Options:
* `--headed` — to render browser window and see all actions (non-headless mode).
* `--project` — to pick one of existing browsers (`chrome`, `firefox`, `safari`).

Examples:
* `npm test -- --project=safari` — runs all test against Safari browser (in headless mode).
