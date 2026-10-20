import { Check, DoorOpen, Hamburger, Navigation, Toilet, Users } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../../../components/Avatar'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Chip } from '../../../components/Chip'
import { Screen } from '../../../components/Device'
import { AggieMark, LsuMark } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { MapCapsule, MapRail, MapSheet, MapToast, SheetTitle } from './MapChrome'

/*
 * Kyle Field from above, north up. The bowl is a racetrack: two straights (the sidelines) and two
 * arcs (the end zones), so the lower bowl and the upper deck share their normals and every section
 * is a clean wedge. Coordinates are screen points on the 393pt frame.
 */
const CX = 196
const CY = 346
/** Half the length of the sideline straights. */
const HALF = 80

type Seg = 0 | 1 | 2 | 3 // east straight (N→S), south arc, west straight (S→N), north arc

export function pt(seg: Seg, f: number, r: number): [number, number] {
  if (seg === 0) return [CX + r, CY - HALF + f * 2 * HALF]
  if (seg === 2) return [CX - r, CY + HALF - f * 2 * HALF]
  const a = (seg === 1 ? 0 : Math.PI) + f * Math.PI
  return [CX + r * Math.cos(a), CY + (seg === 1 ? HALF : -HALF) + r * Math.sin(a)]
}

/** Sections per segment: 7 along each sideline, 10 around each end. */
const PER: Record<Seg, number> = { 0: 7, 1: 10, 2: 7, 3: 10 }

type Section = { n: number; seg: Seg; i: number }

/** Numbered clockwise from the east sideline, so Sec 125 is the 50-yard line on the east side. */
function sections(base: number): Section[] {
  const out: Section[] = []
  let k = 0
  for (const seg of [0, 1, 2, 3] as Seg[])
    for (let i = 0; i < PER[seg]; i++, k++) out.push({ n: base + ((k + 21) % 34) + 1, seg, i })
  return out
}

const LOWER = { r0: 78, r1: 118, list: sections(100) }
const UPPER = { r0: 128, r1: 164, list: sections(300) }

function wedge(s: Section, r0: number, r1: number) {
  const n = PER[s.seg]
  const g = 0.06
  const steps = s.seg % 2 ? 4 : 1
  const fs = Array.from({ length: steps + 1 }, (_, j) => (s.i + g + ((1 - 2 * g) * j) / steps) / n)
  const inner = fs.map((f) => pt(s.seg, f, r0))
  const outer = fs.reverse().map((f) => pt(s.seg, f, r1))
  return `M${[...inner, ...outer].map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`
}

export function centre(n: number, depth = 0.5): [number, number] {
  const ring = n >= 300 ? UPPER : LOWER
  const s = ring.list.find((x) => x.n === n)!
  return pt(s.seg, (s.i + 0.5) / PER[s.seg], ring.r0 + (ring.r1 - ring.r0) * depth)
}

type Friend = { initials: string; name: string; color: 1 | 2 | 3 | 4 | 5 | 6; sec: number; row: number }

export const CREW: Friend[] = [
  { initials: 'MR', name: 'Maya', color: 2, sec: 128, row: 14 },
  { initials: 'AL', name: 'Alex', color: 3, sec: 122, row: 9 },
  { initials: 'BN', name: 'Brooke', color: 6, sec: 131, row: 30 },
  { initials: 'KT', name: 'Kendall', color: 4, sec: 308, row: 4 },
]

const LINES = [
  { id: 'food', Icon: Hamburger, title: 'Aggie Grill', where: 'Sec 124', wait: 4, sec: 124 },
  { id: 'restroom', Icon: Toilet, title: 'Restrooms', where: 'Sec 126', wait: 2, sec: 126 },
] as const
type LineId = (typeof LINES)[number]['id']

export const ME = centre(125, 0.55)
export const GATE: [number, number] = pt(3, 0.82, 146)
export const CONCOURSE = 123

export function Bowl({ highlight }: { highlight: Set<number> }) {
  const fieldTop = CY - 126
  return (
    <svg aria-hidden width="393" height="852" viewBox="0 0 393 852" className="absolute inset-0">
      {/* Upper deck, then the lower bowl */}
      {UPPER.list.map((s) => (
        <path
          key={s.n}
          d={wedge(s, UPPER.r0, UPPER.r1)}
          className={highlight.has(s.n) ? 'fill-white/22 stroke-white/30' : 'fill-white/[0.06] stroke-white/8'}
        />
      ))}
      {LOWER.list.map((s) => (
        <path
          key={s.n}
          d={wedge(s, LOWER.r0, LOWER.r1)}
          className={
            s.n === 125
              ? 'fill-gold/35 stroke-gold'
              : highlight.has(s.n)
                ? 'fill-white/22 stroke-white/30'
                : 'fill-white/10 stroke-white/8'
          }
        />
      ))}
      {LOWER.list.map((s) => {
        const [x, y] = centre(s.n, s.seg % 2 ? 0.5 : 0.2)
        return (
          <text
            key={s.n}
            x={x}
            y={y + 3}
            textAnchor="middle"
            className={`text-tab font-semibold tabular ${s.n === 125 ? 'fill-gold' : 'fill-white/45'}`}
          >
            {s.n}
          </text>
        )
      })}

      {/* The field: end zones, ten-yard lines and the 50 */}
      <rect x={CX - 56} y={fieldTop} width="112" height="252" rx="4" className="fill-field" />
      <rect x={CX - 56} y={fieldTop} width="112" height="24" rx="4" className="fill-maroon" />
      <rect x={CX - 56} y={fieldTop + 228} width="112" height="24" rx="4" className="fill-maroon" />
      {Array.from({ length: 9 }).map((_, k) => (
        <line
          key={k}
          x1={CX - 56}
          x2={CX + 56}
          y1={fieldTop + 24 + (k + 1) * 20.4}
          y2={fieldTop + 24 + (k + 1) * 20.4}
          className={k === 4 ? 'stroke-white/60' : 'stroke-white/20'}
        />
      ))}
      <text
        x={CX}
        y={fieldTop + 16}
        textAnchor="middle"
        className="fill-white font-display text-micro font-bold tracking-caps"
      >
        AGGIES
      </text>
      <text
        x={CX}
        y={fieldTop + 244}
        textAnchor="middle"
        className="fill-white font-display text-micro font-bold tracking-caps"
      >
        AGGIES
      </text>
      <rect x={CX - 22} y={CY - 10} width="44" height="20" rx="4" className="fill-field" />
      <text x={CX} y={CY + 5} textAnchor="middle" className="fill-white/70 font-slab text-control font-bold">
        A&amp;M
      </text>
      {/* Line of scrimmage and the line to gain */}
      <line
        x1={CX - 56}
        x2={CX + 56}
        y1={fieldTop + 24 + 61}
        y2={fieldTop + 24 + 61}
        className="stroke-tint-sky-ink"
        strokeWidth="2"
      />
      <line
        x1={CX - 56}
        x2={CX + 56}
        y1={fieldTop + 24 + 81}
        y2={fieldTop + 24 + 81}
        className="stroke-gold"
        strokeWidth="2"
      />

      {/* Your way out at half: along the east concourse to Gate 2 */}
      <path
        d={`M${ME[0]} ${ME[1]} L${CX + CONCOURSE} ${ME[1] - 8} L${CX + CONCOURSE} ${CY - HALF} Q${CX + CONCOURSE} ${GATE[1] + 18} ${GATE[0]} ${GATE[1] + 10}`}
        className="fill-none stroke-gold"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/**
 * Concept 2 · The Map — 5 · Game day. Inside Kyle Field the map becomes the bowl: your seat in
 * gold, your crew as avatar pins on their sections, the nearest lines on the concourse and the
 * way to Gate 2. The score rides in the capsule; everything else stays on the night surface.
 */
export function MapStadium() {
  const [show, setShow] = useState({ crew: true, food: true, restroom: true })
  const [line, setLine] = useState<LineId>('restroom')
  const [sent, setSent] = useState(false)
  const crewSecs = new Set(show.crew ? CREW.map((f) => f.sec) : [])

  return (
    <Screen bg="bg-night">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_42%_at_50%_37%,color-mix(in_oklab,var(--color-white)_7%,transparent),transparent_70%)]"
      />
      <Bowl highlight={crewSecs} />
      <h1 className="sr-only">Kyle Field: your seat, your crew and the nearest lines</h1>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Texas A&amp;M 21, LSU 17. Second quarter, 4:12 left.
      </p>

      {/* Gate 2 */}
      <span
        aria-hidden
        className="absolute z-10 flex h-[26px] -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-gold px-2.5 text-meta font-bold text-gold-ink shadow-floating"
        style={{ left: GATE[0], top: GATE[1] }}
      >
        <DoorOpen size={13} strokeWidth={2.4} /> Gate 2
      </span>

      {/* You */}
      <span
        aria-hidden
        className="absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center"
        style={{ left: ME[0], top: ME[1] }}
      >
        <span className="absolute size-[40px] rounded-full bg-gold/25 motion-safe:animate-map-pulse" />
        <span className="relative grid size-[30px] place-items-center rounded-full bg-gold text-micro font-bold text-gold-ink ring-2 ring-night">
          You
        </span>
      </span>

      {/* The crew, pinned to their sections */}
      {show.crew
        ? CREW.map((f) => {
            const [x, y] = centre(f.sec, f.sec >= 300 ? 0.5 : 0.45)
            return (
              <span
                key={f.initials}
                aria-hidden
                className="absolute z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center"
                style={{ left: x, top: y }}
              >
                <Avatar initials={f.initials} color={f.color} size={28} className="ring-2 ring-white shadow-floating" />
                <span className="block size-[7px] -translate-y-[4px] rotate-45 bg-white" />
              </span>
            )
          })
        : null}

      {/* Nearest lines, on the concourse behind the lower bowl */}
      {LINES.filter((l) => show[l.id]).map((l) => {
        const [x, y] = centre(l.sec, 0)
        const on = l.id === line
        return (
          <span
            key={l.id}
            aria-hidden
            className={`absolute z-10 flex h-[24px] -translate-y-1/2 items-center gap-1 rounded-full pl-1 pr-2 text-micro font-bold shadow-floating transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
              on ? 'bg-white text-ink' : 'bg-night-3 text-white ring-1 ring-white/14'
            }`}
            style={{ left: x + (CONCOURSE - LOWER.r0) - 10, top: y }}
          >
            <span
              className={`grid size-[18px] place-items-center rounded-full ${on ? 'bg-maroon text-white' : 'bg-white/14'}`}
            >
              <l.Icon size={11} strokeWidth={2.4} />
            </span>
            <span className="tabular">{l.wait}m</span>
          </span>
        )
      })}

      <StatusBar />
      <MapCapsule>
        <AggieMark team size={38} />
        <div aria-hidden className="leading-none">
          <p className="text-micro font-bold uppercase tracking-caps text-white/70">Kyle Field</p>
          <p className="mt-0.5 flex items-baseline gap-2 font-display text-display-sm font-bold tabular">
            <span>21</span>
            <span className="text-title text-white/40">–</span>
            <span className="text-white/70">17</span>
          </p>
        </div>
        <LsuMark size={38} />
        <span className="ml-auto mr-1.5">
          <Badge tone="live" surface="dark">
            Q2 · 4:12
          </Badge>
        </span>
      </MapCapsule>

      <MapRail label="Show on the map">
        <Chip
          surface="onMaroon"
          selected={show.crew}
          onClick={() => setShow((s) => ({ ...s, crew: !s.crew }))}
          leading={<Users size={15} className="ml-1" />}
        >
          Crew · 4
        </Chip>
        <Chip
          surface="onMaroon"
          selected={show.food}
          onClick={() => setShow((s) => ({ ...s, food: !s.food }))}
          leading={<Hamburger size={15} className="ml-1" />}
        >
          Food
        </Chip>
        <Chip
          surface="onMaroon"
          selected={show.restroom}
          onClick={() => setShow((s) => ({ ...s, restroom: !s.restroom }))}
          leading={<Toilet size={15} className="ml-1" />}
        >
          Restrooms
        </Chip>
      </MapRail>

      <MapSheet labelledBy="seat-title" dark>
        <MapToast dark show={sent} onUndo={() => setSent(false)}>
          Gate 2 at half · sent to your crew of 4
        </MapToast>
        <SheetTitle
          id="seat-title"
          dark
          size="hero"
          kicker="Your seat · east side, the 50"
          aside={
            <span className="flex flex-col items-end font-semibold leading-tight text-white tabular">
              <span>Row 22</span>
              <span>Seat 9</span>
            </span>
          }
        >
          <span className="sr-only">Section </span>Sec <span className="tabular">125</span>
        </SheetTitle>

        <ul aria-label="Nearest lines" className="mt-3 grid grid-cols-2 gap-2">
          {LINES.map((l) => {
            const on = l.id === line
            return (
              <li key={l.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`${l.title}, ${l.where}, ${l.wait} minute line`}
                  onClick={() => setLine(l.id)}
                  className={`flex min-h-[60px] w-full items-center gap-2.5 rounded-thumb px-2.5 py-2 text-left ring-1 transition-[transform,background-color,box-shadow] active:scale-[0.97] duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
                    on ? 'bg-white/14 ring-white/30' : 'bg-night-3 ring-white/8'
                  }`}
                >
                  <span className="grid size-[34px] shrink-0 place-items-center rounded-well bg-white/8">
                    <l.Icon size={18} />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-control font-semibold">{l.title}</span>
                    <span className="block truncate text-meta text-white/60">{l.where}</span>
                  </span>
                  <span className="text-right leading-none">
                    <span className="block font-display text-display-sm font-bold text-success-on-dark tabular">
                      {l.wait}
                    </span>
                    <span className="text-micro text-white/60">min</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {sent ? (
          <Button size="lg" variant="tonal" className="mt-3 w-full" aria-disabled>
            <Check size={18} strokeWidth={2.6} /> Sent · meet at Gate 2 at half
          </Button>
        ) : (
          <Button size="lg" className="mt-3 w-full" onClick={() => setSent(true)}>
            <Navigation size={18} /> Meet at Gate 2 at half
          </Button>
        )}
        <p className="mt-2 text-center text-meta text-white/60">
          Half at about <span className="tabular">7:31</span> · Maya, Alex, Brooke and Kendall get the pin
        </p>
      </MapSheet>

      <TabBar active="map" surface="dark" />
    </Screen>
  )
}
