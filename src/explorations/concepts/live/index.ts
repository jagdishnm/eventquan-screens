import { GameDayCardStunt } from '../../GameDayCardStunt'
import { QuickEventThread } from '../../QuickEventThread'
import type { Concept } from '../types'
import { LiveFinder } from './LiveFinder'
import { LiveHome } from './LiveHome'
import { LiveKyleField } from './LiveKyleField'
import { LiveSignIn } from './LiveSignIn'

export { LiveFinder, LiveHome, LiveKyleField, LiveSignIn }
export { ScoreboardHeader } from './ScoreboardHeader'

/** Concept 3 · The 12th Man, live: the crowd is the interface. Grown from D, G and E. */
export const CONCEPT_LIVE: Concept = {
  key: 'live',
  n: 3,
  name: 'The 12th Man, live',
  from: ['D', 'G', 'E'],
  headline: ['The crowd is', 'the interface.'],
  lede: 'Every screen answers one question first: how many Aggies are where, right now, and which of them you know.',
  signature:
    'Every header is a scoreboard: one huge live count in the condensed face, a red on-air light and a live pulse bar beneath it, over a light body ranked by crowd.',
  stages: [
    {
      n: 1,
      stage: 'Sign in',
      title: 'Join the crowd',
      day: 'Fri',
      time: '11:02 PM',
      note: 'The scoreboard counts Aggies into Midnight Yell before you sign in. The crowd is drawn as faces, with one spot saved for you.',
      Screen: LiveSignIn,
    },
    {
      n: 2,
      stage: 'University Home',
      title: 'Where everyone is',
      day: 'Sat',
      time: '9:41 AM',
      note: '12,418 Aggies out, split by A&M, College Station and Bryan. Below, every place is ranked by its crowd, with heat bars and the friends in it.',
      Screen: LiveHome,
    },
    {
      n: 3,
      stage: 'EventFinder',
      title: 'Momentum',
      day: 'Sat',
      time: '9:43 AM',
      note: 'Events sorted by what is filling up, most going or friends going. Each shows its crowd, which way it is moving and how full it is.',
      Screen: LiveFinder,
    },
    {
      n: 4,
      stage: 'Campus node · Kyle Field',
      title: 'Kyle Field, filling',
      day: 'Sat',
      time: '9:46 AM',
      note: '2,310 here now against 102,733 at kickoff. Live gate waits, the east stands filling for the Block T, and the friends already inside.',
      Screen: LiveKyleField,
    },
    {
      n: 5,
      stage: 'Game day',
      title: 'The card stunt',
      day: 'Sat',
      time: '7:12 PM',
      note: 'The crowd becomes the picture. The app knows your seat, shows your place in the Block T and lights your card.',
      Screen: GameDayCardStunt,
      dark: true,
    },
    {
      n: 6,
      stage: 'Quick Event',
      title: 'The group chat',
      day: 'Sat',
      time: '7:31 PM',
      note: 'At halftime the plan is typed as a normal message, and EventQuan offers it back as an event the crew can join in one tap.',
      Screen: QuickEventThread,
    },
  ],
}
