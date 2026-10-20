import { ChevronLeft, ChevronRight, Share } from 'lucide-react'
import { useState } from 'react'
import { Avatar, Faces } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

/** A square map snippet: Kyle Field to Grand Station along Texas Ave, the pin in College Station green. */
function MapSnippet() {
  return (
    <svg viewBox="0 0 64 64" className="size-[64px] shrink-0 overflow-hidden rounded-thumb bg-cstat-soft" aria-hidden>
      <path d="M-4 46 L70 30" className="stroke-white" strokeWidth="5" />
      <path d="M22 -4 L30 70" className="stroke-white" strokeWidth="4" />
      <path d="M44 -4 L50 70" className="stroke-white" strokeWidth="3" />
      <path d="M10 10 Q26 30 44 34" fill="none" className="stroke-maroon" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="10" cy="10" r="4" className="fill-maroon" />
      <circle cx="44" cy="34" r="8" className="fill-cstat/25" />
      <circle cx="44" cy="34" r="5" className="fill-cstat stroke-white" strokeWidth="2" />
    </svg>
  )
}

/**
 * E4 · Invitee view. What Maya sees when she taps the notification: the event as its own page,
 * the black and gold 9:30 cover, who's hosting, who's in, where it is, and one gold "I'm in".
 */
export function E4InviteeView() {
  const [going, setGoing] = useState(false)
  return (
    <Screen>
      <StatusBar />
      <ScrollBody className="pb-[180px]">
        {/* Cover: the same black and gold time tile, at full size */}
        <header className="relative h-[218px] overflow-hidden bg-radial-[at_15%_0%] from-maroon-deep to-night-2 to-65% pt-[54px] text-white">
          <div className="relative flex h-[44px] items-center justify-between px-4">
            <IconButton label="Back to Gameday crew" surface="onPhoto" to="/explore/quick-event-thread">
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton label="Share event" surface="onPhoto">
              <Share size={17} />
            </IconButton>
          </div>
          <div aria-hidden className="relative px-5 pt-4">
            <Eyebrow tone="onDark">Tonight · Sat, Oct 12</Eyebrow>
            <div className="mt-1 flex items-baseline gap-2 font-display font-extrabold italic leading-none">
              <span className="text-display-xl text-gold">9:30</span>
              <span className="text-display-sm text-white/60">PM</span>
            </div>
          </div>
        </header>

        <div className="relative -mt-[22px] rounded-t-sheet bg-canvas px-4 pt-4">
          <div className="flex items-center gap-2">
            <Badge tone="soon">Quick Event</Badge>
            <span className="text-meta text-ink-3">in Gameday crew</span>
          </div>
          <h1 className="mt-1.5 text-headline font-bold tracking-headline">Post-game bowling</h1>

          {/* Host */}
          <div className="mt-3 flex items-center gap-3 rounded-card bg-white p-3 shadow-raised">
            <Avatar initials="JC" color={1} size={40} />
            <div className="min-w-0 flex-1">
              <div className="text-body font-semibold">Jordan Carter &rsquo;27 invited you</div>
              <p className="text-small text-ink-2">&ldquo;Loser buys Whataburger&rdquo;</p>
            </div>
          </div>

          {/* When and where */}
          <ul className="mt-2.5 divide-y divide-hairline rounded-card bg-white shadow-raised">
            <li className="flex items-center gap-3 p-3">
              <span
                aria-hidden
                className="flex size-[64px] shrink-0 flex-col items-center justify-center rounded-thumb bg-maroon-soft leading-none"
              >
                <span className="text-micro font-bold tracking-eyebrow text-maroon">SAT</span>
                <span className="mt-0.5 font-display text-display-sm font-bold text-ink">12</span>
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-body font-semibold">Tonight, 9:30 PM</div>
                <div className="text-small text-ink-2">~15 min after A&amp;M vs LSU ends</div>
              </div>
            </li>
            <li>
              <a href="#directions" className="flex items-center gap-3 p-3">
                <MapSnippet />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body font-semibold">Grand Station</span>
                    <Badge tone="node" node="cstat" />
                  </div>
                  <div className="text-small text-ink-2">9 min drive from Kyle Field</div>
                  <div className="text-meta font-semibold text-cstat">Aggie Night · $2 shoes with Aggie ID</div>
                </div>
                <ChevronRight aria-hidden size={16} className="shrink-0 text-ink-3" />
              </a>
            </li>
          </ul>

          {/* Who's in */}
          <div className="mt-2.5 flex items-center gap-3 rounded-card bg-white p-3 shadow-raised">
            <Faces n={going ? 4 : 3} size={28} />
            <div className="min-w-0 flex-1">
              <div className="text-body font-semibold">{going ? '4' : '3'} in from your crew</div>
              <div className="text-small text-ink-2">Jordan, Alex, Brooke{going ? ', you' : ''} · Kendall maybe</div>
            </div>
          </div>
        </div>
      </ScrollBody>

      {/* The one decision, docked above the tab bar */}
      <div className="absolute inset-x-0 bottom-[84px] z-20 border-t border-hairline bg-canvas/95 px-4 pb-3 pt-3 backdrop-blur-xl">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Button size="lg" className="w-full" aria-pressed={going} onClick={() => setGoing((v) => !v)}>
            {going ? "You're in" : "I'm in"}
          </Button>
          <Button size="lg" variant="secondary">
            Maybe
          </Button>
        </div>
      </div>
      <TabBar active="messages" />
    </Screen>
  )
}
