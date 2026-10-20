import { Bell, Mic, Search, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Badge, LiveDot } from '../components/Badge'
import { Button } from '../components/Button'
import { Screen, ScrollBody } from '../components/Device'
import { AggieMark } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Tile } from '../components/Tile'
import { IconButton } from '../components/ui'
import { NODE_META, type Node } from '../data/events'
import { TILES } from '../data/homeTiles'
import { GameStrip } from './GameStrip'

type Stop = {
  time: string
  title: string
  place: string
  meta: string
  img: string
  node: Node
  state?: 'live' | 'soon'
  status?: string
}

const STOPS: Stop[] = [
  {
    time: 'Now',
    title: 'Farmers Market',
    place: 'Wolf Pen Creek',
    meta: '2 friends',
    img: '/img/farmers-market.jpg',
    node: 'cstat',
    state: 'live',
  },
  {
    time: '10:00',
    title: 'Tailgate Zone — Lot C',
    place: 'Kyle Field',
    meta: '11 going',
    img: '/img/kyle-field-stands.jpg',
    node: 'tamu',
    state: 'soon',
    status: 'In 17 min',
  },
]

const RAIL_DOT = { live: 'bg-live ring-live/20', soon: 'bg-gold ring-gold/30', none: 'bg-white ring-hairline-strong' }

/**
 * Exploration · University Home with "your Saturday" on top of his launcher.
 * After Spotify's Live Events list: the day reads as a short timeline that builds to kickoff,
 * placed between his header and his twelve tiles, which stay exactly as drawn.
 */
export function HomeDayPlan() {
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="relative overflow-hidden bg-maroon px-4 pb-[60px] pt-[56px] text-white">
          <img
            src="/img/academic-building.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-[0.16] mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-b from-maroon/55 to-maroon to-80%" />
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

            <h1 className="mt-3 text-headline font-bold leading-[1.1] tracking-headline">Good Morning, Aggie!</h1>
            <div className="mt-1.5 flex items-center gap-1.5 text-control text-white/75">
              <Sun size={15} className="text-gold" />
              <span className="tabular">72°</span> Sunny · College Station, TX
            </div>

            <div className="mt-3 flex h-[44px] items-center gap-2.5 rounded-thumb bg-white px-3.5 text-body text-ink-3 shadow-floating">
              <Search size={18} className="text-ink-2" />
              <span className="flex-1">Search events, places, people…</span>
              <Mic size={17} />
            </div>
          </div>
        </header>

        {/* Your Saturday: the day as a timeline, overlapping the header like his cards do */}
        <section
          aria-labelledby="day-plan"
          className="relative mx-4 -mt-[44px] rounded-sheet bg-white px-3 pb-3 pt-3 shadow-floating"
        >
          <div className="flex items-center justify-between px-1">
            <h2 id="day-plan" className="text-micro font-bold tracking-caps text-maroon">
              YOUR SATURDAY · SAT, OCT 12
            </h2>
            <span className="flex items-center gap-1.5 text-meta font-semibold text-ink-2">
              <LiveDot />4 happening now
            </span>
          </div>

          <ol className="relative mt-1.5">
            <span aria-hidden className="absolute bottom-[84px] left-[45px] top-5 w-[2px] rounded-full bg-hairline" />
            {STOPS.map((s) => (
              <li key={s.title}>
                <Link to="/events" className="flex items-center gap-2.5 rounded-thumb py-1.5 active:bg-press">
                  <span
                    className={`w-[34px] shrink-0 text-right text-meta font-bold tabular ${s.state === 'live' ? 'text-live-ink' : 'text-ink-2'}`}
                  >
                    {s.time}
                  </span>
                  <span
                    className={`relative z-10 size-[10px] shrink-0 rounded-full ring-4 ${RAIL_DOT[s.state ?? 'none']}`}
                  />
                  <img src={s.img} alt="" className="size-[42px] shrink-0 rounded-well object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-body font-semibold tracking-snug">{s.title}</span>
                    <span className="flex items-center gap-1 truncate text-meta text-ink-3">
                      <span className={`size-[6px] shrink-0 rounded-full ${NODE_META[s.node].dot}`} />
                      <span className="truncate">
                        {s.place} · {s.meta}
                      </span>
                    </span>
                  </span>
                  {s.state === 'live' ? (
                    <Badge tone="live" size="sm" />
                  ) : s.state === 'soon' ? (
                    <Badge tone="soon" size="sm">
                      {s.status}
                    </Badge>
                  ) : null}
                </Link>
              </li>
            ))}

            {/* The peak: kickoff, the one gold action on the screen */}
            <li className="mt-1">
              <GameStrip
                lead={
                  <>
                    <span className="w-[34px] shrink-0 text-right text-meta font-bold tabular text-gold">6:00</span>
                    <span className="relative z-10 size-[10px] shrink-0 rounded-full bg-gold ring-4 ring-gold/30" />
                  </>
                }
                meta="Kyle Field"
                trailing={
                  <Button as="span" size="sm" className="shrink-0">
                    Game Mode
                  </Button>
                }
              />
            </li>
          </ol>
        </section>

        {/* His launcher grid, unchanged */}
        <section aria-label="Services" className="mx-4 mt-3 rounded-sheet bg-white px-1.5 pb-1.5 pt-1.5 shadow-raised">
          <div className="grid grid-cols-4 gap-y-1">
            {TILES.map((t) => (
              <Tile key={t.label} {...t} />
            ))}
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
