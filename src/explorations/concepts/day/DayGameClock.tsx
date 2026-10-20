import { Check, ChevronLeft, Footprints, MoreHorizontal, Music } from 'lucide-react'
import { useState } from 'react'
import { Faces } from '../../../components/Avatar'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Screen, ScrollBody } from '../../../components/Device'
import { AggieMark, LsuMark } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton } from '../../../components/ui'
import { BigTime, OnRail, TimeRail } from './Rail'
import { RAIL_X, clock, timeScale, type Scale } from './time'

/** Saturday, 7:18 PM at Kyle Field. Q2, 4:12 on the game clock. */
const NOW = 19.3

/** The game on the wall clock: quarters, the half and post-game as stretches of the straw. */
type Seg = { id: string; label: string; from: number; to: number; kind: 'quarter' | 'half' | 'post' }
const SEGS: Seg[] = [
  { id: 'q1', label: 'Q1', from: 18, to: 18.75, kind: 'quarter' },
  { id: 'q2', label: 'Q2', from: 18.83, to: 19.5, kind: 'quarter' },
  { id: 'half', label: 'HALF', from: 19.5, to: 19.92, kind: 'half' },
  { id: 'q3', label: 'Q3', from: 19.92, to: 20.67, kind: 'quarter' },
  { id: 'q4', label: 'Q4', from: 20.75, to: 21.5, kind: 'quarter' },
  { id: 'post', label: 'POST', from: 21.5, to: 22.1, kind: 'post' },
]

/** Scores so far, on the wall clock. */
const PLAYS: { h: number; team: 'tamu' | 'lsu' }[] = [
  { h: 18.23, team: 'tamu' },
  { h: 18.52, team: 'lsu' },
  { h: 18.7, team: 'tamu' },
  { h: 18.95, team: 'lsu' },
  { h: 19.08, team: 'tamu' },
  { h: 19.22, team: 'lsu' },
]

const y = timeScale([
  [18, 8],
  [18.75, 56],
  [18.83, 62],
  [NOW, 128],
  [19.5, 150],
  [19.92, 318],
  [20.67, 366],
  [20.75, 372],
  [21.5, 418],
  [22.1, 486],
])

/** Quarter segments in place of the plain rail: gold where it's been played, dim where it's to come. */
function GameRail({ y }: { y: Scale }) {
  const x = RAIL_X - 3
  return (
    <>
      {SEGS.map((s) => {
        const top = y(s.from) + 2
        const bottom = y(s.to) - 2
        const played = Math.min(Math.max(y(NOW) - top, 0), bottom - top)
        return (
          <span key={s.id}>
            <span
              className={`absolute w-[6px] rounded-full ${s.kind === 'half' ? 'bg-gold/25' : 'bg-white/20'}`}
              style={{ left: x, top, height: bottom - top }}
            />
            {played > 0 ? (
              <span className="absolute w-[6px] rounded-full bg-gold" style={{ left: x, top, height: played }} />
            ) : null}
          </span>
        )
      })}
      {PLAYS.map((p) => (
        <span
          key={p.h}
          className={`absolute size-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-night ${
            p.team === 'tamu' ? 'bg-white' : 'bg-lsu-gold'
          }`}
          style={{ left: RAIL_X, top: y(p.h) }}
        />
      ))}
    </>
  )
}

/**
 * Concept 1 · The Day, stage 5 · Game day. The game told as time: four quarters as stretches of
 * the straw on the wall clock, scores as beads on it, and what's next hung below NOW. The score is
 * there but small; the hero is the clock, and the one gold action is meeting the crew at the half.
 */
export function DayGameClock() {
  const [going, setGoing] = useState(false)
  const mid = (s: Seg) => (y(s.from) + y(s.to)) / 2

  return (
    <Screen bg="bg-night">
      <StatusBar />
      <ScrollBody>
        <header className="bg-linear-to-b from-maroon-deep to-night px-4 pb-4 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center justify-between">
            <IconButton label="Back to Kyle Field" to="/places/kyle-field">
              <ChevronLeft size={20} />
            </IconButton>
            <span className="flex items-center gap-2">
              <span className="text-emphasis font-semibold">A&amp;M vs LSU</span>
              <Badge tone="live" surface="dark" size="md">
                SEC Network
              </Badge>
            </span>
            <IconButton label="More">
              <MoreHorizontal size={18} />
            </IconButton>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Texas A&amp;M 21, LSU 17. Second quarter, 4:12 left. Halftime in about 12 minutes.
          </p>
          <div className="mt-3 flex items-end justify-between gap-3">
            <BigTime
              tone="onNight"
              kicker="2ND QUARTER · GAME CLOCK"
              value="4:12"
              unit="Q2"
              label="4:12 left in the second quarter"
              caption={
                <>
                  <span className="tabular">{clock(NOW)}</span> at Kyle Field · half in 12 min
                </>
              }
            />
            {/* The score: present, compact, never the hero */}
            <dl
              aria-hidden
              className="mb-0.5 w-[112px] shrink-0 rounded-thumb bg-white/8 px-2.5 py-1.5 ring-1 ring-white/10"
            >
              <div className="flex items-center gap-2">
                <AggieMark team size={22} />
                <dt className="flex-1 text-meta font-semibold">A&amp;M</dt>
                <dd className="font-display text-display-sm font-bold leading-none tabular">21</dd>
              </div>
              <div className="mt-1 flex items-center gap-2 text-white/60">
                <LsuMark size={22} />
                <dt className="flex-1 text-meta font-semibold">LSU</dt>
                <dd className="font-display text-display-sm font-bold leading-none tabular">17</dd>
              </div>
            </dl>
          </div>
        </header>

        <section aria-labelledby="game-time" className="pt-2">
          <div className="flex items-baseline justify-between px-4">
            <h2 id="game-time" className="text-micro font-bold tracking-caps text-gold">
              THE GAME, ON YOUR CLOCK
            </h2>
            <span className="flex items-center gap-2.5 text-meta text-white/60">
              <span className="flex items-center gap-1">
                <span aria-hidden className="size-[7px] rounded-full bg-white" /> A&amp;M
              </span>
              <span className="flex items-center gap-1">
                <span aria-hidden className="size-[7px] rounded-full bg-lsu-gold" /> LSU
              </span>
              scores
            </span>
          </div>

          <div className="mt-2">
            <TimeRail
              y={y}
              from={18}
              to={22.1}
              now={NOW}
              surface="dark"
              rail={<GameRail y={y} />}
              marks={SEGS.map((s) => ({ h: (s.from + s.to) / 2, label: s.label }))}
              label="The game and what comes after"
            >
              <OnRail y={mid(SEGS[0])} pierce="none" surface="dark">
                <Line title="A&M 14 · LSU 7" meta="Kickoff 6:00 · three touchdowns in 45 min" />
              </OnRail>
              <OnRail y={y(19.06)} pierce="none" surface="dark">
                <Line title="LSU drive · 2nd & 6 at A&M 41" meta="FG LSU, TD A&M, TD LSU this quarter" />
              </OnRail>

              {/* Next: the half, and the crew at Gate 2 */}
              <OnRail y={y(19.5) + 10} align="top" pierce="gold" surface="dark">
                <div className="rounded-card bg-night-2 p-3 text-white ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-micro font-bold tracking-caps text-gold">HALFTIME · 7:32 PM</span>
                    <span className="text-meta text-white/60">in 14 min</span>
                  </div>
                  <div className="mt-1 text-card font-semibold tracking-snug">Meet the crew at Gate 2</div>
                  <div className="mt-1 flex items-center gap-2 text-meta text-white/75">
                    <Faces n={4} size={20} surface="photo" />
                    <span className="truncate">Maya, Alex +2 · 4 min walk</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    <Button size="sm" aria-pressed={going} onClick={() => setGoing((g) => !g)} className="shrink-0">
                      {going ? (
                        <>
                          <Check size={15} strokeWidth={2.8} /> Crew knows
                        </>
                      ) : (
                        <>
                          <Footprints size={15} /> On my way
                        </>
                      )}
                    </Button>
                    <span className="flex min-w-0 items-center gap-1 text-meta text-white/60">
                      <Music size={13} className="shrink-0 text-gold" />
                      <span className="truncate">Band on at 7:40</span>
                    </span>
                  </div>
                </div>
              </OnRail>

              <OnRail y={mid(SEGS[3])} pierce="open" surface="dark">
                <Line title="Second half · A&M receives" meta="About 7:55 PM" />
              </OnRail>
              <OnRail y={mid(SEGS[4])} pierce="open" surface="dark">
                <Line title="Fourth quarter" meta="Around 8:45 PM · final near 9:30" />
              </OnRail>
              <OnRail y={y(21.5) + 6} align="top" dotY={28} pierce="open" surface="dark">
                <div className="flex items-center gap-2.5 rounded-thumb bg-night-2 p-2 ring-1 ring-white/10">
                  <img src="/img/northgate.jpg" alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-control font-semibold text-white">
                      War Hymn, then Northgate
                    </span>
                    <span className="block truncate text-meta text-white/60">Post-game · 9:30 PM · crew plan</span>
                  </span>
                </div>
              </OnRail>
            </TimeRail>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}

function Line({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="leading-tight">
      <div className="truncate text-control font-semibold text-white">{title}</div>
      <div className="truncate text-meta text-white/60">{meta}</div>
    </div>
  )
}
