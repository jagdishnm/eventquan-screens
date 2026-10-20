import { LiveDot } from '../components/Badge'
import { NODE_META, type Node } from '../data/events'

/**
 * Explorations: a stylised College Station map, drawn in skin tokens so it reads like
 * Apple Maps' light style without a tile provider. Coordinates are screen points on a
 * 393pt-wide frame; `shift` slides the whole map up so a pin clears a tall sheet.
 */

export type MapPinSpec = {
  id: string
  x: number
  y: number
  label: string
  node: Node
  live?: boolean
  /** Short line after the label on the selected pin, e.g. "1.1K here". */
  detail?: string
}

export const CAMPUS_PINS: MapPinSpec[] = [
  { id: 'bryan', x: 318, y: 250, label: 'Downtown Bryan', node: 'bryan' },
  { id: 'northgate', x: 222, y: 196, label: 'Northgate', node: 'cstat' },
  { id: 'msc', x: 168, y: 262, label: 'MSC Open House', node: 'tamu' },
  { id: 'rec', x: 74, y: 338, label: 'Pickup volleyball', node: 'tamu' },
  { id: 'market', x: 292, y: 330, label: 'Farmers Market', node: 'cstat', live: true, detail: '1.1K here' },
  { id: 'kyle', x: 222, y: 398, label: 'Kyle Field', node: 'tamu', detail: 'Kickoff 6 PM' },
  { id: 'tailgate', x: 300, y: 452, label: 'Tailgate · Lot C', node: 'tamu' },
  { id: 'reed', x: 66, y: 470, label: 'Reed Arena', node: 'tamu' },
]

/** Main roads as [x1, y1, x2, y2] with a label anchor. */
const ROADS = [
  { d: 'M118 -40 L140 900', label: 'WELLBORN RD', lx: 112, ly: 590, rot: 88.6 },
  { d: 'M-20 214 L413 192', label: 'UNIVERSITY DR', lx: 300, ly: 194, rot: -2.9 },
  { d: 'M-20 556 L413 584', label: 'GEORGE BUSH DR', lx: 250, ly: 573, rot: 3.7 },
  { d: 'M384 -40 L364 900', label: 'TEXAS AVE', lx: 371, ly: 690, rot: -88.8 },
]
const STREETS = ['M140 318 L364 304', 'M198 192 L188 584', 'M140 470 L364 486', 'M0 382 L118 380', 'M268 192 L262 584']

/** Deterministic building footprints: a loose grid, thinned so it doesn't read as a pattern. */
const BUILDINGS = (() => {
  const out: { x: number; y: number; w: number; h: number }[] = []
  for (let i = 0; i < 13; i++)
    for (let j = 0; j < 30; j++) {
      if ((i * 7 + j * 13) % 5 === 0 || (i * 3 + j) % 7 === 0) continue
      out.push({ x: 4 + i * 31 + ((j * 5) % 7), y: -8 + j * 30, w: 18 + ((i + j) % 3) * 4, h: 14 + ((i * j) % 3) * 3 })
    }
  return out
})()

function Pin({ pin, selected }: { pin: MapPinSpec; selected: boolean }) {
  const m = NODE_META[pin.node]
  return (
    <button
      type="button"
      aria-label={`${pin.label}${pin.live ? ', live now' : ''}${pin.detail ? `, ${pin.detail}` : ''}`}
      aria-pressed={selected}
      className="absolute z-10 -translate-x-1/2 -translate-y-full after:absolute after:-inset-[9px] after:content-['']"
      style={{ left: pin.x, top: pin.y }}
    >
      <span
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold tracking-snug shadow-floating ${
          selected ? 'h-[34px] bg-maroon px-3 text-control text-white' : 'h-[26px] bg-white px-2.5 text-meta text-ink'
        }`}
      >
        {/* The node colour always shows; a live event adds the red live dot after its name. */}
        <span className={`size-[7px] rounded-full ${selected ? 'bg-white' : m.dot}`} />
        {pin.label}
        {pin.live ? <LiveDot /> : null}
        {selected && pin.detail ? <span className="font-medium text-white/75">· {pin.detail}</span> : null}
      </span>
      <span
        aria-hidden
        className={`mx-auto block size-[9px] -translate-y-[5px] rotate-45 ${selected ? 'bg-maroon' : 'bg-white'}`}
      />
    </button>
  )
}

export function CampusMap({
  selected,
  shift = 0,
  pins = CAMPUS_PINS,
}: {
  selected?: string
  shift?: number
  pins?: MapPinSpec[]
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-canvas">
      <div className="absolute inset-x-0 top-0 h-[1000px]" style={{ transform: `translateY(${shift}px)` }}>
        <svg aria-hidden width="393" height="1000" viewBox="0 0 393 1000" className="absolute left-0 top-0">
          {BUILDINGS.map((b, k) => (
            <rect key={k} x={b.x} y={b.y} width={b.w} height={b.h} rx="3" className="fill-white stroke-hairline" />
          ))}
          {/* Green space: West Campus, Simpson Drill Field, Wolf Pen Creek */}
          <rect x="-10" y="600" width="128" height="260" rx="10" className="fill-tint-green" />
          <rect x="142" y="222" width="54" height="78" rx="6" className="fill-tint-green" />
          <ellipse cx="322" cy="352" rx="40" ry="46" className="fill-tint-green" />
          <path
            d="M300 250 C 340 300, 290 360, 330 410 S 360 520, 352 600"
            className="fill-none stroke-tint-sky"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Roads: a hairline casing under a white fill */}
          {STREETS.map((d) => (
            <g key={d}>
              <path d={d} className="stroke-hairline-strong" strokeWidth="7" fill="none" />
              <path d={d} className="stroke-white" strokeWidth="5" fill="none" />
            </g>
          ))}
          {ROADS.map((r) => (
            <g key={r.label}>
              <path d={r.d} className="stroke-hairline-strong" strokeWidth="15" fill="none" />
              <path d={r.d} className="stroke-white" strokeWidth="12" fill="none" />
            </g>
          ))}
          <path d="M106 -40 L128 900" className="stroke-ink-3/50" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
          {/* Kyle Field: the bowl and the field */}
          <rect
            x="182"
            y="404"
            width="84"
            height="66"
            rx="30"
            className="fill-maroon-soft stroke-maroon/40"
            strokeWidth="2"
          />
          <rect
            x="204"
            y="422"
            width="40"
            height="30"
            rx="4"
            className="fill-tint-green stroke-white"
            strokeWidth="1.5"
          />
          {ROADS.map((r) => (
            <text
              key={r.label}
              x={r.lx}
              y={r.ly}
              transform={`rotate(${r.rot} ${r.lx} ${r.ly})`}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-ink-3 text-tab font-semibold tracking-eyebrow"
            >
              {r.label}
            </text>
          ))}
        </svg>

        {/* You are here */}
        <span aria-hidden className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: 150, top: 382 }}>
          <span className="absolute -inset-[14px] rounded-full bg-tint-sky-ink/15" />
          <span className="relative block size-[16px] rounded-full bg-tint-sky-ink ring-[3px] ring-white shadow-floating" />
        </span>

        {pins.map((p) => (
          <Pin key={p.id} pin={p} selected={p.id === selected} />
        ))}
      </div>
    </div>
  )
}
