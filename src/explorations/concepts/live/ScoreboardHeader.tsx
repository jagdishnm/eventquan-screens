import { TrendingUp } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { LiveDot } from '../../../components/Badge'

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/**
 * A live crowd count. It renders its final value on the first frame (so a static capture never shows
 * a partial number), then ticks up by a few every few seconds, the way a live count does. `max` caps
 * the ticking. With reduced motion, or `tick` off, it holds still and only moves when `to` changes.
 */
function useLiveCount(to: number, { tick = true, max = Infinity }: { tick?: boolean; max?: number } = {}) {
  const [bump, setBump] = useState(0)
  useEffect(() => {
    if (!tick || prefersReducedMotion()) return
    const bumps = [2, 1, 3, 1, 2]
    let i = 0
    const id = window.setInterval(() => setBump((b) => b + bumps[i++ % bumps.length]), 3200)
    return () => window.clearInterval(id)
  }, [tick])
  return Math.min(max, to + bump)
}

/**
 * The scoreboard numeral as an odometer. Each digit is a column of 0–9 behind a 1em window, so a
 * change rolls only the digits that moved, on the expo curve. On mount it is simply the number.
 */
export function Odometer({ value, className = '' }: { value: number; className?: string }) {
  const chars = fmt(value).split('')
  return (
    <span aria-hidden className={`flex leading-none tabular ${className}`}>
      {chars.map((ch, i) => {
        // Keyed from the right, so the ones column stays the ones column as the number grows
        const key = chars.length - i
        if (!/\d/.test(ch)) return <span key={key}>{ch}</span>
        return (
          <span key={key} className="relative inline-block h-[1em] overflow-hidden">
            <span className="invisible">0</span>
            <span
              className="absolute inset-x-0 top-0 flex flex-col motion-safe:transition-transform motion-safe:duration-(--duration-slow) motion-safe:ease-(--ease-out-expo)"
              style={{ transform: `translateY(-${Number(ch)}em)` }}
            >
              {DIGITS.map((d) => (
                <span key={d} className="h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        )
      })}
    </span>
  )
}

/**
 * The live pulse: one thin bar per interval. Past bars are white, the current one is gold with
 * the red live dot on top, and anything after `now` is a forecast drawn as a faint ghost.
 * Bars are drawn at their final height: no entrance, so a capture always shows the real shape.
 */
export function PulseBars({ values, now = values.length - 1 }: { values: number[]; now?: number }) {
  const max = Math.max(...values)
  return (
    <div aria-hidden className="flex h-[30px] items-end gap-[2px]">
      {values.map((v, i) => (
        <span
          key={i}
          className={`relative flex-1 rounded-xs ${
            i === now ? 'bg-gold' : i > now ? 'bg-white/14' : i > now - 4 ? 'bg-white/70' : 'bg-white/35'
          }`}
          style={{ height: `${Math.max(10, (v / max) * 100)}%` }}
        >
          {i === now ? (
            <span className="absolute -top-[10px] left-1/2 grid size-[9px] -translate-x-1/2 place-items-center rounded-full bg-white">
              <LiveDot className="!size-[5px]" />
            </span>
          ) : null}
        </span>
      ))}
    </div>
  )
}

export type Split = { label: string; value: string; dot?: string }

const TONE = {
  /** Maroon scoreboard over a light body. */
  maroon: { bg: 'bg-maroon', fade: 'to-maroon' },
  /** Game night: the same maroon board, sinking into the dark stands below it. */
  night: { bg: 'bg-maroon-deep', fade: 'to-night' },
} as const

/**
 * The scoreboard every screen in "The 12th Man, live" wears: a maroon header with ONE huge live
 * numeral in the condensed face, a red on-air light, the live pulse beneath it and a freshness cue.
 *
 * Stable API. Optional props added for the lead-concept pass: `tone`, `showSplits`, `updated`, `max`.
 */
export function ScoreboardHeader({
  count,
  unit,
  kicker,
  left,
  right,
  pulse,
  now,
  trend,
  aside,
  splits,
  showSplits = false,
  children,
  tick = true,
  max,
  tone = 'maroon',
  updated = 'Updated just now',
}: {
  /** The live numeral. Rendered at its final value from the first frame. */
  count: number
  /** Kept for compatibility; the count no longer counts up from here (static captures show `count`). */
  from?: number
  /** One or two short lines beside the numeral, e.g. ['Aggies', 'out now']. Keep each line short. */
  unit: [string, string?]
  /** Small caps line over the numeral, after LIVE. */
  kicker: string
  left?: ReactNode
  right?: ReactNode
  /** Crowd per interval for the pulse bars. */
  pulse: number[]
  /** Index of the current bar; later bars are forecast. */
  now?: number
  /** Under the pulse, left: how fast it's moving. */
  trend: string
  /** A third small line under the unit, for context. */
  aside?: ReactNode
  /** Split cells under the pulse. Hidden unless `showSplits`; prefer a `SplitRow` in the body. */
  splits?: Split[]
  /** Show `splits` in the header. Off by default: one number per header. */
  showSplits?: boolean
  /** Extra content at the bottom of the header (chips). */
  children?: ReactNode
  /** Tick the count up by a few every few seconds. */
  tick?: boolean
  /** Ceiling for the ticking count (e.g. seats in a section). */
  max?: number
  /** 'maroon' over a light body (default) or 'night' over a dark game-day body. */
  tone?: keyof typeof TONE
  /** The freshness cue under the pulse, right. Same wording across the row. */
  updated?: string
}) {
  const shown = useLiveCount(count, { tick, max })
  const t = TONE[tone]
  return (
    <header className={`relative overflow-hidden pb-4 pt-[54px] text-white ${t.bg}`}>
      {/* Scoreboard dot matrix, fading out toward the body */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-maroon-line)_1px,transparent_1.3px)] bg-[length:7px_7px] opacity-50"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-linear-to-b from-transparent from-30% ${t.fade}`}
      />

      <div className="relative px-4">
        <div className="flex h-[44px] items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">{left}</div>
          <div className="flex shrink-0 items-center gap-1">{right}</div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-micro font-bold tracking-caps text-white/75">
          <span className="grid size-[14px] shrink-0 place-items-center rounded-full bg-white">
            <LiveDot className="!size-[6px]" />
          </span>
          <span className="text-white">LIVE</span>
          <span aria-hidden className="text-white/50">
            ·
          </span>
          <span className="truncate">{kicker}</span>
        </div>

        <h1 className="mt-3 flex items-end gap-2.5">
          <span className="sr-only">
            {fmt(shown)} {unit.filter(Boolean).join(' ')}
          </span>
          <Odometer
            value={shown}
            className="-mb-[0.13em] -mt-[0.12em] font-display text-scoreboard font-bold tracking-headline"
          />
          <span aria-hidden className="min-w-0 pb-0.5 text-card font-semibold leading-[1.15] tracking-snug">
            <span className="block text-white">{unit[0]}</span>
            {unit[1] ? <span className="block text-white/75">{unit[1]}</span> : null}
            {aside ? <span className="mt-0.5 block truncate text-meta font-medium text-white/75">{aside}</span> : null}
          </span>
        </h1>

        <div className="mt-4">
          <PulseBars values={pulse} now={now} />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-1 truncate text-meta font-semibold tabular text-gold">
              <TrendingUp aria-hidden size={13} strokeWidth={2.6} className="shrink-0" />
              {trend}
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-tab font-bold uppercase tracking-caps text-white/75">
              <span aria-hidden className="size-[5px] rounded-full bg-success-on-dark" />
              {updated}
            </span>
          </div>
        </div>

        {showSplits && splits ? (
          <dl className="mt-3 flex gap-4 border-t border-white/12 pt-2.5 text-meta">
            {splits.map((s) => (
              <div key={s.label} className="flex min-w-0 items-center gap-1.5">
                {s.dot ? <span aria-hidden className={`size-[6px] shrink-0 rounded-full ${s.dot}`} /> : null}
                <dt className="truncate text-white/75">{s.label}</dt>
                <dd className="font-semibold tabular">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children}
      </div>
    </header>
  )
}

/**
 * The split, demoted out of the header: the first compact row of a light body. Each cell is a
 * label with its node dot over a mid-size numeral and a heat bar against the biggest cell.
 */
export function SplitRow({ splits, label }: { splits: (Split & { n: number })[]; label: string }) {
  const top = Math.max(...splits.map((s) => s.n))
  return (
    <dl
      aria-label={label}
      className="mx-4 grid auto-cols-fr grid-flow-col divide-x divide-hairline rounded-card bg-white py-2.5 shadow-raised"
    >
      {splits.map((s) => (
        <div key={s.label} className="min-w-0 px-3">
          <dt className="flex items-center gap-1.5 truncate text-micro font-bold uppercase tracking-eyebrow text-ink-3">
            {s.dot ? <span aria-hidden className={`size-[6px] shrink-0 rounded-full ${s.dot}`} /> : null}
            {s.label}
          </dt>
          <dd className="mt-1 font-display text-title font-bold leading-none tabular">{s.value}</dd>
          <dd className="mt-1.5">
            <HeatBar pct={(s.n / top) * 100} tone={s.dot ?? 'bg-maroon'} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** A thin heat bar: how big this crowd is next to the biggest one on the screen. */
export function HeatBar({
  pct,
  tone = 'bg-maroon',
  label,
  surface = 'light',
}: {
  pct: number
  tone?: string
  label?: string
  /** Track colour: hairline on light bodies, a faint white on game-night bodies. */
  surface?: 'light' | 'dark'
}) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`block h-[5px] overflow-hidden rounded-full ${surface === 'dark' ? 'bg-white/12' : 'bg-hairline'}`}
    >
      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${Math.min(100, Math.max(4, pct))}%` }} />
    </span>
  )
}
