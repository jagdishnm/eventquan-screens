import { CONCEPT_DAY } from './day'
import { CONCEPT_LIVE } from './live'
import { CONCEPT_MAP } from './map'
import { CONCEPT_PRINT } from './print'

export type { Concept, ConceptStage } from './types'

/** The four whole-app concepts, in canvas row order. Each one treats every brief stage its own way. */
export const CONCEPTS = [CONCEPT_DAY, CONCEPT_MAP, CONCEPT_LIVE, CONCEPT_PRINT]

/** The concept the pitch leads with; the other three are shown as also considered. */
export const LEAD_CONCEPT = 'live'
