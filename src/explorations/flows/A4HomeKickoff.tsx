import { Check, Sunset } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Faces } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { MatchupThumb } from '../../components/Marks'
import type { TileProps } from '../../components/Tile'
import { NODE_META, type Node } from '../../data/events'
import { TILES } from '../../data/homeTiles'
import { HomeDayPlan } from '../HomeDayPlan'

/** What's behind you by 5:20 PM: still on the card, but greyed and checked off. */
const DONE: { time: string; title: string; node: Node; img: string }[] = [
  { time: '8:00', title: 'Farmers Market', node: 'cstat', img: '/img/farmers-market.jpg' },
  {
    time: '10:00',
    title: 'Tailgate Zone — Lot C',
    node: 'tamu',
    img: '/img/kyle-field-stands.jpg',
  },
  { time: '3:45', title: 'Corps March-In', node: 'tamu', img: '/img/aggie-band.jpg' },
]

/** His twelve tiles, unchanged, with their live lines moved on to the evening. */
const EVENING: Record<string, Partial<TileProps>> = {
  'Campus Map': { status: 'Gates open', statusTone: 'live' },
  Dining: { status: 'Sbisa till 8', statusTone: 'ok' },
  Transit: { status: 'Rt 40 · 4 min' },
  Athletics: { status: 'Kickoff 40 min' },
}
const TILES_5PM = TILES.map((t) => ({ ...t, ...EVENING[t.label] }))

/** Your Saturday at 5:20 PM: the morning folds into three done rows, kickoff becomes the hero. */
function SaturdayAt520() {
  return (
    <section
      aria-labelledby="day-plan-520"
      className="relative mx-4 -mt-[44px] rounded-sheet bg-white px-3 pb-3 pt-3 shadow-floating"
    >
      <div className="flex items-center justify-between px-1">
        <h2 id="day-plan-520" className="text-micro font-bold tracking-caps text-maroon">
          YOUR SATURDAY · SAT, OCT 12
        </h2>
        <span className="text-meta font-semibold text-ink-3">3 of 4 done</span>
      </div>

      <ol className="relative mt-1">
        <span aria-hidden className="absolute bottom-3 left-[45px] top-4 w-[2px] rounded-full bg-maroon/25" />
        {DONE.map((s) => (
          <li key={s.title} className="flex items-center gap-2.5 py-1 text-ink-3">
            <span className="w-[34px] shrink-0 text-right text-meta font-semibold tabular">{s.time}</span>
            <span className="relative z-10 grid size-[14px] shrink-0 place-items-center rounded-full bg-maroon/50 text-white ring-2 ring-white">
              <Check size={9} strokeWidth={3.4} />
            </span>
            <img src={s.img} alt="" className="size-[30px] shrink-0 rounded-tag object-cover opacity-55 grayscale" />
            <span className="flex min-w-0 flex-1 items-center gap-1.5 text-control font-semibold text-ink-2">
              <span className={`size-[6px] shrink-0 rounded-full opacity-60 ${NODE_META[s.node].dot}`} />
              <span className="truncate">{s.title}</span>
            </span>
            <Badge tone="neutral" size="sm">
              Done
            </Badge>
          </li>
        ))}
      </ol>

      {/* The hero now: kickoff, counted down, with Game Mode as the one gold action */}
      <Link to="/gameday" className="mt-2 block rounded-card bg-maroon p-3.5 text-white active:bg-maroon-deep">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-micro font-bold tracking-caps text-gold">KICKOFF IN</div>
            <div className="mt-1 flex items-baseline gap-1.5 font-display font-extrabold leading-[0.8] tabular">
              <span className="text-display-xl">40</span>
              <span className="text-title uppercase italic text-white/75">min</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <MatchupThumb size={52} />
            <Badge tone="live" surface="dark" size="md">
              Gates open
            </Badge>
          </div>
        </div>
        <div className="mt-2.5 font-display text-title font-extrabold uppercase italic leading-none">
          A&amp;M vs LSU <span className="text-white/60">· 6:00 PM</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-meta text-white/80">
          <Faces n={3} size={18} surface="photo" />
          <span>
            <b className="font-semibold text-white">23 friends</b> inside · Maya at Gate 2
          </span>
        </div>
        <Button as="span" className="mt-3 w-full">
          Game Mode
        </Button>
      </Link>
    </section>
  )
}

/**
 * A4 · Home at 5:20 PM. The same Home, later: the morning is done and greyed,
 * the countdown to kickoff is the hero of the Saturday card, and Game Mode is the gold action.
 */
export function A4HomeKickoff() {
  return (
    <HomeDayPlan
      greeting="Good Evening, Aggie!"
      weather={
        <>
          <Sunset size={15} className="text-gold" />
          <span className="tabular">81°</span> Clear · Sunset 7:04 PM
        </>
      }
      day={<SaturdayAt520 />}
      tiles={TILES_5PM}
    />
  )
}
