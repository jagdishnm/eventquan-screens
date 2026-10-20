import { LocateFixed, Navigation } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from 'react'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { Kicker, Masthead } from '../PrintKit'

type Choice = 'unset' | 'once' | 'while' | 'denied'

/** Why the board wants location, set as a numbered notice. */
const WHY = [
  { title: 'Flyers near you', body: 'The MSC board sorts to what’s pinned within a mile of where you are.' },
  { title: 'Walk times to the gates', body: 'On game day, the quickest way in at Kyle Field.' },
  { title: 'Your spot stays yours', body: 'Friends see the place you’re at, never your exact location.' },
]

/**
 * Print state · Location, 9:43 AM Saturday, on the MSC board. Before iOS asks, a notice pinned to
 * the board says why location helps, in three numbered lines, and that "Not now" still shows every
 * flyer on campus. The system alert is drawn on top, as it appears after "Turn on location".
 */
export function PrintLocationPrompt() {
  const [choice, setChoice] = useState<Choice>('unset')
  const [alertOpen, setAlertOpen] = useState(true)
  /** Only move focus when Jordan opened the alert; the first frame is a still. */
  const [askedByTap, setAskedByTap] = useState(false)
  const on = choice === 'once' || choice === 'while'

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="Bulletin · College Station"
          dateline={
            <>
              <Kicker className="text-paper/80">{on ? 'Sorted near you' : 'Location off'}</Kicker>
              <Kicker className="text-gold">{on ? '4 within a mile' : 'All of campus shown'}</Kicker>
            </>
          }
        >
          <h1 className="text-center">
            <span className="block font-serif text-small italic text-paper/80">The</span>
            <span className="-mt-1 block font-poster text-display-xl font-black uppercase leading-[0.9] tracking-headline">
              MSC Board
            </span>
          </h1>
        </Masthead>

        {/* The notice, pinned to the board */}
        <section aria-labelledby="why-title" className="relative mx-4 mt-6">
          <span
            aria-hidden
            className="absolute -top-2.5 left-1/2 z-10 h-[18px] w-[76px] -translate-x-1/2 -rotate-[2deg] bg-gold/45"
          />
          <article className="-rotate-[0.6deg] bg-white px-4 pb-4 pt-5 shadow-floating">
            <Kicker className="text-maroon">{on ? 'Location on' : 'A notice from the board'}</Kicker>
            <h2
              id="why-title"
              className="mt-1 font-poster text-display-lg font-black uppercase leading-[0.92] text-balance text-maroon"
            >
              {on ? 'You’re on the board' : 'See what’s pinned near you'}
            </h2>
            <p className="mt-1.5 font-serif text-body leading-[1.45] text-ink-warm-2">
              {on
                ? 'Flyers near you now sort to the top. Change this anytime in Settings.'
                : 'EventQuan uses your location only while the app is open, for three things:'}
            </p>
            <ol className="mt-2.5 border-t border-ink-warm/15">
              {WHY.map((w, i) => (
                <li key={w.title} className="flex gap-3 border-b border-ink-warm/15 py-2">
                  <span className="w-[18px] shrink-0 font-poster text-title font-extrabold leading-none tabular text-maroon">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-slab text-card font-bold leading-tight">{w.title}</span>
                    <span className="block font-serif text-small leading-snug text-ink-warm-2">{w.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </article>
        </section>

        {on ? null : (
          <div className="px-4 pt-5">
            <Button
              size="lg"
              className="w-full"
              aria-haspopup="dialog"
              onClick={() => {
                setAskedByTap(true)
                setAlertOpen(true)
              }}
            >
              <LocateFixed size={18} strokeWidth={2.4} />
              Turn on location
            </Button>
            <Button variant="secondary" className="mt-2 w-full" onClick={() => setChoice('denied')}>
              Not now
            </Button>
            <p aria-live="polite" className="mt-2 text-center font-serif text-small italic text-ink-warm-2">
              {choice === 'denied'
                ? 'Location is off. You’ll see every flyer on campus; turn it on later in Settings.'
                : 'Not now still shows every flyer on campus.'}
            </p>
          </div>
        )}
      </ScrollBody>
      <TabBar active="events" />

      {alertOpen ? (
        <LocationAlert
          focusOnOpen={askedByTap}
          onChoose={(c) => {
            setChoice(c)
            setAlertOpen(false)
          }}
        />
      ) : null}
    </Screen>
  )
}

/**
 * The iOS location permission alert, drawn in tokens: system material, the map preview with
 * "Precise: On", and the three stacked choices in system blue. It stays iOS, not print.
 */
function LocationAlert({ onChoose, focusOnOpen }: { onChoose: (c: Choice) => void; focusOnOpen: boolean }) {
  const titleId = useId()
  const msgId = useId()
  const first = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (focusOnOpen) first.current?.focus({ preventScroll: true })
  }, [focusOnOpen])

  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-black/30">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={msgId}
        className="w-[270px] overflow-hidden rounded-thumb bg-canvas/90 text-center text-ink shadow-floating backdrop-blur-xl"
      >
        <div className="px-4 pb-3 pt-[19px]">
          <h2 id={titleId} className="text-emphasis font-semibold leading-snug tracking-snug">
            Allow “EventQuan” to use your location?
          </h2>
          <p id={msgId} className="mt-1 text-small leading-snug">
            EventQuan shows the flyers pinned near you on the MSC board and walk times to the gates. Friends see a
            place, never your exact spot.
          </p>
        </div>
        <MapPreview />
        <div className="flex flex-col">
          <AlertButton ref={first} onClick={() => onChoose('once')}>
            Allow Once
          </AlertButton>
          <AlertButton onClick={() => onChoose('while')}>Allow While Using App</AlertButton>
          <AlertButton onClick={() => onChoose('denied')}>Don’t Allow</AlertButton>
        </div>
      </div>
    </div>
  )
}

function AlertButton({
  children,
  onClick,
  ref,
}: {
  children: ReactNode
  onClick: () => void
  ref?: Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="h-[44px] border-t border-black/15 text-emphasis tracking-snug text-ios-blue transition-colors duration-(--duration-quick) ease-(--ease-out-expo) active:bg-black/8 motion-reduce:transition-none"
    >
      {children}
    </button>
  )
}

/** The small map in the alert: campus streets, the MSC, and you. */
function MapPreview() {
  return (
    <div aria-hidden className="relative h-[116px] overflow-hidden border-t border-black/15 bg-tint-neutral">
      <svg viewBox="0 0 270 116" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="270" height="116" className="fill-tint-neutral" />
        <rect x="24" y="14" width="64" height="36" rx="6" className="fill-tint-green" />
        <rect x="176" y="66" width="70" height="40" rx="6" className="fill-tint-green" />
        <path d="M0 58 H270 M136 0 V116 M0 102 L270 20" className="stroke-white" strokeWidth="7" />
        <path d="M0 58 H270 M136 0 V116" className="stroke-tint-amber" strokeWidth="3" />
        <rect
          x="150"
          y="18"
          width="44"
          height="28"
          rx="4"
          className="fill-maroon-soft stroke-maroon/40"
          strokeWidth="1.5"
        />
        <circle cx="128" cy="66" r="22" className="fill-ios-blue/15" />
      </svg>
      <span className="absolute left-[118px] top-[56px] grid size-[20px] place-items-center rounded-full bg-white shadow-raised">
        <span className="size-[14px] rounded-full bg-ios-blue" />
      </span>
      <span className="absolute left-[160px] top-[26px] text-micro font-semibold text-maroon">MSC</span>
      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-micro font-semibold text-ios-blue">
        <Navigation size={10} strokeWidth={3} className="fill-current" />
        Precise: On
      </span>
    </div>
  )
}
