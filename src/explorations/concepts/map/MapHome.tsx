import type { LucideIcon } from 'lucide-react'
import { ChevronRight, Footprints, Layers, Utensils } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../../components/Avatar'
import { LiveDot } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Device'
import { AggieMark, MatchupThumb } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { CAMPUS_PINS, CampusMap, type MapPinSpec } from '../../CampusMap'
import { CapsuleTitle, MapCapsule, MapScrim, MapSheet, SheetCount } from './MapChrome'

/** The map slides up when the selected pin would sit under the sheet. */
const SHIFT: Record<string, number> = { tailgate: -60 }

/**
 * The twelve Home tiles live behind one Layers control in the capsule (Events, Athletics and
 * Dining are on). The map draws what's on; the sheet doesn't have to explain it.
 */
const LAYERS_ON = 3

/** Event pins, short labels so a selected pin never runs off the edge; the sheet carries the detail. */
const PINS: MapPinSpec[] = CAMPUS_PINS.filter((p) => !['northgate', 'reed'].includes(p.id)).map((p) =>
  p.id === 'kyle' ? { ...p, label: 'A&M vs LSU', detail: '6 PM' } : { ...p, detail: undefined },
)

/** What the Dining layer adds to the map, in map coordinates. */
const LAYER_MARKS: { x: number; y: number; Icon: LucideIcon; well: string; label: string }[] = [
  { x: 60, y: 370, Icon: Utensils, well: 'bg-tint-amber-ink', label: 'Sbisa · open' },
]

function LayerMarks() {
  return (
    <>
      {LAYER_MARKS.map((m) => (
        <span
          key={m.label}
          aria-hidden
          className="absolute z-[5] flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white py-0.5 pl-0.5 pr-2 text-micro font-semibold text-ink-2 shadow-floating"
          style={{ left: m.x, top: m.y }}
        >
          <span className={`grid size-[18px] place-items-center rounded-full text-white ${m.well}`}>
            <m.Icon size={11} strokeWidth={2.4} />
          </span>
          {m.label}
        </span>
      ))}
    </>
  )
}

type NowId = 'market' | 'tailgate' | 'kyle'

const NOW: {
  id: NowId
  kicker: string
  kickerTone: string
  live?: boolean
  title: string
  meta: string
  walk: string
  media: ReactNode
}[] = [
  {
    id: 'market',
    kicker: 'Live now',
    kickerTone: 'text-live-ink',
    live: true,
    title: 'Farmers Market',
    meta: 'Wolf Pen Creek · 1.1K here',
    walk: '8 min',
    media: <img src="/img/farmers-market.jpg" alt="" className="size-[44px] rounded-thumb object-cover" />,
  },
  {
    id: 'tailgate',
    kicker: 'Next up · 10:00 AM',
    kickerTone: 'text-soon-ink',
    title: 'Tailgate Zone — Lot C',
    meta: 'Opens in 19 min · 8.4K going',
    walk: '14 min',
    media: <img src="/img/kyle-field-stands.jpg" alt="" className="size-[44px] rounded-thumb object-cover" />,
  },
  {
    id: 'kyle',
    kicker: 'Tonight · 6:00 PM',
    kickerTone: 'text-maroon',
    title: 'A&M vs LSU',
    meta: 'Kyle Field · 23 friends going',
    walk: '12 min',
    media: <MatchupThumb size={44} />,
  },
]

/**
 * Concept 2 · The Map — 2 · University Home. The map is the home. One intent: what's around
 * you now, and how to get there. The capsule says Howdy and holds a single Layers control; the
 * sheet opens on AROUND YOU NOW. Tapping a row or a pin selects both together, and the one
 * gold action follows the selection.
 */
export function MapHome() {
  const [selected, setSelected] = useState<string>('market')
  const current = NOW.find((n) => n.id === selected) ?? NOW[0]

  return (
    <Screen>
      <CampusMap
        selected={selected}
        shift={SHIFT[selected] ?? -20}
        pins={PINS}
        onSelect={setSelected}
        overlay={<LayerMarks />}
      />
      <MapScrim />
      <StatusBar tone="dark" />

      <MapCapsule>
        <AggieMark size={40} />
        <CapsuleTitle
          title="Howdy, Jordan"
          meta={
            <>
              Home · <span className="tabular">72°</span> Sunny
            </>
          }
        />
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label={`Map layers, ${LAYERS_ON} on`}
          className="relative flex h-[36px] shrink-0 items-center gap-1.5 rounded-full bg-white/14 pl-2.5 pr-3 text-control font-semibold transition-[transform,background-color] duration-(--duration-quick) ease-(--ease-out-expo) after:absolute after:inset-x-0 after:-inset-y-1 after:content-[''] active:scale-[0.96] active:bg-white/25 motion-reduce:transition-none"
        >
          <Layers aria-hidden size={16} />
          Layers
          <span className="grid size-[18px] place-items-center rounded-full bg-white text-micro font-bold text-maroon tabular">
            {LAYERS_ON}
          </span>
        </button>
        <button
          type="button"
          aria-label="Profile"
          className="press grid size-[44px] shrink-0 place-items-center rounded-full"
        >
          <Avatar initials="JC" size={36} color={1} className="ring-2 ring-white/25" />
        </button>
      </MapCapsule>

      <MapSheet labelledBy="home-now">
        {/* The count is the hero: three things worth walking to, one of them live */}
        <SheetCount
          id="home-now"
          count={NOW.length}
          kicker={
            <>
              <LiveDot /> Sat, Oct 12 · <span className="tabular">1</span> live
            </>
          }
        >
          Around you now
        </SheetCount>

        <ul className="mt-3 overflow-hidden rounded-card bg-white shadow-raised">
          {NOW.map((n) => {
            const on = n.id === selected
            return (
              <li key={n.id} className="border-b border-hairline last:border-b-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(n.id)}
                  className={`relative flex min-h-[60px] w-full items-center gap-3 px-3 py-1.5 text-left transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
                    on ? 'bg-maroon-soft' : 'active:bg-press'
                  }`}
                >
                  {on ? (
                    <span aria-hidden className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-maroon" />
                  ) : null}
                  {n.media}
                  <span className="min-w-0 flex-1">
                    <span
                      className={`flex items-center gap-1.5 text-micro font-bold uppercase tracking-eyebrow ${n.kickerTone}`}
                    >
                      {n.live ? <LiveDot /> : null}
                      {n.kicker}
                    </span>
                    <span className="block truncate text-card font-semibold tracking-snug">{n.title}</span>
                    <span className="block truncate text-meta text-ink-3">{n.meta}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-meta font-semibold text-ink-2 tabular">
                    <Footprints aria-hidden size={13} className="text-maroon" />
                    {n.walk}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-3 flex items-center gap-2">
          <Button className="flex-1">Directions · {current.walk} walk</Button>
          <Link
            to="/events"
            className="flex h-[44px] shrink-0 items-center gap-0.5 rounded-well px-2 text-control font-semibold text-maroon"
          >
            All events <ChevronRight aria-hidden size={15} />
          </Link>
        </div>
        <span className="sr-only" aria-live="polite">
          {current.title} selected on the map
        </span>
      </MapSheet>

      <TabBar active="home" />
    </Screen>
  )
}
