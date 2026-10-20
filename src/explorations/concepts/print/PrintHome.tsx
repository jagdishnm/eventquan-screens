import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LiveDot } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Screen, ScrollBody } from '../../../components/Device'
import { MatchupThumb } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { NODE_META, type Node } from '../../../data/events'
import { TILES } from '../../../data/homeTiles'
import { Kicker, Masthead, PrintHead } from './PrintKit'

/** Today's column: the day in the order it happens. */
const TODAY: { t: string; title: string; where: string; node: Node; live?: boolean }[] = [
  { t: '8:00 AM', title: 'Farmers Market', where: 'Wolf Pen Creek', node: 'cstat', live: true },
  { t: '10:00 AM', title: 'Tailgate Zone', where: 'Lot C, Kyle Field', node: 'tamu' },
  { t: '11:00 AM', title: 'MSC Open House', where: 'Memorial Student Center', node: 'tamu' },
  { t: '3:45 PM', title: 'Corps march-in', where: 'The Quad to Kyle', node: 'tamu' },
]

/** Traditions column. Silver Taps is set quietly, as it is on campus. */
const TRADITIONS = [
  {
    title: 'Midnight Yell',
    when: 'Fri, Oct 18 · 11:59 PM',
    where: 'Kyle Field',
    note: 'Before the next home game. 18K going.',
  },
  {
    title: 'Silver Taps',
    when: 'Tue, Nov 5 · 10:30 PM',
    where: 'Academic Plaza',
    note: 'For Aggies we have lost. Held in silence, no phones.',
    quiet: true,
  },
]

/** On the MSC board: the flyers still up, with the tabs still left. */
const BOARD = [
  { title: 'Post-game bowling', when: 'Tonight 9:30', tabs: 7, taken: 3, paper: 'bg-white', ink: 'text-maroon' },
  { title: 'Maya’s 21st', when: 'Fri 8:00', tabs: 8, taken: 4, paper: 'bg-gold', ink: 'text-maroon' },
  { title: 'Pickup volleyball', when: 'Sun 4:00', tabs: 12, taken: 9, paper: 'bg-cstat', ink: 'text-white' },
]

/**
 * Print · University Home as the front page.
 * "The Saturday Sheet" is EventQuan's own one-page edition: tonight's game as the lead story,
 * columns for today and the week's traditions, the MSC board, and the founder's twelve tiles
 * kept in his order as the printed index.
 */
export function PrintHome() {
  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="EventQuan · Vol. 4 · No. 7"
          dateline={
            <>
              <Kicker className="text-paper/80">Sat · Oct 12 · College Station</Kicker>
              <Kicker className="text-gold">72° Sunny</Kicker>
            </>
          }
        >
          <p className="text-center font-serif text-small italic text-paper/80">The</p>
          <p className="-mt-1 text-center font-poster text-display-xl font-black uppercase leading-[0.9] tracking-headline">
            Saturday Sheet
          </p>
        </Masthead>

        <div className="relative px-4">
          <h1 className="mt-4 font-poster text-display-lg font-extrabold uppercase leading-[0.92] text-balance text-maroon">
            This Saturday in Aggieland
          </h1>

          {/* Lead story */}
          <article aria-labelledby="lead-title" className="mt-3 border-t-2 border-ink-warm pt-3">
            <Kicker className="text-maroon">Lead · SEC football · Kyle Field</Kicker>
            <div className="mt-2 flex gap-3">
              <div className="relative shrink-0">
                <img
                  src="/img/kyle-field-crowd.jpg"
                  alt="The Kyle Field crowd on a game night."
                  className="size-[112px] object-cover grayscale contrast-125"
                />
                <span className="absolute -bottom-2 -right-2">
                  <MatchupThumb size={44} />
                </span>
              </div>
              <div className="min-w-0">
                <h2 id="lead-title" className="font-slab text-title font-bold leading-[1.15] text-ink-warm">
                  Aggies host LSU under the lights
                </h2>
                <p className="mt-1 font-serif text-small leading-[1.45] text-ink-warm-2">
                  Kickoff at 6:00. Gates at 4. The 12th Man stands all four quarters, as it has since 1922.
                </p>
              </div>
            </div>
            <Link to="/gameday" className="mt-4 block rounded-thumb">
              <Button as="span" size="lg" className="w-full">
                Open tonight’s program <ArrowRight size={18} />
              </Button>
            </Link>
          </article>

          {/* Two columns, ruled like a broadsheet */}
          <div className="mt-5 grid grid-cols-2 border-t-2 border-ink-warm">
            <section aria-labelledby="today-col" className="border-r border-ink-warm/25 pr-3 pt-2.5">
              <h2 id="today-col" className="font-poster text-title font-extrabold uppercase leading-none">
                Today
              </h2>
              <ul className="mt-1.5 divide-y divide-ink-warm/15">
                {TODAY.map((e) => (
                  <li key={e.title} className="py-2">
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-meta font-semibold tabular text-maroon">{e.t}</span>
                      {e.live ? <LiveDot /> : null}
                    </span>
                    <span className="block font-slab text-control font-bold leading-tight">{e.title}</span>
                    <span className="mt-0.5 flex items-center gap-1 font-serif text-meta leading-tight text-ink-warm-2">
                      <span className={`size-[6px] shrink-0 rounded-full ${NODE_META[e.node].dot}`} />
                      <span className="truncate">{e.where}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="trad-col" className="pl-3 pt-2.5">
              <h2 id="trad-col" className="font-poster text-title font-extrabold uppercase leading-none">
                Traditions
              </h2>
              <ul className="mt-1.5 divide-y divide-ink-warm/15">
                {TRADITIONS.map((t) => (
                  <li key={t.title} className="py-2">
                    <span className="block font-mono text-meta font-semibold tabular text-maroon">{t.when}</span>
                    <span className="block font-slab text-control font-bold leading-tight">{t.title}</span>
                    <span className="block font-serif text-meta leading-tight text-ink-warm-2">{t.where}</span>
                    <span
                      className={`mt-1 block font-serif text-small italic leading-snug ${t.quiet ? 'text-ink-warm-2' : 'text-ink-warm'}`}
                    >
                      {t.note}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* The MSC board */}
          <section aria-labelledby="board-title" className="mt-5">
            <PrintHead id="board-title" aside="3 flyers up">
              On the MSC board
            </PrintHead>
            <ul className="mt-3 grid grid-cols-3 gap-2.5">
              {BOARD.map((f, i) => (
                <li key={f.title}>
                  <Link
                    to="/events"
                    aria-label={`${f.title}, ${f.when}. ${f.tabs - f.taken} of ${f.tabs} tabs left.`}
                    className={`block ${f.paper} shadow-floating ${i === 1 ? 'rotate-[1.5deg]' : '-rotate-[1.2deg]'}`}
                  >
                    <span className="block h-[70px] px-2 pt-2">
                      <span className={`block font-poster text-card font-extrabold uppercase leading-[0.95] ${f.ink}`}>
                        {f.title}
                      </span>
                      <span className={`mt-1 block font-mono text-meta font-semibold tabular ${f.ink}`}>{f.when}</span>
                    </span>
                    <span aria-hidden className="flex h-[16px] border-t border-dashed border-black/20">
                      {Array.from({ length: f.tabs }).map((_, k) => (
                        <span
                          key={k}
                          className={`flex-1 border-l border-dashed border-black/20 first:border-l-0 ${k < f.taken ? 'bg-paper-2' : ''}`}
                        />
                      ))}
                    </span>
                  </Link>
                  <p className="mt-2 text-center font-mono text-meta font-semibold uppercase tracking-eyebrow tabular text-ink-warm-2">
                    {f.tabs - f.taken} tabs left
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Inside: the twelve tiles as a printed index, in the founder's order */}
          <nav aria-labelledby="inside-title" className="mt-5">
            <PrintHead id="inside-title" aside="12 sections">
              Inside
            </PrintHead>
            <ol className="grid grid-cols-2 gap-x-4">
              {TILES.map((t, i) => {
                const row = (
                  <>
                    <t.Icon size={15} strokeWidth={2} className="shrink-0 text-maroon" aria-hidden />
                    <span className="min-w-0 shrink truncate font-slab text-control font-bold">{t.label}</span>
                    <span
                      aria-hidden
                      className="h-0 min-w-2 flex-1 translate-y-[5px] border-b-2 border-dotted border-ink-warm/30"
                    />
                    <span className="font-mono text-meta font-semibold tabular text-ink-warm-2">p.{i + 2}</span>
                  </>
                )
                const cls = 'flex h-[44px] items-center gap-1.5 border-b border-ink-warm/15'
                return (
                  <li key={t.label}>
                    {t.to ? (
                      <Link to={t.to} className={cls}>
                        {row}
                      </Link>
                    ) : (
                      <button type="button" className={`${cls} w-full text-left`}>
                        {row}
                      </button>
                    )}
                  </li>
                )
              })}
            </ol>
            <p className="mt-3 text-center font-serif text-small italic text-ink-warm-2">
              Live in this edition: Sbisa open · Rt 40 in 12 min · 4 on now on the map.
            </p>
          </nav>
        </div>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
