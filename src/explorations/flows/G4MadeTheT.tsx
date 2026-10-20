import { ChevronLeft, Share } from 'lucide-react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'
import { StandsGrid } from '../GameDayCardStunt'

/** 36 of 1,840 cards stayed down: a handful of dark seats in the result. */
const DOWN = new Set([2 * 24 + 5, 3 * 24 + 17, 5 * 24 + 2, 8 * 24 + 12, 9 * 24 + 21, 11 * 24 + 7])

/**
 * G4 · You made the T.
 * The recap, seconds after the cards come down: the photo from the press box, how many held it up,
 * where your card was in the picture, one tap to share it, and what happens next in the game.
 */
export function G4MadeTheT() {
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
          <Badge tone="live" surface="dark">
            21–17 · Q2
          </Badge>
        </header>

        <section aria-labelledby="made-title" className="px-4 text-white">
          {/* The photo moment */}
          <figure className="relative mt-2 overflow-hidden rounded-card">
            <img src="/img/kyle-field-crowd.jpg" alt="" className="h-[208px] w-full object-cover" />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-night via-night/40 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-3.5">
              <Eyebrow tone="gold">Kyle Field · east stands · just now</Eyebrow>
              <h1
                id="made-title"
                className="mt-1 font-display text-display-lg font-extrabold uppercase italic leading-none"
              >
                You made the T
              </h1>
              <p className="mt-1 text-body text-white/85">
                <b className="font-semibold text-white">1,804 of you</b> held it up · 98% of the east stands
              </p>
            </figcaption>
          </figure>

          {/* The result, your card in it */}
          <figure className="mt-3 rounded-card bg-night-2 p-3 ring-1 ring-white/8">
            <StandsGrid
              gaps={DOWN}
              pulse={false}
              label="The Block T as it went up: 1,804 of 1,840 cards held, a few seats dark. Your seat is ringed in the stem of the T."
            />
            <figcaption className="mt-2.5 flex justify-between text-meta text-white/60">
              <span>Your card · Sec 125 · Row 22 · Seat 14</span>
              <span>Held 8 sec</span>
            </figcaption>
          </figure>

          <Button size="lg" className="mt-4 w-full">
            <Share size={18} />
            Share the T
          </Button>

          <div className="mt-3 flex items-center gap-3 rounded-card bg-night-2 px-3.5 py-3 ring-1 ring-white/8">
            <span className="w-[40px] shrink-0 text-center leading-none">
              <span className="block text-tab font-bold tracking-eyebrow text-gold">KICK</span>
              <span className="mt-0.5 block text-card font-bold tabular">7:45</span>
            </span>
            <div className="min-w-0 flex-1 border-l border-white/8 pl-3">
              <h2 className="text-control font-semibold">Up next: 2nd half · A&amp;M receives</h2>
              <p className="text-meta text-white/60">Halftime first: the Aggie Band takes the field</p>
            </div>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}
