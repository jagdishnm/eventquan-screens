import type { ComponentType } from 'react'
import { LiveKyleFieldOffline } from './LiveKyleFieldOffline'
import { LiveLocationPrompt } from './LiveLocationPrompt'
import { LiveQuietDay } from './LiveQuietDay'
import { LiveSignInError } from './LiveSignInError'

export { LiveKyleFieldOffline, LiveLocationPrompt, LiveQuietDay, LiveSignInError }
export { NoSignalStatusBar, StateScoreboard } from './StateScoreboard'

export type LiveState = { key: string; title: string; note: string; Screen: ComponentType; dark?: boolean }

/** "The 12th Man, live" when things go wrong or go quiet: error, permission, offline, empty. */
export const LIVE_STATES: LiveState[] = [
  {
    key: 'sign-in-error',
    title: 'Wrong email',
    note: 'A Gmail address stays in the field with a plain fix, and the gold button waits until the email ends in @tamu.edu.',
    Screen: LiveSignInError,
  },
  {
    key: 'location',
    title: 'Before the location prompt',
    note: 'The “near you” count stays unlit until location is on, while campus-wide counts keep working if Jordan says not now.',
    Screen: LiveLocationPrompt,
  },
  {
    key: 'offline',
    title: 'No signal at Kyle Field',
    note: 'The board keeps the last count it heard, goes grey and freezes, and the ticket, seat and map still work offline.',
    Screen: LiveKyleFieldOffline,
  },
  {
    key: 'quiet',
    title: 'A quiet Tuesday',
    note: 'The board shows 214 Aggies honestly, then points to Saturday’s game and three small things that are live now.',
    Screen: LiveQuietDay,
  },
]
