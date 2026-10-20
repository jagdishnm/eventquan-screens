import { ChevronRight } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** Jordan's ring: four of the eight traditions done, matching the Profile ring. */
export const RING_DONE = 4
export const RING_TOTAL = 8

const C = 20
const R = 14

function seg(i: number, n: number) {
  const gap = 9
  const a0 = ((360 / n) * i + gap / 2 - 90) * (Math.PI / 180)
  const a1 = ((360 / n) * (i + 1) - gap / 2 - 90) * (Math.PI / 180)
  const p = (a: number) => `${(C + R * Math.cos(a)).toFixed(2)} ${(C + R * Math.sin(a)).toFixed(2)}`
  return `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`
}

/** Where the ring lives in full: the Profile ring (stage 7). */
export const RING_HREF = '/explore/profile-traditions'

/**
 * The small gold Aggie Ring that rides in every masthead: eight segments, one per tradition,
 * gold where done. A signet sits at the top so it reads as a ring, not a loader. `partial`
 * (0–1) inks the next segment part-way, so stamping on Kyle Field visibly fills the ring.
 */
export function RingMark({
  done = RING_DONE,
  total = RING_TOTAL,
  partial = 0,
  size = 30,
  surface = 'maroon',
  decorative = false,
}: {
  done?: number
  total?: number
  partial?: number
  size?: number
  surface?: 'maroon' | 'paper'
  /** Inside a control that already names it. */
  decorative?: boolean
}) {
  const off = surface === 'maroon' ? 'stroke-white/25' : 'stroke-ink-warm/20'
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `Aggie Ring: ${done} of ${total} traditions done`}
      className="shrink-0"
    >
      {Array.from({ length: total }).map((_, i) => (
        <path
          key={i}
          d={seg(i, total)}
          fill="none"
          strokeWidth={5}
          strokeLinecap="butt"
          className={i < done ? 'stroke-gold' : off}
        />
      ))}
      {done < total ? (
        <path
          d={seg(done, total)}
          fill="none"
          strokeWidth={5}
          strokeLinecap="butt"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - partial}
          className="stroke-gold transition-[stroke-dashoffset] duration-(--duration-base) ease-(--ease-out-expo) motion-reduce:transition-none"
        />
      ) : null}
      {/* Signet */}
      <rect x={13} y={0.5} width={14} height={9.5} rx={2.6} className="fill-gold" />
      <rect x={15.6} y={3} width={8.8} height={4.5} rx={1.2} className="fill-gold-dark" />
    </svg>
  )
}

/**
 * The ring count as a masthead ear: mark plus "4 of 8 traditions". It always sits at the right
 * end of the folio line, so the ring is in the same place on every page, and it opens the full
 * ring on Profile. On Profile itself it is the current page, so it is not a link.
 */
export function RingEar({
  done = RING_DONE,
  partial = 0,
  label = 'traditions',
  current = false,
}: {
  done?: number
  partial?: number
  label?: string
  current?: boolean
}) {
  // The count settles in only when it changes, never on page load.
  const [initial] = useState(done)
  const changed = done !== initial
  const name = `Aggie traditions, ${done} of ${RING_TOTAL} done`
  const body = (
    <>
      <RingMark done={done} partial={partial} decorative />
      <span className="font-mono text-meta font-semibold uppercase leading-tight tracking-eyebrow tabular text-paper/80">
        <span key={done} className={`block text-gold ${changed ? 'settle' : ''}`}>
          {done} of {RING_TOTAL}
        </span>
        {label}
      </span>
      {current ? null : <ChevronRight aria-hidden size={14} strokeWidth={2.4} className="-ml-1 text-paper/60" />}
    </>
  )
  const cls = 'flex h-[44px] shrink-0 items-center gap-2 rounded-tag'
  return current ? (
    <span role="img" aria-label={name} className={cls}>
      {body}
    </span>
  ) : (
    <Link to={RING_HREF} aria-label={`${name}. Open your ring`} className={`press ${cls}`}>
      {body}
    </Link>
  )
}

/** Mono small-caps label: datelines, kickers, folios. 12px, the smallest size the edition prints. */
export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-meta font-semibold uppercase tracking-eyebrow tabular ${className}`}>
      {children}
    </span>
  )
}

/**
 * The maroon masthead: a folio line with the ring ear, a double rule, the nameplate, and a
 * dateline between rules. Every Print screen starts here, with the same heights and rules, so
 * the app reads as one printed edition.
 */
export function Masthead({
  folio,
  ear,
  lead,
  children,
  dateline,
  className = '',
}: {
  /** Left of the folio line, e.g. "EventQuan · Vol. 4 · No. 7". */
  folio: ReactNode
  /** Right of the folio line; defaults to the ring ear. */
  ear?: ReactNode
  /** Leading control on the folio line, e.g. a back button. */
  lead?: ReactNode
  /** The nameplate block. Spacing comes from the masthead, not the caller. */
  children: ReactNode
  dateline?: ReactNode
  className?: string
}) {
  return (
    <header className={`paper-grain bg-maroon px-4 pt-[54px] text-paper ${className}`}>
      <div className="relative flex h-[52px] items-center gap-2 border-b border-paper/25 pb-2">
        {lead}
        <Kicker className="min-w-0 flex-1 truncate text-paper/80">{folio}</Kicker>
        {ear ?? <RingEar />}
      </div>
      <div className="relative mt-[3px] border-t border-paper/25" />
      <div className="relative pb-3 pt-3">{children}</div>
      {dateline ? (
        <div className="relative flex h-[36px] items-center justify-between gap-3 border-t border-paper/25">
          {dateline}
        </div>
      ) : null}
    </header>
  )
}

/** The poster nameplate inside a masthead: one size and leading on every screen. */
export function Nameplate({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={`font-poster text-masthead font-black uppercase leading-[0.84] tracking-headline text-balance ${className}`}
    >
      {children}
    </h1>
  )
}

/** A section head on paper: poster title over a heavy rule, optional mono aside. */
export function PrintHead({
  id,
  children,
  aside,
  className = '',
}: {
  id?: string
  children: ReactNode
  aside?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-end justify-between gap-3 border-b-2 border-ink-warm pb-1.5 ${className}`}>
      <h2
        id={id}
        className="font-poster text-display-sm font-extrabold uppercase leading-none text-balance text-ink-warm"
      >
        {children}
      </h2>
      {aside ? <Kicker className="shrink-0 pb-0.5 text-ink-warm-2">{aside}</Kicker> : null}
    </div>
  )
}
