import { MessageCircle, Navigation } from 'lucide-react'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { GameDayScoreboard } from '../GameDayScoreboard'

type Friend = {
  initials: string
  name: string
  color: 1 | 2 | 3 | 4 | 5 | 6
  where: string
  note: string
  /** Map position in the 361×180 viewBox; off the map when absent. */
  at?: [number, number]
}

/** You first, then the crew by distance. */
const CREW: Friend[] = [
  { initials: 'MR', name: 'Maya', color: 2, where: 'Sec 125', note: 'Row 22', at: [266, 158] },
  { initials: 'AL', name: 'Alex', color: 3, where: 'Sec 125', note: 'Row 19', at: [210, 156] },
  { initials: 'BN', name: 'Brooke', color: 6, where: 'Sec 128', note: 'Row 8', at: [296, 136] },
  { initials: 'KT', name: 'Kendall', color: 4, where: 'Sec 330', note: 'Row 4', at: [108, 22] },
  { initials: 'DS', name: 'Dev', color: 5, where: 'Lot C', note: 'in by half', at: undefined },
]

const DOT: Record<Friend['color'], string> = {
  1: 'fill-avatar-1',
  2: 'fill-avatar-2',
  3: 'fill-avatar-3',
  4: 'fill-avatar-4',
  5: 'fill-avatar-5',
  6: 'fill-avatar-6',
}

/** Kyle Field from above: the field, the lower bowl (100s), the upper decks (300s), Gate 2 on the east side. */
function KyleFieldMap() {
  const me: [number, number] = [236, 160]
  return (
    <svg
      viewBox="0 0 361 180"
      className="block h-auto w-full"
      role="img"
      aria-label="Kyle Field seating map. You and Maya, Alex and Brooke are in the lower bowl on the east side near Gate 2. Kendall is in the upper deck, Sec 330, across the field."
    >
      {/* Upper deck */}
      <rect x="16" y="4" width="329" height="172" rx="74" className="fill-white/[0.05] stroke-white/12" />
      {/* Lower bowl */}
      <rect x="54" y="32" width="253" height="116" rx="54" className="fill-white/[0.08] stroke-white/14" />
      {/* Section ticks on the lower bowl */}
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={i} x1={82 + i * 16.5} x2={82 + i * 16.5} y1="134" y2="148" className="stroke-white/10" />
      ))}
      {/* The field */}
      <rect x="92" y="56" width="177" height="68" rx="6" className="fill-field" />
      <rect x="92" y="56" width="16" height="68" rx="3" className="fill-maroon" />
      <rect x="253" y="56" width="16" height="68" rx="3" className="fill-maroon" />
      <line x1="180.5" x2="180.5" y1="56" y2="124" className="stroke-white/40" />
      {/* Section labels */}
      <text x="160" y="166" textAnchor="middle" className="fill-white/60 text-tab font-semibold">
        Sec 125
      </text>
      <text x="150" y="25" textAnchor="start" className="fill-white/60 text-tab font-semibold">
        Sec 330
      </text>
      <text
        x="180.5"
        y="94"
        textAnchor="middle"
        className="fill-white/50 font-display text-micro font-bold tracking-caps"
      >
        KYLE FIELD
      </text>
      {/* Gate 2 */}
      <g>
        <rect x="318" y="118" width="42" height="20" rx="6" className="fill-gold" />
        <text x="339" y="132" textAnchor="middle" className="fill-gold-ink text-tab font-bold">
          Gate 2
        </text>
        <path
          d="M246 166 Q306 178 330 138"
          fill="none"
          strokeDasharray="3 3"
          className="stroke-gold"
          strokeWidth="1.5"
        />
      </g>
      {/* The crew */}
      {CREW.filter((f) => f.at).map((f) => (
        <g key={f.initials}>
          <circle cx={f.at![0]} cy={f.at![1]} r="10" className={`${DOT[f.color]} stroke-night`} strokeWidth="2" />
          <text x={f.at![0]} y={f.at![1] + 3.5} textAnchor="middle" className="fill-white text-tab font-bold">
            {f.initials[0]}
          </text>
        </g>
      ))}
      {/* You */}
      <circle cx={me[0]} cy={me[1]} r="16" className="fill-gold/25" />
      <circle cx={me[0]} cy={me[1]} r="11" className="fill-gold stroke-night" strokeWidth="2" />
      <text x={me[0]} y={me[1] + 3.5} textAnchor="middle" className="fill-gold-ink text-tab font-bold">
        You
      </text>
    </svg>
  )
}

/**
 * D3 · Your crew. The Your crew tab answers "where is everyone?": a Kyle Field map with your seat
 * in gold and each friend as a dot, the list by distance, and one action to meet at half.
 */
export function D3Crew() {
  return (
    <GameDayScoreboard tab="Your crew">
      <section
        aria-labelledby="crew-title"
        className="mx-4 mt-3 overflow-hidden rounded-card bg-night-2 text-white ring-1 ring-white/8"
      >
        <div className="flex items-baseline justify-between px-3.5 pt-3">
          <h2 id="crew-title" className="text-body font-semibold">
            5 of your crew are here
          </h2>
          <span className="text-meta text-white/60">You · Sec 125 · Row 22</span>
        </div>
        <div className="px-1.5 pb-1 pt-1">
          <KyleFieldMap />
        </div>
      </section>

      <ul aria-label="Your crew" className="mx-4 mt-3 grid grid-cols-2 gap-2">
        {CREW.map((f) => (
          <li key={f.initials}>
            <button
              type="button"
              aria-label={`Message ${f.name}, ${f.where}, ${f.note}`}
              className="press flex min-h-[48px] w-full items-center gap-2.5 rounded-thumb bg-night-2 px-2.5 py-1.5 text-left text-white ring-1 ring-white/8"
            >
              <Avatar initials={f.initials} color={f.color} size={30} />
              <span className="min-w-0 flex-1">
                <span className="block text-control font-semibold">{f.name}</span>
                <span className="block text-meta text-white/60">
                  {f.where} · {f.note}
                </span>
              </span>
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="press flex min-h-[48px] w-full items-center gap-2.5 rounded-thumb px-2.5 py-1.5 text-left text-white ring-1 ring-white/14 ring-inset"
          >
            <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-white/8">
              <MessageCircle size={16} />
            </span>
            <span className="text-control font-semibold">Message all 5</span>
          </button>
        </li>
      </ul>

      <div className="mx-4 mt-3">
        <Button className="w-full">
          <Navigation size={17} />
          Meet at Gate 2 at half · 7:31
        </Button>
      </div>
    </GameDayScoreboard>
  )
}
