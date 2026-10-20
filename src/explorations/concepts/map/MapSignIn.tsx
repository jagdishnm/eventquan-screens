import { ArrowRight, BadgeCheck, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Device'
import { AggieMark, EqMark } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { CampusMap } from '../../CampusMap'
import { MapCapsule, MapSheet } from './MapChrome'

/** A node's ring over the map once the campus is found: screen point, radius and this weekend's count. */
type Ring = {
  id: 'tamu' | 'cstat' | 'bryan'
  label: string
  count: number
  x: number
  y: number
  r: number
  /** Ring stroke, fill and label: node colours as they read on the platform's dark map. */
  ring: string
  chip: string
  /** Where the label sits on the ring. */
  at: 'top' | 'bottom'
  delay: string
}

const RINGS: Ring[] = [
  {
    id: 'tamu',
    label: 'Texas A&M',
    count: 128,
    x: 150,
    y: 346,
    r: 78,
    ring: 'border-maroon-line bg-maroon/45',
    chip: 'bg-maroon text-white ring-1 ring-white/25',
    at: 'top',
    delay: '[transition-delay:260ms]',
  },
  {
    id: 'cstat',
    label: 'College Station',
    count: 64,
    x: 304,
    y: 306,
    r: 56,
    ring: 'border-cstat-on-dark/80 bg-cstat/30',
    chip: 'bg-cstat text-white ring-1 ring-white/25',
    at: 'bottom',
    delay: '[transition-delay:420ms]',
  },
  {
    id: 'bryan',
    label: 'Bryan',
    count: 31,
    x: 282,
    y: 190,
    r: 46,
    ring: 'border-bryan-on-dark/80 bg-bryan/30',
    chip: 'bg-bryan text-white ring-1 ring-white/25',
    at: 'top',
    delay: '[transition-delay:580ms]',
  },
]

const TOTAL = RINGS.reduce((n, r) => n + r.count, 0)

function NodeRing({ ring, on }: { ring: Ring; on: boolean }) {
  return (
    <div
      aria-hidden
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-[opacity,scale] duration-(--duration-base) ease-(--ease-out-expo) motion-reduce:transition-none ${
        on ? `scale-100 opacity-100 ${ring.delay}` : 'scale-50 opacity-0'
      }`}
      style={{ left: ring.x, top: ring.y, width: ring.r * 2, height: ring.r * 2 }}
    >
      <span className={`absolute inset-0 rounded-full border-2 ${ring.ring}`} />
      <span className={`absolute -inset-[10px] rounded-full border ${ring.ring} bg-transparent opacity-40`} />
      <span className="absolute inset-0 grid place-content-center text-center text-white">
        <span className="font-display text-display-md font-bold leading-none tabular">{ring.count}</span>
        <span className="mt-0.5 text-micro font-semibold text-white/75">events</span>
      </span>
      <span
        className={`absolute left-1/2 flex h-[24px] -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-meta font-semibold shadow-floating ${ring.chip} ${
          ring.at === 'top' ? '-top-[14px]' : '-bottom-[14px]'
        }`}
      >
        <span className="size-[6px] rounded-full bg-white" />
        {ring.label}
      </span>
    </div>
  )
}

/**
 * Concept 2 · The Map — 1 · Sign in. EventQuan's dark platform map before any skin. A tamu.edu
 * address zooms it to College Station and lights the three node rings with this weekend's count;
 * the capsule above turns maroon as the campus is found.
 */
export function MapSignIn() {
  const [email, setEmail] = useState('jcarter@tamu.edu')
  const found = /@(email\.)?tamu\.edu$/i.test(email.trim())

  return (
    <Screen bg="bg-platform">
      <StatusBar />

      {/* The platform map: the light campus map, inverted into EventQuan's night style. It zooms in on a match. */}
      <div
        aria-hidden
        className={`absolute inset-0 origin-[200px_320px] invert hue-rotate-180 transition-[scale,opacity] duration-(--duration-slow) ease-(--ease-out-expo) motion-reduce:transition-none ${
          found ? 'scale-110 opacity-60' : 'scale-[0.55] opacity-35'
        }`}
      >
        <CampusMap pins={[]} shift={-24} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_38%,transparent_35%,var(--color-platform)_88%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[120px] size-[300px] rounded-full bg-gold/10 blur-[90px]"
      />

      {RINGS.map((r) => (
        <NodeRing key={r.id} ring={r} on={found} />
      ))}

      {/* Midnight Yell is the one thing on right now, at 11:02 PM on game eve */}
      <span
        aria-hidden
        className={`absolute flex h-[24px] -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white/10 px-2.5 text-micro font-semibold text-white ring-1 ring-white/14 backdrop-blur-md transition-opacity duration-(--duration-base) ease-(--ease-out-expo) motion-reduce:transition-none ${
          found ? 'opacity-100 [transition-delay:760ms]' : 'opacity-0'
        }`}
        style={{ left: 226, top: 422 }}
      >
        <span className="size-[6px] rounded-full bg-gold" />
        Midnight Yell · 11:59 PM
      </span>

      <MapCapsule tone={found ? 'maroon' : 'platform'}>
        {found ? <AggieMark size={40} /> : <EqMark size={40} />}
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-body font-bold tracking-snug">
            {found ? (
              'Texas A&M University'
            ) : (
              <>
                Event<span className="text-gold">Quan</span>
              </>
            )}
          </div>
          <div className="truncate text-meta text-white/70">
            {found ? 'College Station, TX · 3 nodes' : 'One platform. Every event.'}
          </div>
        </div>
        {found ? (
          <span className="mr-1.5 flex h-[28px] items-center gap-1 rounded-full bg-white/14 px-2.5 text-micro font-bold tracking-eyebrow text-gold">
            <BadgeCheck size={13} /> FOUND
          </span>
        ) : null}
      </MapCapsule>

      <MapSheet labelledBy="signin-title" dark tabBar={false} className="bg-platform">
        <p className="mt-3 text-micro font-bold uppercase tracking-caps text-gold">
          {found ? 'Howdy · ' : ''}Fri <span className="tabular">11:02</span> PM · Game weekend
        </p>
        {/* The one display moment: this weekend's count at hero scale, 10:1 over the kicker */}
        <h1 id="signin-title" className="mt-1.5 font-display font-extrabold uppercase italic text-white">
          {found ? (
            <span className="flex items-end gap-3">
              <span className="text-display-map leading-[0.78] tracking-headline tabular">{TOTAL}</span>
              <span className="pb-1.5 text-display-sm leading-[0.92] text-balance">
                Events around you this weekend
              </span>
            </span>
          ) : (
            <span className="block text-display-xl leading-[0.86] tracking-headline text-balance">
              Everything live, on one map
            </span>
          )}
        </h1>

        <label className="mt-4 block">
          <span className="text-small font-medium text-white/60">School email</span>
          <span
            className={`mt-1.5 flex h-[54px] items-center gap-3 rounded-thumb bg-white/8 px-4 ring-1 transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
              found ? 'ring-gold/70' : 'ring-white/14'
            }`}
          >
            <Mail aria-hidden size={19} className="text-white/60" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              autoComplete="email"
              aria-describedby="signin-hint"
              placeholder="you@tamu.edu"
              className="min-w-0 flex-1 bg-transparent text-emphasis text-white outline-none placeholder:text-white/60"
            />
            {found ? (
              <span className="flex items-center gap-1 rounded-full bg-maroon px-2 py-1 text-micro font-bold text-white">
                <BadgeCheck size={13} /> TAMU
              </span>
            ) : null}
          </span>
        </label>
        <p id="signin-hint" aria-live="polite" className={`mt-2 text-small ${found ? 'text-gold' : 'text-white/60'}`}>
          {found
            ? 'Texas A&M found. Zoomed to College Station: A&M, College Station and Bryan.'
            : 'Use your tamu.edu email and the map zooms to your campus.'}
        </p>

        <Button size="lg" className="mt-4 w-full" disabled={!found}>
          Continue <ArrowRight size={18} />
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-meta text-white/60">
          <Lock aria-hidden size={12} /> Texas A&amp;M single sign-on · Duo protected
        </p>
      </MapSheet>
    </Screen>
  )
}
