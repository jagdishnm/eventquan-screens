import { BellPlus, Check, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { AggieMark } from '../../components/Marks'
import type { MapPinSpec } from '../CampusMap'
import { GameStrip } from '../GameStrip'
import { PlaceSheet } from '../PlaceSheet'

/** Athletics' five venues, in map coordinates. All children of the A&M node, so all maroon. */
const PINS: MapPinSpec[] = [
  { id: 'kyle', x: 222, y: 398, label: 'Kyle Field', node: 'tamu', live: true },
  { id: 'reed', x: 104, y: 470, label: 'Reed Arena', node: 'tamu' },
  { id: 'ellis', x: 312, y: 505, label: 'Ellis Field', node: 'tamu' },
  { id: 'olsen', x: 74, y: 548, label: 'Olsen Field', node: 'tamu' },
  { id: 'davis', x: 216, y: 562, label: 'Davis Diamond', node: 'tamu' },
]

/** The node's area: a soft maroon wash with a dashed edge around its venues. */
function NodeArea() {
  return (
    <svg aria-hidden width="393" height="1000" viewBox="0 0 393 1000" className="absolute left-0 top-0">
      <path
        d="M30 446 C 60 380, 170 350, 262 372 C 340 392, 372 452, 362 516 C 354 566, 300 590, 226 590 L 40 590 C 14 590, 10 560, 14 520 Z"
        className="fill-maroon/[0.07] stroke-maroon/45"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
    </svg>
  )
}

type Venue = { name: string; line: string; img?: string; initials?: string; live?: boolean }

const VENUES: Venue[] = [
  { name: 'Kyle Field', line: 'A&M vs LSU tonight · 6 PM', img: '/img/kyle-field-exterior.jpg', live: true },
  { name: 'Reed Arena', line: 'Volleyball vs Ole Miss · Wed 7 PM', img: '/img/reed-arena.jpg' },
  { name: 'Ellis Field', line: 'Soccer vs Arkansas · Thu 7 PM', initials: 'EF' },
  { name: 'Olsen Field', line: 'Nothing on this week', initials: 'OF' },
  { name: 'Davis Diamond', line: 'Nothing on this week', initials: 'DD' },
]

function AthleticsNode() {
  const [following, setFollowing] = useState(false)
  return (
    <>
      <div className="flex items-center gap-3">
        <AggieMark size={64} />
        <div className="min-w-0 flex-1">
          <Badge tone="node" node="tamu">
            Node · Texas A&amp;M
          </Badge>
          <h2
            id="node-title"
            className="mt-1 font-display text-display-md font-extrabold uppercase italic leading-[0.9] tracking-[-0.01em]"
          >
            Athletics
          </h2>
          <p className="mt-0.5 text-small text-ink-2">5 venues · 1 live now · 4 events this week</p>
        </div>
      </div>

      {/* The node's colour, stated once: every venue and event under it inherits A&M maroon */}
      <div className="mt-3 flex items-center gap-2.5 rounded-thumb bg-white px-3 py-2 shadow-raised">
        <span aria-hidden className="h-[22px] w-[34px] shrink-0 rounded-tag bg-maroon ring-1 ring-black/10" />
        <span className="min-w-0 flex-1 text-meta leading-tight text-ink-2">
          <span className="block font-semibold text-ink">A&amp;M Maroon</span>
          Inherited from Texas A&amp;M · used by all 5 venues
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
        <Button className="w-full" aria-pressed={following} onClick={() => setFollowing((v) => !v)}>
          {following ? <Check size={17} strokeWidth={2.6} /> : <BellPlus size={17} />}
          Follow Athletics
        </Button>
        <Link to="/explore/events-map" className="rounded-thumb">
          <Button as="span" variant="secondary" className="px-4">
            All events
          </Button>
        </Link>
      </div>

      <h3 className="mt-4 text-card font-semibold tracking-snug">Live across Athletics</h3>
      <ol className="mt-1.5 overflow-hidden rounded-card bg-white shadow-raised">
        <li className="flex items-center gap-3 border-b border-hairline px-3 py-2">
          <img src="/img/twelfth-man.jpg" alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-control font-semibold">12th Man Brunch</span>
            <span className="block text-meta text-ink-3">Hall of Champions · 420 here</span>
          </span>
          <Badge tone="live" size="sm" />
        </li>
        <li className="flex items-center gap-3 px-3 py-2">
          <img src="/img/kyle-field-stands.jpg" alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-control font-semibold">Tailgate Zone — Lot C</span>
            <span className="block text-meta text-ink-3">Kyle Field · 8.4K going</span>
          </span>
          <Badge tone="soon" size="sm">
            In 17 min
          </Badge>
        </li>
      </ol>
      <GameStrip className="mt-2" meta="Tonight 6:00 PM · Kyle Field · 125K attending" />

      <h3 className="mt-4 text-card font-semibold tracking-snug">Venues</h3>
      <ul className="mt-1.5 overflow-hidden rounded-card bg-white shadow-raised">
        {VENUES.map((v) => (
          <li key={v.name} className="border-b border-hairline last:border-b-0">
            <Link
              to={v.name === 'Kyle Field' ? '/explore/flow/C2' : '/explore/events-map'}
              className="flex items-center gap-3 px-3 py-2 active:bg-press"
            >
              {v.img ? (
                <img src={v.img} alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
              ) : (
                <span className="grid size-[40px] shrink-0 place-items-center rounded-well bg-maroon-soft text-micro font-bold text-maroon">
                  {v.initials}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-control font-semibold">{v.name}</span>
                <span className="block truncate text-meta text-ink-3">{v.line}</span>
              </span>
              {v.live ? <Badge tone="live" size="sm" /> : null}
              <ChevronRight aria-hidden size={16} className="text-ink-3" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

/**
 * C4 · The parent node. One level up from Kyle Field: Texas A&M › Athletics, its five venues
 * drawn inside one maroon area on the map, what's live across them, and the colour they all share.
 */
export function C4AthleticsNode() {
  return (
    <PlaceSheet
      trail={['Texas A&M', 'Athletics']}
      selected=""
      shift={-206}
      pins={PINS}
      overlay={<NodeArea />}
      sheetHeight={470}
      labelledBy="node-title"
    >
      <AthleticsNode />
    </PlaceSheet>
  )
}
