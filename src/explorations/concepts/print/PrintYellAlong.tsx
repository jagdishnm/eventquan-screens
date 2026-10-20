import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Screen, ScrollBody } from '../../../components/Device'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton } from '../../../components/ui'
import { Kicker, Masthead, RingMark } from './PrintKit'

/** Farmers Fight, as the Yell Leaders call it. */
const VERSE = ['Farmers fight!', 'Farmers fight!', 'Fight! Fight!', 'Farmers, farmers fight!']

/** The next yells likely to be called. The Yell Leaders set the order live. */
const UP_NEXT = [
  { no: 4, name: 'Gig ’Em', hint: 'Thumbs up, fist closed' },
  { no: 5, name: 'Old Army', hint: 'Hump it, then yell' },
  { no: 6, name: 'Military', hint: 'Watch for the pass-back' },
]

/**
 * "Hump it": lean forward, hands on knees. A simple figure drawn in one ink, like a program diagram.
 */
function HumpItFigure() {
  return (
    <svg viewBox="0 0 64 64" className="size-[56px] shrink-0" aria-hidden>
      <g fill="none" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" className="stroke-maroon">
        {/* Head */}
        <circle cx={44} cy={14} r={6} className="fill-maroon" />
        {/* Back, bent forward */}
        <path d="M 38 20 L 20 30" />
        {/* Arm down to the knee */}
        <path d="M 33 23 L 36 38" />
        {/* Legs, knees bent */}
        <path d="M 20 30 L 34 40 L 30 56" />
        <path d="M 20 30 L 24 44 L 18 56" />
      </g>
      {/* Yell lines */}
      <g strokeWidth={2.5} strokeLinecap="round" className="stroke-gold-dark">
        <path d="M 54 8 L 60 4" />
        <path d="M 55 14 L 62 14" />
        <path d="M 54 20 L 60 24" />
      </g>
    </svg>
  )
}

/**
 * Print · Game day as a yell card, held up under the stadium lights.
 * The body goes night; the current yell prints big on a paper card like a hymnal page, with the
 * words, how to do it and what's called next. The score stays compact in the masthead.
 */
export function PrintYellAlong() {
  const [humping, setHumping] = useState(false)

  return (
    <Screen bg="bg-night">
      <StatusBar />
      <ScrollBody>
        <Masthead
          folio="Program · Yell card"
          lead={
            <IconButton label="Back to Kyle Field" to="/places/kyle-field">
              <ChevronLeft size={20} />
            </IconButton>
          }
          dateline={
            <>
              <Kicker className="text-paper/80">Sat · Oct 12 · Kyle Field</Kicker>
              <Kicker className="text-gold">Sec 125 · Row 22</Kicker>
            </>
          }
        >
          {/* Score, compact */}
          <p className="sr-only" aria-live="polite">
            Texas A&amp;M 21, LSU 17. Second quarter, 4:12 left.
          </p>
          <div aria-hidden className="flex items-center justify-between">
            <span className="flex items-baseline gap-2">
              <span className="font-mono text-meta font-semibold tracking-caps text-paper/75">A&amp;M</span>
              <span className="font-poster text-display-lg font-black leading-none tabular">21</span>
            </span>
            <span className="flex flex-col items-center">
              <Badge tone="live" surface="dark" size="md">
                Q2
              </Badge>
              <span className="mt-1 font-mono text-control font-semibold tabular text-gold">4:12</span>
            </span>
            <span className="flex items-baseline gap-2">
              <span className="font-poster text-display-lg font-black leading-none tabular text-paper/60">17</span>
              <span className="font-mono text-meta font-semibold tracking-caps text-paper/75">LSU</span>
            </span>
          </div>
        </Masthead>

        <div className="px-4 pt-4">
          {/* The yell card */}
          <article
            aria-labelledby="yell-now"
            className="paper-grain relative -rotate-[0.6deg] bg-paper text-ink-warm shadow-floating"
          >
            <div className="relative flex items-center justify-between border-b-2 border-ink-warm px-4 pb-2 pt-3">
              <Kicker className="text-maroon">Now calling · No. 3</Kicker>
              <Kicker className="text-ink-warm-2">Sec 125</Kicker>
            </div>
            <div className="relative px-4 pb-4 pt-3 text-center">
              <h1
                id="yell-now"
                className="font-poster text-masthead font-black uppercase leading-[0.84] tracking-headline text-balance text-maroon"
              >
                Farmers Fight
              </h1>
              <div className="mx-auto mt-3 h-px w-16 bg-ink-warm/40" />
              <p className="mt-3 font-serif text-title italic leading-[1.35]">
                {VERSE.map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>

            {/* How to do it */}
            <div className="relative flex items-center gap-3 border-t border-dashed border-ink-warm/35 px-4 py-3">
              <HumpItFigure />
              <p className="font-serif text-small leading-[1.45]">
                <b className="font-slab font-bold text-maroon">Watch the Yell Leaders.</b> The sign passes back row by
                row. Then hump it: lean forward, hands on your knees, and yell.
              </p>
            </div>
          </article>

          <Button size="lg" className="mt-5 w-full" aria-pressed={humping} onClick={() => setHumping((h) => !h)}>
            {humping ? 'You’re in · Yelling with Sec 125' : 'Hump it · I’m yelling'}
          </Button>
          <p aria-live="polite" className="mt-2 text-center font-serif text-small italic text-paper/75">
            {humping
              ? 'Whoop! Sec 125 sees you’re in. Tap again if you sit this one out.'
              : 'Tells Sec 125 you’re yelling along, and counts toward your ring.'}
          </p>

          {/* Up next in the yell order */}
          <section aria-labelledby="up-next" className="mt-6">
            <div className="flex items-end justify-between border-b border-paper/25 pb-1.5">
              <h2 id="up-next" className="font-poster text-display-sm font-extrabold uppercase leading-none text-paper">
                Up next
              </h2>
              <Kicker className="pb-0.5 text-paper/60">Order called live</Kicker>
            </div>
            <ol className="mt-1">
              {UP_NEXT.map((y) => (
                <li key={y.no} className="flex items-center gap-3 border-b border-paper/12 py-2.5">
                  <span className="w-[28px] shrink-0 font-mono text-meta font-semibold tabular text-gold">
                    {String(y.no).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 font-slab text-card font-bold text-paper">{y.name}</span>
                  <span className="text-right font-serif text-small italic text-paper/75">{y.hint}</span>
                </li>
              ))}
            </ol>
          </section>

          <p className="mt-4 flex items-center gap-2.5 font-serif text-small italic text-paper/70">
            <RingMark size={26} />
            Stamp Yell Practice when the quarter ends. It counts toward your ring.
          </p>
        </div>
      </ScrollBody>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}
