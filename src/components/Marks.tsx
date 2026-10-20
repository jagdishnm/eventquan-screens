type MarkProps = { size?: number; className?: string }

/** Texas A&M block mark. A simplified type mark standing in for the licensed logo. */
export function AggieMark({ size = 32, className = '' }: MarkProps) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[22%] bg-maroon font-slab font-bold leading-none text-white ring-1 ring-white/25 ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36, letterSpacing: -0.2 }}
      role="img"
      aria-label="Texas A&M"
    >
      A&amp;M
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
      className="relative shrink-0 overflow-hidden rounded-[14px]"
      style={{ width: size, height: size }}
      role="img"
      aria-label="Texas A&M vs LSU"
    >
      <div className="absolute inset-0 bg-maroon" style={{ clipPath: 'polygon(0 0,100% 0,0 100%)' }} />
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
