import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { Link } from 'react-router-dom'
import { NODE_META, type Node } from '../data/events'

/** The gold primary action. Appears once per screen, per the founder's boards. */
export function GoldButton({
  children,
  className = '',
  size = 'md',
  as = 'button',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>
  size?: 'sm' | 'md' | 'lg'
  /** `span` when the button sits inside a link or card that already does the action: one control, one tab stop. */
  as?: 'button' | 'span'
}) {
  const s =
    size === 'lg'
      ? 'h-[54px] px-6 text-[17px] rounded-[16px]'
      : size === 'sm'
        ? 'h-[34px] px-3.5 text-[14px] rounded-[11px]'
        : 'h-[44px] px-5 text-[15px] rounded-[13px]'
  const cls = `inline-flex items-center justify-center gap-2 bg-gold font-semibold tracking-[-0.1px] text-gold-ink shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] transition-[transform,background-color] duration-[260ms] ease-(--ease-out-expo) active:scale-[0.97] active:bg-gold-press ${s} ${className}`
  if (as === 'span') return <span className={cls}>{children}</span>
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}

export function LiveDot({ className = '' }: { className?: string }) {
  return <span className={`live-dot inline-block size-[7px] shrink-0 rounded-full bg-live ${className}`} />
}

/**
 * The one "live" badge. Same shape and type everywhere; only the surface changes:
 * `light` on white cards (tinted), `dark` over photos and dark screens (solid).
 */
export function LivePill({ label, tone = 'light' }: { label?: string; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={`inline-flex h-[22px] shrink-0 items-center gap-1.5 rounded-full px-2 text-[11px] font-bold tracking-[0.4px] ${
        tone === 'light' ? 'bg-live/10 text-[#c4231e]' : 'bg-live-strong text-white'
      }`}
    >
      <span className={`live-dot size-[6px] rounded-full ${tone === 'light' ? 'bg-live' : 'bg-white'}`} />
      LIVE{label ? <span className="font-semibold tracking-normal">· {label}</span> : null}
    </span>
  )
}

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

export function NodeTag({ node, className = '' }: { node: Node; className?: string }) {
  const m = NODE_META[node]
  return (
    <span
      className={`inline-flex h-[20px] items-center gap-1 rounded-full px-2 text-[11px] font-semibold ${m.bg} ${m.text} ${className}`}
    >
      <span className={`size-[6px] rounded-full ${m.dot}`} />
      {m.label}
    </span>
  )
}

const FACES = ['#7a2b2b', '#9a6a2c', '#2f5d8a', '#38704f', '#7f4e93', '#a24a32']
const INITIALS = ['JC', 'MR', 'AL', 'KT', 'DS', 'BN']

/** Friend avatar stack. Initials stand in for profile photos. */
export function Faces({ n = 3, size = 20, ring = 'ring-white' }: { n?: number; size?: number; ring?: string }) {
  return (
    <span className="flex" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className={`grid place-items-center rounded-full font-semibold text-white ring-2 ${ring}`}
          style={{
            width: size,
            height: size,
            marginLeft: i ? -size * 0.32 : 0,
            background: FACES[i % FACES.length],
            fontSize: size * 0.4,
          }}
        >
          {INITIALS[i % INITIALS.length]}
        </span>
      ))}
    </span>
  )
}

export function SectionHeader({
  title,
  action,
  meta,
  dark,
}: {
  title: ReactNode
  action?: string
  meta?: ReactNode
  dark?: boolean
}) {
  return (
    <div className="mb-2.5 flex items-end justify-between px-4">
      <div className="flex items-baseline gap-2">
        <h2 className={`text-[20px] font-bold tracking-[-0.4px] ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
        {meta ? <span className={`text-[13px] ${dark ? 'text-white/50' : 'text-ink-3'}`}>{meta}</span> : null}
      </div>
      {action ? (
        <button type="button" className={`text-[14px] font-semibold ${dark ? 'text-gold' : 'text-maroon'}`}>
          {action}
        </button>
      ) : null}
    </div>
  )
}
