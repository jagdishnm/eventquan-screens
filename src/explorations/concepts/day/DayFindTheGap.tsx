import { Check, ChevronLeft, Clock, MapPin, Music, Users } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Chip } from '../../../components/Chip'
import { Screen, ScrollBody } from '../../../components/Device'
import { MatchupThumb } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton } from '../../../components/ui'
import { NODE_META, type Node } from '../../../data/events'
import { BigTime, FoldNote, OnRail, TimeRail, UndoToast } from './Rail'
import { LANE_X, RAIL_X, clock, split, timeScale } from './time'

/** Saturday, 8:51 PM. Q3 at Kyle Field. Hours past 24 are Sunday morning. */
const NOW = 20 + 51 / 60
/** The free stretch tonight's plan drops into. */
const GAP = { from: 22, to: 23.5 }
/** The gap, said one way everywhere: caption, the hatched card and the composer. */
const GAP_RANGE = `${split(GAP.from).hm}–${split(GAP.to).hm}`
const FREE = `Free ${GAP_RANGE} PM`

const y = timeScale([
  [20.75, 10],
  [21.5, 100],
  [22, 150],
  [23.5, 282],
  [25, 362],
  [25.75, 392],
])

const PLACES: { match: RegExp; name: string; where: string; node: Node }[] = [
  { match: /whataburger/i, name: 'Whataburger', where: 'Texas Ave', node: 'cstat' },
  { match: /dixie chicken/i, name: 'Dixie Chicken', where: 'Northgate', node: 'cstat' },
  { match: /fuego/i, name: 'Fuego Tortilla Grill', where: 'Northgate', node: 'cstat' },
  { match: /northgate/i, name: 'Northgate', where: 'College Station', node: 'cstat' },
  { match: /\bmsc\b/i, name: 'the MSC', where: 'Texas A&M', node: 'tamu' },
  { match: /bryan/i, name: 'Downtown Bryan', where: 'Bryan', node: 'bryan' },
]

const TIME = /\b(\d{1,2})(?::(\d{2}))?\s*(a\.?m\.?|p\.?m\.?)(?=\W|$)|\b(\d{1,2}):(\d{2})\b/i

/** One line of text → a plan on tonight's straw. Evening by default; small AM hours are after midnight. */
function parse(text: string) {
  const t = text.trim()
  if (!t) return null
  const m = TIME.exec(t)
  let start: number | undefined
  if (m) {
    const hh = Number(m[1] ?? m[4])
    const mm = Number(m[2] ?? m[5] ?? 0)
    const ap = (m[3] ?? '').toLowerCase().replace(/\./g, '')
    let h = (hh % 12) + mm / 60
    if (ap === 'pm' || (!ap && hh < 12)) h += 12
    if (ap === 'am' || (!ap && hh === 12)) h += 24
    if (h >= 12 && h <= 36) start = h
  }
  const place = PLACES.find((p) => p.match.test(t))
  const title =
    t
      .replace(TIME, '')
      .replace(/\b(at|@|tonight)\s*$/i, '')
      .replace(/[?!.\s]+$/, '')
      .trim() || 'Plan tonight'
  const s = start ?? GAP.from
  const fits = s >= GAP.from && s < GAP.to
  return {
    title: title[0].toUpperCase() + title.slice(1),
    place,
    start: s,
    end: fits ? Math.min(s + 1, GAP.to) : s + 1,
    timed: start !== undefined,
    fits,
  }
}

const CHIPS = ['Whole evening', 'Just the gaps', 'With the crew'] as const

/**
 * Concept 1 · The Day, stage 6 · Quick Event. The evening on the straw with its free time showing.
 * Type a plan in plain words; it previews in the gap it fits, and the gold Post drops it there as
 * a new sheet, with the crew invited.
 */
export function DayFindTheGap() {
  const [text, setText] = useState('Whataburger after the game 10:30 PM?')
  const [posted, setPosted] = useState<ReturnType<typeof parse>>(null)
  const [chip, setChip] = useState<(typeof CHIPS)[number]>('Whole evening')
  const plan = parse(text)
  const shown = posted ?? (plan?.fits ? plan : null)
  const dim = (crew: boolean) => (chip === 'Just the gaps' || (chip === 'With the crew' && !crew) ? 'opacity-35' : '')

  const [draft, setDraft] = useState('')
  const post = () => {
    if (!plan?.fits) return
    setPosted(plan)
    setDraft(text)
    setText('')
  }
  const undo = () => {
    setPosted(null)
    setText(draft)
  }

  const freeBefore = shown ? shown.start - GAP.from : GAP.to - GAP.from

  return (
    <Screen>
      <StatusBar />
      <ScrollBody className="pb-[230px]">
        <header className="bg-maroon px-4 pb-3.5 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center gap-1">
            <IconButton label="Back to Home" to="/explore/home-straw">
              <ChevronLeft size={20} />
            </IconButton>
            <h1 className="ml-1 text-balance text-emphasis font-bold tracking-snug">Find the gap</h1>
          </div>

          <div className="mt-2">
            <BigTime
              kicker="SATURDAY NIGHT · OCT 12"
              value="8:51"
              unit="PM"
              label="8:51 PM, Saturday night"
              caption={
                posted ? (
                  <>
                    Planned through <span className="tabular">{clock(posted.end)}</span> · free again after 1:00
                  </>
                ) : (
                  <>
                    <b className="font-semibold text-white">{FREE}</b> · the long gap tonight
                  </>
                )
              }
            />
          </div>

          <div className="no-scrollbar -mx-4 mt-3.5 flex gap-2 overflow-x-auto px-4">
            {CHIPS.map((c) => (
              <Chip key={c} surface="onMaroon" selected={chip === c} onClick={() => setChip(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </header>

        <div className="mt-3">
          <TimeRail
            y={y}
            from={20.75}
            to={25.75}
            now={NOW}
            folds={[{ from: 25, to: 25.75 }]}
            marks={[{ h: 21.5 }, { h: 22 }, { h: 23.5 }, { h: 25 }]}
            label="Your evening"
          >
            <OnRail y={y(NOW) + 14} align="top" dotY={25} pierce="live" className={dim(true)}>
              <div className="flex h-[50px] items-center gap-2.5 rounded-thumb bg-white pl-1.5 pr-2.5 shadow-raised">
                <MatchupThumb size={38} />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-control font-semibold">A&amp;M vs LSU</span>
                  <span className="block truncate text-meta text-ink-3">Q3 · 28–24 · ends ~9:30</span>
                </span>
                <Badge tone="live" size="sm" />
              </div>
            </OnRail>

            <OnRail y={y(21.5) + 2} align="top" dotY={4} pierce="gold" className={dim(true)}>
              <div className="flex h-[44px] items-center gap-2.5 rounded-thumb bg-white pl-1.5 pr-2.5 shadow-raised">
                <img src="/img/northgate.jpg" alt="" className="size-[32px] shrink-0 rounded-well object-cover" />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-control font-semibold">Walk to Northgate</span>
                  <span className="block truncate text-meta text-ink-3">After the War Hymn · Maya, Alex</span>
                </span>
              </div>
            </OnRail>

            {/* The gap, hatched, with tonight's plan dropped into it */}
            <li
              aria-label={
                posted
                  ? `${posted.title}, ${clock(posted.start)} to ${clock(posted.end)}, posted`
                  : `Free from ${clock(GAP.from)} to ${clock(GAP.to)}`
              }
              className="absolute right-4 rounded-thumb ring-2 ring-gold/70 ring-inset"
              style={{
                left: LANE_X,
                top: y(GAP.from) + 3,
                height: y(GAP.to) - y(GAP.from) - 6,
                backgroundImage:
                  'repeating-linear-gradient(135deg, color-mix(in srgb, var(--color-gold) 22%, transparent) 0 6px, transparent 6px 13px)',
              }}
            >
              {freeBefore >= 0.4 ? (
                <span className="absolute left-2.5 top-2 flex items-baseline gap-1.5">
                  <span className="text-micro font-bold tracking-caps text-soon-ink">FREE</span>
                  <span className="font-display text-title font-bold leading-none text-ink tabular">
                    {GAP_RANGE}
                  </span>
                  <span className="text-micro font-bold tracking-eyebrow text-ink-2">PM</span>
                </span>
              ) : null}
              {shown ? (
                <span
                  aria-hidden
                  className={`absolute z-10 size-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    posted ? 'bg-gold ring-4 ring-gold/30' : 'bg-white ring-2 ring-maroon/40'
                  }`}
                  style={{ left: RAIL_X - LANE_X, top: (y(shown.start) + y(shown.end)) / 2 - y(GAP.from) - 5 }}
                />
              ) : null}
              {shown ? (
                <span
                  key={posted ? 'posted' : 'preview'}
                  className={`absolute inset-x-1.5 flex items-center gap-2.5 rounded-thumb px-2.5 ${
                    posted
                      ? 'sheet-drop bg-white shadow-floating'
                      : 'border-2 border-dashed border-maroon/40 bg-white/70'
                  }`}
                  style={{ top: y(shown.start) - y(GAP.from) - 1, height: y(shown.end) - y(shown.start) - 4 }}
                >
                  <span
                    className={`grid size-[40px] shrink-0 place-items-center rounded-well ${
                      shown.place
                        ? `${NODE_META[shown.place.node].bg} ${NODE_META[shown.place.node].text}`
                        : 'bg-maroon-soft text-maroon'
                    }`}
                  >
                    <span className="font-display text-card font-bold leading-none tabular">
                      {clock(shown.start).split(' ')[0]}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-micro font-bold tracking-caps text-maroon">
                      {posted ? 'POSTED · 3 INVITED' : 'PREVIEW · FITS YOUR GAP'}
                    </span>
                    <span className="block truncate text-control font-semibold">{shown.title}</span>
                    <span className="flex items-center gap-1 truncate text-meta text-ink-3">
                      {shown.place ? (
                        <>
                          <span className={`size-[6px] shrink-0 rounded-full ${NODE_META[shown.place.node].dot}`} />
                          {shown.place.name} · {shown.place.where}
                        </>
                      ) : (
                        `${clock(shown.start)} – ${clock(shown.end)}`
                      )}
                    </span>
                  </span>
                </span>
              ) : null}
            </li>

            <OnRail y={y(23.5) + 5} align="top" dotY={4} pierce="open" className={dim(false)}>
              <div className="flex h-[50px] items-center gap-2.5 rounded-thumb bg-white pl-1.5 pr-2.5 shadow-raised">
                <span className="grid size-[38px] shrink-0 place-items-center rounded-well bg-cstat-soft text-cstat">
                  <Music size={17} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-control font-semibold">Late set at The Backyard</span>
                  <span className="block truncate text-meta text-ink-3">Northgate · 11:30 PM – 1:00 AM</span>
                </span>
              </div>
            </OnRail>
            <FoldNote y={y(25.35)}>Free after 1:00. Sleep in, it&rsquo;s Sunday.</FoldNote>
          </TimeRail>
        </div>
      </ScrollBody>

      {/* The composer: one line in, a sheet out */}
      <div className="absolute inset-x-0 bottom-[84px] z-20 px-3 pb-2">
        {posted && !text ? (
          <div className="absolute inset-x-3 bottom-full mb-2">
            <UndoToast onUndo={undo}>
              <b className="font-semibold">Posted</b> · {clock(posted.start)} · 3 invited
            </UndoToast>
          </div>
        ) : null}
        <div className="rounded-sheet bg-white p-2.5 shadow-floating ring-1 ring-hairline">
          <p aria-live="polite" className="flex min-h-[20px] items-center gap-1.5 px-1 text-meta">
            {posted && !text ? (
              <>
                <Check size={14} strokeWidth={2.8} className="shrink-0 text-ok" />
                <span className="truncate text-ink-2">
                  <b className="font-semibold text-ink">On your straw at {clock(posted.start)}</b> · Maya, Alex +1
                  invited
                </span>
              </>
            ) : plan ? (
              plan.fits ? (
                <>
                  <Clock size={13} className="shrink-0 text-gold-dark" />
                  <span className="truncate text-ink-2">
                    <b className="font-semibold text-ink tabular">
                      {split(plan.start).hm}–{clock(plan.end)}
                    </b>{' '}
                    · {plan.timed ? `fits ${FREE}` : `no time given · ${FREE}`}
                  </span>
                </>
              ) : (
                <span className="truncate font-semibold text-warn-ink">
                  {clock(plan.start)} isn&rsquo;t free · {FREE}
                </span>
              )
            ) : (
              <span className="text-ink-3">Say what and when. It finds the gap.</span>
            )}
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            <label className="flex min-h-[56px] min-w-0 flex-1 items-center gap-2 rounded-thumb bg-canvas px-3 py-1.5">
              <span className="sr-only">Plan something tonight</span>
              {plan?.place ? (
                <MapPin size={16} className="shrink-0 text-maroon" />
              ) : (
                <Users size={16} className="shrink-0 text-ink-3" />
              )}
              {/* Two lines, so the whole plan stays readable as you type it */}
              <textarea
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    post()
                  }
                }}
                enterKeyHint="send"
                placeholder="Late night plan with the crew…"
                className="min-w-0 flex-1 resize-none bg-transparent text-body leading-snug text-ink outline-none placeholder:text-ink-3"
              />
            </label>
            <Button onClick={post} disabled={!plan?.fits} className="shrink-0 px-5">
              Post
            </Button>
          </div>
        </div>
      </div>
      <TabBar active="home" />
    </Screen>
  )
}
