import { Bell, EyeOff, Footprints, Lock, LocateFixed, Navigation, UsersRound } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from 'react'
import { Avatar } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { AggieMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { IconButton } from '../../../../components/ui'
import { ScoreboardHeader } from '../ScoreboardHeader'
import { StateScoreboard } from './StateScoreboard'

/** Aggies checked in across B–CS, every 15 minutes since 6:00 AM. The same morning as Home. */
const MORNING = [9, 10, 12, 13, 15, 17, 20, 22, 25, 29, 33, 38, 43, 48, 52, 57, 62, 68, 74, 80, 86, 93, 100]

type Choice = 'unset' | 'once' | 'while' | 'denied'

const WHY: { Icon: typeof Footprints; title: string; body: string }[] = [
  { Icon: UsersRound, title: 'Who’s near you', body: 'How many Aggies are within a 10-minute walk.' },
  { Icon: Footprints, title: 'Walk times and gate lines', body: 'The quickest way in at Kyle Field on game day.' },
  { Icon: EyeOff, title: 'Your spot stays yours', body: 'Friends see the place you’re at, never your exact location.' },
]

function HeaderLeft() {
  return (
    <>
      <AggieMark size={32} />
      <span className="leading-tight">
        <span className="block text-micro font-bold tracking-caps">HOWDY, JORDAN</span>
        <span className="block text-micro text-white/60">72° · Gameday</span>
      </span>
    </>
  )
}

function HeaderRight() {
  return (
    <>
      <IconButton label="Notifications">
        <Bell size={19} />
      </IconButton>
      <button type="button" aria-label="Profile" className="press -m-1 grid size-[44px] place-items-center">
        <Avatar initials="JC" size={36} className="ring-2 ring-white/25" />
      </button>
    </>
  )
}

/**
 * State · Location, 9:40 AM Saturday. Before iOS asks, the app says why it wants location. The
 * "near you" numeral is drawn as unlit scoreboard cells, because without location we don't know it,
 * while the campus-wide splits stay live, so "Not now" is a real choice. The system alert is drawn
 * on top, as it appears after "Turn on location".
 */
export function LiveLocationPrompt() {
  const [choice, setChoice] = useState<Choice>('unset')
  const [alertOpen, setAlertOpen] = useState(true)
  /** Only move focus when Jordan opened the alert; the first frame is a still. */
  const [askedByTap, setAskedByTap] = useState(false)
  const on = choice === 'once' || choice === 'while'

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        {on ? (
          <ScoreboardHeader
            count={1240}
            tick={false}
            unit={['Aggies', 'near you']}
            aside="within a 10-min walk"
            kicker="SAT 9:40 AM · NEAR YOU"
            left={<HeaderLeft />}
            right={<HeaderRight />}
            pulse={MORNING}
            trend="+160 near you since 9 AM"
          />
        ) : (
          <StateScoreboard
            state="locked"
            label="LOCATION OFF"
            kicker="SAT 9:40 AM · NEAR YOU"
            value="8,888"
            srValue="Aggies near you: hidden until location is on. 12,418 Aggies are out across Bryan–College Station."
            unit={['Aggies', 'near you']}
            aside="within a 10-min walk"
            badge={
              <span className="flex items-center gap-1.5 rounded-full bg-maroon-deep px-2.5 py-1 text-meta font-semibold text-white ring-1 ring-white/20">
                <Lock aria-hidden size={12} strokeWidth={2.6} className="text-gold" />
                Hidden until location is on
              </span>
            }
            left={<HeaderLeft />}
            right={<HeaderRight />}
            pulse={MORNING}
            trend={
              <>
                <span className="size-[6px] shrink-0 rounded-full bg-gold" />
                12,418 Aggies out across B–CS
              </>
            }
            updated="Campus-wide is live"
          />
        )}

        <section aria-labelledby="why-title" className="px-4 pt-4">
          <h2 id="why-title" className="text-title font-bold tracking-title">
            {on ? 'You’re on the board' : 'See the crowd around you'}
          </h2>
          <p className="mt-0.5 text-small text-ink-2">
            {on
              ? 'Counts near you update while EventQuan is open. Change this anytime in Settings.'
              : 'EventQuan uses your location while the app is open, for three things:'}
          </p>

          <ul className="mt-3 overflow-hidden rounded-card bg-white shadow-raised">
            {WHY.map(({ Icon, title, body }) => (
              <li key={title} className="flex items-center gap-3 border-b border-hairline px-3 py-2.5 last:border-b-0">
                <span className="grid size-[36px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                  <Icon aria-hidden size={18} strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-body font-semibold tracking-snug">{title}</span>
                  <span className="block text-meta text-ink-3">{body}</span>
                </span>
              </li>
            ))}
          </ul>

          {on ? null : (
            <>
              <Button
                size="lg"
                className="mt-4 w-full"
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
              <p aria-live="polite" className="mt-2 text-center text-meta text-ink-3">
                {choice === 'denied'
                  ? 'Location is off. You’ll see campus-wide counts; turn it on later in Settings.'
                  : 'Not now still shows campus-wide counts.'}
              </p>
            </>
          )}
        </section>
      </ScrollBody>
      <TabBar active="home" />

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
 * "Precise: On", and the three stacked choices in system blue.
 */
function LocationAlert({ onChoose, focusOnOpen }: { onChoose: (c: Choice) => void; focusOnOpen: boolean }) {
  const titleId = useId()
  const msgId = useId()
  const first = useRef<HTMLButtonElement>(null)
  // Move focus into the alert when it opens from a tap, as iOS does
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
            EventQuan counts the Aggies near you and points you to the shortest gate line. Friends see a place, never
            your exact spot.
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
      className="h-[44px] border-t border-black/15 text-emphasis tracking-snug text-ios-blue transition-colors duration-(--duration-quick) active:bg-black/8"
    >
      {children}
    </button>
  )
}

/** The small map in the alert: campus streets, Kyle Field, and you. */
function MapPreview() {
  return (
    <div aria-hidden className="relative h-[124px] overflow-hidden border-t border-black/15 bg-tint-green">
      <svg viewBox="0 0 270 124" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="270" height="124" className="fill-tint-neutral" />
        <rect x="150" y="16" width="70" height="44" rx="6" className="fill-tint-green" />
        <rect x="20" y="70" width="60" height="40" rx="6" className="fill-tint-green" />
        <path d="M0 62 H270 M120 0 V124 M0 18 L270 100 M200 0 V124" className="stroke-white" strokeWidth="7" />
        <path d="M0 62 H270 M120 0 V124" className="stroke-tint-amber" strokeWidth="3" />
        <ellipse cx="185" cy="38" rx="20" ry="14" className="fill-maroon-soft stroke-maroon/40" strokeWidth="1.5" />
        <circle cx="128" cy="68" r="22" className="fill-ios-blue/15" />
      </svg>
      <span className="absolute left-[118px] top-[58px] grid size-[20px] place-items-center rounded-full bg-white shadow-raised">
        <span className="size-[14px] rounded-full bg-ios-blue" />
      </span>
      <span className="absolute left-[166px] top-[56px] text-tab font-semibold text-maroon">Kyle Field</span>
      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-micro font-semibold text-ios-blue">
        <Navigation size={10} strokeWidth={3} className="fill-current" />
        Precise: On
      </span>
    </div>
  )
}
