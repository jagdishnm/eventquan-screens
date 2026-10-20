import { A2WholeSaturday } from './A2WholeSaturday'
import { A3TailgateDetail } from './A3TailgateDetail'
import { A4HomeKickoff } from './A4HomeKickoff'
import { B2EventsList } from './B2EventsList'
import { B3AthleticsMap } from './B3AthleticsMap'
import { B4WalkToKyle } from './B4WalkToKyle'
import { C2KyleFieldFull } from './C2KyleFieldFull'
import { C3KyleFieldQuiet } from './C3KyleFieldQuiet'
import { C4AthleticsNode } from './C4AthleticsNode'
import type { FlowScreen } from './types'

/** Flow screens for explorations A–C. */
export const FLOWS_ABC: FlowScreen[] = [
  { id: 'A2', name: 'A2 · Your whole Saturday', Component: A2WholeSaturday },
  { id: 'A3', name: 'A3 · Event detail from the timeline', Component: A3TailgateDetail },
  { id: 'A4', name: 'A4 · Home at 5:20 PM', Component: A4HomeKickoff },
  { id: 'B2', name: 'B2 · List view', Component: B2EventsList },
  { id: 'B3', name: 'B3 · Athletics, Reed Arena selected', Component: B3AthleticsMap },
  { id: 'B4', name: 'B4 · Walking directions to Kyle Field', Component: B4WalkToKyle },
  { id: 'C2', name: 'C2 · Kyle Field, sheet fully expanded', Component: C2KyleFieldFull },
  { id: 'C3', name: 'C4 · A quiet day', Component: C3KyleFieldQuiet },
  { id: 'C4', name: 'C3 · The parent node: Athletics', Component: C4AthleticsNode },
]
