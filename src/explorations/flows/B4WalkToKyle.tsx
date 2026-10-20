import { ArrowUp, ChevronLeft, CornerUpRight, Flag, Footprints, Bus, Share } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Screen } from '../../components/Device'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'
import { CampusMap } from '../CampusMap'

/**
 * The route in map coordinates: from "you" north to Joe Routt Blvd, east along it,
 * then south to Gate 2 on Kyle Field's north-east corner.
 */
const ROUTE = 'M150 382 L151 317 L266 310 L265 398 L252 405'

function Route() {
  return (
    <>
      <svg aria-hidden width="393" height="1000" viewBox="0 0 393 1000" className="absolute left-0 top-0">
        <path
          d={ROUTE}
          className="fill-none stroke-white"
          strokeWidth="11"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={ROUTE}
          className="fill-none stroke-maroon"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      {/* ETA on the line, as Apple Maps labels a route */}
      <span
        aria-hidden
        className="absolute flex h-[26px] -translate-y-1/2 items-center gap-1 rounded-full bg-white px-2.5 text-meta font-bold text-maroon shadow-floating"
        style={{ left: 276, top: 352 }}
      >
        <Footprints size={13} /> 12 min
      </span>
      {/* Gate 2, with Maya waiting there */}
      <span
        aria-hidden
        className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
        style={{ left: 252, top: 405 }}
      >
        <span className="flex h-[30px] items-center gap-1.5 rounded-full bg-maroon pl-1 pr-2.5 text-control font-semibold text-white shadow-floating">
          <Avatar initials="MR" color={2} size={22} className="ring-2 ring-white" />
          Gate 2
        </span>
        <span className="block size-[9px] -translate-y-[5px] rotate-45 bg-maroon" />
      </span>
      <span
        aria-hidden
        className="absolute -translate-x-1/2 text-tab font-bold tracking-caps text-maroon/60"
        style={{ left: 224, top: 479 }}
      >
        KYLE FIELD
      </span>
    </>
  )
}

const STEPS = [
  { Icon: ArrowUp, text: 'North to Joe Routt Blvd', d: '0.1 mi' },
  { Icon: CornerUpRight, text: 'Right on Joe Routt Blvd', d: '0.3 mi' },
  { Icon: Flag, text: 'Right at the 12th Man statue', d: '0.2 mi' },
]

const MODES = [
  { id: 'walk', label: 'Walk', Icon: Footprints },
  { id: 'shuttle', label: 'Shuttle', Icon: Bus },
] as const

/**
 * B4 · Walking directions to Kyle Field. From the game card's Directions: the route drawn
 * from you to Gate 2, the ETA first, the steps, who you'll meet there, and a gold Start.
 */
export function B4WalkToKyle() {
  const [mode, setMode] = useState<'walk' | 'shuttle'>('walk')
  return (
    <Screen>
      <StatusBar />
      <CampusMap shift={-160} pins={[]} overlay={<Route />} />

      <header className="absolute inset-x-0 top-0 z-20 bg-maroon px-4 pb-2 pt-[54px] text-white">
        <div className="flex h-[44px] items-center gap-2">
          <IconButton label="Back to events" to="/explore/events-map">
            <ChevronLeft size={20} />
          </IconButton>
          <div className="min-w-0 flex-1 leading-tight">
            <h1 className="text-emphasis font-bold tracking-snug">Walk to Kyle Field</h1>
            <p className="text-meta text-white/70">To Gate 2 · 0.6 mi</p>
          </div>
          <div role="group" aria-label="Travel mode" className="flex rounded-full bg-white/14 p-[3px]">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                aria-pressed={mode === m.id}
                onClick={() => setMode(m.id)}
                className={`relative flex h-[30px] items-center gap-1 rounded-full px-2.5 text-meta font-semibold after:absolute after:-inset-y-[7px] after:inset-x-0 after:content-[''] ${
                  mode === m.id ? 'bg-white text-maroon' : 'text-white/80'
                }`}
              >
                <m.Icon size={14} />
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section
        aria-labelledby="walk-eta"
        className="absolute inset-x-0 bottom-0 z-20 rounded-t-sheet bg-canvas px-4 pb-[94px] pt-2.5 shadow-overlay"
      >
        <div aria-hidden className="mx-auto h-[5px] w-[38px] rounded-full bg-black/15" />
        <div className="mt-2.5">
          <div>
            <h2 id="walk-eta" className="flex items-baseline gap-2">
              <span className="font-display text-display-md font-bold leading-none tabular">12 min</span>
              <span className="text-body font-semibold text-ink-2">· 0.6 mi</span>
            </h2>
            <p className="mt-1 text-small text-ink-2">
              Arrive <span className="font-semibold text-ink tabular">9:53 AM</span> · Tailgate Zone opens 10:00
            </p>
          </div>
        </div>

        <ol className="mt-3 overflow-hidden rounded-card bg-white shadow-raised">
          {STEPS.map((s, i) => (
            <li key={s.text} className="flex items-center gap-3 border-b border-hairline px-3 py-2.5 last:border-b-0">
              <span
                className={`grid size-[30px] shrink-0 place-items-center rounded-full ${
                  i === 0 ? 'bg-maroon text-white' : 'bg-maroon-soft text-maroon'
                }`}
              >
                <s.Icon size={16} strokeWidth={2.4} />
              </span>
              <span className="min-w-0 flex-1 text-control font-semibold">{s.text}</span>
              <span className="text-meta text-ink-3 tabular">{s.d}</span>
            </li>
          ))}
        </ol>

        <h3 className="mt-3.5 text-card font-semibold tracking-snug">You'll meet</h3>
        <ul className="mt-1.5 flex gap-2">
          <li className="flex flex-1 items-center gap-2.5 rounded-card bg-white p-2.5 shadow-raised">
            <Avatar initials="MR" color={2} size={36} />
            <span className="min-w-0 leading-tight">
              <span className="block text-control font-semibold">Maya</span>
              <span className="block text-meta text-ok">At Gate 2 now</span>
            </span>
          </li>
          <li className="flex flex-1 items-center gap-2.5 rounded-card bg-white p-2.5 shadow-raised">
            <span className="flex">
              <Avatar initials="DS" color={5} size={36} className="ring-2 ring-white" />
              <Avatar initials="KT" color={4} size={36} className="-ml-3 ring-2 ring-white" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-control font-semibold">Dev, Kendall</span>
              <span className="block text-meta text-ink-3">Lot C at 10:00</span>
            </span>
          </li>
        </ul>

        <div className="mt-3.5 grid grid-cols-[1fr_auto] gap-2">
          <Button size="lg" className="w-full">
            Start
          </Button>
          <Button size="lg" variant="secondary" className="px-4">
            <Share size={17} /> Share ETA
          </Button>
        </div>
      </section>

      <TabBar active="events" />
    </Screen>
  )
}
