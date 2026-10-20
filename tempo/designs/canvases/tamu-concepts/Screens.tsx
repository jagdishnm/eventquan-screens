import { MemoryRouter } from 'react-router-dom'
import { CONCEPTS, LEAD_CONCEPT } from '../../../../src/explorations/concepts'
import { ConceptJourney } from '../../../../src/explorations/concepts/ConceptJourney'
import { LIVE_STATES } from '../../../../src/explorations/concepts/live/states'

/* Canvas-only wrappers: each concept screen rendered at phone size inside a router at its own path. */
function ConceptScreen({ k, n }: { k: string; n: number }) {
  const s = CONCEPTS.find((c) => c.key === k)?.stages.find((x) => x.n === n)
  return (
    <div style={{ width: 393, height: 852 }} className="overflow-hidden">
      <MemoryRouter initialEntries={[`/explore/concept/${k}/${n}`]}>{s ? <s.Screen /> : null}</MemoryRouter>
    </div>
  )
}

export const Day1 = () => <ConceptScreen k="day" n={1} />
export const Day2 = () => <ConceptScreen k="day" n={2} />
export const Day3 = () => <ConceptScreen k="day" n={3} />
export const Day4 = () => <ConceptScreen k="day" n={4} />
export const Day5 = () => <ConceptScreen k="day" n={5} />
export const Day6 = () => <ConceptScreen k="day" n={6} />

export const Map1 = () => <ConceptScreen k="map" n={1} />
export const Map2 = () => <ConceptScreen k="map" n={2} />
export const Map3 = () => <ConceptScreen k="map" n={3} />
export const Map4 = () => <ConceptScreen k="map" n={4} />
export const Map5 = () => <ConceptScreen k="map" n={5} />
export const Map6 = () => <ConceptScreen k="map" n={6} />

export const Live1 = () => <ConceptScreen k="live" n={1} />
export const Live2 = () => <ConceptScreen k="live" n={2} />
export const Live3 = () => <ConceptScreen k="live" n={3} />
export const Live4 = () => <ConceptScreen k="live" n={4} />
export const Live5 = () => <ConceptScreen k="live" n={5} />
export const Live6 = () => <ConceptScreen k="live" n={6} />

export const Print1 = () => <ConceptScreen k="print" n={1} />
export const Print2 = () => <ConceptScreen k="print" n={2} />
export const Print3 = () => <ConceptScreen k="print" n={3} />
export const Print4 = () => <ConceptScreen k="print" n={4} />
export const Print5 = () => <ConceptScreen k="print" n={5} />
export const Print6 = () => <ConceptScreen k="print" n={6} />
export const Print7 = () => <ConceptScreen k="print" n={7} />

/** One concept's assembled journey board, inside a router so its screens' links resolve. */
function Board({ k }: { k: string }) {
  return (
    <div className="w-max">
      <MemoryRouter initialEntries={[`/explore/concept/${k}`]}>
        <ConceptJourney conceptKey={k} />
      </MemoryRouter>
    </div>
  )
}

export const JourneyDay = () => <Board k="day" />
export const JourneyMap = () => <Board k="map" />
export const JourneyLive = () => <Board k="live" />
export const JourneyPrint = () => <Board k="print" />

/** Canvas-only notes board: the four concepts, what each repeats on every screen, and where it came from. */
export function ConceptNotes() {
  return (
    <div style={{ width: 560 }} className="flex flex-col rounded-sheet bg-white p-8 text-ink">
      <div className="text-micro font-bold tracking-caps text-maroon">EVENTQUAN · TEXAS A&amp;M SKIN</div>
      <h1 className="mt-2 font-display text-display-lg font-extrabold uppercase italic leading-[0.9]">
        Four whole-app concepts
      </h1>
      <p className="mt-2 text-body text-ink-2">
        The nine one-screen explorations, merged into four complete apps. Each row is one concept: all six brief
        screens, Sign in to Quick Event, in that concept&apos;s own layout. Every row keeps Troy&apos;s maroon header,
        one gold action and the five tabs.
      </p>
      <p className="mt-3 rounded-card bg-soon p-3.5 text-small text-soon-ink">
        <b className="font-semibold">We lead with concept 3, The 12th Man, live.</b> Live crowd counts are the one thing
        only EventQuan can show, and the Block T is the moment people will share. Its row adds the states a real app
        meets: a wrong email, location, no signal in the stands and a quiet Tuesday. The other three are also
        considered.
      </p>
      <ol className="mt-5 flex flex-col gap-2.5">
        {CONCEPTS.map((c) => (
          <li
            key={c.key}
            className={`flex gap-3 rounded-card p-3.5 ${c.key === LEAD_CONCEPT ? 'bg-maroon-soft ring-2 ring-maroon' : 'bg-canvas'}`}
          >
            <span className="grid size-[30px] shrink-0 place-items-center rounded-well bg-maroon font-display text-title font-bold text-white">
              {c.n}
            </span>
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-card font-semibold tracking-snug">
                  {c.name}
                  {c.key === LEAD_CONCEPT ? (
                    <span className="ml-2 rounded-tag bg-maroon px-1.5 py-0.5 align-middle text-micro font-bold tracking-eyebrow text-white">
                      LEAD
                    </span>
                  ) : null}
                </h2>
                <span className="shrink-0 text-meta text-ink-3">from {c.from.join(' + ')}</span>
              </div>
              <p className="mt-0.5 text-small text-ink-2">{c.signature}</p>
              <p className="mt-1 text-meta text-ink-3">{c.stages.map((s) => s.title).join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-meta text-ink-3">
        The longer flows from the nine explorations still run in the app at /explore/flow/:id; this canvas shows one
        screen per stage so each concept reads at a glance.
      </p>
    </div>
  )
}

/** The lead concept's failure states (wrong email, location, no signal, quiet day), at phone size. */
function LiveState({ k }: { k: string }) {
  const s = LIVE_STATES.find((x) => x.key === k)
  return (
    <div style={{ width: 393, height: 852 }} className="overflow-hidden">
      <MemoryRouter initialEntries={[`/explore/concept/live/state/${k}`]}>{s ? <s.Screen /> : null}</MemoryRouter>
    </div>
  )
}

export const LiveStateSignInError = () => <LiveState k="sign-in-error" />
export const LiveStateLocation = () => <LiveState k="location" />
export const LiveStateOffline = () => <LiveState k="offline" />
export const LiveStateQuiet = () => <LiveState k="quiet" />
