import type { ReactNode } from 'react'

/**
 * A full-width row that toggles. The whole row is the control (44pt tall, role="switch"),
 * the track on the right shows the state.
 */
export function SwitchRow({
  checked,
  onChange,
  label,
  children,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  /** Accessible name, e.g. "Show events from Bryan". */
  label: string
  /** Visible row content. */
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="flex min-h-[44px] w-full items-center gap-3 rounded-well text-left"
    >
      <span className="flex min-w-0 flex-1 items-center gap-3">{children}</span>
      <span
        aria-hidden
        className={`relative h-[24px] w-[40px] shrink-0 rounded-full transition-colors duration-(--duration-quick) ${checked ? 'bg-ok' : 'bg-white/25'}`}
      >
        <span
          className={`absolute top-[2px] size-[20px] rounded-full bg-white shadow transition-[left] duration-(--duration-quick) ease-(--ease-out-expo) ${checked ? 'left-[18px]' : 'left-[2px]'}`}
        />
      </span>
    </button>
  )
}
