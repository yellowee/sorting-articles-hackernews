import { expect, Page, Locator } from '@playwright/test'
export class MainPage {
    constructor(
        readonly page: Page,
        readonly articlesTable = page.locator('#hnmain'),
        readonly moreLink = page.locator('.morelink'),
        readonly articleRow = page.locator('.athing'),
        readonly articleTitle = page.locator('.title'),
        readonly articleIndex = page.locator('.rank'),
        readonly articleAge = page.locator('span.age')
    ) {}

    async openThePage() {
        await this.page.goto('/')
    }
    validateArticleListVisible() {
        expect(this.articlesTable).toBeVisible()
    }

    assertNumberOfTheLastArticle(expectedLastArticleText: string) {
        expect(this.articleIndex.last()).toHaveText(
            `${expectedLastArticleText}.`
        )
        expect(this.articleRow).toHaveCount(30)
    }
    async getArticleTimestamps() {
        const articlesTimestampList = await this.articleAge.all()
        let timestamps: string[] = []

        for (const articleTimestamp of articlesTimestampList) {
            const timestamp = await articleTimestamp.getAttribute('title')
            if (timestamp !== null) {
                timestamps.push(timestamp)
            }
        }
        const timestampsList = timestamps.map((timestamp) => {
            return new Date(timestamp)
        })
        return timestampsList
    }

    async clickShowMore() {
        await this.moreLink.click()
    }

    isSortedDescending(
        dates: Date[],
    ): boolean {
        return dates.every((date, index) => {
            if(index===0){
                return true
            }
            if (date <= dates[index - 1]) {
                return true
            }
        })
    }
}
