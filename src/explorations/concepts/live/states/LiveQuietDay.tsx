import { Bell, BellRing, CalendarClock, Check } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Faces } from '../../../../components/Avatar'
import { LiveDot } from '../../../../components/Badge'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { Eyebrow } from '../../../../components/Eyebrow'
import { AggieMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { IconButton, SectionHeader } from '../../../../components/ui'
import { NODE_META, type Node } from '../../../../data/events'
import { HeatBar, ScoreboardHeader, SplitRow } from '../ScoreboardHeader'

/**
 * Aggies out across B–CS on a Tuesday, every 30 minutes from 7 AM to 10 PM. Bar 6 is 10:00 AM, now;
 * the rest is the usual Tuesday, so the small number sits honestly under the lunch and evening peaks.
 */
const TUESDAY = [
  20, 45, 90, 130, 160, 190, 214, 260, 380, 620, 900, 960, 820, 560, 430, 380, 400, 460, 540, 620, 700, 760, 820, 780,
  700, 600, 520, 420, 330, 240, 160,
]

type Spot = { title: string; place: string; node: Node; img: string; here: number; until: string }

/** Small, but on: the three biggest live things right now. */
const QUIET: Spot[] = [
  { title: 'Study hours', place: 'Evans Library, 2nd floor', node: 'tamu', img: '/img/evans-library.jpg', here: 61, until: 'Till 2 PM' },
  { title: 'Pickup basketball', place: 'Rec Center, Court 3', node: 'tamu', img: '/img/rec-center.jpg', here: 34, until: 'Till 12 PM' },
  { title: 'Coffee and study', place: 'Northgate', node: 'cstat', img: '/img/northgate.jpg', here: 22, until: 'All morning' },
]
const HEAT: Record<Node, string> = { tamu: 'bg-maroon', cstat: 'bg-cstat', bryan: 'bg-bryan' }

/**
 * State · A quiet day, 10:12 AM Tuesday. Most Aggies are in class, and the board says so: 214 out,
 * not dressed up. The body answers "so what now?": the next big crowd and when, a reminder for it,
 * and the few live things worth walking to in the meantime.
 */
export function LiveQuietDay() {
  const [reminded, setReminded] = useState(false)
  const max = QUIET[0].here

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <ScoreboardHeader
          count={214}
          tick={false}
          unit={['Aggies', 'out now']}
          aside="Most are in class"
          kicker="TUE 10:12 AM · BRYAN–COLLEGE STATION"
          left={
            <>
              <AggieMark size={32} />
              <span className="leading-tight">
                <span className="block text-micro font-bold tracking-caps">HOWDY, JORDAN</span>
                <span className="block text-micro text-white/60">64° · Class day</span>
              </span>
            </>
          }
          right={
            <>
              <IconButton label="Notifications">
                <Bell size={19} />
              </IconButton>
              <button type="button" aria-label="Profile" className="press -m-1 grid size-[44px] place-items-center">
                <Avatar initials="JC" size={36} className="ring-2 ring-white/25" />
              </button>
            </>
          }
          pulse={TUESDAY}
          now={6}
          trend="+24 since 10 AM"
        />

        <div className="mt-3">
          <SplitRow
            label="Aggies out now, by node"
            splits={[
              { label: 'A&M', value: '152', n: 152, dot: 'bg-maroon' },
              { label: 'College Stn', value: '41', n: 41, dot: 'bg-cstat' },
              { label: 'Bryan', value: '21', n: 21, dot: 'bg-bryan' },
            ]}
          />
        </div>

        {/* The next big crowd, and the one action */}
        <section aria-labelledby="next-title" className="mx-4 mt-3 rounded-card bg-white p-3.5 shadow-floating">
          <div className="flex items-center justify-between gap-2">
            <Eyebrow tone="maroon">Next at Kyle Field</Eyebrow>
            <span className="flex items-center gap-1 text-meta font-semibold text-ink-3">
              <CalendarClock aria-hidden size={13} strokeWidth={2.4} />
              in 4 days
            </span>
          </div>
          <h2 id="next-title" className="mt-1 font-display text-display-sm font-extrabold uppercase italic leading-none">
            A&amp;M vs Auburn
          </h2>
          <p className="mt-1 text-small tabular text-ink-2">Sat · 2:30 PM kickoff · Gates open 12:30 PM</p>
          <p className="mt-2 flex items-center gap-1.5 text-meta text-ink-3">
            <Faces n={3} size={18} />
            <span>
              <b className="font-semibold text-ink-2">18 friends</b> going so far
            </span>
          </p>
          <Button
            size="lg"
            aria-pressed={reminded}
            onClick={() => setReminded((r) => !r)}
            className="mt-3 w-full"
          >
            {reminded ? <Check size={18} strokeWidth={2.8} /> : <BellRing size={18} strokeWidth={2.4} />}
            {reminded ? 'Reminder set for Saturday' : 'Remind me Saturday'}
          </Button>
          <p aria-live="polite" className="mt-1.5 text-center text-meta text-ink-3">
            {reminded ? 'We’ll nudge you at 12:30 PM, when gates open.' : 'One reminder, when gates open at 12:30 PM.'}
          </p>
        </section>

        <section aria-labelledby="quiet-title" className="mt-5">
          <SectionHeader
            title={<span id="quiet-title">On right now</span>}
            meta={
              <span className="flex items-center gap-1.5">
                <LiveDot className="!size-[6px]" /> small, but live
              </span>
            }
          />
          <ol className="mx-4 overflow-hidden rounded-card bg-white shadow-raised">
            {QUIET.map((s) => {
              const m = NODE_META[s.node]
              return (
                <li key={s.title} className="border-b border-hairline last:border-b-0">
                  <Link to="/events" className="flex items-center gap-3 px-3 py-2.5 active:bg-press">
                    <img src={s.img} alt="" className="size-[48px] shrink-0 rounded-thumb object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body font-semibold tracking-snug">{s.title}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-meta text-ink-3">
                        <span className={`size-[6px] shrink-0 rounded-full ${m.dot}`} />
                        <span className="truncate">
                          {s.place} · {s.until}
                        </span>
                      </span>
                      <span className="mt-1.5 block">
                        <HeatBar pct={(s.here / max) * 100} tone={HEAT[s.node]} />
                      </span>
                    </span>
                    <span className="flex w-[48px] shrink-0 flex-col items-end">
                      <span className="font-display text-display-sm font-bold leading-none tabular">{s.here}</span>
                      <span className="text-meta text-ink-3">here</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
          <p className="mx-4 mt-2.5 text-meta text-ink-3">It picks up around noon, when about 900 Aggies head out for lunch.</p>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
