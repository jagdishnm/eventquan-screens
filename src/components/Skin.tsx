import { createContext, useContext, useRef, type ReactNode } from 'react'
import { LSU_PHRASES, type Phrases } from '../data/skins/lsu'
import { SkinCopy } from './SkinCopy'

/** The university skin a screen renders in. Texas A&M is the default. */
export type Skin = 'tamu' | 'lsu'

const SkinContext = createContext<Skin>('tamu')

/** Each skin's wording layer over the Texas A&M copy. Texas A&M itself has none. */
const SKIN_COPY: Partial<Record<Skin, Phrases>> = { lsu: LSU_PHRASES }

export const useSkin = () => useContext(SkinContext)

/**
 * Renders its children in a university skin: the skin's class swaps the brand colour tokens
 * (see `.skin-lsu` in index.css), the context swaps the university logo, and `SkinCopy` rewrites
 * the Texas A&M copy into the skin's wording (see `src/data/skins`). In the Texas A&M skin none of
 * that runs and the wrapper renders exactly as before.
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
  const ref = useRef<HTMLDivElement>(null)
  const copy = SKIN_COPY[skin]
  return (
    <SkinContext.Provider value={skin}>
      <div ref={ref} className={skin === 'tamu' ? className : `${className} skin-${skin}`} data-skin-copy={copy ? skin : undefined}>
        {children}
      </div>
      {copy && <SkinCopy root={ref} phrases={copy} />}
    </SkinContext.Provider>
  )
}

/** The skin asked for in the URL, e.g. `?skin=lsu`; Texas A&M otherwise. */
export const skinFromSearch = (search: string): Skin =>
  new URLSearchParams(search).get('skin') === 'lsu' ? 'lsu' : 'tamu'
