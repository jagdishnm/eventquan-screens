import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Screen, ScrollBody } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { Kicker, Masthead, Nameplate } from './concepts/print/PrintKit'

type Taker = { initials: string; color: 1 | 2 | 3 | 4 | 5 | 6 }

/** Seven tear-off tabs. Three already taken; the fourth is yours to take. */
const TAKEN: (Taker | null)[] = [
  { initials: 'MR', color: 2 },
  { initials: 'AL', color: 3 },
  null,
  { initials: 'DS', color: 5 },
  null,
  null,
  null,
]

const BOARDS = ['Gameday crew', 'MSC board · Aggies nearby', 'Friends'] as const

/** The parsed parts of what you typed, underlined in gold the way an editor marks copy. */
function Mark({ children }: { children: string }) {
  return <span className="not-italic underline decoration-gold decoration-2 underline-offset-4">{children}</span>
}

/**
 * Exploration · Quick Event as the flyer on the MSC board.
 * Campus already has a way to say "who's in": a flyer with tear-off tabs. The sentence you type
 * prints as the flyer; taking a tab is the RSVP, and the tabs left say how many spots remain.
 * Set as a page of the Aggieland edition: printed masthead, ring ear, warm paper.
 */
export function QuickEventFlyer() {
  const [tabs, setTabs] = useState(TAKEN)
  const [boards, setBoards] = useState<Record<string, boolean>>({ 'Gameday crew': true })
  const left = tabs.filter((x) => !x).length
  const mine = tabs.some((x) => x?.initials === 'JC')
  const take = (i: number) =>
    setTabs((ts) =>
      ts.map((x, k) => (k === i ? (x?.initials === 'JC' ? null : (x ?? { initials: 'JC', color: 1 })) : x)),
    )

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="Quick Event"
          lead={
            <IconButton label="Back" to="/">
              <ChevronLeft size={20} />
            </IconButton>
          }
          dateline={
            <>
              <Kicker className="text-paper/80">Sat · Oct 12 · 8:51 PM</Kicker>
              <Kicker className="text-gold">1 flyer · {tabs.length} tabs</Kicker>
            </>
          }
        >
          <Nameplate>Tear-off</Nameplate>
          <p className="mt-2 font-serif text-card italic leading-[1.45] text-pretty text-paper/90">
            “<Mark>Post-game bowling</Mark> at <Mark>Grand Station</Mark> <Mark>tonight 9:30</Mark>. Loser buys
            Whataburger.”
          </p>
        </Masthead>

        {/* The flyer, pinned to the board */}
        <section aria-labelledby="flyer-title" className="relative mx-5 mt-4">
          <span
            aria-hidden
            className="absolute -top-2.5 left-1/2 z-10 h-[20px] w-[84px] -translate-x-1/2 rotate-[2deg] bg-gold/45"
          />
          <article className="-rotate-[1.2deg] bg-white shadow-floating">
            <div className="px-5 pb-3.5 pt-4">
              <h2
                id="flyer-title"
                className="font-poster text-display-xl font-black uppercase leading-[0.86] tracking-headline text-balance text-maroon"
              >
                Post-game bowling
              </h2>
              <p className="mt-2.5 font-slab text-title font-bold tabular">Tonight · 9:30 PM</p>
              <p className="mt-0.5 flex items-center gap-1.5 font-serif text-body text-ink-warm-2">
                <span className="size-[7px] rounded-full bg-cstat" />
                Grand Station · Loser buys Whataburger
              </p>
            </div>

            {/* Tear-off tabs: the RSVP */}
            <ul className="flex border-t-2 border-dashed border-ink-warm/25">
              {tabs.map((who, i) => {
                const yours = who?.initials === 'JC'
                return (
                  <li key={i} className="flex-1 border-l-2 border-dashed border-ink-warm/25 first:border-l-0">
                    <button
                      type="button"
                      onClick={() => take(i)}
                      disabled={!!who && !yours}
                      aria-pressed={who ? yours : false}
                      aria-label={
                        yours
                          ? `Tab ${i + 1}, yours. Tap to give it back`
                          : who
                            ? `Tab ${i + 1}, taken by ${who.initials}`
                            : `Take tab ${i + 1}`
                      }
                      className={`flex h-[76px] w-full flex-col items-center justify-start transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
                        who ? 'bg-paper-2' : 'bg-white active:bg-paper'
                      }`}
                    >
                      {who ? (
                        <>
                          <span
                            aria-hidden
                            className="h-[12px] w-full bg-white"
                            style={{
                              clipPath: 'polygon(0 0,100% 0,100% 60%,85% 100%,70% 55%,50% 100%,30% 60%,15% 100%,0 55%)',
                            }}
                          />
                          <Avatar
                            initials={who.initials}
                            color={who.color}
                            size={26}
                            className={`mt-3 ${yours ? 'settle ring-2 ring-gold' : ''}`}
                          />
                        </>
                      ) : (
                        <span className="h-full w-full py-2 text-center font-mono text-meta font-semibold uppercase tracking-eyebrow text-ink-warm-2 [writing-mode:vertical-rl]">
                          9:30 PM
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </article>
        </section>

        <div className="mt-3 flex items-baseline justify-between gap-3 px-5">
          <Kicker className="shrink-0 text-ink-warm">
            {tabs.length - left} in · {left} left
          </Kicker>
          <p aria-live="polite" className="text-right font-serif text-small italic text-ink-warm-2">
            {mine ? 'Yours. Tap it again to give it back.' : 'Tap a tab to take it.'}
          </p>
        </div>

        <div className="mt-3 px-4">
          <Kicker className="block text-ink-warm-2">Pin it to</Kicker>
          <div className="no-scrollbar -mx-4 mt-1 flex gap-2 overflow-x-auto px-4 py-1">
            {BOARDS.map((b) => (
              <Chip
                key={b}
                appearance="soft"
                selected={!!boards[b]}
                onClick={() => setBoards((s) => ({ ...s, [b]: !s[b] }))}
              >
                {b}
              </Chip>
            ))}
          </div>
          <Button size="lg" className="mt-2.5 w-full">
            Pin it up
          </Button>
        </div>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
