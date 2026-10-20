import {
  Bell,
  Bus,
  CalendarClock,
  CalendarDays,
  ChevronRight,
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
import { Faces, GoldButton, IconButton, LiveDot, NodeTag, SectionHeader } from '../components/ui'

type Tile = {
  label: string
  Icon: typeof Bell
  tint: string
  /** Shown only when the tile has something live to say. */
  status?: string
  tone?: 'live' | 'ok' | 'muted' | 'warn'
  badge?: string
  to?: string
  feature?: boolean
}

const TILES: Tile[] = [
  { label: 'Class Schedule', Icon: CalendarClock, tint: 'bg-[#e8effa] text-[#2c5ea8]', status: 'Next class Mon' },
  {
    label: 'Campus Map',
    Icon: Map,
    tint: 'bg-[#e6f4ec] text-[#1f7a4d]',
    status: '4 on now',
    tone: 'live',
    to: '/places/kyle-field',
  },
  { label: 'Dining', Icon: Utensils, tint: 'bg-[#fdf1df] text-[#b06a00]', status: 'Sbisa open', tone: 'ok' },
  { label: 'Transit', Icon: Bus, tint: 'bg-[#ebe9fb] text-[#4a3fb0]', status: 'Rt 40 · 12 min' },
  {
    label: 'Events',
    Icon: CalendarDays,
    tint: 'bg-[#fbe9e9] text-[#b23434]',
    status: '9 today',
    to: '/events',
  },
  { label: 'Organizations', Icon: Users, tint: 'bg-[#f3e9f8] text-[#7b3fa0]', status: '3 meet today' },
  {
    label: 'Athletics',
    Icon: Trophy,
    tint: 'bg-maroon text-white',
    status: 'Kickoff 6 PM',
    badge: 'GAMEDAY',
    to: '/gameday',
  },
  { label: 'Safety', Icon: ShieldCheck, tint: 'bg-[#e4f3f3] text-[#0f7272]', status: 'All clear', tone: 'ok' },
  {
    label: 'Quick Event',
    Icon: Plus,
    tint: 'bg-white text-maroon ring-2 ring-inset ring-gold',
    to: '/quick-event',
    feature: true,
  },
  { label: 'Messages', Icon: MessageCircle, tint: 'bg-[#e6f1fb] text-[#1c6fb8]' },
  { label: 'Aggie ID', Icon: IdCard, tint: 'bg-[#f5ecec] text-maroon' },
  { label: 'More', Icon: Grid2x2, tint: 'bg-[#efeff3] text-ink-2' },
]

function TileView({ t }: { t: Tile }) {
  const body = (
    <>
      <span className={`relative grid size-[50px] place-items-center rounded-[15px] ${t.tint}`}>
        <t.Icon size={25} strokeWidth={t.feature ? 2.6 : 2} />
        {t.badge ? (
          t.badge.length > 2 ? (
            <span className="absolute -top-[7px] left-1/2 flex h-[16px] -translate-x-1/2 items-center gap-[3px] rounded-full bg-live-strong px-[6px] text-[10px] font-extrabold tracking-[0.5px] text-white ring-2 ring-white">
              {t.badge}
            </span>
          ) : (
            <span className="absolute -right-[5px] -top-[5px] grid h-[18px] min-w-[18px] place-items-center rounded-full bg-live-strong px-1 text-[10.5px] font-bold text-white ring-2 ring-white">
              {t.badge}
            </span>
          )
        ) : null}
      </span>
      <span className="mt-[7px] text-center text-[11.5px] font-semibold leading-[1.15] tracking-[-0.1px] text-ink">
        {t.label}
      </span>
      <span
        className={`mt-[3px] flex h-[13px] max-w-full items-center gap-[4px] overflow-hidden text-ellipsis whitespace-nowrap px-0.5 text-[11px] leading-none ${
          t.tone === 'live' ? 'font-semibold text-[#c4231e]' : t.tone === 'ok' ? 'font-medium text-ok' : 'text-ink-3'
        }`}
      >
        {t.status && t.tone === 'live' ? <LiveDot className="!size-[5px]" /> : null}
        {t.status && t.tone === 'ok' ? <span className="size-[5px] rounded-full bg-ok" /> : null}
        {t.status}
      </span>
    </>
  )
  const cls = 'flex flex-col items-center pt-1.5 pb-1 rounded-[14px] active:bg-black/[0.04]'
  return t.to ? (
    <Link to={t.to} className={cls}>
      {body}
    </Link>
  ) : (
    <button type="button" className={cls}>
      {body}
    </button>
  )
}

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
}) {
  const inner = (
    <div
      className={`flex h-full snap-start flex-col rounded-[18px] bg-white px-4 pb-3.5 pt-3.5 shadow-[0_1px_2px_rgba(30,0,0,0.06),0_10px_30px_-12px_rgba(60,0,0,0.35)] ${
        wide ? 'w-[min(349px,calc(100vw-44px))]' : 'w-[min(260px,calc(100vw-60px))]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={`flex items-center gap-1.5 text-[11px] font-bold tracking-[0.6px] ${kickerTone}`}>
            {kicker}
          </div>
          <div className="mt-1 truncate text-[19px] font-bold tracking-[-0.4px] text-ink">{title}</div>
          <div className="mt-0.5 text-[13px] text-ink-2">{meta}</div>
        </div>
        {aside}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
        <div className="min-w-0 truncate text-[12px] text-ink-3">{footer}</div>
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
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(80,0,0,0.55)_0%,#500000_78%)]" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AggieMark size={34} />
                <div className="leading-tight">
                  <div className="text-[11px] font-bold tracking-[1.6px]">TEXAS A&amp;M UNIVERSITY</div>
                  <div className="text-[11px] text-white/60">on EventQuan</div>
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
                  <span className="grid size-[36px] place-items-center rounded-full bg-[#9a6a2c] text-[13px] font-bold ring-2 ring-white/30">
                    JC
                  </span>
                </button>
              </div>
            </div>

            <h1 className="mt-4 text-[28px] font-bold leading-[1.1] tracking-[-0.8px]">Good Morning, Aggie!</h1>
            <div className="mt-1.5 flex items-center gap-1.5 text-[14px] text-white/75">
              <Sun size={15} className="text-gold" />
              <span className="tabular">72°</span> Sunny · College Station, TX
            </div>

            <div className="mt-3.5 flex h-[44px] items-center gap-2.5 rounded-[13px] bg-white px-3.5 text-[15px] text-ink-3 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
              <Search size={18} className="text-ink-2" />
              <span className="flex-1">Search events, places, people…</span>
              <Mic size={17} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[12px] font-bold tracking-[1.2px] text-white/70">RIGHT NOW · SAT, OCT 12</span>
              <span className="flex items-center gap-1.5 text-[12px] font-semibold text-white/90">
                <LiveDot />4 happening now
              </span>
            </div>
          </div>
        </header>

        {/* The straw: live context leads, the launcher follows */}
        <div className="no-scrollbar stagger relative -mt-[68px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scroll-px-4">
          <NowCard
            wide
            to="/gameday"
            kicker={
              <>
                <span className="rounded-[5px] bg-maroon px-1.5 py-[2px] text-[10px] tracking-[1px] text-white">
                  GAMEDAY
                </span>
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
              <GoldButton as="span" size="sm" className="shrink-0">
                Game Mode
              </GoldButton>
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
              <GoldButton size="sm" className="shrink-0">
                Order Now
              </GoldButton>
            }
          />
          <NowCard
            kicker={<span className="text-[#4a3fb0]">ROUTE 40 · GAMEDAY SHUTTLE</span>}
            kickerTone=""
            title="Next bus 12 min"
            meta="Stop: Commons → Kyle Field"
            footer=""
            action={
              <GoldButton size="sm" className="shrink-0">
                Track Bus
              </GoldButton>
            }
          />
        </div>

        {/* His launcher grid, now carrying live state */}
        <section className="mx-4 mt-2.5 rounded-[22px] bg-white px-1.5 pb-1.5 pt-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="stagger grid grid-cols-4 gap-y-1">
            {TILES.map((t) => (
              <TileView key={t.label} t={t} />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <SectionHeader title="Live on campus" action="See All" />
          <div className="mx-4 divide-y divide-hairline overflow-hidden rounded-[18px] bg-white">
            {[
              {
                img: '/img/farmers-market.jpg',
                t: 'Farmers Market',
                s: 'Wolf Pen Creek · 1.1K here',
                node: 'cstat' as const,
                live: true,
              },
              {
                img: '/img/kyle-field-stands.jpg',
                t: 'Tailgate Zone — Lot C',
                s: 'Opens 10:00 AM · 8.4K going',
                node: 'tamu' as const,
              },
              { img: '/img/msc.jpg', t: 'MSC Open House', s: '11:00 AM · 640 going', node: 'tamu' as const },
            ].map((r) => (
              <div key={r.t} className="flex items-center gap-3 px-3 py-2.5">
                <img src={r.img} alt="" className="size-[46px] rounded-[11px] object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[15px] font-semibold tracking-[-0.2px]">
                    {r.live ? <LiveDot /> : null}
                    {r.t}
                  </div>
                  <div className="text-[13px] text-ink-3">{r.s}</div>
                </div>
                <NodeTag node={r.node} />
                <ChevronRight size={16} className="text-ink-3" />
              </div>
            ))}
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
