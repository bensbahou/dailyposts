import JSON5 from "json5"
import type { Page } from "puppeteer-core/lib/esm/puppeteer"

import { CHATGPT_SELECTORS } from "~constants/selectors"
import type { Article } from "~types.ts/article"

import { sleep } from "./helpers/sleep"

export const parseLastPost = async (page: Page, maxRetries = 5) => {
  let retries = 0
  while (retries < maxRetries) {
    try {
      await page.waitForSelector(CHATGPT_SELECTORS.JSON_CODES_SELECTOR)
      const jsonCodes = await page.$$(CHATGPT_SELECTORS.JSON_CODES_SELECTOR)
      const lastJsonCode = jsonCodes[jsonCodes.length - 1]

      const article = await lastJsonCode.evaluate((el) => {
        const regex =
          /(:contentReference\[oaicite:\d+\]\{index=\d+\})|(:contentReference\[oaicite:\d+\])/g
        const texts = el.querySelectorAll(
          ".hljs-string"
        ) as NodeListOf<HTMLElement>
        const keysDivs = el.querySelectorAll(
          ".hljs-attr"
        ) as NodeListOf<HTMLElement>

        const textContent = el.textContent || ""
        let currentIndex = 0
        let quoteCount = 0
        let startIndex = -1

        while (quoteCount < 7 && currentIndex < textContent.length) {
          if (textContent[currentIndex] === '"') {
            quoteCount++
            if (quoteCount === 7) {
              startIndex = currentIndex + 1
            }
          }
          currentIndex++
        }

        const lastQuoteIndex = textContent.lastIndexOf('"')
        const extractedText = textContent
          .substring(startIndex, lastQuoteIndex)
          .trim()
        console.log("Extracted text", extractedText)

        return {
          headline: texts[0].textContent
            .replace(regex, "")
            .replace(/^"|"$/g, ""),
          article: extractedText.replace(regex, "").replace(/^"|"$/g, "")
        } as Article
      })
      console.log("Article parsed", article.article)

      return article
    } catch (error) {
      await sleep(3000)
      console.error("Error parsing last post", error)
      retries++
    }
  }
}
