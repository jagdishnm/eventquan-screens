import { ChevronLeft, ChevronRight, RefreshCw, Ticket, WifiOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../components/Button'
import { Screen, ScrollBody } from '../../../../components/Device'
import { TabBar } from '../../../../components/TabBar'
import { IconButton } from '../../../../components/ui'
import { Kicker, Masthead, Nameplate, PrintHead } from '../PrintKit'

/** What needs signal, and is paused until it's back. */
const PAUSED = ['Live score', 'Flyers on the MSC board', 'Where your crew is']

/** The iOS status bar with no service: 9:41, signal bars hollow, no Wi-Fi. White glyphs on the masthead. */
function NoSignalStatusBar() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[54px] text-white">
      <div className="absolute left-1/2 top-[11px] h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute left-[46px] top-[18px] text-emphasis font-semibold tracking-snug">9:41</div>
      <div className="absolute right-[30px] top-[22px] flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" className="fill-current opacity-30">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" className="stroke-current" strokeOpacity="0.4" />
          <rect x="2" y="2" width="14" height="9" rx="2.5" className="fill-current" />
          <path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" className="fill-current" fillOpacity="0.45" />
        </svg>
      </div>
    </div>
  )
}

/**
 * Print state · Offline inside Kyle Field, 6:42 PM Saturday, first quarter. 102,733 people and no
 * signal. The program page was saved at 6:31 PM, and it says so like a printed edition line. What
 * works on paper still works: the yell card, the ticket and the seat. Retry is one quiet button;
 * the gold action is the ticket.
 */
export function PrintKyleFieldOffline() {
  const [trying, setTrying] = useState(false)
  const [lastTry, setLastTry] = useState('6:41 PM')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setTrying(true)
    timer.current = window.setTimeout(() => {
      setTrying(false)
      setLastTry('6:42 PM')
    }, 1600)
  }

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <NoSignalStatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="Program · Page 4"
          lead={
            <IconButton label="Back" to="/">
              <ChevronLeft size={20} />
            </IconButton>
          }
          dateline={
            <>
              <Kicker className="flex items-center gap-1.5 text-paper/80">
                <WifiOff aria-hidden size={13} strokeWidth={2.6} />
                Offline · No signal
              </Kicker>
              <Kicker className="text-gold">Saved 6:31 PM</Kicker>
            </>
          }
        >
          <Nameplate>Kyle Field</Nameplate>
          <p className="mt-1.5 font-serif text-emphasis italic text-paper/85">The saved edition</p>
        </Masthead>

        <div className="relative px-4">
          {/* The edition line, and the one thing you can do about the signal */}
          <section aria-labelledby="saved-title" className="mt-4 border-y-2 border-ink-warm py-3">
            <h2 id="saved-title" className="font-slab text-title font-bold leading-tight">
              This edition was saved at 6:31&nbsp;PM.
            </h2>
            <p className="mt-1 font-serif text-small leading-[1.45] text-ink-warm-2">
              Kyle Field’s network is full with 102,733 in the stands. Everything below works without signal.
            </p>
            <div className="mt-2.5 flex items-center justify-between gap-3">
              <p
                aria-live="polite"
                className="min-w-0 font-mono text-meta font-semibold uppercase tracking-eyebrow tabular text-ink-warm-2"
              >
                {trying ? 'Looking for signal…' : `Last try ${lastTry} · none`}
              </p>
              <Button variant="secondary" loading={trying} onClick={retry} className="shrink-0">
                {trying ? null : <RefreshCw size={16} strokeWidth={2.4} />}
                Retry
              </Button>
            </div>
          </section>

          {/* Ticket and seat, as a stub */}
          <section aria-labelledby="ticket-title" className="mt-5">
            <PrintHead id="ticket-title" aside="Scans offline">
              Your ticket
            </PrintHead>
            <article className="relative mt-3 flex overflow-hidden rounded-tag bg-white shadow-raised">
              <div className="flex w-[92px] shrink-0 flex-col items-center justify-center bg-maroon py-3 text-paper">
                <Kicker className="text-gold">Sec</Kicker>
                <span className="font-poster text-display-lg font-black leading-none tabular">125</span>
              </div>
              <span aria-hidden className="relative w-0 border-l-2 border-dashed border-ink-warm/25">
                <span className="absolute -left-[7px] -top-[6px] size-[12px] rounded-full bg-paper" />
                <span className="absolute -bottom-[6px] -left-[7px] size-[12px] rounded-full bg-paper" />
              </span>
              <dl className="grid min-w-0 flex-1 grid-cols-3 px-3 py-2.5">
                {[
                  ['Row', '22'],
                  ['Seat', '14'],
                  ['Gate', '2'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>
                      <Kicker className="text-ink-warm-2">{k}</Kicker>
                    </dt>
                    <dd className="font-poster text-display-sm font-extrabold leading-none tabular text-maroon">{v}</dd>
                  </div>
                ))}
                <dd className="col-span-3 mt-1.5 truncate font-serif text-small text-ink-warm-2">
                  A&amp;M vs LSU · Kickoff 6:00 PM
                </dd>
              </dl>
            </article>
            <Button size="lg" className="mt-3 w-full">
              <Ticket size={18} strokeWidth={2.4} />
              Show my ticket
            </Button>
          </section>

          {/* The yell card, saved with the edition */}
          <section aria-labelledby="yell-title" className="mt-6">
            <PrintHead id="yell-title" aside="Saved">
              Yell card
            </PrintHead>
            <Link
              to="/explore/concept/print/5"
              aria-label="Open the saved yell card: Farmers Fight"
              className="press mt-3 flex items-center gap-3 border-b border-ink-warm/15 pb-3"
            >
              <span className="paper-grain -rotate-[1deg] bg-paper-2 px-3 py-2 shadow-raised">
                <Kicker className="relative block text-maroon">No. 3</Kicker>
                <span className="relative block font-poster text-display-sm font-black uppercase leading-[0.9] text-maroon">
                  Farmers
                  <br />
                  Fight
                </span>
              </span>
              <span className="min-w-0 flex-1 font-serif text-small italic leading-snug text-ink-warm">
                Farmers fight! Farmers fight! Fight! Fight! Farmers, farmers fight!
              </span>
              <ChevronRight aria-hidden size={16} className="shrink-0 text-ink-warm-2" />
            </Link>
          </section>

          <section aria-labelledby="paused-title" className="mt-4 border border-dashed border-ink-warm/30 px-3.5 py-3">
            <h2 id="paused-title">
              <Kicker className="text-ink-warm-2">Paused until you’re back online</Kicker>
            </h2>
            <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
              {PAUSED.map((p) => (
                <li key={p} className="flex items-center gap-1.5 font-serif text-small text-ink-warm-2">
                  <span aria-hidden className="size-[5px] rounded-full bg-ink-warm/30" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ScrollBody>
      <TabBar active="map" />
    </Screen>
  )
}
