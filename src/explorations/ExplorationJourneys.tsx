import type { ComponentType } from 'react'
import { EqMark } from '../components/Marks'
import { EventFinder } from '../screens/EventFinder'
import { GameDay } from '../screens/GameDay'
import { Home } from '../screens/Home'
import { PlaceDetail } from '../screens/PlaceDetail'
import { QuickEvent } from '../screens/QuickEvent'
import { WelcomeCampus } from '../screens/Welcome'
import { EventFinderMap } from './EventFinderMap'
import { FLOWS } from './flows'
import { GameDayCardStunt } from './GameDayCardStunt'
import { GameDayScoreboard } from './GameDayScoreboard'
import { HomeDayPlan } from './HomeDayPlan'
import { HomeStraw } from './HomeStraw'
import { PlaceSheet } from './PlaceSheet'
import { ProfileTraditions } from './ProfileTraditions'
import { QuickEventFlyer } from './QuickEventFlyer'
import { QuickEventThread } from './QuickEventThread'

const flow = (id: string): ComponentType => FLOWS.find((f) => f.id === id)?.Component ?? (() => null)

type Step = {
  /** Registry id of the screen: the exploration's letter, or a flow id like "A2". */
  id: string
  title: string
  day: string
  time: string
  note: string
  Screen: ComponentType
}

export type Direction = {
  letter: string
  /** Journey step of the brief this direction explores, e.g. 2 · University Home. */
  stage: number
  stageName: string
  headline: [string, string]
  lede: string
  /** In the order a student meets them, which is also the canvas row order. */
  steps: Step[]
}

/** The nine directions, in journey order. Each flow's steps are in time order. */
export const DIRECTIONS: Direction[] = [
  {
    letter: 'A',
    stage: 2,
    stageName: 'University Home',
    headline: ['Your Saturday.', 'Built to kickoff.'],
    lede: "Home names the day and lays it out as a timeline that builds to the game. Troy's header, search and twelve tiles stay exactly as drawn.",
    steps: [
      {
        id: 'A',
        title: 'Your Saturday',
        day: 'Sat',
        time: '9:41 AM',
        note: 'A timeline card between his header and his tiles: Now, Next, then kickoff with the one gold action.',
        Screen: HomeDayPlan,
      },
      {
        id: 'A2',
        title: 'Your whole Saturday',
        day: 'Sat',
        time: '9:42 AM',
        note: 'The card opens into the whole day, by hour and node, with a toggle to put each event on your plan.',
        Screen: flow('A2'),
      },
      {
        id: 'A3',
        title: 'Tailgate Zone',
        day: 'Sat',
        time: '9:43 AM',
        note: 'One tap from the timeline: opens in 17 min, 11 friends going, what is there, and Directions.',
        Screen: flow('A3'),
      },
      {
        id: 'A4',
        title: 'Home at 5:20 PM',
        day: 'Sat',
        time: '5:20 PM',
        note: 'The same Home later. The morning is done, kickoff in 40 min is the hero, and Game Mode is gold.',
        Screen: flow('A4'),
      },
    ],
  },
  {
    letter: 'F',
    stage: 2,
    stageName: 'University Home',
    headline: ['One straw.', 'Every sheet.'],
    lede: "Troy's own metaphor made literal. Every event is a sheet of paper; your straw pierces the ones your nodes and the hour can reach.",
    steps: [
      {
        id: 'F',
        title: 'The straw',
        day: 'Sat',
        time: '9:41 AM',
        note: 'Two sheets pierced at 9:41. Drag the straw through Saturday, or switch A&M, College Station and Bryan on and off.',
        Screen: HomeStraw,
      },
      {
        id: 'F3',
        title: 'A sheet pulled out',
        day: 'Sat',
        time: '9:44 AM',
        note: 'Tap a pierced sheet and it lifts off the straw as a page, hole and all, with a gold Go.',
        Screen: flow('F3'),
      },
      {
        id: 'F4',
        title: 'Shape your straw',
        day: 'Sat',
        time: '9:47 AM',
        note: 'Interests, nodes and walking distance set what the straw is made of, with a live count of what it pierces.',
        Screen: flow('F4'),
      },
      {
        id: 'F2',
        title: 'The straw at 6:30 PM',
        day: 'Sat',
        time: '6:30 PM',
        note: 'In the evening only A&M vs LSU is still pierced, and the greeting turns to evening.',
        Screen: flow('F2'),
      },
    ],
  },
  {
    letter: 'B',
    stage: 3,
    stageName: 'EventFinder',
    headline: ['Every event.', 'On the map.'],
    lede: 'His chips and his event card laid over the campus, so where is as plain as what. Pins carry the node colours.',
    steps: [
      {
        id: 'B',
        title: 'Map view',
        day: 'Sat',
        time: '9:38 AM',
        note: 'Tonight’s game is the selected pin, with its card and a gold Directions in the sheet below.',
        Screen: EventFinderMap,
      },
      {
        id: 'B2',
        title: 'List view',
        day: 'Sat',
        time: '9:39 AM',
        note: 'The same events as his list: Today and This Week, square photos, category, time, venue and attendance.',
        Screen: flow('B2'),
      },
      {
        id: 'B3',
        title: 'Athletics only',
        day: 'Sat',
        time: '9:40 AM',
        note: 'The Athletics chip clears the map to athletics pins. Volleyball at Reed Arena on Wednesday is one tap from going.',
        Screen: flow('B3'),
      },
      {
        id: 'B4',
        title: 'Walk to Kyle Field',
        day: 'Sat',
        time: '9:41 AM',
        note: 'A walking route to Gate 2: 12 min, three steps, and Maya already waiting there.',
        Screen: flow('B4'),
      },
    ],
  },
  {
    letter: 'C',
    stage: 4,
    stageName: 'Campus node',
    headline: ['Kyle Field.', 'Over the map.'],
    lede: 'The venue rises over the map instead of replacing it: what is live, what is next, who is going, and the node above it.',
    steps: [
      {
        id: 'C',
        title: 'Kyle Field sheet',
        day: 'Sat',
        time: '9:46 AM',
        note: 'A medium sheet over the map. Directions first, then what is on here today, with the game as the peak.',
        Screen: PlaceSheet,
      },
      {
        id: 'C2',
        title: 'Sheet fully open',
        day: 'Sat',
        time: '9:47 AM',
        note: 'Pulled up: live, next and later, the crowd across the day, friends going and the venues beside it.',
        Screen: flow('C2'),
      },
      {
        id: 'C4',
        title: 'The Athletics node',
        day: 'Sat',
        time: '9:49 AM',
        note: 'One level up, Texas A&M › Athletics: its venues, what is live across them and the colour it passes down.',
        Screen: flow('C4'),
      },
      {
        id: 'C3',
        title: 'A quiet day',
        day: 'Tue',
        time: '10:12 AM',
        note: 'Kyle Field with nothing on. An honest empty state that says when the next thing is, and what to do meanwhile.',
        Screen: flow('C3'),
      },
    ],
  },
  {
    letter: 'D',
    stage: 5,
    stageName: 'Game day',
    headline: ['Score first.', 'Crew close.'],
    lede: 'Team colours meet across the header and the score is the hero. His GAMEDAY banner and eight tools stay; EventQuan adds where your people are.',
    steps: [
      {
        id: 'D',
        title: 'Scoreboard',
        day: 'Sat',
        time: '7:18 PM',
        note: 'Line score and win odds, his eight tools, the crew in Sec 125, and Order to Seat as the gold action.',
        Screen: GameDayScoreboard,
      },
      {
        id: 'D2',
        title: 'Plays',
        day: 'Sat',
        time: '7:19 PM',
        note: 'The live play-by-play with the drive on a field tracker and the touchdown called out in maroon and gold.',
        Screen: flow('D2'),
      },
      {
        id: 'D3',
        title: 'Your crew',
        day: 'Sat',
        time: '7:20 PM',
        note: 'A map of Kyle Field with every friend’s section, and one tap to meet at Gate 2 at half.',
        Screen: flow('D3'),
      },
      {
        id: 'D4',
        title: 'Order to seat',
        day: 'Sat',
        time: '7:22 PM',
        note: 'Stand 124’s menu, a running cart and delivery to Sec 125 in about four minutes.',
        Screen: flow('D4'),
      },
    ],
  },
  {
    letter: 'G',
    stage: 5,
    stageName: 'Game day',
    headline: ['Your phone.', 'Your card.'],
    lede: 'Kyle Field’s card stunt, with the phone as the card. The app knows your seat, shows where you sit in the picture and lights the screen in your colour.',
    steps: [
      {
        id: 'G2',
        title: 'Claim your card',
        day: 'Sat',
        time: '4:05 PM',
        note: 'At the gates. Your seat is matched from the ticket in Wallet, with a preview of tonight’s picture.',
        Screen: flow('G2'),
      },
      {
        id: 'G',
        title: 'You’re in the Block T',
        day: 'Sat',
        time: '7:12 PM',
        note: 'In the second quarter: your seat ringed in the stem of the T and a countdown to the next first down.',
        Screen: GameDayCardStunt,
      },
      {
        id: 'G3',
        title: 'Card lit',
        day: 'Sat',
        time: '7:13 PM',
        note: 'The whole screen turns your colour, with your seat on it. The one screen with no tab bar.',
        Screen: flow('G3'),
      },
      {
        id: 'G4',
        title: 'You made the T',
        day: 'Sat',
        time: '7:14 PM',
        note: '1,804 cards held up. Your seat in the result, a gold Share the T, and what comes next.',
        Screen: flow('G4'),
      },
    ],
  },
  {
    letter: 'E',
    stage: 6,
    stageName: 'Quick Event',
    headline: ['Say it in chat.', 'Post it there.'],
    lede: 'Plans already happen in the group chat. Type the plan as a message and EventQuan offers it back as an event the group can join.',
    steps: [
      {
        id: 'E',
        title: 'In the group chat',
        day: 'Sat',
        time: '7:31 PM',
        note: 'At halftime: the plan as a normal message, and EventQuan’s offer with When, Where and Who ticked.',
        Screen: QuickEventThread,
      },
      {
        id: 'E3',
        title: 'Edit',
        day: 'Sat',
        time: '7:32 PM',
        note: 'A sheet over the thread to change any field, with quick chips like Make it 10 PM.',
        Screen: flow('E3'),
      },
      {
        id: 'E2',
        title: 'Posted',
        day: 'Sat',
        time: '7:33 PM',
        note: 'The event lives in the thread. I’m in, Maybe and Can’t chips, and replies counted as they come.',
        Screen: flow('E2'),
      },
      {
        id: 'E4',
        title: 'What Maya sees',
        day: 'Sat',
        time: '7:40 PM',
        note: 'The invite from the notification: host, time, place in the College Station colour, and a gold I’m in.',
        Screen: flow('E4'),
      },
    ],
  },
  {
    letter: 'H',
    stage: 6,
    stageName: 'Quick Event',
    headline: ['Print it.', 'Tear a tab.'],
    lede: 'Campus already has a way to ask who is in: a flyer with tear-off tabs. The sentence you type prints as one, and taking a tab is the RSVP.',
    steps: [
      {
        id: 'H',
        title: 'Tear-off flyer',
        day: 'Sat',
        time: '6:50 PM',
        note: 'The typed plan becomes a flyer. Tabs left are spots left; choose where to pin it.',
        Screen: QuickEventFlyer,
      },
      {
        id: 'H2',
        title: 'The MSC board',
        day: 'Sat',
        time: '6:52 PM',
        note: 'Quick Events near you as flyers on a corkboard, each in its own style, with the tabs still left.',
        Screen: flow('H2'),
      },
      {
        id: 'H3',
        title: 'Taking a tab',
        day: 'Sat',
        time: '6:55 PM',
        note: 'Jordan takes a tab on Maya’s 21st. The torn tab in hand, and it goes on Friday.',
        Screen: flow('H3'),
      },
      {
        id: 'H4',
        title: 'All tabs gone',
        day: 'Sat',
        time: '9:04 PM',
        note: 'The bowling flyer is full: every tab taken, a waitlist of three and a gold Message everyone.',
        Screen: flow('H4'),
      },
    ],
  },
  {
    letter: 'I',
    stage: 7,
    stageName: 'Profile',
    headline: ['Eight traditions.', 'One ring.'],
    lede: 'The Aggie Ring is what every student works toward. The profile becomes a ring of traditions: gold where done, open where still ahead.',
    steps: [
      {
        id: 'I',
        title: 'Aggie Ring of traditions',
        day: 'Sat',
        time: '9:50 AM',
        note: 'Four of eight done. The next one, Midnight Yell, is a gold tap from going.',
        Screen: ProfileTraditions,
      },
      {
        id: 'I2',
        title: 'Midnight Yell',
        day: 'Sat',
        time: '9:51 AM',
        note: 'What it is, when and where, how to do it, the yells to know, and 31 friends going.',
        Screen: flow('I2'),
      },
      {
        id: 'I3',
        title: 'Tradition done',
        day: 'Oct 19',
        time: '12:41 AM',
        note: 'Right after the yell: the ring fills to five of eight, with a memory and a gold Share.',
        Screen: flow('I3'),
      },
      {
        id: 'I4',
        title: 'Ring Day progress',
        day: 'Oct 19',
        time: '12:42 AM',
        note: 'The path to the ring itself: 74 of 90 hours, the checklist and when Ring Day comes.',
        Screen: flow('I4'),
      },
    ],
  },
]

/** A flow step's label: the direction letter plus its place in the flow, e.g. "G1". */
export const stepLabel = (d: Direction, i: number) => `${d.letter}${i + 1}`

/** One stop on a direction's six-screen journey. */
export type JourneyStop = {
  /** Journey step number from the brief (1–6), or 7 for Profile. */
  n: number
  title: string
  day: string
  time: string
  note: string
  Screen: ComponentType
  /** True for the stop this direction replaces; the rest are the brief's screens. */
  ours: boolean
}

/** The brief's six screens, with the times and notes of its assembled journey. */
const BRIEF: Omit<JourneyStop, 'ours'>[] = [
  {
    n: 1,
    title: 'Sign in',
    day: 'Fri',
    time: '11:02 PM',
    note: 'A tamu.edu address identifies the campus. The maroon skin takes over, and College Station and Bryan are added to the events shown.',
    Screen: WelcomeCampus,
  },
  {
    n: 2,
    title: 'University Home',
    day: 'Sat',
    time: '9:41 AM',
    note: 'What is live right now comes first. The twelve tiles stay, and the ones with something live show it.',
    Screen: Home,
  },
  {
    n: 3,
    title: 'EventFinder',
    day: 'Sat',
    time: '9:43 AM',
    note: 'Tonight’s game gets a ticket-stub card in both teams’ colors. Pin color marks the node, and “Events from” sets which cities feed the list.',
    Screen: EventFinder,
  },
  {
    n: 4,
    title: 'Campus node · Kyle Field',
    day: 'Sat',
    time: '9:46 AM',
    note: 'The venue’s events are plotted on its crowd curve for the day. Tonight’s game leads, then a live timeline.',
    Screen: PlaceDetail,
  },
  {
    n: 5,
    title: 'Game day',
    day: 'Sat',
    time: '7:18 PM',
    note: 'The app goes dark and knows your seat. Live score, order to seat, and his eight tools with live data.',
    Screen: GameDay,
  },
  {
    n: 6,
    title: 'Quick Event',
    day: 'Sat',
    time: '8:51 PM',
    note: 'Type it the way you would text it. Time, place and node are picked up automatically, then you post.',
    Screen: QuickEvent,
  },
]

/** Times the direction's own screen shows, where they differ from the brief's moment. */
const OWN_TIME: Record<string, { day: string; time: string }> = {
  E: { day: 'Sat', time: '7:31 PM' },
  G: { day: 'Sat', time: '7:12 PM' },
  I: { day: 'Sun', time: '10:02 AM' },
}

/**
 * The six screens of the brief in journey order, with this direction's screen in place of the
 * one it explores. Profile is not one of the six, so direction I adds it as a seventh stop.
 */
export function journeyOf(d: Direction): JourneyStop[] {
  const own = d.steps.find((s) => s.id === d.letter) ?? d.steps[0]
  const mine: JourneyStop = {
    n: d.stage,
    title: `${d.stageName} · ${own.title}`,
    ...(OWN_TIME[d.letter] ?? { day: own.day, time: BRIEF[d.stage - 1]?.time ?? own.time }),
    note: own.note,
    Screen: own.Screen,
    ours: true,
  }
  const stops = BRIEF.map((b) => (b.n === d.stage ? mine : { ...b, ours: false }))
  return d.stage > BRIEF.length ? [...stops, mine] : stops
}

/** Phones sit on a gentle wave so the row reads as a sequence, as on the brief's journey board. */
const OFFSET = [0, 40, 12, 52, 4, 36, 20]
const PHONE = 417
const GAP = 56

/** Board width for a given number of phones, with the brief board's 72px side padding. */
export const boardWidth = (count: number) => 144 + count * PHONE + (count - 1) * GAP

/**
 * One direction's assembled journey: the brief board itself (condensed headline, the gold straw
 * with a timestamp per phone, numbered captions), with this direction's screen at its step.
 */
export function ExplorationJourney({ letter }: { letter: string }) {
  const d = DIRECTIONS.find((x) => x.letter === letter)
  if (!d) return null
  const stops = journeyOf(d)
  return (
    <main
      className="relative overflow-hidden bg-night px-[72px] pb-20 pt-16 text-paper"
      style={{ width: boardWidth(stops.length) }}
    >
      <div className="pointer-events-none absolute -left-40 -top-56 size-[900px] rounded-full bg-maroon/45 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 top-[420px] size-[700px] rounded-full bg-gold/[0.06] blur-[140px]" />

      <header className="relative flex items-end justify-between gap-16">
        <div>
          <div className="flex items-center gap-3">
            <EqMark size={32} />
            <span className="text-control font-semibold tracking-[2.4px] text-paper/55">
              EVENTQUAN × TEXAS A&amp;M · DIRECTION {d.letter} · {d.stage} {d.stageName.toUpperCase()}
            </span>
          </div>
          <h1 className="mt-6 font-display text-[168px] font-extrabold uppercase italic leading-[0.82] tracking-[-2px]">
            {d.headline[0].replace(/\.$/, '')}
            <span className="text-gold">.</span>
            <br />
            {d.headline[1].replace(/\.$/, '')}
            <span className="text-gold">.</span>
          </h1>
        </div>
        <div className="max-w-[560px] pb-3">
          <p className="text-board-lede leading-[1.5] text-paper/70 [text-wrap:pretty]">{d.lede}</p>
          <div className="mt-6 flex gap-6 text-control text-paper/55">
            <span className="flex items-center gap-2">
              <span className="size-[10px] rounded-full bg-gold" /> This direction
            </span>
            <span className="flex items-center gap-2">
              <span className="size-[10px] rounded-full bg-paper/85" /> From the brief
            </span>
          </div>
        </div>
      </header>

      {/* The straw: one gold thread through every moment */}
      <div className="relative mt-16 h-[64px]">
        <div className="absolute inset-x-0 top-[44px] h-[2px] bg-[linear-gradient(90deg,rgba(255,205,28,0)_0%,var(--color-gold)_6%,var(--color-gold)_94%,rgba(255,205,28,0)_100%)]" />
        <div className="flex gap-[56px]">
          {stops.map((s) => (
            <div key={s.n} className="relative w-[417px] shrink-0">
              <div className="flex items-baseline gap-2 pl-2 font-display uppercase">
                <span className="text-[30px] font-bold leading-none tracking-[0.2px] tabular">{s.time}</span>
                <span className="text-card font-semibold tracking-[1.6px] text-paper/45">{s.day}</span>
              </div>
              <span className="absolute left-[14px] top-[38px] size-[14px] rounded-full bg-gold ring-[5px] ring-night" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-[56px]">
        {stops.map((s, i) => (
          <figure key={s.n} className="w-[417px] shrink-0" style={{ marginTop: OFFSET[i] }}>
            <div
              role="img"
              aria-label={`${s.title} screen`}
              className={`rounded-[64px] bg-[#050506] p-[12px] shadow-[0_0_0_1.5px_#3a383d,0_50px_90px_-30px_rgba(0,0,0,0.85)] ${
                s.ours ? 'ring-4 ring-gold ring-offset-8 ring-offset-night' : ''
              }`}
            >
              <div className="overflow-hidden rounded-[52px]" inert aria-hidden>
                <s.Screen />
              </div>
            </div>
            <figcaption className="mt-8 px-2">
              <div className="flex items-baseline gap-3">
                <span
                  className={`font-display text-[44px] font-extrabold italic leading-none tabular ${
                    s.ours ? 'text-gold' : 'text-paper/85'
                  }`}
                >
                  {String(s.n).padStart(2, '0')}
                </span>
                <span className="text-board-title font-semibold tracking-[-0.4px]">{s.title}</span>
              </div>
              <p className="mt-2.5 text-card leading-[1.5] text-paper/62 [text-wrap:pretty]">{s.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  )
}
