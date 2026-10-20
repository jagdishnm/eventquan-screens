import { Badge } from './Badge'

export type TimelineItem = {
  time: string
  title: string
  where: string
  state: 'past' | 'live' | 'next' | 'later'
  /** live: "420 here" · next: "in 14 min" */
  note?: string
  /** The day's anchor (kickoff): gold node, bold title. */
  anchor?: boolean
}

/** A venue's day, in order. Past items read as done, the live one pulses, the next one counts down. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="stagger relative rounded-card bg-white px-3.5 py-1.5">
      {items.map((s, i) => (
        <li key={s.title} className="relative flex gap-3 py-2">
          <div aria-hidden className="relative flex w-[16px] justify-center">
            {i < items.length - 1 ? (
              <span
                className={`absolute -bottom-[14px] top-[18px] w-[2px] ${s.state === 'past' || s.state === 'live' ? 'bg-maroon/70' : 'bg-hairline'}`}
              />
            ) : null}
            <span
              className={`relative mt-[5px] rounded-full ${
                s.state === 'live'
                  ? 'live-dot size-[11px] bg-live ring-[3px] ring-live/20'
                  : s.state === 'past'
                    ? 'size-[9px] bg-maroon/50'
                    : s.anchor
                      ? 'size-[11px] bg-gold ring-[3px] ring-gold/30'
                      : 'size-[9px] border-2 border-ink-3/50 bg-white'
              }`}
            />
          </div>
          <div className="w-[62px] shrink-0 pt-[1px] text-meta font-medium tabular text-ink-3">{s.time}</div>
          <div className={`min-w-0 flex-1 ${s.state === 'past' ? 'text-ink-3' : ''}`}>
            <div
              className={`flex items-center gap-1.5 text-body tracking-snug ${s.anchor ? 'font-bold' : 'font-semibold'}`}
            >
              <span className="truncate">{s.title}</span>
              {s.state === 'past' ? (
                <Badge tone="neutral" size="sm">
                  Done
                </Badge>
              ) : null}
            </div>
            <div className="truncate text-meta text-ink-3">{s.where}</div>
            {s.state === 'live' ? (
              <div className="mt-1.5">
                <Badge tone="live">{s.note}</Badge>
              </div>
            ) : s.state === 'next' ? (
              <div className="mt-1.5">
                <Badge tone="soon">Opens {s.note}</Badge>
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
