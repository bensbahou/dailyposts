import type { Page } from "puppeteer-core/lib/esm/puppeteer/index-browser"

import { BLOG_SELECTORS } from "~constants/selectors"
import { BLOG_URL } from "~constants/urls"
import type { Article } from "~types.ts/article"

import { pasteContent } from "./helpers/pasteContent"
import { sleep } from "./helpers/sleep"

export const createPost = async (page: Page, post: Article) => {
  console.log("Creating post : ", post.headline)

  await page.goto(BLOG_URL)
  await sleep(1000)
  try {
    const titleInput = await page.locator(BLOG_SELECTORS.TITLE_INPUT)
    console.log({ titleInput })
  } catch (error) {
    console.log("Error in title input", error)
  }

  await page.evaluate(
    (selector, value) => {
      const element = document.querySelector(selector) as HTMLInputElement
      console.log("page.evaluate", element, selector)
      element.value = value
    },
    BLOG_SELECTORS.TITLE_INPUT,
    post.headline
  )

  // Wait for iframe to load and switch context
  const iframe = await page.waitForSelector(BLOG_SELECTORS.TEXT_EDITOR_IFRAME)
  const frame = await iframe?.contentFrame()
  if (!frame) throw new Error("Could not find content iframe")

  // Type content within iframe context

  await pasteContent(frame, post.article, BLOG_SELECTORS.TEXT_EDITOR_BODY)

  await page.waitForSelector(BLOG_SELECTORS.FEATURED_CATEGORY_CHECKBOX)
  await page.click(BLOG_SELECTORS.FEATURED_CATEGORY_CHECKBOX)
  await page.waitForSelector(BLOG_SELECTORS.SAVE_DRAFT_BUTTON)
  await page.click(BLOG_SELECTORS.SAVE_DRAFT_BUTTON)
}
