export const CHATGPT_SELECTORS = {
  SEND_BUTTON: 'button[data-testid="send-button"]',
  SEARCH_WEB_BUTTON: 'button[aria-label="Search the web"]',
  PROMPT_TEXTAREA_EDITABLE_DIV: "#prompt-textarea",
  STOP_STREAMING_BUTTON: "button[data-testid='stop-button']",
  JSON_CODES_SELECTOR: "code.language-json",
  ASSISTANT_MESSAGE: "div[data-message-author-role='assistant']"
} as const

export const BLOG_SELECTORS = {
  TITLE_INPUT: "#title",
  CONTENT_INPUT: "#tinymce",
  SAVE_DRAFT_BUTTON: "#save-post",
  CATEGORY_CHECKLIST: "#categorychecklist",
  FEATURED_CATEGORY_CHECKBOX: "#in-category-1392-2",
  TEXT_EDITOR_IFRAME: "#content_ifr",
  TEXT_EDITOR_BODY: "body#tinymce"
} as const
