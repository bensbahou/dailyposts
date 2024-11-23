export type BearValues = {
  bears: number
  bigBears: number
}

export const initialBearState = {
  bears: 0,
  bigBears: 0
} as const satisfies BearValues
