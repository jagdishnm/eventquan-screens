import { ArrowDownRight, ArrowUpRight, Check, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Faces } from '../../../components/Avatar'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Chip } from '../../../components/Chip'
import { Screen, ScrollBody } from '../../../components/Device'
import { Eyebrow } from '../../../components/Eyebrow'
import { MatchupThumb } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton } from '../../../components/ui'
import { NODE_META, type Node } from '../../../data/events'
import { HeatBar, Odometer, ScoreboardHeader } from './ScoreboardHeader'

/** Check-ins to today's events, every 15 minutes since 7:00 AM. */
const CHECKINS = [6, 7, 9, 10, 12, 15, 18, 22, 27, 33, 40, 48, 57, 68, 80, 92, 100]

type Ev = {
  id: string
  title: string
  when: string
  place: string
  node: Node
  img?: string
  matchup?: boolean
  /** Going or here, whichever is live. */
  count: number
  verb: 'here' | 'going'
  capacity: number
  /** Change in the last 15 minutes. */
  delta: number
  friends: number
  live?: boolean
  to?: string
}

const EVENTS: Ev[] = [
  {
    id: 'tailgate',
    title: 'Tailgate Zone — Lot C',
    when: 'Opens 10:00 AM',
    place: 'Lot C · Kyle Field',
    node: 'tamu',
    img: '/img/kyle-field-stands.jpg',
    count: 8400,
    verb: 'going',
    capacity: 10000,
    delta: 310,
    friends: 11,
    to: '/places/kyle-field',
  },
  {
    id: 'lsu',
    title: 'Texas A&M vs LSU',
    when: '6:00 PM',
    place: 'Kyle Field',
    node: 'tamu',
    matchup: true,
    count: 98240,
    verb: 'going',
    capacity: 102733,
    delta: 240,
    friends: 23,
    to: '/gameday',
  },
  {
    id: 'market',
    title: 'Farmers Market',
    when: 'Till 12:00 PM',
    place: 'Wolf Pen Creek',
    node: 'cstat',
    img: '/img/farmers-market.jpg',
    count: 1140,
    verb: 'here',
    capacity: 1500,
    delta: 86,
    friends: 2,
    live: true,
  },
  {
    id: 'corps',
    title: 'Corps March-In',
    when: '3:45 PM',
    place: 'Quad → Kyle Field',
    node: 'tamu',
    img: '/img/aggie-band.jpg',
    count: 12000,
    verb: 'going',
    capacity: 20000,
    delta: 140,
    friends: 6,
  },
  {
    id: 'msc',
    title: 'MSC Open House',
    when: '11:00 AM',
    place: 'Memorial Student Center',
    node: 'tamu',
    img: '/img/msc.jpg',
    count: 640,
    verb: 'going',
    capacity: 1200,
    delta: 54,
    friends: 4,
  },
  {
    id: 'brunch',
    title: '12th Man Brunch',
    when: 'Till 11:00 AM',
    place: 'Hall of Champions',
    node: 'tamu',
    img: '/img/twelfth-man.jpg',
    count: 420,
    verb: 'here',
    capacity: 450,
    delta: 12,
    friends: 3,
    live: true,
  },
  {
    id: 'bryan',
    title: 'Downtown Bryan Market',
    when: 'Till 1:00 PM',
    place: 'Main St, Bryan',
    node: 'bryan',
    count: 310,
    verb: 'here',
    capacity: 800,
    delta: -8,
    friends: 1,
    live: true,
  },
]

const SORTS = {
  'Filling up': { by: (e: Ev) => e.delta / Math.max(1, e.capacity - e.count + 400), caption: 'Fastest-filling first' },
  'Most going': { by: (e: Ev) => e.count, caption: 'Biggest crowd first' },
  'Friends going': { by: (e: Ev) => e.friends, caption: 'Most of your friends first' },
} as const
type Sort = keyof typeof SORTS

const BAR: Record<Node, string> = { tamu: 'bg-maroon', cstat: 'bg-cstat', bryan: 'bg-bryan' }
const short = (n: number) =>
  n >= 100000 ? `${Math.round(n / 1000)}K` : n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}K` : `${n}`

function Thumb({ e }: { e: Ev }) {
  if (e.matchup) return <MatchupThumb size={64} />
  if (e.img) return <img src={e.img} alt="" className="size-[64px] shrink-0 rounded-thumb object-cover" />
  const m = NODE_META[e.node]
  return (
    <span
      className={`grid size-[64px] shrink-0 place-items-center rounded-thumb text-center font-display text-card font-extrabold uppercase italic leading-[0.95] ${m.bg} ${m.text}`}
    >
      Main
      <br />
      St
    </span>
  )
}

/** One event: thumb, title, when · where, the crowd and its trend, and how full it is. */
function EventLine({ e }: { e: Ev }) {
  const pct = Math.round((e.count / e.capacity) * 100)
  const full = pct >= 100
  const up = e.delta >= 0
  const m = NODE_META[e.node]
  return (
    <li className="border-b border-hairline last:border-b-0">
      <Link to={e.to ?? '/events'} className="flex gap-3 px-3 py-3 active:bg-press">
        <Thumb e={e} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            {e.live ? <Badge tone="live" size="sm" /> : null}
            <span className="truncate text-meta font-semibold tabular text-ink-2">{e.when}</span>
          </span>
          <span className="mt-0.5 block truncate text-body font-semibold tracking-snug">{e.title}</span>
          <span className="mt-0.5 flex items-center gap-1 text-meta text-ink-3">
            <span className={`size-[6px] shrink-0 rounded-full ${m.dot}`} />
            <span className="truncate">{e.place}</span>
            <span aria-hidden className="ml-1 flex shrink-0 items-center gap-1 font-semibold text-ink-2">
              <Faces n={Math.min(2, e.friends)} size={16} />+{e.friends}
            </span>
          </span>
          <span className="mt-2 flex items-center gap-2">
            <span className="min-w-0 flex-1">
              <HeatBar pct={pct} tone={BAR[e.node]} />
            </span>
            <span
              className={`w-[58px] text-right text-meta font-semibold tabular ${full ? 'text-live-ink' : 'text-ink-2'}`}
            >
              {full ? 'Sold out' : `${pct}% full`}
            </span>
          </span>
        </span>
        <span className="flex w-[64px] shrink-0 flex-col items-end">
          <span className="font-display text-display-sm font-bold leading-none tabular">{short(e.count)}</span>
          <span className="mt-0.5 text-meta text-ink-3">{e.verb}</span>
          <span
            className={`mt-0.5 flex items-center gap-0.5 text-meta font-semibold tabular ${up ? 'text-ok' : 'text-ink-3'}`}
          >
            {up ? (
              <ArrowUpRight aria-hidden size={13} strokeWidth={2.6} />
            ) : (
              <ArrowDownRight aria-hidden size={13} strokeWidth={2.6} />
            )}
            {up ? '+' : '−'}
            {Math.abs(e.delta)}
          </span>
        </span>
        <span className="sr-only">
          {`, ${e.count.toLocaleString('en-US')} ${e.verb}, ${full ? 'sold out' : `${pct}% full`}, ${up ? 'up' : 'down'} ${Math.abs(e.delta)} in 15 minutes, ${e.friends} ${e.friends === 1 ? 'friend' : 'friends'}`}
        </span>
      </Link>
    </li>
  )
}

/**
 * 3 · EventFinder, 9:43 AM. The scoreboard counts what's on today; the list is ordered by momentum,
 * with each event's crowd, which way it's moving, how full it is and how many friends are in it.
 * The fastest-filling event leads, with the screen's one gold action: be the next one in.
 */
export function LiveFinder() {
  const [sort, setSort] = useState<Sort>('Filling up')
  const [joined, setJoined] = useState(false)
  const list = [...EVENTS].sort((a, b) => SORTS[sort].by(b) - SORTS[sort].by(a))
  const [lead, ...rest] = list

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <ScoreboardHeader
          count={84}
          tick={false}
          unit={['events', 'on today']}
          aside="31 live now"
          kicker="SAT 9:43 AM · ALL OF B–CS"
          left={<span className="text-emphasis font-semibold tracking-snug">Events</span>}
          right={
            <>
              <IconButton label="Search events">
                <Search size={18} />
              </IconButton>
              <IconButton label="Filters">
                <SlidersHorizontal size={17} />
              </IconButton>
            </>
          }
          pulse={CHECKINS}
          trend="4,820 checked in since 7 AM"
        />

        <div role="group" aria-label="Sort events" className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4 py-1.5">
          {(Object.keys(SORTS) as Sort[]).map((s) => (
            <Chip key={s} selected={sort === s} onClick={() => setSort(s)}>
              {s}
            </Chip>
          ))}
        </div>

        {/* The lead: the top event for this sort, with the one gold action */}
        <section aria-labelledby="lead-title" className="mx-4 mt-2 rounded-card bg-white p-3.5 shadow-floating">
          <div className="flex items-center justify-between">
            <Eyebrow tone="maroon">#1 · {SORTS[sort].caption}</Eyebrow>
            <span className="text-meta font-semibold text-ok">+{lead.delta} in 15 min</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Thumb e={lead} />
            <div className="min-w-0 flex-1">
              <h2 id="lead-title" className="truncate text-balance text-card font-semibold tracking-snug">
                {lead.title}
              </h2>
              <p className="truncate text-small text-ink-2">
                {lead.when} · {lead.place}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-meta text-ink-3">
                <Faces n={3} size={18} />
                <span className="truncate">
                  <b className="font-semibold text-ink-2">{lead.friends} friends</b> in ·{' '}
                  {short(lead.capacity - lead.count)} spots left
                </span>
              </p>
            </div>
          </div>
          {/* The action says what it does; the crowd it joins sits beside it and ticks when you do */}
          <div className="mt-3 flex items-center gap-3">
            <Button aria-pressed={joined} onClick={() => setJoined((j) => !j)} className="min-w-0 flex-1">
              {joined ? (
                <>
                  <Check size={17} strokeWidth={2.8} /> You&apos;re going · Undo
                </>
              ) : (
                "I'm going"
              )}
            </Button>
            <span className="w-[76px] shrink-0 text-right" aria-live="polite">
              <Odometer
                value={lead.count + (joined ? 1 : 0)}
                className="justify-end font-display text-display-sm font-bold tracking-headline"
              />
              <span className="block text-meta text-ink-3">{lead.verb}</span>
              <span className="sr-only">{`${(lead.count + (joined ? 1 : 0)).toLocaleString('en-US')} ${lead.verb}`}</span>
            </span>
          </div>
        </section>

        <section aria-labelledby="list-title" className="mt-4">
          <h2 id="list-title" className="mb-2 flex items-baseline justify-between px-4">
            <span className="text-title font-bold tracking-title">Up next</span>
            <span className="text-small font-normal text-ink-3">{rest.length} of 84</span>
          </h2>
          <ol className="mx-4 overflow-hidden rounded-card bg-white shadow-raised">
            {rest.map((e) => (
              <EventLine key={e.id} e={e} />
            ))}
          </ol>
        </section>
      </ScrollBody>
      <TabBar active="events" />
    </Screen>
  )
}
