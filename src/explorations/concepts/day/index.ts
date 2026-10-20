import { A2WholeSaturday } from '../../flows/A2WholeSaturday'
import { HomeStraw } from '../../HomeStraw'
import type { Concept } from '../types'
import { DayFindTheGap } from './DayFindTheGap'
import { DayGameClock } from './DayGameClock'
import { DayKyleField } from './DayKyleField'
import { DaySignIn } from './DaySignIn'

/** Concept 1 · The Day. Grown from A (Your Saturday) and F (the straw): time is the interface. */
export const CONCEPT_DAY: Concept = {
  key: 'day',
  n: 1,
  name: 'The Day',
  from: ['A', 'F'],
  headline: ['One Saturday.', 'Told by the clock.'],
  lede: 'Every screen is the same Saturday at a different hour, laid along the straw, so the app always answers "when" before "what".',
  signature:
    "Troy's straw stood upright: a gold time rail down every screen, hours in the condensed display face, a pulsing NOW, and one big clock as the hero.",
  stages: [
    {
      n: 1,
      stage: 'Sign in',
      title: 'The night before',
      day: 'Fri',
      time: '11:02 PM',
      note: 'Sign in with a tamu.edu email and the straw grows down the screen: Midnight Yell in 58 minutes, then the tailgate, then kickoff.',
      Screen: DaySignIn,
    },
    {
      n: 2,
      stage: 'University Home',
      title: 'The straw',
      day: 'Sat',
      time: '9:41 AM',
      note: 'Home is the stack of sheets your straw pierces at 9:41. Drag it through the day, or switch A&M, College Station and Bryan on and off.',
      Screen: HomeStraw,
    },
    {
      n: 3,
      stage: 'EventFinder',
      title: 'Your whole Saturday',
      day: 'Sat',
      time: '9:43 AM',
      note: 'Every event today, by part of the day and by node, with a toggle to put each one on your plan.',
      Screen: A2WholeSaturday,
    },
    {
      n: 4,
      stage: 'Campus node',
      title: "Kyle Field's Saturday",
      day: 'Sat',
      time: '9:46 AM',
      note: 'The stadium has its own day, from the tailgate to the War Hymn at the final whistle, with the crowd swelling around the rail. Add to my day folds the picks into yours.',
      Screen: DayKyleField,
    },
    {
      n: 5,
      stage: 'Game day',
      title: 'The game clock',
      day: 'Sat',
      time: '7:18 PM',
      note: 'The four quarters as stretches of the rail, scores as beads on it, and the halftime meet-up at Gate 2 hung just below NOW.',
      Screen: DayGameClock,
      dark: true,
    },
    {
      n: 6,
      stage: 'Quick Event',
      title: 'Find the gap',
      day: 'Sat',
      time: '8:51 PM',
      note: 'Your evening with its free time hatched in. Type "Whataburger after the game 10:30 PM?" and Post drops it into the 10:00 to 11:30 gap.',
      Screen: DayFindTheGap,
    },
  ],
}
