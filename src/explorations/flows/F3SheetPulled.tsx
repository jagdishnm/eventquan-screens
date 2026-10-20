import { ChevronLeft, Clock, MapPin, Share, Sparkles } from 'lucide-react'
import { Faces } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

/**
 * F3 · A sheet pulled out. Tap a pierced sheet and it lifts off the straw as a page of its own:
 * tilted like paper, with the hole the straw left, and everything you need to go now.
 */
export function F3SheetPulled() {
  return (
    <Screen>
      <StatusBar />
      <ScrollBody className="pb-[180px]">
        <header className="bg-maroon px-4 pb-[40px] pt-[54px] text-white">
          <div className="flex h-[44px] items-center gap-2">
            <IconButton label="Back to your straw" to="/explore/home-straw">
              <ChevronLeft size={20} />
            </IconButton>
            <div className="min-w-0 flex-1">
              <div className="text-emphasis font-semibold">From your straw</div>
              <div className="text-meta text-white/75">9:41 AM · 2 sheets pierced</div>
            </div>
            <IconButton label="Share 12th Man Brunch">
              <Share size={17} />
            </IconButton>
          </div>
        </header>

        {/* The straw stays where it was, through what's left of the stack; the sheet has lifted off it */}
        <span aria-hidden className="absolute left-[41px] top-[138px] z-0 h-[500px] w-[6px] rounded-full bg-gold" />

        <article
          aria-labelledby="sheet-title"
          className="relative z-10 ml-[58px] mr-3 -mt-[30px] rotate-[1.4deg] rounded-card bg-white px-3 pb-3 pt-9 shadow-floating"
        >
          {/* The hole the straw made, in the paper's top margin */}
          <span
            aria-hidden
            className="absolute left-[14px] top-[11px] size-[16px] rounded-full bg-canvas ring-2 ring-gold/50"
          />
          <span className="absolute left-[40px] top-[12px] text-micro font-bold tracking-eyebrow text-ink-3">
            PULLED FROM YOUR STRAW
          </span>
          <div className="relative overflow-hidden rounded-thumb">
            <img src="/img/twelfth-man.jpg" alt="" className="h-[150px] w-full object-cover" />
            <div className="absolute left-2.5 top-2.5">
              <Badge tone="live" surface="dark">
                till 11 AM
              </Badge>
            </div>
          </div>
          <div className="px-1 pt-3">
            <Eyebrow tone="maroon">Tradition · Pre-game</Eyebrow>
            <h1 id="sheet-title" className="mt-0.5 text-headline font-bold tracking-headline">
              12th Man Brunch
            </h1>
            <ul className="mt-2.5 flex flex-col gap-2 text-small text-ink-2">
              <li className="flex items-center gap-2.5">
                <span className="grid size-[28px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                  <Clock size={15} />
                </span>
                <span>
                  <span className="font-semibold text-ink">9:00 – 11:00 AM</span> · Yell Leaders at 10
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="grid size-[28px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                  <MapPin size={15} />
                </span>
                <span className="font-semibold text-ink">Hall of Champions</span>
                <Badge tone="node" node="tamu">
                  A&amp;M
                </Badge>
              </li>
              <li className="flex items-center gap-2.5">
                <Faces n={3} size={22} />
                <span>
                  <span className="font-semibold text-ink">Maya, Alex + 2</span> are there
                </span>
              </li>
            </ul>
            <p className="mt-3 flex items-start gap-2 rounded-well bg-soon px-2.5 py-2 text-meta text-soon-ink">
              <Sparkles size={14} className="mt-[1px] shrink-0" />
              In your straw for Traditions, the A&amp;M node and a 9 min walk
            </p>
          </div>
        </article>

        {/* What's still on the straw */}
        <div
          aria-label="Farmers Market, still in your straw"
          className="relative mx-4 mt-4 flex h-[58px] -rotate-[0.4deg] items-center gap-3 rounded-thumb bg-white pl-[50px] pr-3 shadow-raised"
        >
          <span
            aria-hidden
            className="absolute left-[20px] top-1/2 z-30 size-[16px] -translate-y-1/2 rounded-full bg-gold ring-4 ring-gold/30"
          />
          <img src="/img/farmers-market.jpg" alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-body font-semibold tracking-snug">Farmers Market</span>
            <span className="flex items-center gap-1 text-meta text-ink-3">
              <span className="size-[6px] shrink-0 rounded-full bg-cstat" />
              Wolf Pen Creek · till noon
            </span>
          </span>
          <span className="shrink-0 text-meta text-ink-3">Still pierced</span>
        </div>
      </ScrollBody>

      <div className="absolute inset-x-0 bottom-[84px] z-20 border-t border-hairline bg-canvas/95 px-4 pb-3 pt-3 backdrop-blur-xl">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Button size="lg" className="w-full">
            Go · 9 min walk
          </Button>
          <Button size="lg" variant="secondary">
            Put back
          </Button>
        </div>
      </div>
      <TabBar active="home" />
    </Screen>
  )
}
