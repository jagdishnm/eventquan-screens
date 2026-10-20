import { ArrowRight, BadgeCheck, Check, Lock, Mail } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Screen } from '../components/Device'
import { AggieMark, EqMark } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { GoldButton } from '../components/ui'

function Dots({ at }: { at: number }) {
  return (
    <div className="flex justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-[6px] rounded-full transition-all ${i === at ? 'w-[18px] bg-gold' : 'w-[6px] bg-white/30'}`}
        />
      ))}
    </div>
  )
}

/** Step 1 — platform-level sign in, before any university skin exists. */
export function WelcomeEmail() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const initial = params.get('email')
  const [email, setEmail] = useState(initial ?? 'jcarter@tamu.edu')
  // `?email=` lets the canvas show the post-submit state; a typed address only errors after Find my campus.
  const [tried, setTried] = useState(Boolean(initial))
  const input = useRef<HTMLInputElement>(null)
  const isAggie = /@(email\.)?tamu\.edu$/i.test(email.trim())
  const domain = /@([^@\s]+)$/.exec(email.trim())?.[1]
  const notFound = tried && !isAggie && Boolean(domain)
  const findCampus = () => (isAggie ? nav('/welcome/campus') : setTried(true))
  return (
    <Screen bg="bg-[#0d0e12]">
      <StatusBar />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 size-[380px] rounded-full bg-gold/12 blur-[90px]" />
        <div className="absolute -right-32 top-[260px] size-[320px] rounded-full bg-bryan/25 blur-[100px]" />
      </div>
      <main className="relative flex h-full flex-col px-6 pb-[42px] pt-[96px] text-white">
        <div className="flex items-center gap-2.5">
          <EqMark size={40} />
          <div>
            <div className="text-[20px] font-bold leading-none tracking-[-0.3px]">
              Event<span className="text-gold">Quan</span>
            </div>
            <div className="mt-1 text-[12px] text-white/55">One platform. Every event.</div>
          </div>
        </div>

        <h1 className="mt-14 text-[36px] font-bold leading-[1.05] tracking-[-1.1px]">
          Everything live
          <br />
          around you.
        </h1>
        <p className="mt-3 max-w-[300px] text-[16px] leading-[1.4] text-white/65">
          Sign in with your school email and we'll set EventQuan up for your campus.
        </p>

        <label className="mt-8 block">
          <span className="text-[13px] font-medium text-white/60">School email</span>
          <div
            className={`mt-1.5 flex h-[54px] items-center gap-3 rounded-[15px] bg-white/8 px-4 ring-1 transition-colors ${
              isAggie ? 'ring-gold/70' : notFound ? 'ring-[#ff7b76]' : 'ring-white/12'
            }`}
          >
            <Mail size={19} className="text-white/50" />
            <input
              ref={input}
              value={email}
              aria-invalid={notFound}
              aria-describedby={notFound ? 'email-error' : 'email-hint'}
              onChange={(e) => {
                setEmail(e.target.value)
                setTried(false)
              }}
              inputMode="email"
              className="min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-white/45"
              placeholder="you@school.edu"
            />
            {isAggie ? (
              <span className="flex items-center gap-1 rounded-full bg-maroon px-2 py-1 text-[11px] font-bold text-white">
                <BadgeCheck size={13} /> TAMU
              </span>
            ) : null}
          </div>
        </label>
        {notFound ? (
          <div
            id="email-error"
            role="alert"
            className="mt-3 rounded-[14px] bg-[#ff7b76]/12 px-3.5 py-3 ring-1 ring-[#ff7b76]/35"
          >
            <div className="text-[15px] font-semibold text-white">We couldn't find a campus for {domain}.</div>
            <div className="mt-0.5 text-[13.5px] leading-[1.4] text-white/75">
              Use your school email, or explore Bryan and College Station without one.
            </div>
          </div>
        ) : (
          <div id="email-hint" className={`mt-2 text-[13px] ${isAggie ? 'text-gold' : 'text-white/60'}`}>
            {isAggie ? 'Texas A&M University found' : "We'll match your email to your campus"}
          </div>
        )}

        {notFound ? (
          <div className="mt-5 grid gap-2.5">
            <GoldButton
              size="lg"
              className="w-full"
              onClick={() => {
                setEmail('')
                setTried(false)
                input.current?.focus()
              }}
            >
              Try school email
            </GoldButton>
            <button
              type="button"
              className="press h-[48px] rounded-[14px] bg-white/8 text-[15px] font-semibold text-white ring-1 ring-white/12"
            >
              Explore without signing in
            </button>
          </div>
        ) : (
          <GoldButton size="lg" className="mt-6 w-full" onClick={findCampus}>
            Find my campus <ArrowRight size={18} />
          </GoldButton>
        )}

        {/* Social sign-in steps aside while the not-found message offers its own way forward */}
        {notFound ? null : (
          <>
            <div className="my-5 flex items-center gap-3 text-[12px] text-white/55">
              <span className="h-px flex-1 bg-white/12" />
              or
              <span className="h-px flex-1 bg-white/12" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className="flex h-[48px] items-center justify-center gap-2 rounded-[14px] bg-white text-[15px] font-semibold text-black"
              >
                <svg width="16" height="19" viewBox="0 0 16 19" fill="currentColor" aria-hidden>
                  <path d="M13.3 10.1c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.9-.8-3.1-.8C3.7 4.7 2.2 5.6 1.4 7c-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8s1.8.8 3 .8 2-1.1 2.8-2.3c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.3-.9-2.3-3.9ZM11 3.1c.6-.8 1.1-1.8 1-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3Z" />
                </svg>
                Apple
              </button>
              <button
                type="button"
                className="flex h-[48px] items-center justify-center gap-2 rounded-[14px] bg-white/8 text-[15px] font-semibold ring-1 ring-white/12"
              >
                <span className="font-bold text-[#8ab4f8]">G</span>
                Google
              </button>
            </div>
          </>
        )}

        <div className="mt-auto">
          <Dots at={0} />
          <p className="mt-4 text-center text-[13px] text-white/65">
            Not a student? <span className="font-semibold text-white">Explore Bryan / College Station</span>
          </p>
        </div>
      </main>
    </Screen>
  )
}

/** Step 2 — the university is identified and the skin takes over. */
export function WelcomeCampus() {
  const [lens, setLens] = useState({ cstat: true, bryan: true })
  return (
    <Screen bg="bg-[#0d0e12]">
      <div className="skin-flood absolute inset-0 bg-maroon">
        <img
          src="/img/academic-building.jpg"
          alt=""
          className="absolute inset-x-0 top-0 h-[430px] w-full object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-[432px] bg-[linear-gradient(180deg,rgba(40,0,0,0.55)_0%,rgba(80,0,0,0.35)_40%,#500000_100%)]" />
      </div>
      <StatusBar />

      <main className="relative flex h-full flex-col px-6 pb-[42px] pt-[84px] text-white">
        <div className="rise flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-[12px] font-semibold backdrop-blur-md">
            <Check size={14} strokeWidth={3} className="text-gold" />
            jcarter@tamu.edu
          </span>
          <Link to="/welcome" className="text-[13px] font-semibold text-white/75">
            Not you?
          </Link>
        </div>

        <div className="mt-[118px]">
          {/* Platform → campus: the skin hand-off */}
          <div className="rise flex items-center gap-2.5">
            <EqMark size={30} className="opacity-70" />
            <span className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-[4px] rounded-full bg-white/50" />
              ))}
              <ArrowRight size={14} className="text-white/70" />
            </span>
            <AggieMark size={64} className="shadow-[0_10px_30px_rgba(0,0,0,0.35)]" />
          </div>
          <div className="rise mt-5 text-[13px] font-bold tracking-[1.6px] text-gold [animation-delay:120ms]">
            WE FOUND YOUR CAMPUS
          </div>
          <h1 className="rise mt-1.5 text-[40px] font-bold leading-[1.02] tracking-[-1.2px] [animation-delay:180ms]">
            Howdy, Aggie!
          </h1>
          <p className="rise mt-2.5 text-[16px] leading-[1.4] text-white/80 [animation-delay:240ms]">
            EventQuan is now in Texas A&amp;M colors — your classes, Kyle Field, Sbisa, the MSC and the 12th Man, live
            in one place.
          </p>
        </div>

        <div className="rise mt-6 rounded-[18px] bg-black/22 p-3.5 ring-1 ring-white/12 backdrop-blur-md [animation-delay:320ms]">
          <div className="text-[12px] font-semibold text-white/60">Show events from</div>
          <div className="mt-2.5 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="size-[10px] rounded-full bg-white ring-[3px] ring-white/25" />
              <span className="flex-1 text-[15px] font-semibold">Texas A&amp;M University</span>
              <span className="text-[12px] text-white/65">Your campus</span>
            </div>
            {(
              [
                ['cstat', 'College Station', 'bg-[#3fd29b]', 'City · 2 mi'],
                ['bryan', 'Bryan', 'bg-[#6aa7ff]', 'City · 5 mi'],
              ] as const
            ).map(([k, l, dot, sub]) => (
              <button
                type="button"
                key={k}
                onClick={() => setLens((s) => ({ ...s, [k]: !s[k] }))}
                role="switch"
                aria-checked={lens[k]}
                aria-label={`Show events from ${l}`}
                className="flex min-h-[44px] items-center gap-3 rounded-[10px] text-left"
              >
                <span className={`size-[10px] rounded-full ${dot}`} />
                <span className="flex-1 text-[15px] font-semibold">
                  {l} <span className="font-normal text-white/65">· {sub}</span>
                </span>
                <span
                  className={`relative h-[24px] w-[40px] rounded-full transition-colors ${lens[k] ? 'bg-ok' : 'bg-white/20'}`}
                >
                  <span
                    className={`absolute top-[2px] size-[20px] rounded-full bg-white shadow transition-[left] ${lens[k] ? 'left-[18px]' : 'left-[2px]'}`}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <Link to="/" className="block rounded-[16px]">
            <GoldButton as="span" size="lg" className="w-full">
              Sign in with NetID
            </GoldButton>
          </Link>
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[12px] text-white/55">
            <Lock size={12} /> Texas A&amp;M single sign-on · Duo protected
          </div>
          <div className="mt-5">
            <Dots at={1} />
          </div>
        </div>
      </main>
    </Screen>
  )
}
