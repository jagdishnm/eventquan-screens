import { ArrowRight, BadgeCheck, Lock, Mail, Megaphone, MoonStar } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Device'
import { AggieMark, EqMark, MatchupThumb } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { BigTime, FoldNote, OnRail, TimeRail } from './Rail'
import { timeScale } from './time'

/** Friday, Oct 11, 11:02 PM. Hours past 24 are Saturday (34 = 10 AM). */
const NOW = 23 + 2 / 60

const y = timeScale([
  [NOW, 22],
  [24, 76],
  [25, 114],
  [34, 204],
  [35, 240],
  [42, 314],
  [43, 332],
])

const FOLDS = [
  { from: 25, to: 34 },
  { from: 35, to: 42 },
]

const MARKS = [{ h: 24, label: '12', sub: 'AM' }, { h: 34 }, { h: 42 }]

/** A NetID: letters, digits, dots, dashes. The @tamu.edu is fixed beside the field, so it can't be mistyped. */
const isNetId = (v: string) => /^[a-z][a-z0-9._-]{1,30}$/i.test(v)

/**
 * Concept 1 · The Day, stage 1 · Sign in. Friday, 11:02 PM, the night before. Enter a tamu.edu
 * email and the straw grows down the screen: Midnight Yell in 58 minutes, sleep, the tailgate,
 * then kickoff. The campus is recognised by the day it hands you, not by a logo.
 */
export function DaySignIn() {
  const nav = useNavigate()
  const [netid, setNetid] = useState('jcarter')
  const ok = isNetId(netid)
  /** The straw grows only when typing turns a NetID valid; on load it's already there, still. */
  const [grew, setGrew] = useState(false)
  const onNetId = (v: string) => {
    // Constraint, not validation: anything from an @ on is dropped, spaces never land
    const next = v.replace(/@.*$/, '').replace(/\s/g, '')
    if (!ok && isNetId(next)) setGrew(true)
    setNetid(next)
  }

  return (
    <Screen bg="bg-canvas">
      <StatusBar />
      <main className="absolute inset-0 flex flex-col">
        <header className="relative overflow-hidden bg-maroon-deep px-5 pb-5 pt-[60px] text-white">
          <img
            src="/img/midnight-yell.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-b from-maroon-deep/40 via-maroon-deep/85 to-maroon-deep" />
          <div className="relative">
            <div className="flex h-[32px] items-center justify-between">
              <span className="flex items-center gap-2">
                {ok ? <AggieMark size={28} /> : <EqMark size={28} />}
                <span className="text-small font-semibold">
                  {ok ? (
                    'Texas A&M on EventQuan'
                  ) : (
                    <>
                      Event<span className="text-gold">Quan</span>
                    </>
                  )}
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-meta font-semibold text-white/75">
                <MoonStar size={14} className="text-gold" /> 64° · clear
              </span>
            </div>

            <div className="mt-5">
              <BigTime
                kicker="FRIDAY · OCT 11 · THE NIGHT BEFORE"
                value="11:02"
                unit="PM"
                label="11:02 PM, Friday, October 11"
              />
            </div>
            <h1 className="mt-3 text-balance text-title font-bold leading-[1.15] tracking-title">
              Howdy. Saturday starts at midnight.
            </h1>

            <label className="mt-4 block">
              <span className="sr-only">Texas A&amp;M NetID</span>
              <span
                className={`flex h-[54px] items-center gap-3 rounded-thumb bg-white/10 pl-4 pr-1.5 ring-1 transition-colors duration-(--duration-quick) ease-(--ease-out-expo) ${
                  ok ? 'ring-gold/80' : 'ring-white/14'
                }`}
              >
                <Mail size={19} className="shrink-0 text-white/60" />
                <input
                  value={netid}
                  onChange={(e) => onNetId(e.target.value)}
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-describedby="day-email-hint"
                  placeholder="netid"
                  className="min-w-0 flex-1 bg-transparent text-emphasis text-white outline-none placeholder:text-white/60"
                />
                {/* The domain is fixed: the user types only the NetID */}
                <span className="flex h-[40px] shrink-0 items-center gap-1.5 rounded-well bg-maroon px-2.5 text-control font-semibold text-white ring-1 ring-white/20">
                  @tamu.edu
                  {ok ? <BadgeCheck size={15} className="text-gold" /> : null}
                </span>
              </span>
            </label>
            <p
              id="day-email-hint"
              aria-live="polite"
              className={`mt-2 text-small ${ok ? 'text-gold' : 'text-white/75'}`}
            >
              {ok ? 'Texas A&M found. Here’s your Saturday.' : 'Your NetID, the part before @tamu.edu.'}
            </p>
          </div>
        </header>

        {/* The straw grows: tomorrow, laid out from right now */}
        <section aria-labelledby="day-preview" className="relative flex-1 overflow-hidden pt-3">
          <h2 id="day-preview" className="flex items-baseline justify-between px-4 text-micro font-bold tracking-caps">
            <span className="text-maroon">{ok ? 'YOUR STRAW · NEXT 20 HOURS' : 'YOUR STRAW'}</span>
            {ok ? <span className="font-semibold tracking-normal text-ink-3">3 sheets · 23 friends</span> : null}
          </h2>

          {ok ? (
            <TimeRail
              key="grown"
              y={y}
              from={NOW}
              to={43}
              now={NOW}
              marks={MARKS}
              folds={FOLDS}
              grow={grew}
              label="Your Saturday"
            >
              <OnRail y={y(24)} pierce="gold">
                <Leaf
                  delay={grew ? 700 : undefined}
                  thumb={<img src="/img/midnight-yell.jpg" alt="" className="size-[40px] rounded-well object-cover" />}
                  title="Midnight Yell"
                  meta="Kyle Field · in 58 min"
                  tag={
                    <span className="flex items-center gap-1 rounded-full bg-soon px-2 py-[3px] text-micro font-bold text-soon-ink">
                      <Megaphone size={11} /> Tonight
                    </span>
                  }
                />
              </OnRail>
              <FoldNote y={y(29.5)}>Sleep. Seven hours of it, if you leave by 1.</FoldNote>
              <OnRail y={y(34)} pierce="open">
                <Leaf
                  delay={grew ? 900 : undefined}
                  thumb={
                    <img src="/img/kyle-field-stands.jpg" alt="" className="size-[40px] rounded-well object-cover" />
                  }
                  title="Tailgate Zone — Lot C"
                  meta="Kyle Field · 10 AM · 11 friends"
                />
              </OnRail>
              <FoldNote y={y(38.5)}>March-In at 5:15, gates from 3:30</FoldNote>
              <OnRail y={y(42)} pierce="gold">
                <Leaf
                  delay={grew ? 1100 : undefined}
                  thumb={<MatchupThumb size={40} />}
                  title="A&M vs LSU · Kickoff"
                  meta="Kyle Field · 6 PM · Sec 125"
                  peak
                />
              </OnRail>
            </TimeRail>
          ) : (
            <div className="relative h-[300px]">
              <span aria-hidden className="absolute left-[67px] top-[22px] h-[40px] w-[6px] rounded-full bg-gold" />
              <span
                aria-hidden
                className="absolute left-[62px] top-[14px] size-[16px] rounded-full bg-gold ring-[3px] ring-maroon"
              />
              <p className="absolute left-[94px] right-6 top-[12px] text-small leading-snug text-ink-3">
                Your Saturday grows here once we know you&rsquo;re an Aggie: Midnight Yell, the tailgate, kickoff.
              </p>
            </div>
          )}
        </section>

        <div className="relative bg-canvas px-5 pb-[34px] pt-2">
          <Button size="lg" className="w-full" disabled={!ok} onClick={() => nav('/explore/home-straw')}>
            Continue <ArrowRight size={18} />
          </Button>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-meta text-ink-3">
            <Lock size={12} /> Texas A&amp;M single sign-on · Duo protected
          </p>
        </div>
      </main>
    </Screen>
  )
}

function Leaf({
  thumb,
  title,
  meta,
  tag,
  peak,
  delay,
}: {
  thumb: ReactNode
  title: string
  meta: string
  tag?: ReactNode
  peak?: boolean
  /** The sheets drop onto the straw one by one as it grows (only after typing, never on load). */
  delay?: number
}) {
  return (
    <div
      className={`${delay === undefined ? '' : 'sheet-drop'} flex h-[54px] items-center gap-2.5 rounded-thumb pl-2 pr-2.5 shadow-raised ${
        peak ? 'bg-maroon text-white' : 'bg-white'
      }`}
      style={delay === undefined ? undefined : { animationDelay: `${delay}ms` }}
    >
      <span className="shrink-0">{thumb}</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-control font-semibold tracking-snug">{title}</span>
        <span className={`block truncate text-meta ${peak ? 'text-white/75' : 'text-ink-3'}`}>{meta}</span>
      </span>
      {tag}
      {peak ? <span className="font-display text-display-sm font-bold leading-none text-gold tabular">6:00</span> : null}
    </div>
  )
}
