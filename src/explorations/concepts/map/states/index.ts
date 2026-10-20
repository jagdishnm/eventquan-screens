import type { ComponentType } from 'react'
import { MapLocation } from './MapLocation'
import { MapOffline } from './MapOffline'
import { MapQuiet } from './MapQuiet'
import { MapSignInError } from './MapSignInError'

export { MapLocation, MapOffline, MapQuiet, MapSignInError }

export type MapState = { key: string; title: string; note: string; Screen: ComponentType; dark?: boolean }

/** "The Map" when things go wrong or go quiet: error, permission, offline, empty. */
export const MAP_STATES: MapState[] = [
  {
    key: 'sign-in-error',
    title: 'A typo in the email',
    note: 'jcarter@tamu.eud stays in the field. The map shows an unlit, dashed ring where College Station would light, the fix is one tap, and Continue waits until the email ends in tamu.edu.',
    Screen: MapSignInError,
    dark: true,
  },
  {
    key: 'location',
    title: 'No blue dot yet',
    note: 'Every pin still shows, but a dashed “You?” ring sits where Jordan would be. The sheet says what location adds (walking times, what’s near) before the iOS alert asks.',
    Screen: MapLocation,
  },
  {
    key: 'offline',
    title: 'No signal at Kyle Field',
    note: 'The cached bowl still shows Sec 125, Gate 2 and Gate 4 and the way out. The crew are greyed at their last-known spots with times, the 21–17 score says “as of 7:18”, and Retry is the gold action.',
    Screen: MapOffline,
    dark: true,
  },
  {
    key: 'quiet',
    title: 'A quiet Tuesday',
    note: 'Three small pins and an honest count, then Saturday’s game pencilled onto Kyle Field with one gold reminder.',
    Screen: MapQuiet,
  },
]
