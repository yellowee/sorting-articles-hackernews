import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') })
const baseUrl = process.env.BASE_URL

export default defineConfig({
    testDir: 'playwright/tests',
    testMatch: /.*spec.ts/,
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
            name: 'e2e',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
})
