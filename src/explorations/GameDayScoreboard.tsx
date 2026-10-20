import {
  BarChart3,
  Bus,
  ChevronLeft,
  CircleParking,
  Info,
  Map as MapIcon,
  Share,
  Shirt,
  Utensils,
  Video,
} from 'lucide-react'
import { Faces } from '../components/Avatar'
import { Badge, LiveDot } from '../components/Badge'
import { Button } from '../components/Button'
import { Screen, ScrollBody } from '../components/Device'
import { AggieMark, LsuMark } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'

const TABS = ['Overview', 'Plays', 'Box score', 'Your crew'] as const

const LINE = [
  { team: 'A&M', Mark: AggieMark, q: [7, 10, null, null], t: 17 },
  { team: 'LSU', Mark: LsuMark, q: [3, 7, null, null], t: 10 },
]

/** His eight game day tools, in his order, icons first. */
const TOOLS = [
  { label: 'Game Info', Icon: Info },
  { label: 'Stadium Map', Icon: MapIcon },
  { label: 'Live Stats', Icon: BarChart3 },
  { label: 'Fan Cam', Icon: Video, live: true },
  { label: 'Parking', Icon: CircleParking },
  { label: 'Shuttles', Icon: Bus },
  { label: 'Concessions', Icon: Utensils },
  { label: 'Merch', Icon: Shirt },
]

/**
 * Exploration · Game day, scoreboard first.
 * After Apple Sports and MLS: team colours meet across the header, the score is the hero and the
 * detail lives in tabs. His GAMEDAY banner and eight tools stay; EventQuan adds where your crew is.
 */
export function GameDayScoreboard() {
  return (
    <Screen bg="bg-night">
      <StatusBar />
      <ScrollBody>
        <header className="relative overflow-hidden pb-3 pt-[54px] text-white">
          <div className="absolute inset-0 bg-linear-110 from-maroon from-35% to-lsu to-90%" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-night" />

          <div className="relative flex h-[44px] items-center justify-between px-4">
            <IconButton label="Back" surface="onPhoto" to="/">
              <ChevronLeft size={20} />
            </IconButton>
            <span className="font-display text-display-md font-extrabold italic leading-none tracking-eyebrow text-gold">
              GAMEDAY
            </span>
            <IconButton label="Share" surface="onPhoto">
              <Share size={17} />
            </IconButton>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            Texas A&amp;M 17, LSU 10. Second quarter, 8:42 left. Texas A&amp;M ball, first and 10 at their own 32.
          </p>
          <div aria-hidden className="relative mt-2 grid grid-cols-[1fr_auto_1fr] items-center px-4">
            <div className="flex flex-col items-center gap-1">
              <AggieMark size={48} />
              <span className="text-control font-semibold">Texas A&amp;M</span>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-3 font-display text-[clamp(56px,17vw,68px)] font-bold leading-[0.85] tabular">
                <span>17</span>
                <span className="text-display-sm text-white/40">–</span>
                <span className="text-white/60">10</span>
              </div>
              <div className="mt-1.5 flex justify-center">
                <Badge tone="live" surface="dark">
                  Q2 · 8:42
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <LsuMark size={48} />
              <span className="text-control font-semibold">LSU</span>
            </div>
          </div>
          <p aria-hidden className="relative mt-2 text-center text-meta text-white/75">
            Today 6:00 PM · Kyle Field ·{' '}
            <span className="mr-1 inline-block size-[6px] rounded-full bg-white align-middle" />
            A&amp;M ball, 1st &amp; 10
          </p>
        </header>

        <nav aria-label="Game sections" className="sticky top-0 z-10 border-b border-white/8 bg-night px-2">
          <ul className="flex">
            {TABS.map((t, i) => (
              <li key={t} className="flex-1">
                <button
                  type="button"
                  aria-pressed={i === 0}
                  className={`relative h-[44px] w-full text-control font-semibold ${i === 0 ? 'text-white' : 'text-white/60'}`}
                >
                  {t}
                  {i === 0 ? <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-white" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-4 mt-3 overflow-hidden rounded-card bg-night-2 text-white ring-1 ring-white/8">
          <table className="w-full text-control tabular">
            <caption className="sr-only">Score by quarter</caption>
            <thead>
              <tr className="text-micro font-bold tracking-eyebrow text-white/60">
                <th scope="col" className="py-2 pl-3.5 text-left font-bold">
                  TEAM
                </th>
                {['1', '2', '3', '4'].map((q) => (
                  <th key={q} scope="col" className="w-[38px] font-bold">
                    {q}
                  </th>
                ))}
                <th scope="col" className="w-[52px] pr-3.5 text-right font-bold">
                  T
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {LINE.map(({ team, Mark, q, t }) => (
                <tr key={team}>
                  <th scope="row" className="py-2 pl-3.5 text-left">
                    <span className="flex items-center gap-2 font-semibold">
                      <Mark size={22} />
                      {team}
                    </span>
                  </th>
                  {q.map((v, k) => (
                    <td key={k} className={`text-center ${v === null ? 'text-white/25' : 'text-white/75'}`}>
                      {v ?? '–'}
                    </td>
                  ))}
                  <td className="pr-3.5 text-right font-display text-title font-bold">{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-white/8 px-3.5 py-2.5">
            <div className="flex justify-between text-micro font-bold tracking-eyebrow">
              <span className="text-white">A&amp;M 68%</span>
              <span className="text-white/60">WIN PROBABILITY</span>
              <span className="text-white/75">32% LSU</span>
            </div>
            <div aria-hidden className="mt-1.5 flex h-[8px] gap-[3px] overflow-hidden rounded-full">
              <span className="w-[68%] rounded-full bg-white/85" />
              <span className="flex-1 rounded-full bg-lsu" />
            </div>
          </div>
        </div>

        <div className="mx-4 mt-3 grid grid-cols-4 gap-2">
          {TOOLS.map((t) => (
            <button
              type="button"
              key={t.label}
              className="press flex flex-col items-center rounded-thumb bg-night-2 px-1 pb-2 pt-2.5 text-white ring-1 ring-white/8"
            >
              <span className="relative grid size-[32px] place-items-center rounded-well bg-white/8">
                <t.Icon size={18} />
                {t.live ? <LiveDot className="absolute -right-0.5 -top-0.5 !size-[8px] ring-2 ring-night-2" /> : null}
              </span>
              <span className="mt-1.5 text-micro font-semibold">{t.label}</span>
            </button>
          ))}
        </div>

        {/* EventQuan's addition: your people, in the stadium */}
        <div className="mx-4 mt-3 flex items-center gap-3 rounded-card bg-night-2 px-3.5 py-2.5 text-white ring-1 ring-white/8">
          <Faces n={3} size={26} surface="photo" />
          <div className="min-w-0 flex-1">
            <div className="text-control font-semibold">Maya + Alex, Sec 125</div>
            <div className="text-meta text-white/60">6 of your crew are here</div>
          </div>
          <Button variant="tonal" size="sm">
            Meet up
          </Button>
        </div>

        <div className="mx-4 mt-3">
          <Button className="w-full">Order to Seat 125 · 4 min</Button>
        </div>
      </ScrollBody>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}
