import type { ComponentType } from 'react'

/** One of the six brief stages (1 Sign in … 6 Quick Event), or 7 for Profile. */
export type ConceptStage = {
  n: number
  /** Brief stage name, e.g. "University Home". */
  stage: string
  /** This concept's name for its screen, e.g. "The straw". */
  title: string
  day: string
  time: string
  /** One or two plain sentences for the journey caption. */
  note: string
  Screen: ComponentType
  /** Game day and other dark screens sit on the night background. */
  dark?: boolean
}

/** A whole-app concept: its own treatment of every brief stage, in journey order. */
export type Concept = {
  /** Route and storyboard key, e.g. "day". */
  key: string
  /** 1–4, the canvas row order. */
  n: number
  name: string
  /** The exploration letters this concept grew from, e.g. ['A', 'F']. */
  from: string[]
  headline: [string, string]
  lede: string
  /** The one visual idea that repeats on every screen, in a sentence. */
  signature: string
  stages: ConceptStage[]
}
