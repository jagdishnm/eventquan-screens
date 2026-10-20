/** Avatar fills: each holds white initials at ≥4.7:1. */
const FILLS = ['bg-avatar-1', 'bg-avatar-2', 'bg-avatar-3', 'bg-avatar-4', 'bg-avatar-5', 'bg-avatar-6'] as const
const INITIALS = ['JC', 'MR', 'AL', 'KT', 'DS', 'BN']

/** One person. `color` picks a fill from the avatar palette. */
export function Avatar({
  initials,
  size = 34,
  color = 2,
  className = '',
}: {
  initials: string
  size?: number
  color?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-bold text-white ${FILLS[color - 1]} ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
    >
      {initials}
    </span>
  )
}

const RING = { light: 'ring-white', canvas: 'ring-canvas', photo: 'ring-maroon-deep' } as const

/**
 * Friend avatar stack. Decorative: the count always appears in adjacent text, so it's hidden
 * from assistive tech. `surface` matches the ring to what the stack sits on.
 * One initial per face: two letters get clipped by the overlap ("JC" read as "J(").
 */
export function Faces({
  n = 3,
  size = 20,
  surface = 'light',
}: {
  n?: number
  size?: number
  surface?: keyof typeof RING
}) {
  return (
    <span className="flex" aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className={`grid place-items-center rounded-full font-semibold text-white ring-2 ${RING[surface]} ${FILLS[i % FILLS.length]}`}
          style={{ width: size, height: size, marginLeft: i ? -size * (size < 24 ? 0.22 : 0.26) : 0, fontSize: size * 0.46 }}
        >
          {INITIALS[i % INITIALS.length][0]}
        </span>
      ))}
    </span>
  )
}
