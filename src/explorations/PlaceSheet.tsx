import { Bookmark, ChevronLeft, ChevronRight, Footprints, Share } from 'lucide-react'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Screen } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { CAMPUS_PINS, CampusMap } from './CampusMap'
import { GameStrip } from './GameStrip'

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

/**
 * Exploration · Campus node as a place card over the map.
 * After Cash App's and Bump's place sheets: you never leave the map. The venue rises over it with
 * how busy it is, who's going and what's on there today; the header names the node above it.
 */
export function PlaceSheet() {
  return (
    <Screen>
      <StatusBar />
      <CampusMap
        selected="kyle"
        shift={-118}
        pins={CAMPUS_PINS.filter((p) => ['msc', 'rec', 'market', 'kyle'].includes(p.id))}
      />

      <header className="absolute inset-x-0 top-0 z-20 bg-maroon px-4 pb-2 pt-[54px] text-white">
        <div className="flex h-[44px] items-center justify-between">
          <IconButton label="Back to map">
            <ChevronLeft size={20} />
          </IconButton>
          {/* Node above this one: event first, node second */}
          <nav aria-label="Node" className="flex items-center gap-1 text-control font-semibold">
            <span className="text-white/60">Texas A&amp;M</span>
            <ChevronRight aria-hidden size={14} className="text-white/40" />
            <span className="text-white/60">Athletics</span>
            <ChevronRight aria-hidden size={14} className="text-white/40" />
            <span aria-current="page">Kyle Field</span>
          </nav>
          <IconButton label="Share Kyle Field">
            <Share size={17} />
          </IconButton>
        </div>
      </header>

      <section
        aria-labelledby="place-title"
        className="absolute inset-x-0 bottom-0 z-20 flex h-[520px] flex-col rounded-t-sheet bg-canvas pt-2.5 shadow-overlay"
      >
        <div aria-hidden className="mx-auto h-[5px] w-[38px] rounded-full bg-black/15" />
        <div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-[100px] pt-3">
          <div className="flex items-center gap-3">
            <img
              src="/img/kyle-field-exterior.jpg"
              alt=""
              className="size-[76px] shrink-0 rounded-thumb object-cover"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Badge tone="node" node="tamu" />
                <Badge tone="soon" size="md">
                  Gates 4:00 PM
                </Badge>
              </div>
              <h2
                id="place-title"
                className="mt-1 font-display text-display-lg font-extrabold uppercase italic leading-[0.9] tracking-[-0.01em]"
              >
                Kyle Field
              </h2>
              <p className="mt-0.5 flex items-center gap-1 text-small text-ink-2">
                <Footprints size={13} className="text-maroon" /> 12 min walk · Home of the 12th Man
              </p>
            </div>
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
        </div>
      </section>
      <TabBar active="map" />
    </Screen>
  )
}
