const { defineConfig, devices } = require('@playwright/test');

require('dotenv').config();
const baseUrl = process.env.BASE_URL
module.exports = defineConfig({
    testDir: 'playwright/tests',
    fullyParallel: true,
    retries: 1,
    workers: 1,
    reporter: 'html',
    expect: { timeout: 2000 },
    maxFailures: 2,
    timeout: 3000,
    use: {
        baseURL: baseUrl,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})

