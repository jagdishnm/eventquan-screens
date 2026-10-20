import { Map, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Screen, ScrollBody } from '../components/Device'
import { MatchupThumb } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Faces } from '../components/Avatar'
import { Badge, LiveDot } from '../components/Badge'
import { Chip } from '../components/Chip'
import { EventCard } from '../components/EventCard'
import { Eyebrow } from '../components/Eyebrow'
import { IconButton, SectionHeader } from '../components/ui'
import { CATEGORY_TONE, THIS_WEEK, TODAY, type EventItem } from '../data/events'

const CHIPS = ['All', 'Athletics', 'Student Life', 'Academic', 'Traditions', 'Community']

function StatusBadge({ s }: { s: NonNullable<EventItem['status']> }) {
  if (s.kind === 'live') return <Badge tone="live" />
  if (s.kind === 'going') return <Badge tone="going">{s.label}</Badge>
  return <Badge tone="soon">{s.label}</Badge>
}

function EventItemCard({ e, date }: { e: EventItem; date?: { day: string; date: string } }) {
  return (
    <EventCard
      to={e.to}
      media={
        e.matchup ? (
          <MatchupThumb size={78} />
        ) : (
          <img src={e.img} alt="" className="size-[78px] rounded-thumb object-cover" />
        )
      }
      dateFlag={date}
      eyebrow={e.category}
      eyebrowTone="category"
      eyebrowClassName={CATEGORY_TONE[e.category]}
      status={e.status ? <StatusBadge s={e.status} /> : undefined}
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

/** The day's anchor event, given a ticket-stub treatment in both teams' colours. */
function TonightCard() {
  return (
    <Link
      to="/gameday"
      className="press relative block h-[184px] overflow-hidden rounded-card bg-maroon-deep text-white shadow-floating"
    >
      <img src="/img/kyle-field-crowd.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-maroon/88" style={{ clipPath: 'polygon(0 0, 68% 0, 52% 100%, 0 100%)' }} />
      <div className="absolute inset-0 bg-lsu/80" style={{ clipPath: 'polygon(68% 0, 100% 0, 100% 100%, 52% 100%)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative flex h-full flex-col p-4">
        <div className="flex items-center justify-between">
          <Eyebrow tone="gold" className="tracking-caps">
            Tonight · SEC Football
          </Eyebrow>
          <Badge tone="going" surface="dark">
            Ticket in Wallet
          </Badge>
        </div>
        <div className="mt-2 flex items-baseline gap-2 font-display font-extrabold uppercase italic leading-[0.82]">
          <span className="text-display-xl tracking-title">A&amp;M</span>
          <span className="text-title text-white/60">vs</span>
          <span className="text-display-xl tracking-title text-lsu-gold">LSU</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-small text-white/80">
          <span className="font-semibold text-white tabular">6:00 PM</span>
          <span className="opacity-50">·</span>
          <MapPin size={12} strokeWidth={2.4} />
          Kyle Field
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-baseline gap-1 font-display font-bold leading-none tabular">
            <span className="text-display-md">08</span>
            <span className="text-small tracking-caps text-white/60">H</span>
            <span className="ml-1 text-display-md">17</span>
            <span className="text-small tracking-caps text-white/60">M</span>
            <span className="ml-2 font-sans text-meta font-medium text-white/60">to kickoff</span>
          </div>
          <div className="flex items-center gap-1.5 text-meta text-white/80">
            <Faces n={3} size={19} surface="photo" />
            <span>
              <b className="font-semibold text-white">125K</b> going
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function EventFinder() {
  const [chip, setChip] = useState('All')
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-4 pt-[56px] text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-headline font-bold tracking-headline">Texas A&amp;M Events</h1>
            <div className="flex gap-1">
              <IconButton label="Search">
                <Search size={18} />
              </IconButton>
              <IconButton label="Map view" to="/places/kyle-field">
                <Map size={18} />
              </IconButton>
            </div>
          </div>
          {/* Lens: which nodes feed this list */}
          <div className="mt-3 flex items-center gap-1.5 text-meta">
            <span className="mr-0.5 text-white/60">Events from</span>
            {(
              [
                ['A&M', 'bg-white text-maroon', 'bg-maroon', true],
                ['College Station', 'bg-white/14 text-white', 'bg-cstat-on-dark', true],
                ['Bryan', 'bg-transparent text-white/60 ring-1 ring-white/25', 'bg-bryan-on-dark', false],
              ] as const
            ).map(([l, c, d]) => (
              <span key={l} className={`flex h-[26px] items-center gap-1.5 rounded-full px-2.5 font-semibold ${c}`}>
                <span className={`size-[7px] rounded-full ${d}`} />
                {l}
              </span>
            ))}
          </div>
        </header>

        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1 pt-3.5">
          <Chip selected={false} label="Filters" leading={<SlidersHorizontal size={16} />} />
          {CHIPS.map((c) => (
            <Chip key={c} selected={chip === c} onClick={() => setChip(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <Link
          to="/places/kyle-field"
          className="mx-4 mt-3 flex items-center gap-2 rounded-thumb bg-white px-3 py-2.5 text-small shadow-raised"
        >
          <LiveDot />
          <span className="font-semibold text-ink">4 happening now</span>
          <span className="text-ink-3">within 2 mi</span>
          <span className="ml-auto font-semibold text-maroon">View on map</span>
        </Link>

        <section className="mt-5">
          <SectionHeader title="Today" meta="Sat, Oct 12" action={`See all ${TODAY.length}`} actionTo="/events" />
          <div className="stagger flex flex-col gap-2.5 px-4">
            <TonightCard />
            {/* Tonight's game plus what's live now; the rest sit behind "See all" so This Week shows above the fold, as on Troy's board. */}
            {TODAY.filter((e) => e.id !== 'lsu').slice(0, 1).map((e) => (
              <EventItemCard key={e.id} e={e} />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <SectionHeader title="This Week" meta="Oct 13 – 19" action="See All" actionTo="/events" />
          <div className="flex flex-col gap-2.5 px-4">
            {THIS_WEEK.map((e) => (
              <EventItemCard key={e.id} e={e} date={{ day: e.day, date: e.date }} />
            ))}
          </div>
        </section>
      </ScrollBody>
      <TabBar active="events" />
    </Screen>
  )
}
