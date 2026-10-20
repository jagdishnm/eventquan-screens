import type { ReactNode } from 'react'
import { EqMark } from '../components/Marks'
import { EventFinder } from './EventFinder'
import { GameDay } from './GameDay'
import { Home } from './Home'
import { PlaceDetail } from './PlaceDetail'
import { QuickEvent } from './QuickEvent'
import { WelcomeCampus } from './Welcome'

type Step = {
  n: number
  title: string
  kind: 'Elevated' | 'New'
  day: string
  time: string
  note: string
  screen: ReactNode
}

const STEPS: Step[] = [
  {
    n: 1,
    title: 'Sign in',
    kind: 'New',
    day: 'Fri',
    time: '11:02 PM',
    note: 'A tamu.edu address identifies the campus. The maroon skin takes over, and College Station and Bryan are added to the events shown.',
    screen: <WelcomeCampus />,
  },
  {
    n: 2,
    title: 'University Home',
    kind: 'Elevated',
    day: 'Sat',
    time: '9:41 AM',
    note: 'What is live right now comes first. The twelve tiles stay, and each one shows its own live state.',
    screen: <Home />,
  },
  {
    n: 3,
    title: 'EventFinder',
    kind: 'Elevated',
    day: 'Sat',
    time: '9:43 AM',
    note: "Tonight's game gets a ticket-stub card in both teams' colors. Pin color marks the node, and \u201cEvents from\u201d sets which cities feed the list.",
    screen: <EventFinder />,
  },
  {
    n: 4,
    title: 'Campus node · Kyle Field',
    kind: 'New',
    day: 'Sat',
    time: '9:46 AM',
    note: "The venue's events are plotted on its crowd curve for the day. Tonight's game leads, then a live timeline.",
    screen: <PlaceDetail />,
  },
  {
    n: 5,
    title: 'Game day',
    kind: 'Elevated',
    day: 'Sat',
    time: '7:18 PM',
    note: 'The app goes dark and knows your seat. Live score, order to seat, and his eight tools with live data.',
    screen: <GameDay />,
  },
  {
    n: 6,
    title: 'Quick Event',
    kind: 'New',
    day: 'Sat',
    time: '8:51 PM',
    note: 'Type it the way you would text it. Time, place and node are picked up automatically, then you post.',
    screen: <QuickEvent />,
  },
]

/** Phones sit on a gentle wave so the row reads as a sequence, not a grid. */
const OFFSET = [0, 40, 12, 52, 4, 36]

export function Journey() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#0e0d0f] px-[72px] pb-20 pt-16 text-[#f4f1ec]">
      <div className="pointer-events-none absolute -left-40 -top-56 size-[900px] rounded-full bg-maroon/45 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 top-[420px] size-[700px] rounded-full bg-gold/[0.06] blur-[140px]" />

      <header className="stagger relative flex items-end justify-between gap-16">
        <div>
          <div className="flex items-center gap-3">
            <EqMark size={32} />
            <span className="text-[14px] font-semibold tracking-[2.4px] text-[#f4f1ec]/55">
              EVENTQUAN × TEXAS A&amp;M · SIX SCREENS
            </span>
          </div>
          <h1 className="mt-6 font-display text-[168px] font-extrabold uppercase italic leading-[0.82] tracking-[-2px]">
            One Aggie<span className="text-gold">.</span>
            <br />
            One Saturday<span className="text-gold">.</span>
          </h1>
        </div>
        <div className="max-w-[560px] pb-3">
          <p className="text-[21px] leading-[1.5] text-[#f4f1ec]/70 [text-wrap:pretty]">
            Every live event is a sheet of paper. The student is a straw pushed through the stack. These six screens are
            one student's slice of it, in the order they would see them.
          </p>
          <div className="mt-6 flex gap-6 text-[14px] text-[#f4f1ec]/55">
            <span className="flex items-center gap-2">
              <span className="size-[10px] rounded-full bg-[#f4f1ec]/85" /> Elevated from Troy's boards
            </span>
            <span className="flex items-center gap-2">
              <span className="size-[10px] rounded-full bg-gold" /> New, not drawn before
            </span>
          </div>
        </div>
      </header>

      {/* The straw: one gold thread through every moment */}
      <div className="relative mt-16 h-[64px]">
        <div className="draw absolute inset-x-0 top-[44px] h-[2px] bg-[linear-gradient(90deg,rgba(255,205,28,0)_0%,#ffcd1c_6%,#ffcd1c_94%,rgba(255,205,28,0)_100%)] [animation-delay:250ms]" />
        <div className="flex gap-[56px]">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative w-[417px] shrink-0">
              <div
                className="rise flex items-baseline gap-2 pl-2 font-display uppercase"
                style={{ animationDelay: `${450 + i * 110}ms` }}
              >
                <span className="text-[30px] font-bold leading-none tracking-[0.2px] tabular">{s.time}</span>
                <span className="text-[16px] font-semibold tracking-[1.6px] text-[#f4f1ec]/45">{s.day}</span>
              </div>
              <span
                className="rise absolute left-[14px] top-[38px] size-[14px] rounded-full bg-gold ring-[5px] ring-[#0e0d0f]"
                style={{ animationDelay: `${450 + i * 110}ms` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-[56px]">
        {STEPS.map((s, i) => (
          <figure
            key={s.n}
            className="rise w-[417px] shrink-0"
            style={{ marginTop: OFFSET[i], animationDelay: `${300 + i * 90}ms` }}
          >
            <div
              role="img"
              aria-label={`${s.title} screen`}
              className="rounded-[64px] bg-[#050506] p-[12px] shadow-[0_0_0_1.5px_#3a383d,0_50px_90px_-30px_rgba(0,0,0,0.85)]"
            >
              <div className="overflow-hidden rounded-[52px]" inert aria-hidden>
                {s.screen}
              </div>
            </div>
            <figcaption className="mt-8 px-2">
              <div className="flex items-baseline gap-3">
                <span
                  className={`font-display text-[44px] font-extrabold italic leading-none tabular ${
                    s.kind === 'New' ? 'text-gold' : 'text-[#f4f1ec]/85'
                  }`}
                >
                  {String(s.n).padStart(2, '0')}
                </span>
                <span className="text-[23px] font-semibold tracking-[-0.4px]">{s.title}</span>
              </div>
              <p className="mt-2.5 text-[16px] leading-[1.5] text-[#f4f1ec]/62 [text-wrap:pretty]">{s.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  )
}
