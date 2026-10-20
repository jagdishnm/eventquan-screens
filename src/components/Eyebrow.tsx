import type { ReactNode } from 'react'

export type EyebrowTone = 'maroon' | 'gold' | 'muted' | 'soon' | 'onDark' | 'category'

const TONE: Record<EyebrowTone, string> = {
  maroon: 'text-maroon',
  gold: 'text-gold',
  muted: 'text-ink-3',
  soon: 'text-soon-ink',
  onDark: 'text-white/75',
  category: '',
}

/**
 * Small caps label above a title: "TONIGHT · SEC FOOTBALL", "PICKED UP AUTOMATICALLY".
 * Pass `className` for category colors (CATEGORY_TONE) with tone="category".
 */
export function Eyebrow({
  children,
  tone = 'muted',
  className = '',
}: {
  children: ReactNode
  tone?: EyebrowTone
  className?: string
}) {
  return (
    <span className={`text-micro font-bold uppercase tracking-eyebrow ${TONE[tone]} ${className}`}>{children}</span>
  )
}
