import { ArrowRight, BadgeCheck, CircleAlert, Lock, Mail, Wand2 } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../components/Button'
import { Screen } from '../../../../components/Device'
import { EqMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { CampusMap } from '../../../CampusMap'
import { CapsuleTitle, MapCapsule, MapSheet, SheetTitle } from '../MapChrome'

const isAggie = (v: string) => /@(email\.)?tamu\.edu$/i.test(v.trim())

/** Edit distance between two short strings. */
function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = cur
    }
  }
  return row[b.length]
}

/** A near-miss on the campus domain (two letters or fewer off "tamu.edu") gets a one-tap fix. */
function suggest(v: string) {
  const m = /^([^@\s]+)@(.+)$/.exec(v.trim())
  if (!m || isAggie(v)) return undefined
  return distance(m[2].toLowerCase(), 'tamu.edu') <= 2 ? `${m[1]}@tamu.edu` : undefined
}

/**
 * Map · State · Sign in with a typo, 11:02 PM Friday. Jordan typed "tamu.eud". The dark platform map
 * stays zoomed out, and where College Station would light up there's a dashed, unlit ring: the map
 * couldn't find a campus at that address. The field keeps every character, names the one thing
 * that's wrong, and offers the fix as a single tap. Continue stays disabled until it's right.
 */
export function MapSignInError() {
  const [email, setEmail] = useState('jcarter@tamu.eud')
  const errId = useId()
  const valid = isAggie(email)
  const fix = suggest(email)
  const wrong = !valid && email.trim() !== ''

  return (
    <Screen bg="bg-platform">
      <StatusBar />

      {/* The platform map, still at country scale: no campus found yet */}
      <div
        aria-hidden
        className={`absolute inset-0 origin-[200px_320px] invert hue-rotate-180 transition-[scale,opacity] duration-(--duration-slow) ease-(--ease-out-expo) motion-reduce:transition-none ${
          valid ? 'scale-110 opacity-60' : 'scale-[0.55] opacity-35'
        }`}
      >
        <CampusMap pins={[]} shift={-24} you={false} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_38%,transparent_35%,var(--color-platform)_88%)]"
      />

      {/* Where the campus would light: an unlit, dashed ring with the address that missed */}
      <div
        aria-hidden
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: 196, top: 290, width: 168, height: 168 }}
      >
        <span
          className={`absolute inset-0 rounded-full border-2 transition-colors duration-(--duration-base) ease-(--ease-out-expo) motion-reduce:transition-none ${
            valid ? 'border-maroon-line bg-maroon/45' : 'border-dashed border-white/25'
          }`}
        />
        <span className="absolute inset-0 grid place-content-center text-center">
          <span
            className={`font-display text-display-md font-bold leading-none ${valid ? 'text-white' : 'text-white/30'}`}
          >
            {valid ? 'A&M' : '?'}
          </span>
        </span>
        <span
          className={`absolute -bottom-[14px] left-1/2 flex h-[26px] -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-meta font-semibold shadow-floating ${
            valid ? 'bg-maroon text-white' : 'bg-night-3 text-white/75 ring-1 ring-white/14'
          }`}
        >
          {valid ? (
            <>
              <BadgeCheck size={13} className="text-gold" /> College Station
            </>
          ) : (
            <>No campus at “{email.split('@')[1] || '…'}”</>
          )}
        </span>
      </div>

      <MapCapsule tone="platform">
        <EqMark size={40} />
        <CapsuleTitle
          as="div"
          title={
            <>
              Event<span className="text-gold">Quan</span> · Sign in
            </>
          }
          meta="One platform. Every event."
        />
      </MapCapsule>

      <MapSheet labelledBy="signin-error-title" dark tabBar={false} className="bg-platform">
        <SheetTitle id="signin-error-title" as="h1" dark kicker="Fri 11:02 PM · Game weekend">
          {valid ? 'Found you' : 'Almost there'}
        </SheetTitle>

        <label htmlFor="map-email" className="mt-4 block text-small font-medium text-white/60">
          School email
        </label>
        <span
          className={`mt-1.5 flex h-[54px] items-center gap-3 rounded-thumb bg-white/8 px-4 ring-2 transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
            wrong ? 'ring-error-on-dark' : valid ? 'ring-gold/70' : 'ring-white/14'
          }`}
        >
          <Mail aria-hidden size={19} className={wrong ? 'text-error-on-dark' : 'text-white/60'} />
          <input
            id="map-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={wrong || undefined}
            aria-describedby={errId}
            placeholder="netid@tamu.edu"
            className="min-w-0 flex-1 bg-transparent text-emphasis text-white outline-none placeholder:text-white/60"
          />
          {valid ? (
            <span className="flex items-center gap-1 rounded-full bg-maroon px-2 py-1 text-micro font-bold text-white">
              <BadgeCheck aria-hidden size={13} /> TAMU
            </span>
          ) : null}
        </span>

        {/* What's wrong, in one line, and the fix as one tap. Read out as it changes. */}
        <div id={errId} aria-live="polite" className="mt-2">
          {wrong ? (
            <div className="rounded-thumb bg-white/8 px-3 py-2.5 ring-1 ring-error-on-dark/40">
              <p className="flex gap-2 text-small text-white/75">
                <CircleAlert aria-hidden size={16} strokeWidth={2.4} className="mt-[1px] shrink-0 text-error-on-dark" />
                <span>
                  <b className="block font-semibold text-error-on-dark">
                    {fix ? 'Check the ending: it should be tamu.edu' : 'Use your Texas A&M email'}
                  </b>
                  {fix ? 'We kept what you typed, so it’s one tap to fix.' : 'It ends in @tamu.edu.'}
                </span>
              </p>
              {fix ? (
                <button
                  type="button"
                  onClick={() => setEmail(fix)}
                  className="mt-2 flex h-[44px] w-full items-center gap-2 rounded-well bg-white/8 px-3 text-left text-control font-semibold text-white ring-1 ring-white/14 transition-[transform,background-color] duration-(--duration-quick) ease-(--ease-out-expo) active:scale-[0.98] active:bg-white/14 motion-reduce:transition-none"
                >
                  <Wand2 aria-hidden size={15} className="text-gold" />
                  <span className="min-w-0 flex-1 truncate">
                    Use <span className="text-gold">{fix}</span>
                  </span>
                </button>
              ) : null}
            </div>
          ) : (
            <p className={`text-small ${valid ? 'text-gold' : 'text-white/60'}`}>
              {valid
                ? 'Texas A&M found. The map zooms to College Station.'
                : 'Use your tamu.edu email and the map zooms to your campus.'}
            </p>
          )}
        </div>

        {/* Disabled until the address is right; the reason sits right above it */}
        <Button size="lg" className="mt-4 w-full" disabled={!valid}>
          Continue <ArrowRight size={18} />
        </Button>
        <div className="mt-1 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-meta text-white/60">
            <Lock aria-hidden size={12} /> NetID sign-on · Duo
          </p>
          <Link
            to="/"
            className="flex h-[44px] items-center rounded-well px-1 text-control font-semibold text-gold"
          >
            Browse without signing in
          </Link>
        </div>
      </MapSheet>
    </Screen>
  )
}
