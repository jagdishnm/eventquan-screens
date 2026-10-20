import type { ReactNode } from 'react'

/**
 * The scoreboard header for the moments it can't be live: the same maroon board, dot matrix,
 * condensed numeral, pulse and freshness cue as `ScoreboardHeader`, with the on-air light off.
 *
 * - `offline`: the light goes grey and reads OFFLINE, the numeral dims to its last known value,
 *   the pulse freezes (past bars desaturated, the rest dashed) and the cue says when it was true.
 * - `locked`: the light reads LOCATION OFF and the numeral is drawn as unlit scoreboard cells:
 *   without location we don't know it, so we don't fake it. The pulse is a ghost.
 *
 * Nothing animates. It's a still board until something changes.
 */
export function StateScoreboard({
  state,
  label,
  kicker,
  value,
  unit,
  aside,
  srValue,
  badge,
  left,
  right,
  pulse,
  lastKnown,
  trend,
  updated,
}: {
  state: 'offline' | 'locked'
  /** Where LIVE sits on a live board: OFFLINE, LOCATION OFF. */
  label: string
  kicker: string
  /** The numeral as shown. For `locked`, the unlit cells, e.g. '8,888'. */
  value: string
  /** Two short lines beside the numeral, as on the live board. */
  unit: [string, string?]
  /** A third small line under the unit. */
  aside?: ReactNode
  /** What a screen reader hears instead of the numeral. */
  srValue: string
  /** Laid over the numeral: the reason it isn't live. */
  badge?: ReactNode
  left?: ReactNode
  right?: ReactNode
  pulse: number[]
  /** Offline only: index of the last bar we heard about. */
  lastKnown?: number
  /** Under the pulse, left. */
  trend: ReactNode
  /** The freshness cue under the pulse, right, e.g. 'Last updated 6:31 PM'. */
  updated: string
}) {
  const unlit = state === 'locked'
  const long = value.replace(/\D/g, '').length > 5
  return (
    <header className="relative overflow-hidden bg-maroon pb-4 pt-[54px] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-maroon-line)_1px,transparent_1.3px)] bg-[length:7px_7px] opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent from-30% to-maroon"
      />

      <div className="relative px-4">
        <div className="flex h-[44px] items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2.5">{left}</div>
          <div className="flex shrink-0 items-center gap-1">{right}</div>
        </div>

        <div className="mt-2 flex items-center gap-2 text-micro font-bold tracking-caps text-white/75">
          {/* The on-air light, switched off: a grey bulb that doesn't pulse */}
          <span
            className={`grid size-[14px] shrink-0 place-items-center rounded-full ${unlit ? 'bg-white/25' : 'bg-white'}`}
          >
            <span className={`size-[6px] rounded-full ${unlit ? 'bg-white/60' : 'bg-ink-3'}`} />
          </span>
          <span className="text-white">{label}</span>
          <span aria-hidden className="text-white/50">
            ·
          </span>
          <span className="truncate">{kicker}</span>
        </div>

        {/* Six digits fill the board's width, so the unit drops to one line beneath the numeral */}
        <h1 className={`mt-3 flex ${long ? 'flex-col items-start gap-1.5' : 'items-end gap-2.5'}`}>
          <span className="sr-only">{srValue}</span>
          <span aria-hidden className="relative shrink-0">
            <span
              className={`-mb-[0.13em] -mt-[0.12em] block font-display text-scoreboard font-bold leading-none tracking-headline tabular ${
                unlit ? 'text-white/12' : 'text-white/55'
              }`}
            >
              {value}
            </span>
            {badge ? <span className="absolute inset-x-0 top-1/2 flex -translate-y-1/2">{badge}</span> : null}
          </span>
          {long ? (
            <span aria-hidden className="flex min-w-0 items-baseline gap-1.5 text-card font-semibold tracking-snug">
              <span className="text-white">{unit[0]}</span>
              {unit[1] ? <span className="text-white/75">{unit[1]}</span> : null}
              {aside ? <span className="truncate text-meta font-medium text-white/75">· {aside}</span> : null}
            </span>
          ) : (
            <span aria-hidden className="min-w-0 pb-0.5 text-card font-semibold leading-[1.15] tracking-snug">
              <span className="block text-white">{unit[0]}</span>
              {unit[1] ? <span className="block text-white/75">{unit[1]}</span> : null}
              {aside ? <span className="mt-0.5 block truncate text-meta font-medium text-white/75">{aside}</span> : null}
            </span>
          )}
        </h1>

        <div className="mt-4">
          <FrozenPulse values={pulse} lastKnown={unlit ? -1 : (lastKnown ?? pulse.length - 1)} />
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-1 truncate text-meta font-semibold tabular text-white">
              {trend}
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-tab font-bold uppercase tracking-caps tabular text-white/75">
              <span aria-hidden className="size-[5px] rounded-full bg-white/40" />
              {updated}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * The pulse, stopped. Bars up to `lastKnown` are what we heard before the signal went, drawn
 * without the gold; the last one carries the grey light. Everything after is dashed: unknown.
 * With `lastKnown` -1 every bar is a ghost.
 */
function FrozenPulse({ values, lastKnown }: { values: number[]; lastKnown: number }) {
  const max = Math.max(...values)
  return (
    <div aria-hidden className="flex h-[30px] items-end gap-[2px]">
      {values.map((v, i) => (
        <span
          key={i}
          className={`relative flex-1 rounded-xs ${
            lastKnown < 0
              ? 'bg-white/10'
              : i === lastKnown
                ? 'bg-white/55'
                : i < lastKnown
                  ? 'bg-white/25'
                  : 'border border-dashed border-white/30'
          }`}
          style={{ height: `${Math.max(10, (v / max) * 100)}%` }}
        >
          {i === lastKnown ? (
            <span className="absolute -top-[10px] left-1/2 grid size-[9px] -translate-x-1/2 place-items-center rounded-full bg-white">
              <span className="size-[5px] rounded-full bg-ink-3" />
            </span>
          ) : null}
        </span>
      ))}
    </div>
  )
}

/** The iOS status bar with no service: the 9:41 bar, signal bars hollow, no Wi-Fi. */
export function NoSignalStatusBar() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[54px] text-white">
      <div className="absolute left-1/2 top-[11px] h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute left-[46px] top-[18px] text-emphasis font-semibold tracking-snug">9:41</div>
      <div className="absolute right-[30px] top-[22px] flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" className="fill-current opacity-30">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" className="stroke-current" strokeOpacity="0.4" />
          <rect x="2" y="2" width="14" height="9" rx="2.5" className="fill-current" />
          <path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" className="fill-current" fillOpacity="0.45" />
        </svg>
      </div>
    </div>
  )
}
