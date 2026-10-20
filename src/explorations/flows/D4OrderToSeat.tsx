import {
  Beef,
  ChevronLeft,
  Croissant,
  CupSoda,
  GlassWater,
  Hamburger,
  IceCreamCone,
  Minus,
  Plus,
  Timer,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { Screen, ScrollBody } from '../../components/Device'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'

type Item = {
  id: string
  name: string
  note: string
  price: number
  Icon: typeof Beef
  group: 'Food' | 'Drinks' | 'Sweets'
}

/** Stand 124, the closest to Sec 125. Prices in dollars. */
const MENU: Item[] = [
  {
    id: 'nachos',
    name: 'Brisket Nachos',
    note: 'Brisket + queso',
    price: 10,
    Icon: Beef,
    group: 'Food',
  },
  { id: 'wb', name: 'Whataburger', note: 'Double meat, with fries', price: 9.5, Icon: Hamburger, group: 'Food' },
  { id: 'kolache', name: 'Sausage Kolaches', note: 'Two, Texas Czech style', price: 6, Icon: Croissant, group: 'Food' },
  { id: 'drpepper', name: 'Dr Pepper', note: '24 oz souvenir cup', price: 4.5, Icon: CupSoda, group: 'Drinks' },
  { id: 'water', name: 'Bottled water', note: '20 oz', price: 4, Icon: GlassWater, group: 'Drinks' },
  {
    id: 'bluebell',
    name: 'Blue Bell Homemade Vanilla',
    note: 'Cup, with a wooden spoon',
    price: 5.5,
    Icon: IceCreamCone,
    group: 'Sweets',
  },
]

const usd = (n: number) => `$${n.toFixed(2)}`

/**
 * D4 · Order to seat. From the gold button on the scoreboard: Stand 124's menu, priced, with a
 * running cart and a delivery time. Still dark, still game mode, so the score stays in view.
 */
export function D4OrderToSeat() {
  const [group, setGroup] = useState<'Popular' | Item['group']>('Popular')
  const [qty, setQty] = useState<Record<string, number>>({ nachos: 1, drpepper: 1 })
  const set = (id: string, d: number) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + d) }))
  const lines = MENU.filter((m) => qty[m.id])
  const count = lines.reduce((n, m) => n + qty[m.id], 0)
  const total = lines.reduce((n, m) => n + m.price * qty[m.id], 0)
  const shown = group === 'Popular' ? MENU : MENU.filter((m) => m.group === group)

  return (
    <Screen bg="bg-night">
      <StatusBar />
      <ScrollBody className="pb-[230px]">
        <header className="relative overflow-hidden pb-4 pt-[54px] text-white">
          <div className="absolute inset-0 bg-linear-110 from-maroon from-35% to-lsu to-90%" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-30% to-night" />
          <div className="relative flex h-[44px] items-center gap-2 px-4">
            <IconButton label="Back to the game" surface="onPhoto" to="/explore/gameday-scoreboard">
              <ChevronLeft size={20} />
            </IconButton>
            <h1 className="flex-1 text-emphasis font-semibold">Order to seat</h1>
            <p className="flex items-center gap-2 text-control font-semibold tabular" aria-live="polite">
              <span className="sr-only">Texas A&amp;M 17, LSU 10, second quarter, 8:42 left.</span>
              <span aria-hidden>A&amp;M 17 · LSU 10</span>
              <Badge tone="live" surface="dark" size="sm">
                <span aria-hidden>Q2</span>
              </Badge>
            </p>
          </div>

          {/* Where it's going and how long */}
          <div className="relative mx-4 mt-3 flex items-center gap-3 rounded-card bg-night/60 p-3 ring-1 ring-white/14 backdrop-blur-md">
            <span className="grid size-[44px] shrink-0 place-items-center rounded-thumb bg-gold text-gold-ink">
              <Timer size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-body font-semibold">To Sec 125 · Row 22 · Seat 14</div>
              <div className="text-meta text-white/75">From Stand 124, one section over · about 4 min</div>
            </div>
          </div>
        </header>

        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4">
          {(['Popular', 'Food', 'Drinks', 'Sweets'] as const).map((g) => (
            <Chip key={g} surface="onMaroon" selected={group === g} onClick={() => setGroup(g)}>
              {g}
            </Chip>
          ))}
        </div>

        <section aria-labelledby="menu-title" className="mx-4 mt-3">
          <h2
            id="menu-title"
            className="mb-1.5 flex justify-between text-micro font-bold tracking-eyebrow text-white/60"
          >
            <span>STAND 124 · LOWER EAST</span>
            <span>OPEN TILL END OF Q3</span>
          </h2>
          <ul className="divide-y divide-white/8 overflow-hidden rounded-card bg-night-2 text-white ring-1 ring-white/8">
            {shown.map((m) => {
              const n = qty[m.id] ?? 0
              return (
                <li key={m.id} className="flex items-center gap-3 py-2.5 pl-2.5 pr-3">
                  <span
                    className={`grid size-[48px] shrink-0 place-items-center rounded-thumb ${n ? 'bg-gold/15 text-gold' : 'bg-white/8 text-white/85'}`}
                  >
                    <m.Icon size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-body font-semibold tracking-snug">{m.name}</div>
                    <div className="text-meta text-white/60">
                      <span className="font-semibold text-white/85 tabular">{usd(m.price)}</span> · {m.note}
                    </div>
                  </div>
                  {n ? (
                    <div className="flex items-center gap-2.5 rounded-full bg-white/8 p-1">
                      <button
                        type="button"
                        aria-label={`Remove one ${m.name}`}
                        onClick={() => set(m.id, -1)}
                        className="relative grid size-[26px] place-items-center rounded-full bg-white/14 after:absolute after:-inset-[9px] after:content-['']"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-[10px] text-center text-control font-bold tabular">{n}</span>
                      <button
                        type="button"
                        aria-label={`Add another ${m.name}`}
                        onClick={() => set(m.id, 1)}
                        className="relative grid size-[26px] place-items-center rounded-full bg-gold text-gold-ink after:absolute after:-inset-[9px] after:content-['']"
                      >
                        <Plus size={14} strokeWidth={2.6} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      aria-label={`Add ${m.name}, ${usd(m.price)}`}
                      onClick={() => set(m.id, 1)}
                      className="press relative grid size-[34px] place-items-center rounded-full bg-white/14 after:absolute after:-inset-[5px] after:content-['']"
                    >
                      <Plus size={17} />
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      </ScrollBody>

      {/* The cart, docked above the tab bar */}
      <div className="absolute inset-x-0 bottom-[84px] z-20 border-t border-white/8 bg-night/95 px-4 pb-3 pt-2.5 text-white backdrop-blur-xl">
        <div className="flex items-baseline justify-between text-small" aria-live="polite">
          <span className="min-w-0 truncate text-white/75">
            {count ? lines.map((m) => `${qty[m.id]} ${m.name}`).join(' · ') : 'Your cart is empty'}
          </span>
          <span className="ml-3 shrink-0 text-white/60">Pay with Aggie Bucks</span>
        </div>
        <Button size="lg" className="tabular mt-2 w-full" disabled={!count}>
          {`Order to Seat 125 · ${usd(total)}`}
        </Button>
      </div>
      <TabBar active="home" surface="dark" />
    </Screen>
  )
}
