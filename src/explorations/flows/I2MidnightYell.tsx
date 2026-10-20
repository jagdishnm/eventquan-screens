import { ChevronLeft, Share } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { DateBlock } from '../../components/EventCard'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

/** How a first-timer does Midnight Yell, in the order it happens. */
const STEPS = [
  { t: 'Watch the Yell Leaders', d: 'Five students in white. Their hand signs call each yell before it starts.' },
  { t: 'Hump it', d: 'Lean forward, hands on your knees, then yell. Every Aggie in the stands does it together.' },
  { t: 'When the lights go out', d: 'Kiss your date. No date? Hold up your phone light with everyone else.' },
]
const YELLS = ['Farmers Fight', 'Gig ’Em', 'Old Army', 'War Hymn']

/**
 * I2 · Tradition detail: Midnight Yell.
 * The next tradition on Jordan's ring, explained for a first-timer: when and where, who's going,
 * what to do once you're in the stands, and one tap to say you're going.
 */
export function I2MidnightYell() {
  const [going, setGoing] = useState(false)

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-4 pt-[54px] text-white">
          <div className="flex h-[44px] items-center justify-between">
            <IconButton label="Back to your traditions" to="/explore/profile-traditions">
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton label="Share Midnight Yell">
              <Share size={18} />
            </IconButton>
          </div>
          <Eyebrow tone="gold" className="mt-2 block">
            Aggie tradition · 5 of 8 on your ring
          </Eyebrow>
          <h1 className="mt-1 font-display text-display-lg font-extrabold uppercase italic leading-none">
            Midnight Yell
          </h1>
          <p className="mt-1.5 text-small text-white/75">
            Yell practice the night before a home game. The whole 12th Man, Kyle Field, lights out at the end.
          </p>
        </header>

        <div className="px-4">
          <img
            src="/img/midnight-yell.jpg"
            alt="Students packed into the Kyle Field stands at Midnight Yell, lit by the stadium lights."
            className="mt-4 h-[164px] w-full rounded-card object-cover"
          />

          {/* When and where */}
          <div className="mt-3 flex items-center gap-3 rounded-card bg-white p-3.5 shadow-raised">
            <DateBlock day="FRI" date="18" />
            <div className="min-w-0 flex-1 border-l border-hairline pl-3">
              <p className="text-body font-semibold tracking-snug">Fri, Oct 18 · 11:59 PM</p>
              <p className="text-meta text-ink-3">Kyle Field · 18K going</p>
            </div>
            <Badge tone="node" node="tamu" />
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-card bg-white px-3.5 py-3 shadow-raised">
            <span aria-hidden className="flex">
              {[
                { i: 'M', c: 2 as const },
                { i: 'A', c: 3 as const },
                { i: 'D', c: 5 as const },
                { i: 'K', c: 4 as const },
              ].map((p, k) => (
                <Avatar
                  key={p.i}
                  initials={p.i}
                  color={p.c}
                  size={26}
                  className={`ring-2 ring-white ${k ? '-ml-1.5' : ''}`}
                />
              ))}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-control font-semibold">31 friends going</p>
              <p className="text-meta text-ink-3">Maya, Alex, Dev and 28 more</p>
            </div>
          </div>

          <Button size="lg" className="mt-4 w-full" aria-pressed={going} onClick={() => setGoing((g) => !g)}>
            {going ? 'You’re going · see you at 11:59' : 'I’m going'}
          </Button>

          <h2 className="mt-6 text-title font-bold tracking-title">How to do it</h2>
          <ol className="mt-2 divide-y divide-hairline overflow-hidden rounded-card bg-white shadow-raised">
            {STEPS.map((s, i) => (
              <li key={s.t} className="flex gap-3 px-3.5 py-3">
                <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-maroon text-meta font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-control font-semibold">{s.t}</p>
                  <p className="text-meta text-ink-2">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-5 text-card font-semibold tracking-snug">Yells to know</h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {YELLS.map((y) => (
              <li key={y} className="rounded-full bg-maroon-soft px-3.5 py-2 text-control font-semibold text-maroon">
                {y}
              </li>
            ))}
          </ul>
        </div>
      </ScrollBody>
      <TabBar active="profile" />
    </Screen>
  )
}
