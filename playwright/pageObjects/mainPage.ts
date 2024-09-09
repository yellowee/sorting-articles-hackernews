import { expect, Page, Locator } from '@playwright/test'

export class MainPage {
    readonly page: Page

    constructor(
        page: Page,
        readonly articlesTable = page.locator('[data-testid="hnmain"]'),
        readonly moreLink = page.locator('.morelink'),
        readonly articleRow = page.locator('.athing'),
        readonly articleTitle = page.locator('.title'),
        readonly articleIndex = page.locator('.rank'),
        readonly articleAge = page.locator('span.age')
    ) {
        this.page = page
    }

    async openThePage() {
        await this.page.goto('/')
        return this
    }
    async validateArticleListVisible() {
        await expect(this.articlesTable).toBeVisible()
        return this
    }

    async assertLastArticleIndex(expectedLastIndex: string) {
        await expect(this.articleIndex.last()).toHaveText(expectedLastIndex)
        await expect(this.articleRow).toHaveCount(30)
        return this
    }

    async getArticleTimestamps({
        lastRecord,
    }: {
        lastRecord: number
    }): Promise<string[]> {
        let allTimestamps: string[] = []
        let currentPage = 1

        while (true) {
            const timestamps = await this.articleRow.evaluateAll(
                (elements, selector) => {
                    return elements
                        .map((element) => {
                            const ageElement = element.querySelector(selector)
                            return ageElement
                                ? ageElement.getAttribute('title')
                                : null
                        })
                        .filter((title) => title !== null) as string[]
                },
                'span.age'
            )

            allTimestamps = allTimestamps.concat(timestamps)

            if (allTimestamps.length >= lastRecord) {
                break
            }

            if (currentPage < Math.ceil(lastRecord / 30)) {
                await this.clickShowMore()
                currentPage++
            } else {
                break
            }
        }

        return allTimestamps.slice(0, lastRecord)
    }

    async assertArticlesSortedNewestToOldest(
        numberOfRecords: string[]
    ): Promise<void> {
        const timestamps = await this.getArticleTimestamps({
            lastRecord: numberOfRecords.length,
        })
        const dates = timestamps.map((timestamp) => new Date(timestamp))
        const expectedDates = numberOfRecords.map(
            (timestamp) => new Date(timestamp)
        )
        expect(dates).toEqual(expectedDates)
    }

    async clickShowMore() {
        await this.moreLink.click()
        return this
    }
}
