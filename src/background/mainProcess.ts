import {
  NUMBER_OF_POSTS,
  SLEEP_TIME_AFTER_POST_CREATION
} from "~constants/config"
import { CHATGPT_URL } from "~constants/urls"
import type { Article } from "~types.ts/article"

import { clickSearchButton } from "./clickSearchButton"
import { createPost } from "./createPost"
import { generateHeadlines } from "./generateHeadlines"
import { generateArticle } from "./generatePosts"
import { createBrowser } from "./helpers/createBrowser"
import { sleep } from "./helpers/sleep"
import { waitForDOMStability } from "./helpers/waitForDOMStability"
import { parseHeadlines } from "./parseHeadlines"
import { parseLastPost } from "./parseLastPost"

export const mainProcess = async () => {
  const createBrowserResult = await createBrowser(CHATGPT_URL)
  if (!createBrowserResult.success) {
    console.error("Failed to create browser")
    return
  }
  const { tabId, page } = createBrowserResult
  /* const article = await parseLastPost(page)
  console.log("Article parsed", article)
  return */
  await clickSearchButton(page)
  await generateHeadlines(page)
  await waitForDOMStability(page)
  const headlines = await parseHeadlines(page)
  const articles: Article[] = []
  for (const headline of headlines.slice(0, NUMBER_OF_POSTS)) {
    await waitForDOMStability(page)
    //await sleep(3000)
    await generateArticle(page, headline)
    await waitForDOMStability(page)
    //await sleep(3000)

    const article = await parseLastPost(page)
    if (!article || !article.headline || !article.article) {
      console.error("Error parsing last article", article)
      continue
    }
    articles.push(article)
  }
  console.log({ articles })

  for (const article of articles) {
    await createPost(page, article)
    await sleep(SLEEP_TIME_AFTER_POST_CREATION)
  }

  console.log("done")
  try {
    await chrome.tabs.remove(tabId)
  } catch (error) {
    console.error("Error during cleanup:", error)
  }
}
