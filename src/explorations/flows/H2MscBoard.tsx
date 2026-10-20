import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { Screen, ScrollBody } from '../../components/Device'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { NODE_META, type Node } from '../../data/events'
import { Kicker, Masthead } from '../concepts/print/PrintKit'

type Style = 'bowling' | 'birthday' | 'pickup' | 'study'
type Flyer = {
  id: string
  style: Style
  title: string
  when: string
  where: string
  node: Node
  tabs: number
  taken: number
  host: string
  tonight?: boolean
  friends?: boolean
  to: string
}

/** Quick Events pinned within a mile of the MSC this week. Each prints in its own style. */
const FLYERS: Flyer[] = [
  {
    id: 'bowling',
    style: 'bowling',
    title: 'Post-game bowling',
    when: 'Tonight · 9:30 PM',
    where: 'Grand Station',
    node: 'cstat',
    tabs: 7,
    taken: 3,
    host: 'Yours',
    tonight: true,
    friends: true,
    to: '/explore/flow/H4',
  },
  {
    id: 'maya',
    style: 'birthday',
    title: 'Maya’s 21st',
    when: 'Fri · 8:00 PM',
    where: 'Northgate',
    node: 'cstat',
    tabs: 8,
    taken: 4,
    host: 'Maya',
    friends: true,
    to: '/explore/flow/H3',
  },
  {
    id: 'volley',
    style: 'pickup',
    title: 'Pickup volleyball',
    when: 'Sun · 4:00 PM',
    where: 'the Rec',
    node: 'tamu',
    tabs: 12,
    taken: 9,
    host: 'Kendall',
    friends: true,
    to: '/explore/quick-event-flyer',
  },
  {
    id: 'engr',
    style: 'study',
    title: 'ENGR 102 study group',
    when: 'Tue · 7:00 PM',
    where: 'Evans Library',
    node: 'tamu',
    tabs: 6,
    taken: 2,
    host: 'Priya',
    to: '/explore/quick-event-flyer',
  },
]

const FILTERS = [
  { id: 'tonight', label: 'Tonight' },
  { id: 'week', label: 'This week' },
  { id: 'friends', label: 'Friends' },
] as const
type Filter = (typeof FILTERS)[number]['id']


/** Paper, ink and fastener per flyer style, from the A&M skin, print and node palettes only. */
const LOOK: Record<
  Style,
  { paper: string; title: string; when: string; meta: string; tab: string; tilt: string; pin: 'tape' | 'pin' }
> = {
  bowling: {
    paper: 'bg-white',
    title: 'font-poster text-display-sm font-black uppercase leading-[0.88] text-maroon',
    when: 'text-ink-warm',
    meta: 'text-ink-warm-2',
    tab: 'bg-white',
    tilt: '-rotate-[2deg]',
    pin: 'tape',
  },
  birthday: {
    paper: 'bg-gold',
    title: 'font-slab text-title font-bold leading-[1.1] text-maroon',
    when: 'text-maroon',
    meta: 'text-maroon',
    tab: 'bg-gold',
    tilt: 'rotate-[1.5deg]',
    pin: 'tape',
  },
  pickup: {
    paper: 'bg-cstat',
    title: 'font-poster text-display-sm font-black uppercase leading-[0.88] text-white',
    when: 'text-white',
    meta: 'text-white',
    tab: 'bg-cstat',
    tilt: 'rotate-[1deg]',
    pin: 'pin',
  },
  study: {
    paper:
      'bg-white bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_17px,var(--color-paper-2)_17px,var(--color-paper-2)_18px)]',
    title: 'font-slab text-card font-bold leading-[1.15] text-ink-warm',
    when: 'text-ink-warm',
    meta: 'text-ink-warm-2',
    tab: 'bg-white',
    tilt: '-rotate-[1.5deg]',
    pin: 'pin',
  },
}

function MiniFlyer({ f }: { f: Flyer }) {
  const look = LOOK[f.style]
  const left = f.tabs - f.taken
  return (
    <li>
      <Link
        to={f.to}
        className="press block rounded-tag"
        aria-label={`${f.title}, ${f.when}, ${f.where}. ${left} of ${f.tabs} tabs left.`}
      >
        <div className="relative pt-2">
          {look.pin === 'tape' ? (
            <span
              aria-hidden
              className="absolute left-1/2 top-0 z-10 h-[16px] w-[56px] -translate-x-1/2 rotate-[3deg] bg-paper/70 ring-1 ring-ink-warm/10"
            />
          ) : (
            <span
              aria-hidden
              className="absolute left-1/2 top-0.5 z-10 size-[12px] -translate-x-1/2 rounded-full bg-maroon shadow-floating ring-2 ring-maroon-line"
            />
          )}
          <article className={`${look.tilt} ${look.paper} shadow-floating`}>
            <div className="px-3 pb-2.5 pt-4">
              <h3 className={`text-balance ${look.title}`}>{f.title}</h3>
              <p className={`mt-1.5 font-slab text-control font-bold tabular ${look.when}`}>{f.when}</p>
              <p className={`mt-0.5 flex items-center gap-1 font-serif text-small ${look.meta}`}>
                <span
                  className={`size-[6px] shrink-0 rounded-full ${f.style === 'pickup' ? 'bg-white' : NODE_META[f.node].dot}`}
                />
                {f.where}
              </p>
            </div>
            {/* Tear-off tabs: taken ones are gone */}
            <ul aria-hidden className="flex h-[28px] border-t border-dashed border-ink-warm/20">
              {Array.from({ length: f.tabs }).map((_, i) => (
                <li
                  key={i}
                  className={`flex-1 border-l border-dashed border-ink-warm/20 first:border-l-0 ${
                    i < f.taken ? 'bg-paper-2' : look.tab
                  }`}
                />
              ))}
            </ul>
          </article>
        </div>
        <p className="mt-2.5 flex items-baseline justify-between gap-2 px-0.5">
          <Kicker className="text-ink-warm">
            {left} of {f.tabs} left
          </Kicker>
          <span
            className={`font-serif text-small italic ${f.host === 'Yours' ? 'font-semibold text-maroon' : 'text-ink-warm-2'}`}
          >
            {f.host}
          </span>
        </p>
      </Link>
    </li>
  )
}

/**
 * H2 · The MSC board.
 * Where Quick Events live once they're pinned: a corkboard of flyers near you, each printed in
 * its own style, with the tabs left on each telling you how many spots remain. Printed as a
 * page of the Aggieland edition: masthead, ring ear, and the board on warm paper.
 */
export function H2MscBoard() {
  const [filter, setFilter] = useState<Filter>('week')
  const shown = FLYERS.filter((f) => (filter === 'tonight' ? f.tonight : filter === 'friends' ? f.friends : true))
  const cols = [shown.filter((_, i) => i % 2 === 0), shown.filter((_, i) => i % 2 === 1)]
  const tabsLeft = shown.reduce((n, f) => n + f.tabs - f.taken, 0)

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="Bulletin · College Station"
          dateline={
            <>
              <Kicker className="text-paper/80">
                {shown.length} {shown.length === 1 ? 'flyer' : 'flyers'} up
              </Kicker>
              <Kicker className="text-gold">{tabsLeft} tabs left to take</Kicker>
            </>
          }
        >
          {/* Set like the front page's nameplate: an italic "The" over the poster line */}
          <h1 className="text-center">
            <span className="block font-serif text-small italic text-paper/80">The</span>
            <span className="-mt-1 block font-poster text-display-xl font-black uppercase leading-[0.9] tracking-headline">
              MSC Board
            </span>
          </h1>
        </Masthead>

        <section aria-labelledby="board-filters" className="relative px-4 pt-3">
          <h2 id="board-filters" className="sr-only">
            Flyers
          </h2>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
            {FILTERS.map((x) => (
              <Chip key={x.id} selected={filter === x.id} onClick={() => setFilter(x.id)}>
                {x.label}
              </Chip>
            ))}
          </div>
          <p className="mt-1 font-serif text-small italic text-ink-warm-2">
            Tap a flyer to take a tab. It comes down when the tabs run out.
          </p>
          <div className="paper-grain mt-2 mb-16 overflow-hidden rounded-tag bg-paper-2 p-3 pb-4 ring-1 ring-ink-warm/10">
            <div className="relative grid grid-cols-2 items-start gap-3">
              {cols.map((col, i) => (
                <ul key={i} className={`flex flex-col gap-4 ${i === 1 ? 'pt-6' : ''}`}>
                  {col.map((f) => (
                    <MiniFlyer key={f.id} f={f} />
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>
      </ScrollBody>

      <Button size="md" className="absolute bottom-[100px] right-4 z-20 shadow-floating">
        <Plus size={18} strokeWidth={2.4} />
        Make a flyer
      </Button>
      <TabBar active="events" />
    </Screen>
  )
}
