import { Camera, ChevronRight, Share, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

/** The ring, in order: Howdy Week, Kyle Field, Century Tree, Reveille, Midnight Yell (new), then still ahead. */
const RING = ['done', 'done', 'done', 'done', 'new', 'ahead', 'ahead', 'ahead'] as const
const R = 84
const W = 14
const C = 110

function arc(i: number, n: number) {
  const gap = 5
  const a0 = ((360 / n) * i + gap / 2 - 90) * (Math.PI / 180)
  const a1 = ((360 / n) * (i + 1) - gap / 2 - 90) * (Math.PI / 180)
  const p = (a: number) => `${C + R * Math.cos(a)} ${C + R * Math.sin(a)}`
  return `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`
}

/**
 * I3 · Tradition done.
 * The moment after Midnight Yell: the fifth segment of the ring fills in gold, the date is kept,
 * and there's a slot for the memory. Celebratory, but it's still your profile, not a confetti cannon.
 */
export function I3TraditionDone() {
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-6 pt-[54px] text-white">
          <div className="flex h-[44px] items-center justify-between">
            <Eyebrow tone="gold">Tradition done · 12:41 AM</Eyebrow>
            <IconButton label="Close">
              <X size={18} />
            </IconButton>
          </div>

          <div className="mt-1 flex flex-col items-center text-center">
            <svg
              viewBox="0 0 220 220"
              className="size-[188px]"
              role="img"
              aria-label="5 of 8 traditions done. Midnight Yell just filled in."
            >
              {RING.map((s, i) => (
                <path
                  key={i}
                  d={arc(i, RING.length)}
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth={s === 'new' ? W + 6 : W}
                  className={s === 'ahead' ? 'stroke-white/20' : s === 'new' ? 'stroke-gold' : 'stroke-gold/60'}
                />
              ))}
              <text x={C} y={C + 6} textAnchor="middle" className="fill-white font-display text-display-lg font-bold">
                5 of 8
              </text>
              <text x={C} y={C + 28} textAnchor="middle" className="fill-white/60 text-meta">
                traditions
              </text>
            </svg>
            <h1 className="mt-1 font-display text-display-xl font-extrabold uppercase italic leading-[0.9] text-gold">
              Whoop!
            </h1>
            <p className="mt-1 text-emphasis font-semibold">Midnight Yell · Oct 18</p>
            <p className="text-small text-white/75">Kyle Field · you and 18,214 Aggies</p>
          </div>
        </header>

        <div className="px-4">
          {/* The memory slot */}
          <section aria-labelledby="memory-title" className="mt-4 rounded-card bg-white p-3 shadow-raised">
            <div className="flex items-baseline justify-between">
              <h2 id="memory-title" className="text-card font-semibold tracking-snug">
                Your memory
              </h2>
              <Badge tone="going" size="md">
                Added to your ring
              </Badge>
            </div>
            <div className="mt-2.5 flex gap-2.5">
              <img
                src="/img/midnight-yell.jpg"
                alt="Kyle Field at Midnight Yell"
                className="size-[96px] shrink-0 rounded-thumb object-cover"
              />
              <button
                type="button"
                className="press flex size-[96px] shrink-0 flex-col items-center justify-center gap-1 rounded-thumb border-2 border-dashed border-hairline-strong text-ink-3 active:bg-press"
              >
                <Camera size={20} />
                <span className="text-meta font-semibold">Add yours</span>
              </button>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <span aria-hidden className="flex">
                  {[
                    { i: 'M', c: 2 as const },
                    { i: 'A', c: 3 as const },
                    { i: 'D', c: 5 as const },
                  ].map((p, k) => (
                    <Avatar
                      key={p.i}
                      initials={p.i}
                      color={p.c}
                      size={24}
                      className={`ring-2 ring-white ${k ? '-ml-1.5' : ''}`}
                    />
                  ))}
                </span>
                <p className="mt-1.5 text-meta text-ink-2">
                  <b className="font-semibold text-ink">Maya, Alex</b> and 29 friends were there too
                </p>
              </div>
            </div>
          </section>

          <Button size="lg" className="mt-4 w-full">
            <Share size={18} />
            Share
          </Button>

          <Link
            to="/explore/flow/I4"
            className="mt-3 flex items-center gap-3 rounded-card bg-white px-3.5 py-3 shadow-raised active:bg-press"
          >
            <img src="/img/academic-building.jpg" alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block text-control font-semibold">Next on your ring: Ring Day</span>
              <span className="block text-meta text-ink-3">74 of 90 hours · 16 to go</span>
            </span>
            <ChevronRight aria-hidden size={16} className="shrink-0 text-ink-3" />
          </Link>
        </div>
      </ScrollBody>
      <TabBar active="profile" />
    </Screen>
  )
}
