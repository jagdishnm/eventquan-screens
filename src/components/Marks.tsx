import { useSkin } from './Skin'

type MarkProps = { size?: number; className?: string }

/**
 * The university's mark. In the Texas A&M skin it is the A&M block mark (a simplified type mark
 * standing in for the licensed logo); in another skin it becomes that school's mark. Pass `team`
 * where it stands for Texas A&M the football team (a scoreboard, the team's own account), so the
 * matchup keeps the real team whatever the skin is.
 */
export function AggieMark({ size = 32, className = '', team = false }: MarkProps & { team?: boolean }) {
  const skin = useSkin()
  if (skin === 'lsu' && !team) return <LsuWordmark size={size} className={className} />
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[22%] font-slab font-bold leading-none text-white ring-1 ring-white/25 ${
        team ? 'bg-tamu' : 'bg-maroon'
      } ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36, letterSpacing: -0.2 }}
      role="img"
      aria-label="Texas A&M"
    >
      A&amp;M
    </span>
  )
}

/** LSU's university mark: the three-letter LSU wordmark from lsu.edu in gold on purple. */
export function LsuWordmark({ size = 32, className = '' }: MarkProps) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[22%] bg-maroon ring-1 ring-white/25 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Louisiana State University"
    >
      <svg viewBox="0 0 200.1 66.3" width={size * 0.74} aria-hidden className="fill-gold">
        <path d="M127.7,49.5v-23H83.6v-6.5c0-2.9,3.2-5.2,7-5.2h37V2.4h-47c-10,0-18.2,6.1-18.2,13.5v22.9h44.1v6.6c0,2.9-3.2,5.2-7.1,5.2h-37V63h46.9C119.5,63,127.7,56.9,127.7,49.5z" />
        <polygon points="57.5,50.7 23.9,50.7 23.9,2.4 3,2.4 3,63 57.5,63" />
        <path d="M197.6,49.5V2.4h-21v43c0,3-3.2,5.3-7.1,5.3h-16.1V2.5h-20.8V63h46.8C189.4,63,197.6,56.9,197.6,49.5z" />
      </svg>
    </span>
  )
}

export function LsuMark({ size = 32, className = '' }: MarkProps) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[22%] bg-lsu font-display font-extrabold italic leading-none text-lsu-gold ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      role="img"
      aria-label="LSU"
    >
      LSU
    </span>
  )
}

/** EventQuan "EQ" brand mark (platform level, shown before a university skin is applied). */
export function EqMark({ size = 40, className = '' }: MarkProps) {
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center rounded-full bg-gold font-display font-extrabold italic text-gold-ink ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.48 }}
      role="img"
      aria-label="EventQuan"
    >
      EQ
    </span>
  )
}

/** Square split thumbnail for a matchup, used in event cards. */
export function MatchupThumb({ size = 76 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-thumb"
      style={{ width: size, height: size }}
      role="img"
      aria-label="Texas A&M vs LSU"
    >
      <div className="absolute inset-0 bg-tamu" style={{ clipPath: 'polygon(0 0,100% 0,0 100%)' }} />
      <div className="absolute inset-0 bg-lsu" style={{ clipPath: 'polygon(100% 0,100% 100%,0 100%)' }} />
      <span className="absolute left-[9%] top-[12%] font-slab font-bold text-white" style={{ fontSize: size * 0.24 }}>
        A&amp;M
      </span>
      <span
        className="absolute bottom-[10%] right-[9%] font-display font-extrabold italic text-lsu-gold"
        style={{ fontSize: size * 0.27 }}
      >
        LSU
      </span>
    </div>
  )
}
