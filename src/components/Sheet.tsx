import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Bottom sheet, modal. On open it focuses the element marked `data-autofocus` (or the panel),
 * closes on Escape and on backdrop tap. The caller makes the content behind it `inert` and
 * returns focus to the control that opened it.
 */
export function Sheet({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
}: {
  open: boolean
  onClose: () => void
  labelledBy: string
  describedBy?: string
  children: ReactNode
}) {
  const panel = useRef<HTMLDivElement>(null)
  const close = useRef(onClose)
  useEffect(() => {
    close.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const target = panel.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panel.current
    target?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close.current()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop: tap to dismiss. Keyboard users close with Escape, so it isn't a tab stop. */}
      <div aria-hidden onClick={onClose} className="rise absolute inset-0 bg-black/45" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className="rise relative rounded-t-sheet bg-canvas px-4 pb-[42px] pt-2.5 shadow-overlay"
      >
        <div aria-hidden className="mx-auto h-[5px] w-[38px] rounded-full bg-black/15" />
        {children}
      </div>
    </div>
  )
}
