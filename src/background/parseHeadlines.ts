import type { Page } from "puppeteer-core/lib/esm/puppeteer"

import { CHATGPT_SELECTORS } from "~constants/selectors"

export const parseHeadlines = async (
  page: Page,
  maxRetries: number = 5
): Promise<string[]> => {
  let retries = 0
  while (true) {
    try {
      await page.waitForSelector(CHATGPT_SELECTORS.JSON_CODES_SELECTOR)
      const jsonCode = await page.waitForSelector(
        CHATGPT_SELECTORS.JSON_CODES_SELECTOR
      )
      const headlinesJsonString = await jsonCode.evaluate((el) => {
        const regex =
          /(:contentReference\[oaicite:\d+\]\{index=\d+\})|(:contentReference\[oaicite:\d+\])/g
        const headlines = el.textContent
          .replace(regex, "")
          .replace(/^"|"$/g, "")
        return headlines
      })
       
      console.log("headlinesJsonString", headlinesJsonString)
      return JSON.parse(headlinesJsonString).map(
        (headlineWithUrl: { headline: string }) => headlineWithUrl.headline
      )
    } catch (error) {
      console.log("Error in parseHeadlines", error)
      if (retries > maxRetries) {
        throw error
      }
      retries++
      await page.reload()
    }
  }
}
