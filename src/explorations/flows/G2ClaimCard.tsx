import { BadgeCheck, ChevronLeft, ScanLine, Ticket } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'
import { StandsGrid } from '../GameDayCardStunt'

const CLAIMED = 1612
const TOTAL = 1840

/** About one in eight seats still unclaimed at gates: a stable scatter of hollow dots. */
const UNCLAIMED = new Set(
  Array.from({ length: 24 * 12 }, (_, k) => k).filter((k) => (Math.imul(k + 7, 2654435761) >>> 0) % 100 < 12),
)

/**
 * G2 · Before the game: claim your card.
 * Gates are open. The app reads your seat from the ticket in Wallet, shows the picture the east
 * stands will make tonight, and one tap puts your card in it.
 */
export function G2ClaimCard() {
  const [claimed, setClaimed] = useState(false)
  const count = CLAIMED + (claimed ? 1 : 0)

  return (
    <Screen bg="bg-night">
      <StatusBar />
      <ScrollBody>
        <header className="flex items-center justify-between px-4 pb-2 pt-[54px] text-white">
          <IconButton label="Back" surface="onPhoto" to="/">
            <ChevronLeft size={20} />
          </IconButton>
          <span className="font-display text-display-md font-extrabold italic leading-none tracking-eyebrow text-gold">
            GAMEDAY
          </span>
          <Badge tone="soon">Gates open · Kickoff 6:00</Badge>
        </header>

        <section aria-labelledby="claim-title" className="px-4 text-white">
          <h1 id="claim-title" className="mt-2 text-headline font-bold leading-[1.1] tracking-headline">
            Claim your card for tonight&apos;s Block T
          </h1>
          <p className="mt-1.5 text-body text-white/75">1,840 cards go up in Q2. One of them is yours.</p>

          {/* The seat, read from the ticket */}
          <div className="mt-4 flex items-start gap-3 rounded-card bg-night-2 p-3.5 ring-1 ring-white/8">
            <span className="grid size-[40px] shrink-0 place-items-center rounded-well bg-white/8 text-gold">
              <Ticket size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <BadgeCheck size={13} strokeWidth={2.4} className="text-success-on-dark" aria-hidden />
                <Eyebrow tone="onDark">Matched from your ticket in Wallet</Eyebrow>
              </div>
              <p className="mt-0.5 text-card font-semibold tracking-snug">Sec 125 · Row 22 · Seat 14</p>
              <p className="text-meta text-white/60">A&amp;M vs LSU · Sat, Oct 12 · 6:00 PM</p>
              <button
                type="button"
                className="relative mt-1.5 flex items-center gap-1.5 text-meta font-semibold text-gold after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']"
              >
                <ScanLine size={14} aria-hidden />
                Not your seat? Scan the seat tag
              </button>
            </div>
          </div>

          {/* Tonight's picture, with the seats still to claim drawn hollow */}
          <figure className="mt-3 rounded-card bg-night-2 p-3 ring-1 ring-white/8">
            <figcaption className="mb-2.5 flex items-baseline justify-between">
              <span className="text-control font-semibold">Tonight&apos;s picture</span>
              <span className="text-meta text-white/60">
                Your card: <b className="font-semibold text-white">white</b>
              </span>
            </figcaption>
            <StandsGrid
              gaps={UNCLAIMED}
              pulse={false}
              label="Preview of the east stands forming a white Block T on maroon. Unclaimed seats are hollow. Your seat is ringed in the stem of the T."
            />
            <div className="mt-3">
              <div className="flex items-baseline justify-between text-meta">
                <span className="text-white/60">East stands · Sec 124–131</span>
                <span className="tabular text-white/75">
                  <b className="font-semibold text-white">{count.toLocaleString()}</b> of {TOTAL.toLocaleString()}{' '}
                  claimed
                </span>
              </div>
              <div
                role="progressbar"
                aria-label="Cards claimed"
                aria-valuemin={0}
                aria-valuemax={TOTAL}
                aria-valuenow={count}
                className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-white/10"
              >
                <div className="h-full rounded-full bg-gold" style={{ width: `${(count / TOTAL) * 100}%` }} />
              </div>
            </div>
          </figure>

          <Button size="lg" className="mt-4 w-full" onClick={() => setClaimed((c) => !c)} aria-pressed={claimed}>
            {claimed ? 'Card claimed · Seat 14' : 'Claim my card'}
          </Button>

          <div className="mt-3 flex items-center gap-3 rounded-card bg-night-2 px-3.5 py-3 ring-1 ring-white/8">
            <span aria-hidden className="flex">
              {[
                { i: 'M', c: 2 as const },
                { i: 'A', c: 3 as const },
              ].map((p, k) => (
                <Avatar
                  key={p.i}
                  initials={p.i}
                  color={p.c}
                  size={26}
                  className={`ring-2 ring-night-2 ${k ? '-ml-1.5' : ''}`}
                />
              ))}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-control font-semibold">Maya and Alex already claimed</div>
              <div className="text-meta text-white/60">Both white · two rows down from you</div>
            </div>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}
