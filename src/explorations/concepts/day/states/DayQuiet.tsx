import { Bell, BellRing, Check, DoorOpen } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { AggieMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { IconButton } from '../../../../components/ui'
import { NODE_META } from '../../../../data/events'
import { BigTime, FoldNote, OnRail, TimeRail } from '../Rail'
import { timeScale } from '../time'

/** Tuesday, Oct 15, 10:12 AM. Hours run on past 24, so Saturday is +96: gates 108.5, kickoff 110.5. */
const NOW = 10 + 12 / 60
const SAT = 96
const GATES = SAT + 12.5
const KICKOFF = SAT + 14.5

const y = timeScale([
  [10, 10],
  [NOW, 24],
  [14, 162],
  [GATES, 252],
  [KICKOFF, 308],
  [KICKOFF + 0.5, 420],
])

/** Small, but on: what's happening right now, not on anyone's plan. */
const ON_NOW = [
  { id: 'study', title: 'Study hours', place: 'Evans Library, 2nd floor', img: '/img/evans-library.jpg', until: 'Till 2 PM', here: 61, y: 72 },
  { id: 'hoops', title: 'Pickup basketball', place: 'Rec Center, Court 3', img: '/img/rec-center.jpg', until: 'Till 12 PM', here: 34, y: 128 },
]

/**
 * State · A quiet Tuesday, 10:12 AM. The straw says it plainly: nothing on your plan today. Two
 * small things are on now if you want them, then the rail folds through Wednesday to Friday and
 * picks up at Saturday's gates. The one gold action is a reminder for when they open.
 */
export function DayQuiet() {
  const [reminded, setReminded] = useState(false)

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-4 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center gap-1">
            <span className="ml-1 flex min-w-0 flex-1 items-center gap-2">
              <AggieMark size={28} />
              <span className="truncate text-small font-semibold text-white/80">Texas A&amp;M · Tue, Oct 15</span>
            </span>
            <IconButton label="Notifications">
              <Bell size={18} />
            </IconButton>
            <button type="button" aria-label="Profile" className="press grid size-[44px] place-items-center">
              <Avatar initials="JC" size={32} className="ring-2 ring-white/25" />
            </button>
          </div>
          <h1 className="sr-only">A quiet Tuesday</h1>
          <div className="mt-3">
            <BigTime
              kicker="TUESDAY · A QUIET ONE"
              value="10:12"
              unit="AM"
              label="10:12 AM, Tuesday"
              caption={
                <>
                  <b className="font-semibold text-white">Nothing on your plan today.</b> Next: Saturday.
                </>
              }
            />
          </div>
        </header>

        <section aria-labelledby="quiet-straw" className="pt-3">
          <div className="flex items-baseline justify-between px-4">
            <h2 id="quiet-straw" className="text-micro font-bold tracking-caps text-maroon">
              YOUR STRAW · THIS WEEK
            </h2>
            <span className="text-meta text-ink-3">0 today · 1 Saturday</span>
          </div>
          <div className="mt-1">
            <TimeRail
              y={y}
              from={10}
              to={KICKOFF + 0.5}
              now={NOW}
              folds={[{ from: 14.3, to: GATES - 0.3 }]}
              marks={[
                { h: 14 },
                { h: GATES, label: '12:30', sub: 'SAT' },
                { h: KICKOFF, label: '2:30', sub: 'PM' },
              ]}
              label="This week"
            >
              {ON_NOW.map((s) => (
                <OnRail key={s.id} y={s.y} pierce="live">
                  <div className="flex h-[50px] items-center gap-2.5 rounded-thumb bg-white pl-1.5 pr-2.5 shadow-raised">
                    <img src={s.img} alt="" className="size-[38px] shrink-0 rounded-well object-cover" />
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-control font-semibold tracking-snug">{s.title}</span>
                      <span className="flex items-center gap-1 truncate text-meta text-ink-3">
                        <span className={`size-[6px] shrink-0 rounded-full ${NODE_META.tamu.dot}`} />
                        <span className="truncate">
                          {s.here} here · {s.place}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 text-micro font-semibold text-ink-3">{s.until}</span>
                  </div>
                </OnRail>
              ))}

              <FoldNote y={(y(14) + y(GATES)) / 2}>Wednesday to Friday: nothing on your straw yet.</FoldNote>

              <OnRail y={y(GATES)} pierce="open">
                <div className="flex h-[44px] items-center gap-2.5 rounded-thumb bg-white pl-1.5 pr-2.5 shadow-raised">
                  <span className="grid size-[32px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                    <DoorOpen size={16} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-control font-semibold tracking-snug">
                    Gates open · Kyle Field
                  </span>
                </div>
              </OnRail>

              {/* What's next, and when: the reason to come back */}
              <OnRail y={y(KICKOFF) - 26} align="top" dotY={26} pierce="gold">
                <div className="rounded-card bg-maroon p-3 text-white shadow-floating">
                  <div className="flex items-center gap-2.5">
                    <AggieMark size={40} />
                    <div className="min-w-0 flex-1">
                      <div className="text-micro font-bold tracking-caps text-gold">NEXT · SATURDAY, OCT 19</div>
                      <div className="mt-0.5 truncate font-display text-title font-extrabold uppercase italic leading-none">
                        A&amp;M vs Auburn
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-meta text-white/75 tabular">2:30 PM kickoff · gates open 12:30 PM</p>
                  <Button
                    aria-pressed={reminded}
                    onClick={() => setReminded((r) => !r)}
                    className="mt-2.5 w-full"
                  >
                    {reminded ? (
                      <>
                        <Check size={17} strokeWidth={2.8} /> Reminder set · 12:30 PM
                      </>
                    ) : (
                      <>
                        <BellRing size={17} /> Remind me at 12:30 PM
                      </>
                    )}
                  </Button>
                </div>
              </OnRail>
            </TimeRail>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
