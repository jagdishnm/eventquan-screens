import { Bookmark, Footprints } from 'lucide-react'
import { useState } from 'react'
import { Faces } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { DateBlock } from '../../components/EventCard'
import { Eyebrow } from '../../components/Eyebrow'
import { CATEGORY_TONE } from '../../data/events'
import type { MapPinSpec } from '../CampusMap'
import { EventFinderMap } from '../EventFinderMap'
import { GameStrip } from '../GameStrip'

/** Athletics only: every pin is an A&M venue, so every pin is maroon. Reed Arena sits clear of the sheet. */
const PINS: MapPinSpec[] = [
  { id: 'ellis', x: 74, y: 330, label: 'Soccer · Thu', node: 'tamu' },
  { id: 'kyle', x: 230, y: 398, label: 'A&M vs LSU', node: 'tamu', detail: 'Today 6 PM' },
  { id: 'tailgate', x: 306, y: 452, label: 'Tailgate · Lot C', node: 'tamu' },
  { id: 'reed', x: 112, y: 470, label: 'Reed Arena', node: 'tamu', detail: 'Volleyball · Wed' },
]

const WEEK = [
  { id: 'lsu', day: 'SAT', date: '12', title: 'A&M vs LSU' },
  { id: 'vb', day: 'WED', date: '16', title: 'Volleyball vs Ole Miss' },
  { id: 'soc', day: 'THU', date: '17', title: 'Soccer vs Arkansas' },
]

function AthleticsSheet() {
  const [going, setGoing] = useState(false)
  return (
    <section
      aria-labelledby="map-athletics"
      className="absolute inset-x-0 bottom-0 z-20 rounded-t-sheet bg-canvas pb-[94px] pt-2.5 shadow-overlay"
    >
      <div aria-hidden className="mx-auto h-[5px] w-[38px] rounded-full bg-black/15" />
      <div className="mt-2 flex items-baseline justify-between px-4">
        <h2 id="map-athletics" className="text-title font-bold tracking-title">
          Athletics <span className="text-small font-normal tracking-normal text-ink-3">This week · 4 events</span>
        </h2>
        <span className="text-meta font-semibold text-ink-3">2 of 4</span>
      </div>

      <div className="no-scrollbar mt-2.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 scroll-px-4">
        {/* The selected pin's card, in view */}
        <article className="w-[330px] shrink-0 snap-start rounded-card bg-white p-2.5 shadow-raised ring-2 ring-maroon">
          <div className="flex gap-3">
            <div className="relative shrink-0">
              <img src="/img/reed-arena.jpg" alt="" className="size-[72px] rounded-thumb object-cover" />
              <span className="absolute left-1 top-1 rounded-tag bg-white/95 px-1 py-[2px] shadow-raised">
                <DateBlock day="WED" date="16" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <Eyebrow tone="category" className={CATEGORY_TONE.Athletics}>
                Athletics · SEC Volleyball
              </Eyebrow>
              <h3 className="text-card font-semibold leading-tight tracking-snug">Aggie Volleyball vs Ole Miss</h3>
              <p className="mt-0.5 text-small text-ink-2">
                <span className="font-medium text-ink tabular">7:00 PM</span> · Reed Arena
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 px-1 text-meta text-ink-3">
            <Faces n={3} size={17} />
            <span className="font-semibold text-ink-2">2.6K going</span> · Alex, Kendall + 1
            <span className="ml-auto flex items-center gap-1">
              <Footprints size={13} className="text-maroon" /> 18 min
            </span>
          </div>
          <div className="mt-2.5 flex gap-2">
            <Button size="sm" className="flex-1" aria-pressed={going} onClick={() => setGoing((v) => !v)}>
              I'm Going
            </Button>
            <Button size="sm" variant="secondary" aria-label="Save Aggie Volleyball vs Ole Miss" className="px-3">
              <Bookmark size={16} />
            </Button>
          </div>
        </article>
        <article className="w-[330px] shrink-0 snap-start rounded-card bg-white p-2.5 shadow-raised">
          <GameStrip meta="Football · Today 6:00 PM · Kyle Field" />
          <div className="mt-2 px-1 text-meta text-ink-3">
            <span className="font-semibold text-ink-2">125K attending</span> · 23 friends
          </div>
        </article>
      </div>

      <h3 className="mt-3 px-4 text-card font-semibold tracking-snug">This week in Athletics</h3>
      <ul className="no-scrollbar mt-1.5 flex gap-2 overflow-x-auto px-4">
        {WEEK.map((e) => (
          <li
            key={e.id}
            className={`flex shrink-0 items-center gap-2 rounded-thumb py-1.5 pl-1.5 pr-3 shadow-raised ${
              e.id === 'vb' ? 'bg-maroon-soft ring-1 ring-maroon/25' : 'bg-white'
            }`}
          >
            <DateBlock day={e.day} date={e.date} />
            <span className="text-control font-semibold">{e.title}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/**
 * B3 · EventFinder, filtered to Athletics with a different pin selected. The Athletics chip is on,
 * the map keeps only athletics pins, and Reed Arena (Volleyball, Wed) is the pin in focus with its card up.
 */
export function B3AthleticsMap() {
  return <EventFinderMap filter="Athletics" selected="reed" shift={-62} pins={PINS} sheet={<AthleticsSheet />} />
}
