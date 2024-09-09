import { expect, test } from '@playwright/test'
import { MainPage } from 'playwright/pageObjects/mainPage'


let mainPage: MainPage

test.beforeEach(async({ page }) => {
    const mainPage = new MainPage(page)
    await mainPage.openThePage()
})

test("checks sorting the first 100 articles from newest to oldest", async() =>{

    const listOfHundredArticleTimestamps = await mainPage.getArticleTimestamps({lastRecord:100})
    console.log(listOfHundredArticleTimestamps)
})
