# Instruction how to setup an automation project and run tests

## Project description

Playwright E2E test suite contains a Playwright E2E test suite project for "Povio Assignment - Automated QA"
Scope of the project is the frontend "Name of application".
Composition and backend services are not tested in this project directly (API testing) but are tested circumstantially.

## Requirements

- Node.js
- VS Code or similar Javascript code editor
- GitHub account

## Getting started

1. Download and install Node on your local machine
2. Create a local folder and open a terminal from it's location
3. Clone git repository:
   ```
   git clone https://github.com/GoranRosulj/Povio.git
   ```
4. Open repository in VS Code as a new project
5. Install dependencies:
   ```
   npm install
   ```

## Test execution

### Local test run

npx playwright test

### GitHub Actions test run
1. Navigate to the "Actions" tab in the repository
2. Select "Manual Test Run" workflow
3. Click "Run workflow"
4. Choose your preferred browser (chromium, firefox, or webkit)
5. Click "Run workflow" to start the tests

## Test Reports
- Local test reports are generated in the `playwright-report/` directory
- GitHub Actions test reports are automatically saved as artifacts and can be accessed:
  1. Go to the completed workflow run
  2. Scroll to the "Artifacts" section
  3. Download the "playwright-report-{browser}" file