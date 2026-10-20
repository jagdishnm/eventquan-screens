import type { ButtonHTMLAttributes, Ref } from 'react'

type Variant = 'primary' | 'secondary' | 'tonal'
type Size = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>
  /**
   * `primary` is the gold action: one per screen, per the founder's boards.
   * `secondary` sits beside it on light surfaces; `tonal` beside it on maroon, photo or dark screens.
   */
  variant?: Variant
  size?: Size
  /** Shows a spinner, sets aria-busy and blocks presses. */
  loading?: boolean
  /** `span` when the button sits inside a link or card that already does the action: one control, one tab stop. */
  as?: 'button' | 'span'
}

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-gold text-gold-ink shadow-control active:bg-gold-press disabled:bg-disabled disabled:text-ink-3 disabled:shadow-none',
  secondary: 'bg-white text-ink ring-1 ring-hairline active:bg-press disabled:text-ink-3',
  tonal: 'bg-white/14 text-white ring-1 ring-white/14 active:bg-white/25 disabled:text-white/60',
}

const SIZE: Record<Size, string> = {
  sm: 'h-[34px] px-3.5 text-control rounded-well',
  md: 'h-[44px] px-5 text-body rounded-thumb',
  lg: 'h-[54px] px-6 text-emphasis rounded-thumb',
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  as = 'button',
  disabled,
  ...rest
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 font-semibold tracking-snug transition-[transform,background-color] duration-(--duration-quick) ease-(--ease-out-expo) active:scale-[0.97] disabled:active:scale-100 ${VARIANT[variant]} ${SIZE[size]} ${className}`
  const body = loading ? (
    <>
      <span
        aria-hidden
        className="size-[16px] animate-spin rounded-full border-2 border-current border-r-transparent opacity-70"
      />
      {children}
    </>
  ) : (
    children
  )
  if (as === 'span') return <span className={cls}>{body}</span>
  return (
    <button type="button" className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {body}
    </button>
  )
}
