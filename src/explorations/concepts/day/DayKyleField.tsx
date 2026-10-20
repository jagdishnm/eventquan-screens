import { Check, ChevronLeft, DoorOpen, Flag, Music, Plus, Share, Tent, type LucideIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Button } from '../../../components/Button'
import { Chip } from '../../../components/Chip'
import { Screen, ScrollBody } from '../../../components/Device'
import { MatchupThumb } from '../../../components/Marks'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton } from '../../../components/ui'
import { BigTime, BigUnit, OnRail, TimeRail, UndoToast } from './Rail'
import { RAIL_X, clock, timeScale, type Scale } from './time'

/** Saturday, Oct 12, 9:46 AM. Kickoff is 6:00 PM. Hours past 24 run into Sunday morning. */
const NOW = 9 + 46 / 60
const KICKOFF = 18

type Tag = 'game' | 'traditions' | 'lots'
type Moment = {
  id: string
  h: number
  title: string
  meta: string
  tag: Tag
  img?: string
  Icon?: LucideIcon
  peak?: boolean
}

/** Kyle Field's own Saturday, tailgate to the War Hymn. */
const MOMENTS: Moment[] = [
  {
    id: 'tailgate',
    h: 10,
    title: 'Tailgate Zone opens',
    meta: 'Lot C · 10 AM · 11 friends',
    tag: 'lots',
    img: '/img/kyle-field-stands.jpg',
  },
  { id: 'gates', h: 15.5, title: 'Gates open', meta: 'Gate 2 · clear bags only', tag: 'lots', Icon: DoorOpen },
  {
    id: 'march',
    h: 17.25,
    title: 'Corps March-In',
    meta: 'Quad → Kyle Field · 6 friends',
    tag: 'traditions',
    img: '/img/aggie-band.jpg',
  },
  {
    id: 'kickoff',
    h: KICKOFF,
    title: 'Kickoff · A&M vs LSU',
    meta: '102K expected · Sec 125',
    tag: 'game',
    peak: true,
  },
  {
    id: 'half',
    h: 19 + 35 / 60,
    title: 'Halftime · Aggie Band',
    meta: 'Fightin’ Texas Aggie Band',
    tag: 'traditions',
    Icon: Music,
  },
  { id: 'final', h: 21.5, title: 'Final whistle', meta: 'Stay for the War Hymn', tag: 'game', Icon: Flag },
]

const y = timeScale([
  [9.6, 10],
  [10, 58],
  [11, 88],
  [15.5, 136],
  [17.25, 190],
  [18, 244],
  [19 + 35 / 60, 298],
  [21.5, 352],
  [22, 372],
])

const FOLDS = [{ from: 11, to: 15.5 }]

/** People inside the gates and lots, in thousands. Capacity is 102,733. */
const CROWD: [number, number][] = [
  [9.6, 1.8],
  [10, 3.4],
  [11, 5.2],
  [13, 9.6],
  [15, 24],
  [15.5, 32],
  [16.5, 60],
  [17.25, 82],
  [18, 101],
  [19.5, 102.6],
  [21, 102],
  [21.5, 96],
  [22, 30],
]

/** The crowd as a band around the straw: the wider it is, the fuller Kyle Field is at that hour. */
function CrowdBand({ y }: { y: Scale }) {
  const half = (c: number) => 3 + (c / 102.7) * 19
  const right = CROWD.map(([h, c]) => `${RAIL_X + half(c)},${y(h)}`)
  const left = [...CROWD].reverse().map(([h, c]) => `${RAIL_X - half(c)},${y(h)}`)
  const nowY = y(NOW)
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <clipPath id="kf-past">
          <rect x="0" y="0" width="400" height={nowY} />
        </clipPath>
      </defs>
      <polygon points={[...right, ...left].join(' ')} fill="var(--color-maroon)" fillOpacity="0.1" />
      <polygon
        points={[...right, ...left].join(' ')}
        fill="var(--color-maroon)"
        fillOpacity="0.22"
        clipPath="url(#kf-past)"
      />
    </svg>
  )
}

const CHIPS: { key: 'all' | Tag; label: string }[] = [
  { key: 'all', label: 'All day' },
  { key: 'game', label: 'The game' },
  { key: 'traditions', label: 'Traditions' },
  { key: 'lots', label: 'Gates & lots' },
]

/**
 * Concept 1 · The Day, stage 4 · Campus node. Kyle Field is a place with its own Saturday: gates,
 * March-In, kickoff, the Band at the half, the War Hymn at the end. The crowd swells around the straw as
 * a band, and the gold action folds the moments you pick into your own day.
 */
export function DayKyleField() {
  const [chip, setChip] = useState<(typeof CHIPS)[number]['key']>('all')
  const [pick, setPick] = useState<Record<string, boolean>>({ gates: true, march: true, kickoff: true, final: false })
  const [added, setAdded] = useState(false)
  const picked = MOMENTS.filter((m) => pick[m.id]).length
  const toggle = (id: string) => {
    setPick((p) => ({ ...p, [id]: !p[id] }))
    setAdded(false)
  }
  const left = KICKOFF - NOW
  const hh = Math.floor(left)
  const mm = Math.round((left - hh) * 60)

  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <header className="bg-maroon px-4 pb-3.5 pt-[54px] text-white">
          <div className="-mx-1 flex h-[44px] items-center gap-1">
            <IconButton label="Back to your Saturday" to="/explore/flow/A2">
              <ChevronLeft size={20} />
            </IconButton>
            <img
              src="/img/kyle-field.jpg"
              alt=""
              className="ml-1 size-[36px] rounded-well object-cover ring-1 ring-white/20"
            />
            <div className="ml-1.5 min-w-0 flex-1 leading-tight">
              <h1 className="text-balance text-emphasis font-bold tracking-snug">Kyle Field</h1>
              <p className="truncate text-meta text-white/75">Texas A&amp;M · Home of the 12th Man</p>
            </div>
            <IconButton label="Share Kyle Field's day">
              <Share size={17} />
            </IconButton>
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <BigTime
              kicker="KICKOFF IN"
              value={
                <>
                  {hh}
                  <BigUnit>h</BigUnit>
                  {mm}
                  <BigUnit>m</BigUnit>
                </>
              }
              label={`Kickoff in ${hh} hours ${mm} minutes, at 6:00 PM`}
              caption={
                <>
                  Now <span className="tabular">{clock(NOW)}</span> · 2.1K here
                </>
              }
            />
            <Button
              aria-pressed={added}
              disabled={!picked && !added}
              onClick={() => setAdded((a) => !a)}
              className="mb-0.5 shrink-0"
            >
              {added ? (
                <>
                  <Check size={17} strokeWidth={2.6} /> On my day
                </>
              ) : (
                <>
                  <Plus size={17} strokeWidth={2.6} /> Add to my day
                </>
              )}
            </Button>
          </div>

          <div className="no-scrollbar -mx-4 mt-3.5 flex gap-2 overflow-x-auto px-4">
            {CHIPS.map((c) => (
              <Chip key={c.key} surface="onMaroon" selected={chip === c.key} onClick={() => setChip(c.key)}>
                {c.label}
              </Chip>
            ))}
          </div>
        </header>

        <section aria-labelledby="kf-day" className="pt-3">
          <div className="flex items-baseline justify-between px-4">
            <h2 id="kf-day" className="text-micro font-bold tracking-caps text-maroon">
              KYLE FIELD&rsquo;S SATURDAY
            </h2>
            <span className="flex items-center gap-1.5 text-meta text-ink-3">
              <span aria-hidden className="h-[10px] w-[16px] rounded-full bg-maroon/20" />
              Crowd in the stadium
            </span>
          </div>
          <p className="sr-only">
            {added
              ? `${picked} Kyle Field moments are on your Saturday.`
              : `${picked} moments picked. Add them to your Saturday with Add to my day.`}
          </p>

          <div className="mt-2">
            <TimeRail
              y={y}
              from={9.6}
              to={22}
              now={NOW}
              folds={FOLDS}
              marks={MOMENTS.map((m) => ({ h: m.h }))}
              under={<CrowdBand y={y} />}
              label="Kyle Field today"
            >
              {MOMENTS.map((m) => (
                <OnRail
                  key={m.id}
                  y={y(m.h)}
                  pierce={pick[m.id] ? 'gold' : 'open'}
                  className={`transition-opacity duration-(--duration-quick) ease-(--ease-out-expo) ${
                    chip === 'all' || chip === m.tag ? '' : 'opacity-35'
                  }`}
                >
                  <MomentRow m={m} on={!!pick[m.id]} onToggle={() => toggle(m.id)} />
                </OnRail>
              ))}
            </TimeRail>
          </div>
        </section>
      </ScrollBody>
      {added ? (
        <div className="absolute inset-x-4 bottom-[94px] z-30">
          <UndoToast onUndo={() => setAdded(false)}>
            <b className="font-semibold">{picked} added to your Saturday</b>
          </UndoToast>
        </div>
      ) : null}
      <TabBar active="map" />
    </Screen>
  )
}

function MomentRow({ m, on, onToggle }: { m: Moment; on: boolean; onToggle: () => void }) {
  const thumb: ReactNode = m.peak ? (
    <MatchupThumb size={36} />
  ) : m.img ? (
    <img src={m.img} alt="" className="size-[36px] rounded-well object-cover" />
  ) : m.Icon ? (
    <span className="grid size-[36px] place-items-center rounded-well bg-maroon-soft text-maroon">
      <m.Icon size={17} />
    </span>
  ) : (
    <span className="grid size-[36px] place-items-center rounded-well bg-maroon-soft text-maroon">
      <Tent size={17} />
    </span>
  )
  return (
    <div
      className={`flex h-[48px] items-center gap-2.5 rounded-thumb pl-1.5 shadow-raised ${
        m.peak ? 'bg-maroon text-white' : 'bg-white'
      }`}
    >
      <span className="shrink-0">{thumb}</span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-control font-semibold tracking-snug">{m.title}</span>
        <span className={`block truncate text-meta ${m.peak ? 'text-white/75' : 'text-ink-3'}`}>{m.meta}</span>
      </span>
      <button
        type="button"
        aria-pressed={on}
        aria-label={`${m.title}, ${clock(m.h)}, on my day`}
        onClick={onToggle}
        className="press grid size-[44px] shrink-0 place-items-center"
      >
        <span
          className={`grid size-[26px] place-items-center rounded-full ${
            on
              ? m.peak
                ? 'bg-gold text-gold-ink'
                : 'bg-maroon text-white'
              : m.peak
                ? 'bg-white/14 text-white ring-1 ring-white/30'
                : 'bg-white text-ink-2 ring-1 ring-hairline-strong'
          }`}
        >
          {on ? <Check size={14} strokeWidth={2.8} /> : <Plus size={15} strokeWidth={2.4} />}
        </span>
      </button>
    </div>
  )
}
