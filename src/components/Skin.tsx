import { createContext, useContext, type ReactNode } from 'react'

/** The university skin a screen renders in. Texas A&M is the default. */
export type Skin = 'tamu' | 'lsu'

const SkinContext = createContext<Skin>('tamu')

export const useSkin = () => useContext(SkinContext)

/**
 * Renders its children in a university skin: the skin's class swaps the brand colour tokens
 * (see `.skin-lsu` in index.css) and the context swaps the university logo.
 */
export function SkinFrame({
  skin,
  className = 'w-max',
  children,
}: {
  skin: Skin
  /** Sizing for the wrapper: shrink-wrapped on the canvas, `contents` in the app. */
  className?: string
  children: ReactNode
}) {
  return (
    <SkinContext.Provider value={skin}>
      <div className={skin === 'tamu' ? className : `${className} skin-${skin}`}>{children}</div>
    </SkinContext.Provider>
  )
}

/** The skin asked for in the URL, e.g. `?skin=lsu`; Texas A&M otherwise. */
export const skinFromSearch = (search: string): Skin =>
  new URLSearchParams(search).get('skin') === 'lsu' ? 'lsu' : 'tamu'
