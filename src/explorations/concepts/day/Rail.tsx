import { Check } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { LANE_X, RAIL_X, split, type Scale } from './time'

/**
 * Concept 1 · The Day. Troy's straw stood upright: one gold rail runs down every screen, hours set
 * in the condensed display face beside it and a pulsing NOW on it. Events hang off the rail as
 * sheets at the hour they happen, so every screen answers "when" before anything else.
 *
 * Geometry is shared so the rail sits in the same place on all four screens that draw it.
 */
/** Hour mark text: "6", or the hour and minutes when it isn't on the hour. */
function markText(h: number) {
  const { hm, mm } = split(h)
  return mm ? hm : hm.split(':')[0]
}

/**
 * The hero of every screen in this concept: a time in the display face, big enough to read across a
 * tailgate. `unit` sits beside it (PM, TO KICKOFF), `kicker` above it.
 */
export function BigTime({
  value,
  unit,
  kicker,
  caption,
  tone = 'onMaroon',
  label,
}: {
  /** The numerals. A node when the units sit inside it, e.g. 8h 14m. */
  value: ReactNode
  unit?: string
  kicker?: ReactNode
  caption?: ReactNode
  tone?: 'onMaroon' | 'onNight'
  /** Accessible reading, e.g. "11:02 PM, Friday". */
  label: string
}) {
  return (
    <div>
      {kicker ? <div className="text-micro font-bold tracking-caps text-gold tabular">{kicker}</div> : null}
      {/* Static on purpose: the hero is captured as a still, so it never animates in */}
      <p aria-label={label} className="mt-1 flex items-start font-display font-bold text-white">
        <span aria-hidden className="flex items-start text-display-clock leading-[0.8] tracking-headline tabular">
          {value}
        </span>
        {unit ? (
          <span aria-hidden className="ml-1.5 mt-[3px] text-display-sm leading-none tracking-eyebrow text-gold">
            {unit}
          </span>
        ) : null}
      </p>
      {caption ? (
        <div className={`mt-2 text-control tabular ${tone === 'onNight' ? 'text-white/75' : 'text-white/80'}`}>
          {caption}
        </div>
      ) : null}
    </div>
  )
}

/** A unit set inside the hero numerals (the h and m of 8h 14m): gold, display-sm, sat on the baseline. */
export function BigUnit({ children }: { children: ReactNode }) {
  return (
    <span className="mb-[2px] ml-1 mr-3 self-end text-display-md leading-none text-gold last:mr-0">{children}</span>
  )
}

export type Mark = { h: number; label?: string; sub?: string }
export type Fold = { from: number; to: number }

const SURFACE = {
  light: {
    mark: 'text-ink',
    sub: 'text-ink-3',
    tick: 'bg-hairline-strong',
    fold: 'text-ink-3',
    nowPill: 'bg-maroon text-white',
    nowRing: 'ring-maroon',
    nowLine: 'border-maroon/30',
    future: 'bg-gold/55',
  },
  dark: {
    mark: 'text-white',
    sub: 'text-white/60',
    tick: 'bg-white/25',
    fold: 'text-white/60',
    nowPill: 'bg-gold text-gold-ink',
    nowRing: 'ring-night',
    nowLine: 'border-gold/40',
    future: 'bg-white/20',
  },
} as const

/**
 * The straw. A vertical gold rail from `from` to `to`, hour marks in the display face, folded
 * (dotted) stretches where nothing happens, and the pulsing NOW. Sheets go in `children`, placed
 * with <OnRail>. The rail itself is decorative; the sheets carry the meaning for assistive tech.
 */
export function TimeRail({
  y,
  from,
  to,
  marks,
  now,
  folds = [],
  surface = 'light',
  rail,
  under,
  children,
  label,
  grow,
  nowTag,
  nowHint,
}: {
  y: Scale
  from: number
  to: number
  marks: Mark[]
  now?: number
  folds?: Fold[]
  surface?: keyof typeof SURFACE
  /** Replaces the plain rail, e.g. game day's quarter segments. */
  rail?: ReactNode
  /** Drawn under the rail and sheets, e.g. Kyle Field's crowd band. */
  under?: ReactNode
  children?: ReactNode
  /** Accessible name for the list of sheets. */
  label: string
  /** Sign in: the straw grows down from NOW (only after an interaction, never on load). */
  grow?: boolean
  /** See NowMarker: VIEWING when the marker isn't the present, and a grip signifier. */
  nowTag?: string
  nowHint?: ReactNode
}) {
  const s = SURFACE[surface]
  const top = y(from)
  const bottom = y(to)
  const nowY = now === undefined ? undefined : y(now)
  const nearNow = (h: number) => now !== undefined && Math.abs(y(h) - y(now)) < 34

  return (
    <div className="relative" style={{ height: bottom + 16 }}>
      {under}

      {/* Hour marks: the display face, right-aligned against the rail */}
      <div aria-hidden>
        {marks
          .filter((m) => !nearNow(m.h))
          .map((m) => (
            <HourMark key={m.h} y={y(m.h)} mark={m} surface={surface} />
          ))}
      </div>

      {/* The rail: solid gold up to now, lighter after; dotted where the day folds up */}
      <div aria-hidden className={grow ? 'straw absolute inset-0' : 'absolute inset-0'}>
        {rail ?? (
          <>
            <span
              className="absolute w-[6px] rounded-full bg-gold"
              style={{ left: RAIL_X - 3, top, height: (nowY ?? bottom) - top }}
            />
            {nowY !== undefined ? (
              <span
                className={`absolute w-[6px] rounded-full ${s.future}`}
                style={{ left: RAIL_X - 3, top: nowY, height: bottom - nowY }}
              />
            ) : null}
          </>
        )}
        {folds.map((f) => (
          <span
            key={f.from}
            className={`absolute w-[10px] ${surface === 'dark' ? 'bg-night' : 'bg-canvas'}`}
            style={{
              left: RAIL_X - 5,
              top: y(f.from) + 4,
              height: y(f.to) - y(f.from) - 8,
              backgroundImage: 'radial-gradient(circle, var(--color-gold) 2px, transparent 2.5px)',
              backgroundSize: '10px 9px',
            }}
          />
        ))}
      </div>

      {nowY !== undefined && now !== undefined ? <NowMarker y={nowY} h={now} surface={surface} tag={nowTag} hint={nowHint} /> : null}

      <ol aria-label={label} className="absolute inset-0">
        {children}
      </ol>
    </div>
  )
}

/**
 * One hour on the rail: the hour in the display face with AM/PM hung beneath, right-aligned to a
 * tick that touches the rail. Shared by every screen so the hour column never drifts.
 */
export function HourMark({
  y,
  mark: m,
  surface = 'light',
}: {
  y: number
  mark: Mark
  surface?: keyof typeof SURFACE
}) {
  const s = SURFACE[surface]
  const sub = m.sub ?? (m.label ? '' : split(m.h).ap)
  return (
    <span aria-hidden className="absolute left-0 flex -translate-y-1/2 items-center" style={{ top: y, width: RAIL_X - 6 }}>
      <span className="relative flex-1 pr-1.5 text-right">
        <span className={`block font-display text-title font-bold leading-none tabular ${s.mark}`}>
          {m.label ?? markText(m.h)}
        </span>
        {sub ? (
          <span
            className={`absolute right-1.5 top-full mt-[2px] text-tab font-bold leading-none tracking-eyebrow ${s.sub}`}
          >
            {sub}
          </span>
        ) : null}
      </span>
      <span className={`h-[2px] w-[6px] rounded-full ${s.tick}`} />
    </span>
  )
}

/**
 * The pulsing NOW: a pill in the hour column, a ring on the rail and a hairline across the lane.
 * The same marker on every screen of the row; `y` is its centre inside a relative parent.
 *
 * `tag` replaces NOW when the marker shows a time other than now (VIEWING), and then it stops
 * pulsing: only the real present breathes. `hint` hangs a grip signifier at the end of the hairline
 * when the marker can be dragged.
 */
export function NowMarker({
  y,
  h,
  surface = 'light',
  tag = 'NOW',
  hint,
}: {
  y: number
  h: number
  surface?: keyof typeof SURFACE
  tag?: string
  hint?: ReactNode
}) {
  const s = SURFACE[surface]
  const live = tag === 'NOW'
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 z-20" style={{ top: y }}>
      <span
        className={`absolute -translate-y-1/2 rounded-tag pb-[3px] pt-[2px] text-center leading-none ${
          split(h).hm.length > 4 ? 'px-1' : 'px-1.5'
        } ${s.nowPill}`}
        style={{ right: `calc(100% - ${RAIL_X - 12}px)` }}
      >
        <span className="block text-tab font-bold tracking-eyebrow">{tag}</span>
        <span className="block font-display text-card font-bold tabular">{split(h).hm}</span>
      </span>
      {live ? (
        <span
          className="absolute size-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/60 motion-safe:animate-now-pulse"
          style={{ left: RAIL_X }}
        />
      ) : null}
      <span
        className={`absolute size-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold ring-[3px] ${s.nowRing}`}
        style={{ left: RAIL_X }}
      />
      <span
        className={`absolute border-t border-dashed ${s.nowLine} ${hint ? 'right-[172px]' : 'right-4'}`}
        style={{ left: RAIL_X + 12 }}
      />
      {hint ? (
        <span className="absolute right-4 flex h-[24px] -translate-y-1/2 items-center gap-1 rounded-full bg-white px-2.5 text-micro font-semibold text-ink-2 shadow-raised ring-1 ring-hairline">
          {hint}
        </span>
      ) : null}
    </div>
  )
}

/**
 * Feedback for a commit action, with its undo: "4 added to your Saturday · Undo". It appears only
 * after a press (never on load), rises on the expo curve and holds still under reduced motion.
 */
export function UndoToast({
  children,
  onUndo,
  className = '',
}: {
  children: ReactNode
  onUndo: () => void
  className?: string
}) {
  return (
    <div
      role="status"
      className={`rise flex h-[48px] items-center gap-2.5 rounded-thumb bg-ink pl-3.5 pr-1 text-control text-white shadow-floating ${className}`}
    >
      <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-gold text-gold-ink">
        <Check aria-hidden size={13} strokeWidth={3.2} />
      </span>
      <span className="min-w-0 flex-1 truncate tabular">{children}</span>
      <button
        type="button"
        onClick={onUndo}
        className="press h-[44px] shrink-0 rounded-well px-3 font-semibold text-gold transition-colors duration-(--duration-quick) ease-(--ease-out-expo) active:bg-white/10"
      >
        Undo
      </button>
    </div>
  )
}

/**
 * One sheet on the straw, hung at `y` (its centre). `pierce` is the dot where the rail goes
 * through it: gold for your plan, live red for happening now, open for everything else.
 */
export function OnRail({
  y,
  children,
  pierce = 'open',
  surface = 'light',
  align = 'center',
  dotY = 22,
  className = '',
  style,
}: {
  y: number
  children: ReactNode
  pierce?: 'gold' | 'live' | 'open' | 'none'
  surface?: 'light' | 'dark'
  /** `top` hangs the sheet from y instead of centring it there (for sheets with a duration). */
  align?: 'center' | 'top'
  /** For top-aligned sheets: how far down the sheet the rail pierces it. */
  dotY?: number
  className?: string
  style?: CSSProperties
}) {
  const dot = pierceDot(pierce, surface)
  return (
    <li
      className={`absolute right-4 tabular ${align === 'center' ? '-translate-y-1/2' : ''} ${className}`}
      style={{ top: y, left: LANE_X, ...style }}
    >
      {pierce === 'none' ? null : (
        <span
          aria-hidden
          className={`absolute z-10 size-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full ${dot} ${align === 'center' ? 'top-1/2' : ''}`}
          style={{ left: RAIL_X - LANE_X, top: align === 'center' ? undefined : dotY }}
        />
      )}
      {children}
    </li>
  )
}

type Pierce = 'gold' | 'live' | 'open' | 'none'

/** Where the rail goes through a sheet: gold for your plan, live red for happening now, open otherwise. */
function pierceDot(pierce: Pierce, surface: 'light' | 'dark') {
  return {
    gold: 'bg-gold ring-4 ring-gold/30',
    live: 'live-dot bg-live ring-2 ring-white',
    open: surface === 'dark' ? 'bg-night ring-2 ring-white/60' : 'bg-white ring-2 ring-hairline-strong',
    none: '',
  }[pierce]
}

/**
 * The rail in flow layout, for lists too long to place by the clock (EventFinder). Each row draws
 * its own stretch of rail at RAIL_X, so rows stack into one unbroken straw: solid gold before NOW,
 * lighter after. Hour marks, pierce dots and sheets sit exactly where TimeRail puts them.
 */
export function RailRow({
  mark,
  pierce = 'open',
  past = false,
  edge,
  className = '',
  children,
}: {
  mark?: Mark
  pierce?: Pierce
  /** Before NOW: the rail runs solid gold through this row. */
  past?: boolean
  /** The rail starts (first) or stops (last) at this row's centre. */
  edge?: 'first' | 'last'
  className?: string
  children: ReactNode
}) {
  return (
    <li className={`relative flex items-center py-1 pr-4 tabular ${className}`} style={{ paddingLeft: LANE_X }}>
      <span
        aria-hidden
        className={`absolute w-[6px] ${past ? 'bg-gold' : 'bg-gold/55'} ${
          edge === 'first' ? 'top-1/2 bottom-0 rounded-t-full' : edge === 'last' ? 'top-0 bottom-1/2 rounded-b-full' : 'inset-y-0'
        }`}
        style={{ left: RAIL_X - 3 }}
      />
      {mark ? (
        <span aria-hidden className="absolute left-0 top-1/2">
          <HourMark y={0} mark={mark} />
        </span>
      ) : null}
      {pierce === 'none' ? null : (
        <span
          aria-hidden
          className={`absolute top-1/2 z-10 size-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full ${pierceDot(pierce, 'light')}`}
          style={{ left: RAIL_X }}
        />
      )}
      {children}
    </li>
  )
}

/** NOW in flow layout: the same marker, in a row of its own between the past and the rest of the day. */
export function RailNow({ h }: { h: number }) {
  return (
    <li aria-hidden className="relative h-[40px]">
      <span className="absolute top-0 h-1/2 w-[6px] bg-gold" style={{ left: RAIL_X - 3 }} />
      <span className="absolute bottom-0 h-1/2 w-[6px] bg-gold/55" style={{ left: RAIL_X - 3 }} />
      <NowMarker y={20} h={h} />
    </li>
  )
}

/** A part of the day (MORNING, GAME NIGHT) as a quiet label hung on the rail. */
export function RailPart({ id, title, hours, past = false }: { id: string; title: string; hours: string; past?: boolean }) {
  return (
    <li className="relative flex h-[34px] items-end pb-1.5 pr-4" style={{ paddingLeft: LANE_X }}>
      <span aria-hidden className={`absolute inset-y-0 w-[6px] ${past ? 'bg-gold' : 'bg-gold/55'}`} style={{ left: RAIL_X - 3 }} />
      <span aria-hidden className="absolute bottom-[11px] h-[2px] w-[14px] rounded-full bg-maroon/40" style={{ left: RAIL_X + 6 }} />
      <h2 id={id} className="flex flex-1 items-baseline justify-between text-micro font-bold tracking-caps text-maroon">
        {title}
        <span className="font-semibold tracking-normal text-ink-3">{hours}</span>
      </h2>
    </li>
  )
}

/** A folded stretch of the day: the dotted rail plus a quiet line beside it. */
export function FoldNote({
  y,
  children,
  surface = 'light',
}: {
  y: number
  children: ReactNode
  surface?: 'light' | 'dark'
}) {
  return (
    <li
      className={`absolute right-4 -translate-y-1/2 text-meta italic ${surface === 'dark' ? 'text-white/60' : 'text-ink-3'}`}
      style={{ top: y, left: LANE_X }}
    >
      {children}
    </li>
  )
}
