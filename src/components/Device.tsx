import type { ReactNode } from 'react'

export const SCREEN_W = 393
export const SCREEN_H = 852

/**
 * One iPhone 15 Pro screen (393×852pt). At a phone-sized viewport it fills the
 * window exactly; on a larger window it's centred as a rounded device.
 */
export function Device({ children, bg = 'bg-canvas' }: { children: ReactNode; bg?: string }) {
  return (
    <div className="grid min-h-dvh items-start justify-items-start min-[560px]:place-items-center min-[560px]:py-10">
      <Screen
        bg={bg}
        className="min-[560px]:rounded-[55px] min-[560px]:shadow-[0_0_0_10px_#0b0b0d,0_30px_80px_rgba(0,0,0,0.5)]"
      >
        {children}
      </Screen>
    </div>
  )
}

export function Screen({
  children,
  bg = 'bg-canvas',
  className = '',
}: {
  children: ReactNode
  bg?: string
  className?: string
}) {
  return (
    <div
      className={`relative isolate overflow-hidden text-ink ${bg} ${className}`}
      style={{ width: `min(${SCREEN_W}px, 100vw)`, height: SCREEN_H }}
    >
      {children}
    </div>
  )
}

/** Scrollable body that clears the tab bar. */
export function ScrollBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <main className={`no-scrollbar absolute inset-0 overflow-y-auto pb-[110px] ${className}`}>{children}</main>
}
