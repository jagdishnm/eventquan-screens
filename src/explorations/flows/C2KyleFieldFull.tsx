import { Bookmark, ChevronRight, Footprints } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { CrowdPulse, pulsePositions } from '../../components/CrowdPulse'
import { Eyebrow } from '../../components/Eyebrow'
import { AggieMark } from '../../components/Marks'
import { KYLE_FIELD_GAMEDAY } from '../../data/kyleField'
import { GameStrip } from '../GameStrip'
import { PlaceSheet } from '../PlaceSheet'

type Item = { t: string; title: string; meta: string; img: string; badge?: 'live' | 'soon' }

/** Kyle Field's day, grouped by when it happens relative to now (9:41 AM). */
const GROUPS: { label: string; items: Item[] }[] = [
  {
    label: 'Live now',
    items: [
      {
        t: '9:00',
        title: '12th Man Brunch',
        meta: 'Hall of Champions · 420 here',
        img: '/img/twelfth-man.jpg',
        badge: 'live',
      },
    ],
  },
  {
    label: 'Next',
    items: [
      {
        t: '10:00',
        title: 'Tailgate Zone opens',
        meta: 'Lot C · 8.4K going',
        img: '/img/kyle-field-stands.jpg',
        badge: 'soon',
      },
    ],
  },
  {
    label: 'Later',
    items: [
      { t: '3:45', title: 'Corps March-In', meta: 'Quad → Gate 2', img: '/img/aggie-band.jpg' },
      { t: '4:00', title: 'Gates open', meta: 'All gates · clear bag policy', img: '/img/kyle-field-exterior.jpg' },
    ],
  },
]

const FRIENDS: { i: string; name: string; c: 1 | 2 | 3 | 4 | 5 | 6 }[] = [
  { i: 'MR', name: 'Maya', c: 2 },
  { i: 'AL', name: 'Alex', c: 3 },
  { i: 'DS', name: 'Dev', c: 5 },
  { i: 'KT', name: 'Kendall', c: 4 },
]

const SIBLINGS = [
  { name: 'Reed Arena', next: 'Volleyball vs Ole Miss · Wed 7 PM', img: '/img/reed-arena.jpg' },
  { name: 'Olsen Field', next: 'Nothing on this week' },
  { name: 'Davis Diamond', next: 'Nothing on this week' },
]

const POS = pulsePositions(KYLE_FIELD_GAMEDAY)

function Row({ e }: { e: Item }) {
  return (
    <li className="flex items-center gap-3 border-b border-hairline px-3 py-2 last:border-b-0">
      <span className="w-[36px] text-meta font-bold tabular text-ink-2">{e.t}</span>
      <img src={e.img} alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-control font-semibold">{e.title}</span>
        <span className="block truncate text-meta text-ink-3">{e.meta}</span>
      </span>
      {e.badge === 'live' ? (
        <Badge tone="live" size="sm" />
      ) : e.badge === 'soon' ? (
        <Badge tone="soon" size="sm">
          In 17 min
        </Badge>
      ) : null}
    </li>
  )
}

/** The sheet at full height: the venue, its whole day, how busy it gets, who's going, and its siblings. */
function KyleFieldFull() {
  return (
    <>
      <div className="flex items-center gap-3">
        <img src="/img/kyle-field-exterior.jpg" alt="" className="size-[64px] shrink-0 rounded-thumb object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Badge tone="node" node="tamu" />
            <Badge tone="soon" size="md">
              Gates 4:00 PM
            </Badge>
          </div>
          <h2
            id="place-full"
            className="mt-1 font-display text-display-md font-extrabold uppercase italic leading-[0.9] tracking-[-0.01em]"
          >
            Kyle Field
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-small text-ink-2">
            <Footprints size={13} className="text-maroon" /> 12 min walk · Home of the 12th Man
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <Button className="w-full">Directions</Button>
        <Button variant="secondary" aria-label="Save Kyle Field" className="px-4">
          <Bookmark size={17} />
        </Button>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-card font-semibold tracking-snug">Today at Kyle Field</h3>
        <span className="text-meta text-ink-3">Sat, Oct 12 · 5 events</span>
      </div>
      {GROUPS.map((g) => (
        <section key={g.label} aria-label={g.label} className="mt-2">
          <Eyebrow
            tone={g.label === 'Live now' ? 'category' : 'muted'}
            className={g.label === 'Live now' ? 'text-live-ink' : ''}
          >
            {g.label}
          </Eyebrow>
          <ol className="mt-1 overflow-hidden rounded-card bg-white shadow-raised">
            {g.items.map((e) => (
              <Row key={e.title} e={e} />
            ))}
          </ol>
        </section>
      ))}
      <GameStrip className="mt-2" meta="Kickoff 6:00 PM · 125K attending · 23 friends" />

      {/* The venue's day read through its crowd: solid so far, dashed forecast, gold now */}
      <section aria-labelledby="crowd-today" className="mt-4 rounded-card bg-maroon p-3.5 text-white">
        <div className="flex items-end justify-between">
          <div>
            <h3 id="crowd-today" className="text-micro font-bold tracking-caps text-white/75">
              CROWD TODAY
            </h3>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display text-display-sm font-bold leading-none tabular">2,140</span>
              <span className="text-meta text-white/75">here now</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-title font-bold leading-none text-gold tabular">102K</span>
            <span className="text-meta text-white/75">by kickoff</span>
          </div>
        </div>
        <div className="mt-2.5">
          <CrowdPulse day={KYLE_FIELD_GAMEDAY} width={333} height={56} />
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
        </div>
      </section>

      <section aria-labelledby="friends-going" className="mt-4">
        <div className="flex items-baseline justify-between">
          <h3 id="friends-going" className="text-card font-semibold tracking-snug">
            23 friends going
          </h3>
          <span className="text-meta text-ink-3">Maya meets you at Gate 2</span>
        </div>
        <ul className="mt-1.5 flex items-center gap-3 rounded-card bg-white px-3 py-2.5 shadow-raised">
          {FRIENDS.map((f) => (
            <li key={f.name} className="flex flex-col items-center gap-1">
              <Avatar initials={f.i} color={f.c} size={38} />
              <span className="text-meta font-semibold text-ink-2">{f.name}</span>
            </li>
          ))}
          <li className="flex flex-col items-center gap-1">
            <span className="grid size-[38px] place-items-center rounded-full bg-canvas text-control font-bold text-ink-2">
              +19
            </span>
            <span className="text-meta text-ink-3">more</span>
          </li>
        </ul>
      </section>

      {/* Node second: the venue's parent, and the venues beside it */}
      <section aria-labelledby="part-of" className="mt-4">
        <h3 id="part-of" className="sr-only">
          Part of Texas A&amp;M Athletics
        </h3>
        <div className="overflow-hidden rounded-card bg-white shadow-raised">
          <Link to="/explore/flow/C4" className="flex items-center gap-2.5 px-3 py-2.5 active:bg-press">
            <AggieMark size={32} />
            <span className="min-w-0 flex-1">
              <span className="block text-meta text-ink-3">Part of</span>
              <span className="flex items-center gap-1 text-body font-semibold">
                Texas A&amp;M <ChevronRight aria-hidden size={13} className="text-ink-3" /> Athletics
              </span>
            </span>
            <ChevronRight aria-hidden size={16} className="text-ink-3" />
          </Link>
          <ul className="border-t border-hairline">
            {SIBLINGS.map((v) => (
              <li key={v.name} className="border-b border-hairline last:border-b-0">
                <Link to="/explore/flow/C4" className="flex items-center gap-3 px-3 py-2 active:bg-press">
                  {v.img ? (
                    <img src={v.img} alt="" className="size-[36px] shrink-0 rounded-well object-cover" />
                  ) : (
                    <span className="grid size-[36px] shrink-0 place-items-center rounded-well bg-maroon-soft text-micro font-bold text-maroon">
                      {v.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block text-control font-semibold">{v.name}</span>
                    <span className="block truncate text-meta text-ink-3">{v.next}</span>
                  </span>
                  <ChevronRight aria-hidden size={16} className="text-ink-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

/**
 * C2 · Kyle Field sheet, pulled to full height. The map drops to a sliver; the sheet gives everything
 * on here today (live, next, later), the crowd curve, the friends going, and its place under Athletics.
 */
export function C2KyleFieldFull() {
  return (
    <PlaceSheet shift={-170} sheetHeight={724} labelledBy="place-full">
      <KyleFieldFull />
    </PlaceSheet>
  )
}
