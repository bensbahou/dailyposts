import { Page } from "puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js"

export const typeMultilineText = async (page: Page, text: string) => {
  const lines = text.split("\n")
  for (const [index, line] of lines.entries()) {
    await page.keyboard.type(line)
    if (index < lines.length - 1) {
      // Use Shift+Enter for line breaks instead of just Enter
      await page.keyboard.down("Shift")
      await page.keyboard.press("Enter")
      await page.keyboard.up("Shift")
    }
  }
}
