import { FLOWS_ABC } from './abc'
import { FLOWS_DEF } from './def'
import { FLOWS_GHI } from './ghi'

export type { FlowScreen } from './types'

/** Every exploration flow screen, in canvas order (A2…I4). */
export const FLOWS = [...FLOWS_ABC, ...FLOWS_DEF, ...FLOWS_GHI]
