import { ChevronLeft, CloudOff, RefreshCw, Ticket, WifiOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Badge } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { TabBar } from '../../../../components/TabBar'
import { IconButton, SectionHeader } from '../../../../components/ui'
import { KYLE_FIELD_GAMEDAY } from '../../../../data/kyleField'
import { NoSignalStatusBar, StateScoreboard } from './StateScoreboard'

/** Kyle Field's day in half hours, 7 AM to 11 PM, as on the live board. Bar 23 is 6:30 PM, the last we heard. */
const DAY = Array.from({ length: 33 }, (_, i) => {
  const h = 7 + i / 2
  const c = KYLE_FIELD_GAMEDAY.crowd
  for (let j = 1; j < c.length; j++) {
    const [h0, v0] = c[j - 1]
    const [h1, v1] = c[j]
    if (h <= h1) return v0 + ((h - h0) / (h1 - h0)) * (v1 - v0)
  }
  return c[c.length - 1][1]
})
const LAST_KNOWN = 23

/** What needs signal, and is paused until it's back. */
const PAUSED = ['Live crowd count', 'Gate and concession lines', 'Where your crew is']

/**
 * State · Offline at Kyle Field, 6:42 PM Saturday, first quarter. 102,733 people, no signal. The
 * board keeps the last count it heard and says when, the light goes grey and the pulse stops. The
 * body leads with what still works on this phone: the ticket, the seat and the way to it.
 */
export function LiveKyleFieldOffline() {
  const [trying, setTrying] = useState(false)
  const [lastTry, setLastTry] = useState('6:41 PM')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setTrying(true)
    timer.current = window.setTimeout(() => {
      setTrying(false)
      setLastTry('6:42 PM')
    }, 1600)
  }

  return (
    <Screen>
      <NoSignalStatusBar />
      <ScrollBody className="pb-[176px]">
        <StateScoreboard
          state="offline"
          label="OFFLINE"
          kicker="SAT 6:42 PM · A&M VS LSU · 1ST QTR"
          value="102,733"
          srValue="Offline. Last known count: 102,733 in the stands, updated at 6:31 PM."
          unit={['Aggies', 'in the stands']}
          aside="as of 6:31 PM"
          left={
            <>
              <IconButton label="Back" to="/">
                <ChevronLeft size={20} />
              </IconButton>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-emphasis font-semibold tracking-snug">Kyle Field</span>
                <span className="block text-meta text-white/60">Home of the 12th Man</span>
              </span>
            </>
          }
          pulse={DAY}
          lastKnown={LAST_KNOWN}
          trend={
            <>
              <WifiOff aria-hidden size={13} strokeWidth={2.6} />
              No signal in the stands
            </>
          }
          updated="Last updated 6:31 PM"
        />

        {/* The honest status, and the one thing you can do about it */}
        <section aria-labelledby="offline-title" className="mx-4 mt-3 rounded-card bg-white p-3.5 shadow-raised">
          <div className="flex items-start gap-3">
            <span className="grid size-[36px] shrink-0 place-items-center rounded-well bg-tint-neutral text-ink-2">
              <CloudOff aria-hidden size={18} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="offline-title" className="text-body font-semibold tracking-snug">
                You’re offline
              </h2>
              <p className="text-small text-ink-2">
                The stadium’s network is full. Your ticket, seat and map are saved on this phone.
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3">
            <p aria-live="polite" className="min-w-0 text-meta tabular text-ink-3">
              {trying ? 'Looking for signal…' : `Last try ${lastTry} · no signal`}
            </p>
            <Button variant="secondary" loading={trying} onClick={retry} className="shrink-0">
              {trying ? null : <RefreshCw size={16} strokeWidth={2.4} />}
              Retry
            </Button>
          </div>
        </section>

        <section aria-labelledby="works-title" className="mt-5">
          <SectionHeader title={<span id="works-title">Works without signal</span>} meta="saved on this phone" />
          <div className="mx-4 overflow-hidden rounded-card bg-white shadow-raised">
            <div className="flex items-center gap-3 border-b border-hairline px-3 py-2.5">
              <span className="grid size-[36px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                <Ticket aria-hidden size={18} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-body font-semibold tracking-snug">Your ticket</span>
                <span className="block truncate text-meta text-ink-3">In Apple Wallet · scans without signal</span>
              </span>
              <Badge tone="going" size="md">
                Ready
              </Badge>
            </div>

            {/* The seat, as scoreboard cells */}
            <dl className="grid grid-cols-3 divide-x divide-hairline border-b border-hairline py-2.5">
              {[
                { k: 'Section', v: '125' },
                { k: 'Row', v: '22' },
                { k: 'Enter at', v: 'Gate 2' },
              ].map((c) => (
                <div key={c.k} className="px-3">
                  <dt className="text-micro font-bold uppercase tracking-eyebrow text-ink-3">{c.k}</dt>
                  <dd className="mt-0.5 font-display text-display-sm font-bold leading-none tabular text-maroon">
                    {c.v}
                  </dd>
                </div>
              ))}
            </dl>

            <figure className="px-3 pb-3 pt-2.5">
              <StadiumMap />
              <figcaption className="mt-2 text-meta text-ink-2">
                Enter at Gate 2 on the east side. Sec 125 is just inside, toward the north end.
              </figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="paused-title" className="mx-4 mt-4 rounded-card border border-dashed border-hairline-strong px-3.5 py-3">
          <h2 id="paused-title" className="text-small font-semibold text-ink-2">
            Paused until you’re back online
          </h2>
          <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {PAUSED.map((p) => (
              <li key={p} className="flex items-center gap-1.5 text-meta text-ink-3">
                <span className="size-[5px] rounded-full bg-hairline-strong" />
                {p}
              </li>
            ))}
          </ul>
        </section>
      </ScrollBody>

      {/* The one action, docked above the tab bar */}
      <div className="absolute inset-x-0 bottom-[84px] z-20 border-t border-hairline bg-canvas/95 px-4 pb-2.5 pt-2.5 backdrop-blur-xl">
        <Button size="lg" className="w-full">
          <Ticket size={18} strokeWidth={2.4} />
          Show my ticket
        </Button>
      </div>
      <TabBar active="map" />
    </Screen>
  )
}

/**
 * Kyle Field from above, saved for offline: the field, the bowl, the open gates, and Section 125
 * in the east stands with Gate 2 right outside it. North is to the left.
 */
function StadiumMap() {
  const east = ['124', '125', '126', '127', '128', '129', '130', '131']
  const gates = [
    { n: '1', x: 26, y: 75 },
    { n: '4', x: 165, y: 142 },
    { n: '6', x: 304, y: 75 },
  ]
  return (
    <svg
      viewBox="0 0 330 150"
      role="img"
      aria-label="Kyle Field map, north to the left. Your seat, Section 125, is near the north end of the east stands. Gate 2 is right outside it."
      className="block h-auto w-full"
    >
      {/* Bowl, concourse, field */}
      <rect x="40" y="16" width="250" height="118" rx="46" className="fill-tint-neutral stroke-hairline-strong" strokeWidth="1" />
      <rect x="62" y="36" width="206" height="78" rx="28" className="fill-white stroke-hairline" strokeWidth="1" />
      <rect x="100" y="56" width="130" height="44" rx="4" className="fill-field" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={121.7 + i * 21.7} y1="58" x2={121.7 + i * 21.7} y2="98" className="stroke-white/30" strokeWidth="1" />
      ))}
      <text x="165" y="81.5" textAnchor="middle" className="fill-white/80 font-display text-micro font-bold tracking-caps">
        KYLE FIELD
      </text>

      {/* East stands, lower bowl: 124 at the north end */}
      {east.map((s, i) => (
        <rect
          key={s}
          x={106 + i * 15.5}
          y="20"
          width="13"
          height="12"
          rx="2"
          className={s === '125' ? 'fill-gold' : 'fill-maroon-soft'}
        />
      ))}
      <text x="234" y="30" className="fill-ink-3 text-tab font-semibold">
        East
      </text>
      <text x="128" y="49" textAnchor="middle" className="fill-ink text-tab font-bold">
        Sec 125 · Row 22
      </text>

      {/* Gates: yours solid, the others outlined */}
      {gates.map((g) => (
        <g key={g.n}>
          <circle cx={g.x} cy={g.y} r="8" className="fill-white stroke-hairline-strong" strokeWidth="1" />
          <text x={g.x} y={g.y + 3.5} textAnchor="middle" className="fill-ink-3 text-tab font-bold">
            {g.n}
          </text>
        </g>
      ))}
      <circle cx="127.5" cy="8" r="8" className="fill-maroon" />
      <text x="127.5" y="11.5" textAnchor="middle" className="fill-white text-tab font-bold">
        2
      </text>
      <text x="140" y="11.5" className="fill-maroon text-tab font-bold">
        Gate 2 · Joe Routt Blvd
      </text>
    </svg>
  )
}
