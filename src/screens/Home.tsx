import {
  Bell,
  Bus,
  CalendarClock,
  CalendarDays,
  Grid2x2,
  IdCard,
  Map,
  MessageCircle,
  Mic,
  Plus,
  Search,
  ShieldCheck,
  Sun,
  Trophy,
  Users,
  Utensils,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Screen, ScrollBody } from '../components/Device'
import { AggieMark, MatchupThumb } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Avatar, Faces } from '../components/Avatar'
import { Badge, LiveDot } from '../components/Badge'
import { Button } from '../components/Button'
import { EventRow, EventRowGroup } from '../components/EventCard'
import { Tile, type TileProps } from '../components/Tile'
import { IconButton, SectionHeader } from '../components/ui'

const TILES: TileProps[] = [
  // Only tiles with something live right now carry a status line, so the live ones stand out.
  { label: 'Class Schedule', Icon: CalendarClock, tint: 'blue' },
  { label: 'Campus Map', Icon: Map, tint: 'green', status: '4 on now', statusTone: 'live', to: '/places/kyle-field' },
  { label: 'Dining', Icon: Utensils, tint: 'amber', status: 'Sbisa open', statusTone: 'ok' },
  { label: 'Transit', Icon: Bus, tint: 'indigo', status: 'Rt 40 · 12 min' },
  { label: 'Events', Icon: CalendarDays, tint: 'red', to: '/events' },
  { label: 'Organizations', Icon: Users, tint: 'purple' },
  { label: 'Athletics', Icon: Trophy, emphasis: 'solid', status: 'Kickoff 6 PM', flag: 'GAMEDAY', to: '/gameday' },
  { label: 'Safety', Icon: ShieldCheck, tint: 'teal' },
  { label: 'Quick Event', Icon: Plus, emphasis: 'outline', to: '/quick-event' },
  { label: 'Messages', Icon: MessageCircle, tint: 'sky' },
  { label: 'Aggie ID', Icon: IdCard, tint: 'maroon' },
  { label: 'More', Icon: Grid2x2, tint: 'neutral' },
]

const LIVE_NOW = [
  {
    img: '/img/farmers-market.jpg',
    title: 'Farmers Market',
    meta: 'Wolf Pen Creek · 1.1K here',
    node: 'cstat',
    live: true,
  },
  {
    img: '/img/kyle-field-stands.jpg',
    title: 'Tailgate Zone — Lot C',
    meta: 'Opens 10:00 AM · 8.4K going',
    node: 'tamu',
  },
  { img: '/img/msc.jpg', title: 'MSC Open House', meta: '11:00 AM · 640 going', node: 'tamu' },
] as const

function NowCard({
  kicker,
  kickerTone = 'text-maroon',
  title,
  meta,
  aside,
  footer,
  action,
  to,
  wide,
  display,
}: {
  kicker: ReactNode
  kickerTone?: string
  title: string
  meta: ReactNode
  aside?: ReactNode
  footer?: ReactNode
  action: ReactNode
  to?: string
  wide?: boolean
  /** The lead card's title in the condensed display face, matching EventFinder and Game day. */
  display?: boolean
}) {
  const inner = (
    <div
      className={`flex h-full snap-start flex-col rounded-card bg-white px-4 pb-3.5 pt-3.5 shadow-floating ${
        wide ? 'w-[min(349px,calc(100vw-44px))]' : 'w-[min(260px,calc(100vw-60px))]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={`flex items-center gap-1.5 text-micro font-bold tracking-eyebrow ${kickerTone}`}>
            {kicker}
          </div>
          <div
            className={
              display
                ? 'mt-1.5 truncate font-display text-[clamp(28px,8.6vw,var(--text-display-lg))] font-extrabold italic leading-[0.95] tracking-[-0.01em] text-ink'
                : 'mt-1 truncate text-title font-bold tracking-title text-ink'
            }
          >
            {title}
          </div>
          <div className="mt-0.5 text-small text-ink-2">{meta}</div>
        </div>
        {aside}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
        <div className="min-w-0 truncate text-meta text-ink-3">{footer}</div>
        {action}
      </div>
    </div>
  )
  return to ? (
    <Link to={to} className="shrink-0">
      {inner}
    </Link>
  ) : (
    <div className="shrink-0">{inner}</div>
  )
}

export function Home() {
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        {/* Maroon header */}
        <header className="relative overflow-hidden bg-maroon px-4 pb-[80px] pt-[56px] text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-luminosity"
            style={{
              backgroundImage: 'url(/img/academic-building.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(80,0,0,0.55)_0%,var(--color-maroon)_78%)]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AggieMark size={34} />
                <div className="leading-tight">
                  <div className="text-micro font-bold tracking-caps">TEXAS A&amp;M UNIVERSITY</div>
                  <div className="text-micro text-white/60">on EventQuan</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="relative">
                  <IconButton label="Notifications">
                    <Bell size={19} />
                  </IconButton>
                  <span className="pointer-events-none absolute right-[11px] top-[9px] size-[8px] rounded-full bg-gold ring-2 ring-maroon" />
                </span>
                <button type="button" aria-label="Profile" className="press -m-1 grid size-[44px] place-items-center">
                  <Avatar initials="JC" size={36} className="ring-2 ring-white/25" />
                </button>
              </div>
            </div>

            <h1 className="mt-4 text-headline font-bold leading-[1.1] tracking-headline">Good Morning, Aggie!</h1>
            <div className="mt-1.5 flex items-center gap-1.5 text-control text-white/75">
              <Sun size={15} className="text-gold" />
              <span className="tabular">72°</span> Sunny · College Station, TX
            </div>

            <div className="mt-3.5 flex h-[44px] items-center gap-2.5 rounded-thumb bg-white px-3.5 text-body text-ink-3 shadow-floating">
              <Search size={18} className="text-ink-2" />
              <span className="flex-1">Search events, places, people…</span>
              <Mic size={17} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-meta font-bold tracking-caps text-white/75">RIGHT NOW · SAT, OCT 12</span>
              <span className="flex items-center gap-1.5 text-meta font-semibold text-white/90">
                <LiveDot />4 happening now
              </span>
            </div>
          </div>
        </header>

        {/* The straw: live context leads, the launcher follows */}
        <div className="no-scrollbar stagger relative -mt-[68px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scroll-px-4">
          <NowCard
            wide
            display
            to="/gameday"
            kicker={
              <>
                <span className="rounded-tag bg-maroon px-1.5 py-[2px] text-tab tracking-caps text-white">GAMEDAY</span>
                <span className="text-ink-3">KICKOFF IN 8H 19M</span>
              </>
            }
            title="A&M vs LSU"
            meta="Today 6:00 PM · Kyle Field"
            aside={<MatchupThumb size={54} />}
            footer={
              <span className="flex items-center gap-1.5">
                <Faces n={3} size={20} />
                <span className="truncate">23 friends going</span>
              </span>
            }
            action={
              <Button as="span" size="sm" className="shrink-0">
                Game Mode
              </Button>
            }
          />
          <NowCard
            kicker={
              <>
                <span className="size-[6px] rounded-full bg-ok" />
                <span className="text-ok">OPEN NOW · 5 MIN WALK</span>
              </>
            }
            kickerTone=""
            title="Sbisa Dining Hall"
            meta="Gameday brunch until 11"
            footer="Ready in ~8 min"
            action={
              <Button size="sm" className="shrink-0">
                Order Now
              </Button>
            }
          />
          <NowCard
            kicker={<span className="text-tint-indigo-ink">ROUTE 40 · GAMEDAY SHUTTLE</span>}
            kickerTone=""
            title="Next bus 12 min"
            meta="Stop: Commons → Kyle Field"
            footer=""
            action={
              <Button size="sm" className="shrink-0">
                Track Bus
              </Button>
            }
          />
        </div>

        {/* His launcher grid, now carrying live state */}
        <section className="mx-4 mt-2.5 rounded-sheet bg-white px-1.5 pb-1.5 pt-1.5 shadow-raised">
          <div className="stagger grid grid-cols-4 gap-y-1">
            {TILES.map((t) => (
              <Tile key={t.label} {...t} />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <SectionHeader title="Live on campus" action="See All" actionTo="/events" />
          <div className="mx-4">
            <EventRowGroup>
              {LIVE_NOW.map((r) => (
                <EventRow
                  key={r.title}
                  leading={<img src={r.img} alt="" className="size-[46px] rounded-well object-cover" />}
                  live={'live' in r ? <LiveDot /> : null}
                  title={r.title}
                  meta={r.meta}
                  trailing={<Badge tone="node" node={r.node} />}
                />
              ))}
            </EventRowGroup>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
