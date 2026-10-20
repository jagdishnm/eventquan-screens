import {
  BarChart3,
  Bus,
  ChevronLeft,
  CircleParking,
  Info,
  Map as MapIcon,
  MoreHorizontal,
  Shirt,
  Ticket,
  Utensils,
  Video,
} from 'lucide-react'
import { Screen, ScrollBody } from '../components/Device'
import { AggieMark, LsuMark } from '../components/Marks'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { Badge, LiveDot } from '../components/Badge'
import { Button } from '../components/Button'
import { IconButton, SectionHeader } from '../components/ui'

const TOOLS = [
  { label: 'Game Info', Icon: Info, s: 'Q2 · 8:42' },
  { label: 'Stadium Map', Icon: MapIcon, s: 'Sec 125' },
  { label: 'Live Stats', Icon: BarChart3, s: '284 yds' },
  { label: 'Fan Cam', Icon: Video, s: '3 live', live: true },
  { label: 'Parking', Icon: CircleParking, s: 'West Campus' },
  { label: 'Shuttles', Icon: Bus, s: 'Rt 40 · 8 min' },
  { label: 'Concessions', Icon: Utensils, s: '4 min wait', ok: true },
  { label: 'Merch', Icon: Shirt, s: 'Gate 2 shop' },
]

/** Ball position as a fraction of the field, left = A&M goal line. */
const BALL = 32 / 100

export function GameDay() {
  return (
    <Screen bg="bg-night">
      <StatusBar />
      <ScrollBody>
        {/* Live scoreboard over the stadium */}
        <div className="relative overflow-hidden pb-5 pt-[54px] text-white">
          <img src="/img/kyle-field-crowd.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,15,0.65)_0%,rgba(58,0,0,0.55)_45%,var(--color-night)_100%)]" />

          <div className="relative flex h-[44px] items-center justify-between px-4">
            <IconButton label="Back" to="/places/kyle-field" surface="onPhoto">
              <ChevronLeft size={20} />
            </IconButton>
            <h1 className="text-emphasis font-semibold">Texas A&amp;M Football</h1>
            <IconButton label="More" surface="onPhoto">
              <MoreHorizontal size={18} />
            </IconButton>
          </div>

          <div className="relative mt-2 px-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-display-md font-extrabold italic leading-none tracking-eyebrow text-gold">
                GAMEDAY
              </span>
              <Badge tone="live" surface="dark">
                ESPN
              </Badge>
            </div>

            {/* Score for assistive tech, announced politely as it changes; the visual block below is hidden from it. */}
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Texas A&amp;M 17, LSU 10. Second quarter, 8:42 left. Texas A&amp;M has the ball, first and 10 at their own
              32.
            </p>
            <div aria-hidden className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AggieMark team size={44} className="max-[380px]:hidden" />
                <div>
                  <div className="settle font-display text-[clamp(60px,19vw,78px)] font-bold leading-[0.8] tracking-[-1px] tabular">
                    17
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-meta font-semibold text-white/75">
                    A&amp;M <span className="size-[6px] rounded-full bg-gold" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-meta font-bold tracking-caps text-white/60">2ND QTR</div>
                <div className="font-display text-display-md font-bold leading-none tabular">8:42</div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="settle font-display text-[clamp(60px,19vw,78px)] font-bold leading-[0.8] tracking-[-1px] text-white/60 tabular [animation-delay:120ms]">
                    10
                  </div>
                  <div className="mt-1 text-meta font-semibold text-white/75">LSU</div>
                </div>
                <LsuMark size={44} className="max-[380px]:hidden" />
              </div>
            </div>

            {/* Drive tracker */}
            <div className="mt-4">
              <div className="flex justify-between text-micro text-white/60">
                <span>
                  <b className="font-semibold text-white">1st &amp; 10</b> at A&amp;M 32
                </span>
                <span>Drive: 3 plays · 18 yds</span>
              </div>
              <div
                aria-hidden
                className="relative mt-1.5 h-[22px] overflow-hidden rounded-tag bg-field ring-1 ring-white/14"
              >
                <div className="absolute inset-y-0 left-0 w-[7%] bg-maroon" />
                <div className="absolute inset-y-0 right-0 w-[7%] bg-lsu" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className="absolute inset-y-0 w-px bg-white/25"
                    style={{ left: `${7 + (i + 1) * 8.6}%` }}
                  />
                ))}
                <span
                  className="absolute inset-y-[3px] rounded-tag bg-gold/35"
                  style={{ left: `${7 + 86 * (BALL - 0.18)}%`, width: `${86 * 0.18}%` }}
                />
                <span className="absolute inset-y-0 w-[2px] bg-gold" style={{ left: `${7 + 86 * BALL}%` }} />
                <span className="absolute inset-y-0 w-[2px] bg-gold/70" style={{ left: `${7 + 86 * (BALL + 0.1)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* You're inside the venue: the app knows it */}
        <div className="mx-4 rounded-card bg-night-2 p-3.5 text-white ring-1 ring-white/8">
          <div className="flex items-center gap-3">
            <div className="grid size-[44px] place-items-center rounded-well bg-maroon">
              <Ticket size={21} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-micro font-bold tracking-eyebrow text-gold">YOU'RE AT KYLE FIELD</div>
              <div className="text-card font-semibold tracking-snug">Sec 125 · Row 22 · Seat 14</div>
              <div className="text-meta text-white/60">Nearest restroom 40 ft · Stand 124 open</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <Button className="w-full">Order to Seat 125</Button>
            <Button variant="tonal" className="px-4">
              Tickets / Access
            </Button>
          </div>
        </div>

        <div className="stagger mx-4 mt-3 grid grid-cols-4 gap-2">
          {TOOLS.map((t) => (
            <button
              type="button"
              key={t.label}
              className="press flex flex-col items-center rounded-thumb bg-night-2 px-1 pb-2 pt-2.5 text-white ring-1 ring-white/8"
            >
              <span className="grid size-[34px] place-items-center rounded-well bg-white/8 text-white">
                <t.Icon size={19} />
              </span>
              <span className="mt-1.5 text-micro font-semibold">{t.label}</span>
              <span
                className={`mt-[2px] flex items-center gap-1 whitespace-nowrap text-micro ${
                  t.live ? 'font-semibold text-error-on-dark' : t.ok ? 'text-success-on-dark' : 'text-white/60'
                }`}
              >
                {t.live ? <LiveDot className="!size-[4px]" /> : null}
                {t.s}
              </span>
            </button>
          ))}
        </div>

        <section className="mt-5">
          <SectionHeader title="Live Updates" action="See All" dark />
          <div className="mx-4 divide-y divide-white/8 overflow-hidden rounded-card bg-night-2 text-white ring-1 ring-white/8">
            <div className="flex gap-3 p-3">
              <span className="mt-0.5 w-[34px] shrink-0 text-meta font-semibold tabular text-gold">8:42</span>
              <div>
                <div className="text-control font-semibold">12 yd pass to #1 · First down</div>
                <div className="text-meta text-white/60">1st &amp; 10 at A&amp;M 32 · 2nd Qtr</div>
              </div>
            </div>
            <div className="flex gap-3 p-3">
              <AggieMark team size={34} />
              <div className="min-w-0">
                <div className="text-control font-semibold">
                  Aggie Football <span className="font-normal text-white/60">· 2m</span>
                </div>
                <div className="text-small text-white/75">
                  102,000 strong and still filling up. 12th Man, stand up. Gig 'Em!
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-micro font-bold tracking-eyebrow text-gold">FAN POLL · 1,234 VOTES</div>
              <div className="mt-1 text-control font-semibold">Which unit makes the biggest impact today?</div>
              {[
                ['Offense', 48],
                ['Defense', 32],
                ['Special Teams', 12],
              ].map(([l, v]) => (
                <div key={l} className="relative mt-1.5 h-[30px] overflow-hidden rounded-well bg-white/8 text-small">
                  <div
                    className={`absolute inset-y-0 left-0 ${l === 'Offense' ? 'bg-gold/90' : 'bg-white/14'}`}
                    style={{ width: `${v}%` }}
                  />
                  <div
                    className={`relative flex h-full items-center justify-between px-2.5 ${l === 'Offense' ? 'font-semibold' : ''}`}
                  >
                    <span className={l === 'Offense' ? 'text-gold-ink' : ''}>{l}</span>
                    <span className="tabular">{v}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollBody>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}
