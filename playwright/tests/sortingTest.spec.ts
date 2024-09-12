import { expect, test } from '@playwright/test'
import { MainPage } from 'playwright/pageObjects/mainPage'

let mainPage: MainPage

test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    await mainPage.openThePage()
})

test('checks sorting of the first 100 articles from newest to oldest', async () => {
    mainPage.validateArticleListVisible()
    mainPage.assertNumberOfTheLastArticle('30')
    const firstPage = await mainPage.getArticleTimestamps()
    await mainPage.clickShowMore()
    mainPage.assertNumberOfTheLastArticle('60')
    const secondPage = await mainPage.getArticleTimestamps()
    await mainPage.clickShowMore()
    mainPage.assertNumberOfTheLastArticle('90')
    const thirdPage = await mainPage.getArticleTimestamps()
    await mainPage.clickShowMore()
    mainPage.assertNumberOfTheLastArticle('120')
    const fourthPage = await mainPage.getArticleTimestamps()
    const fourPages = firstPage.concat(secondPage, thirdPage, fourthPage)
    expect(fourPages.length).toEqual(120)
    const hundredArticles = fourPages.splice(0, 100)
    expect(hundredArticles.length).toEqual(100)
    const isSortedDescending = mainPage.isSortedDescending(
        hundredArticles,
    )
    expect(isSortedDescending).toBe(true)
})
