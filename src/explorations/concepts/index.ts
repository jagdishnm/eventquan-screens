import { CONCEPT_DAY } from './day'
import { DAY_STATES } from './day/states'
import { CONCEPT_LIVE } from './live'
import { LIVE_STATES } from './live/states'
import { CONCEPT_MAP } from './map'
import { MAP_STATES } from './map/states'
import { CONCEPT_PRINT } from './print'
import { PRINT_STATES } from './print/states'

export type { Concept, ConceptStage } from './types'

/** The four whole-app concepts, in canvas row order. Each one treats every brief stage its own way. */
export const CONCEPTS = [CONCEPT_DAY, CONCEPT_MAP, CONCEPT_LIVE, CONCEPT_PRINT]

/** The concept the pitch leads with; the other three are shown as also considered. */
export const LEAD_CONCEPT = 'live'

/** Each concept's failure states (wrong email, location, no signal, quiet day), keyed by concept. */
export const CONCEPT_STATES = { day: DAY_STATES, map: MAP_STATES, live: LIVE_STATES, print: PRINT_STATES }
