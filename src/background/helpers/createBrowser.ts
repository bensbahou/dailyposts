import {
  Browser,
  connect,
  ExtensionTransport,
  Page
} from "puppeteer-core/lib/esm/puppeteer/puppeteer-core-browser.js"

type CreateBrowserResult =
  | {
      success: true
      tabId: number
      page: Page
      browser: Browser
    }
  | {
      success: false
      tabId: number
    }

export const createBrowser = async (
  url: string
): Promise<CreateBrowserResult> => {
  const tab = await chrome.tabs.create({
    url,
    active: false
  })
  console.log("tab", tab, tab.id)
  try {
    const browser = await connect({
      transport: await ExtensionTransport.connectTab(tab.id),
      defaultViewport: null
    })
    console.log("browser", browser)
    const [page] = await browser.pages()
    return { success: true as const, tabId: tab.id, page, browser }
  } catch (error) {
    console.error("Connection error:", error)
    return { success: false as const, tabId: tab.id }
  }
}
