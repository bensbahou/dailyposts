import type { Page } from "puppeteer-core/lib/esm/puppeteer"

import { JSON_FORMAT_ARTICLE } from "~constants/prompt"
import { CHATGPT_SELECTORS } from "~constants/selectors"
import { usePromptsStore } from "~stores/usePromptsStore"

import { pasteContent } from "./helpers/pasteContent"

export const generateArticle = async (page: Page, headline: string) => {
  console.log("Generating post for headline:", headline)

  while (true) {
    try {
      await pasteContent(
        page,
        usePromptsStore
          .getState()
          .GENERATE_PROMPT.replaceAll("{HEADLINE}", headline) +
          JSON_FORMAT_ARTICLE,
        CHATGPT_SELECTORS.PROMPT_TEXTAREA_EDITABLE_DIV
      )

      const sendButton = page.locator(CHATGPT_SELECTORS.SEND_BUTTON)
      // check if disabled

      await sendButton.click()
      break
    } catch (error) {
      console.log("Error in generatePosts", error)
      await page.reload()
    }
  }
}
