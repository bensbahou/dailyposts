import type { Page } from "puppeteer-core/lib/esm/puppeteer"

import { CHATGPT_SELECTORS } from "~constants/selectors"

export const clickSearchButton = async (page: Page) => {
  while (true) {
    try {
      const searchTheWebButton = page.locator(
        CHATGPT_SELECTORS.SEARCH_WEB_BUTTON
      )
      await searchTheWebButton.click()
      break
    } catch (error) {
      console.log("Error in clickSearchButton", error)
      await page.reload()
    }
  }
}
