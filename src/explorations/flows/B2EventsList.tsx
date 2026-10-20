import { Bookmark, Map, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Faces } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { Screen, ScrollBody } from '../../components/Device'
import { EventCard } from '../../components/EventCard'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton, SectionHeader } from '../../components/ui'
import { CATEGORY_TONE, THIS_WEEK, TODAY, type EventItem } from '../../data/events'
import { GameStrip } from '../GameStrip'

const CHIPS = ['All', 'Athletics', 'Student Life', 'Academic', 'Traditions'] as const

/** One result: square photo, category, status, title, when · where, attendance. Same card as Troy's list. */
function Result({ e, date }: { e: EventItem; date?: { day: string; date: string } }) {
  const s = e.status
  return (
    <EventCard
      to={e.to ?? '/events'}
      media={<img src={e.img} alt="" className="size-[78px] rounded-thumb object-cover" />}
      dateFlag={date}
      eyebrow={e.category}
      eyebrowTone="category"
      eyebrowClassName={CATEGORY_TONE[e.category]}
      status={
        s?.kind === 'live' ? (
          <Badge tone="live" />
        ) : s?.kind === 'soon' ? (
          <Badge tone="soon">{s.label}</Badge>
        ) : undefined
      }
      title={e.title}
      when={e.when}
      place={e.venue}
      node={e.node}
      footer={
        <>
          {e.friends ? <Faces n={Math.min(3, e.friends)} size={17} /> : null}
          <span className="truncate">
            <span className="font-semibold text-ink-2">{e.attending}</span>
            {e.friends && e.node === 'tamu' ? ` · ${e.friends} friends` : ''}
          </span>
          {e.node !== 'tamu' ? <Badge tone="node" node={e.node} className="ml-auto" /> : null}
        </>
      }
    />
  )
}

/**
 * B2 · EventFinder, list view. The same Events screen with the map folded away: his header and chips,
 * tonight's game carrying the one gold Directions, then Today and This Week as square-photo cards.
 */
export function B2EventsList() {
  const [chip, setChip] = useState<string>('All')
  const today = TODAY.filter((e) => e.id === 'market' || e.id === 'tailgate')
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-3 pt-[56px] text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-headline font-bold tracking-headline">Texas A&amp;M Events</h1>
            <div className="flex gap-1">
              <IconButton label="Search">
                <Search size={18} />
              </IconButton>
              <IconButton label="Map view" to="/explore/events-map">
                <Map size={18} />
              </IconButton>
            </div>
          </div>
        </header>

        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3">
          <Chip selected={false} label="Filters" leading={<SlidersHorizontal size={16} />} />
          {CHIPS.map((c) => (
            <Chip key={c} selected={chip === c} onClick={() => setChip(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <section aria-labelledby="list-today" className="mt-4">
          <SectionHeader
            title={<span id="list-today">Today</span>}
            meta="Sat, Oct 12 · 5 events"
            action="See all 5"
            actionTo="/events"
          />
          <div className="flex flex-col gap-2.5 px-4">
            {/* Tonight's game: the same card as the map sheet, with its Directions */}
            <article className="rounded-card bg-white p-2.5 shadow-raised">
              <GameStrip meta="Football · 6:00 PM · Kyle Field" />
              <div className="mt-2 flex items-center gap-1.5 px-1 text-meta text-ink-3">
                <Faces n={3} size={17} />
                <span className="truncate">
                  <span className="font-semibold text-ink-2">125K attending</span> · 23 friends
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
            {today.map((e) => (
              <Result key={e.id} e={e} />
            ))}
          </div>
        </section>

        <section aria-labelledby="list-week" className="mt-6">
          <SectionHeader
            title={<span id="list-week">This Week</span>}
            meta="Oct 13 – 19"
            action="See all"
            actionTo="/events"
          />
          <div className="flex flex-col gap-2.5 px-4">
            {THIS_WEEK.map((e) => (
              <Result key={e.id} e={e} date={{ day: e.day, date: e.date }} />
            ))}
          </div>
        </section>
      </ScrollBody>
      <TabBar active="events" />
    </Screen>
  )
}
