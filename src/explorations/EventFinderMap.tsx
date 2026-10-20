import { Bookmark, ChevronRight, List, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Faces } from '../components/Avatar'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Screen } from '../components/Device'
import { DateBlock } from '../components/EventCard'
import { Eyebrow } from '../components/Eyebrow'
import { MatchupThumb } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { CATEGORY_TONE, THIS_WEEK } from '../data/events'
import { CAMPUS_PINS, CampusMap, type MapPinSpec } from './CampusMap'
import {
  CapsuleTitle,
  Lift,
  MapCapsule,
  MapRail,
  MapScrim,
  MapSheet,
  SheetTitle,
} from './concepts/map/MapChrome'

const CHIPS = ['All', 'Athletics', 'Student Life', 'Academic', 'Traditions'] as const

/** Map pins for this view: tonight's game is the selected pin; Reed Arena and Lot C sit under the sheet. */
const PINS = CAMPUS_PINS.filter((p) => p.id !== 'reed' && p.id !== 'tailgate').map((p) =>
  p.id === 'kyle' ? { ...p, label: 'A&M vs LSU', detail: '6 PM' } : p,
)

/** A card in the results carousel. Its top half selects the matching pin; the gold action follows the selection. */
function ResultCard({
  id,
  selected,
  onSelect,
  label,
  head,
  foot,
  directions,
}: {
  id: string
  selected: boolean
  onSelect: (id: string) => void
  label: string
  head: ReactNode
  foot: ReactNode
  directions: string
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    // Scroll only the carousel, never the page or the canvas around the frame
    const card = ref.current
    const rail = card?.parentElement
    if (!selected || !card || !rail) return
    const left = card.offsetLeft - rail.offsetLeft - 16
    if (Math.abs(rail.scrollLeft - left) < 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    rail.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
  }, [selected])
  return (
    <article
      ref={ref}
      className={`w-[318px] shrink-0 snap-start rounded-card bg-white p-2.5 shadow-raised transition-shadow duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
        selected ? 'ring-2 ring-maroon' : 'ring-1 ring-hairline'
      }`}
    >
      <button
        type="button"
        aria-pressed={selected}
        aria-label={`${label}, show on the map`}
        onClick={() => onSelect(id)}
        className="block w-full rounded-thumb text-left transition-transform duration-(--duration-quick) ease-(--ease-out-expo) active:scale-[0.98] motion-reduce:transition-none"
      >
        {head}
      </button>
      {foot}
      <div className="mt-2.5 flex gap-2">
        <Button size="sm" variant={selected ? 'primary' : 'secondary'} className="flex-1">
          Directions · <span className="tabular">{directions}</span>
        </Button>
        <Button size="sm" variant="secondary" aria-label={`Save ${label}`} className="px-3">
          <Bookmark size={16} />
        </Button>
      </div>
    </article>
  )
}

/** Today's results sheet: swipeable event cards, each with its own Directions, then This Week. */
function TodaySheet({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <MapSheet labelledBy="map-today" flush>
      <div className="px-4">
        <SheetTitle
          id="map-today"
          kicker="Sat, Oct 12 · Every event, pinned"
          aside={
            <>
              <span className="block font-semibold text-ink-2 tabular">5 today</span>
              Swipe · <span className="tabular">1 of 5</span>
            </>
          }
        >
          Today
        </SheetTitle>
      </div>

      <div className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 scroll-px-4">
        <ResultCard
          id="kyle"
          selected={selected === 'kyle'}
          onSelect={onSelect}
          label="Texas A&M vs LSU"
          directions="12 min walk"
          head={
            <span className="flex items-center gap-2.5 rounded-thumb bg-maroon p-2.5 text-white">
              <MatchupThumb size={44} />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-title font-extrabold uppercase italic leading-none">
                  A&amp;M vs LSU
                </span>
                <span className="mt-1 block truncate text-meta text-white/75">Football · 6:00 PM · Kyle Field</span>
              </span>
            </span>
          }
          foot={
            <div className="mt-2 flex items-center gap-1.5 px-1 text-meta text-ink-3">
              <Faces n={3} size={17} />
              <span className="truncate font-semibold text-ink-2 tabular">125K attending</span>
              <Badge tone="going" size="md" className="ml-auto">
                Ticket in Wallet
              </Badge>
            </div>
          }
        />
        <ResultCard
          id="market"
          selected={selected === 'market'}
          onSelect={onSelect}
          label="Farmers Market"
          directions="8 min walk"
          head={
            <span className="flex gap-3">
              <img src="/img/farmers-market.jpg" alt="" className="size-[64px] rounded-thumb object-cover" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <Eyebrow tone="category" className={CATEGORY_TONE.Community}>
                    Community
                  </Eyebrow>
                  <Badge tone="live" size="sm" />
                </span>
                <span className="block truncate text-card font-semibold tracking-snug">Farmers Market</span>
                <span className="block truncate text-small text-ink-2">8 AM – 12 PM · Wolf Pen Creek</span>
              </span>
            </span>
          }
          foot={
            <div className="mt-2 flex items-center gap-1.5 px-1 text-meta text-ink-3">
              <Faces n={2} size={17} />
              <span className="font-semibold text-ink-2 tabular">1.1K here</span>
              <Badge tone="node" node="cstat" className="ml-auto" />
            </div>
          }
        />
      </div>

      <div className="mt-2 flex items-center justify-between px-4">
        <h3 className="text-card font-semibold tracking-snug">This Week</h3>
        <Link to="/events" className="-my-2 flex h-[44px] items-center gap-0.5 text-control font-semibold text-maroon">
          See all <ChevronRight aria-hidden size={15} />
        </Link>
      </div>
      <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4">
        {THIS_WEEK.map((e) => (
          <li
            key={e.id}
            className="flex shrink-0 items-center gap-2 rounded-thumb bg-white py-1.5 pl-1.5 pr-3 shadow-raised"
          >
            <DateBlock day={e.day} date={e.date} />
            <span className="max-w-[112px] truncate text-control font-semibold">{e.title}</span>
          </li>
        ))}
      </ul>
    </MapSheet>
  )
}

/**
 * Exploration · EventFinder, map view.
 * After Fresha's pins-over-map with a results sheet, in The Map's chrome: the header is the
 * floating maroon capsule, the category chips float under it, and today's results sit in a
 * sheet. Pins carry node colours; the selected pin and its card always highlight together.
 */
export function EventFinderMap({
  filter = 'All',
  selected = 'kyle',
  shift = 20,
  pins = PINS,
  sheet,
}: {
  /** The selected category chip. */
  filter?: string
  selected?: string
  shift?: number
  pins?: MapPinSpec[]
  /** Replaces today's results sheet. */
  sheet?: ReactNode
} = {}) {
  const [chip, setChip] = useState(filter)
  const [sel, setSel] = useState(selected)

  return (
    <Screen>
      <CampusMap selected={sel} shift={shift} pins={pins} onSelect={setSel} />
      <MapScrim />
      <StatusBar tone="dark" />

      <MapCapsule>
        <IconButton label="Search events">
          <Search size={18} />
        </IconButton>
        <CapsuleTitle title="Events" meta="Texas A&M · College Station · Bryan" />
        <IconButton label="List view" to="/events">
          <List size={18} />
        </IconButton>
      </MapCapsule>

      <MapRail label="Filter events">
        <Lift>
          <Chip selected={false} label="Filters" leading={<SlidersHorizontal size={16} />} />
        </Lift>
        {CHIPS.map((c) => (
          <Lift key={c}>
            <Chip selected={c === chip} onClick={() => setChip(c)}>
              {c}
            </Chip>
          </Lift>
        ))}
      </MapRail>

      {sheet ?? <TodaySheet selected={sel} onSelect={setSel} />}

      <TabBar active="events" />
    </Screen>
  )
}
