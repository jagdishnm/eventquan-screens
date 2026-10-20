import { BadgeCheck, Lock, Plus, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Faces } from '../../../components/Avatar'
import { Button } from '../../../components/Button'
import { Screen } from '../../../components/Device'
import { Eyebrow } from '../../../components/Eyebrow'
import { AggieMark } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { ScoreboardHeader } from './ScoreboardHeader'

/** Arrivals at Kyle Field, every five minutes from 9:00 PM to now (11:02 PM). */
const ARRIVALS = [4, 5, 5, 6, 8, 9, 11, 12, 14, 17, 19, 22, 26, 30, 35, 39, 46, 52, 58, 66, 74, 83, 92, 100]

/** The crowd, nine across. Friends are lit; everyone else is the 12th Man around them. The last spot is yours. */
const CROWD = [
  'JR',
  'AK',
  'TN',
  'LM',
  'SC',
  'MR',
  'BW',
  'EH',
  'CP',
  'DV',
  'KT',
  'RS',
  'KL',
  'AL',
  'NP',
  'HT',
  'OB',
  'JM',
  'WF',
  'IQ',
  'DS',
  'BN',
  'UX',
  'FE',
  'YC',
  'PK',
  '',
]
const FRIENDS = new Set(['MR', 'AL', 'KT', 'DS', 'BN'])

/** A NetID: letters, digits, dots, dashes. The @tamu.edu part is fixed, so it can't be mistyped. */
const NETID = /^[a-z0-9][a-z0-9._-]{1,30}$/i

/**
 * 1 · Sign in, 11:02 PM Friday. Before you've even signed in, the scoreboard is counting Aggies
 * into Midnight Yell, and the crowd is drawn as faces with one gap left in it: yours.
 */
export function LiveSignIn() {
  const [netid, setNetid] = useState('jcarter')
  const valid = NETID.test(netid.trim())

  return (
    <Screen>
      <StatusBar />
      <main className="no-scrollbar absolute inset-0 overflow-y-auto pb-[34px]">
        <ScoreboardHeader
          count={3206}
          unit={['Aggies', 'at Midnight Yell']}
          aside="Starts at midnight"
          kicker="FRI 11:02 PM · KYLE FIELD"
          left={
            <>
              <AggieMark size={30} />
              <span className="leading-tight">
                <span className="block text-micro font-bold tracking-caps">TEXAS A&amp;M</span>
                <span className="block text-micro text-white/75">on EventQuan</span>
              </span>
            </>
          }
          pulse={ARRIVALS}
          trend="+418 in the last 10 min"
        />

        <div className="px-4 pt-4">
          <section aria-labelledby="crowd-title" className="rounded-card bg-white p-3.5 shadow-raised">
            <div className="flex items-baseline justify-between">
              <Eyebrow tone="maroon">
                <span id="crowd-title">In the stands now</span>
              </Eyebrow>
              <span className="text-meta text-ink-3">1 spot saved for you</span>
            </div>
            <div
              role="img"
              aria-label="A crowd of Aggie faces. Five are your friends. The last spot is empty, saved for you."
              className="mt-2.5 grid grid-cols-9 justify-items-center gap-y-[4px]"
            >
              {CROWD.map((c, k) =>
                c ? (
                  <span
                    key={k}
                    className={`block rounded-full ${FRIENDS.has(c) ? 'ring-2 ring-gold ring-offset-1 ring-offset-white' : 'opacity-35'}`}
                  >
                    <Avatar initials={c} color={(((k * 5) % 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6} size={32} />
                  </span>
                ) : (
                  <span
                    key={k}
                    className="grid size-[30px] place-items-center rounded-full border-2 border-dashed border-gold-dark text-gold-dark"
                  >
                    <Plus size={15} strokeWidth={2.6} />
                  </span>
                ),
              )}
            </div>
            <div className="mt-3 flex items-center gap-2.5 border-t border-hairline pt-2.5">
              <Faces n={3} size={24} />
              <p className="min-w-0 flex-1 text-small text-ink-2">
                <b className="font-semibold text-ink">Maya, Alex</b> and 12 people from your classes are already there.
              </p>
            </div>
          </section>

          <h2 className="mt-4 text-balance text-title font-bold tracking-title">Join the 12th Man</h2>
          <p className="mt-0.5 text-small text-ink-2">See who&apos;s out, where, right now.</p>

          <label className="mt-3 block">
            <span className="text-small font-medium text-ink-2">Texas A&amp;M NetID</span>
            {/* The domain is fixed: you type only your NetID */}
            <span
              className={`mt-1.5 flex h-[52px] items-center gap-2.5 rounded-thumb bg-white pl-4 pr-3 ring-1 transition-shadow duration-(--duration-quick) ease-(--ease-out-expo) ${
                valid ? 'ring-maroon/40' : 'ring-hairline'
              }`}
            >
              <UserRound aria-hidden size={18} className="shrink-0 text-ink-3" />
              <input
                value={netid}
                onChange={(e) => setNetid(e.target.value.replace(/@.*$/, ''))}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="username"
                aria-describedby="netid-hint"
                placeholder="netid"
                className="min-w-0 flex-1 bg-transparent text-card text-ink outline-none placeholder:text-ink-3"
              />
              <span aria-hidden className="shrink-0 text-card text-ink-3">
                @tamu.edu
              </span>
              {valid ? <BadgeCheck aria-label="Texas A&M NetID" size={18} className="shrink-0 text-maroon" /> : null}
            </span>
          </label>
          <p id="netid-hint" className="mt-1.5 flex items-center gap-1.5 text-meta text-ink-3">
            <Lock aria-hidden size={12} />
            Signs in with NetID and Duo, ending in @tamu.edu
          </p>

          <Link to="/" className="mt-3.5 block rounded-thumb">
            <Button as="span" size="lg" className="w-full">
              Sign in
            </Button>
          </Link>
          <p className="mt-3 text-center text-small text-ink-2">
            Not a student?{' '}
            <Link
              to="/"
              className="relative font-semibold text-maroon after:absolute after:-inset-x-1 after:-inset-y-3 after:content-['']"
            >
              Look around Bryan–College Station
            </Link>
          </p>
        </div>
      </main>
    </Screen>
  )
}
