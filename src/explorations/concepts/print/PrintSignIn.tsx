import { ArrowRight, Lock } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Chip } from '../../../components/Chip'
import { Screen } from '../../../components/Device'
import { StatusBar } from '../../../components/StatusBar'
import { Kicker, Masthead, Nameplate, RingEar } from './PrintKit'

const CLASSES = ['25', '26', '27', '28', '29'] as const
type ClassYear = (typeof CLASSES)[number]

/**
 * The Aggie Ring, drawn front-on: a gold band under a signet that carries your ring date.
 * The date changes with the class you pick, the way it's engraved on the real thing.
 */
function RingHero({ year }: { year: ClassYear }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="size-[176px] shrink-0"
      role="img"
      aria-label={`Aggie Ring, Class of ’${year}`}
    >
      {/* Band */}
      <circle cx={100} cy={116} r={64} fill="none" strokeWidth={22} className="stroke-gold-dark" />
      <circle cx={100} cy={116} r={64} fill="none" strokeWidth={16} className="stroke-gold" />
      <circle cx={100} cy={116} r={55} fill="none" strokeWidth={1.5} className="stroke-gold-dark" />
      {/* Shine on the band */}
      <path
        d="M 45 148 A 64 64 0 0 1 37 108"
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        className="stroke-paper/70"
      />
      {/* Signet */}
      <rect x={52} y={18} width={96} height={70} rx={16} className="fill-gold-dark" />
      <rect x={55} y={20} width={90} height={64} rx={14} className="fill-gold" />
      <rect x={64} y={28} width={72} height={48} rx={8} className="fill-maroon" />
      <text
        key={year}
        x={100}
        y={64}
        textAnchor="middle"
        className="settle fill-gold font-poster text-display-lg font-black tabular"
      >
        ’{year}
      </text>
    </svg>
  )
}

/**
 * Print · Sign in. The edition's front cover: "Howdy." as a nameplate, the Aggie Ring as the
 * cover art, and a two-field form printed like a ring order: your tamu.edu email and your class.
 */
export function PrintSignIn() {
  const [netid, setNetid] = useState('jcarter')
  const [year, setYear] = useState<ClassYear>('27')
  const ok = /^[a-z0-9._-]+$/i.test(netid.trim())

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <main className="relative flex h-full flex-col text-ink-warm">
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

        <div className="flex flex-1 flex-col px-4 pb-[26px]">
          {/* Cover art: the ring you're working toward */}
          <section aria-labelledby="ring-dek" className="mt-5 flex items-center gap-4 border-b border-ink-warm/20 pb-5">
            <RingHero year={year} />
            <div className="min-w-0">
              <Kicker className="text-maroon">The one you earn</Kicker>
              <p id="ring-dek" className="mt-1.5 font-serif text-card italic leading-[1.4] text-pretty text-ink-warm">
                Every Aggie works toward a ring. EventQuan keeps count of the traditions along the way.
              </p>
            </div>
          </section>

          {/* The form, printed like a ring order */}
          <label className="mt-5 block">
            <Kicker className="text-ink-warm-2">Your Texas A&amp;M email</Kicker>
            <span className="mt-1 flex h-[50px] items-end gap-1 border-b-2 border-ink-warm pb-2">
              <input
                value={netid}
                onChange={(e) => setNetid(e.target.value.replace(/@.*$/, ''))}
                aria-label="NetID, before @tamu.edu"
                aria-invalid={!ok}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent font-slab text-title font-bold text-ink-warm outline-none placeholder:text-ink-warm-2"
                placeholder="netid"
              />
              <span className="font-slab text-title font-bold text-ink-warm-2">@tamu.edu</span>
            </span>
          </label>

          <fieldset className="mt-5">
            <legend>
              <Kicker className="text-ink-warm-2">Ring date · pick your class</Kicker>
            </legend>
            <div className="mt-2 flex gap-2">
              {CLASSES.map((c) => (
                <Chip key={c} selected={year === c} onClick={() => setYear(c)}>
                  ’{c}
                </Chip>
              ))}
            </div>
            <p className="mt-2.5 font-serif text-small italic text-ink-warm-2">
              Class of ’{year}. Whoop! We’ll tune Midnight Yell, Ring Day and Elephant Walk to your year.
            </p>
          </fieldset>

          <div className="mt-auto">
            <Link to="/" className="block rounded-thumb" aria-disabled={!ok || undefined}>
              <Button as="span" size="lg" className="w-full">
                Continue <ArrowRight size={18} />
              </Button>
            </Link>
            <p className="mt-3 flex items-center justify-center gap-1.5 font-mono text-meta tracking-eyebrow text-ink-warm-2">
              <Lock size={12} aria-hidden /> NETID SINGLE SIGN-ON · DUO PROTECTED
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
