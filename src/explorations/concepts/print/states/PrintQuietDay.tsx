import { BellRing, Check } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { NODE_META, type Node } from '../../../../data/events'
import { Kicker, Masthead, PrintHead } from '../PrintKit'

/** Small, but on: the three things worth walking to this morning. */
const TODAY: { t: string; title: string; where: string; node: Node }[] = [
  { t: 'Till 2 PM', title: 'Study hours', where: 'Evans Library, 2nd floor', node: 'tamu' },
  { t: 'Till 12 PM', title: 'Pickup basketball', where: 'Rec Center, Court 3', node: 'tamu' },
  { t: 'All morning', title: 'Coffee and study', where: 'Northgate', node: 'cstat' },
]

/** Already filed for Saturday's sheet. */
const SATURDAY: { t: string; title: string; where: string }[] = [
  { t: 'Fri 8:00 PM', title: 'Maya’s 21st', where: 'Northgate · on the MSC board' },
  { t: 'Fri 11:59 PM', title: 'Midnight Yell', where: 'Kyle Field · before the game' },
]

/**
 * Print state · A quiet day, 10:12 AM Tuesday. A slim edition, and it says so: most Aggies are in
 * class and three small things are on. Then a preview of what's already in Saturday's sheet, with
 * one gold action, a reminder for gates.
 */
export function PrintQuietDay() {
  const [reminded, setReminded] = useState(false)

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="EventQuan · Vol. 4 · No. 8"
          dateline={
            <>
              <Kicker className="text-paper/80">Tue · Oct 15 · College Station</Kicker>
              <Kicker className="text-gold">64° Cloudy</Kicker>
            </>
          }
        >
          <p className="text-center font-serif text-small italic text-paper/80">The</p>
          <p className="-mt-1 text-center font-poster text-display-xl font-black uppercase leading-[0.9] tracking-headline">
            Tuesday Slip
          </p>
        </Masthead>

        <div className="relative px-4">
          <h1 className="mt-4 font-poster text-display-lg font-extrabold uppercase leading-[0.92] text-balance text-maroon">
            A quiet one
          </h1>
          <p className="mt-1 font-serif text-body leading-[1.45] text-ink-warm-2">
            Most Aggies are in class. Three small things are on; the big one is Saturday.
          </p>

          {/* Today, honestly small */}
          <section aria-labelledby="today-title" className="mt-4">
            <PrintHead id="today-title" aside="3 on">
              Today
            </PrintHead>
            <ul>
              {TODAY.map((e) => (
                <li key={e.title}>
                  <Link
                    to="/events"
                    className="flex min-h-[48px] items-center gap-3 border-b border-ink-warm/15 py-1.5"
                  >
                    <span className="w-[96px] shrink-0">
                      <Kicker className="text-maroon">{e.t}</Kicker>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-slab text-card font-bold leading-tight">{e.title}</span>
                      <span className="flex items-center gap-1 font-serif text-small text-ink-warm-2">
                        <span className={`size-[6px] shrink-0 rounded-full ${NODE_META[e.node].dot}`} />
                        <span className="truncate">{e.where}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* What's already in Saturday's sheet */}
          <section aria-labelledby="sat-title" className="mt-5">
            <PrintHead id="sat-title" aside="Sat · Oct 19">
              In Saturday’s sheet
            </PrintHead>
            <article className="mt-3 border-l-4 border-maroon pl-3">
              <Kicker className="text-maroon">Lead · SEC football · Kyle Field</Kicker>
              <h2 className="font-poster text-display-md font-black uppercase leading-none text-ink-warm">
                A&amp;M vs Auburn
              </h2>
              <p className="mt-0.5 font-serif text-small tabular text-ink-warm-2">
                Kickoff 2:30 PM · Gates open 12:30 PM
              </p>
            </article>
            <Button size="lg" aria-pressed={reminded} onClick={() => setReminded((r) => !r)} className="mt-3 w-full">
              {reminded ? <Check size={18} strokeWidth={2.8} /> : <BellRing size={18} strokeWidth={2.4} />}
              {reminded ? 'Reminder set for Saturday' : 'Remind me Saturday'}
            </Button>
            <p aria-live="polite" className="mt-1.5 text-center font-serif text-small italic text-ink-warm-2">
              {reminded
                ? 'We’ll nudge you at 12:30 PM, when gates open. Tap again to cancel.'
                : 'One reminder, when gates open at 12:30 PM.'}
            </p>
            <Kicker className="mt-4 block text-ink-warm-2">Also filed for the weekend</Kicker>
            <ul className="mt-1 border-t border-ink-warm/15">
              {SATURDAY.map((e) => (
                <li key={e.title} className="flex items-baseline gap-3 border-b border-ink-warm/15 py-1.5">
                  <span className="w-[96px] shrink-0">
                    <Kicker className="text-maroon">{e.t}</Kicker>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-slab text-control font-bold">{e.title}</span>
                    <span className="block truncate font-serif text-small text-ink-warm-2">{e.where}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
