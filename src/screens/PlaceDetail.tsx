import {
  Accessibility,
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  Moon,
  Share,
  Star,
  Ticket,
  Trophy,
  Utensils,
} from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { Screen, ScrollBody } from '../components/Device'
import { CrowdPulse, pulsePositions } from '../components/CrowdPulse'
import { AggieMark, MatchupThumb } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Faces } from '../components/Avatar'
import { Badge, LiveDot } from '../components/Badge'
import { Button } from '../components/Button'
import { DateBlock, EventRow, EventRowGroup } from '../components/EventCard'
import { Timeline, type TimelineItem } from '../components/Timeline'
import { IconButton, SectionHeader } from '../components/ui'
import { KYLE_FIELD_GAMEDAY } from '../data/kyleField'

const TODAY_HERE: TimelineItem[] = [
  { time: '7:00 AM', title: 'Stadium tours', where: 'Paused for gameday', state: 'past' },
  { time: '9:00 AM', title: '12th Man Brunch', where: 'Hall of Champions', state: 'live', note: '420 here' },
  { time: '10:00 AM', title: 'Tailgate Zone opens', where: 'Lot C · east side', state: 'next', note: 'in 14 min' },
  { time: '3:45 PM', title: 'Corps March-In arrives', where: 'Gate 2 · Joe Routt Blvd', state: 'later' },
  { time: '4:00 PM', title: 'Gates open', where: 'All gates · clear bag policy', state: 'later' },
  { time: '6:00 PM', title: 'Kickoff · A&M vs LSU', where: 'Main bowl', state: 'later', anchor: true },
]

const INSIDE = [
  { Icon: DoorOpen, label: 'Gate 2', val: '5 min', sub: 'entry wait', ok: true },
  { Icon: Utensils, label: 'Concessions', val: '4 PM', sub: '38 stands open', ok: false },
  { Icon: Trophy, label: 'Hall of Champions', val: 'Live', sub: 'brunch now', live: true },
  { Icon: Accessibility, label: 'Accessible entry', val: 'Gate 4', sub: 'elevators A–D', ok: true },
]

const INSIDE_QUIET = [
  { Icon: DoorOpen, label: 'Gate 2', val: 'Closed', sub: 'opens for events', ok: false },
  { Icon: Utensils, label: 'Concessions', val: 'Closed', sub: 'open on event days', ok: false },
  { Icon: Trophy, label: 'Hall of Champions', val: 'Open', sub: 'until 4 PM', ok: true },
  { Icon: Accessibility, label: 'Accessible entry', val: 'Gate 4', sub: 'elevators A–D', ok: true },
]

const COMING_UP = [
  { day: 'FRI', date: '18', title: 'Midnight Yell', when: '11:59 PM', going: '18K going' },
  { day: 'SAT', date: '19', title: 'Texas A&M vs Ole Miss', when: '2:30 PM', going: '98K going' },
  { day: 'SAT', date: '26', title: 'Aggie Band Fall Concert', when: '7:00 PM', going: '2.1K going' },
]

const POS = pulsePositions(KYLE_FIELD_GAMEDAY)

/** Empty state: nothing on here right now, so lead with what's next rather than the building. */
function QuietHere() {
  return (
    <>
      <div className="rounded-card bg-white p-4 shadow-floating">
        <span className="grid size-[40px] place-items-center rounded-well bg-maroon-soft text-maroon">
          <Moon size={20} />
        </span>
        <h2 className="mt-3 text-emphasis font-bold tracking-snug">Quiet at Kyle Field right now.</h2>
        <p className="mt-1 text-control leading-[1.4] text-ink-2">
          Next up: <span className="font-semibold text-ink">Midnight Yell, Fri 11:59 PM</span>.
        </p>
        <Link to="/events" className="mt-4 block rounded-well">
          <Button as="span" size="sm" className="w-full">
            See what's on
          </Button>
        </Link>
      </div>

      <section className="mt-5">
        <div className="mb-2 flex items-end justify-between">
          <h2 className="text-title font-bold tracking-title">Coming up here</h2>
          <span className="text-small text-ink-3">Next 2 weeks</span>
        </div>
        <EventRowGroup>
          {COMING_UP.map((e) => (
            <EventRow
              key={e.title}
              leading={<DateBlock day={e.day} date={e.date} />}
              title={e.title}
              meta={`${e.when} · ${e.going}`}
            />
          ))}
        </EventRowGroup>
      </section>
    </>
  )
}

/** Kyle Field, live on gameday. `quiet` (or `?quiet=1`) shows the empty state for a day with nothing on. */
export function PlaceDetail({ quiet: quietProp }: { quiet?: boolean }) {
  const [params] = useSearchParams()
  const quiet = quietProp ?? params.get('quiet') === '1'
  const inside = quiet ? INSIDE_QUIET : INSIDE
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        {/* Hero */}
        <div className={`relative overflow-hidden bg-maroon text-white ${quiet ? 'h-[300px]' : 'h-[368px]'}`}>
          <img src="/img/kyle-field.jpg" alt="Kyle Field" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_24%,rgba(80,0,0,0.55)_46%,var(--color-maroon)_74%)]" />
          <div className="absolute inset-x-4 top-[52px] flex justify-between">
            <IconButton label="Back" to="/events" surface="onPhoto">
              <ChevronLeft size={21} />
            </IconButton>
            <div className="flex gap-1">
              <IconButton label="Share" surface="onPhoto">
                <Share size={17} />
              </IconButton>
              <IconButton label="Save" surface="onPhoto">
                <Star size={17} />
              </IconButton>
            </div>
          </div>
          <div className={`absolute inset-x-4 ${quiet ? 'bottom-[40px]' : 'bottom-[148px]'}`}>
            {/* Node lineage: this venue's parent nodes */}
            <div className="flex items-center gap-1 text-meta font-medium text-white/80">
              <AggieMark size={18} className="!rounded-tag" />
              <span className="ml-1">Texas A&amp;M</span>
              <ChevronRight size={12} className="opacity-60" />
              <span>Athletics</span>
              <ChevronRight size={12} className="opacity-60" />
              <span className="text-white">Kyle Field</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between gap-3">
              <h1 className="text-display-lg font-bold leading-none tracking-headline">Kyle Field</h1>
              {quiet ? null : (
                <Badge tone="live" surface="dark">
                  3 events
                </Badge>
              )}
            </div>
            {quiet ? (
              <div className="mt-2 text-small text-white/80">Home of the 12th Man · Tours daily 9 AM–4 PM</div>
            ) : null}
          </div>

          {/* The venue's day, read through its events: crowd follows what's on */}
          <div className={`absolute inset-x-4 bottom-[30px] ${quiet ? 'hidden' : ''}`}>
            <div className="flex items-end justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="settle font-display text-display-sm font-bold leading-none tabular">2,140</span>
                <span className="text-meta font-medium text-white/75">here now</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="settle font-display text-title font-bold leading-none text-gold tabular [animation-delay:160ms]">
                  102K
                </span>
                <span className="text-meta font-medium text-white/75">by kickoff</span>
              </div>
            </div>
            <div className="mt-2">
              <CrowdPulse day={KYLE_FIELD_GAMEDAY} width={361} height={48} />
            </div>
            <div className="relative mt-1.5 h-[13px] text-micro font-semibold leading-none tracking-eyebrow text-white/75">
              <span className="absolute -translate-x-1/2 text-gold" style={{ left: `${POS.nowPct * 100}%` }}>
                NOW
              </span>
              <span className="absolute -translate-x-full pr-1" style={{ left: `${POS.marchPct * 100}%` }}>
                MARCH-IN
              </span>
              <span className="absolute pl-1" style={{ left: `${POS.kickPct * 100}%` }}>
                KICKOFF
              </span>
              <span className="absolute right-0">11 PM</span>
            </div>
          </div>
        </div>

        {/* Event first: tonight's anchor event */}
        <div className="relative z-10 -mt-[18px] rounded-t-sheet bg-canvas px-4 pt-4">
          {quiet ? (
            <QuietHere />
          ) : (
            <>
              <Link to="/gameday" className="press block rounded-card bg-white p-3.5 shadow-floating">
                <div className="flex items-center gap-3">
                  <MatchupThumb size={58} />
                  <div className="min-w-0 flex-1">
                    <div className="text-micro font-bold tracking-eyebrow text-maroon">TONIGHT · SEC FOOTBALL</div>
                    <div className="truncate text-emphasis font-bold tracking-title">Texas A&amp;M vs LSU</div>
                    <div className="text-small text-ink-2">
                      Kickoff <span className="tabular font-semibold text-ink">6:00 PM</span> · Gates 4:00 PM
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="flex min-w-0 flex-1 items-center gap-1.5 text-meta text-ink-3">
                    <Faces n={3} size={19} />
                    <span className="truncate">
                      <b className="font-semibold text-ink-2">125K going</b> · 23 friends
                    </span>
                  </div>
                  <Button as="span" size="sm" className="shrink-0">
                    <Ticket size={16} strokeWidth={2.2} />
                    View Ticket
                  </Button>
                </div>
              </Link>

              {/* What's live, what's next — on a timeline, so it never reads as a directory */}
              <section className="mt-5">
                <div className="mb-2 flex items-end justify-between">
                  <h2 className="text-title font-bold tracking-title">Today at Kyle Field</h2>
                  <span className="text-small text-ink-3">Sat, Oct 12</span>
                </div>
                <Timeline items={TODAY_HERE} />
              </section>
            </>
          )}
        </div>

        {/* Node second: what's inside this venue, with live state */}
        <section className="mt-6">
          <SectionHeader title="Inside Kyle Field" action="Stadium Map" />
          <div className="grid grid-cols-2 gap-2.5 px-4">
            {inside.map((x) => (
              <div key={x.label} className="rounded-card bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="grid size-[30px] place-items-center rounded-well bg-maroon-soft text-maroon">
                    <x.Icon size={16} />
                  </span>
                  <span
                    className={`flex items-center gap-1 text-body font-bold tabular ${'live' in x && x.live ? 'text-live' : x.ok ? 'text-ok' : 'text-ink'}`}
                  >
                    {'live' in x && x.live ? <LiveDot /> : null}
                    {x.val}
                  </span>
                </div>
                <div className="mt-2 text-control font-semibold">{x.label}</div>
                <div className="text-meta text-ink-3">{x.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <SectionHeader title="Part of campus" />
          <div className="mx-4 rounded-card bg-white p-3.5">
            <div className="flex items-center gap-2.5">
              <AggieMark size={36} />
              <div className="flex-1">
                <div className="text-body font-semibold">Texas A&amp;M Athletics</div>
                <div className="text-meta text-ink-3">Kyle Field, Reed Arena, Olsen Field and more</div>
              </div>
              <ChevronRight size={16} className="text-ink-3" />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-hairline pt-3">
              <span className="mr-1 self-center text-meta text-ink-3">Nearby</span>
              {['Reed Arena', 'Olsen Field', 'Lot C'].map((n) => (
                <span
                  key={n}
                  className="flex h-[20px] items-center rounded-full bg-canvas px-2 text-micro font-semibold text-ink-2"
                >
                  {n}
                </span>
              ))}
              <Badge tone="node" node="cstat" />
            </div>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="map" />
    </Screen>
  )
}
