import { Bell, Check, ChevronLeft, Clock } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

const EARNED = 74
const IN_PROGRESS = 16
const NEEDED = 90

/** What the Association of Former Students checks before you can order. */
const REQS: { t: string; d: string; done: boolean }[] = [
  { t: '90 credit hours', d: '74 earned · 16 in progress this fall', done: false },
  { t: 'Hours earned at Texas A&M', d: 'All 74 are A&M hours · the minimum is met', done: true },
  { t: '2.0 cumulative A&M GPA', d: 'You’re at 3.41', done: true },
  { t: 'Good standing, no holds', d: 'No blocks on your record', done: true },
]

/**
 * I4 · Ring Day progress.
 * The tradition at the end of the ring is earned, not attended. Hours first, as the one number
 * that matters, then the checklist, the Ring Day it puts you on, and a reminder for when orders open.
 */
export function I4RingDay() {
  const [notify, setNotify] = useState(false)
  const pct = (n: number) => `${(n / NEEDED) * 100}%`

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-5 pt-[54px] text-white">
          <div className="flex h-[44px] items-center gap-2">
            <IconButton label="Back to your traditions" to="/explore/profile-traditions">
              <ChevronLeft size={20} />
            </IconButton>
            <div className="pl-1">
              <h1 className="text-emphasis font-semibold">Your Aggie Ring</h1>
              <p className="text-meta text-white/60">Tradition 7 of 8 · Ring Day</p>
            </div>
          </div>

          {/* The one number: hours */}
          <div className="mt-4" role="group" aria-label={`${EARNED} of ${NEEDED} credit hours`}>
            <div className="flex items-end justify-between">
              <p className="leading-none">
                <span className="font-display text-display-xl font-bold tabular">{EARNED}</span>
                <span className="ml-1.5 text-body text-white/75">of {NEEDED} hours</span>
              </p>
              <p className="pb-1 text-right text-small text-white/75">
                <b className="font-semibold text-gold">{NEEDED - EARNED} to go</b>
                <br />
                all in progress this fall
              </p>
            </div>
            <div aria-hidden className="relative mt-3 h-[14px] overflow-hidden rounded-full bg-white/14">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gold" style={{ width: pct(EARNED) }} />
              <div
                className="absolute inset-y-0 rounded-r-full bg-[repeating-linear-gradient(135deg,var(--color-gold)_0,var(--color-gold)_3px,transparent_3px,transparent_7px)] opacity-60"
                style={{ left: pct(EARNED), width: pct(IN_PROGRESS) }}
              />
            </div>
            <div aria-hidden className="mt-1.5 flex justify-between text-micro tabular text-white/60">
              <span>0</span>
              <span>30</span>
              <span>60</span>
              <span>90 · eligible</span>
            </div>
          </div>
        </header>

        <div className="px-4">
          {/* The Ring Day it puts you on */}
          <div className="mt-4 flex items-center gap-3 rounded-card bg-white p-3.5 shadow-raised">
            <img src="/img/academic-building.jpg" alt="" className="size-[64px] shrink-0 rounded-thumb object-cover" />
            <div className="min-w-0 flex-1">
              <Eyebrow tone="maroon">Expected Ring Day</Eyebrow>
              <p className="mt-0.5 text-card font-semibold tracking-snug">Spring 2026 · April</p>
              <p className="text-meta text-ink-3">Clayton W. Williams Jr. Alumni Center</p>
            </div>
          </div>

          <h2 className="mt-5 text-card font-semibold tracking-snug">To order your ring</h2>
          <ul className="mt-1.5 divide-y divide-hairline overflow-hidden rounded-card bg-white shadow-raised">
            {REQS.map((r) => (
              <li key={r.t} className="flex items-center gap-3 px-3.5 py-2.5">
                <span
                  className={`grid size-[26px] shrink-0 place-items-center rounded-full ${
                    r.done ? 'bg-ok/10 text-ok' : 'bg-soon text-soon-ink'
                  }`}
                >
                  {r.done ? <Check size={15} strokeWidth={2.6} /> : <Clock size={14} strokeWidth={2.4} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-control font-semibold">{r.t}</p>
                  <p className="text-meta text-ink-3">{r.d}</p>
                </div>
                <span className="sr-only">{r.done ? 'Done' : 'In progress'}</span>
                {!r.done ? <Badge tone="soon">Dec</Badge> : null}
              </li>
            ))}
          </ul>
          <p className="mt-2 px-1 text-meta text-ink-3">
            Orders open once fall grades post. Checked against your record by The Association of Former Students.
          </p>

          <Button size="lg" className="mt-4 w-full" aria-pressed={notify} onClick={() => setNotify((n) => !n)}>
            <Bell size={18} />
            {notify ? 'We’ll tell you when orders open' : 'Notify me when I can order'}
          </Button>
        </div>
      </ScrollBody>
      <TabBar active="profile" />
    </Screen>
  )
}
