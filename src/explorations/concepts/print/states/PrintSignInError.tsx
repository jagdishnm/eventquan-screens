import { ArrowRight, Lock } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../../components/Button'
import { Chip } from '../../../../components/Chip'
import { Screen } from '../../../../components/Device'
import { StatusBar } from '../../../../components/StatusBar'
import { Kicker, Masthead, Nameplate, RingEar } from '../PrintKit'

const CLASSES = ['25', '26', '27', '28', '29'] as const

const isAggie = (v: string) => /^[a-z0-9._-]+@(email\.)?tamu\.edu$/i.test(v.trim())
/** The likely fix: keep what's before the @, set the domain right. */
const fixOf = (v: string) => `${(v.trim().split('@')[0] || 'netid').toLowerCase()}@tamu.edu`

/**
 * Print state · Sign in with a typo, 11:02 PM Friday. Jordan typed tamu.eud. The address stays in
 * the field; under it the edition runs a correction slip, the way a paper prints one: what was
 * wrong, what it should read, and a one-tap fix. Continue waits until the address is right.
 */
export function PrintSignInError() {
  const [email, setEmail] = useState('jcarter@tamu.eud')
  const [year, setYear] = useState<(typeof CLASSES)[number]>('27')
  const slipId = useId()
  const valid = isAggie(email)
  const empty = email.trim() === ''
  const wrong = !valid && !empty
  const fix = fixOf(email)

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <main className="no-scrollbar absolute inset-0 flex flex-col overflow-y-auto text-ink-warm">
        <Masthead
          folio="EventQuan · Texas A&M edition"
          ear={<RingEar done={0} label="to earn" current />}
          dateline={
            <>
              <Kicker className="text-paper/80">Fri · Oct 11 · College Station</Kicker>
              <Kicker className="text-gold">No. 01</Kicker>
            </>
          }
        >
          <Nameplate>
            Howdy<span className="text-gold">.</span>
          </Nameplate>
        </Masthead>

        <div className="relative flex flex-1 flex-col px-4 pb-[26px]">
          <label className="mt-5 block">
            <Kicker className="text-ink-warm-2">Your Texas A&amp;M email</Kicker>
            <span
              className={`mt-1 flex h-[50px] items-end border-b-2 pb-2 transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
                wrong ? 'border-live-ink' : 'border-ink-warm'
              }`}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={wrong || undefined}
                aria-describedby={slipId}
                placeholder="netid@tamu.edu"
                className="min-w-0 flex-1 bg-transparent font-slab text-title font-bold text-ink-warm outline-none placeholder:text-ink-warm-2"
              />
            </span>
          </label>

          {/* The correction slip: what's wrong, what it should read, and the fix */}
          <div id={slipId} aria-live="polite" className="mt-3">
            {wrong ? (
              <aside className="border-2 border-ink-warm bg-white px-3.5 pb-3 pt-2.5 shadow-raised">
                <div className="flex items-center justify-between border-b border-ink-warm/20 pb-1.5">
                  <Kicker className="text-maroon">Correction</Kicker>
                  <Kicker className="text-ink-warm-2">Fri · 11:02 PM</Kicker>
                </div>
                <p className="mt-2 font-serif text-body leading-[1.45] text-ink-warm">
                  This address reads <b className="font-slab font-bold">{email.trim()}</b>. Texas A&amp;M emails end in{' '}
                  <b className="font-slab font-bold">@tamu.edu</b>, so it should read:
                </p>
                <p className="mt-1 font-slab text-title font-bold text-maroon">{fix}</p>
                <Button variant="secondary" className="mt-2.5 w-full" onClick={() => setEmail(fix)}>
                  Use {fix}
                </Button>
              </aside>
            ) : (
              <p className="flex items-center gap-1.5 font-serif text-small italic text-ink-warm-2">
                <Lock aria-hidden size={13} className="shrink-0" />
                {valid ? 'Corrected. NetID sign-on, Duo protected.' : 'Use the email that ends in @tamu.edu.'}
              </p>
            )}
          </div>

          <fieldset className="mt-4">
            <legend>
              <Kicker className="text-ink-warm-2">Ring date · your class</Kicker>
            </legend>
            <div className="mt-1.5 flex gap-2">
              {CLASSES.map((c) => (
                <Chip key={c} selected={year === c} onClick={() => setYear(c)}>
                  ’{c}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div className="mt-auto pt-4">
            {/* Waits for a tamu.edu address; the reason is printed right above */}
            <Button size="lg" className="w-full" disabled={!valid}>
              Continue <ArrowRight size={18} />
            </Button>
            <p className="mt-1.5 text-center font-serif text-small italic text-ink-warm-2">
              {valid ? 'Next, confirm with NetID and Duo.' : 'Continue opens once the email ends in @tamu.edu.'}
            </p>
            <Link
              to="/events"
              className="mx-auto mt-1 flex h-[44px] w-fit items-center gap-2 whitespace-nowrap rounded-tag px-2 font-serif text-small italic text-ink-warm-2"
            >
              Not a student?
              <span className="flex items-center gap-1.5 font-semibold not-italic text-ink-warm underline decoration-ink-warm/40 underline-offset-4">
                <span aria-hidden className="size-[7px] rounded-full bg-cstat" />
                <span aria-hidden className="size-[7px] rounded-full bg-bryan" />
                Browse College Station events
              </span>
            </Link>
          </div>
        </div>
      </main>
    </Screen>
  )
}
