import { CalendarDays, Check, ChevronLeft, ChevronUp, MapPin, Plus, Sparkles, Users } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { Avatar, Faces } from '../components/Avatar'
import { Button } from '../components/Button'
import { Screen } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { HeatBar, ScoreboardHeader } from './concepts/live/ScoreboardHeader'

/** Messages in the crew chat, every five minutes since kickoff (6:00 PM). The spikes are scores; the last bar is halftime. */
const CHAT = [3, 5, 2, 8, 4, 12, 6, 3, 9, 14, 5, 4, 7, 18, 9, 6, 11, 16]

/** The crew scoreboard: one live count of the crew, labelled beside the number. */
export type CrewScore = {
  count: number
  unit: [string, string?]
  aside?: string
  kicker?: string
  trend?: string
}

const HALFTIME: Required<CrewScore> = {
  count: 4,
  unit: ['crew', 'here now'],
  aside: 'of 6 at Kyle Field',
  kicker: 'SAT 7:31 PM · HALFTIME · A&M 21–17',
  trend: '+14 messages at the half',
}

/** A word EventQuan picked up from the message: gold underline, same as the Quick Event composer. */
function Picked({ children }: { children: ReactNode }) {
  return <span className="font-semibold underline decoration-gold decoration-2 underline-offset-4">{children}</span>
}

function Field({
  Icon,
  label,
  value,
  well = 'bg-maroon-soft text-maroon',
}: {
  Icon: typeof CalendarDays
  label: string
  value: string
  /** Icon well colours; the place takes its node's colour. */
  well?: string
}) {
  return (
    <li className="flex items-center gap-2.5 py-2">
      <span className={`grid size-[28px] place-items-center rounded-well ${well}`}>
        <Icon size={15} />
      </span>
      <span className="w-[44px] text-meta text-ink-3">{label}</span>
      <span className="min-w-0 flex-1 truncate text-control font-semibold">{value}</span>
      <Check aria-label="Picked up" size={16} strokeWidth={2.6} className="text-ok" />
    </li>
  )
}

/**
 * Exploration · Quick Event where plans already happen: the group chat.
 * After Clubhouse's and GroupMe's create-event sheets, collapsed into the thread: type the plan
 * as a normal message and EventQuan offers it back as an event card the group can join in one tap.
 */
export function QuickEventThread({
  status = '6 Aggies · Maya is typing…',
  children,
  overlay,
  score,
}: {
  /** The line under the chat name. */
  status?: string
  /** Replaces the thread (flow screens after the event is posted). */
  children?: ReactNode
  /** A sheet over the thread; the thread behind it becomes inert. */
  overlay?: ReactNode
  /** The scoreboard count (optional). Defaults to the crew at halftime: 4 of 6 here. */
  score?: CrewScore
} = {}) {
  const sb = { ...HALFTIME, ...score }
  const thread = useRef<HTMLElement>(null)
  /** The default thread opens at its newest message, so there is always more above it. */
  const anchoredLow = !children
  return (
    <Screen>
      <StatusBar />
      <div inert={overlay ? true : undefined} className="contents">
        {/* The header is the crew's scoreboard; the thread scrolls under it, anchored to the newest message */}
        <div className="absolute inset-0 flex flex-col">
          <div className="relative z-20 shrink-0">
            <ScoreboardHeader
              count={sb.count}
              tick={false}
              unit={sb.unit}
              aside={sb.aside}
              kicker={sb.kicker}
              trend={sb.trend}
              pulse={CHAT}
              left={
                <>
                  <IconButton label="Back to Messages" to="/">
                    <ChevronLeft size={20} />
                  </IconButton>
                  <Faces n={3} size={28} surface="photo" />
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-emphasis font-semibold tracking-snug">Gameday crew</span>
                    <span className="block truncate text-meta text-white/75">{status}</span>
                  </span>
                </>
              }
            />
          </div>

          <div className="relative flex min-h-0 flex-1 flex-col">
            {anchoredLow ? (
              <>
                {/* The cut under the scoreboard reads as "more above": a soft canvas fade and a pill to scroll up */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[96px] bg-linear-to-b from-canvas from-45% to-transparent"
                />
                <button
                  type="button"
                  onClick={() => thread.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="press absolute left-1/2 top-2 z-10 flex h-[28px] -translate-x-1/2 items-center gap-1 rounded-full bg-white px-3 text-meta font-semibold text-ink-2 shadow-raised ring-1 ring-hairline after:absolute after:-inset-x-1 after:-inset-y-2 after:content-['']"
                >
                  <ChevronUp aria-hidden size={13} strokeWidth={2.6} />
                  Earlier messages
                </button>
              </>
            ) : null}
            {/* The default thread is anchored to its newest message, as chats are; flow screens (children) read from the top */}
            <main
              ref={thread}
              className={`no-scrollbar flex min-h-0 flex-1 overflow-y-auto pb-[150px] pt-3 ${children ? 'flex-col' : 'flex-col-reverse'}`}
            >
              <div>
                {children ?? (
                  <ol className="flex flex-col gap-2 px-4">
                    <li className="text-center text-micro font-semibold tracking-eyebrow text-ink-3">
                      HALFTIME · 7:31 PM
                    </li>
                    <li className="flex items-end gap-2">
                      <Avatar initials="MR" color={2} size={28} />
                      <p className="max-w-[260px] rounded-sheet rounded-bl-tag bg-white px-3.5 py-2 text-body shadow-raised">
                        gig 'em!! up 21–17 at the half. who's down for something after?
                      </p>
                    </li>
                    <li className="flex items-end gap-2">
                      <Avatar initials="DS" color={5} size={28} />
                      <p className="max-w-[260px] rounded-sheet rounded-bl-tag bg-white px-3.5 py-2 text-body shadow-raised">
                        not another 2 hrs waiting at Northgate
                      </p>
                    </li>
                    <li className="flex justify-end">
                      <p className="max-w-[290px] rounded-sheet rounded-br-tag bg-maroon px-3.5 py-2 text-body leading-[1.5] text-white">
                        <Picked>Post-game bowling</Picked> at <Picked>Grand Station</Picked>{' '}
                        <Picked>tonight 9:30</Picked>. Loser buys Whataburger
                      </p>
                    </li>

                    {/* EventQuan's offer, inline in the thread */}
                    <li className="mt-1 rounded-card bg-white p-3.5 shadow-floating ring-1 ring-gold/60">
                      <div className="flex items-center gap-1.5 text-micro font-bold tracking-eyebrow text-soon-ink">
                        <Sparkles size={13} className="text-gold-dark" />
                        EVENTQUAN CAN MAKE THIS AN EVENT
                      </div>
                      <div className="mt-2.5 flex items-center gap-3">
                        <span className="grid size-[52px] shrink-0 place-items-center rounded-thumb bg-night-2 font-display text-display-sm font-extrabold italic tabular text-gold">
                          9:30
                        </span>
                        <div className="min-w-0">
                          <h2 className="truncate text-card font-semibold tracking-snug">Post-game bowling</h2>
                          <p className="text-small text-ink-2">Starts ~15 min after the final whistle</p>
                        </div>
                      </div>
                      <ul className="mt-2 divide-y divide-hairline">
                        <Field Icon={CalendarDays} label="When" value="Tonight, 9:30 PM" />
                        <Field
                          Icon={MapPin}
                          label="Where"
                          value="Grand Station · College Station"
                          well="bg-cstat-soft text-cstat"
                        />
                        <Field Icon={Users} label="Who" value="Gameday crew · 6" />
                      </ul>
                      {/* The place's crowd tonight, on the row's heat bar */}
                      <div className="mt-1 flex items-center gap-2.5 text-meta">
                        <span className="shrink-0 text-ink-3">Grand Station at 9:30</span>
                        <span className="min-w-0 flex-1">
                          <HeatBar pct={62} tone="bg-cstat" />
                        </span>
                        <span className="shrink-0 font-semibold tabular text-ink-2">140 going</span>
                      </div>
                      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                        <Button className="w-full">Post to Gameday crew</Button>
                        <Button variant="secondary">Edit</Button>
                      </div>
                    </li>
                  </ol>
                )}
              </div>
            </main>
          </div>
        </div>

        {/* Composer, docked above the tab bar */}
        <div className="absolute inset-x-0 bottom-[84px] z-20 border-t border-hairline bg-canvas/95 px-4 pb-2 pt-2 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Add"
              className="press grid size-[44px] shrink-0 place-items-center rounded-full bg-white text-maroon ring-1 ring-hairline"
            >
              <Plus size={20} />
            </button>
            <input
              type="text"
              aria-label="Message Gameday crew"
              placeholder="Message or plan something…"
              className="h-[44px] min-w-0 flex-1 rounded-full bg-white px-4 text-body text-ink ring-1 ring-hairline outline-none placeholder:text-ink-3"
            />
          </div>
        </div>
        <TabBar active="messages" />
      </div>
      {overlay}
    </Screen>
  )
}
