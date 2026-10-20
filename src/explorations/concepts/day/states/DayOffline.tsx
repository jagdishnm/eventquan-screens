import { ChevronLeft, CloudOff, DoorOpen, Map as MapIcon, QrCode, RotateCw } from 'lucide-react'
import { useState } from 'react'
import { Faces } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { AggieMark, LsuMark } from '../../../../components/Marks'
import { TabBar } from '../../../../components/TabBar'
import { IconButton } from '../../../../components/ui'
import { NoSignalStatusBar } from '../../live/states/StateScoreboard'
import { BigTime, OnRail, TimeRail } from '../Rail'
import { clock, timeScale } from '../time'

/** Saturday, 6:42 PM at Kyle Field, first quarter. The phone's clock still runs; the network doesn't. */
const NOW = 18.7
/** The last time we heard from the server: LSU had just tied it, 7–7. */
const SYNCED = 18 + 31 / 60

const y = timeScale([
  [18, 34],
  [NOW, 92],
  [19 + 32 / 60, 172],
  [21.5, 258],
  [21.9, 284],
])

/**
 * State · No signal inside Kyle Field, 6:42 PM. 102,733 phones, one overloaded network. The straw
 * keeps working because it's time, not data: the clock runs, NOW moves, and everything on the plan
 * was saved to the phone at 6:31. What needs the network (the score, the crowd) says when it was
 * last true and stops there. Retry is the one gold action.
 */
export function DayOffline() {
  const [tried, setTried] = useState(false)

  return (
    <Screen bg="bg-night">
      <NoSignalStatusBar />
      <ScrollBody>
        <header className="bg-linear-to-b from-maroon-deep to-night px-4 pb-4 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center justify-between">
            <IconButton label="Back to Kyle Field" to="/explore/concept/day/4">
              <ChevronLeft size={20} />
            </IconButton>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-meta font-semibold text-white/80 ring-1 ring-white/14">
              <CloudOff size={13} /> No signal
            </span>
            <span className="w-[44px]" />
          </div>
          <h1 className="sr-only">Offline at Kyle Field</h1>
          <div className="mt-2">
            <BigTime
              tone="onNight"
              kicker="NO SIGNAL · KYLE FIELD · 1ST QTR"
              value="6:42"
              unit="PM"
              label="6:42 PM, Saturday. No signal."
              caption={
                <>
                  Your plan is saved on this phone · synced <span className="text-white">{clock(SYNCED)}</span>
                </>
              }
            />
          </div>

          {/* The one gold action, with the honest reason it's needed */}
          <div className="mt-3.5 flex items-center gap-3 rounded-card bg-white/8 p-2.5 pl-3 ring-1 ring-white/10">
            <p aria-live="polite" className="min-w-0 flex-1 text-meta leading-snug text-white/75">
              {tried ? (
                <>
                  Still no signal at <span className="tabular">6:42 PM</span>. Try near Gate 2 or at the half.
                </>
              ) : (
                <>102,733 phones on one network. The score and crowd come back when the signal does.</>
              )}
            </p>
            <Button size="sm" onClick={() => setTried(true)} className="shrink-0">
              <RotateCw size={15} strokeWidth={2.6} /> Retry
            </Button>
          </div>
        </header>

        <section aria-labelledby="off-straw" className="pt-2">
          <div className="flex items-baseline justify-between px-4">
            <h2 id="off-straw" className="text-micro font-bold tracking-caps text-gold">
              YOUR NIGHT · SAVED
            </h2>
            <span className="text-meta text-white/60">Works offline</span>
          </div>
          <div className="mt-1">
            <TimeRail
              y={y}
              from={18}
              to={21.9}
              now={NOW}
              surface="dark"
              marks={[{ h: 18 }, { h: 19 + 32 / 60 }, { h: 21.5 }]}
              label="Your night, saved on this phone"
            >
              <OnRail y={y(18)} pierce="gold" surface="dark">
                {/* The score, paused: when it was last true, in grey, never guessed */}
                <div className="flex h-[48px] items-center gap-2.5 rounded-thumb bg-night-2 pl-2.5 pr-3 ring-1 ring-white/10">
                  <span className="flex shrink-0 items-center gap-1">
                    <AggieMark size={22} />
                    <LsuMark size={22} />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-control font-semibold text-white">Kickoff · A&amp;M vs LSU</span>
                    <span className="block truncate text-meta text-white/60">Score paused at 6:31 PM</span>
                  </span>
                  <span className="shrink-0 font-display text-display-sm font-bold leading-none text-white/55 tabular">
                    7–7
                  </span>
                </div>
              </OnRail>

              <OnRail y={y(19 + 32 / 60)} pierce="gold" surface="dark">
                <div className="rounded-card bg-night-2 p-3 text-white ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-micro font-bold tracking-caps text-gold">HALFTIME · 7:32 PM</span>
                    <span className="text-meta text-white/60">Saved</span>
                  </div>
                  <div className="mt-1 text-card font-semibold tracking-snug">Meet the crew at Gate 2</div>
                  <div className="mt-1 flex items-center gap-2 text-meta text-white/75">
                    <Faces n={4} size={20} surface="photo" />
                    <span className="truncate">Maya, Alex +2 · saved for all 4</span>
                  </div>
                </div>
              </OnRail>

              <OnRail y={y(21.5)} pierce="open" surface="dark">
                <div className="flex h-[48px] items-center gap-2.5 rounded-thumb bg-night-2 pl-1.5 pr-3 ring-1 ring-white/10">
                  <img src="/img/northgate.jpg" alt="" className="size-[36px] shrink-0 rounded-well object-cover" />
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-control font-semibold text-white">War Hymn, then Northgate</span>
                    <span className="block truncate text-meta text-white/60">Post-game · crew plan · saved</span>
                  </span>
                </div>
              </OnRail>
            </TimeRail>
          </div>
        </section>

        {/* What still works with no signal at all */}
        <section aria-labelledby="off-saved" className="px-4 pt-1">
          <h2 id="off-saved" className="text-micro font-bold tracking-caps text-white/75">
            ON THIS PHONE
          </h2>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {[
              { Icon: QrCode, title: 'Ticket · Sec 125 · Row 22', meta: 'Scans with no signal', wide: true },
              { Icon: DoorOpen, title: 'Your gate', meta: 'Gate 2 · east side' },
              { Icon: MapIcon, title: 'Stadium map', meta: 'Saved 6:31 PM' },
            ].map(({ Icon, title, meta, wide }) => (
              <li key={title} className={wide ? 'col-span-2' : ''}>
                <button
                  type="button"
                  className="press flex h-full min-h-[52px] w-full items-center gap-2.5 rounded-thumb bg-night-2 px-3 py-2 text-left ring-1 ring-white/10 transition-colors duration-(--duration-quick) ease-(--ease-out-expo) active:bg-night-3"
                >
                  <Icon size={18} className="shrink-0 text-gold" />
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-control font-semibold text-white tabular">{title}</span>
                    <span className="block truncate text-meta text-white/60 tabular">{meta}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </ScrollBody>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}
