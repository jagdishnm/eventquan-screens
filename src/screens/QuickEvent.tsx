import {
  BookOpen,
  Cake,
  CalendarDays,
  Check,
  ChevronDown,
  FlagTriangleRight,
  MapPin,
  Plus,
  Sparkles,
  Tag,
  Tv,
  Users,
  Volleyball,
  X,
  type LucideProps,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Screen, ScrollBody } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Faces, GoldButton, IconButton, NodeTag } from '../components/ui'
import { NODE_META } from '../data/events'
import { parseQuickEvent, TEMPLATES, type Span, type Template } from '../data/quickEvent'

/** Bowling ball — lucide has no bowling glyph, so this is drawn to the same 24px, 2px-stroke grid. */
function BowlingBall({ size = 24, strokeWidth = 2, color = 'currentColor', ...rest }: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="10" cy="8" r="1.1" fill={color} stroke="none" />
      <circle cx="14" cy="7.4" r="1.1" fill={color} stroke="none" />
      <circle cx="12.6" cy="11.2" r="1.1" fill={color} stroke="none" />
    </svg>
  )
}

const ICONS: Record<Template['id'], ComponentType<LucideProps>> = {
  bowling: BowlingBall,
  birthday: Cake,
  golf: FlagTriangleRight,
  watch: Tv,
  study: BookOpen,
  pickup: Volleyball,
}

function TemplateIcon({ id, ...rest }: LucideProps & { id: Template['id'] }) {
  const I = ICONS[id]
  return <I {...rest} />
}

const AUDIENCES = ['Friends', 'Aggies', 'Public'] as const

const CREWS = [
  { id: 'crew', label: 'Gameday crew', n: 6 },
  { id: 'engr', label: 'ENGR 102', n: 24 },
  { id: 'outdoors', label: 'Aggie Outdoors', n: 58 },
]

/** Same glyph metrics for the textarea and its highlight layer, so marks sit exactly under the words. */
const TEXT = 'text-[19px] leading-[27px] font-medium tracking-[-0.35px] whitespace-pre-wrap break-words'

function Highlighted({ text, spans }: { text: string; spans: Span[] }) {
  const parts: React.ReactNode[] = []
  let at = 0
  spans.forEach((s, i) => {
    if (s.start < at) return
    parts.push(text.slice(at, s.start))
    parts.push(
      <mark
        key={i}
        className={`rounded-[5px] [box-decoration-break:clone] ${
          s.kind === 'when' ? 'bg-gold/45 text-ink' : 'bg-cstat-soft text-cstat'
        }`}
      >
        {text.slice(s.start, s.end)}
      </mark>,
    )
    at = s.end
  })
  parts.push(text.slice(at))
  return <>{parts}</>
}

/** The card your crew sees in their feed, used in the composer preview and after Post. */
function EventPreview({
  template,
  title,
  audience,
  guests,
  when,
  place,
}: {
  template?: Template
  title: string
  audience: string
  guests: number
  when: string
  place?: { node: keyof typeof NODE_META; short: string }
}) {
  return (
    <div className="flex gap-3 rounded-[18px] bg-white p-2.5 pr-3">
      <div
        key={template?.id ?? 'none'}
        className="rise grid size-[64px] shrink-0 place-items-center rounded-[14px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
        style={
          template
            ? { background: template.cover.bg, color: template.cover.ink }
            : { background: '#ebebef', color: '#6b6b74' }
        }
      >
        {template ? <TemplateIcon id={template.id} size={28} strokeWidth={2} /> : <Plus size={26} />}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.7px] text-[#7a4f00]">
          <span>Quick Event · {audience}</span>
          <span className="font-semibold normal-case tracking-normal text-ink-3">{guests} invited</span>
        </div>
        <div className="truncate text-[16px] font-semibold tracking-[-0.3px]">{title}</div>
        <div className="flex items-center gap-1 truncate text-[13px] text-ink-2">
          <span className="font-medium text-ink tabular">{when}</span>
          <span className="text-ink-3">·</span>
          {place ? <MapPin size={12} strokeWidth={2.4} className={NODE_META[place.node].text} /> : null}
          <span className="truncate">{place?.short ?? 'Place TBD'}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * The Quick Event composer. `?empty=1` opens it blank (empty state);
 * `?posted=1` opens on the confirmation sheet shown after Post.
 */
export function QuickEvent() {
  const [params] = useSearchParams()
  const startEmpty = params.get('empty') === '1'
  const [tpl, setTpl] = useState<Template['id'] | null>(startEmpty ? null : 'bowling')
  const [text, setText] = useState(startEmpty ? '' : TEMPLATES[0].text)
  const [posted, setPosted] = useState(params.get('posted') === '1')
  const [crews, setCrews] = useState<string[]>(['crew'])
  const [audience, setAudience] = useState<(typeof AUDIENCES)[number]>('Friends')
  const p = useMemo(() => parseQuickEvent(text), [text])
  const t = TEMPLATES.find((x) => x.id === tpl)
  const empty = text.trim() === ''
  const tryTime = (time: string) => {
    const span = p.timeSpan
    if (span) setText(text.slice(0, span.start) + time + text.slice(span.end))
  }
  const guests = CREWS.filter((c) => crews.includes(c.id)).reduce((a, c) => a + c.n, 0)

  // The Posted sheet is modal: focus moves into it, the composer behind goes inert,
  // Escape closes it, and focus returns to Post.
  const postRef = useRef<HTMLButtonElement>(null)
  const sheetTitle = useRef<HTMLHeadingElement>(null)
  const closeSheet = () => {
    setPosted(false)
    requestAnimationFrame(() => postRef.current?.focus())
  }
  useEffect(() => {
    if (!posted) return
    sheetTitle.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSheet()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [posted])

  return (
    <Screen>
      <StatusBar />
      <div className="contents" inert={posted}>
        <ScrollBody className="!pb-[200px]">
          <header className="bg-maroon px-4 pb-[58px] pt-[54px] text-white">
            <div className="flex h-[44px] items-center justify-between">
              <IconButton label="Close" to="/">
                <X size={18} />
              </IconButton>
              <div className="text-center">
                <h1 className="text-[17px] font-semibold">Quick Event</h1>
              </div>
              <span className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-bold tracking-[0.6px] text-gold">
                FREE
              </span>
            </div>
            {/* One-tap starters */}
            <div className="no-scrollbar -mx-4 mt-1.5 flex gap-2 overflow-x-auto px-4">
              {TEMPLATES.map((x) => (
                <button
                  type="button"
                  key={x.id}
                  aria-pressed={tpl === x.id}
                  onClick={() => {
                    setTpl(x.id)
                    setText(x.text)
                  }}
                  className={`press relative after:absolute after:-inset-y-2 after:inset-x-0 after:content-[''] flex h-[36px] shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[14px] font-semibold transition-colors duration-300 ${
                    tpl === x.id ? 'bg-white text-maroon' : 'bg-white/12 text-white'
                  }`}
                >
                  <TemplateIcon id={x.id} size={16} strokeWidth={2.2} />
                  {x.label}
                </button>
              ))}
            </div>
          </header>

          {/* Composer */}
          <div className="relative z-10 -mt-[44px] mx-3 rounded-[22px] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_16px_36px_-18px_rgba(60,0,0,0.45)]">
            <div className="flex items-center gap-2.5">
              <span className="grid size-[34px] place-items-center rounded-full bg-[#9a6a2c] text-[13px] font-bold text-white">
                JC
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-[14px] font-semibold">Jordan Carter</div>
                <div className="text-[12px] text-ink-3">Class of '27</div>
              </div>
              {/* Audience: a compact menu pill. Tapping cycles Friends → Aggies → Public in the prototype. */}
              <button
                type="button"
                aria-label={`Who can see it: ${audience}`}
                onClick={() => setAudience((a) => AUDIENCES[(AUDIENCES.indexOf(a) + 1) % AUDIENCES.length])}
                className="press relative flex h-[34px] shrink-0 items-center gap-1.5 rounded-full bg-canvas pl-3 pr-2.5 text-[14px] font-semibold text-ink after:absolute after:-inset-y-1.5 after:inset-x-0 after:content-['']"
              >
                <Users size={15} className="text-maroon" />
                {audience}
                <ChevronDown size={15} className="text-ink-3" />
              </button>
            </div>

            <div className="relative mt-3 min-h-[81px]">
              <div aria-hidden className={`${TEXT} pointer-events-none text-ink`}>
                <Highlighted text={text} spans={p.spans} />
                {'​'}
              </div>
              <textarea
                aria-label="Describe your event"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                placeholder="What's the plan? Try “Bowling at Grand Station tonight 9:30”"
                className={`${TEXT} absolute inset-0 size-full resize-none bg-transparent text-transparent caret-maroon outline-none placeholder:text-ink-3`}
              />
            </div>

            {/* What EventQuan understood */}
            <div className="mt-3 border-t border-hairline pt-3">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.7px] text-ink-3">
                <Sparkles size={12} className="text-[#b08400]" />
                PICKED UP AUTOMATICALLY
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-[30px] place-items-center rounded-[9px] bg-[#fff4d6] text-[#8a5a00]">
                    <CalendarDays size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[14.5px] font-semibold">
                      {p.day ? `${p.day.label} · ` : 'Pick a day · '}
                      <span className="tabular">{p.time?.label ?? 'add a time'}</span>
                    </div>
                    {p.conflict ? (
                      <div
                        className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px] ${p.conflict.tone === 'clear' ? 'text-ok' : 'text-[#9a3f06]'}`}
                      >
                        {p.conflict.tone === 'clear' ? <Check size={12} strokeWidth={3} /> : null}
                        {p.conflict.text}
                        {p.conflict.tone === 'warn' ? (
                          <button
                            type="button"
                            onClick={() => tryTime('9:30')}
                            className="relative font-semibold text-maroon underline underline-offset-2 after:absolute after:-inset-3 after:content-['']"
                          >
                            Try 9:30?
                          </button>
                        ) : null}
                      </div>
                    ) : (
                      <div className="text-[12px] text-ink-3">{p.day?.date ?? 'Try “tonight 9:30”'}</div>
                    )}
                  </div>
                  <ChevronDown size={16} className="text-ink-3" />
                </div>
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid size-[30px] place-items-center rounded-[9px] ${p.place ? `${NODE_META[p.place.node].bg} ${NODE_META[p.place.node].text}` : 'bg-canvas text-ink-3'}`}
                  >
                    <MapPin size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[14.5px] font-semibold">
                      <span className="truncate">{p.place?.name ?? 'Add a place'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-ink-3">
                      {p.place ? (
                        <>
                          <NodeTag node={p.place.node} className="!h-[18px] !px-1.5 !text-[11px]" />
                          {p.place.walk}
                        </>
                      ) : (
                        'Try “at Northgate”'
                      )}
                    </div>
                  </div>
                  <ChevronDown size={16} className="text-ink-3" />
                </div>
                {p.place?.offer ? (
                  <div className="ml-[40px] flex items-center gap-1.5 rounded-[10px] bg-cstat-soft px-2.5 py-1.5 text-[12px] font-medium text-cstat">
                    <Tag size={12} />
                    {p.place.offer}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Who */}
          <section className="mt-3 flex items-center gap-2">
            <span className="flex shrink-0 items-center gap-1.5 pl-4 text-[14px] font-semibold">
              <Users size={16} className="text-maroon" />
              Invite
            </span>
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto pr-3">
              {CREWS.map((c) => {
                const on = crews.includes(c.id)
                return (
                  <button
                    type="button"
                    key={c.id}
                    aria-pressed={on}
                    onClick={() => setCrews((s) => (on ? s.filter((x) => x !== c.id) : [...s, c.id]))}
                    className={`relative after:absolute after:-inset-y-1.5 after:inset-x-0 after:content-[''] flex h-[34px] shrink-0 items-center gap-1.5 rounded-full pl-1.5 pr-3 text-[13px] font-semibold transition-colors ${
                      on
                        ? 'bg-maroon-soft text-maroon ring-1 ring-maroon/25'
                        : 'bg-white text-ink-2 ring-1 ring-hairline'
                    }`}
                  >
                    {on ? (
                      <span className="grid size-[22px] place-items-center rounded-full bg-maroon text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    ) : (
                      <Faces n={2} size={22} />
                    )}
                    {c.label}
                    <span className="font-normal opacity-60">{c.n}</span>
                  </button>
                )
              })}
              <button
                type="button"
                aria-label="Add people"
                className="relative after:absolute after:-inset-y-2 after:inset-x-0 after:content-[''] grid size-[36px] shrink-0 place-items-center rounded-full bg-white text-ink-2 ring-1 ring-hairline"
              >
                <Plus size={16} />
              </button>
            </div>
          </section>

          {/* Preview: it lands in the stack like every other event */}
          <section className="mx-3 mt-4">
            <div className="mb-1.5 px-1 text-[11px] font-bold tracking-[0.7px] text-ink-3">
              HOW IT SHOWS UP FOR YOUR CREW
            </div>
            <EventPreview
              template={t}
              title={t?.title ?? (empty ? 'Your event' : 'Quick event')}
              audience={audience}
              guests={guests}
              when={p.day && p.time ? `${p.day.label}, ${p.time.label}` : (p.time?.label ?? 'Time TBD')}
              place={p.place}
            />
            <div className="mt-2.5 flex flex-wrap gap-1.5 px-1">
              {['Group chat', 'Remind me 30 min before', 'Split costs'].map((x, i) => (
                <span
                  key={x}
                  className={`flex h-[28px] items-center gap-1 rounded-full px-2.5 text-[12px] font-semibold ${
                    i < 2
                      ? 'bg-white text-ink-2 ring-1 ring-hairline'
                      : 'border border-dashed border-[#cfcfd6] text-ink-3'
                  }`}
                >
                  {i < 2 ? <Check size={12} strokeWidth={3} className="text-ok" /> : <Plus size={12} />}
                  {x}
                </span>
              ))}
            </div>
          </section>
        </ScrollBody>

        {/* Post */}
        <div className="absolute inset-x-0 bottom-[84px] z-20 bg-[linear-gradient(180deg,rgba(242,242,245,0)_0%,#f2f2f5_28%)] px-3 pb-2.5 pt-6">
          <GoldButton
            size="lg"
            className="w-full disabled:bg-[#e6e3d8] disabled:text-ink-3 disabled:shadow-none"
            disabled={empty}
            aria-describedby={empty ? 'post-hint' : undefined}
            onClick={() => setPosted(true)}
            ref={postRef}
          >
            Post Event
          </GoldButton>
          <div id="post-hint" className="mt-1.5 text-center text-[11.5px] text-ink-3">
            {empty ? (
              'Describe your event to post it'
            ) : (
              <>
                Free for up to 50 guests · Selling tickets? <span className="font-semibold text-maroon">Go Plus</span>
              </>
            )}
          </div>
        </div>
        <TabBar active="home" />
      </div>

      {/* After Post: the confirmation sheet. Couple clicks, it's done. */}
      {posted ? (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop: tap to dismiss. Keyboard users close with Escape, so it isn't a tab stop. */}
          <div aria-hidden onClick={closeSheet} className="rise absolute inset-0 bg-black/45" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="posted-title"
            aria-describedby="posted-desc"
            className="rise relative rounded-t-[28px] bg-canvas px-4 pb-[42px] pt-2.5 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.4)]"
          >
            <div className="mx-auto h-[5px] w-[38px] rounded-full bg-black/15" />
            <div className="mt-5 flex items-center gap-3 px-1">
              <span className="settle grid size-[44px] place-items-center rounded-full bg-ok text-white">
                <Check size={24} strokeWidth={3} />
              </span>
              <div>
                <h2
                  id="posted-title"
                  ref={sheetTitle}
                  tabIndex={-1}
                  className="rounded-[6px] text-[24px] font-bold leading-tight tracking-[-0.5px]"
                >
                  Posted.
                </h2>
                <p id="posted-desc" className="text-[14.5px] text-ink-2">
                  {guests} invites sent and the group chat is open.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <EventPreview
                template={t}
                title={t?.title ?? 'Quick event'}
                audience={audience}
                guests={guests}
                when={p.day && p.time ? `${p.day.label}, ${p.time.label}` : (p.time?.label ?? 'Time TBD')}
                place={p.place}
              />
            </div>
            <div className="mt-4 grid gap-2.5">
              <GoldButton size="lg" className="w-full">
                View event
              </GoldButton>
              <button
                type="button"
                className="press h-[50px] rounded-[16px] bg-white text-[16px] font-semibold text-ink ring-1 ring-hairline"
              >
                Open group chat
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Screen>
  )
}
