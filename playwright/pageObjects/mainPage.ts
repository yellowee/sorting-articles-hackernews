import { expect, Page } from '@playwright/test'

export class MainPage {
    readonly articlesTable
    readonly moreLink
    readonly articleRow
    readonly articleTitle
    readonly articleIndex
    readonly articleAge

    constructor(page: Page) {
        this.articlesTable = page.locator('#hnmain')
        this.moreLink = page.locator('.morelink')
        this.articleRow = page.locator('.athing')
        this.articleTitle = page.locator('.title')
        this.articleIndex = page.locator('.rank')
        this.articleAge = page.locator('.age')

    }

    async validateArticleListVisible() {
        expect(this.articlesTable).toBeVisible()
        return this
    }

    async validateNumberOfArticlesVisible(number: string) {
        expect(this.articleIndex.last()).toHaveText(number)
        expect(this.articleRow).toHaveCount(30)

        return this
    }

    async articlesSortedFromNewestToOldest() {
        await this.articleAge
        return this
    }

    async validateArticlesSortedFromNewestToOldestFromOneTOHundredRecord(index: string) {
        // const hundredRecord = this.articleRow.getByText
        await this.validateNumberOfArticlesVisible('30')
        await this.clickShowMore()
        await this.validateNumberOfArticlesVisible('60')
        await this.clickShowMore()
        await this.validateNumberOfArticlesVisible('90')
        await this.clickShowMore()
        await this.validateNumberOfArticlesVisible('120')
        await this.clickShowMore()


        return this
    }

    async clickShowMore() {
        await this.moreLink.click()
        return this
    }
}
