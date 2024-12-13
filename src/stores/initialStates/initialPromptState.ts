export type PromptsValues = {
  GET_HEADLINES_PROMPT: string
  GENERATE_PROMPT: string
}

export const initialPromptsState = {
  GET_HEADLINES_PROMPT: `Can you provide a list of 5 headlines that are interesting to Republicans. The news can be US political or world news. All of the headlines should be the newest, latest articles from the news sites. No news should be more than 2 days old.`,
  GENERATE_PROMPT: `Write a 600-word article with an engaging and quirky headline for the subject line:
– {HEADLINE} –  
It needs to be in the voice of Tucker Carlson - a bit sarcastic while still being truthful and talking about the news. This should resonate with an audience of people aged 40+ who are conservative Republicans.

Very important : make sure the lengh of the article is aproximatly 600 words`
} as const satisfies PromptsValues
