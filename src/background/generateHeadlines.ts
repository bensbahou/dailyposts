import type { Page } from "puppeteer-core/lib/esm/puppeteer"

import { JSON_FORMAT_HEADLINES } from "~constants/prompt"
import { CHATGPT_SELECTORS } from "~constants/selectors"
import { usePromptsStore } from "~stores/usePromptsStore"

import { pasteContent } from "./helpers/pasteContent"

export const generateHeadlines = async (page: Page) => {
  while (true) {
    try {
      const { GET_HEADLINES_PROMPT } = usePromptsStore.getState()
      await pasteContent(
        page,
        GET_HEADLINES_PROMPT + JSON_FORMAT_HEADLINES,
        CHATGPT_SELECTORS.PROMPT_TEXTAREA_EDITABLE_DIV
      )
      const sendButton = page.locator(CHATGPT_SELECTORS.SEND_BUTTON)

      await sendButton.click()
      break
    } catch (error) {
      console.log("Error in generateHeadlines", error)
      await page.reload()
    }
  }
}
