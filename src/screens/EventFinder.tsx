import { BadgeCheck, Bookmark, Map, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Screen, ScrollBody } from '../components/Device'
import { MatchupThumb } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Faces, IconButton, LiveDot, LivePill, NodeTag, SectionHeader } from '../components/ui'
import { CATEGORY_TONE, NODE_META, THIS_WEEK, TODAY, type EventItem } from '../data/events'

const CHIPS = ['All', 'Athletics', 'Student Life', 'Academic', 'Traditions', 'Community']

function StatusPill({ s }: { s: NonNullable<EventItem['status']> }) {
  if (s.kind === 'live') return <LivePill />
  if (s.kind === 'going')
    return (
      <span className="inline-flex h-[22px] items-center gap-1 rounded-full bg-ok/10 px-2 text-[11px] font-semibold text-ok">
        <BadgeCheck size={12} strokeWidth={2.4} />
        {s.label}
      </span>
    )
  return (
    <span className="inline-flex h-[22px] items-center rounded-full bg-[#fff4d6] px-2 text-[11px] font-semibold text-[#7a4f00]">
      {s.label}
    </span>
  )
}

function EventCard({ e, date }: { e: EventItem; date?: { day: string; date: string } }) {
  const card = (
    <article className="flex gap-3 rounded-[18px] bg-white p-2.5 pr-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] active:bg-[#fafafa]">
      <div className="relative">
        {e.matchup ? (
          <MatchupThumb size={78} />
        ) : (
          <img src={e.img} alt="" className="size-[78px] rounded-[14px] object-cover" />
        )}
        {date ? (
          <span className="absolute left-1.5 top-1.5 rounded-[7px] bg-white/95 px-1.5 py-[2px] text-center leading-none shadow-sm">
            <span className="block text-[10px] font-bold tracking-[0.6px] text-maroon">{date.day}</span>
            <span className="block text-[14px] font-bold text-ink">{date.date}</span>
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-bold uppercase tracking-[0.7px] ${CATEGORY_TONE[e.category]}`}>
            {e.category}
          </span>
          {e.status ? (
            <StatusPill s={e.status} />
          ) : (
            <button
              type="button"
              aria-label={`Save ${e.title}`}
              className="-my-3 -mr-3 grid size-[44px] place-items-center text-ink-3"
            >
              <Bookmark size={18} />
            </button>
          )}
        </div>
        <h3 className="mt-0.5 truncate text-[16px] font-semibold tracking-[-0.3px] text-ink">{e.title}</h3>
        <div className="mt-0.5 flex items-center gap-1 truncate text-[13px] text-ink-2">
          <span className="tabular font-medium text-ink">{e.when}</span>
          <span className="text-ink-3">·</span>
          <MapPin size={12} className={NODE_META[e.node].text} strokeWidth={2.4} />
          <span className="truncate">{e.venue}</span>
        </div>
        <div className="mt-auto flex items-center gap-1.5 pt-1.5 text-[12px] text-ink-3">
          {e.friends ? <Faces n={Math.min(3, e.friends)} size={17} /> : null}
          <span className="truncate">
            <span className="font-semibold text-ink-2">{e.attending}</span>
            {e.friends && e.node === 'tamu' ? ` · ${e.friends} friends` : ''}
          </span>
          {e.node !== 'tamu' ? <NodeTag node={e.node} className="ml-auto shrink-0" /> : null}
        </div>
      </div>
    </article>
  )
  return e.to ? <Link to={e.to}>{card}</Link> : card
}

/** The day's anchor event, given a ticket-stub treatment in both teams' colours. */
function TonightCard() {
  return (
    <Link
      to="/gameday"
      className="press relative block h-[184px] overflow-hidden rounded-[18px] bg-maroon-deep text-white shadow-[0_14px_30px_-16px_rgba(58,0,0,0.7)]"
    >
      <img src="/img/kyle-field-crowd.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-maroon/88" style={{ clipPath: 'polygon(0 0, 68% 0, 52% 100%, 0 100%)' }} />
      <div className="absolute inset-0 bg-lsu/80" style={{ clipPath: 'polygon(68% 0, 100% 0, 100% 100%, 52% 100%)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative flex h-full flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[1.2px] text-gold">TONIGHT · SEC FOOTBALL</span>
          <span className="flex items-center gap-1 inline-flex h-[22px] items-center rounded-full bg-white/16 px-2 text-[11px] font-semibold backdrop-blur-md">
            <BadgeCheck size={12} strokeWidth={2.4} className="text-[#7ee2a8]" />
            Ticket in Wallet
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2 font-display font-extrabold uppercase italic leading-[0.82]">
          <span className="text-[50px] tracking-[-0.5px]">A&amp;M</span>
          <span className="text-[20px] text-white/60">vs</span>
          <span className="text-[50px] tracking-[-0.5px] text-lsu-gold">LSU</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-[13px] text-white/80">
          <span className="font-semibold text-white tabular">6:00 PM</span>
          <span className="opacity-50">·</span>
          <MapPin size={12} strokeWidth={2.4} />
          Kyle Field
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-baseline gap-1 font-display font-bold leading-none tabular">
            <span className="text-[30px]">08</span>
            <span className="text-[13px] tracking-[1px] text-white/55">H</span>
            <span className="ml-1 text-[30px]">17</span>
            <span className="text-[13px] tracking-[1px] text-white/55">M</span>
            <span className="ml-2 font-sans text-[12px] font-medium text-white/60">to kickoff</span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-white/80">
            <Faces n={3} size={19} ring="ring-[#2a0a3a]" />
            <span>
              <b className="font-semibold text-white">125K</b> · 23 friends
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
            <h1 className="text-[28px] font-bold tracking-[-0.7px]">Texas A&amp;M Events</h1>
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
          <div className="mt-3 flex items-center gap-1.5 text-[12px]">
            <span className="mr-0.5 text-white/60">Events from</span>
            {(
              [
                ['A&M', 'bg-white text-maroon', 'bg-maroon', true],
                ['College Station', 'bg-white/14 text-white', 'bg-[#3fd29b]', true],
                ['Bryan', 'bg-transparent text-white/55 ring-1 ring-white/25', 'bg-[#6aa7ff]', false],
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
          <button
            type="button"
            aria-label="Filters"
            className="grid h-[34px] w-[38px] shrink-0 place-items-center rounded-full bg-white text-ink-2 ring-1 ring-hairline"
          >
            <SlidersHorizontal size={16} />
          </button>
          {CHIPS.map((c) => (
            <button
              type="button"
              key={c}
              aria-pressed={chip === c}
              onClick={() => setChip(c)}
              className={`relative h-[34px] shrink-0 rounded-full px-4 after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-[''] text-[14px] font-semibold transition-colors ${
                chip === c ? 'bg-maroon text-white' : 'bg-white text-ink-2 ring-1 ring-hairline'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <Link
          to="/places/kyle-field"
          className="mx-4 mt-3 flex items-center gap-2 rounded-[14px] bg-white px-3 py-2.5 text-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <LiveDot />
          <span className="font-semibold text-ink">4 happening now</span>
          <span className="text-ink-3">within 2 mi</span>
          <span className="ml-auto font-semibold text-maroon">View on map</span>
        </Link>

        <section className="mt-5">
          <SectionHeader title="Today" meta="Sat, Oct 12" action="See All" />
          <div className="stagger flex flex-col gap-2.5 px-4">
            <TonightCard />
            {TODAY.filter((e) => e.id !== 'lsu').map((e) => (
              <EventCard key={e.id} e={e} />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <SectionHeader title="This Week" meta="Oct 13 – 19" action="See All" />
          <div className="flex flex-col gap-2.5 px-4">
            {THIS_WEEK.map((e) => (
              <EventCard key={e.id} e={e} date={{ day: e.day, date: e.date }} />
            ))}
          </div>
        </section>
      </ScrollBody>
      <TabBar active="events" />
    </Screen>
  )
}
