import { CalendarDays, Check, ChevronLeft, MapPin, Plus, Sparkles, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { Avatar, Faces } from '../components/Avatar'
import { Button } from '../components/Button'
import { Screen, ScrollBody } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'

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
export function QuickEventThread() {
  return (
    <Screen>
      <StatusBar />
      <header className="absolute inset-x-0 top-0 z-20 bg-maroon px-4 pb-3 pt-[54px] text-white">
        <div className="flex items-center gap-2">
          <IconButton label="Back to Messages" to="/">
            <ChevronLeft size={20} />
          </IconButton>
          <Faces n={3} size={30} surface="photo" />
          <div className="min-w-0 flex-1 pl-1">
            <h1 className="truncate text-emphasis font-semibold">Gameday crew</h1>
            <p className="text-meta text-white/60">6 Aggies · Maya is typing…</p>
          </div>
        </div>
      </header>

      <ScrollBody className="pb-[150px] pt-[150px]">
        <ol className="flex flex-col gap-2 px-4">
          <li className="text-center text-micro font-semibold tracking-eyebrow text-ink-3">HALFTIME · 7:31 PM</li>
          <li className="flex items-end gap-2">
            <Avatar initials="MR" color={2} size={28} />
            <p className="max-w-[260px] rounded-sheet rounded-bl-tag bg-white px-3.5 py-2 text-body shadow-raised">
              gig 'em!! up 17–10 at the half. who's down for something after?
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
              <Picked>Post-game bowling</Picked> at <Picked>Grand Station</Picked> <Picked>tonight 9:30</Picked>. Loser
              buys Whataburger
            </p>
          </li>

          {/* EventQuan's offer, inline in the thread */}
          <li className="mt-1 rounded-card bg-white p-3.5 shadow-floating ring-1 ring-gold/60">
            <div className="flex items-center gap-1.5 text-micro font-bold tracking-eyebrow text-soon-ink">
              <Sparkles size={13} className="text-gold-dark" />
              EVENTQUAN CAN MAKE THIS AN EVENT
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="grid size-[52px] shrink-0 place-items-center rounded-thumb bg-night-2 font-display text-display-sm font-extrabold italic text-gold">
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
            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
              <Button className="w-full">Post to Gameday crew</Button>
              <Button variant="secondary">Edit</Button>
            </div>
          </li>
        </ol>
      </ScrollBody>

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
    </Screen>
  )
}
