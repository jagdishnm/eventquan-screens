import type { ComponentType } from 'react'
import { DayLocation } from './DayLocation'
import { DayOffline } from './DayOffline'
import { DayQuiet } from './DayQuiet'
import { DaySignInError } from './DaySignInError'

export { DayLocation, DayOffline, DayQuiet, DaySignInError }

export type DayState = { key: string; title: string; note: string; Screen: ComponentType; dark?: boolean }

/** "The Day" when things go wrong or go quiet: error, permission, offline, empty. The straw keeps telling time. */
export const DAY_STATES: DayState[] = [
  {
    key: 'sign-in-error',
    title: 'NetID not found',
    note: 'The @tamu.edu is fixed, so the error left is a typo: “We couldn’t find jcarterr@tamu.edu” keeps the text, offers “Use jcarter” and holds the gold button until we find you.',
    Screen: DaySignInError,
  },
  {
    key: 'location',
    title: 'Before the location prompt',
    note: 'Every sheet on the straw shows an empty “walk” slot, so the ask explains itself: walking times on your Saturday. Not now keeps the whole day, just without walks.',
    Screen: DayLocation,
  },
  {
    key: 'offline',
    title: 'No signal at Kyle Field',
    note: 'The clock and NOW keep moving because they’re time, not data. The plan, ticket and gate were saved at 6:31; the score pauses at 7–7 and says so. Retry is the gold action.',
    Screen: DayOffline,
    dark: true,
  },
  {
    key: 'quiet',
    title: 'A quiet Tuesday',
    note: 'Nothing on your plan today, said plainly. Two small things are on now, the rail folds through Friday, and the gold action sets a reminder for Saturday’s gates.',
    Screen: DayQuiet,
  },
]
