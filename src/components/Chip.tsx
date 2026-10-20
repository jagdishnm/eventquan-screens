import type { ReactNode } from 'react'

/**
 * Toggleable pill for filters, starters and invite groups. Always exposes aria-pressed
 * and a 44pt tall hit area, whatever its visual height.
 *
 * - `solid` (default): single-choice filters. Selected = filled.
 * - `soft`: multi-select groups. Selected = tinted with a check, so several can be on at once.
 * - `surface="onMaroon"` for chips inside the maroon header.
 */
export function Chip({
  children,
  selected,
  onClick,
  appearance = 'solid',
  surface = 'light',
  size = 'md',
  leading,
  label,
}: {
  children?: ReactNode
  selected: boolean
  onClick?: () => void
  appearance?: 'solid' | 'soft'
  surface?: 'light' | 'onMaroon'
  /** md 34px · lg 36px */
  size?: 'md' | 'lg'
  leading?: ReactNode
  /** Accessible name when the chip is icon-only. */
  label?: string
}) {
  const tone =
    surface === 'onMaroon'
      ? selected
        ? 'bg-white text-maroon'
        : 'bg-white/14 text-white'
      : appearance === 'soft'
        ? selected
          ? 'bg-maroon-soft text-maroon ring-1 ring-maroon/25'
          : 'bg-white text-ink-2 ring-1 ring-hairline'
        : selected
          ? 'bg-maroon text-white'
          : 'bg-white text-ink-2 ring-1 ring-hairline'
  const iconOnly = !children
  const pad = iconOnly ? 'w-[38px] justify-center' : leading ? 'pl-1.5 pr-3' : 'px-4'
  return (
    <button
      type="button"
      aria-pressed={label ? undefined : selected}
      aria-label={label}
      onClick={onClick}
      className={`press relative flex shrink-0 items-center gap-1.5 rounded-full text-control font-semibold transition-colors duration-(--duration-quick) after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-[''] ${
        size === 'lg' ? 'h-[36px]' : 'h-[34px]'
      } ${pad} ${tone}`}
    >
      {leading}
      {children}
    </button>
  )
}
