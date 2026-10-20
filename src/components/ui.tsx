import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Circular header button. The visible disc is 36px; the hit area is padded to 44×44pt.
 * `onMaroon` for solid headers, `onPhoto` for imagery.
 */
export function IconButton({
  label,
  children,
  surface = 'onMaroon',
  to,
}: {
  label: string
  children: ReactNode
  surface?: 'onMaroon' | 'onPhoto'
  to?: string
}) {
  const disc = (
    <span
      className={`grid size-[36px] place-items-center rounded-full text-white ${
        surface === 'onMaroon' ? 'bg-white/14' : 'bg-black/32 backdrop-blur-md'
      }`}
    >
      {children}
    </span>
  )
  const hit = 'press -m-1 grid size-[44px] shrink-0 place-items-center rounded-full'
  return to ? (
    <Link to={to} aria-label={label} className={hit}>
      {disc}
    </Link>
  ) : (
    <button type="button" aria-label={label} className={hit}>
      {disc}
    </button>
  )
}

export function SectionHeader({
  title,
  action,
  meta,
  actionTo,
  dark,
}: {
  title: ReactNode
  /** Link label, e.g. "See All". Rendered only with `actionTo`, so it always goes somewhere. */
  action?: string
  actionTo?: string
  meta?: ReactNode
  dark?: boolean
}) {
  return (
    <div className="mb-2.5 flex items-end justify-between px-4">
      <div className="flex items-baseline gap-2">
        <h2 className={`text-title font-bold tracking-title ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {meta ? <span className={`text-small ${dark ? 'text-white/60' : 'text-ink-3'}`}>{meta}</span> : null}
      </div>
      {action && actionTo ? (
        <Link
          to={actionTo}
          className={`relative -my-2 rounded-well px-1 py-2 text-control font-semibold after:absolute after:-inset-x-2 after:-inset-y-1 after:content-[''] ${dark ? 'text-gold' : 'text-maroon'}`}
        >
          {action}
        </Link>
      ) : null}
    </div>
  )
}
