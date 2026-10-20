import { Bell, EyeOff, Footprints, LocateFixed, Navigation, Timer } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from 'react'
import { Avatar } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { AggieMark, MatchupThumb } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { IconButton } from '../../../../components/ui'
import { BigTime, OnRail, TimeRail } from '../Rail'
import { clock, timeScale } from '../time'

/** Saturday, 9:41 AM: the same morning as Home. */
const NOW = 9 + 41 / 60

const y = timeScale([
  [9.5, 8],
  [10, 64],
  [15.75, 128],
  [18, 192],
  [18.4, 214],
])

type Choice = 'unset' | 'once' | 'while' | 'denied'

/** What a walk time would say, once we know where you are. */
const SHEETS = [
  { id: 'tailgate', h: 10, title: 'Tailgate Zone — Lot C', place: 'Kyle Field', img: '/img/kyle-field-stands.jpg', walk: 14 },
  { id: 'march', h: 15.75, title: 'Corps March-In', place: 'Quad → Kyle Field', img: '/img/aggie-band.jpg', walk: 9 },
  { id: 'game', h: 18, title: 'A&M vs LSU · Kickoff', place: 'Kyle Field · Sec 125', walk: 14 },
]

const WHY: { Icon: typeof Footprints; title: string; body: string }[] = [
  { Icon: Timer, title: 'When to leave', body: 'A “leave by” time on every sheet on your straw.' },
  { Icon: Footprints, title: 'Walking times on your Saturday', body: 'From wherever you are to the next thing.' },
  { Icon: EyeOff, title: 'Your spot stays yours', body: 'Friends see the place you’re at, never your exact spot.' },
]

/**
 * State · Before the location prompt, 9:41 AM Saturday. The straw explains itself before iOS asks:
 * every sheet has a "leave by" slot drawn empty, because without location we can't work out the
 * walk, and the system alert sits on top as it appears after "Turn on location". Not now keeps the
 * whole day working, just without walk times.
 */
export function DayLocation() {
  const [choice, setChoice] = useState<Choice>('unset')
  const [alertOpen, setAlertOpen] = useState(true)
  /** Only move focus when the alert was opened by a tap; the first frame is a still. */
  const [askedByTap, setAskedByTap] = useState(false)
  const on = choice === 'once' || choice === 'while'

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-4 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center gap-1">
            <span className="ml-1 flex min-w-0 flex-1 items-center gap-2">
              <AggieMark size={28} />
              <span className="truncate text-small font-semibold text-white/80">Texas A&amp;M · Sat, Oct 12</span>
            </span>
            <IconButton label="Notifications">
              <Bell size={18} />
            </IconButton>
            <button type="button" aria-label="Profile" className="press grid size-[44px] place-items-center">
              <Avatar initials="JC" size={32} className="ring-2 ring-white/25" />
            </button>
          </div>
          <h1 className="sr-only">Turn on location for walking times</h1>
          <div className="mt-3">
            <BigTime
              kicker={on ? 'GOOD MORNING, JORDAN' : 'WALK TIMES NEED YOUR LOCATION'}
              value="9:41"
              unit="AM"
              label="9:41 AM, Saturday"
              caption={
                on ? (
                  <>
                    Leave by <b className="font-semibold text-white">9:46</b> for the tailgate · 14 min walk
                  </>
                ) : (
                  <>Your straw knows when. Location adds the walk.</>
                )
              }
            />
          </div>
        </header>

        <section aria-labelledby="loc-straw" className="pt-3">
          <h2 id="loc-straw" className="px-4 text-micro font-bold tracking-caps text-maroon">
            YOUR STRAW · WITH WALK TIMES
          </h2>
          <div className="mt-1">
            <TimeRail
              y={y}
              from={9.5}
              to={18.4}
              now={NOW}
              folds={[{ from: 10.3, to: 15.5 }]}
              marks={SHEETS.map((s) => ({ h: s.h }))}
              label="Your Saturday"
            >
              {SHEETS.map((s) => (
                <OnRail key={s.id} y={y(s.h)} pierce="gold">
                  <div className="flex h-[52px] items-center gap-2.5 rounded-thumb bg-white pl-1.5 pr-2 shadow-raised">
                    {s.img ? (
                      <img src={s.img} alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
                    ) : (
                      <MatchupThumb size={40} />
                    )}
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-control font-semibold tracking-snug">{s.title}</span>
                      <span className="block truncate text-meta text-ink-3">
                        {s.place} · {clock(s.h)}
                      </span>
                    </span>
                    {/* The leave-by slot: empty and dashed until location is on */}
                    {on ? (
                      <span className="shrink-0 rounded-tag bg-maroon-soft px-1.5 py-1 text-center leading-none text-maroon">
                        <span className="block text-tab font-bold tracking-eyebrow">WALK</span>
                        <span className="block font-display text-card font-bold tabular">{s.walk}m</span>
                      </span>
                    ) : (
                      <span
                        aria-label="Walk time needs location"
                        className="shrink-0 rounded-tag border border-dashed border-hairline-strong px-1.5 py-1 text-center leading-none text-ink-3"
                      >
                        <span className="block text-tab font-bold tracking-eyebrow">WALK</span>
                        <span className="block font-display text-card font-bold">—</span>
                      </span>
                    )}
                  </div>
                </OnRail>
              ))}
            </TimeRail>
          </div>
        </section>

        <section aria-labelledby="why-title" className="px-4 pt-1">
          <h2 id="why-title" className="text-balance text-title font-bold tracking-title">
            {on ? 'Walk times are on' : 'Why the straw asks where you are'}
          </h2>
          <ul className="mt-2.5 overflow-hidden rounded-card bg-white shadow-raised">
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
            <div className="mt-3.5 flex gap-2">
              <Button variant="secondary" className="shrink-0" onClick={() => setChoice('denied')}>
                Not now
              </Button>
              <Button
                className="flex-1"
                aria-haspopup="dialog"
                onClick={() => {
                  setAskedByTap(true)
                  setAlertOpen(true)
                }}
              >
                <LocateFixed size={18} strokeWidth={2.4} /> Turn on location
              </Button>
            </div>
          )}
          <p aria-live="polite" className="mt-2 text-center text-meta text-ink-3">
            {choice === 'denied'
              ? 'Location is off. Your straw still shows every time, just without walks.'
              : on
                ? 'Change this anytime in Settings.'
                : 'Not now keeps your whole Saturday, without walk times.'}
          </p>
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

/** The iOS location alert, drawn in tokens: system material, map preview, three stacked choices. */
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
            EventQuan works out walking times on your Saturday, so you know when to leave for each thing on your
            plan.
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

function AlertButton({ children, onClick, ref }: { children: ReactNode; onClick: () => void; ref?: Ref<HTMLButtonElement> }) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="h-[44px] border-t border-black/15 text-emphasis tracking-snug text-ios-blue transition-colors duration-(--duration-quick) ease-(--ease-out-expo) active:bg-black/8"
    >
      {children}
    </button>
  )
}

/** The alert's map: campus streets, Kyle Field, and you, with the walk drawn in gold. */
function MapPreview() {
  return (
    <div aria-hidden className="relative h-[124px] overflow-hidden border-t border-black/15 bg-tint-neutral">
      <svg viewBox="0 0 270 124" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        <rect x="150" y="16" width="70" height="44" rx="6" className="fill-tint-green" />
        <rect x="20" y="70" width="60" height="40" rx="6" className="fill-tint-green" />
        <path d="M0 62 H270 M120 0 V124 M0 18 L270 100 M200 0 V124" className="stroke-white" strokeWidth="7" />
        <ellipse cx="185" cy="38" rx="20" ry="14" className="fill-maroon-soft stroke-maroon/40" strokeWidth="1.5" />
        <path d="M128 68 H200 V40 H186" className="stroke-gold" strokeWidth="3" strokeDasharray="5 4" fill="none" />
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
