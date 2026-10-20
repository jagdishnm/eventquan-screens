import type { ReactNode } from 'react'
import { LiveDot } from '../components/Badge'
import { NODE_META, type Node } from '../data/events'

/**
 * Explorations: a stylised College Station map, drawn in skin tokens so it reads like
 * Apple Maps' light style without a tile provider. Coordinates are screen points on a
 * 393pt-wide frame; `shift` slides the whole map up so a pin clears a tall sheet.
 *
 * The land is warm, each node owns its district (A&M maroon, College Station green, Bryan
 * blue), blocks take their district's tint and the roads stay white on top, so the street
 * grid reads as figure and the districts as ground. Kyle Field is drawn as its bowl.
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

/** Where the blue dot sits, in map coordinates. */
export const YOU_AT = { left: 150, top: 382 }

/** Main roads as [x1, y1, x2, y2] with a label anchor. */
const ROADS = [
  { d: 'M118 -40 L140 900', label: 'WELLBORN RD', lx: 112, ly: 590, rot: 88.6 },
  { d: 'M-20 214 L413 192', label: 'UNIVERSITY DR', lx: 300, ly: 194, rot: -2.9 },
  { d: 'M-20 556 L413 584', label: 'GEORGE BUSH DR', lx: 250, ly: 573, rot: 3.7 },
  { d: 'M384 -40 L364 900', label: 'TEXAS AVE', lx: 371, ly: 690, rot: -88.8 },
]
const STREETS = ['M140 318 L364 304', 'M198 192 L188 584', 'M140 470 L364 486', 'M0 382 L118 380', 'M268 192 L262 584']

/**
 * Node districts, in paint order: each is a soft rounded area under the blocks. The campus
 * runs from Wellborn to the creek; Northgate and Wolf Pen Creek are College Station; the
 * north-east corner is Bryan.
 */
type District = { node: Node; x: number; y: number; w: number; h: number }
const DISTRICTS: District[] = [
  { node: 'bryan', x: 280, y: -60, w: 160, h: 316 },
  { node: 'cstat', x: 128, y: 40, w: 150, h: 150 },
  { node: 'cstat', x: 274, y: 262, w: 150, h: 160 },
  { node: 'tamu', x: 124, y: 206, w: 148, h: 370 },
  { node: 'tamu', x: 268, y: 424, w: 104, h: 152 },
  { node: 'tamu', x: -30, y: 392, w: 150, h: 520 },
]
const WASH: Record<Node, string> = { tamu: 'fill-maroon-soft', cstat: 'fill-cstat-soft', bryan: 'fill-bryan-soft' }
const BLOCK: Record<Node | 'none', string> = {
  tamu: 'fill-maroon/10',
  cstat: 'fill-cstat/12',
  bryan: 'fill-bryan/12',
  none: 'fill-paper-2',
}
/** District labels in spaced caps, as a printed map sets its neighbourhoods. */
const DISTRICT_LABELS: { text: string; x: number; y: number; node: Node }[] = [
  { text: 'TEXAS A&M', x: 160, y: 532, node: 'tamu' },
  { text: 'NORTHGATE', x: 172, y: 112, node: 'cstat' },
  { text: 'BRYAN', x: 334, y: 92, node: 'bryan' },
  { text: 'WOLF PEN CREEK', x: 336, y: 402, node: 'cstat' },
  { text: 'WEST CAMPUS', x: 60, y: 560, node: 'tamu' },
]
const LABEL_INK: Record<Node, string> = { tamu: 'fill-maroon/55', cstat: 'fill-cstat/65', bryan: 'fill-bryan/65' }

function districtOf(x: number, y: number): Node | 'none' {
  // Last match wins, matching paint order
  let hit: Node | 'none' = 'none'
  for (const d of DISTRICTS) if (x >= d.x && x <= d.x + d.w && y >= d.y && y <= d.y + d.h) hit = d.node
  return hit
}

/** Deterministic building footprints: a loose grid, thinned so it doesn't read as a pattern. */
const BUILDINGS = (() => {
  const out: { x: number; y: number; w: number; h: number; tone: string }[] = []
  for (let i = 0; i < 13; i++)
    for (let j = 0; j < 30; j++) {
      if ((i * 7 + j * 13) % 5 === 0 || (i * 3 + j) % 7 === 0) continue
      const x = 4 + i * 31 + ((j * 5) % 7)
      const y = -8 + j * 30
      const w = 18 + ((i + j) % 3) * 4
      const h = 14 + ((i * j) % 3) * 3
      out.push({ x, y, w, h, tone: BLOCK[districtOf(x + w / 2, y + h / 2)] })
    }
  return out
})()

/** Kyle Field from above: upper deck, lower bowl, the field and its maroon end zones. */
function KyleBowl() {
  return (
    <g>
      <rect x="180" y="402" width="88" height="72" rx="34" className="fill-maroon" />
      <rect x="185" y="407" width="78" height="62" rx="29" className="fill-none stroke-white/20" strokeWidth="1" />
      <rect x="192" y="413" width="64" height="50" rx="22" className="fill-maroon-line" />
      <rect x="211" y="419" width="26" height="38" rx="2" className="fill-field" />
      <rect x="211" y="419" width="26" height="5" rx="1.5" className="fill-maroon" />
      <rect x="211" y="452" width="26" height="5" rx="1.5" className="fill-maroon" />
      {[0, 1, 2, 3, 4].map((k) => (
        <line
          key={k}
          x1="211"
          x2="237"
          y1={428 + k * 5.5}
          y2={428 + k * 5.5}
          className={k === 2 ? 'stroke-white/70' : 'stroke-white/25'}
          strokeWidth="0.75"
        />
      ))}
    </g>
  )
}

/**
 * A pin is a label, a stem and a ground dot at the exact spot, so it reads as something
 * standing on the map you can press, not a caption. Selected pins grow, turn maroon,
 * show their detail and gain a halo at the ground point: size, shape and copy change, not
 * colour alone. The whole stack is the button, padded to a 44pt target.
 */
/** Rough pill width, so a pin near the frame edge hangs its label inward instead of off-screen. */
function pillWidth(pin: MapPinSpec, selected: boolean) {
  const text = pin.label.length + (selected && pin.detail ? pin.detail.length + 3 : 0)
  return selected ? text * 7.6 + 46 : text * 6.6 + 38
}

/** Label offset from the ground dot: centred, or hung left/right of it near an edge. */
const ALIGN = {
  center: { button: '-translate-x-1/2 items-center', stem: '', dot: '' },
  end: { button: '-translate-x-[calc(100%-22px)] items-end', stem: 'mr-[21px]', dot: 'mr-[17px]' },
  start: { button: '-translate-x-[22px] items-start', stem: 'ml-[21px]', dot: 'ml-[17px]' },
} as const

function Pin({ pin, selected, onSelect }: { pin: MapPinSpec; selected: boolean; onSelect?: (id: string) => void }) {
  const m = NODE_META[pin.node]
  const w = pillWidth(pin, selected)
  const a = ALIGN[pin.x + w / 2 > 385 ? 'end' : pin.x - w / 2 < 8 ? 'start' : 'center']
  return (
    <button
      type="button"
      aria-label={`${pin.label}${pin.live ? ', live now' : ''}${pin.detail ? `, ${pin.detail}` : ''}`}
      aria-pressed={selected}
      onClick={onSelect ? () => onSelect(pin.id) : undefined}
      className={`group absolute flex -translate-y-full flex-col ${a.button} after:absolute after:-inset-x-[6px] after:-inset-y-[4px] after:content-[''] ${
        selected ? 'z-20' : 'z-10'
      }`}
      style={{ left: pin.x, top: pin.y + 5 }}
    >
      <span
        className={`flex origin-bottom items-center gap-1.5 whitespace-nowrap rounded-full font-semibold tracking-snug shadow-floating transition-transform duration-(--duration-quick) ease-(--ease-out-expo) group-active:scale-[0.94] motion-reduce:transition-none ${
          selected
            ? 'h-[34px] bg-maroon pl-2.5 pr-3 text-control text-white ring-2 ring-white'
            : 'h-[28px] bg-white pl-2 pr-2.5 text-meta text-ink ring-1 ring-black/5'
        }`}
      >
        {/* The node colour always shows; a live event adds the red live dot after its name. */}
        <span
          className={`shrink-0 rounded-full ${selected ? 'size-[8px] bg-white' : `size-[8px] ${m.dot} ring-2 ring-white`}`}
        />
        {pin.label}
        {pin.live ? <LiveDot /> : null}
        {selected && pin.detail ? <span className="font-medium text-white/75 tabular">· {pin.detail}</span> : null}
      </span>
      <span aria-hidden className={`block w-[2px] ${a.stem} ${selected ? 'h-[9px] bg-maroon' : 'h-[6px] bg-ink-3/60'}`} />
      <span aria-hidden className={`relative grid size-[10px] place-items-center ${a.dot}`}>
        {selected ? <span className="absolute size-[22px] rounded-full bg-maroon/20 ring-1 ring-maroon/30" /> : null}
        <span className={`relative size-[10px] rounded-full ring-2 ring-white ${selected ? 'bg-maroon' : m.dot}`} />
      </span>
    </button>
  )
}

export function CampusMap({
  selected,
  shift = 0,
  pins = CAMPUS_PINS,
  overlay,
  onSelect,
  you = true,
}: {
  selected?: string
  shift?: number
  pins?: MapPinSpec[]
  /** Drawn in map coordinates between the streets and the pins, e.g. a walking route or a node's area. */
  overlay?: ReactNode
  /** Optional: called with a pin's id when it's tapped, so a screen can select it. */
  onSelect?: (id: string) => void
  /** Draws the blue "you are here" dot. Off when location is unknown. */
  you?: boolean
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-canvas">
      <div className="absolute inset-x-0 top-0 h-[1000px]" style={{ transform: `translateY(${shift}px)` }}>
        <svg aria-hidden width="393" height="1000" viewBox="0 0 393 1000" className="absolute left-0 top-0">
          {/* Warm land, then each node's district */}
          <rect x="-20" y="-60" width="440" height="1100" className="fill-paper/60" />
          {DISTRICTS.map((d) => (
            <rect key={`${d.x}-${d.y}`} x={d.x} y={d.y} width={d.w} height={d.h} rx="26" className={WASH[d.node]} />
          ))}
          {BUILDINGS.map((b, k) => (
            <rect key={k} x={b.x} y={b.y} width={b.w} height={b.h} rx="2.5" className={b.tone} />
          ))}
          {/* Green space: West Campus, Simpson Drill Field, Wolf Pen Creek */}
          <rect x="-10" y="600" width="128" height="260" rx="10" className="fill-tint-green" />
          <rect x="142" y="222" width="54" height="78" rx="6" className="fill-tint-green" />
          <ellipse cx="322" cy="352" rx="40" ry="46" className="fill-tint-green" />
          <path
            d="M300 250 C 340 300, 290 360, 330 410 S 360 520, 352 600"
            className="fill-none stroke-bryan/15"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M300 250 C 340 300, 290 360, 330 410 S 360 520, 352 600"
            className="fill-none stroke-tint-sky"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Roads: white on top of the blocks, cased so they read as figure */}
          {STREETS.map((d) => (
            <g key={d}>
              <path d={d} className="stroke-ink-3/25" strokeWidth="7.5" fill="none" />
              <path d={d} className="stroke-white" strokeWidth="5.5" fill="none" />
            </g>
          ))}
          {ROADS.map((r) => (
            <g key={r.label}>
              <path d={r.d} className="stroke-ink-3/30" strokeWidth="16" fill="none" />
              <path d={r.d} className="stroke-white" strokeWidth="13" fill="none" />
            </g>
          ))}
          <path d="M106 -40 L128 900" className="stroke-ink-3/50" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
          <KyleBowl />
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
          {DISTRICT_LABELS.map((l) => (
            <text
              key={l.text}
              x={l.x}
              y={l.y}
              textAnchor="middle"
              className={`font-display text-micro font-bold tracking-caps ${LABEL_INK[l.node]}`}
            >
              {l.text}
            </text>
          ))}
        </svg>

        {overlay}

        {/* You are here */}
        {you ? (
          <span aria-hidden className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={YOU_AT}>
            <span className="absolute -inset-[14px] rounded-full bg-tint-sky-ink/15" />
            <span className="relative block size-[16px] rounded-full bg-tint-sky-ink ring-[3px] ring-white shadow-floating" />
          </span>
        ) : null}

        {pins.map((p) => (
          <Pin key={p.id} pin={p} selected={p.id === selected} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
