import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { Screen, ScrollBody } from '../../components/Device'
import { StatusBar } from '../../components/StatusBar'
import { TabBar } from '../../components/TabBar'
import { IconButton } from '../../components/ui'
import { NODE_META, type Node } from '../../data/events'

const INTERESTS = ['Athletics', 'Traditions', 'Food', 'Music', 'Academic', 'Greek life'] as const
type Interest = (typeof INTERESTS)[number]

const NODES: { node: Node; label: string }[] = [
  { node: 'tamu', label: 'A&M' },
  { node: 'cstat', label: 'College Station' },
  { node: 'bryan', label: 'Bryan' },
]

/** Every sheet on the floor today, Saturday, Oct 12. `walk` is minutes from Kyle Field. */
const TODAY: { title: string; tag: Interest; node: Node; walk: number }[] = [
  { title: 'A&M vs LSU', tag: 'Athletics', node: 'tamu', walk: 14 },
  { title: 'Tailgate Zone, Lot C', tag: 'Athletics', node: 'tamu', walk: 12 },
  { title: '12th Man Brunch', tag: 'Traditions', node: 'tamu', walk: 9 },
  { title: 'Corps March-In', tag: 'Traditions', node: 'tamu', walk: 8 },
  { title: 'Reveille meet and greet', tag: 'Traditions', node: 'tamu', walk: 11 },
  { title: 'Farmers Market', tag: 'Food', node: 'cstat', walk: 18 },
  { title: 'Gameday breakfast at Sbisa', tag: 'Food', node: 'tamu', walk: 5 },
  { title: 'Club Rugby vs Baylor', tag: 'Athletics', node: 'tamu', walk: 26 },
  { title: 'Downtown Bryan 5K', tag: 'Athletics', node: 'bryan', walk: 35 },
  { title: 'Bonfire Memorial walk', tag: 'Traditions', node: 'tamu', walk: 24 },
  { title: 'Downtown Bryan Market', tag: 'Food', node: 'bryan', walk: 32 },
  { title: 'Messina Hof harvest tasting', tag: 'Food', node: 'bryan', walk: 40 },
  { title: 'Taco truck row, Northgate', tag: 'Food', node: 'cstat', walk: 22 },
  { title: 'Aggie Wranglers showcase', tag: 'Music', node: 'tamu', walk: 7 },
  { title: 'Jazz on the Rudder plaza', tag: 'Music', node: 'tamu', walk: 10 },
  { title: 'Northgate live: country night', tag: 'Music', node: 'cstat', walk: 12 },
  { title: 'Lake Walk sunset concert', tag: 'Music', node: 'bryan', walk: 38 },
  { title: 'Singing Cadets warm-up', tag: 'Music', node: 'tamu', walk: 15 },
  { title: 'MSC Open House', tag: 'Academic', node: 'tamu', walk: 6 },
  { title: 'Evans Library study hall', tag: 'Academic', node: 'tamu', walk: 8 },
  { title: 'Cushing Library exhibit', tag: 'Academic', node: 'tamu', walk: 9 },
  { title: 'Zachry engineering open lab', tag: 'Academic', node: 'tamu', walk: 10 },
  { title: 'Bryan library book sale', tag: 'Academic', node: 'bryan', walk: 30 },
  { title: 'Panhellenic gameday brunch', tag: 'Greek life', node: 'tamu', walk: 9 },
  { title: 'Delta Gamma tailgate', tag: 'Greek life', node: 'cstat', walk: 15 },
  { title: 'Sigma Chi Derby Days', tag: 'Greek life', node: 'cstat', walk: 17 },
  { title: 'Phi Delt car wash', tag: 'Greek life', node: 'cstat', walk: 20 },
  { title: 'Kappa pancake breakfast', tag: 'Greek life', node: 'cstat', walk: 16 },
  { title: 'Wolf Pen Creek yoga', tag: 'Athletics', node: 'cstat', walk: 21 },
  { title: 'Rec Center climbing comp', tag: 'Athletics', node: 'tamu', walk: 23 },
  { title: 'Century Tree picnic', tag: 'Traditions', node: 'tamu', walk: 25 },
]

const WALKS = [5, 10, 15, 20, 30] as const

/**
 * F4 · Shape your straw. What the straw is made of: the interests it reaches for, the nodes it
 * can pass through and how far you'll walk. The preview at the top answers what that buys you today.
 */
export function F4ShapeStraw() {
  const [tags, setTags] = useState<Set<Interest>>(new Set(['Athletics', 'Traditions', 'Food']))
  const [nodes, setNodes] = useState<Record<Node, boolean>>({ tamu: true, cstat: true, bryan: false })
  const [walk, setWalk] = useState(3) // index into WALKS: 20 min
  const reach = WALKS[walk]
  const pierced = TODAY.map((s) => tags.has(s.tag) && nodes[s.node] && s.walk <= reach)
  const n = pierced.filter(Boolean).length
  const names = TODAY.filter((_, i) => pierced[i]).map((s) => s.title)

  const toggleTag = (t: Interest) =>
    setTags((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })

  return (
    <Screen>
      <StatusBar />
      <ScrollBody className="pb-[180px]">
        <header className="bg-maroon px-4 pb-4 pt-[54px] text-white">
          <div className="flex h-[44px] items-center gap-2">
            <IconButton label="Back to Home" to="/explore/home-straw">
              <ChevronLeft size={20} />
            </IconButton>
            <h1 className="text-title font-bold tracking-title">Shape your straw</h1>
          </div>

          {/* Live preview: the day's 31 sheets, the pierced ones in gold */}
          <div className="mt-3 rounded-card bg-white/[0.08] p-3.5 ring-1 ring-white/14">
            <p className="text-emphasis font-semibold" aria-live="polite">
              Your straw pierces <span className="text-gold tabular">{n}</span> of {TODAY.length} sheets today
            </p>
            <div aria-hidden className="mt-2.5 flex h-[34px] items-end gap-[3px]">
              {pierced.map((hit, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-full transition-[height,background-color] duration-(--duration-quick) ${
                    hit ? 'h-full bg-gold' : 'h-[55%] bg-white/20'
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-meta leading-snug text-white/75">
              {names.length
                ? names.slice(0, 4).join(', ') + (names.length > 4 ? ` + ${names.length - 4} more` : '')
                : 'Nothing yet. Add an interest or a node.'}
            </p>
          </div>
        </header>

        <section aria-labelledby="interests" className="px-4 pt-4">
          <h2 id="interests" className="text-body font-semibold">
            What it reaches for
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {INTERESTS.map((t) => (
              <Chip key={t} appearance="soft" selected={tags.has(t)} onClick={() => toggleTag(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </section>

        <section aria-labelledby="nodes" className="px-4 pt-5">
          <h2 id="nodes" className="text-body font-semibold">
            Where it can go
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {NODES.map(({ node, label }) => (
              <Chip
                key={node}
                appearance="soft"
                selected={nodes[node]}
                onClick={() => setNodes((o) => ({ ...o, [node]: !o[node] }))}
                leading={<span className={`ml-1.5 size-[8px] rounded-full ${NODE_META[node].dot}`} />}
              >
                {label}
              </Chip>
            ))}
          </div>
        </section>

        <section aria-labelledby="walk" className="mx-4 mt-5 rounded-card bg-white px-3.5 pb-2 pt-3 shadow-raised">
          <div className="flex items-baseline justify-between">
            <h2 id="walk" className="text-body font-semibold">
              <label htmlFor="walk-range">How far you&rsquo;ll walk</label>
            </h2>
            <span className="text-small font-semibold text-maroon tabular">Up to {reach} min</span>
          </div>
          <input
            id="walk-range"
            type="range"
            min={0}
            max={WALKS.length - 1}
            step={1}
            value={walk}
            onChange={(e) => setWalk(Number(e.target.value))}
            aria-valuetext={`Up to ${reach} minutes`}
            className="mt-2 h-[28px] w-full accent-maroon"
          />
          <div aria-hidden className="flex justify-between text-meta text-ink-3 tabular">
            {WALKS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </section>
      </ScrollBody>

      <div className="absolute inset-x-0 bottom-[84px] z-20 border-t border-hairline bg-canvas/95 px-4 pb-3 pt-3 backdrop-blur-xl">
        <Button size="lg" className="w-full">
          Save my straw
        </Button>
      </div>
      <TabBar active="home" />
    </Screen>
  )
}
