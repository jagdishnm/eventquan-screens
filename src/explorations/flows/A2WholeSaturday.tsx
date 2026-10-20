import { Check, ChevronLeft, CircleDot, Plus, Search, Share, Store, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { Screen, ScrollBody } from '../../components/Device'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'
import { NODE_META, type Node } from '../../data/events'
import { BigTime, RailNow, RailPart, RailRow, UndoToast } from '../concepts/day/Rail'
import { clock, split } from '../concepts/day/time'
import { GameStrip } from '../GameStrip'

type Tag = 'athletics' | 'traditions' | 'food'
type Slot = {
  id: string
  /** Start on a 24h clock. */
  h: number
  title: string
  place: string
  meta: string
  node: Node
  img?: string
  /** Cover tile for events without a photo (a friend's Quick Event, a Bryan street party). */
  cover?: { cls: string; Icon: LucideIcon }
  state?: 'live' | 'soon'
  /** Leads the meta line in soon-ink: "Opens in 17 min". */
  note?: string
  plan?: boolean
  friends?: boolean
  tags?: Tag[]
  to?: string
}

/** Saturday, 9:43 AM: the tailgate opens in 17 minutes. */
const NOW = 9 + 43 / 60
const GAME_H = 18

const SLOTS: Slot[] = [
  {
    id: 'market',
    h: 8,
    title: 'Farmers Market',
    place: 'Wolf Pen Creek',
    meta: '1.1K here · Maya & Alex',
    node: 'cstat',
    img: '/img/farmers-market.jpg',
    state: 'live',
    plan: true,
    friends: true,
    tags: ['food'],
  },
  {
    id: 'brunch',
    h: 9,
    title: '12th Man Brunch',
    place: 'Hall of Champions',
    meta: '420 here',
    node: 'tamu',
    img: '/img/twelfth-man.jpg',
    state: 'live',
    tags: ['food', 'traditions'],
  },
  {
    id: 'tailgate',
    h: 10,
    note: 'Opens in 17 min',
    title: 'Tailgate Zone — Lot C',
    place: 'Kyle Field',
    meta: '11 friends',
    node: 'tamu',
    img: '/img/kyle-field-stands.jpg',
    state: 'soon',
    plan: true,
    friends: true,
    tags: ['athletics'],
    to: '/explore/flow/A3',
  },
  {
    id: 'msc',
    h: 11,
    title: 'MSC Open House',
    place: 'MSC',
    meta: '640 going · 4 friends',
    node: 'tamu',
    img: '/img/msc.jpg',
    friends: true,
  },
  {
    id: 'main',
    h: 12.5,
    title: 'Maroon Out on Main',
    place: 'Downtown Bryan',
    meta: '1.2K going',
    node: 'bryan',
    cover: { cls: 'bg-bryan-soft text-bryan', Icon: Store },
    tags: ['food'],
  },
  {
    id: 'corps',
    h: 15.75,
    title: 'Corps March-In',
    place: 'Quad → Kyle Field',
    meta: '12K watching · 6 friends',
    node: 'tamu',
    img: '/img/aggie-band.jpg',
    friends: true,
    tags: ['traditions'],
  },
  {
    id: 'gates',
    h: 16,
    title: 'Gates open',
    place: 'Kyle Field · Gate 2',
    meta: 'Clear bag policy',
    node: 'tamu',
    img: '/img/kyle-field-exterior.jpg',
    tags: ['athletics'],
  },
  {
    id: 'bowling',
    h: 21.5,
    title: 'Post-game bowling',
    place: 'Grand Station',
    meta: "Maya's Quick Event · 8 going",
    node: 'cstat',
    cover: { cls: 'bg-maroon text-gold', Icon: CircleDot },
    friends: true,
  },
]

/** Parts of the day, each opening at an hour on the rail. */
const PARTS = [
  { id: 'sat-morning', title: 'MORNING', hours: '8 AM–noon', from: 0, to: 12 },
  { id: 'sat-afternoon', title: 'AFTERNOON', hours: 'Noon–5 PM', from: 12, to: 17 },
  { id: 'sat-evening', title: 'GAME NIGHT', hours: '5 PM–late', from: 17, to: 30 },
]

const CHIPS = ['All', 'On my plan', 'Friends going', 'Athletics', 'Traditions', 'Food'] as const
type ChipKey = (typeof CHIPS)[number]

function SlotRow({ s, on, onToggle }: { s: Slot; on: boolean; onToggle: () => void }) {
  const Cover = s.cover?.Icon
  return (
    <div className="flex h-[60px] min-w-0 flex-1 items-center rounded-thumb bg-white shadow-raised">
      <Link
        to={s.to ?? '/events'}
        className="flex h-full min-w-0 flex-1 items-center gap-2.5 rounded-l-thumb pl-1.5 transition-colors duration-(--duration-quick) ease-(--ease-out-expo) active:bg-press"
      >
        {s.img ? (
          <img src={s.img} alt="" className="size-[44px] shrink-0 rounded-well object-cover" />
        ) : Cover ? (
          <span className={`grid size-[44px] shrink-0 place-items-center rounded-well ${s.cover?.cls}`}>
            <Cover size={19} />
          </span>
        ) : null}
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-control font-semibold tracking-snug">{s.title}</span>
          <span className="mt-0.5 flex items-center gap-1 text-meta text-ink-3">
            <span
              aria-label={NODE_META[s.node].label}
              className={`size-[7px] shrink-0 rounded-full ${NODE_META[s.node].dot}`}
            />
            <span className="truncate">
              {s.state === 'live' ? <span className="font-semibold text-live-ink">Live · </span> : null}
              {s.note ? <span className="font-semibold text-soon-ink">{s.note} · </span> : null}
              {s.place}
            </span>
          </span>
          <span className="block truncate text-meta text-ink-3">{s.meta}</span>
        </span>
      </Link>
      {/* On my Saturday: a toggle beside the link, never inside it */}
      <button
        type="button"
        aria-pressed={on}
        aria-label={`${s.title}, ${clock(s.h)}, on my Saturday`}
        onClick={onToggle}
        className="press grid size-[44px] shrink-0 place-items-center"
      >
        <span
          className={`grid size-[28px] place-items-center rounded-full transition-colors duration-(--duration-quick) ease-(--ease-out-expo) ${
            on ? 'bg-maroon text-white' : 'bg-white text-ink-2 ring-1 ring-hairline-strong'
          }`}
        >
          {on ? <Check size={15} strokeWidth={2.8} /> : <Plus size={16} strokeWidth={2.4} />}
        </span>
      </button>
    </div>
  )
}

/**
 * A2 · Your whole Saturday (concept 1 · The Day, stage 3 · EventFinder). Every event today hung on
 * the same gold rail as the rest of the Day: hours in the display face, NOW between the morning
 * that's started and the rest, the node as a coloured dot on each sheet. The hero is the count;
 * the gold action commits the picks to your Saturday, with an undo.
 */
export function A2WholeSaturday() {
  const [chip, setChip] = useState<ChipKey>('All')
  const [plan, setPlan] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SLOTS.map((s) => [s.id, !!s.plan])),
  )
  const [saved, setSaved] = useState(false)
  const toggle = (id: string) => {
    setPlan((p) => ({ ...p, [id]: !p[id] }))
    setSaved(false)
  }
  /** Picks, plus the game, which is always on the plan. */
  const picked = Object.values(plan).filter(Boolean).length + 1
  const total = SLOTS.length + 1
  const liveNow = SLOTS.filter((s) => s.state === 'live').length

  const shows = (s: Slot) =>
    chip === 'All' ||
    (chip === 'On my plan' && plan[s.id]) ||
    (chip === 'Friends going' && s.friends) ||
    (chip === 'Athletics' && s.tags?.includes('athletics')) ||
    (chip === 'Traditions' && s.tags?.includes('traditions')) ||
    (chip === 'Food' && s.tags?.includes('food'))
  const gameShows = chip === 'All' || chip === 'On my plan' || chip === 'Athletics' || chip === 'Friends going'

  // One ordered list down the rail: parts, sheets, NOW and the game, in time order
  type Item =
    | { kind: 'part'; part: (typeof PARTS)[number]; h: number }
    | { kind: 'slot'; s: Slot; h: number }
    | { kind: 'game'; h: number }
    | { kind: 'now'; h: number }
  const items: Item[] = [
    ...SLOTS.filter(shows).map((s) => ({ kind: 'slot' as const, s, h: s.h })),
    ...(gameShows ? [{ kind: 'game' as const, h: GAME_H }] : []),
  ]
  const withParts: Item[] = []
  for (const part of PARTS) {
    const inPart = items.filter((i) => i.h >= part.from && i.h < part.to).sort((a, b) => a.h - b.h)
    if (!inPart.length) continue
    withParts.push({ kind: 'part', part, h: part.from })
    withParts.push(...inPart)
  }
  const nowAt = withParts.findIndex((i) => i.kind !== 'part' && i.h > NOW)
  if (nowAt >= 0) withParts.splice(nowAt, 0, { kind: 'now', h: NOW })
  const firstRow = withParts.findIndex((i) => i.kind === 'slot' || i.kind === 'game')
  const lastRow = withParts.length - 1

  return (
    <Screen>
      <StatusBar />
      <ScrollBody className="pb-[184px]">
        <header className="bg-maroon px-4 pb-3.5 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center gap-1">
            <IconButton label="Back to Home" to="/explore/home-day-plan">
              <ChevronLeft size={20} />
            </IconButton>
            <span className="flex-1" />
            <IconButton label="Search today's events">
              <Search size={18} />
            </IconButton>
            <IconButton label="Share my Saturday">
              <Share size={17} />
            </IconButton>
          </div>

          <h1 className="sr-only">Your Saturday, every event today</h1>
          <div className="mt-2 flex items-end justify-between gap-3">
            <BigTime
              kicker="YOUR SATURDAY · OCT 12"
              value={String(total)}
              unit="EVENTS"
              label={`${total} events today, ${picked} on your plan`}
              caption={
                <>
                  {liveNow} on now · tailgate in 17 min · <span className="text-white">{clock(NOW)}</span>
                </>
              }
            />
            {/* The second number: what's yours, in the same face, one step down */}
            <p className="mb-[30px] shrink-0 text-right">
              <span className="block font-display text-display-lg font-bold leading-none text-gold tabular">
                {picked}
              </span>
              <span className="mt-1 block text-micro font-bold tracking-caps text-white/80">ON YOUR PLAN</span>
            </p>
          </div>

          <div className="no-scrollbar -mx-4 mt-3.5 flex gap-2 overflow-x-auto px-4">
            {CHIPS.map((c) => (
              <Chip key={c} surface="onMaroon" selected={chip === c} onClick={() => setChip(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </header>

        <ol aria-label="Today's events" className="mt-2">
          {withParts.map((item, i) => {
            const past = nowAt < 0 || i < nowAt
            const edge = i === firstRow ? 'first' : i === lastRow ? 'last' : undefined
            if (item.kind === 'now') return <RailNow key="now" h={item.h} />
            if (item.kind === 'part')
              return i < firstRow ? (
                <li key={item.part.id} className="flex h-[30px] items-end px-4 pb-1">
                  <h2
                    id={item.part.id}
                    className="flex flex-1 items-baseline justify-between text-micro font-bold tracking-caps text-maroon"
                  >
                    {item.part.title}
                    <span className="font-semibold tracking-normal text-ink-3">{item.part.hours}</span>
                  </h2>
                </li>
              ) : (
                <RailPart key={item.part.id} {...item.part} past={past} />
              )
            if (item.kind === 'game')
              return (
                <RailRow key="game" mark={{ h: GAME_H }} pierce="gold" past={past} edge={edge}>
                  <GameStrip
                    className="min-w-0 flex-1"
                    meta={`Kyle Field · kickoff ${split(GAME_H).hm} PM`}
                    trailing={
                      <Button as="span" variant="tonal" size="sm" className="shrink-0">
                        Game Mode
                      </Button>
                    }
                  />
                </RailRow>
              )
            const s = item.s
            return (
              <RailRow
                key={s.id}
                mark={{ h: s.h }}
                pierce={s.state === 'live' ? 'live' : plan[s.id] ? 'gold' : 'open'}
                past={past}
                edge={edge}
              >
                <SlotRow s={s} on={!!plan[s.id]} onToggle={() => toggle(s.id)} />
              </RailRow>
            )
          })}
        </ol>
      </ScrollBody>

      {/* The one gold action: commit the picks to your Saturday, then confirm with an undo */}
      <div className="absolute inset-x-0 bottom-[84px] z-20 bg-linear-to-t from-canvas from-60% to-canvas/0 px-4 pb-2.5 pt-5">
        {saved ? (
          <UndoToast onUndo={() => setSaved(false)}>
            <b className="font-semibold">{picked} added to your Saturday</b>
          </UndoToast>
        ) : (
          <Button size="lg" className="w-full" onClick={() => setSaved(true)}>
            <span className="tabular">{`Plan my Saturday · ${picked} picked`}</span>
          </Button>
        )}
      </div>
      <TabBar active="events" />
    </Screen>
  )
}
