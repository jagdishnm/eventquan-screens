import type { ReactNode } from 'react'

/**
 * Concept 2 · The Map. The chrome every screen in this concept shares: the maroon header
 * shrinks to a capsule floating over the map, content rises in rounded sheets, and each
 * sheet opens on one condensed display title.
 *
 * Geometry, the same on all six screens: capsule 56pt tall at 56pt from the top, 12pt in
 * from each edge; the rail under it at 122pt; sheets in `rounded-t-sheet` with one grabber.
 */

/** The floating maroon capsule: the brief's header, lifted off the edge so the map runs under it. */
export function MapCapsule({
  children,
  tone = 'maroon',
  className = '',
}: {
  children: ReactNode
  /** `platform` before the campus skin is applied (sign in), `maroon` everywhere after. */
  tone?: 'maroon' | 'platform'
  className?: string
}) {
  return (
    <header
      className={`absolute inset-x-3 top-[56px] z-30 flex h-[56px] items-center gap-2.5 rounded-full pl-2 pr-1.5 text-white shadow-floating transition-colors duration-(--duration-slow) ease-(--ease-out-expo) motion-reduce:transition-none ${
        tone === 'maroon' ? 'bg-maroon' : 'bg-white/8 ring-1 ring-white/14 backdrop-blur-xl'
      } ${className}`}
    >
      {children}
    </header>
  )
}

/** The capsule's title block: what this screen is, then one line of context. */
export function CapsuleTitle({ title, meta, as: H = 'h1' }: { title: ReactNode; meta?: ReactNode; as?: 'h1' | 'div' }) {
  return (
    <div className="min-w-0 flex-1 leading-tight">
      <H className="truncate text-emphasis font-bold tracking-snug">{title}</H>
      {meta ? <p className="truncate text-meta text-white/70">{meta}</p> : null}
    </div>
  )
}

/** The floating row under the capsule: filter chips or map toggles, over the map. */
export function MapRail({ children, label, as: Tag = 'div' }: { children: ReactNode; label: string; as?: 'div' | 'nav' }) {
  return (
    <Tag
      role={Tag === 'div' ? 'group' : undefined}
      aria-label={label}
      className="no-scrollbar absolute inset-x-0 top-[122px] z-30 flex gap-2 overflow-x-auto px-3 py-1.5"
    >
      {children}
    </Tag>
  )
}

/** Lifts a light chip off the map. */
export function Lift({ children }: { children: ReactNode }) {
  return <span className="shrink-0 rounded-full shadow-floating">{children}</span>
}

/** Fades the top of a light map into the canvas so the dark status bar glyphs stay legible. */
export function MapScrim() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[124px] bg-linear-to-b from-canvas from-30% via-canvas/70 to-transparent"
    />
  )
}

/** The grabber at the top of a sheet. */
export function Grabber({ dark = false }: { dark?: boolean }) {
  return <div aria-hidden className={`mx-auto h-[5px] w-[38px] rounded-full ${dark ? 'bg-white/25' : 'bg-black/15'}`} />
}

/**
 * The one display moment on each sheet: the condensed face, uppercase italic, at hero scale
 * against 11–13pt body copy. A small kicker above names the context in spaced caps.
 */
export function SheetTitle({
  id,
  kicker,
  children,
  aside,
  dark = false,
  size = 'xl',
  as: H = 'h2',
}: {
  id: string
  kicker?: ReactNode
  children: ReactNode
  /** Sits on the title's baseline at the right, e.g. a count or a walk time. */
  aside?: ReactNode
  dark?: boolean
  /** `lg` steps down for long place names. */
  size?: 'xl' | 'lg'
  as?: 'h1' | 'h2'
}) {
  return (
    <div className="mt-2.5">
      {kicker ? (
        <p
          className={`flex items-center gap-1.5 text-micro font-bold uppercase tracking-caps ${dark ? 'text-gold' : 'text-ink-3'}`}
        >
          {kicker}
        </p>
      ) : null}
      <div className="mt-1 flex items-end justify-between gap-3">
        <H
          id={id}
          className={`min-w-0 font-display font-extrabold uppercase italic leading-[0.86] tracking-headline text-balance ${
            size === 'xl' ? 'text-display-xl' : 'text-display-lg'
          } ${dark ? 'text-white' : 'text-ink'}`}
        >
          {children}
        </H>
        {aside ? (
          <span className={`shrink-0 pb-1 text-right text-meta ${dark ? 'text-white/60' : 'text-ink-3'}`}>{aside}</span>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Feedback after an action, floating just above the sheet with its Undo. Place it inside a
 * MapSheet; it renders nothing until `show`, so a static frame stays clean.
 */
export function MapToast({
  show,
  children,
  onUndo,
  dark = false,
}: {
  show: boolean
  children: ReactNode
  onUndo: () => void
  dark?: boolean
}) {
  return (
    <div role="status" aria-live="polite" className="absolute inset-x-4 -top-[62px]">
      {show ? (
        <div
          className={`flex h-[50px] items-center gap-2.5 rounded-thumb pl-3.5 pr-1 text-control font-semibold shadow-floating ${
            dark ? 'bg-white text-ink' : 'bg-ink text-white'
          }`}
        >
          <span className="min-w-0 flex-1 truncate">{children}</span>
          <button
            type="button"
            onClick={onUndo}
            className={`h-[44px] shrink-0 rounded-well px-3 font-bold transition-transform duration-(--duration-quick) ease-(--ease-out-expo) active:scale-[0.96] motion-reduce:transition-none ${
              dark ? 'text-maroon' : 'text-gold'
            }`}
          >
            Undo
          </button>
        </div>
      ) : null}
    </div>
  )
}

/** A sheet over the map, anchored above the tab bar. */
export function MapSheet({
  children,
  labelledBy,
  dark = false,
  tabBar = true,
  flush = false,
  className = '',
}: {
  children: ReactNode
  labelledBy: string
  dark?: boolean
  /** Leaves room for the tab bar under the sheet. */
  tabBar?: boolean
  /** No side padding, for sheets with edge-to-edge carousels; children pad themselves. */
  flush?: boolean
  className?: string
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`absolute inset-x-0 bottom-0 z-20 rounded-t-sheet pt-2.5 shadow-overlay ${flush ? '' : 'px-4'} ${
        tabBar ? 'pb-[96px]' : 'pb-[34px]'
      } ${dark ? 'bg-night-2 text-white ring-1 ring-white/8' : 'bg-canvas'} ${className}`}
    >
      <Grabber dark={dark} />
      {children}
    </section>
  )
}
