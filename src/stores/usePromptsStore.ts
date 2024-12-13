import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { chromeStorage } from "~lib/chromeStorage"

import {
  initialPromptsState,
  type PromptsValues
} from "./initialStates/initialPromptState"

interface PromptsState extends PromptsValues {
  setPrompts: (state: Partial<PromptsValues>) => void
  reset: () => void
}

export const usePromptsStore = create<PromptsState>()(
  persist(
    (set) => ({
      ...initialPromptsState,
      setPrompts: (state) => set(state),
      reset: () => set(initialPromptsState)
    }),
    {
      name: "usePromptsStore",
      storage: chromeStorage
    }
  )
)
