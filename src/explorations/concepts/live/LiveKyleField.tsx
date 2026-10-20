import { useState } from 'react'
import { ChevronLeft, Footprints, Navigation, Share, Ticket, TrendingDown, TrendingUp } from 'lucide-react'
import { Avatar } from '../../../components/Avatar'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Screen, ScrollBody } from '../../../components/Device'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton, SectionHeader } from '../../../components/ui'
import { KYLE_FIELD_GAMEDAY } from '../../../data/kyleField'
import { StandsGrid } from '../../GameDayCardStunt'
import { HeatBar, ScoreboardHeader, SplitRow } from './ScoreboardHeader'

/** Kyle Field's day in half hours, 7 AM to 11 PM, read off the venue's crowd curve. Bar 5 is 9:30. */
const DAY = Array.from({ length: 33 }, (_, i) => {
  const h = 7 + i / 2
  const c = KYLE_FIELD_GAMEDAY.crowd
  for (let j = 1; j < c.length; j++) {
    const [h0, v0] = c[j - 1]
    const [h1, v1] = c[j]
    if (h <= h1) return v0 + ((h - h0) / (h1 - h0)) * (v1 - v0)
  }
  return c[c.length - 1][1]
})
const NOW = 5

type Gate = { n: string; side: string; wait: number; line: number; trend: 'up' | 'down' }

/** Gates open now for the 12th Man Brunch, Fan Fest and tours. Shortest wait first. */
const GATES: Gate[] = [
  { n: '2', side: 'East · Joe Routt Blvd', wait: 4, line: 120, trend: 'down' },
  { n: '1', side: 'North · Hall of Champions', wait: 9, line: 260, trend: 'up' },
  { n: '4', side: 'West · Wellborn Rd', wait: 12, line: 340, trend: 'up' },
  { n: '6', side: 'South · Fan Fest plaza', wait: 18, line: 510, trend: 'up' },
]

/** The east stands, three seat-columns per section. Share of tonight's Block T cards claimed. */
const SECTIONS = [
  { sec: '124', fill: 92 },
  { sec: '125', fill: 88 },
  { sec: '126', fill: 81 },
  { sec: '127', fill: 74 },
  { sec: '128', fill: 69 },
  { sec: '129', fill: 58 },
  { sec: '130', fill: 47 },
  { sec: '131', fill: 39 },
]
const GAPS = new Set<number>()
for (let k = 0; k < 24 * 12; k++) {
  const c = k % 24
  // Knuth's multiplicative hash: an even, repeatable scatter of empty seats in each section
  if ((((k + 1) * 2654435761) % 4294967296) % 100 >= SECTIONS[Math.floor(c / 3)].fill) GAPS.add(k)
}
const CLAIMED = Math.round(((288 - GAPS.size) / 288) * 1840)

const CREW: { i: string; name: string; c: 1 | 2 | 3 | 4 | 5 | 6; where: string; since: string }[] = [
  { i: 'MR', name: 'Maya', c: 2, where: '12th Man Brunch · Hall of Champions', since: '9:05' },
  { i: 'AL', name: 'Alex', c: 3, where: 'Lot C · putting up the tent', since: '9:20' },
  { i: 'DS', name: 'Dev', c: 5, where: 'Team Store, by Gate 2', since: '9:38' },
  { i: 'KT', name: 'Kendall', c: 4, where: 'Stadium tour · Sec 330', since: '9:41' },
]

/**
 * 4 · Campus node · Kyle Field, 9:46 AM. The scoreboard counts who's here now against the
 * 102,733 coming at kickoff, then the body answers how to get in: live gate waits, how full the
 * east stands already are for tonight's card stunt, and which friends are inside.
 */
export function LiveKyleField() {
  const [inLine, setInLine] = useState(false)
  return (
    <Screen>
      <StatusBar />
      <ScrollBody className="pb-[176px]">
        <ScoreboardHeader
          count={2310}
          unit={['Aggies', 'here now']}
          aside="of 102,733 at kickoff"
          kicker="SAT 9:46 AM · TEXAS A&M ATHLETICS"
          left={
            <>
              <IconButton label="Back" to="/">
                <ChevronLeft size={20} />
              </IconButton>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-emphasis font-semibold tracking-snug">Kyle Field</span>
                <span className="flex items-center gap-1 text-meta text-white/75">
                  <Footprints aria-hidden size={12} /> 12 min walk · Home of the 12th Man
                </span>
              </span>
            </>
          }
          right={
            <IconButton label="Share Kyle Field">
              <Share size={17} />
            </IconButton>
          }
          pulse={DAY}
          now={NOW}
          trend="+190 in the last 15 min"
        />

        {/* Where the 2,310 are, demoted from the header to the first row of the body */}
        <div className="mt-3">
          <SplitRow
            label="Here now, inside and in line"
            splits={[
              { label: 'Inside', value: '1,820', n: 1820, dot: 'bg-maroon' },
              { label: 'In line', value: '490', n: 490, dot: 'bg-warn-ink' },
              { label: 'Your crew', value: '6', n: 6, dot: 'bg-gold-dark' },
            ]}
          />
        </div>

        <section aria-labelledby="gates-title" className="mt-4">
          <SectionHeader title={<span id="gates-title">Gate lines</span>} meta="open for Brunch, Fan Fest, tours" />
          <ol className="mx-4 overflow-hidden rounded-card bg-white shadow-raised">
            {GATES.map((g, i) => {
              const best = i === 0
              return (
                <li key={g.n} className="flex items-center gap-3 border-b border-hairline px-3 py-2.5 last:border-b-0">
                  <span
                    className={`grid size-[40px] shrink-0 place-items-center rounded-well font-display text-display-sm font-bold leading-none ${
                      best ? 'bg-gold text-gold-ink' : 'bg-maroon-soft text-maroon'
                    }`}
                  >
                    {g.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-body font-semibold tracking-snug">Gate {g.n}</span>
                      {best ? (
                        <Badge tone="going" size="sm">
                          Shortest
                        </Badge>
                      ) : null}
                    </span>
                    <span className="block truncate text-meta text-ink-3">
                      {g.side} · {g.line} in line
                    </span>
                    <span className="mt-1.5 block">
                      <HeatBar pct={(g.line / 510) * 100} tone={best ? 'bg-gold' : 'bg-maroon'} />
                    </span>
                  </span>
                  <span className="flex w-[56px] shrink-0 flex-col items-end">
                    <span className="flex items-baseline gap-0.5">
                      <span className="font-display text-display-md font-bold leading-none tabular">{g.wait}</span>
                      <span className="text-meta font-semibold text-ink-2">min</span>
                    </span>
                    <span
                      className={`mt-0.5 flex items-center gap-0.5 text-meta font-semibold ${g.trend === 'down' ? 'text-ok' : 'text-warn-ink'}`}
                    >
                      {g.trend === 'down' ? (
                        <TrendingDown aria-hidden size={12} strokeWidth={2.6} />
                      ) : (
                        <TrendingUp aria-hidden size={12} strokeWidth={2.6} />
                      )}
                      {g.trend === 'down' ? 'easing' : 'growing'}
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>
        </section>

        <section aria-labelledby="stands-title" className="mt-5">
          <SectionHeader title={<span id="stands-title">East stands, filling</span>} meta="tonight's Block T" />
          <figure className="mx-4 rounded-card bg-night-2 p-3 text-white">
            <StandsGrid
              pulse={false}
              gaps={GAPS}
              label={`East stands, sections 124 to 131. ${CLAIMED.toLocaleString('en-US')} of 1,840 Block T cards claimed, fullest near Section 124. Your seat in Section 125 is claimed.`}
            />
            <div aria-hidden className="mt-3 grid grid-cols-8 gap-[3px]">
              {SECTIONS.map((s) => (
                <span key={s.sec} className="overflow-hidden rounded-tag bg-white/8 pt-1 text-center leading-none">
                  <span className="block text-tab font-semibold text-white/75">{s.sec}</span>
                  <span className="mt-0.5 block text-micro font-bold tabular">{s.fill}%</span>
                  <span className="mt-1 block h-[3px] bg-white/10">
                    <span className="block h-full bg-gold" style={{ width: `${s.fill}%` }} />
                  </span>
                </span>
              ))}
            </div>
            <figcaption className="mt-2.5 flex justify-between gap-2 text-meta text-white/75">
              <span>
                <b className="font-semibold text-white">{CLAIMED.toLocaleString('en-US')}</b> of 1,840 cards claimed
              </span>
              <span className="text-gold">You · Sec 125, Row 22</span>
            </figcaption>
          </figure>
        </section>

        <section aria-labelledby="crew-title" className="mt-5">
          <SectionHeader title={<span id="crew-title">Already inside</span>} meta="6 of your crew" />
          <ul className="mx-4 overflow-hidden rounded-card bg-white shadow-raised">
            {CREW.map((f) => (
              <li key={f.i} className="flex items-center gap-3 border-b border-hairline px-3 py-2.5 last:border-b-0">
                <Avatar initials={f.i} color={f.c} size={34} />
                <span className="min-w-0 flex-1">
                  <span className="block text-body font-semibold tracking-snug">{f.name}</span>
                  <span className="block truncate text-meta text-ink-3">{f.where}</span>
                </span>
                <span className="text-meta tabular text-ink-3">since {f.since}</span>
              </li>
            ))}
          </ul>
        </section>
      </ScrollBody>

      {/* The one action, docked above the tab bar */}
      <div className="absolute inset-x-0 bottom-[84px] z-20 border-t border-hairline bg-canvas/95 px-4 pb-2.5 pt-2.5 backdrop-blur-xl">
        {/* Feedback for the commit: a ticket-ready line, and the same button now shows the ticket */}
        <p aria-live="polite" className="empty:hidden">
          {inLine ? (
            <span className="mb-2 flex items-center gap-2 text-meta">
              <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-ok text-white">
                <Ticket aria-hidden size={12} strokeWidth={2.6} />
              </span>
              <span className="min-w-0 flex-1 truncate">
                <b className="font-semibold text-ink">Ticket ready for Gate 2</b>
                <span className="text-ink-2"> · Sec 125, Row 22</span>
              </span>
              <button
                type="button"
                onClick={() => setInLine(false)}
                className="relative shrink-0 font-semibold text-maroon after:absolute after:-inset-3 after:content-['']"
              >
                Undo
              </button>
            </span>
          ) : null}
        </p>
        <Button size="lg" className="w-full" onClick={() => setInLine(true)}>
          {inLine ? <Ticket size={18} /> : <Navigation size={18} />}
          {inLine ? 'Show my ticket at Gate 2' : 'Get in line at Gate 2 · 4 min'}
        </Button>
      </div>
      <TabBar active="map" />
    </Screen>
  )
}
