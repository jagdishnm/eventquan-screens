import type { ComponentType } from 'react'
import { PrintKyleFieldOffline } from './PrintKyleFieldOffline'
import { PrintLocationPrompt } from './PrintLocationPrompt'
import { PrintQuietDay } from './PrintQuietDay'
import { PrintSignInError } from './PrintSignInError'

export { PrintKyleFieldOffline, PrintLocationPrompt, PrintQuietDay, PrintSignInError }

export type PrintState = { key: string; title: string; note: string; Screen: ComponentType; dark?: boolean }

/** "Aggieland in print" when things go wrong or go quiet: error, permission, offline, empty. */
export const PRINT_STATES: PrintState[] = [
  {
    key: 'sign-in-error',
    title: 'A correction',
    note: 'The typo’d tamu.eud stays in the field; a printed correction slip says what it should read, with a one-tap fix, and Continue waits until it does.',
    Screen: PrintSignInError,
  },
  {
    key: 'location',
    title: 'Before the location prompt',
    note: 'A notice pinned to the MSC board says why location helps, in three numbered lines, and that “Not now” still shows every flyer on campus.',
    Screen: PrintLocationPrompt,
  },
  {
    key: 'offline',
    title: 'No signal at Kyle Field',
    note: 'The program page was saved at 6:31 PM and says so. The ticket, seat and yell card still work, with a quiet Retry and the ticket as the one gold action.',
    Screen: PrintKyleFieldOffline,
  },
  {
    key: 'quiet',
    title: 'The Tuesday slip',
    note: 'A one-page edition that admits it: three small things on, then what’s already in Saturday’s sheet and one reminder for gates.',
    Screen: PrintQuietDay,
  },
]
