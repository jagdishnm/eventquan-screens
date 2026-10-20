import { BellRing, Check, Footprints } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Screen } from '../../../../components/Device'
import { AggieMark } from '../../../../components/Marks'
import { StatusBar } from '../../../../components/StatusBar'
import { TabBar } from '../../../../components/TabBar'
import { NODE_META, type Node } from '../../../../data/events'
import { CampusMap, type MapPinSpec } from '../../../CampusMap'
import { CapsuleTitle, MapCapsule, MapScrim, MapSheet, SheetCount } from '../MapChrome'

type Spot = { id: string; title: string; place: string; node: Node; here: number; walk: string }

/** Small, but on: the three live things on a Tuesday morning. */
const SPOTS: Spot[] = [
  { id: 'evans', title: 'Study hours', place: 'Evans Library', node: 'tamu', here: 61, walk: '4 min' },
  { id: 'rec', title: 'Pickup basketball', place: 'Rec Center', node: 'tamu', here: 34, walk: '9 min' },
  { id: 'creek', title: 'Coffee and study', place: 'Wolf Pen Creek', node: 'cstat', here: 22, walk: '11 min' },
]

const PINS: MapPinSpec[] = [
  { id: 'evans', x: 172, y: 300, label: 'Study hours', node: 'tamu' },
  { id: 'rec', x: 74, y: 338, label: 'Pickup basketball', node: 'tamu' },
  { id: 'creek', x: 304, y: 318, label: 'Coffee and study', node: 'cstat' },
]

/** Saturday's game, pencilled onto Kyle Field: a dashed, not-yet pin. */
function NextGameMark() {
  return (
    <span
      aria-hidden
      className="absolute z-[6] flex -translate-x-[20px] -translate-y-full flex-col items-start"
      style={{ left: 224, top: 402 }}
    >
      <span className="flex h-[26px] items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-dashed border-maroon/50 bg-white/85 px-2.5 text-meta font-semibold text-maroon">
        Sat · A&amp;M vs Auburn
      </span>
      <span className="ml-[19px] h-[6px] w-[2px] bg-maroon/40" />
    </span>
  )
}

/**
 * Map · State · A quiet Tuesday, 10:12 AM. Most Aggies are in class and the map says so: three
 * small pins, no dressing up. The sheet leads with that honest count, lists the three things on
 * (selecting a row selects its pin), then answers "so what's next?": Saturday's game is pencilled
 * onto Kyle Field, and the one gold action sets a reminder for it.
 */
export function MapQuiet() {
  const [selected, setSelected] = useState('evans')
  const [reminded, setReminded] = useState(false)

  return (
    <Screen>
      <CampusMap
        selected={selected}
        shift={-74}
        pins={PINS.map((p) => ({ ...p, detail: p.id === selected ? SPOTS.find((s) => s.id === p.id)?.walk : undefined }))}
        onSelect={setSelected}
        overlay={<NextGameMark />}
      />
      <MapScrim />
      <StatusBar tone="dark" />

      <MapCapsule>
        <AggieMark size={40} />
        <CapsuleTitle title="Howdy, Jordan" meta="Home · Tue, Oct 15 · 64° Cloudy" />
        <button
          type="button"
          aria-label="Profile"
          className="press grid size-[44px] shrink-0 place-items-center rounded-full"
        >
          <Avatar initials="JC" size={36} color={1} className="ring-2 ring-white/25" />
        </button>
      </MapCapsule>

      <MapSheet labelledBy="quiet-title">
        <SheetCount id="quiet-title" count={SPOTS.length} kicker="Tue 10:12 AM · most are in class">
          Small things on now
        </SheetCount>

        <ul className="mt-3 overflow-hidden rounded-card bg-white shadow-raised">
          {SPOTS.map((s) => {
            const on = s.id === selected
            return (
              <li key={s.id} className="border-b border-hairline last:border-b-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(s.id)}
                  className={`relative flex min-h-[48px] w-full items-center gap-2.5 px-3 py-1.5 text-left transition-colors duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
                    on ? 'bg-maroon-soft' : 'active:bg-press'
                  }`}
                >
                  {on ? (
                    <span aria-hidden className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-maroon" />
                  ) : null}
                  <span aria-hidden className={`size-[8px] shrink-0 rounded-full ${NODE_META[s.node].dot}`} />
                  <span className="min-w-0 flex-1 truncate text-control">
                    <span className="font-semibold">{s.title}</span>
                    <span className="text-ink-3"> · {s.place}</span>
                  </span>
                  <span className="shrink-0 text-meta text-ink-3 tabular">{s.here} here</span>
                  <span className="flex w-[58px] shrink-0 items-center justify-end gap-1 whitespace-nowrap text-meta font-semibold text-ink-2 tabular">
                    <Footprints aria-hidden size={12} className="text-maroon" />
                    {s.walk}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* What's next: the next big crowd, and the one gold action */}
        <div className="mt-3 flex items-center gap-3">
          <AggieMark size={44} />
          <div className="min-w-0 flex-1">
            <p className="text-micro font-bold uppercase tracking-caps text-ink-3">Next big crowd · Saturday</p>
            <p className="font-display text-title font-extrabold uppercase italic leading-tight">A&amp;M vs Auburn</p>
            <p className="truncate text-meta text-ink-2 tabular">2:30 PM kickoff · Gates 12:30 PM</p>
          </div>
        </div>
        <Button
          className="mt-2.5 w-full"
          variant={reminded ? 'secondary' : 'primary'}
          aria-pressed={reminded}
          onClick={() => setReminded((r) => !r)}
        >
          {reminded ? <Check size={17} strokeWidth={2.6} className="text-ok" /> : <BellRing size={17} />}
          {reminded ? 'Reminder set · Sat 12:30 PM' : 'Remind me Saturday'}
        </Button>
      </MapSheet>

      <TabBar active="home" />
    </Screen>
  )
}
