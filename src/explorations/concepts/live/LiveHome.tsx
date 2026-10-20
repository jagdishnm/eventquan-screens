import { Bell, Flame, Pin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, Faces } from '../../../components/Avatar'
import { LiveDot } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Screen, ScrollBody } from '../../../components/Device'
import { AggieMark, MatchupThumb } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import type { TileTint } from '../../../components/Tile'
import { IconButton, SectionHeader } from '../../../components/ui'
import { TILES } from '../../../data/homeTiles'
import { NODE_META, type Node } from '../../../data/events'
import { HeatBar, ScoreboardHeader, SplitRow } from './ScoreboardHeader'

/** Aggies checked in across B–CS, every 15 minutes since 6:00 AM. */
const MORNING = [9, 10, 12, 13, 15, 17, 20, 22, 25, 29, 33, 38, 43, 48, 52, 57, 62, 68, 74, 80, 86, 93, 100]

type Spot = {
  title: string
  place: string
  node: Node
  /** Square photo; places without one get a node-coloured tile. */
  img?: string
  here: number
  friends: number
  /** Only the hot one says why. */
  note?: string
  hot?: boolean
  to?: string
}

/** Where everyone is, biggest crowd first. */
const SPOTS: Spot[] = [
  {
    title: 'Farmers Market',
    place: 'Wolf Pen Creek',
    node: 'cstat',
    img: '/img/farmers-market.jpg',
    here: 1140,
    friends: 2,
  },
  {
    title: 'Tailgate Zone — Lot C',
    place: 'Kyle Field',
    node: 'tamu',
    img: '/img/kyle-field-stands.jpg',
    here: 980,
    friends: 11,
    note: 'Filling fast · +310',
    hot: true,
    to: '/places/kyle-field',
  },
  {
    title: '12th Man Brunch',
    place: 'Hall of Champions',
    node: 'tamu',
    img: '/img/twelfth-man.jpg',
    here: 420,
    friends: 3,
  },
  {
    title: 'Downtown Bryan Market',
    place: 'Main St, Bryan',
    node: 'bryan',
    here: 310,
    friends: 1,
  },
  {
    title: 'MSC Open House',
    place: 'Memorial Student Center',
    node: 'tamu',
    img: '/img/msc.jpg',
    here: 260,
    friends: 4,
  },
]

const HEAT: Record<Node, string> = { tamu: 'bg-maroon', cstat: 'bg-cstat', bryan: 'bg-bryan' }

/** Each of the founder's twelve tiles as a scoreboard cell: its live count, a short label, the long one for screen readers. */
const COUNTS: Record<string, { value: string; short: string; unit: string; live?: boolean }> = {
  'Class Schedule': { value: 'Off', short: 'Schedule', unit: 'no class today' },
  'Campus Map': { value: '12.4K', short: 'Map', unit: 'Aggies out', live: true },
  Dining: { value: '340', short: 'Dining', unit: 'at Sbisa', live: true },
  Transit: { value: '212', short: 'Transit', unit: 'riding Route 40', live: true },
  Events: { value: '84', short: 'Events', unit: 'on today' },
  Organizations: { value: '31', short: 'Orgs', unit: 'meeting today' },
  Athletics: { value: '2,310', short: 'Athletics', unit: 'at Kyle Field', live: true },
  Safety: { value: '0', short: 'Safety', unit: 'alerts' },
  'Quick Event': { value: '6', short: 'Quick Event', unit: 'plans near you' },
  Messages: { value: '3', short: 'Messages', unit: 'new' },
  'Aggie ID': { value: '1', short: 'Aggie ID', unit: 'ticket in Wallet' },
  More: { value: '+18', short: 'More', unit: 'services' },
}

const ICON_TINT: Record<TileTint, string> = {
  blue: 'text-tint-blue-ink',
  green: 'text-tint-green-ink',
  amber: 'text-tint-amber-ink',
  indigo: 'text-tint-indigo-ink',
  red: 'text-tint-red-ink',
  purple: 'text-tint-purple-ink',
  teal: 'text-tint-teal-ink',
  sky: 'text-tint-sky-ink',
  maroon: 'text-maroon',
  neutral: 'text-ink-2',
}

const k = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`)

function SpotRow({ s, rank, max }: { s: Spot; rank: number; max: number }) {
  const m = NODE_META[s.node]
  const body = (
    <>
      <span className="w-[16px] shrink-0 text-center font-display text-title font-bold leading-none text-ink-3 tabular">
        {rank}
      </span>
      {s.img ? (
        <img src={s.img} alt="" className="size-[52px] shrink-0 rounded-thumb object-cover" />
      ) : (
        <span
          className={`grid size-[52px] shrink-0 place-items-center rounded-thumb text-center font-display text-control font-extrabold uppercase italic leading-[0.95] ${m.bg} ${m.text}`}
        >
          Main
          <br />
          St
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-body font-semibold tracking-snug">{s.title}</span>
        <span
          className={`mt-0.5 flex items-center gap-1 truncate text-meta ${s.hot ? 'font-semibold text-live-ink' : 'text-ink-3'}`}
        >
          {s.hot ? (
            <Flame aria-hidden size={12} strokeWidth={2.6} />
          ) : (
            <span className={`size-[6px] shrink-0 rounded-full ${m.dot}`} />
          )}
          <span className="truncate">{s.hot ? s.note : s.place}</span>
        </span>
        <span className="mt-1.5 block">
          <HeatBar pct={(s.here / max) * 100} tone={HEAT[s.node]} />
        </span>
      </span>
      <span className="flex w-[64px] shrink-0 flex-col items-end gap-1">
        <span className="font-display text-display-sm font-bold leading-none tabular">{k(s.here)}</span>
        <span className="flex items-center gap-1 text-meta font-semibold text-ink-2">
          <Faces n={Math.min(2, s.friends)} size={16} />+{s.friends}
        </span>
      </span>
      <span className="sr-only">
        {`${s.here.toLocaleString('en-US')} here now, ${s.friends} ${s.friends === 1 ? 'friend' : 'friends'}`}
      </span>
    </>
  )
  const cls = 'flex items-center gap-3 px-3 py-2.5 active:bg-press'
  return (
    <li className="border-b border-hairline last:border-b-0">
      <Link to={s.to ?? '/events'} className={cls}>
        {body}
      </Link>
    </li>
  )
}

/**
 * 2 · University Home, 9:41 AM Saturday. The header is the scoreboard (Aggies out right now, by
 * node), the body ranks where they are, tonight's game is pinned, and the twelve tiles each carry a count.
 */
export function LiveHome() {
  const max = SPOTS[0].here
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <ScoreboardHeader
          count={12418}
          unit={['Aggies', 'out now']}
          kicker="SAT 9:41 AM · BRYAN–COLLEGE STATION"
          left={
            <>
              <AggieMark size={32} />
              <span className="leading-tight">
                <span className="block text-micro font-bold tracking-caps">HOWDY, JORDAN</span>
                <span className="block text-micro text-white/75">72° · Gameday</span>
              </span>
            </>
          }
          right={
            <>
              <span className="relative">
                <IconButton label="Notifications, 2 new">
                  <Bell size={19} />
                </IconButton>
                <span className="pointer-events-none absolute right-[11px] top-[9px] size-[8px] rounded-full bg-gold ring-2 ring-maroon" />
              </span>
              <button type="button" aria-label="Profile" className="press -m-1 grid size-[44px] place-items-center">
                <Avatar initials="JC" size={36} className="ring-2 ring-white/25" />
              </button>
            </>
          }
          pulse={MORNING}
          trend="+2,960 since 8 AM"
        />

        {/* The split by node, demoted from the header to the first row of the body */}
        <div className="mt-3">
          <SplitRow
            label="Aggies out now, by node"
            splits={[
              { label: 'A&M', value: '8,940', n: 8940, dot: 'bg-maroon' },
              { label: 'College Stn', value: '2,610', n: 2610, dot: 'bg-cstat' },
              { label: 'Bryan', value: '868', n: 868, dot: 'bg-bryan' },
            ]}
          />
        </div>

        {/* Tonight's game, pinned above the ranking */}
        <Link
          to="/gameday"
          className="mx-4 mt-2.5 flex items-center gap-3 rounded-card bg-white p-2.5 pr-3.5 shadow-floating active:bg-press"
        >
          <MatchupThumb size={52} />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1 text-micro font-bold tracking-eyebrow text-maroon">
              <Pin aria-hidden size={11} strokeWidth={2.8} className="rotate-45" />
              PINNED · 6:00 PM
            </span>
            <span className="mt-0.5 block font-display text-title font-extrabold uppercase italic leading-none">
              A&amp;M vs LSU
            </span>
            <span className="mt-1 block truncate text-meta text-ink-3">125K in Aggieland tonight</span>
          </span>
          <span className="text-right">
            <span className="block font-display text-display-sm font-bold leading-none tabular text-maroon">
              102,733
            </span>
            <span className="text-meta text-ink-3">at Kyle Field</span>
          </span>
        </Link>

        <section aria-labelledby="where-title" className="mt-5">
          <SectionHeader
            title={<span id="where-title">Where everyone is</span>}
            meta={
              <span className="flex items-center gap-1.5">
                <LiveDot className="!size-[6px]" /> ranked by crowd
              </span>
            }
          />
          <ol className="mx-4 overflow-hidden rounded-card bg-white shadow-raised">
            {SPOTS.map((s, i) => (
              <SpotRow key={s.title} s={s} rank={i + 1} max={max} />
            ))}
          </ol>
          <Link to="/places/kyle-field" className="mx-4 mt-3 block rounded-thumb">
            <Button as="span" className="w-full">
              Join 11 friends at Lot C
            </Button>
          </Link>
        </section>

        <section aria-labelledby="tiles-title" className="mt-5">
          <SectionHeader title={<span id="tiles-title">Your campus, counted</span>} />
          <ul className="mx-4 grid grid-cols-4 gap-1.5">
            {TILES.map((t) => {
              const c = COUNTS[t.label]
              const solid = t.emphasis === 'solid'
              const outline = t.emphasis === 'outline'
              const cls = `press flex h-full min-h-[52px] flex-col justify-center rounded-thumb px-2 py-2 ${
                solid
                  ? 'bg-maroon text-white'
                  : outline
                    ? 'bg-white ring-2 ring-inset ring-gold'
                    : 'bg-white shadow-raised'
              }`
              const body = (
                <>
                  <span className="flex items-center gap-1">
                    <t.Icon
                      aria-hidden
                      size={13}
                      strokeWidth={2.4}
                      className={solid ? 'text-gold' : outline ? 'text-maroon' : ICON_TINT[t.tint ?? 'neutral']}
                    />
                    <span className="font-display text-card font-bold leading-none tabular">{c.value}</span>
                    {c.live ? <LiveDot className="ml-auto !size-[5px]" /> : null}
                  </span>
                  <span
                    className={`mt-1 block truncate text-micro font-semibold leading-none ${solid ? 'text-white/80' : 'text-ink-2'}`}
                  >
                    {c.short}
                  </span>
                  <span className="sr-only">{`, ${t.label}: ${c.value} ${c.unit}`}</span>
                </>
              )
              return (
                <li key={t.label}>
                  {t.to ? (
                    <Link to={t.to} className={cls}>
                      {body}
                    </Link>
                  ) : (
                    <button type="button" className={`${cls} w-full text-left`}>
                      {body}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
