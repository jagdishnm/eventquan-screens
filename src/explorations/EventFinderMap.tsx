import { Bookmark, ChevronRight, List, Search, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Faces } from '../components/Avatar'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Screen } from '../components/Device'
import { DateBlock } from '../components/EventCard'
import { Eyebrow } from '../components/Eyebrow'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { CATEGORY_TONE, THIS_WEEK } from '../data/events'
import { CAMPUS_PINS, CampusMap } from './CampusMap'
import { GameStrip } from './GameStrip'

const CHIPS = ['All', 'Athletics', 'Student Life', 'Academic', 'Traditions'] as const

/** Map pins for this view: tonight's game is the selected pin; Reed Arena and Lot C sit under the sheet. */
const PINS = CAMPUS_PINS.filter((p) => p.id !== 'reed' && p.id !== 'tailgate').map((p) =>
  p.id === 'kyle' ? { ...p, label: 'A&M vs LSU', detail: '6 PM' } : p,
)

/**
 * Exploration · EventFinder, map view.
 * After Fresha's pins-over-map with a results sheet: his header, his chips and his event card,
 * laid over the campus so "where" is as visible as "what". Pins carry node colours.
 */
export function EventFinderMap() {
  return (
    <Screen>
      <StatusBar />
      <CampusMap selected="kyle" shift={20} pins={PINS} />

      <header className="absolute inset-x-0 top-0 z-20 bg-maroon px-4 pb-3 pt-[56px] text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-headline font-bold tracking-headline">Texas A&amp;M Events</h1>
          <div className="flex gap-1">
            <IconButton label="Search">
              <Search size={18} />
            </IconButton>
            <IconButton label="List view" to="/events">
              <List size={18} />
            </IconButton>
          </div>
        </div>
      </header>

      <div className="no-scrollbar absolute inset-x-0 top-[124px] z-20 flex gap-2 overflow-x-auto px-4">
        <Chip selected={false} label="Filters" leading={<SlidersHorizontal size={16} />} />
        {CHIPS.map((c, i) => (
          <Chip key={c} selected={i === 0}>
            {c}
          </Chip>
        ))}
      </div>

      <section
        aria-labelledby="map-today"
        className="absolute inset-x-0 bottom-0 z-20 rounded-t-sheet bg-canvas pb-[94px] pt-2.5 shadow-overlay"
      >
        <div aria-hidden className="mx-auto h-[5px] w-[38px] rounded-full bg-black/15" />
        <div className="mt-2 flex items-baseline justify-between px-4">
          <h2 id="map-today" className="text-title font-bold tracking-title">
            Today <span className="text-small font-normal tracking-normal text-ink-3">Sat, Oct 12 · 5 events</span>
          </h2>
          <span className="text-meta font-semibold text-ink-3">Swipe · 1 of 5</span>
        </div>

        <div className="no-scrollbar mt-2.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 scroll-px-4">
          {/* Each card carries its own Directions, so the action always matches the card in view */}
          <article className="w-[330px] shrink-0 snap-start rounded-card bg-white p-2.5 shadow-raised">
            <GameStrip meta="Football · 6:00 PM · Kyle Field" />
            <div className="mt-2 flex items-center gap-1.5 px-1 text-meta text-ink-3">
              <Faces n={3} size={17} />
              <span className="truncate">
                <span className="font-semibold text-ink-2">125K attending</span>
              </span>
              <Badge tone="going" size="md" className="ml-auto">
                Ticket in Wallet
              </Badge>
            </div>
            <div className="mt-2.5 flex gap-2">
              <Button size="sm" className="flex-1">
                Directions · 12 min walk
              </Button>
              <Button size="sm" variant="secondary" aria-label="Save Texas A&M vs LSU" className="px-3">
                <Bookmark size={16} />
              </Button>
            </div>
          </article>
          <article className="w-[330px] shrink-0 snap-start rounded-card bg-white p-2.5 shadow-raised">
            <div className="flex gap-3">
              <img src="/img/farmers-market.jpg" alt="" className="size-[64px] rounded-thumb object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <Eyebrow tone="category" className={CATEGORY_TONE.Community}>
                    Community
                  </Eyebrow>
                  <Badge tone="live" size="sm" />
                </div>
                <h3 className="truncate text-card font-semibold tracking-snug">Farmers Market</h3>
                <p className="truncate text-small text-ink-2">8 AM – 12 PM · Wolf Pen Creek</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 px-1 text-meta text-ink-3">
              <Faces n={2} size={17} />
              <span className="font-semibold text-ink-2">1.1K here</span>
              <Badge tone="node" node="cstat" className="ml-auto" />
            </div>
            <div className="mt-2.5 flex gap-2">
              <Button size="sm" variant="secondary" className="flex-1">
                Directions · 8 min walk
              </Button>
              <Button size="sm" variant="secondary" aria-label="Save Farmers Market" className="px-3">
                <Bookmark size={16} />
              </Button>
            </div>
          </article>
        </div>

        <div className="mt-3 flex items-center justify-between px-4">
          <h3 className="text-card font-semibold tracking-snug">This Week</h3>
          <Link
            to="/events"
            className="-my-2 flex h-[44px] items-center gap-0.5 text-control font-semibold text-maroon"
          >
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
      </section>

      <TabBar active="events" />
    </Screen>
  )
}
