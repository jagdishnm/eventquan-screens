import { Bookmark, ChevronRight, MapPin } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { NODE_META, type Node } from '../data/events'
import { Eyebrow, type EyebrowTone } from './Eyebrow'

/**
 * The event card: square media on the left, eyebrow + status, title, when · where, and a social footer.
 * Used for event lists and for previewing a Quick Event exactly as friends will see it.
 */
export function EventCard({
  media,
  mediaSize = 78,
  dateFlag,
  eyebrow,
  eyebrowTone = 'muted',
  eyebrowClassName,
  status,
  title,
  when,
  place,
  node,
  footer,
  to,
  onSave,
}: {
  /** An <img>, MatchupThumb or cover tile, sized to `mediaSize`. */
  media: ReactNode
  mediaSize?: number
  /** Day/date flag over the media for upcoming events. */
  dateFlag?: { day: string; date: string }
  eyebrow: ReactNode
  eyebrowTone?: EyebrowTone
  eyebrowClassName?: string
  /** A Badge, or right-aligned meta. When empty a Save button is shown. */
  status?: ReactNode
  title: string
  when: string
  place?: string
  /** Colors the pin by node. */
  node?: Node
  footer?: ReactNode
  to?: string
  onSave?: () => void
}) {
  const card = (
    <article className="flex gap-3 rounded-card bg-white p-2.5 pr-3 shadow-raised active:bg-press">
      <div className="relative shrink-0" style={{ width: mediaSize, height: mediaSize }}>
        {media}
        {dateFlag ? (
          <span className="absolute left-1.5 top-1.5 rounded-tag bg-white/95 px-1.5 py-[2px] text-center leading-none shadow-sm">
            <span className="block text-tab font-bold tracking-eyebrow text-maroon">{dateFlag.day}</span>
            <span className="block text-control font-bold text-ink">{dateFlag.date}</span>
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <div className="flex items-center justify-between gap-2">
          <Eyebrow tone={eyebrowTone} className={eyebrowClassName}>
            {eyebrow}
          </Eyebrow>
          {status ?? (
            <button
              type="button"
              aria-label={`Save ${title}`}
              onClick={onSave}
              className="-my-3 -mr-3 grid size-[44px] place-items-center text-ink-3"
            >
              <Bookmark size={18} />
            </button>
          )}
        </div>
        <h3 className="mt-0.5 truncate text-card font-semibold tracking-snug text-ink">{title}</h3>
        <div className="mt-0.5 flex items-center gap-1 truncate text-small text-ink-2">
          <span className="tabular font-medium text-ink">{when}</span>
          <span className="text-ink-3">·</span>
          {place ? <MapPin size={12} className={node ? NODE_META[node].text : 'text-ink-3'} strokeWidth={2.4} /> : null}
          <span className="truncate">{place ?? 'Place TBD'}</span>
        </div>
        {footer ? <div className="mt-auto flex items-center gap-1.5 pt-1.5 text-meta text-ink-3">{footer}</div> : null}
      </div>
    </article>
  )
  return to ? (
    <Link to={to} className="block rounded-card">
      {card}
    </Link>
  ) : (
    card
  )
}

/**
 * A compact list row: leading media or date, title, one meta line, optional trailing badge and chevron.
 * Grouped inside a white rounded list (see `EventRowGroup`).
 */
export function EventRow({
  leading,
  title,
  meta,
  trailing,
  live,
}: {
  leading: ReactNode
  title: string
  meta: string
  trailing?: ReactNode
  live?: ReactNode
}) {
  return (
    <li className="flex items-center gap-3 px-3.5 py-3">
      {leading}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 truncate text-body font-semibold tracking-snug">
          {live}
          {title}
        </div>
        <div className="truncate text-meta text-ink-3">{meta}</div>
      </div>
      {trailing}
      <ChevronRight aria-hidden size={16} className="shrink-0 text-ink-3" />
    </li>
  )
}

export function EventRowGroup({ children }: { children: ReactNode }) {
  return <ul className="stagger divide-y divide-hairline overflow-hidden rounded-card bg-white">{children}</ul>
}

/** Day + date block used as the leading slot of an EventRow. */
export function DateBlock({ day, date }: { day: string; date: string }) {
  return (
    <span className="w-[38px] shrink-0 text-center leading-none">
      <span className="block text-tab font-bold tracking-eyebrow text-maroon">{day}</span>
      <span className="block text-title font-bold text-ink">{date}</span>
    </span>
  )
}
