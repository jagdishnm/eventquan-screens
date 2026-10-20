import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MatchupThumb } from '../components/Marks'

/**
 * Tonight's game, drawn the same way wherever it appears in the explorations: split matchup
 * thumbnail, "A&M VS LSU" in the condensed display face, one meta line, one trailing slot.
 */
export function GameStrip({
  meta,
  lead,
  trailing,
  to = '/gameday',
  className = '',
}: {
  meta: ReactNode
  /** Optional slot before the thumbnail, e.g. a timeline time and dot. */
  lead?: ReactNode
  trailing?: ReactNode
  to?: string
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 rounded-card bg-maroon py-2.5 pr-2.5 text-white ${lead ? '' : 'pl-2.5'} active:bg-maroon-deep ${className}`}
    >
      {lead}
      <MatchupThumb size={44} />
      <span className="min-w-0 flex-1">
        <span className="block font-display text-title font-extrabold uppercase italic leading-none">
          A&amp;M vs LSU
        </span>
        <span className="mt-1 block truncate text-meta text-white/75">{meta}</span>
      </span>
      {trailing}
    </Link>
  )
}
