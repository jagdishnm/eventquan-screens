import { ChevronLeft, MessageCircle, Plus } from 'lucide-react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

/** Every tab on Jordan's flyer, taken. */
const IN: { initials: string; name: string; color: 1 | 2 | 3 | 4 | 5 | 6 }[] = [
  { initials: 'MR', name: 'Maya', color: 2 },
  { initials: 'AL', name: 'Alex', color: 3 },
  { initials: 'DS', name: 'Dev', color: 5 },
  { initials: 'KT', name: 'Kendall', color: 4 },
  { initials: 'BN', name: 'Ben', color: 6 },
  { initials: 'SP', name: 'Sofia', color: 1 },
  { initials: 'TW', name: 'Tyler', color: 3 },
]
/** Waiting for a tab to come free, first in line first. */
const WAITLIST: { initials: string; color: 1 | 2 | 3 | 4 | 5 | 6 }[] = [
  { initials: 'A', color: 4 },
  { initials: 'C', color: 6 },
  { initials: 'S', color: 5 },
]
const JAGGED = 'polygon(0 0,100% 0,100% 60%,85% 100%,70% 55%,50% 100%,30% 60%,15% 100%,0 55%)'

/**
 * H4 · All tabs gone.
 * The host's view once the flyer is full: every tab torn off, a stamp across it, the people
 * waiting for a spot, and the two things a host does next.
 */
export function H4AllTabsGone() {
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-3 pt-[54px] text-white">
          <div className="flex h-[44px] items-center gap-2">
            <IconButton label="Back" to="/explore/flow/H2">
              <ChevronLeft size={20} />
            </IconButton>
            <div className="pl-1">
              <h1 className="text-emphasis font-semibold">Your flyer is full</h1>
              <p className="text-meta text-white/60">Pinned to Gameday crew · MSC board</p>
            </div>
          </div>
        </header>

        <section aria-labelledby="full-title" className="relative mx-5 mt-6">
          <span
            aria-hidden
            className="absolute -top-2.5 left-1/2 z-10 h-[20px] w-[84px] -translate-x-1/2 rotate-[2deg] bg-gold/45"
          />
          <article className="relative -rotate-[1.2deg] bg-white shadow-floating">
            <div className="px-5 pb-4 pt-6">
              <h2
                id="full-title"
                className="font-display text-display-xl font-extrabold uppercase italic leading-[0.86] tracking-[-0.01em] text-maroon"
              >
                Post-game
                <br />
                bowling
              </h2>
              <p className="mt-3 font-slab text-title font-bold">Tonight · 9:30 PM</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-body text-ink-2">
                <span className="size-[7px] rounded-full bg-cstat" />
                Grand Station · College Station
              </p>
            </div>

            <ul
              aria-label={`All 7 tabs taken: ${IN.map((p) => p.name).join(', ')}`}
              className="flex border-t-2 border-dashed border-hairline-strong"
            >
              {IN.map((p) => (
                <li
                  key={p.initials}
                  aria-hidden
                  className="flex h-[72px] flex-1 flex-col items-center border-l-2 border-dashed border-hairline-strong bg-canvas first:border-l-0"
                >
                  <span className="h-[14px] w-full bg-white" style={{ clipPath: JAGGED }} />
                  <Avatar initials={p.initials} color={p.color} size={26} className="mt-2.5" />
                </li>
              ))}
            </ul>

            {/* The stamp */}
            <p
              aria-label="Full, 7 in"
              className="pointer-events-none absolute right-4 top-[92px] -rotate-[12deg] rounded-well border-[3px] border-maroon px-3 py-1 font-display text-display-md font-extrabold uppercase leading-none tracking-eyebrow text-maroon opacity-90 mix-blend-multiply"
            >
              Full · 7 in
            </p>
          </article>
        </section>

        <p className="mt-3 px-5 text-center text-small text-ink-2">
          <b className="font-semibold text-ink">7 in</b> · every tab taken in 2 hr 14 min
        </p>

        <div className="mx-4 mt-4 flex items-center gap-3 rounded-card bg-white px-3.5 py-3 shadow-raised">
          <span aria-hidden className="flex">
            {WAITLIST.map((w, i) => (
              <Avatar
                key={w.initials}
                initials={w.initials}
                color={w.color}
                size={30}
                className={`ring-2 ring-white ${i ? '-ml-2' : ''}`}
              />
            ))}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-control font-semibold">3 on the waitlist</div>
            <div className="text-meta text-ink-3">Ana is first in line if a tab comes back</div>
          </div>
        </div>

        <div className="mt-4 px-4">
          <Button size="lg" className="w-full">
            <MessageCircle size={18} />
            Message everyone
          </Button>
          <Button variant="secondary" className="mt-2 w-full">
            <Plus size={18} />
            Add more tabs
          </Button>
        </div>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
