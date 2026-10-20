import type { ComponentType } from 'react'

/** One screen in an exploration's flow. `id` is the variant letter plus step, e.g. "A2". */
export type FlowScreen = {
  id: string
  /** Short canvas name, e.g. "A2 · Your whole Saturday". */
  name: string
  Component: ComponentType
  /** Game day screens sit on the night background. */
  dark?: boolean
}
