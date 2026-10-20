import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LiveDot } from './Badge'

export type TileTint = 'blue' | 'green' | 'amber' | 'indigo' | 'red' | 'purple' | 'teal' | 'sky' | 'maroon' | 'neutral'

export type TileProps = {
  label: string
  Icon: LucideIcon
  /** Soft tint for everyday services. */
  tint?: TileTint
  /**
   * `solid`: the service is the moment (Athletics on gameday). `outline`: a creation
   * entry point (Quick Event). Both stand out without spending the screen's one gold button.
   */
  emphasis?: 'solid' | 'outline'
  /** One short live line under the label. Leave empty when there's nothing live to say. */
  status?: string
  statusTone?: 'live' | 'ok' | 'muted'
  /** A word pinned above the icon, e.g. GAMEDAY. */
  flag?: string
  to?: string
}

const TINT: Record<TileTint, string> = {
  blue: 'bg-tint-blue text-tint-blue-ink',
  green: 'bg-tint-green text-tint-green-ink',
  amber: 'bg-tint-amber text-tint-amber-ink',
  indigo: 'bg-tint-indigo text-tint-indigo-ink',
  red: 'bg-tint-red text-tint-red-ink',
  purple: 'bg-tint-purple text-tint-purple-ink',
  teal: 'bg-tint-teal text-tint-teal-ink',
  sky: 'bg-tint-sky text-tint-sky-ink',
  maroon: 'bg-tint-maroon text-maroon',
  neutral: 'bg-tint-neutral text-ink-2',
}

/** A launcher tile from the founder's home grid, carrying live state. */
export function Tile({ label, Icon, tint = 'neutral', emphasis, status, statusTone = 'muted', flag, to }: TileProps) {
  const well =
    emphasis === 'solid'
      ? 'bg-maroon text-white'
      : emphasis === 'outline'
        ? 'bg-white text-maroon ring-2 ring-inset ring-gold'
        : TINT[tint]
  const body = (
    <>
      <span className={`relative grid size-[50px] place-items-center rounded-thumb ${well}`}>
        <Icon size={25} strokeWidth={emphasis === 'outline' ? 2.6 : 2} />
        {flag ? (
          <span className="absolute -top-[7px] left-1/2 flex h-[16px] -translate-x-1/2 items-center rounded-full bg-live-strong px-[6px] text-tab font-extrabold tracking-eyebrow text-white ring-2 ring-white">
            {flag}
          </span>
        ) : null}
      </span>
      <span className="mt-[7px] text-center text-micro font-semibold leading-[1.15] tracking-snug text-ink">
        {label}
      </span>
      <span
        className={`mt-[3px] flex h-[13px] max-w-full items-center gap-[4px] overflow-hidden text-ellipsis whitespace-nowrap px-0.5 text-micro leading-none ${
          statusTone === 'live'
            ? 'font-semibold text-live-ink'
            : statusTone === 'ok'
              ? 'font-medium text-ok'
              : 'text-ink-3'
        }`}
      >
        {status && statusTone === 'live' ? <LiveDot className="!size-[5px]" /> : null}
        {status && statusTone === 'ok' ? <span className="size-[5px] rounded-full bg-ok" /> : null}
        {status}
      </span>
    </>
  )
  const cls = 'flex flex-col items-center rounded-thumb pb-1 pt-1.5 active:bg-black/[0.04]'
  return to ? (
    <Link to={to} className={cls}>
      {body}
    </Link>
  ) : (
    <button type="button" className={cls}>
      {body}
    </button>
  )
}
