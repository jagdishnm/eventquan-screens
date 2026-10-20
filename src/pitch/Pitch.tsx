import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { EqMark } from '../components/Marks'
import { EventFinder } from '../screens/EventFinder'
import { GameDay } from '../screens/GameDay'
import { Home } from '../screens/Home'
import { PlaceDetail } from '../screens/PlaceDetail'
import { QuickEvent } from '../screens/QuickEvent'
import { WelcomeCampus } from '../screens/Welcome'
import { PhoneFrame } from './PhoneFrame'
import { StrawStack } from './StrawStack'
import { useReveal } from './useReveal'

/* ------------------------------------------------------------------ data */

type Entry = {
  n: string
  title: string
  when: string
  kind: 'elevated' | 'new'
  source: string
  lede: string
  points: string[]
  notes: { y: number; label: string }[]
  screen: ReactNode
}

const LINEUP: Entry[] = [
  {
    n: '01',
    title: 'Sign in',
    when: 'Fri · 11:02 PM',
    kind: 'new',
    source: 'Not on any board',
    lede: 'The moment the campus is recognized is the moment the skin arrives.',
    points: [
      'A tamu.edu address finds the university, and maroon floods in from the email field.',
      '“Events from” adds College Station and Bryan, in his three node colors.',
      'NetID single sign-on with Duo, the way Aggies already log in.',
    ],
    notes: [
      { y: 190, label: 'Platform to campus hand-off' },
      { y: 560, label: 'Events from: his three nodes' },
      { y: 730, label: 'One gold action' },
    ],
    screen: <WelcomeCampus />,
  },
  {
    n: '02',
    title: 'University Home',
    when: 'Sat · 9:41 AM',
    kind: 'elevated',
    source: 'Board 1, screen 1',
    lede: 'His launcher stays. What is live right now sits on top of it.',
    points: [
      'All twelve tiles, in his order, now carry live state: Sbisa open, Rt 40 in 12 min, GAMEDAY.',
      'A “Right now” strip above the grid is his Context Flow, running as a carousel.',
      'One gold action on screen: Game Mode.',
    ],
    notes: [
      { y: 345, label: 'Right now: his Context Flow' },
      { y: 520, label: 'Tiles that carry live state' },
      { y: 690, label: 'Quick Event, one tap away' },
    ],
    screen: <Home />,
  },
  {
    n: '03',
    title: 'EventFinder',
    when: 'Sat · 9:43 AM',
    kind: 'elevated',
    source: 'Board 1, screen 5',
    lede: 'His chips, his Today and This Week, with tonight given its due.',
    points: [
      'The LSU game becomes a ticket stub in both teams’ colors, counting down to kickoff.',
      'Every pin is colored by its node, so a College Station event reads as one at a glance.',
      '“Events from” in the header decides which cities feed the list.',
    ],
    notes: [
      { y: 122, label: 'Events from: A&M + College Station' },
      { y: 410, label: 'Tonight, as a ticket stub' },
      { y: 600, label: 'Pins in node colors' },
    ],
    screen: <EventFinder />,
  },
  {
    n: '04',
    title: 'Kyle Field',
    when: 'Sat · 9:46 AM',
    kind: 'new',
    source: 'A callout on his map, never a screen',
    lede: 'Event first, node second, made visible.',
    points: [
      'The day’s events ride the venue’s crowd curve: brunch live, tailgate next, kickoff at the peak.',
      'Tonight’s game leads. A live timeline follows, so it never reads as a directory.',
      'Only then the building: gates, concessions, access, and the node above it.',
    ],
    notes: [
      { y: 300, label: 'Crowd curve, plotted by event' },
      { y: 440, label: 'Tonight leads' },
      { y: 680, label: 'A live timeline' },
    ],
    screen: <PlaceDetail />,
  },
  {
    n: '05',
    title: 'Game day',
    when: 'Sat · 7:18 PM',
    kind: 'elevated',
    source: 'Board 1, screen 6 and board 2',
    lede: 'The flip from campus app to stadium app, in one screen.',
    points: [
      'The body goes dark and the score is set big enough to read across a row.',
      'It knows your seat: Sec 125, Row 22, nearest restroom, Order to Seat.',
      'His eight tools stay, each showing something live.',
    ],
    notes: [
      { y: 190, label: 'Live score, drive tracker' },
      { y: 385, label: 'Your seat, served to' },
      { y: 560, label: 'His eight tools, live' },
    ],
    screen: <GameDay />,
  },
  {
    n: '06',
    title: 'Quick Event',
    when: 'Sat · 8:51 PM',
    kind: 'new',
    source: 'A tile on his grid, never designed',
    lede: '“Couple clicks, it’s done.” Closer to posting than to a form.',
    points: [
      'Type it like a text. Time, place and node light up as you type.',
      'It checks against the game and surfaces the venue’s Aggie Night offer.',
      'A preview of what your crew sees, then Post. Free up to 50 guests.',
    ],
    notes: [
      { y: 255, label: 'Parsed as you type' },
      { y: 350, label: 'Checked against tonight' },
      { y: 595, label: 'What your crew sees' },
    ],
    screen: <QuickEvent />,
  },
]

const CHAPTERS = [
  { t: 1, label: 'School email recognized' },
  { t: 3, label: 'Maroon floods in' },
  { t: 6, label: 'Right now, then the grid' },
  { t: 11, label: 'EventFinder' },
  { t: 15, label: 'Kyle Field' },
  { t: 20, label: 'Game day' },
  { t: 25, label: 'Quick Event types itself' },
]

const CALLS = [
  {
    q: 'Tab bar on game day',
    a: 'Kept light under the dark screen, so it is visibly still the same app. Easy to flip if he wants it dark.',
  },
  { q: 'Logos', a: 'Type-only stand-ins for A&M and LSU until the licensed marks are cleared for use.' },
  {
    q: 'Dates and numbers',
    a: 'Sat, Oct 12, 6:00 PM, from his board. Scores, crowds and wait times are illustrative.',
  },
  { q: 'Photos', a: 'Wikimedia Commons campus images. Licenses need checking before anything goes public.' },
]

const LATER = [
  'Messages and Profile tabs',
  'A full live campus map behind the Map tab',
  'Quick Event after Post, and the RSVP your crew sees',
  'First-run step three: pick what you care about',
  'Game day before kickoff: parking, gates, countdown',
]

/* ------------------------------------------------------------- pieces */

const SCALE = 0.82

function Kicker({ children, tone = 'ink' }: { children: ReactNode; tone?: 'ink' | 'paper' }) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[13px] font-semibold tracking-[2.4px] ${
        tone === 'ink' ? 'text-maroon' : 'text-gold'
      }`}
    >
      <span className={`h-[2px] w-10 ${tone === 'ink' ? 'bg-maroon' : 'bg-gold'}`} />
      {children}
    </div>
  )
}

function Stub({ big, label }: { big: string; label: string }) {
  return (
    <div className="relative rounded-[6px] border-2 border-ink-warm px-3 pb-3 pt-4 md:px-5 md:pb-4 md:pt-5">
      <div className="perf-top absolute inset-x-3 -top-[2px] h-[10px] text-paper" />
      <div className="font-poster text-[40px] font-extrabold leading-none text-maroon tabular md:text-[56px]">
        {big}
      </div>
      <div className="mt-2 font-mono text-[10.5px] font-medium uppercase leading-[1.35] tracking-[1px] text-ink-warm-2 md:text-[12px] md:tracking-[1.6px]">
        {label}
      </div>
    </div>
  )
}

function Annotated({ entry, side }: { entry: Entry; side: 'left' | 'right' }) {
  const w = 417 * SCALE
  return (
    <div
      className="relative mx-auto w-fit lg:mx-0 lg:w-(--annotated-w)"
      style={{ '--annotated-w': `${w + 170}px` } as CSSProperties}
    >
      <PhoneFrame
        scale={SCALE}
        label={`${entry.title} screen. ${entry.lede}`}
        className={side === 'left' ? 'lg:ml-auto' : ''}
      >
        {entry.screen}
      </PhoneFrame>
      {entry.notes.map((n) => (
        <div
          key={n.label}
          className={`absolute hidden items-center gap-2 lg:flex ${side === 'left' ? 'left-0 flex-row' : 'right-0 flex-row-reverse'}`}
          style={{ top: (n.y + 12) * SCALE - 9, width: 170 + 14 }}
        >
          <span
            className={`w-[122px] font-mono text-[11.5px] font-semibold uppercase leading-[1.3] tracking-[1px] text-ink-warm ${
              side === 'left' ? 'text-right' : 'text-left'
            }`}
          >
            {n.label}
          </span>
          <span className="h-px flex-1 bg-maroon" />
          <span className="size-[12px] shrink-0 rounded-full border-[3px] border-maroon bg-gold" />
        </div>
      ))}
    </div>
  )
}

function LineupEntry({ entry, i }: { entry: Entry; i: number }) {
  const phoneLeft = i % 2 === 0
  const text = (
    <div className="relative">
      <div
        aria-hidden
        className="stroke-maroon pointer-events-none absolute -top-[176px] hidden select-none font-poster lg:block text-[260px] font-black leading-none opacity-[0.16]"
        style={phoneLeft ? { right: -10 } : { left: -14 }}
      >
        {entry.n}
      </div>
      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[13px] font-semibold tracking-[1.8px] text-ink-warm-2">
            {entry.when.toUpperCase()}
          </span>
          {entry.kind === 'new' ? (
            <span className="rounded-[4px] bg-gold px-2.5 py-1 font-mono text-[11.5px] font-semibold tracking-[1.6px] text-ink-warm">
              NEW · {entry.source.toUpperCase()}
            </span>
          ) : (
            <span className="rounded-[4px] border-[1.5px] border-ink-warm px-2.5 py-[3px] font-mono text-[11.5px] font-semibold tracking-[1.6px] text-ink-warm">
              ELEVATED · {entry.source.toUpperCase()}
            </span>
          )}
        </div>
        <h3 className="mt-5 font-poster text-[clamp(60px,8vw,104px)] font-extrabold uppercase leading-[0.84] tracking-[-0.5px] text-maroon">
          {entry.title}
        </h3>
        <p className="mt-5 max-w-[560px] font-serif text-[22px] italic leading-[1.3] text-ink-warm md:mt-6 md:text-[27px]">
          {entry.lede}
        </p>
        <ol className="mt-8 max-w-[560px] space-y-4">
          {entry.points.map((p, k) => (
            <li key={p} className="grid grid-cols-[40px_1fr] gap-2 border-t border-ink-warm/15 pt-4">
              <span className="font-mono text-[13px] font-semibold text-maroon">0{k + 1}</span>
              <span className="font-serif text-[17px] leading-[1.5] text-ink-warm md:text-[19px]">{p}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
  const phone = <Annotated entry={entry} side={phoneLeft ? 'left' : 'right'} />
  return (
    <article
      data-reveal
      className="grid grid-cols-1 items-center gap-y-12 border-t-2 border-ink-warm py-16 lg:grid-cols-[auto_1fr] lg:gap-x-20 lg:py-24"
    >
      {/* On phones the screen always comes first; on desktop the sides alternate */}
      <div className={phoneLeft ? '' : 'lg:order-2'}>{phone}</div>
      <div className={phoneLeft ? '' : 'lg:order-1'}>{text}</div>
    </article>
  )
}

function Walkthrough() {
  const video = useRef<HTMLVideoElement>(null)
  // Autoplay only when the viewer hasn't asked for reduced motion; always pausable (WCAG 2.2.2).
  const [playing, setPlaying] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (playing) void v.play().catch(() => setPlaying(false))
    else v.pause()
  }, [playing])
  const seek = (t: number) => {
    const v = video.current
    if (!v) return
    v.currentTime = t
    setPlaying(true)
  }
  return (
    <section className="paper-grain relative overflow-hidden bg-maroon text-paper">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[700px] rounded-full bg-[#7a1010] opacity-60 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-5 py-20 md:px-12 lg:grid-cols-[1fr_auto] lg:gap-24 lg:py-32 xl:px-[100px]">
        <div data-reveal>
          <Kicker tone="paper">III · WATCH IT MOVE</Kicker>
          <h2 className="mt-8 font-poster text-[clamp(52px,8.6vw,124px)] font-black uppercase leading-[0.86] md:whitespace-nowrap">
            36 seconds.
            <br />
            <span className="text-gold">Sign-in to Post.</span>
          </h2>
          <p className="mt-8 max-w-[620px] font-serif text-[19px] leading-[1.5] text-paper/85 md:mt-10 md:text-[22px]">
            Stills can’t show the skin arriving, or a sentence turning into an event. This is the real prototype,
            recorded end to end. Pick a moment to jump to it.
          </p>
          <ol className="mt-10 grid max-w-[640px] grid-cols-1 gap-x-8 sm:grid-cols-2">
            {CHAPTERS.map((c) => (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => seek(c.t)}
                  className="group flex w-full items-baseline gap-4 border-t border-paper/25 py-3.5 text-left transition-colors duration-300 hover:border-gold"
                >
                  <span className="font-mono text-[13px] font-semibold text-gold tabular">
                    0:{String(c.t).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-[18px] text-paper transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1.5">
                    {c.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div data-reveal className="flex flex-col items-center gap-5">
          <PhoneFrame scale={0.86} label="Screen recording of the walkthrough, from sign-in to posting a Quick Event">
            <video
              ref={video}
              src="/media/eventquan-walkthrough.mp4"
              poster="/media/walkthrough-poster.jpg"
              className="block h-[852px] w-[393px] bg-black object-cover"
              muted
              loop
              playsInline
            />
          </PhoneFrame>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            className="press flex h-[44px] items-center gap-2.5 rounded-full border-2 border-paper/40 px-5 font-mono text-[13px] font-semibold tracking-[1.6px] text-paper transition-colors duration-300 hover:border-gold"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? 'PAUSE' : 'PLAY'} WALKTHROUGH
          </button>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- page */

export function Pitch() {
  useReveal()
  return (
    <div className="paper-grain min-h-dvh overflow-x-clip bg-paper text-ink-warm selection:bg-gold selection:text-ink-warm">
      {/* Masthead rule */}
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-12 xl:px-[100px] pt-10">
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink-warm pb-4 font-mono text-[11px] font-semibold tracking-[1.6px] md:text-[12.5px] md:tracking-[2px]">
          <span className="flex items-center gap-3">
            <EqMark size={26} />
            EVENTQUAN · GAMEDAY PROGRAM
          </span>
          <span className="hidden text-ink-warm-2 lg:inline">TEXAS A&amp;M MODULE · PRODUCTION SCREENS</span>
          <span>NO. 01 · OCT 2026</span>
        </div>
      </div>

      <main>
        {/* Cover */}
        <header className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 pb-20 pt-12 md:px-12 lg:grid-cols-[1fr_440px] lg:pb-28 lg:pt-20 xl:px-[100px]">
          <div className="stagger relative z-10">
            <div className="inline-flex items-center gap-2 rounded-[4px] bg-maroon px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[1.6px] text-gold md:text-[12px] md:tracking-[2px]">
              SIX SCREENS · ONE STUDENT · ONE SATURDAY
            </div>
            <h1 className="relative z-10 mt-8 whitespace-nowrap font-poster text-[clamp(56px,11vw,156px)] font-black uppercase leading-[0.9] tracking-[-1.5px] text-maroon">
              One Aggie
              <span className="text-gold">.</span>
              <br />
              One Saturday
              <span className="text-gold">.</span>
            </h1>
            <p className="mt-8 max-w-[680px] font-serif text-[21px] leading-[1.4] text-ink-warm md:mt-10 md:text-[27px] md:leading-[1.38]">
              Production screens for EventQuan’s Texas A&amp;M module, built from Troy’s three concept boards. His
              product and his visual language, drawn the way the shipped app would look.
            </p>
            <div className="mt-10 grid max-w-[680px] grid-cols-3 gap-2.5 md:mt-12 md:gap-4">
              <Stub big="03" label="Elevated from his boards" />
              <Stub big="03" label="New, never drawn" />
              <Stub big="36s" label="Walkthrough, sign-in to Post" />
            </div>
          </div>

          <div className="flex justify-center lg:hidden">
            <PhoneFrame scale={0.78} label="University Home screen" className="-rotate-[3deg]">
              <Home />
            </PhoneFrame>
          </div>
          <div className="relative hidden h-[820px] lg:block">
            <div className="absolute right-[-20px] top-[10px] rotate-[7deg]">
              <PhoneFrame scale={0.7} label="Game day screen">
                <GameDay />
              </PhoneFrame>
            </div>
            <div className="absolute left-[-20px] top-[96px] -rotate-[4deg]">
              <PhoneFrame scale={0.8} label="University Home screen">
                <Home />
              </PhoneFrame>
            </div>
          </div>
        </header>

        {/* I · The idea */}
        <section className="relative border-y-2 border-ink-warm bg-paper-2">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-20 md:px-12 lg:grid-cols-[1fr_600px] lg:gap-16 lg:py-32 xl:px-[100px]">
            <div data-reveal>
              <Kicker>I · THE IDEA UNDERNEATH</Kicker>
              <blockquote className="mt-8 font-serif text-[28px] italic leading-[1.25] text-ink-warm md:mt-10 md:text-[44px] md:leading-[1.22]">
                “Everything lands on the floor. They’re all interconnected, stacked on top of each other. You, as the
                user of EventQuan, <span className="not-italic text-maroon">you’re a straw.</span>”
              </blockquote>
              <div className="mt-6 font-mono text-[13px] font-semibold tracking-[2px] text-ink-warm-2">
                TROY, ON OUR LAST CALL
              </div>
              <p className="mt-10 max-w-[600px] font-serif text-[19px] leading-[1.55] text-ink-warm md:mt-12 md:text-[21px]">
                Every live event is a sheet. Who you are and where you are decide which sheets the straw goes through,
                and those are the only ones the app shows you. The six screens below are one student’s slice, in order.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12.5px] font-semibold tracking-[1.4px]">
                {(
                  [
                    ['TEXAS A&M', '#500000'],
                    ['COLLEGE STATION', '#16775a'],
                    ['BRYAN', '#1d5fb0'],
                  ] as const
                ).map(([l, c]) => (
                  <span key={l} className="flex items-center gap-2">
                    <span className="h-[14px] w-[6px] rounded-[1px]" style={{ background: c }} />
                    {l}
                  </span>
                ))}
              </div>
            </div>
            {/* The stack is drawn at 600px; on phones it's scaled down rather than reflowed */}
            <div className="flex justify-center pt-16 lg:pt-20">
              <div className="max-md:-mb-[330px] max-md:origin-top max-md:scale-[0.5]">
                <StrawStack />
              </div>
            </div>
          </div>
        </section>

        {/* II · The lineup */}
        <section className="mx-auto max-w-[1440px] px-5 pt-20 md:px-12 lg:pt-32 xl:px-[100px]">
          <div data-reveal className="flex flex-col gap-6 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
            <div>
              <Kicker>II · THE LINEUP</Kicker>
              <h2 className="mt-6 font-poster text-[clamp(72px,12vw,168px)] font-black uppercase leading-[0.8] text-maroon">
                The lineup.
              </h2>
            </div>
            <p className="max-w-[460px] font-serif text-[19px] leading-[1.5] text-ink-warm-2 md:text-[21px] lg:pb-3">
              Three he drew, made production grade. Three he never drew, where we show him something new. Same tab bar
              on every one.
            </p>
          </div>
          {LINEUP.map((e, i) => (
            <LineupEntry key={e.n} entry={e} i={i} />
          ))}
        </section>

        <Walkthrough />

        {/* IV · Calls */}
        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-12 lg:py-32 xl:px-[100px]">
          <div data-reveal className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <Kicker>IV · CALLS TO MAKE WITH TROY</Kicker>
              <dl className="mt-10">
                {CALLS.map((c, i) => (
                  <div key={c.q} className="grid grid-cols-[56px_1fr] gap-4 border-t-2 border-ink-warm py-6">
                    <dt className="font-poster text-[44px] font-extrabold leading-none text-maroon tabular">
                      0{i + 1}
                    </dt>
                    <dd>
                      <div className="font-poster text-[30px] font-bold uppercase leading-none tracking-[0.3px]">
                        {c.q}
                      </div>
                      <p className="mt-2 font-serif text-[19px] leading-[1.5] text-ink-warm-2">{c.a}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <Kicker>V · WITH MORE TIME</Kicker>
              <ul className="mt-10">
                {LATER.map((l) => (
                  <li
                    key={l}
                    className="flex items-baseline gap-4 border-t border-ink-warm/25 py-5 font-serif text-[19px] text-ink-warm md:text-[22px]"
                  >
                    <span className="font-mono text-[13px] font-semibold text-maroon">→</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Sign-off */}
      <footer className="relative overflow-hidden border-t-2 border-ink-warm">
        <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 md:px-12 lg:pb-14 lg:pt-16 xl:px-[100px]">
          <div
            data-reveal
            className="stroke-maroon select-none whitespace-nowrap font-poster text-[clamp(104px,21vw,300px)] font-black uppercase leading-[0.8] tracking-[-0.015em]"
          >
            Gig ’em<span className="text-gold [-webkit-text-stroke:0]">.</span>
          </div>
          <div className="mt-10 flex flex-col gap-3 font-mono text-[12px] font-semibold tracking-[1.8px] text-ink-warm-2 md:flex-row md:items-center md:justify-between md:text-[12.5px] md:tracking-[2px]">
            <span className="flex items-center gap-3 text-ink-warm">
              <EqMark size={22} />
              EVENTQUAN × TEXAS A&amp;M
            </span>
            <span>BUILT IN CODE · RUNS AS A REAL APP</span>
            <span>PREPARED OCTOBER 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
