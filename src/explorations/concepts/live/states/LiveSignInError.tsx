import { BadgeCheck, CircleAlert, Lock, Mail, X } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Faces } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen } from '../../../../components/Device'
import { AggieMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { ScoreboardHeader } from '../ScoreboardHeader'

/** Arrivals at Kyle Field, every five minutes from 9:00 PM to now (11:02 PM). Same board as sign in. */
const ARRIVALS = [4, 5, 5, 6, 8, 9, 11, 12, 14, 17, 19, 22, 26, 30, 35, 39, 46, 52, 58, 66, 74, 83, 92, 100]

const isAggie = (v: string) => /@(email\.)?tamu\.edu$/i.test(v.trim())

/**
 * State · Sign in with the wrong email, 11:02 PM Friday. Jordan typed a Gmail address. The field
 * keeps it, says in plain words what's wrong, why and how to fix it, and the gold action stays
 * disabled until the address ends in tamu.edu. Browsing without an account is always one tap away.
 */
export function LiveSignInError() {
  const [email, setEmail] = useState('jordan.carter@gmail.com')
  const input = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const errId = useId()
  const valid = isAggie(email)
  const empty = email.trim() === ''
  const wrong = !valid && !empty

  return (
    <Screen>
      <StatusBar />
      <main className="no-scrollbar absolute inset-0 overflow-y-auto pb-[34px]">
        <ScoreboardHeader
          count={3206}
          tick={false}
          unit={['Aggies', 'at Midnight Yell']}
          aside="Starts at midnight"
          kicker="FRI 11:02 PM · KYLE FIELD"
          left={
            <>
              <AggieMark size={30} />
              <span className="leading-tight">
                <span className="block text-micro font-bold tracking-caps">TEXAS A&amp;M</span>
                <span className="block text-micro text-white/60">on EventQuan</span>
              </span>
            </>
          }
          pulse={ARRIVALS}
          trend="+418 in the last 10 min"
        />

        <div className="px-4 pt-4">
          <div className="flex items-center gap-2.5 rounded-card bg-white px-3.5 py-3 shadow-raised">
            <Faces n={3} size={24} />
            <p className="min-w-0 flex-1 text-small text-ink-2">
              <b className="font-semibold text-ink">Maya, Alex</b> and 12 people from your classes are in the stands.
            </p>
          </div>

          <h2 className="mt-5 text-title font-bold tracking-title">Take your spot in the 12th Man</h2>
          <p className="mt-0.5 text-small text-ink-2">Sign in with your Texas A&amp;M email to join the count.</p>

          <label htmlFor="email" className="mt-3 block text-small font-medium text-ink-2">
            Texas A&amp;M email
          </label>
          <div
            className={`mt-1.5 flex h-[52px] items-center gap-3 rounded-thumb bg-white pl-4 transition-shadow duration-(--duration-quick) ease-(--ease-out-expo) ${
              wrong ? 'ring-2 ring-live-ink' : valid ? 'ring-1 ring-maroon/40' : 'ring-1 ring-hairline'
            }`}
          >
            <Mail aria-hidden size={18} className={wrong ? 'text-live-ink' : 'text-ink-3'} />
            <input
              ref={input}
              id="email"
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
              className="min-w-0 flex-1 bg-transparent text-card text-ink outline-none placeholder:text-ink-3"
            />
            {valid ? (
              <span className="mr-3 flex items-center gap-1 rounded-full bg-maroon px-2 py-1 text-micro font-bold text-white">
                <BadgeCheck aria-hidden size={13} /> TAMU
              </span>
            ) : !empty ? (
              <button
                type="button"
                aria-label="Clear email"
                onClick={() => {
                  setEmail('')
                  input.current?.focus()
                }}
                className="press grid size-[44px] shrink-0 place-items-center rounded-full text-ink-3"
              >
                <span className="grid size-[20px] place-items-center rounded-full bg-hairline-strong text-white">
                  <X size={13} strokeWidth={3} />
                </span>
              </button>
            ) : null}
          </div>

          {/* What happened, why, and how to fix it. Read out as it changes. */}
          <div id={errId} aria-live="polite" className="mt-2">
            {wrong ? (
              <div className="flex gap-2 rounded-thumb bg-tint-red px-3 py-2.5">
                <CircleAlert aria-hidden size={16} strokeWidth={2.4} className="mt-[1px] shrink-0 text-live-ink" />
                <p className="text-small text-ink-2">
                  <b className="block font-semibold text-live-ink">That’s not a Texas A&amp;M email.</b>
                  Only @tamu.edu addresses can join the 12th Man, so the count stays Aggies only. Use the email
                  that ends in <b className="font-semibold text-ink">@tamu.edu</b>, or browse without signing in.
                </p>
              </div>
            ) : (
              <p className="flex items-center gap-1.5 text-meta text-ink-3">
                <Lock aria-hidden size={12} />
                {valid ? 'Texas A&M found · NetID sign-on, Duo protected' : 'Use the email that ends in @tamu.edu'}
              </p>
            )}
          </div>

          {/* Disabled until the address is valid; the reason is right above it */}
          <Button size="lg" className="mt-4 w-full" disabled={!valid} onClick={() => navigate('/')}>
            Join the 12th Man
          </Button>
          <p className="mt-1.5 text-center text-meta text-ink-3">
            {valid ? 'You’ll confirm with NetID and Duo next.' : 'Available once your email ends in @tamu.edu'}
          </p>

          <div className="mt-3 flex justify-center">
            <Link
              to="/"
              className="relative inline-flex h-[44px] items-center rounded-well px-2 text-body font-semibold text-maroon"
            >
              Browse without signing in
            </Link>
          </div>
        </div>
      </main>
    </Screen>
  )
}
