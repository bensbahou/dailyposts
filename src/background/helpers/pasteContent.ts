import {
  Frame,
  Page
} from "puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js"

export const pasteContent = async (
  page: Page | Frame,
  content: string,
  selector: string
) => {
  const contentInput = await page.waitForSelector(selector)
  console.log("pasteContent:", { contentInput })

  // Focus the editor first
  await contentInput?.click()
  await page.evaluate(
    (content: string, selector: string) => {
      const dataTransfer = new DataTransfer()

      // Convert \n to actual line breaks if they exist as characters
      const normalizedContent = content.replace(/\\n/g, "\n")

      // Set both plain text and HTML format to preserve formatting
      dataTransfer.setData("text/plain", normalizedContent)
      dataTransfer.setData(
        "text/html",
        normalizedContent.replace(/\n/g, "<br>")
      )

      const pasteEvent = new ClipboardEvent("paste", {
        clipboardData: dataTransfer,
        bubbles: true,
        cancelable: true
      })
      document.querySelector(selector).dispatchEvent(pasteEvent)
    },
    content,
    selector
  )
}
