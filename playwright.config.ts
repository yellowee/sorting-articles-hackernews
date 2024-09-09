import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    testDir: 'playwright/tests',
    fullyParallel: true,
    retries: 1,
    workers: 1,
    reporter: 'html',
    expect: { timeout: 2000 },
    maxFailures: 2,
    timeout: 3000,
    use: {
        baseURL: process.env.BASE_URL || 'http://localhost',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'e2e',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})

