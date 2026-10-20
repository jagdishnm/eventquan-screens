import { EventFinderMap } from '../../EventFinderMap'
import { PlaceSheet } from '../../PlaceSheet'
import type { Concept } from '../types'
import { MapDropPin } from './MapDropPin'
import { MapHome } from './MapHome'
import { MapSignIn } from './MapSignIn'
import { MapStadium } from './MapStadium'

/** Concept 2 · The Map. Grown from explorations B (EventFinder on the map) and C (the place sheet). */
export const CONCEPT_MAP: Concept = {
  key: 'map',
  n: 2,
  name: 'The Map',
  from: ['B', 'C'],
  headline: ['Place is the interface.', 'The campus is the app.'],
  lede: 'EventQuan never leaves the map: from the first email to the last plan of the night, every screen is the living campus with what is happening rising over it in sheets.',
  signature:
    'A full-bleed campus map behind every screen, the maroon header shrunk to a floating capsule, content in rounded sheets and pins in the node colours.',
  stages: [
    {
      n: 1,
      stage: 'Sign in',
      title: 'The map finds your campus',
      day: 'Fri',
      time: '11:02 PM',
      note: 'A tamu.edu email zooms the dark platform map to College Station. A&M, College Station and Bryan light up as rings with this weekend’s count.',
      Screen: MapSignIn,
      dark: true,
    },
    {
      n: 2,
      stage: 'University Home',
      title: 'Howdy, on the map',
      day: 'Sat',
      time: '9:41 AM',
      note: 'The map is Home. The twelve tiles become a row of layers and shortcuts, and "Around you now" peeks up with the market, the tailgate and tonight’s game.',
      Screen: MapHome,
    },
    {
      n: 3,
      stage: 'EventFinder',
      title: 'Every event, pinned',
      day: 'Sat',
      time: '9:43 AM',
      note: 'The chips filter the pins, and today’s results sit in a sheet over the campus. Tonight’s game is the selected pin, with Directions in gold.',
      Screen: EventFinderMap,
    },
    {
      n: 4,
      stage: 'Campus node',
      title: 'Kyle Field, over the map',
      day: 'Sat',
      time: '9:46 AM',
      note: 'Tapping the Kyle Field pin raises it as a place card: how busy it is, what is on there today, and Directions, without leaving the map.',
      Screen: PlaceSheet,
    },
    {
      n: 5,
      stage: 'Game day',
      title: 'The bowl is the map',
      day: 'Sat',
      time: '7:18 PM',
      note: 'Inside Kyle Field the map becomes the seating bowl: your seat, your crew’s sections, the shortest lines and the way to Gate 2. The score rides in the capsule.',
      Screen: MapStadium,
      dark: true,
    },
    {
      n: 6,
      stage: 'Quick Event',
      title: 'Drop a pin',
      day: 'Sat',
      time: '8:51 PM',
      note: 'Hold the map at Northgate to drop a pin and type the plan in one line. Rings show who will see it as you switch A&M, College Station and Bryan on.',
      Screen: MapDropPin,
    },
  ],
}
