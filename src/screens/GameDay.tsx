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
import { GoldButton, IconButton, LiveDot, LivePill, SectionHeader } from '../components/ui'

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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,13,15,0.65)_0%,rgba(58,0,0,0.55)_45%,#0e0d0f_100%)]" />

          <div className="relative flex h-[44px] items-center justify-between px-4">
            <IconButton label="Back" to="/places/kyle-field" surface="onPhoto">
              <ChevronLeft size={20} />
            </IconButton>
            <h1 className="text-[17px] font-semibold">Texas A&amp;M Football</h1>
            <IconButton label="More" surface="onPhoto">
              <MoreHorizontal size={18} />
            </IconButton>
          </div>

          <div className="relative mt-2 px-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-[30px] font-extrabold italic leading-none tracking-[0.5px] text-gold">
                GAMEDAY
              </span>
              <LivePill tone="dark" label="ESPN" />
            </div>

            {/* Score for assistive tech, announced politely as it changes; the visual block below is hidden from it. */}
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Texas A&amp;M 17, LSU 10. Second quarter, 8:42 left. Texas A&amp;M has the ball, first and 10 at their own
              32.
            </p>
            <div aria-hidden className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AggieMark size={44} className="max-[380px]:hidden" />
                <div>
                  <div className="settle font-display text-[clamp(60px,19vw,78px)] font-bold leading-[0.8] tracking-[-1px] tabular">
                    17
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-white/70">
                    A&amp;M <span className="size-[6px] rounded-full bg-gold" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-[12px] font-bold tracking-[1px] text-white/60">2ND QTR</div>
                <div className="font-display text-[30px] font-bold leading-none tabular">8:42</div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="settle font-display text-[clamp(60px,19vw,78px)] font-bold leading-[0.8] tracking-[-1px] text-white/60 tabular [animation-delay:120ms]">
                    10
                  </div>
                  <div className="mt-1 text-[12px] font-semibold text-white/65">LSU</div>
                </div>
                <LsuMark size={44} className="max-[380px]:hidden" />
              </div>
            </div>

            {/* Drive tracker */}
            <div className="mt-4">
              <div className="flex justify-between text-[11.5px] text-white/60">
                <span>
                  <b className="font-semibold text-white">1st &amp; 10</b> at A&amp;M 32
                </span>
                <span>Drive: 3 plays · 18 yds</span>
              </div>
              <div
                aria-hidden
                className="relative mt-1.5 h-[22px] overflow-hidden rounded-[6px] bg-[#1f4a2a] ring-1 ring-white/10"
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
                  className="absolute inset-y-[3px] rounded-[3px] bg-gold/35"
                  style={{ left: `${7 + 86 * (BALL - 0.18)}%`, width: `${86 * 0.18}%` }}
                />
                <span className="absolute inset-y-0 w-[2px] bg-gold" style={{ left: `${7 + 86 * BALL}%` }} />
                <span
                  className="absolute inset-y-0 w-[2px] bg-[#ffe680]/80"
                  style={{ left: `${7 + 86 * (BALL + 0.1)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* You're inside the venue: the app knows it */}
        <div className="mx-4 rounded-[18px] bg-night-2 p-3.5 text-white ring-1 ring-white/8">
          <div className="flex items-center gap-3">
            <div className="grid size-[44px] place-items-center rounded-[12px] bg-maroon">
              <Ticket size={21} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold tracking-[0.7px] text-gold">YOU'RE AT KYLE FIELD</div>
              <div className="text-[16px] font-semibold tracking-[-0.2px]">Sec 125 · Row 22 · Seat 14</div>
              <div className="text-[12px] text-white/55">Nearest restroom 40 ft · Stand 124 open</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <GoldButton className="w-full">Order to Seat 125</GoldButton>
            <button type="button" className="h-[44px] rounded-[13px] bg-white/10 px-4 text-[15px] font-semibold">
              Tickets / Access
            </button>
          </div>
        </div>

        <div className="stagger mx-4 mt-3 grid grid-cols-4 gap-2">
          {TOOLS.map((t) => (
            <button
              type="button"
              key={t.label}
              className="press flex flex-col items-center rounded-[14px] bg-night-2 px-1 pb-2 pt-2.5 text-white ring-1 ring-white/6"
            >
              <span className="grid size-[34px] place-items-center rounded-[10px] bg-white/8 text-white">
                <t.Icon size={19} />
              </span>
              <span className="mt-1.5 text-[11.5px] font-semibold">{t.label}</span>
              <span
                className={`mt-[2px] flex items-center gap-1 whitespace-nowrap text-[11px] ${
                  t.live ? 'font-semibold text-[#ff7b76]' : t.ok ? 'text-[#4ade80]' : 'text-white/60'
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
          <div className="mx-4 divide-y divide-white/8 overflow-hidden rounded-[18px] bg-night-2 text-white ring-1 ring-white/6">
            <div className="flex gap-3 p-3">
              <span className="mt-0.5 w-[34px] shrink-0 text-[12px] font-semibold tabular text-gold">8:42</span>
              <div>
                <div className="text-[14px] font-semibold">12 yd pass to #1 · First down</div>
                <div className="text-[12px] text-white/60">1st &amp; 10 at A&amp;M 32 · 2nd Qtr</div>
              </div>
            </div>
            <div className="flex gap-3 p-3">
              <AggieMark size={34} />
              <div className="min-w-0">
                <div className="text-[14px] font-semibold">
                  Aggie Football <span className="font-normal text-white/60">· 2m</span>
                </div>
                <div className="text-[13px] text-white/75">
                  102,000 strong and still filling up. 12th Man, stand up. Gig 'Em!
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-[11px] font-bold tracking-[0.7px] text-gold">FAN POLL · 1,234 VOTES</div>
              <div className="mt-1 text-[14px] font-semibold">Which unit makes the biggest impact today?</div>
              {[
                ['Offense', 48],
                ['Defense', 32],
                ['Special Teams', 12],
              ].map(([l, v]) => (
                <div key={l} className="relative mt-1.5 h-[30px] overflow-hidden rounded-[9px] bg-white/6 text-[13px]">
                  <div
                    className={`absolute inset-y-0 left-0 ${l === 'Offense' ? 'bg-gold/90' : 'bg-white/12'}`}
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
      <TabBar active="home" />
    </Screen>
  )
}
