import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { EventFinderMap } from '../../../../src/explorations/EventFinderMap'
import { GameDayScoreboard } from '../../../../src/explorations/GameDayScoreboard'
import { HomeDayPlan } from '../../../../src/explorations/HomeDayPlan'
import { PlaceSheet } from '../../../../src/explorations/PlaceSheet'
import { QuickEventThread } from '../../../../src/explorations/QuickEventThread'

/* Canvas-only wrappers: each exploration rendered at phone size inside a router at its own path. */
function Phone({ path, children }: { path: string; children: ReactNode }) {
  return (
    <div style={{ width: 393, height: 852 }} className="overflow-hidden">
      <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
    </div>
  )
}

export const HomeDayPlanScreen = () => (
  <Phone path="/explore/home-day-plan">
    <HomeDayPlan />
  </Phone>
)
export const EventFinderMapScreen = () => (
  <Phone path="/explore/events-map">
    <EventFinderMap />
  </Phone>
)
export const PlaceSheetScreen = () => (
  <Phone path="/explore/kyle-field-sheet">
    <PlaceSheet />
  </Phone>
)
export const GameDayScoreboardScreen = () => (
  <Phone path="/explore/gameday-scoreboard">
    <GameDayScoreboard />
  </Phone>
)
export const QuickEventThreadScreen = () => (
  <Phone path="/explore/quick-event-thread">
    <QuickEventThread />
  </Phone>
)

const NOTES = [
  {
    n: 'A',
    title: 'University Home · Your Saturday',
    refs: 'Spotify Live Events',
    idea: 'His header, greeting, search and twelve tiles stay. Between them, the day as a short timeline that builds to kickoff.',
  },
  {
    n: 'B',
    title: 'EventFinder · Map view',
    refs: 'Fresha, Hypelist',
    idea: 'His chips and event card (LSU, Football, 6:00 PM, Kyle Field, 125K attending) laid over the campus, pins in node colours.',
  },
  {
    n: 'C',
    title: 'Campus node · Sheet over the map',
    refs: 'Cash App, Bump',
    idea: 'Kyle Field rises over the map: live now, coming up, who is going. The header shows the node above: Texas A&M › Athletics.',
  },
  {
    n: 'D',
    title: 'Game day · Scoreboard first',
    refs: 'Apple Sports, MLS, NFL',
    idea: 'GAMEDAY banner over team colours, score as the hero, line score and win odds, his eight tools, and where your crew sits.',
  },
  {
    n: 'E',
    title: 'Quick Event · In the group chat',
    refs: 'Clubhouse, GroupMe',
    idea: "Type the plan as a normal message; EventQuan offers it back as an event card. Couple clicks, it's done.",
  },
]

/** His visual language from the brief, checked per exploration. `na` where the rule doesn't apply to that screen. */
const RULES = [
  'Maroon header',
  'Gold action',
  '5 tabs',
  '9:41',
  'Chips',
  'Square thumbs',
  'Node colours',
  'Aggie words',
]
const CHECK: Record<string, ('yes' | 'na' | 'dark')[]> = {
  A: ['yes', 'yes', 'yes', 'yes', 'na', 'yes', 'yes', 'yes'],
  B: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'],
  C: ['yes', 'yes', 'yes', 'yes', 'na', 'yes', 'yes', 'yes'],
  D: ['dark', 'yes', 'yes', 'yes', 'na', 'na', 'na', 'yes'],
  E: ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'],
}
const MARK = {
  yes: <span className="font-bold text-ok">✓</span>,
  na: <span className="text-ink-3">–</span>,
  dark: <span className="text-meta font-semibold text-ink-2">dark</span>,
}

/** Canvas-only notes board: what each exploration tries, where it came from, and the brief check. */
export function ExplorationNotes() {
  return (
    <div style={{ width: 560, height: 1060 }} className="flex flex-col rounded-sheet bg-white p-8 text-ink">
      <div className="text-micro font-bold tracking-caps text-maroon">EVENTQUAN · TEXAS A&amp;M SKIN</div>
      <h1 className="mt-2 font-display text-display-lg font-extrabold uppercase italic leading-[0.9]">
        Five more directions
      </h1>
      <p className="mt-2 text-body text-ink-2">
        Alternatives for five of the six brief screens, inside his visual language: what he drew stays, each one adds a
        single new idea. References pulled from Mobbin.
      </p>
      <ol className="mt-5 flex flex-col gap-2.5">
        {NOTES.map((x) => (
          <li key={x.n} className="flex gap-3 rounded-card bg-canvas p-3.5">
            <span className="grid size-[30px] shrink-0 place-items-center rounded-well bg-maroon font-display text-title font-bold text-white">
              {x.n}
            </span>
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-card font-semibold tracking-snug">{x.title}</h2>
                <span className="shrink-0 text-meta text-ink-3">{x.refs}</span>
              </div>
              <p className="mt-0.5 text-small text-ink-2">{x.idea}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-6 text-micro font-bold tracking-caps text-maroon">CHECKED AGAINST THE BRIEF</h2>
      <table className="mt-2 w-full text-center text-control">
        <thead>
          <tr>
            <th scope="col" className="w-[36px]" />
            {RULES.map((r) => (
              <th
                key={r}
                scope="col"
                className="px-0.5 pb-1.5 align-bottom text-micro font-semibold leading-tight text-ink-3"
              >
                {r}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-hairline border-y border-hairline">
          {Object.entries(CHECK).map(([k, row]) => (
            <tr key={k}>
              <th scope="row" className="py-2 text-left font-display text-title font-bold text-maroon">
                {k}
              </th>
              {row.map((v, i) => (
                <td key={i}>{MARK[v]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-meta text-ink-3">
        D: game day goes dark with a dark tab bar, same five items, as on the production screen. Sign in keeps the
        production design; it has no tab bar by design.
      </p>
    </div>
  )
}
