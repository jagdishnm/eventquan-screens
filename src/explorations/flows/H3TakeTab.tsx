import { CalendarPlus, ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { StatusBar } from '../../components/StatusBar'
import { SwitchRow } from '../../components/Switch'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

type Taker = { initials: string; color: 1 | 2 | 3 | 4 | 5 | 6 } | 'you' | null

/** Eight tabs on Maya's flyer: four taken before you, yours just torn off, three left. */
const TABS: Taker[] = [
  { initials: 'AL', color: 3 },
  { initials: 'DS', color: 5 },
  { initials: 'KT', color: 4 },
  { initials: 'BN', color: 6 },
  'you',
  null,
  null,
  null,
]
const TAB_TEXT = 'Fri 8 PM · Maya'
/** The torn edge across the top of a tab in your hand. */
const TORN_TOP = 'polygon(0 7px,15% 0,30% 6px,50% 0,70% 6px,85% 0,100% 7px,100% 100%,0 100%)'
const JAGGED = 'polygon(0 0,100% 0,100% 60%,85% 100%,70% 55%,50% 100%,30% 60%,15% 100%,0 55%)'

/**
 * H3 · Taking a tab.
 * Jordan, invited, tears a tab off Maya's flyer. The tab in your hand is the RSVP: the flyer
 * shows the gap, the count updates, and it drops into your Friday next to Midnight Yell.
 */
export function H3TakeTab() {
  const [onFriday, setOnFriday] = useState(true)
  const taken = TABS.filter(Boolean).length

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-3 pt-[54px] text-white">
          <div className="flex h-[44px] items-center gap-2">
            <IconButton label="Back to the MSC board" to="/explore/flow/H2">
              <ChevronLeft size={20} />
            </IconButton>
            <div className="pl-1">
              <h1 className="text-emphasis font-semibold">Maya&apos;s flyer</h1>
              <p className="text-meta text-white/60">Pinned to Friends · MSC board</p>
            </div>
          </div>
        </header>

        {/* Maya's flyer, with the gap where your tab was */}
        <section aria-labelledby="maya-title" className="relative mx-5 mt-6">
          <span
            aria-hidden
            className="absolute -top-2.5 left-1/2 z-10 h-[20px] w-[84px] -translate-x-1/2 -rotate-[2deg] bg-white/60 ring-1 ring-black/5"
          />
          <article className="rotate-[1deg] bg-gold shadow-floating">
            <div className="px-5 pb-3.5 pt-5 text-maroon">
              <h2 id="maya-title" className="font-slab text-display-lg font-bold leading-none">
                Maya&apos;s 21st
              </h2>
              <p className="mt-2 font-slab text-card font-bold text-ink">Fri, Oct 18 · 8:00 PM</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-small">
                <span className="size-[7px] rounded-full bg-cstat" />
                Northgate · College Station · first round&apos;s on me
              </p>
            </div>
            <ul
              aria-label={`Tear-off tabs: ${taken} of 8 taken, including yours`}
              className="flex border-t-2 border-dashed border-maroon/25"
            >
              {TABS.map((who, i) => (
                <li
                  key={i}
                  aria-hidden
                  className="flex h-[96px] flex-1 flex-col items-center border-l-2 border-dashed border-maroon/25 bg-canvas first:border-l-0"
                >
                  {who === 'you' ? (
                    <>
                      <span className="h-[12px] w-full bg-gold" style={{ clipPath: JAGGED }} />
                      <span className="mt-auto pb-2 text-micro font-semibold text-maroon">You</span>
                    </>
                  ) : who ? (
                    <>
                      <span aria-hidden className="h-[12px] w-full bg-gold" style={{ clipPath: JAGGED }} />
                      <Avatar initials={who.initials} color={who.color} size={24} className="mt-2.5" />
                    </>
                  ) : (
                    <span className="h-full w-full bg-gold py-1.5 text-center text-micro font-semibold text-maroon [writing-mode:vertical-rl]">
                      {TAB_TEXT}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </article>
        </section>

        {/* The confirm: the torn tab in your hand */}
        <section
          aria-labelledby="in-title"
          className="mx-4 mt-6 flex items-center gap-4 rounded-card bg-white p-4 shadow-raised"
        >
          <div aria-hidden className="h-[112px] w-[42px] shrink-0 rotate-[8deg]">
            <span
              className="block h-full w-full bg-gold pt-3 text-center text-micro font-semibold text-maroon [writing-mode:vertical-rl]"
              style={{ clipPath: TORN_TOP }}
            >
              {TAB_TEXT}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <Badge tone="going" size="md">
              Tab taken
            </Badge>
            <h2 id="in-title" className="mt-1.5 text-title font-bold tracking-title">
              You&apos;re in
            </h2>
            <p className="text-small text-ink-2">
              <b className="font-semibold text-ink">{taken} of 8 tabs taken</b> · 3 left. Maya sees your name on the
              flyer.
            </p>
          </div>
        </section>

        <div className="mx-4 mt-3 rounded-card bg-white px-3.5 py-1.5 shadow-raised">
          <SwitchRow checked={onFriday} onChange={setOnFriday} label="Add to my Friday">
            <span className="grid size-[36px] shrink-0 place-items-center rounded-well bg-tint-maroon text-maroon">
              <CalendarPlus size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-control font-semibold">Add to my Friday</span>
              <span className="block text-meta text-ink-3">8:00 PM · then Midnight Yell at 11:59 PM</span>
            </span>
          </SwitchRow>
        </div>

        <div className="mt-4 px-4">
          <Button size="lg" className="w-full">
            Done
          </Button>
          <Button variant="secondary" className="mt-2 w-full">
            Give the tab back
          </Button>
        </div>
      </ScrollBody>
      <TabBar active="events" />
    </Screen>
  )
}
