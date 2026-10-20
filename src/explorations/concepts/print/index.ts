import { H2MscBoard } from '../../flows/H2MscBoard'
import { ProfileTraditions } from '../../ProfileTraditions'
import { QuickEventFlyer } from '../../QuickEventFlyer'
import type { Concept } from '../types'
import { PrintHome } from './PrintHome'
import { PrintKyleField } from './PrintKyleField'
import { PrintSignIn } from './PrintSignIn'
import { PrintYellAlong } from './PrintYellAlong'

/** Concept 4 · Aggieland in print. Grown from H (the tear-off flyer) and I (the ring of traditions). */
export const CONCEPT_PRINT: Concept = {
  key: 'print',
  n: 4,
  name: 'Aggieland in print',
  from: ['H', 'I'],
  headline: ['Aggieland.', 'In print.'],
  lede: 'Campus culture already runs on paper: flyers on the MSC board, the gameday program, the traditions every Aggie counts toward a ring. Each screen becomes one of those printed things.',
  signature:
    'Warm paper under a maroon masthead, set in slab, serif and poster type, with a small gold Aggie Ring counting your traditions in the header.',
  stages: [
    {
      n: 1,
      stage: 'Sign in',
      title: 'Howdy, the cover',
      day: 'Fri',
      time: '11:02 PM',
      note: '“Howdy.” prints as the nameplate over the Aggie Ring. Your tamu.edu email and class year are the whole form, and the year engraves the ring.',
      Screen: PrintSignIn,
    },
    {
      n: 2,
      stage: 'University Home',
      title: 'The Saturday Sheet',
      day: 'Sat',
      time: '9:41 AM',
      note: 'A front page: tonight’s game as the lead story, columns for today and traditions, the MSC board, and his twelve tiles as the printed index.',
      Screen: PrintHome,
    },
    {
      n: 3,
      stage: 'EventFinder',
      title: 'The MSC board',
      day: 'Sat',
      time: '9:43 AM',
      note: 'Events as flyers on a corkboard, each in its own print style, with the tear-off tabs left showing the spots left.',
      Screen: H2MscBoard,
    },
    {
      n: 4,
      stage: 'Campus node',
      title: 'Kyle Field, page 4',
      day: 'Sat',
      time: '9:46 AM',
      note: 'The venue as a program page: E. King Gill and 1922, tonight’s traditions in order with a stamp box each, and today’s events as ticket stubs.',
      Screen: PrintKyleField,
    },
    {
      n: 5,
      stage: 'Game day',
      title: 'The yell card',
      day: 'Sat',
      time: '7:18 PM',
      note: 'Under the lights, the current yell prints big on a paper card with its words and how to hump it. The score stays small up top.',
      Screen: PrintYellAlong,
      dark: true,
    },
    {
      n: 6,
      stage: 'Quick Event',
      title: 'Tear-off flyer',
      day: 'Sat',
      time: '8:51 PM',
      note: 'The plan you type prints as a flyer for the MSC board. Taking a tab is the RSVP, and the tabs left are the spots left.',
      Screen: QuickEventFlyer,
    },
    {
      n: 7,
      stage: 'Profile',
      title: 'The Aggie Ring',
      day: 'Sun',
      time: '10:02 AM',
      note: 'The ring from every masthead, full size: eight traditions, gold where done, and the next one a tap from going.',
      Screen: ProfileTraditions,
    },
  ],
}
