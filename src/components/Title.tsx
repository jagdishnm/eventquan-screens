import { useEffect, type ReactNode } from 'react'

/** Sets a descriptive document title per screen (WCAG 2.4.2), then renders the screen. */
export function Title({ name, children }: { name: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${name} · EventQuan`
  }, [name])
  return <>{children}</>
}
