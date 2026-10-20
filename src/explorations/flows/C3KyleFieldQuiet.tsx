import { Bell, BellRing, ChevronRight, Footprints, Moon, Route, Trophy } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { DateBlock, EventRow, EventRowGroup } from '../../components/EventCard'
import { CAMPUS_PINS, type MapPinSpec } from '../CampusMap'
import { PlaceSheet } from '../PlaceSheet'

/** Tuesday on campus: a couple of ordinary things nearby, and Kyle Field with nothing on. */
const PINS: MapPinSpec[] = [
  ...CAMPUS_PINS.filter((p) => p.id === 'msc' || p.id === 'rec').map((p) =>
    p.id === 'msc' ? { ...p, label: 'Resume clinic · MSC' } : { ...p, x: 100, label: 'Intramural flag football' },
  ),
  { id: 'kyle', x: 222, y: 398, label: 'Kyle Field', node: 'tamu', detail: 'Quiet today' },
]

const WHILE_QUIET = [
  { Icon: Route, title: 'Self-guided stadium tour', meta: 'Open till 4 PM · about 45 min' },
  { Icon: Trophy, title: 'Hall of Champions', meta: 'Open 9 AM – 4 PM · on the west side' },
]

const COMING_UP = [
  { day: 'SAT', date: '19', title: 'Texas A&M vs Ole Miss', meta: '2:30 PM · 98K going' },
  { day: 'SAT', date: '26', title: 'Aggie Band Fall Concert', meta: '7:00 PM · 2.1K going' },
]

/** An honest empty state: nothing on today, here's when the next thing is, and what you can still do. */
function QuietTuesday() {
  const [remind, setRemind] = useState(false)
  return (
    <>
      <div className="flex items-center gap-3">
        <img src="/img/kyle-field-exterior.jpg" alt="" className="size-[64px] shrink-0 rounded-thumb object-cover" />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Badge tone="node" node="tamu" />
            <Badge tone="neutral">Tue, Oct 15</Badge>
          </div>
          <h2
            id="place-quiet"
            className="mt-1 font-display text-display-md font-extrabold uppercase italic leading-[0.9] tracking-[-0.01em]"
          >
            Kyle Field
          </h2>
          <p className="mt-0.5 flex items-center gap-1 text-small text-ink-2">
            <Footprints size={13} className="text-maroon" /> 12 min walk · Home of the 12th Man
          </p>
        </div>
      </div>

      <section aria-labelledby="quiet-title" className="mt-3 rounded-card bg-white p-3.5 shadow-floating">
        <div className="flex items-center gap-2.5">
          <span className="grid size-[36px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
            <Moon size={18} />
          </span>
          <div>
            <h3 id="quiet-title" className="text-emphasis font-bold tracking-snug">
              Nothing on here today.
            </h3>
            <p className="text-small text-ink-2">The next thing at Kyle Field is in 3 days.</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-thumb bg-canvas p-2">
          <img src="/img/midnight-yell.jpg" alt="" className="size-[52px] shrink-0 rounded-well object-cover" />
          <div className="min-w-0 flex-1">
            <div className="text-micro font-bold tracking-eyebrow text-maroon">FRI, OCT 18 · 11:59 PM</div>
            <div className="text-body font-semibold tracking-snug">Midnight Yell</div>
            <div className="text-meta text-ink-3">18K going · 31 friends</div>
          </div>
        </div>
        <Button className="mt-3 w-full" aria-pressed={remind} onClick={() => setRemind((v) => !v)}>
          {remind ? <BellRing size={17} /> : <Bell size={17} />}
          Remind me Friday
        </Button>
      </section>

      <h3 className="mt-4 text-card font-semibold tracking-snug">While it's quiet</h3>
      <ul className="mt-1.5 overflow-hidden rounded-card bg-white shadow-raised">
        {WHILE_QUIET.map((x) => (
          <li key={x.title} className="border-b border-hairline last:border-b-0">
            <Link to="/places/kyle-field?quiet=1" className="flex items-center gap-3 px-3 py-2.5 active:bg-press">
              <span className="grid size-[36px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                <x.Icon size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-control font-semibold">{x.title}</span>
                <span className="block text-meta text-ink-3">{x.meta}</span>
              </span>
              <ChevronRight aria-hidden size={16} className="text-ink-3" />
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mb-1.5 mt-4 text-card font-semibold tracking-snug">After that</h3>
      <EventRowGroup>
        {COMING_UP.map((e) => (
          <EventRow key={e.title} leading={<DateBlock day={e.day} date={e.date} />} title={e.title} meta={e.meta} />
        ))}
      </EventRowGroup>
    </>
  )
}

/**
 * C3 · A quiet day. Kyle Field on a Tuesday with nothing on: the pin says so, and the sheet
 * leads with when the next thing is (Midnight Yell, Fri 11:59 PM) instead of an empty list.
 */
export function C3KyleFieldQuiet() {
  return (
    <PlaceSheet pins={PINS} sheetHeight={556} labelledBy="place-quiet">
      <QuietTuesday />
    </PlaceSheet>
  )
}
