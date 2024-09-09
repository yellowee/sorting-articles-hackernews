// @ts-check
const { defineConfig, devices } = require('@playwright/test');

require('dotenv').config();
const baseUrl = process.env.BASE_URL
module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */


    reporter: 'html',
    use: {
        baseURL: baseUrl,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})

