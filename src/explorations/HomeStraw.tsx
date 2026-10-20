import { Bell, Check, ChevronsUpDown, MapPin, RotateCcw, Search } from 'lucide-react'
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Avatar } from '../components/Avatar'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Screen, ScrollBody } from '../components/Device'
import { AggieMark, MatchupThumb } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { NODE_META, type Node } from '../data/events'
import { BigTime, OnRail, TimeRail } from './concepts/day/Rail'
import { LANE_X, RAIL_X, clock, split, timeAt, timeScale } from './concepts/day/time'

/** Every event on Saturday is a sheet of paper. Hours are 24h decimals. */
type Sheet = { id: string; title: string; place: string; node: Node; img?: string; start: number; end: number }

const SHEETS: Sheet[] = [
  {
    id: 'market',
    title: 'Farmers Market',
    place: 'Wolf Pen Creek',
    node: 'cstat',
    img: '/img/farmers-market.jpg',
    start: 8,
    end: 12,
  },
  {
    id: 'brunch',
    title: '12th Man Brunch',
    place: 'Hall of Champions',
    node: 'tamu',
    img: '/img/twelfth-man.jpg',
    start: 9,
    end: 11,
  },
  { id: 'bryan', title: 'Downtown Bryan Market', place: 'Main St, Bryan', node: 'bryan', start: 9, end: 13 },
  {
    id: 'tailgate',
    title: 'Tailgate Zone — Lot C',
    place: 'Kyle Field',
    node: 'tamu',
    img: '/img/kyle-field-stands.jpg',
    start: 10,
    end: 18,
  },
  {
    id: 'march',
    title: 'Corps March-In',
    place: 'Quad → Kyle Field',
    node: 'tamu',
    img: '/img/aggie-band.jpg',
    start: 15.75,
    end: 16.5,
  },
  { id: 'game', title: 'A&M vs LSU', place: 'Kyle Field', node: 'tamu', start: 18, end: 21.5 },
]

const NODES: { node: Node; label: string }[] = [
  { node: 'tamu', label: 'A&M' },
  { node: 'cstat', label: 'College Station' },
  { node: 'bryan', label: 'Bryan' },
]

const NOW = 9 + 41 / 60

/**
 * The stack, laid down the rail by start time. The straw opens a gap in it at the time it's set to,
 * so NOW always sits between sheets instead of across one; the scale is rebuilt around that gap so
 * hour marks, sheets and NOW stay honest to each other.
 */
const FIRST = 7.5
const LAST = 22.5
const CARD = 56
const STEP = 64
const GAP = 38
const PAD = 10

function layout(t: number) {
  // Ties (two sheets at 9 AM) get a hair apart so the scale stays monotonic
  const keys = SHEETS.map((s, i) => s.start + i * 1e-4)
  const k = keys.filter((e) => e <= t).length
  const rows: number[] = []
  let cursor = PAD
  let nowY = 0
  SHEETS.forEach((_, i) => {
    if (i === k) {
      nowY = cursor + GAP / 2 - (STEP - CARD) / 2
      cursor += GAP
    }
    rows.push(cursor + CARD / 2)
    cursor += STEP
  })
  if (k === SHEETS.length) {
    nowY = cursor + GAP / 2 - (STEP - CARD) / 2
    cursor += GAP
  }
  const stops: [number, number][] = [[FIRST, 0]]
  keys.forEach((e, i) => {
    if (i === k) stops.push([Math.max(t, (keys[i - 1] ?? FIRST) + 1e-5), nowY])
    stops.push([e, rows[i]])
  })
  if (k === SHEETS.length) stops.push([Math.max(t, keys[k - 1] + 1e-5), nowY])
  stops.push([LAST, cursor])
  return { rows, stops, y: timeScale(stops), at: timeAt(stops) }
}

/** Hour marks: each distinct start. */
const HOURS = [...new Set(SHEETS.map((s) => s.start))]

/** Snap a dragged time to five minutes, inside the day the rail shows. */
const snap = (h: number) => Math.min(LAST, Math.max(FIRST, Math.round(h * 12) / 12))

/** "9:00–11:00 AM": the sheet's span with one en dash; both meridiems only when it crosses noon. */
const span = (s: Sheet) =>
  split(s.start).ap === split(s.end).ap ? `${split(s.start).hm}–${clock(s.end)}` : `${clock(s.start)}–${clock(s.end)}`

/**
 * Exploration · Home as Troy's straw, stood upright (concept 1 · The Day, stage 2).
 * Every live event is a sheet of paper and you are a straw punched through the stack. The rail is the
 * day; NOW is where the straw is. Sheets it pierces lift off the page in white; the rest recede and say
 * why in plain words. Tap an hour to move the straw there, and switch nodes on and off.
 */
export function HomeStraw({
  initialTime = NOW,
}: {
  /**
   * Where the straw starts, as a 24h decimal (18.5 = 6:30 PM). Defaults to now, 9:41 AM; any other
   * time opens Home in its VIEWING state, with Back to now.
   */
  initialTime?: number
} = {}) {
  const [t, setT] = useState(initialTime)
  const viewing = Math.abs(t - NOW) > 1 / 120
  const { rows, y, at } = layout(t)
  /** The scale as it was when the drag began: the stack reflows under the finger, the mapping doesn't. */
  const dragAt = useRef<((px: number) => number) | null>(null)
  const [on, setOn] = useState<Record<Node, boolean>>({ tamu: true, cstat: true, bryan: false })
  const pierced = (s: Sheet) => on[s.node] && s.start <= t && t < s.end
  const hits = SHEETS.filter(pierced)
  const first = hits[0]?.id
  const { hm, ap } = split(t)

  /** The rail is the control: press anywhere in the hour column to put the straw there, then drag. */
  const fromPointer = (e: PointerEvent<HTMLElement>, map: (px: number) => number) => {
    const top = e.currentTarget.getBoundingClientRect().top
    setT(snap(map(e.clientY - top)))
  }
  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowUp: -0.25, ArrowDown: 0.25, PageUp: -1, PageDown: 1 }[e.key]
    if (step !== undefined) {
      e.preventDefault()
      setT((v) => snap(v + step))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setT(NOW)
    }
  }

  /** Why a sheet isn't on the straw, in plain words. */
  const why = (s: Sheet) =>
    !on[s.node] ? `${NODES.find((n) => n.node === s.node)?.label} is off` : s.end <= t ? 'Ended' : 'Later today'

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-3.5 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center gap-1">
            <span className="ml-1 flex min-w-0 flex-1 items-center gap-2">
              <AggieMark size={28} />
              <span className="truncate text-small font-semibold text-white/80">Texas A&amp;M · Sat, Oct 12</span>
            </span>
            <IconButton label="Search events, places, people">
              <Search size={18} />
            </IconButton>
            <IconButton label="Notifications">
              <Bell size={18} />
            </IconButton>
            <button type="button" aria-label="Profile" className="press grid size-[44px] place-items-center">
              <Avatar initials="JC" size={32} className="ring-2 ring-white/25" />
            </button>
          </div>

          <h1 className="sr-only">Home · your Saturday</h1>
          <div className="mt-3">
            <BigTime
              kicker={viewing ? `VIEWING ${clock(t)} · NOT NOW` : 'GOOD MORNING, AGGIE'}
              value={hm}
              unit={ap}
              label={viewing ? `Viewing ${clock(t)}, Saturday` : `${clock(t)}, Saturday`}
              caption={
                <span className="flex min-h-[28px] items-center justify-between gap-3">
                  <span aria-live="polite">
                    <b className="font-semibold text-white">
                      {hits.length} of {SHEETS.length} sheets
                    </b>{' '}
                    · {viewing ? `on at ${clock(t)}` : 'on now'}
                  </span>
                  {viewing ? (
                    <button
                      type="button"
                      onClick={() => setT(NOW)}
                      className="press relative flex h-[28px] shrink-0 items-center gap-1.5 rounded-full bg-white px-3 text-meta font-semibold text-maroon after:absolute after:-inset-2 after:content-['']"
                    >
                      <RotateCcw size={12} strokeWidth={2.6} /> Back to now · {split(NOW).hm}
                    </button>
                  ) : null}
                </span>
              }
            />
          </div>

          <div className="no-scrollbar -mx-4 mt-3.5 flex gap-2 overflow-x-auto px-4">
            {NODES.map(({ node, label }) => (
              <Chip
                key={node}
                surface="onMaroon"
                selected={on[node]}
                onClick={() => setOn((o) => ({ ...o, [node]: !o[node] }))}
                leading={
                  on[node] ? (
                    <span
                      className={`ml-0.5 grid size-[20px] place-items-center rounded-full text-white ${NODE_META[node].dot}`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="ml-0.5 size-[20px] rounded-full ring-2 ring-inset ring-white/60" />
                  )
                }
              >
                {label}
              </Chip>
            ))}
          </div>
        </header>

        <section aria-labelledby="straw-title" className="pt-3">
          <div className="flex items-baseline justify-between px-4">
            <h2 id="straw-title" className="text-micro font-bold tracking-caps text-maroon">
              YOUR STRAW · SATURDAY
            </h2>
            <span aria-hidden className="flex items-center gap-2.5 text-meta text-ink-3">
              <span className="flex items-center gap-1">
                <span className="size-[8px] rounded-full bg-gold ring-2 ring-gold/30" />{' '}
                {viewing ? `On at ${hm}` : 'On now'}
              </span>
              <span className="flex items-center gap-1">
                <span className="size-[8px] rounded-full bg-white ring-2 ring-hairline-strong" />{' '}
                {viewing ? 'Not then' : 'Not now'}
              </span>
            </span>
          </div>

          <div className="mt-1">
            <TimeRail
              y={y}
              from={FIRST}
              to={LAST}
              now={t}
              marks={HOURS.map((h) => ({ h }))}
              nowTag={viewing ? 'VIEW' : 'NOW'}
              nowHint={
                <>
                  <ChevronsUpDown size={13} className="text-maroon" /> Drag through the day
                </>
              }
              label="Saturday's sheets"
            >
              {/* The straw's grip: the hour column is the drag surface, the ring is the keyboard slider */}
              <li
                className="absolute inset-y-0 left-0 z-30 cursor-grab touch-none active:cursor-grabbing"
                style={{ width: LANE_X - 8 }}
                onPointerDown={(e) => {
                  dragAt.current = at
                  e.currentTarget.setPointerCapture(e.pointerId)
                  fromPointer(e, at)
                }}
                onPointerMove={(e) => {
                  if (dragAt.current) fromPointer(e, dragAt.current)
                }}
                onPointerUp={() => {
                  dragAt.current = null
                }}
                onPointerCancel={() => {
                  dragAt.current = null
                }}
              >
                <span
                  role="slider"
                  tabIndex={0}
                  aria-label="Straw time, drag through the day"
                  aria-orientation="vertical"
                  aria-valuemin={FIRST}
                  aria-valuemax={LAST}
                  aria-valuenow={t}
                  aria-valuetext={viewing ? `Viewing ${clock(t)}` : `Now, ${clock(t)}`}
                  onKeyDown={onKey}
                  className="absolute size-[44px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: RAIL_X, top: y(t) }}
                />
              </li>

              {SHEETS.map((s, i) => {
                const hit = pierced(s)
                return (
                  <OnRail key={s.id} y={rows[i]} pierce={hit ? 'gold' : 'open'} className={hit ? 'z-10' : ''}>
                    {/* The straw through the sheet: a gold stub from the rail into the paper */}
                    <span
                      aria-hidden
                      className={`absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gold transition-opacity duration-(--duration-quick) ease-(--ease-out-expo) ${
                        hit ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ left: RAIL_X - LANE_X, width: LANE_X - RAIL_X + 6 }}
                    />
                    <div
                      aria-label={`${s.title}, ${span(s)}, ${hit ? 'on your straw' : why(s).toLowerCase()}`}
                      className={`relative flex h-[56px] origin-left items-center gap-2.5 rounded-thumb pl-1.5 pr-2 transition-[transform,background-color,box-shadow] duration-(--duration-quick) ease-(--ease-out-expo) ${
                        hit ? 'bg-white shadow-floating' : 'scale-[0.95] bg-canvas ring-1 ring-hairline-strong'
                      }`}
                    >
                      <span
                        className={`shrink-0 transition-[filter,opacity] duration-(--duration-quick) ease-(--ease-out-expo) ${
                          hit ? '' : 'opacity-70 grayscale'
                        }`}
                      >
                        {s.id === 'game' ? (
                          <MatchupThumb size={44} />
                        ) : s.img ? (
                          <img src={s.img} alt="" className="size-[44px] rounded-well object-cover" />
                        ) : (
                          <span
                            className={`grid size-[44px] place-items-center rounded-well ${NODE_META[s.node].bg} ${NODE_META[s.node].text}`}
                          >
                            <MapPin size={18} />
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <span
                          className={`block truncate tracking-snug ${
                            hit ? 'text-body font-semibold text-ink' : 'text-control font-semibold text-ink-2'
                          }`}
                        >
                          {s.title}
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 text-meta text-ink-3">
                          <span className={`size-[6px] shrink-0 rounded-full ${NODE_META[s.node].dot}`} />
                          <span className="truncate">
                            {hit ? null : <b className="font-semibold text-ink-2">{why(s)} · </b>}
                            {span(s)} · {s.place}
                          </span>
                        </span>
                      </span>
                      {hit && s.id === first ? (
                        <Button size="sm" className="shrink-0">
                          Go
                        </Button>
                      ) : hit ? (
                        <Badge tone="live" size="sm" />
                      ) : null}
                    </div>
                  </OnRail>
                )
              })}
            </TimeRail>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
