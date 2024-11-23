import { create } from "zustand"
import { persist } from "zustand/middleware"

import { chromeStorage } from "~lib/chromeStorage"

import {
  initialBearState,
  type BearValues
} from "./initialStates/initialBearState"

interface BearState extends BearValues {
  setBears: (state: Partial<BearValues>) => void
  addABear: () => void
  removeABear: () => void
  reset: () => void
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      ...initialBearState,
      setBears: (state) => set(state),
      addABear: () => set({ bears: get().bears + 1 }),
      removeABear: () => set({ bears: Math.max(0, get().bears - 1) }),
      reset: () => set(initialBearState)
    }),
    {
      name: "useBearStore",
      storage: chromeStorage as any
    }
  )
)
