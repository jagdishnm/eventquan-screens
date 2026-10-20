import { BadgeCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { NODE_META, type Node } from '../data/events'

type Tone = 'live' | 'going' | 'soon' | 'node' | 'neutral' | 'brand'
type Surface = 'light' | 'dark'

/**
 * The one status label. Tone says what it means, surface says what it sits on.
 * - live: happening now (pulsing dot, "LIVE · label")
 * - going: you're in (check icon)
 * - soon: opens shortly / Quick Event
 * - node: which city a place belongs to (A&M, College Station, Bryan)
 * - neutral: quiet facts ("Done")
 * - brand: gold-on-maroon labels ("FREE")
 */
export function Badge({
  tone,
  surface = 'light',
  node,
  children,
  size,
  className = '',
}: {
  tone: Tone
  surface?: Surface
  /** Required when tone is `node`. */
  node?: Node
  children?: ReactNode
  /** sm 18px · md 20px · lg 22px. Status tones default to lg, labels to md. */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const h = { sm: 'h-[18px] px-1.5', md: 'h-[20px] px-2', lg: 'h-[22px] px-2' }[
    size ?? (tone === 'node' || tone === 'neutral' ? 'md' : 'lg')
  ]
  const base = `inline-flex shrink-0 items-center gap-1 rounded-full text-micro ${h} ${className}`
  const dark = surface === 'dark'

  if (tone === 'live')
    return (
      <span
        className={`${base} gap-1.5 font-bold tracking-eyebrow ${dark ? 'bg-live-strong text-white' : 'bg-live/10 text-live-ink'}`}
      >
        <span className={`live-dot size-[6px] rounded-full ${dark ? 'bg-white' : 'bg-live'}`} />
        LIVE{children ? <span className="font-semibold tracking-normal">· {children}</span> : null}
      </span>
    )
  if (tone === 'going')
    return (
      <span
        className={`${base} font-semibold ${dark ? 'bg-white/14 text-white backdrop-blur-md' : 'bg-ok/10 text-ok'}`}
      >
        <BadgeCheck size={12} strokeWidth={2.4} className={dark ? 'text-success-on-dark' : ''} />
        {children}
      </span>
    )
  if (tone === 'soon') return <span className={`${base} bg-soon font-semibold text-soon-ink`}>{children}</span>
  if (tone === 'node') {
    const m = NODE_META[node ?? 'tamu']
    return (
      <span className={`${base} font-semibold ${m.bg} ${m.text}`}>
        <span className={`size-[6px] rounded-full ${m.dot}`} />
        {children ?? m.label}
      </span>
    )
  }
  if (tone === 'brand')
    return <span className={`${base} bg-white/14 px-2.5 font-bold tracking-eyebrow text-gold`}>{children}</span>
  return (
    <span className={`${base} font-semibold ${dark ? 'bg-white/14 text-white/80' : 'bg-canvas text-ink-3'}`}>
      {children}
    </span>
  )
}

/** Unread / count bubble pinned to an icon (tab bar, tiles). */
export function CountBadge({ count, className = '' }: { count: number | string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid h-[16px] min-w-[16px] place-items-center rounded-full bg-live-strong px-1 text-tab font-bold text-white ring-2 ring-white ${className}`}
    >
      {count}
    </span>
  )
}

export function LiveDot({ className = '' }: { className?: string }) {
  return <span className={`live-dot inline-block size-[7px] shrink-0 rounded-full bg-live ${className}`} />
}
