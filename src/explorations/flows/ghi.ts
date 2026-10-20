import { G2ClaimCard } from './G2ClaimCard'
import { G3CardLit } from './G3CardLit'
import { G4MadeTheT } from './G4MadeTheT'
import { H2MscBoard } from './H2MscBoard'
import { H3TakeTab } from './H3TakeTab'
import { H4AllTabsGone } from './H4AllTabsGone'
import { I2MidnightYell } from './I2MidnightYell'
import { I3TraditionDone } from './I3TraditionDone'
import { I4RingDay } from './I4RingDay'
import type { FlowScreen } from './types'

/** Flow screens for explorations G–I. */
export const FLOWS_GHI: FlowScreen[] = [
  { id: 'G2', name: 'G1 · Claim your card', Component: G2ClaimCard, dark: true },
  { id: 'G3', name: 'G3 · Card lit', Component: G3CardLit, dark: true },
  { id: 'G4', name: 'G4 · You made the T', Component: G4MadeTheT, dark: true },
  { id: 'H2', name: 'H2 · The MSC board', Component: H2MscBoard },
  { id: 'H3', name: 'H3 · Taking a tab', Component: H3TakeTab },
  { id: 'H4', name: 'H4 · All tabs gone', Component: H4AllTabsGone },
  { id: 'I2', name: 'I2 · Midnight Yell', Component: I2MidnightYell },
  { id: 'I3', name: 'I3 · Tradition done', Component: I3TraditionDone },
  { id: 'I4', name: 'I4 · Ring Day progress', Component: I4RingDay },
]
