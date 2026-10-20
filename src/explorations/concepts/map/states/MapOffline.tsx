import { Check, CloudOff, DoorOpen, PauseCircle, RefreshCw, Ticket } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Avatar } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen } from '../../../../components/Device'
import { AggieMark, LsuMark } from '../../../../components/Marks'
import { TabBar } from '../../../../components/TabBar'
import { MapCapsule, MapSheet, SheetTitle } from '../MapChrome'
import { Bowl, CREW, centre, GATE, ME, pt } from '../MapStadium'

/** When each friend's pin last reached us, before the signal went at 7:18 PM. */
const LAST_SEEN: Record<string, string> = { MR: '7:12', AL: '7:15', BN: '7:09', KT: '7:16' }

const GATES: { label: string; at: [number, number]; yours?: boolean }[] = [
  { label: 'Gate 2', at: GATE, yours: true },
  { label: 'Gate 4', at: pt(3, 0.15, 150) },
]

const WORKS = ['Ticket and seat', 'Gates and the way out', 'This map']
const PAUSED = ['Crew live pins', 'Line waits', 'Live score']

/** The iOS status bar with no service: hollow bars, no Wi-Fi. Still 9:41. */
function NoSignalStatusBar() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[54px] text-white">
      <div className="absolute left-1/2 top-[11px] h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute left-[46px] top-[18px] text-emphasis font-semibold tracking-snug">9:41</div>
      <div className="absolute right-[30px] top-[22px] flex items-center gap-[6px]">
        <span className="text-micro font-semibold">No Service</span>
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
 * Map · State · No signal inside Kyle Field, 7:18 PM, second quarter. 102,733 in the stands and no
 * service. The bowl is cached, so the map still works: your seat in gold, both gates and the way
 * out to Gate 2. Your crew stays on the map at their last-known spots, greyed, dashed and stamped
 * with the time we last heard. The score in the capsule says when it was true. Retry is the one
 * gold action; the ticket is a tap away and works without signal.
 */
export function MapOffline() {
  const [trying, setTrying] = useState(false)
  const [lastTry, setLastTry] = useState('7:18 PM')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const retry = () => {
    setTrying(true)
    timer.current = window.setTimeout(() => {
      setTrying(false)
      setLastTry('7:19 PM')
    }, 1600)
  }

  return (
    <Screen bg="bg-night">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_42%_at_50%_37%,color-mix(in_oklab,var(--color-white)_5%,transparent),transparent_70%)]"
      />
      {/* The cached bowl, a touch dimmer than live; crew sections stay marked */}
      <div aria-hidden className="absolute inset-0 opacity-80 saturate-50">
        <Bowl highlight={new Set(CREW.map((f) => f.sec))} />
      </div>
      <h1 className="sr-only">Kyle Field offline: your seat, the gates and your crew’s last-known spots</h1>

      {GATES.map((g) => (
        <span
          key={g.label}
          aria-hidden
          className={`absolute z-10 flex h-[26px] -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-meta font-bold shadow-floating ${
            g.yours ? 'bg-gold text-gold-ink' : 'bg-night-3 text-white ring-1 ring-white/20'
          }`}
          style={{ left: g.at[0], top: g.at[1] }}
        >
          <DoorOpen size={13} strokeWidth={2.4} /> {g.label}
        </span>
      ))}

      {/* Your seat: still exact, because it's on the ticket, not from GPS */}
      <span
        aria-hidden
        className="absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center"
        style={{ left: ME[0], top: ME[1] }}
      >
        <span className="grid size-[30px] place-items-center rounded-full bg-gold text-micro font-bold text-gold-ink ring-2 ring-night">
          You
        </span>
      </span>

      {/* The crew at their last-known spots: greyed, dashed, stamped with the time */}
      {CREW.map((f) => {
        const [x, y] = centre(f.sec, f.sec >= 300 ? 0.5 : 0.45)
        return (
          <span
            key={f.initials}
            aria-hidden
            className="absolute z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center"
            style={{ left: x, top: y }}
          >
            <span className="rounded-full border-2 border-dashed border-white/60 p-[2px]">
              <Avatar initials={f.initials} color={f.color} size={24} className="opacity-60 grayscale" />
            </span>
            <span className="mt-0.5 rounded-full bg-night-3 px-1.5 text-tab font-bold text-white/75 ring-1 ring-white/14 tabular">
              {LAST_SEEN[f.initials]}
            </span>
          </span>
        )
      })}

      <NoSignalStatusBar />
      <MapCapsule>
        <AggieMark size={38} />
        <div className="leading-none">
          <p className="text-micro font-bold uppercase tracking-caps text-white/70">Kyle Field</p>
          <p className="mt-0.5 flex items-baseline gap-2 font-display text-display-sm font-bold text-white/60 tabular">
            <span className="sr-only">Last known score: Texas A&amp;M</span>
            <span>21</span>
            <span aria-hidden className="text-title text-white/30">
              –
            </span>
            <span className="sr-only">LSU</span>
            <span>17</span>
          </p>
        </div>
        <LsuMark size={38} />
        <span className="ml-auto mr-1.5 flex h-[26px] items-center gap-1 rounded-full bg-white/14 px-2.5 text-micro font-bold uppercase tracking-eyebrow text-white tabular">
          <CloudOff aria-hidden size={12} strokeWidth={2.4} /> Q2 4:12 · 7:18
        </span>
      </MapCapsule>

      {/* What's going on, floating where the toggles sit when live */}
      <p className="absolute inset-x-3 top-[122px] z-30 flex h-[40px] items-center gap-2 rounded-full bg-night-3/90 px-3.5 text-control font-semibold text-white shadow-floating ring-1 ring-white/14 backdrop-blur-md">
        <span className="grid size-[14px] shrink-0 place-items-center rounded-full bg-white/25">
          <span className="size-[6px] rounded-full bg-white/60" />
        </span>
        No signal · map saved at <span className="tabular">7:18 PM</span>
        <span className="ml-auto text-meta font-medium text-white/60">Last known</span>
      </p>

      <MapSheet labelledBy="offline-title" dark>
        <SheetTitle
          id="offline-title"
          dark
          size="hero"
          kicker="Offline · your seat still works"
          aside={<span className="font-semibold text-white tabular">Row 22 · Seat 9</span>}
        >
          Sec <span className="tabular">125</span>
        </SheetTitle>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <ul aria-label="Works offline" className="rounded-thumb bg-night-3 px-3 py-2.5 ring-1 ring-white/8">
            {WORKS.map((w) => (
              <li key={w} className="flex items-center gap-1.5 py-0.5 text-meta font-semibold text-white">
                <Check aria-hidden size={13} strokeWidth={3} className="shrink-0 text-success-on-dark" />
                <span className="truncate">{w}</span>
              </li>
            ))}
          </ul>
          <ul aria-label="Paused until signal" className="rounded-thumb bg-night-3 px-3 py-2.5 ring-1 ring-white/8">
            {PAUSED.map((w) => (
              <li key={w} className="flex items-center gap-1.5 py-0.5 text-meta text-white/60">
                <PauseCircle aria-hidden size={13} className="shrink-0" />
                <span className="truncate">{w}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <Button size="lg" className="w-full" loading={trying} onClick={retry}>
            {trying ? null : <RefreshCw size={18} strokeWidth={2.4} />}
            {trying ? 'Trying…' : 'Retry'}
          </Button>
          <Button size="lg" variant="tonal" className="px-4">
            <Ticket size={18} /> Ticket
          </Button>
        </div>
        <p aria-live="polite" className="mt-2 text-center text-meta text-white/60">
          {trying ? 'Looking for signal…' : `Still no signal · last tried ${lastTry}`}
        </p>
      </MapSheet>

      <TabBar active="map" surface="dark" />
    </Screen>
  )
}
