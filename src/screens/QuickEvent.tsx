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
import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Screen, ScrollBody } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Avatar, Faces } from '../components/Avatar'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { EventCard } from '../components/EventCard'
import { Sheet } from '../components/Sheet'
import { IconButton } from '../components/ui'
import { NODE_META, type Node } from '../data/events'
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
const TEXT = 'text-title leading-[27px] font-medium tracking-snug whitespace-pre-wrap break-words'

function Highlighted({ text, spans }: { text: string; spans: Span[] }) {
  const parts: React.ReactNode[] = []
  let at = 0
  spans.forEach((s, i) => {
    if (s.start < at) return
    parts.push(text.slice(at, s.start))
    parts.push(
      <mark
        key={i}
        className={`rounded-tag [box-decoration-break:clone] ${
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

/** The card your crew sees in their feed: the shared EventCard, used in the composer preview and after Post. */
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
  place?: { node: Node; short: string }
}) {
  return (
    <EventCard
      mediaSize={64}
      media={
        <div
          key={template?.id ?? 'none'}
          className={`rise grid size-[64px] place-items-center rounded-thumb ${template ? '' : 'bg-tint-neutral text-ink-3'}`}
          style={template ? { background: template.cover.bg, color: template.cover.ink } : undefined}
        >
          {template ? <TemplateIcon id={template.id} size={28} strokeWidth={2} /> : <Plus size={26} />}
        </div>
      }
      eyebrow={`Quick Event · ${audience}`}
      eyebrowTone="soon"
      status={<span className="text-micro font-semibold text-ink-3">{guests} invited</span>}
      title={title}
      when={when}
      place={place?.short}
      node={place?.node}
    />
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

  // The Posted sheet is modal: the composer behind goes inert while it's open,
  // and focus returns to Post when it closes.
  const postRef = useRef<HTMLButtonElement>(null)
  const closeSheet = () => {
    setPosted(false)
    requestAnimationFrame(() => postRef.current?.focus())
  }

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
                <h1 className="text-emphasis font-semibold">Quick Event</h1>
              </div>
              <Badge tone="brand" size="lg">
                FREE
              </Badge>
            </div>
            {/* One-tap starters */}
            <div className="no-scrollbar -mx-4 mt-1.5 flex gap-2 overflow-x-auto px-4">
              {TEMPLATES.map((x) => (
                <Chip
                  key={x.id}
                  surface="onMaroon"
                  size="lg"
                  selected={tpl === x.id}
                  onClick={() => {
                    setTpl(x.id)
                    setText(x.text)
                  }}
                  leading={<TemplateIcon id={x.id} size={16} strokeWidth={2.2} />}
                >
                  {x.label}
                </Chip>
              ))}
            </div>
          </header>

          {/* Composer */}
          <div className="relative z-10 -mt-[44px] mx-3 rounded-sheet bg-white p-4 shadow-floating">
            <div className="flex items-center gap-2.5">
              <Avatar initials="JC" size={34} />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-control font-semibold">Jordan Carter</div>
                <div className="text-meta text-ink-3">Class of '27</div>
              </div>
              {/* Audience: a compact menu pill. Tapping cycles Friends → Aggies → Public in the prototype. */}
              <button
                type="button"
                aria-label={`Who can see it: ${audience}`}
                onClick={() => setAudience((a) => AUDIENCES[(AUDIENCES.indexOf(a) + 1) % AUDIENCES.length])}
                className="press relative flex h-[34px] shrink-0 items-center gap-1.5 rounded-full bg-canvas pl-3 pr-2.5 text-control font-semibold text-ink after:absolute after:-inset-y-1.5 after:inset-x-0 after:content-['']"
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
              <div className="mb-2 flex items-center gap-1.5 text-micro font-bold tracking-eyebrow text-ink-3">
                <Sparkles size={12} className="text-gold-dark" />
                PICKED UP AUTOMATICALLY
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-[30px] place-items-center rounded-well bg-soon text-soon-ink">
                    <CalendarDays size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-1.5 text-control font-semibold">
                      {p.day ? `${p.day.label} ·` : 'Pick a day ·'}
                      {p.time ? (
                        <span className="font-display text-display-sm font-bold italic leading-none tabular text-maroon">
                          {p.time.label}
                        </span>
                      ) : (
                        <span>add a time</span>
                      )}
                    </div>
                    {p.conflict ? (
                      <div
                        className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-meta ${p.conflict.tone === 'clear' ? 'text-ok' : 'text-warn-ink'}`}
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
                      <div className="text-meta text-ink-3">{p.day?.date ?? 'Try “tonight 9:30”'}</div>
                    )}
                  </div>
                  <ChevronDown size={16} className="text-ink-3" />
                </div>
                <div className="flex items-center gap-2.5">
                  <span
                    className={`grid size-[30px] place-items-center rounded-well ${p.place ? `${NODE_META[p.place.node].bg} ${NODE_META[p.place.node].text}` : 'bg-canvas text-ink-3'}`}
                  >
                    <MapPin size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-control font-semibold">
                      <span className="truncate">{p.place?.name ?? 'Add a place'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-meta text-ink-3">
                      {p.place ? (
                        <>
                          <Badge tone="node" node={p.place.node} size="sm" />
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
                  <div className="ml-[40px] flex items-center gap-1.5 rounded-well bg-cstat-soft px-2.5 py-1.5 text-meta font-medium text-cstat">
                    <Tag size={12} />
                    {p.place.offer}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Who */}
          <section className="mt-3 flex items-center gap-2">
            <span className="flex shrink-0 items-center gap-1.5 pl-4 text-control font-semibold">
              <Users size={16} className="text-maroon" />
              Invite
            </span>
            <div className="no-scrollbar flex gap-1.5 overflow-x-auto pr-3">
              {CREWS.map((c) => {
                const on = crews.includes(c.id)
                return (
                  <Chip
                    key={c.id}
                    appearance="soft"
                    selected={on}
                    onClick={() => setCrews((s) => (on ? s.filter((x) => x !== c.id) : [...s, c.id]))}
                    leading={
                      on ? (
                        <span className="grid size-[22px] place-items-center rounded-full bg-maroon text-white">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      ) : (
                        <Faces n={2} size={22} />
                      )
                    }
                  >
                    {c.label}
                    <span className="font-normal opacity-60">{c.n}</span>
                  </Chip>
                )
              })}
              <Chip selected={false} label="Add people" leading={<Plus size={16} />} />
            </div>
          </section>

          {/* Preview: it lands in the stack like every other event */}
          <section className="mx-3 mt-4">
            <div className="mb-1.5 px-1 text-micro font-bold tracking-eyebrow text-ink-3">
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
                  className={`flex h-[28px] items-center gap-1 rounded-full px-2.5 text-meta font-semibold ${
                    i < 2
                      ? 'bg-white text-ink-2 ring-1 ring-hairline'
                      : 'border border-dashed border-hairline-strong text-ink-3'
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
        {/* Tall fade so content scrolling under the button dissolves instead of being cut in half. */}
        <div className="absolute inset-x-0 bottom-[84px] z-20 bg-[linear-gradient(180deg,rgba(242,242,245,0)_0%,var(--color-canvas)_30%)] px-3 pb-2.5 pt-12">
          <Button
            size="lg"
            className="w-full"
            disabled={empty}
            aria-describedby={empty ? 'post-hint' : undefined}
            onClick={() => setPosted(true)}
            ref={postRef}
          >
            Post Event
          </Button>
          <div id="post-hint" className="mt-1.5 text-center text-micro text-ink-3">
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
      <Sheet open={posted} onClose={closeSheet} labelledBy="posted-title" describedBy="posted-desc">
        <div className="mt-5 flex items-center gap-3 px-1">
          <span className="settle grid size-[44px] place-items-center rounded-full bg-ok text-white">
            <Check size={24} strokeWidth={3} />
          </span>
          <div>
            <h2
              id="posted-title"
              data-autofocus
              tabIndex={-1}
              className="rounded-tag text-display-sm font-bold leading-tight tracking-title"
            >
              Posted.
            </h2>
            <p id="posted-desc" className="text-control text-ink-2">
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
          <Button size="lg" className="w-full">
            View event
          </Button>
          <Button variant="secondary" size="lg" className="w-full">
            Open group chat
          </Button>
        </div>
      </Sheet>
    </Screen>
  )
}
