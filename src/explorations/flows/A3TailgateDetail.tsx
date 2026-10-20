import {
  Check,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Music,
  Plus,
  Share,
  Star,
  Trophy,
  Tv,
  Utensils,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Screen, ScrollBody } from '../../components/Device'
import { AggieMark } from '../../components/Marks'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton, SectionHeader } from '../../components/ui'

const FACTS = [
  { v: '10:00', l: 'opens · till 5:30' },
  { v: '8.4K', l: 'going' },
  { v: '14 min', l: 'walk from you' },
]

const FRIENDS: { i: string; name: string; where: string; c: 1 | 2 | 3 | 4 | 5 | 6 }[] = [
  { i: 'MR', name: 'Maya', where: 'Tent 14', c: 2 },
  { i: 'AL', name: 'Alex', where: 'From 10:30', c: 3 },
  { i: 'DS', name: 'Dev', where: 'Tent 14', c: 5 },
  { i: 'KT', name: 'Kendall', where: 'After noon', c: 4 },
]

const THERE = [
  { Icon: Tv, label: 'Big screens', sub: 'SEC noon games' },
  { Icon: Utensils, label: 'Food trucks', sub: '12 on site' },
  { Icon: Music, label: 'Live music', sub: 'Main stage, 1 PM' },
  { Icon: Trophy, label: 'Cornhole', sub: 'Bracket at 11:30' },
]

/** This event's place in the node tree, root first. Each level opens its own page. */
const LINEAGE = [
  { label: 'Texas A&M', kind: 'University', to: '/explore/home-day-plan' },
  { label: 'Athletics', kind: 'Department', to: '/explore/flow/C4' },
  { label: 'Kyle Field', kind: 'Venue', to: '/explore/kyle-field-sheet' },
]

/**
 * A3 · Event detail from the timeline. Tapping "Tailgate Zone — Lot C" on Your Saturday:
 * photo first, the node path it belongs to, the three facts that matter in 17 minutes,
 * who's already there, and Directions as the one gold action.
 */
export function A3TailgateDetail() {
  const [onPlan, setOnPlan] = useState(true)
  return (
    <Screen>
      <StatusBar />
      <ScrollBody>
        <div className="relative h-[300px] overflow-hidden bg-maroon text-white">
          <img src="/img/kyle-field-stands.jpg" alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_26%,rgba(80,0,0,0.6)_52%,var(--color-maroon)_86%)]" />
          <div className="absolute inset-x-4 top-[52px] flex justify-between">
            <IconButton label="Back to Your Saturday" to="/explore/flow/A2" surface="onPhoto">
              <ChevronLeft size={21} />
            </IconButton>
            <div className="flex gap-1">
              <IconButton label="Share Tailgate Zone" surface="onPhoto">
                <Share size={17} />
              </IconButton>
              <IconButton label="Save Tailgate Zone" surface="onPhoto">
                <Star size={17} />
              </IconButton>
            </div>
          </div>
          <div className="absolute inset-x-4 bottom-[42px]">
            {/* Node path: the event first, the nodes it lives under second */}
            <nav aria-label="Part of" className="flex items-center gap-1 text-meta font-medium text-white/80">
              <AggieMark size={18} className="!rounded-tag" />
              <span className="ml-1">Texas A&amp;M</span>
              <ChevronRight aria-hidden size={12} className="opacity-60" />
              <span>Athletics</span>
              <ChevronRight aria-hidden size={12} className="opacity-60" />
              <span>Kyle Field</span>
            </nav>
            <h1 className="mt-1.5 text-headline font-bold leading-[1.1] tracking-headline">Tailgate Zone — Lot C</h1>
            <div className="mt-2 flex items-center gap-2 text-small text-white/80">
              <Badge tone="soon">Opens in 17 min</Badge>
              Sat, Oct 12 · Lot C, east of Kyle Field
            </div>
          </div>
        </div>

        <section
          aria-label="At a glance"
          className="relative z-10 mx-4 -mt-[26px] rounded-sheet bg-white p-3 shadow-floating"
        >
          <dl className="grid grid-cols-3 divide-x divide-hairline">
            {FACTS.map((f) => (
              <div key={f.l} className="flex flex-col-reverse items-center">
                <dt className="text-meta text-ink-3">{f.l}</dt>
                <dd className="font-display text-display-sm font-bold leading-none tabular">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
            <Button className="w-full">
              <Footprints size={17} /> Directions
            </Button>
            <Button variant="secondary" aria-pressed={onPlan} onClick={() => setOnPlan((v) => !v)} className="px-3.5">
              {onPlan ? (
                <Check size={17} strokeWidth={2.6} className="text-ok" />
              ) : (
                <Plus size={17} strokeWidth={2.4} />
              )}
              On my Saturday
            </Button>
          </div>
        </section>

        <section aria-labelledby="tg-friends" className="mt-5">
          <SectionHeader title={<span id="tg-friends">11 friends going</span>} meta="4 there by 10:30" />
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4">
            {FRIENDS.map((f) => (
              <li key={f.name} className="flex w-[80px] shrink-0 flex-col items-center rounded-card bg-white py-2.5">
                <Avatar initials={f.i} color={f.c} size={40} />
                <span className="mt-1.5 text-control font-semibold">{f.name}</span>
                <span className="text-micro text-ink-3">{f.where}</span>
              </li>
            ))}
            <li className="flex w-[80px] shrink-0 flex-col items-center justify-center rounded-card bg-white py-2.5">
              <span className="grid size-[40px] place-items-center rounded-full bg-canvas text-control font-bold text-ink-2">
                +7
              </span>
              <span className="mt-1.5 text-control font-semibold">More</span>
              <span className="text-micro text-ink-3">this afternoon</span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="tg-there" className="mt-5">
          <SectionHeader title={<span id="tg-there">What's there</span>} meta="Lot C · all day" />
          <ul className="grid grid-cols-2 gap-2.5 px-4">
            {THERE.map((x) => (
              <li key={x.label} className="flex items-center gap-2.5 rounded-card bg-white p-3">
                <span className="grid size-[34px] shrink-0 place-items-center rounded-well bg-maroon-soft text-maroon">
                  <x.Icon size={17} />
                </span>
                <span className="min-w-0">
                  <span className="block text-control font-semibold">{x.label}</span>
                  <span className="block text-meta leading-tight text-ink-3">{x.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="tg-node" className="mt-5">
          <SectionHeader title={<span id="tg-node">Part of</span>} />
          <ol className="mx-4 overflow-hidden rounded-card bg-white">
            {LINEAGE.map((n, i) => (
              <li key={n.label} className="border-b border-hairline last:border-b-0">
                <Link to={n.to} className="flex h-[52px] items-center gap-3 px-3.5 active:bg-press">
                  <span aria-hidden className="flex w-[18px] justify-center" style={{ paddingLeft: i * 4 }}>
                    <span className={`rounded-full bg-maroon ${i === 0 ? 'size-[10px]' : 'size-[7px] opacity-70'}`} />
                  </span>
                  <span className="flex-1 text-body font-semibold">{n.label}</span>
                  <span className="text-meta text-ink-3">{n.kind}</span>
                  <ChevronRight aria-hidden size={16} className="text-ink-3" />
                </Link>
              </li>
            ))}
          </ol>
        </section>
      </ScrollBody>
      <TabBar active="home" />
    </Screen>
  )
}
