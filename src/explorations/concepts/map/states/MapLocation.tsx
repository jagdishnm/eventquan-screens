import { EyeOff, Footprints, LocateFixed, Navigation, UsersRound } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from 'react'
import { Avatar } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen } from '../../../../components/Device'
import { AggieMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { CAMPUS_PINS, CampusMap, YOU_AT } from '../../../CampusMap'
import { CapsuleTitle, MapCapsule, MapScrim, MapSheet, SheetTitle } from '../MapChrome'

type Choice = 'unset' | 'once' | 'while' | 'denied'

const PINS = CAMPUS_PINS.filter((p) => ['msc', 'market', 'kyle', 'tailgate', 'bryan'].includes(p.id)).map((p) =>
  p.id === 'kyle' ? { ...p, label: 'A&M vs LSU', detail: undefined } : { ...p, detail: undefined },
)

const WHY: { Icon: typeof Footprints; title: string; body: string }[] = [
  { Icon: Footprints, title: 'Walking times', body: '“12 min to Kyle Field”, and the quickest gate.' },
  { Icon: UsersRound, title: 'What’s near you', body: 'Events within a 10-minute walk, first.' },
  { Icon: EyeOff, title: 'Your spot stays yours', body: 'Friends see a place, never your exact dot.' },
]

/** Where the blue dot would be: an empty, dashed ring with a question, drawn in map coordinates. */
function MissingDot() {
  return (
    <span aria-hidden className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={YOU_AT}>
      <span className="grid size-[44px] place-items-center rounded-full border-2 border-dashed border-tint-sky-ink/60 bg-white/70 font-display text-title font-bold text-tint-sky-ink">
        ?
      </span>
      <span className="absolute left-1/2 top-[50px] -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-micro font-bold text-tint-sky-ink shadow-floating">
        You?
      </span>
    </span>
  )
}

/**
 * Map · State · Before the location prompt, 9:40 AM Saturday. The map is all there, every pin in
 * its node colour, but the blue dot is missing: a dashed ring asks "You?". The sheet says plainly
 * what location buys (walking times, what's near you) and that friends never see the exact dot.
 * The iOS alert is drawn on top, as it appears after "Turn on location".
 */
export function MapLocation() {
  const [choice, setChoice] = useState<Choice>('unset')
  const [alertOpen, setAlertOpen] = useState(true)
  /** Focus moves into the alert only when Jordan opened it; the first frame is a still. */
  const [askedByTap, setAskedByTap] = useState(false)
  const on = choice === 'once' || choice === 'while'

  return (
    <Screen>
      <CampusMap shift={-20} pins={PINS} you={on} overlay={on ? null : <MissingDot />} />
      <MapScrim />
      <StatusBar tone="dark" />

      <MapCapsule>
        <AggieMark size={40} />
        <CapsuleTitle title="Howdy, Jordan" meta={on ? 'Home · 72° Sunny' : 'Home · Location off'} />
        <button
          type="button"
          aria-label="Profile"
          className="press grid size-[44px] shrink-0 place-items-center rounded-full"
        >
          <Avatar initials="JC" size={36} color={1} className="ring-2 ring-white/25" />
        </button>
      </MapCapsule>

      <MapSheet labelledBy="loc-title">
        <SheetTitle
          id="loc-title"
          kicker={
            <>
              <span
                aria-hidden
                className={`size-[8px] rounded-full ${on ? 'bg-tint-sky-ink' : 'border border-dashed border-ink-3'}`}
              />
              {on ? 'Location on · while using' : 'Sat 9:40 AM · Location off'}
            </>
          }
        >
          {on ? 'You’re on the map' : 'Where are you?'}
        </SheetTitle>
        <p className="mt-1.5 text-small text-ink-2">
          {on
            ? 'Walking times and “near you” are on. Change it anytime in Settings.'
            : 'Every event is on the map. With your location, EventQuan can also show:'}
        </p>

        <ul className="mt-2.5 overflow-hidden rounded-card bg-white shadow-raised">
          {WHY.map(({ Icon, title, body }) => (
            <li key={title} className="flex items-center gap-3 border-b border-hairline px-3 py-2 last:border-b-0">
              <span className="grid size-[34px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                <Icon aria-hidden size={17} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-control font-semibold tracking-snug">{title}</span>
                <span className="block truncate text-meta text-ink-3">{body}</span>
              </span>
            </li>
          ))}
        </ul>

        {on ? null : (
          <div className="mt-3 flex items-center gap-2">
            <Button
              className="flex-1"
              aria-haspopup="dialog"
              onClick={() => {
                setAskedByTap(true)
                setAlertOpen(true)
              }}
            >
              <LocateFixed size={17} strokeWidth={2.4} /> Turn on location
            </Button>
            <button
              type="button"
              onClick={() => setChoice('denied')}
              className="flex h-[44px] shrink-0 items-center rounded-well px-2 text-control font-semibold text-maroon"
            >
              Not now
            </button>
          </div>
        )}
        <p aria-live="polite" className="mt-1.5 text-meta text-ink-3">
          {choice === 'denied'
            ? 'Location is off. Every event still shows; walking times stay hidden.'
            : on
              ? null
              : '“Not now” still shows every event, without walking times.'}
        </p>
      </MapSheet>

      <TabBar active="home" />

      {alertOpen && !on ? (
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
 * The iOS location permission alert, drawn in tokens: system material, a map preview with
 * "Precise: On", and three stacked choices in system blue.
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
            EventQuan shows walking times and what’s happening near you. Friends see a place, never your exact spot.
          </p>
        </div>
        <AlertMap />
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

function AlertButton({ children, onClick, ref }: { children: ReactNode; onClick: () => void; ref?: Ref<HTMLButtonElement> }) {
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

/** The alert's map preview: the same warm campus, Kyle Field's bowl, and the dot iOS would place. */
function AlertMap() {
  return (
    <div aria-hidden className="relative h-[124px] overflow-hidden border-t border-black/15">
      <svg viewBox="0 0 270 124" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="270" height="124" className="fill-paper" />
        <rect x="70" y="0" width="140" height="124" className="fill-maroon-soft" />
        <rect x="210" y="0" width="60" height="60" className="fill-cstat-soft" />
        <path d="M0 62 H270 M68 0 V124 M212 0 V124" className="stroke-white" strokeWidth="8" />
        <rect x="150" y="70" width="46" height="38" rx="18" className="fill-maroon" />
        <rect x="164" y="78" width="18" height="22" rx="2" className="fill-field" />
        <circle cx="112" cy="62" r="24" className="fill-ios-blue/15" />
      </svg>
      <span className="absolute left-[102px] top-[52px] grid size-[20px] place-items-center rounded-full bg-white shadow-raised">
        <span className="size-[14px] rounded-full bg-ios-blue" />
      </span>
      <span className="absolute left-[146px] top-[48px] text-tab font-semibold text-maroon">Kyle Field</span>
      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-micro font-semibold text-ios-blue">
        <Navigation size={10} strokeWidth={3} className="fill-current" />
        Precise: On
      </span>
    </div>
  )
}
