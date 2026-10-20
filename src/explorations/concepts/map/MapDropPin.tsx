import { Check, Clock, Move, MapPin, Plus, Search, X } from 'lucide-react'
import { useRef, useState, type PointerEvent } from 'react'
import { Avatar } from '../../../components/Avatar'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Device'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton } from '../../../components/ui'
import { NODE_META, type Node } from '../../../data/events'
import { CAMPUS_PINS, CampusMap } from '../../CampusMap'
import { CapsuleTitle, MapCapsule, MapScrim, MapSheet, MapToast, SheetTitle } from './MapChrome'

const SHIFT = 70
/** Northgate, in map coordinates: where the long-press landed. */
const NORTHGATE = { x: 222, y: 200 }

/** Each node widens who sees the pin: the ring grows out from campus to the cities around it. */
/** `deg` places each ring's label around it (0° = east, clockwise) so the three never stack. */
const REACH: { node: Node; label: string; r: number; deg: number; people: number; ring: string; tag: string }[] = [
  {
    node: 'tamu',
    label: 'Texas A&M',
    r: 74,
    deg: 150,
    people: 860,
    ring: 'border-maroon bg-maroon/10',
    tag: 'bg-maroon text-white',
  },
  {
    node: 'cstat',
    label: 'College Station',
    r: 120,
    deg: 210,
    people: 410,
    ring: 'border-cstat bg-cstat/[0.07]',
    tag: 'bg-cstat text-white',
  },
  {
    node: 'bryan',
    label: 'Bryan',
    r: 168,
    deg: 320,
    people: 190,
    ring: 'border-bryan bg-bryan/[0.05]',
    tag: 'bg-bryan text-white',
  },
]

/** Friends inside the rings, in map coordinates. */
const FRIENDS: { initials: string; color: 1 | 2 | 3 | 4 | 5 | 6; x: number; y: number; node: Node }[] = [
  { initials: 'MR', color: 2, x: 240, y: 225, node: 'tamu' },
  { initials: 'AL', color: 3, x: 266, y: 166, node: 'tamu' },
  { initials: 'DS', color: 5, x: 312, y: 270, node: 'cstat' },
  { initials: 'BN', color: 6, x: 300, y: 140, node: 'cstat' },
  { initials: 'KT', color: 4, x: 100, y: 290, node: 'bryan' },
]

function nearest(x: number, y: number) {
  return CAMPUS_PINS.reduce((a, b) => (Math.hypot(b.x - x, b.y - y) < Math.hypot(a.x - x, a.y - y) ? b : a))
}

/** Solid pin colours once posted, per node. */
const SOLID: Record<Node, string> = { tamu: 'bg-maroon', cstat: 'bg-cstat', bryan: 'bg-bryan' }

function Rings({
  at,
  on,
  node,
  posted,
  onHold,
}: {
  at: { x: number; y: number }
  on: Record<Node, boolean>
  /** The node the pin sits in: its colour once posted. */
  node: Node
  posted: boolean
  onHold: (x: number, y: number) => void
}) {
  const timer = useRef<number | undefined>(undefined)
  const down = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => onHold(x, y), 450)
  }
  const cancel = () => window.clearTimeout(timer.current)
  return (
    <>
      {/* Long-press anywhere on the map to move the pin */}
      <div aria-hidden className="absolute inset-0" onPointerDown={down} onPointerUp={cancel} onPointerLeave={cancel} />

      {[...REACH].reverse().map((n) => (
        <span
          key={n.node}
          aria-hidden
          className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[opacity,scale] duration-(--duration-base) ease-(--ease-out-expo) ${n.ring} ${
            on[n.node] ? 'scale-100 opacity-100' : 'scale-90 border-dashed opacity-30'
          }`}
          style={{ left: at.x, top: at.y, width: n.r * 2, height: n.r * 2 }}
        >
          <span
            style={{
              left: n.r * (1 + Math.cos((n.deg * Math.PI) / 180)),
              top: n.r * (1 + Math.sin((n.deg * Math.PI) / 180)),
            }}
            className={`absolute flex h-[20px] -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full px-2 text-micro font-bold shadow-floating ${
              on[n.node] ? n.tag : 'bg-white text-ink-3'
            }`}
          >
            {n.label}
          </span>
        </span>
      ))}

      {FRIENDS.filter((f) => on[f.node]).map((f) => (
        <span
          key={f.initials}
          aria-hidden
          className="pointer-events-none absolute z-[6] -translate-x-1/2 -translate-y-1/2"
          style={{ left: f.x, top: f.y }}
        >
          <Avatar initials={f.initials} color={f.color} size={26} className="ring-2 ring-white shadow-floating" />
        </span>
      ))}

      {/*
        The dropped pin. Before posting it is a draft you can see is movable: a white head inside a
        dashed grip ring, with a "Hold & drag" tag. Posting turns it solid in its node's colour.
      */}
      <span
        aria-hidden
        className="pointer-events-none absolute z-[7] -translate-x-1/2 -translate-y-full"
        style={{ left: at.x, top: at.y }}
      >
        <span className="absolute -bottom-[5px] left-1/2 h-[10px] w-[22px] -translate-x-1/2 rounded-full bg-black/20 blur-[2px]" />
        {posted ? null : (
          <span className="absolute -top-[34px] left-1/2 flex h-[24px] -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-ink px-2.5 text-micro font-bold text-white shadow-floating">
            <Move size={12} strokeWidth={2.4} /> Hold &amp; drag
          </span>
        )}
        <span className="relative flex flex-col items-center">
          <span className="relative grid size-[44px] place-items-center">
            {posted ? null : (
              <span className="absolute -inset-[6px] rounded-full border-2 border-dashed border-ink/45 bg-white/40" />
            )}
            <span
              className={`relative grid size-[44px] place-items-center rounded-full shadow-floating ring-[3px] ring-white transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
                posted ? `${SOLID[node]} text-white` : `bg-white ${NODE_META[node].text}`
              }`}
            >
              <MapPin size={22} strokeWidth={2.4} fill="currentColor" fillOpacity={posted ? 0.35 : 0.15} />
            </span>
          </span>
          <span className={`h-[14px] w-[3px] rounded-full ${posted ? SOLID[node] : 'bg-ink/45'}`} />
        </span>
      </span>
    </>
  )
}

/** The time in the plan sentence, read as tonight: "10:30" after a 9:15 PM final is 10:30 PM. */
function readTime(text: string) {
  const m = /\b(\d{1,2})(?::(\d{2}))?\s?(am|pm)?\b/i.exec(text)
  if (!m) return undefined
  const h = Number(m[1])
  if (h < 1 || h > 12) return undefined
  return `${h}:${m[2] ?? '00'} ${m[3]?.toLowerCase() === 'am' ? 'AM' : 'PM'}`
}

/**
 * Concept 2 · The Map — 6 · Quick Event. Long-press the map and a pin drops where the plan is.
 * The sheet takes the plan as one sentence; rings around the pin show who will see it, widening
 * from A&M to College Station to Bryan as each node is switched on.
 */
export function MapDropPin() {
  const [text, setText] = useState('Whataburger after the game, 10:30')
  const [at, setAt] = useState(NORTHGATE)
  const [on, setOn] = useState<Record<Node, boolean>>({ tamu: true, cstat: true, bryan: false })
  const [posted, setPosted] = useState(false)
  const atNorthgate = Math.hypot(at.x - NORTHGATE.x, at.y - NORTHGATE.y) < 24
  const place = atNorthgate ? 'Northgate' : `Near ${nearest(at.x, at.y).label}`
  const node: Node = atNorthgate ? 'cstat' : nearest(at.x, at.y).node
  const time = readTime(text)
  const reach = REACH.filter((n) => on[n.node])
  const people = reach.reduce((s, n) => s + n.people, 0)
  const friends = FRIENDS.filter((f) => on[f.node]).length

  return (
    <Screen>
      <CampusMap
        shift={SHIFT}
        pins={CAMPUS_PINS.filter((p) => ['market', 'rec'].includes(p.id))}
        overlay={
          <Rings
            at={at}
            on={on}
            node={node}
            posted={posted}
            onHold={(x, y) => {
              setAt({ x, y })
              setPosted(false)
            }}
          />
        }
      />
      <MapScrim />
      <StatusBar tone="dark" />

      <MapCapsule>
        <IconButton label="Cancel Quick Event" to="/">
          <X size={19} />
        </IconButton>
        <CapsuleTitle title="Quick Event" meta="Hold the map anywhere to move the pin" />
        <IconButton label="Search for a place">
          <Search size={18} />
        </IconButton>
      </MapCapsule>

      <MapSheet labelledBy="drop-title">
        <MapToast show={posted} onUndo={() => setPosted(false)}>
          Posted at {place}
        </MapToast>
        <SheetTitle
          id="drop-title"
          size={place.length > 12 ? 'lg' : 'xl'}
          kicker={
            <>
              <span aria-hidden className={`size-[8px] rounded-full ${SOLID[node]}`} />
              {NODE_META[node].label} · Drop a pin
            </>
          }
          aside={
            <>
              <span className="tabular">12 min</span> walk
            </>
          }
        >
          {place}
        </SheetTitle>

        <label className="mt-2.5 block">
          <span className="sr-only">What's the plan?</span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's the plan?"
            className="h-[52px] w-full rounded-thumb bg-white px-3.5 text-emphasis font-semibold tracking-snug text-ink shadow-raised outline-none ring-1 ring-hairline placeholder:font-normal placeholder:text-ink-3 focus:ring-2 focus:ring-maroon"
          />
        </label>
        <ul aria-label="Read from your plan" className="mt-2 flex gap-1.5">
          <li className="flex h-[26px] items-center gap-1 rounded-full bg-white px-2.5 text-meta font-semibold text-ink-2 ring-1 ring-hairline">
            <Clock aria-hidden size={12} className="text-maroon" />
            Tonight · {time ?? 'add a time'}
          </li>
          <li className="flex h-[26px] items-center gap-1 rounded-full bg-ok/10 px-2.5 text-meta font-semibold text-ok">
            <Check aria-hidden size={12} strokeWidth={3} />
            After the game · ends ~9:15
          </li>
        </ul>

        <div className="mt-3.5 flex items-baseline justify-between">
          <h3 className="text-card font-semibold tracking-snug">Who sees it</h3>
          <span aria-live="polite" className="flex items-baseline gap-1 text-meta text-ink-3">
            <span className="font-display text-display-sm font-bold leading-none text-ink tabular">
              {people.toLocaleString('en-US')}
            </span>
            nearby · <span className="tabular">{friends}</span> friends
          </span>
        </div>
        <div role="group" aria-label="Nodes that see this event" className="mt-1.5 flex gap-1.5">
          {REACH.map((n) => {
            const m = NODE_META[n.node]
            return (
              <button
                key={n.node}
                type="button"
                aria-pressed={on[n.node]}
                onClick={() => setOn((s) => ({ ...s, [n.node]: !s[n.node] }))}
                className={`flex h-[44px] flex-auto items-center justify-center gap-1.5 rounded-thumb px-2.5 text-control font-semibold transition-[transform,background-color,color] duration-(--duration-quick) ease-(--ease-out-expo) active:scale-[0.97] motion-reduce:transition-none ${
                  on[n.node] ? `${SOLID[n.node]} text-white shadow-raised` : 'bg-white text-ink-2 ring-1 ring-hairline'
                }`}
              >
                <span
                  aria-hidden
                  className={`grid size-[18px] shrink-0 place-items-center rounded-full ${
                    on[n.node] ? 'bg-white/25' : `${m.bg} ${m.text}`
                  }`}
                >
                  {on[n.node] ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
                </span>
                <span className="whitespace-nowrap">{n.label}</span>
              </button>
            )
          })}
        </div>

        {posted ? (
          <Button size="lg" variant="secondary" className="mt-3 w-full" onClick={() => setPosted(false)}>
            <Check size={18} strokeWidth={2.6} className={NODE_META[node].text} /> Posted · tap to edit
          </Button>
        ) : (
          <Button
            size="lg"
            className="mt-3 w-full"
            disabled={!text.trim() || !reach.length}
            onClick={() => setPosted(true)}
          >
            <MapPin size={18} /> Post here
          </Button>
        )}
      </MapSheet>

      <TabBar active="map" />
    </Screen>
  )
}
