import { Bookmark, ChevronLeft, ChevronRight, Footprints, Share } from 'lucide-react'
import type { ReactNode } from 'react'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Screen } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { CAMPUS_PINS, CampusMap, type MapPinSpec } from './CampusMap'
import { GameStrip } from './GameStrip'
import { Grabber, MapCapsule, MapScrim, SheetTitle } from './concepts/map/MapChrome'

const STATS = [
  { v: '2.1K', l: 'here now' },
  { v: '102K', l: 'by kickoff' },
  { v: '23', l: 'friends going' },
]

const TODAY = [
  { t: '9:00', title: '12th Man Brunch', meta: 'Hall of Champions', img: '/img/twelfth-man.jpg', live: true },
  { t: '10:00', title: 'Tailgate Zone opens', meta: 'Lot C · 8.4K going', img: '/img/kyle-field-stands.jpg' },
  { t: '3:45', title: 'Corps March-In', meta: 'Quad → North End Zone', img: '/img/aggie-band.jpg' },
]

/** Kyle Field on gameday morning: the venue, its Directions, and what's on there today. */
function KyleFieldToday() {
  return (
    <>
      {/* The venue's name is the hero; the bowl on the map above is its picture */}
      <SheetTitle
        id="place-title"
        size="hero"
        kicker={
          <>
            {/* The same maroon ground dot as the selected pin above: this sheet is that pin */}
            <span aria-hidden className="size-[8px] rounded-full bg-maroon ring-2 ring-maroon/20" />
            Texas A&amp;M · Athletics
          </>
        }
      >
        Kyle Field
      </SheetTitle>
      <div className="mt-2 flex items-center gap-1.5">
        <Badge tone="node" node="tamu" />
        <Badge tone="soon" size="md">
          Gates <span className="tabular">4:00</span> PM
        </Badge>
        <span className="ml-auto flex items-center gap-1 text-small text-ink-2">
          <Footprints aria-hidden size={13} className="text-maroon" />
          <span className="tabular">12 min</span> walk
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <Button className="w-full">Directions</Button>
        <Button variant="secondary" aria-label="Save Kyle Field" className="px-4">
          <Bookmark size={17} />
        </Button>
      </div>

      <h3 className="mt-3.5 text-card font-semibold tracking-snug">On here today</h3>
      <ol className="mt-1.5 overflow-hidden rounded-card bg-white shadow-raised">
        {TODAY.map((e) => (
          <li key={e.t} className="flex items-center gap-3 border-b border-hairline px-3 py-2 last:border-b-0">
            <span className="w-[36px] text-meta font-bold tabular text-ink-2">{e.t}</span>
            <img src={e.img} alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-control font-semibold">{e.title}</span>
              <span className="block truncate text-meta text-ink-3">{e.meta}</span>
            </span>
            {e.live ? <Badge tone="live" size="sm" /> : null}
          </li>
        ))}
      </ol>

      <GameStrip className="mt-3" meta="Kickoff 6:00 PM · 125K attending · 23 friends" />

      <dl className="mt-3 grid grid-cols-3 divide-x divide-hairline rounded-card bg-white py-2.5 shadow-raised">
        {STATS.map((s) => (
          <div key={s.l} className="flex flex-col-reverse items-center">
            <dt className="text-meta text-ink-3">{s.l}</dt>
            <dd className="font-display text-display-sm font-bold leading-none tabular">{s.v}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

/**
 * Exploration · Campus node as a place card over the map.
 * After Cash App's and Bump's place sheets: you never leave the map. The venue rises over it with
 * how busy it is, who's going and what's on there today. The header is The Map's floating
 * capsule: back, the node trail above this place, the place's name, and share.
 */
export function PlaceSheet({
  trail = ['Texas A&M', 'Athletics', 'Kyle Field'],
  selected = 'kyle',
  shift = -118,
  pins = CAMPUS_PINS.filter((p) => ['msc', 'rec', 'market', 'kyle'].includes(p.id)),
  overlay,
  sheetHeight = 520,
  labelledBy = 'place-title',
  children,
}: {
  /** Node path in the header; the last entry is this page. */
  trail?: string[]
  selected?: string
  shift?: number
  pins?: MapPinSpec[]
  overlay?: ReactNode
  sheetHeight?: number
  /** Id of the sheet's heading. */
  labelledBy?: string
  /** Replaces the sheet body (Kyle Field on gameday morning). */
  children?: ReactNode
} = {}) {
  const here = trail[trail.length - 1]
  const above = trail.slice(0, -1)
  return (
    <Screen>
      <CampusMap selected={selected} shift={shift} pins={pins} overlay={overlay} />
      <MapScrim />
      <StatusBar tone="dark" />

      <MapCapsule>
        <IconButton label="Back to map">
          <ChevronLeft size={20} />
        </IconButton>
        {/* Node above this one, then this place: event first, node second */}
        <nav aria-label="Node" className="min-w-0 flex-1 leading-tight">
          <ol className="flex min-w-0 items-center gap-0.5 text-meta font-semibold text-white/70">
            {above.map((t) => (
              <li key={t} className="flex min-w-0 items-center gap-0.5">
                <span className="truncate">{t}</span>
                <ChevronRight aria-hidden size={12} className="shrink-0 text-white/40" />
              </li>
            ))}
          </ol>
          <p aria-current="page" className="truncate text-emphasis font-bold tracking-snug text-white">
            {here}
          </p>
        </nav>
        <IconButton label={`Share ${here}`}>
          <Share size={17} />
        </IconButton>
      </MapCapsule>

      <section
        aria-labelledby={labelledBy}
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col rounded-t-sheet bg-canvas pt-2.5 shadow-overlay"
        style={{ height: sheetHeight }}
      >
        <Grabber />
        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-[100px] pt-1">{children ?? <KyleFieldToday />}</div>
      </section>
      <TabBar active="map" />
    </Screen>
  )
}
