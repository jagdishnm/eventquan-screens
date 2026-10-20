import { ChevronLeft, Megaphone } from 'lucide-react'
import { useState } from 'react'
import { Faces } from '../components/Avatar'
import { Button } from '../components/Button'
import { Screen, ScrollBody } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { HeatBar, ScoreboardHeader } from './concepts/live/ScoreboardHeader'

/** The east stands as a card-stunt grid: 24 seats across, 12 rows. True = white card (the Block T). */
const COLS = 24
const ROWS = 12
const inT = (r: number, c: number) =>
  (r >= 1 && r <= 3 && c >= 3 && c <= 20) || (r >= 4 && r <= 10 && c >= 10 && c <= 13)
/** Sec 125 · Row 22 · Seat 14, placed in the stem of the T. */
const YOU = { r: 6, c: 11 }

/**
 * The east stands as the picture they make. Each dot is a seat; yours is ringed in gold.
 * `gaps` draws those seats hollow (unclaimed, or a card that didn't go up). `pulse` animates your ring.
 */
export function StandsGrid({
  label = 'East stands forming a white Block T on maroon. Your seat is in the stem of the T.',
  gaps,
  pulse = true,
}: {
  label?: string
  /** Seat indices (row × 24 + col) drawn as empty outlines. */
  gaps?: ReadonlySet<number>
  pulse?: boolean
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="grid gap-[4px]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: ROWS * COLS }).map((_, k) => {
        const r = Math.floor(k / COLS)
        const c = k % COLS
        const me = r === YOU.r && c === YOU.c
        const fill = gaps?.has(k) && !me ? 'ring-1 ring-inset ring-white/20' : inT(r, c) ? 'bg-white' : 'bg-maroon'
        return (
          <span
            key={k}
            className={`aspect-square rounded-xs ${fill} ${
              me
                ? `${pulse ? 'live-dot ' : ''}relative z-10 scale-150 ring-2 ring-gold ring-offset-2 ring-offset-night-2`
                : ''
            }`}
          />
        )
      })}
    </div>
  )
}

/** Cards checked in across the east stands, every two minutes since the Q2 kickoff. The last bar is now. */
const CHECKINS = [12, 14, 15, 18, 21, 24, 28, 33, 38, 44, 51, 58, 66, 73, 81, 88, 94, 100]

/** Each east-stands section, readiest first: share of its cards checked in. */
const SECTIONS = [
  { sec: '124', ready: 99 },
  { sec: '125', ready: 98, you: true },
  { sec: '126', ready: 97 },
  { sec: '127', ready: 96 },
  { sec: '128', ready: 95 },
  { sec: '129', ready: 94 },
  { sec: '130', ready: 93 },
  { sec: '131', ready: 91 },
]

/**
 * Exploration · Game day as the card stunt (Concept 3, stage 5).
 * The header is the night scoreboard: how many of the Block T's 1,840 cards are ready right now.
 * The stands are the hero below it, your seat ringed in gold, then the one gold action: light your card.
 */
export function GameDayCardStunt({ initialLit = false }: { initialLit?: boolean } = {}) {
  const [lit, setLit] = useState(initialLit)
  const you = inT(YOU.r, YOU.c) ? 'white' : 'maroon'

  return (
    <Screen bg="bg-night">
      <StatusBar />
      <ScrollBody>
        <ScoreboardHeader
          tone="night"
          count={1766}
          max={1840}
          unit={['cards', 'ready to go up']}
          aside="of 1,840 in the Block T"
          kicker="SAT 7:12 PM · KYLE FIELD · EAST STANDS"
          left={
            <>
              <IconButton label="Back" to="/">
                <ChevronLeft size={20} />
              </IconButton>
              <span className="font-display text-display-sm font-extrabold italic leading-none tracking-eyebrow text-gold">
                GAMEDAY
              </span>
            </>
          }
          right={
            <span className="pr-1 text-right leading-tight">
              <span className="block font-display text-title font-bold leading-none tabular">21–17</span>
              <span className="mt-0.5 block text-micro font-bold tracking-caps text-white/75">A&amp;M · Q2</span>
            </span>
          }
          pulse={CHECKINS}
          trend="+212 in the last 5 min"
        />

        <section aria-labelledby="stunt-title" className="px-4 pt-4 text-white">
          <p className="text-micro font-bold tracking-caps tabular text-gold">YOUR CARD · SEC 125 · ROW 22 · SEAT 14</p>
          <h2 id="stunt-title" className="mt-1 text-balance text-title font-bold leading-[1.2] tracking-title">
            You&apos;re the stem of the T
          </h2>
          <p className="mt-0.5 text-small text-white/75">
            Your card is <b className="font-semibold text-white">{you}</b>. Hold it up on the next first down.
          </p>

          {/* The stands as the picture they make. Each dot is a seat; yours is ringed. */}
          <figure className="mt-3 rounded-card bg-night-2 p-3 ring-1 ring-white/8">
            <StandsGrid />
            <figcaption className="mt-2.5 flex justify-between text-meta text-white/75">
              <span>East stands · Sec 124–131</span>
              <span className="font-semibold text-gold">You · Sec 125</span>
            </figcaption>
          </figure>

          {/* The one action, with the clock it answers to */}
          <div className="mt-3 flex items-center gap-3.5">
            <div className="shrink-0">
              <div className="font-display text-display-md font-bold leading-none tabular">0:42</div>
              <div className="mt-1 text-tab font-bold uppercase tracking-caps text-white/75">to cards up</div>
            </div>
            <Button size="lg" className="min-w-0 flex-1" onClick={() => setLit(true)}>
              Light my card
            </Button>
          </div>

          {/* Section by section, readiest first */}
          <section aria-labelledby="sections-title" className="mt-5">
            <div className="flex items-baseline justify-between">
              <h3 id="sections-title" className="text-emphasis font-semibold tracking-snug">
                Readiest sections
              </h3>
              <span className="text-meta text-white/75">cards checked in</span>
            </div>
            <ol className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-card bg-night-2 p-3 ring-1 ring-white/8">
              {SECTIONS.map((s, i) => (
                <li key={s.sec} className="min-w-0">
                  <span className="flex items-baseline justify-between text-meta">
                    <span className={s.you ? 'font-semibold text-gold' : 'text-white/75'}>
                      <span className="tabular text-white/50">{i + 1}</span> Sec {s.sec}
                      {s.you ? ' · you' : ''}
                    </span>
                    <span className="font-semibold tabular">{s.ready}%</span>
                  </span>
                  <span className="mt-1 block">
                    <HeatBar pct={s.ready} surface="dark" tone={s.you ? 'bg-gold' : 'bg-white/70'} />
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-3 flex items-center gap-3 rounded-card bg-night-2 px-3.5 py-3 ring-1 ring-white/8">
            <span className="grid size-[36px] place-items-center rounded-well bg-white/8">
              <Megaphone size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-control font-semibold">Next from the Yell Leaders: Farmers Fight</div>
              <div className="text-meta text-white/75">Hump it when they pass back · then Gig &apos;Em</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-card bg-night-2 px-3.5 py-3 ring-1 ring-white/8">
            <Faces n={3} size={26} surface="photo" />
            <div className="min-w-0 flex-1">
              <div className="text-control font-semibold">Maya and Alex hold white too</div>
              <div className="text-meta text-white/75">Same stem of the T · Sec 125, two rows down</div>
            </div>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" surface="dark" />

      {/* The card itself: the whole screen in your colour. Tap anywhere to put it down. */}
      {lit ? (
        <button
          type="button"
          onClick={() => setLit(false)}
          className={`rise absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 ${
            you === 'white' ? 'bg-white text-maroon' : 'bg-maroon text-white'
          }`}
        >
          <span className="font-display text-display-xl font-extrabold uppercase italic leading-none">Hold it up</span>
          <span className="text-body font-semibold">Sec 125 · Row 22 · Seat 14</span>
          <span className="mt-6 text-small opacity-70">Tap to put it down</span>
        </button>
      ) : null}
    </Screen>
  )
}
