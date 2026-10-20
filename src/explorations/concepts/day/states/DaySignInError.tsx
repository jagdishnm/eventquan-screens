import { ArrowRight, BadgeCheck, CircleAlert, Lock, Mail, Megaphone, MoonStar } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../components/Button'
import { Screen } from '../../../../components/Device'
import { AggieMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { BigTime, OnRail, TimeRail } from '../Rail'
import { LANE_X, timeScale } from '../time'

/** Friday, Oct 11, 11:02 PM. Hours past 24 are Saturday. */
const NOW = 23 + 2 / 60
const y = timeScale([
  [NOW, 22],
  [24, 92],
  [25, 150],
])

/** The NetIDs we know on this phone's network. Jordan Carter is jcarter. */
const KNOWN = ['jcarter']
const isNetId = (v: string) => /^[a-z][a-z0-9._-]{1,30}$/i.test(v)

/**
 * State · Sign in, NetID not found, 11:02 PM Friday. The @tamu.edu suffix is fixed, so the domain
 * can't be wrong; this is the error that's left: a typo in the NetID. The field keeps what was
 * typed, the message says plainly what happened and offers the likely fix in one tap, and the
 * straw shows only what's public (Midnight Yell) until we know who you are.
 */
export function DaySignInError() {
  const [netid, setNetid] = useState('jcarterr')
  const errId = useId()
  const found = KNOWN.includes(netid.toLowerCase())
  const typed = isNetId(netid)
  const suggestion = !found && typed ? KNOWN.find((k) => netid.toLowerCase().startsWith(k)) : undefined

  return (
    <Screen bg="bg-canvas">
      <StatusBar />
      <main className="absolute inset-0 flex flex-col">
        <header className="relative overflow-hidden bg-maroon-deep px-5 pb-5 pt-[60px] text-white">
          <img
            src="/img/midnight-yell.jpg"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-b from-maroon-deep/40 via-maroon-deep/85 to-maroon-deep" />
          <div className="relative">
            <div className="flex h-[32px] items-center justify-between">
              <span className="flex items-center gap-2">
                <AggieMark size={28} />
                <span className="text-small font-semibold">Texas A&amp;M on EventQuan</span>
              </span>
              <span className="flex items-center gap-1.5 text-meta font-semibold text-white/75">
                <MoonStar size={14} className="text-gold" /> 64° · clear
              </span>
            </div>

            <div className="mt-5">
              <BigTime
                kicker="FRIDAY · OCT 11 · THE NIGHT BEFORE"
                value="11:02"
                unit="PM"
                label="11:02 PM, Friday, October 11"
              />
            </div>
            <h1 className="mt-3 text-balance text-title font-bold leading-[1.15] tracking-title">
              Howdy. Saturday starts at midnight.
            </h1>

            <label className="mt-4 block">
              <span className="sr-only">Texas A&amp;M NetID</span>
              <span
                className={`flex h-[54px] items-center gap-3 rounded-thumb bg-white/10 pl-4 pr-1.5 ring-2 transition-colors duration-(--duration-quick) ease-(--ease-out-expo) ${
                  found ? 'ring-gold/80' : 'ring-error-on-dark'
                }`}
              >
                <Mail size={19} className="shrink-0 text-white/60" />
                <input
                  value={netid}
                  onChange={(e) => setNetid(e.target.value.replace(/@.*$/, '').replace(/\s/g, ''))}
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-invalid={!found}
                  aria-describedby={errId}
                  placeholder="netid"
                  className="min-w-0 flex-1 bg-transparent text-emphasis text-white outline-none placeholder:text-white/60"
                />
                <span className="flex h-[40px] shrink-0 items-center gap-1.5 rounded-well bg-maroon px-2.5 text-control font-semibold text-white ring-1 ring-white/20">
                  @tamu.edu
                  {found ? <BadgeCheck size={15} className="text-gold" /> : null}
                </span>
              </span>
            </label>

            <div id={errId} aria-live="polite" className="mt-2.5">
              {found ? (
                <p className="text-small text-gold">Found you, Jordan. Here&rsquo;s your Saturday.</p>
              ) : (
                <div className="flex items-start gap-2">
                  <CircleAlert size={17} className="mt-px shrink-0 text-error-on-dark" />
                  <div className="min-w-0 flex-1 text-small leading-snug">
                    <p className="font-semibold text-white">
                      We couldn&rsquo;t find <span className="break-all">{netid || 'that NetID'}@tamu.edu</span>.
                    </p>
                    <p className="text-white/75">
                      Check the spelling: it&rsquo;s the part before the @ in your TAMU email.
                    </p>
                    {suggestion ? (
                      <Button variant="tonal" size="sm" onClick={() => setNetid(suggestion)} className="mt-2">
                        Did you mean {suggestion}? Use it
                      </Button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* The straw waits: only what's open to everyone, until we know who you are */}
        <section aria-labelledby="err-preview" className="relative flex-1 overflow-hidden pt-3">
          <h2 id="err-preview" className="flex items-baseline justify-between px-4 text-micro font-bold tracking-caps">
            <span className="text-maroon">{found ? 'YOUR STRAW · NEXT 20 HOURS' : 'OPEN TO EVERYONE TONIGHT'}</span>
            <span className="font-semibold tracking-normal text-ink-3">{found ? '3 sheets · 23 friends' : '1 sheet'}</span>
          </h2>
          <TimeRail
            y={y}
            from={NOW}
            to={25}
            now={NOW}
            marks={[{ h: 24, label: '12', sub: 'AM' }]}
            folds={[{ from: 24.3, to: 25 }]}
            label="Tonight"
          >
            <OnRail y={y(24)} pierce={found ? 'gold' : 'open'}>
              <div className="flex h-[54px] items-center gap-2.5 rounded-thumb bg-white pl-2 pr-2.5 shadow-raised">
                <img src="/img/midnight-yell.jpg" alt="" className="size-[40px] shrink-0 rounded-well object-cover" />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-control font-semibold tracking-snug">Midnight Yell</span>
                  <span className="block truncate text-meta text-ink-3">Kyle Field · in 58 min</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-soon px-2 py-[3px] text-micro font-bold text-soon-ink">
                  <Megaphone size={11} /> Tonight
                </span>
              </div>
            </OnRail>
            <li className="absolute right-4 text-small leading-snug text-ink-3" style={{ top: y(24.45), left: LANE_X }}>
              {found
                ? 'Sleep, the tailgate, then kickoff at 6. Continue to see it all.'
                : 'Your tailgate, your seat and kickoff appear here once we find your NetID.'}
            </li>
          </TimeRail>
        </section>

        <div className="relative bg-canvas px-5 pb-[34px] pt-2">
          <Button size="lg" className="w-full" disabled={!found}>
            Continue <ArrowRight size={18} />
          </Button>
          <div className="mt-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-meta text-ink-3">
              <Lock size={12} /> Texas A&amp;M single sign-on
            </span>
            <Link
              to="/explore/concept/day/2"
              className="flex h-[44px] items-center rounded-well px-1 text-meta font-semibold text-maroon transition-colors duration-(--duration-quick) ease-(--ease-out-expo) active:bg-maroon/6"
            >
              Browse without signing in
            </Link>
          </div>
        </div>
      </main>
    </Screen>
  )
}
