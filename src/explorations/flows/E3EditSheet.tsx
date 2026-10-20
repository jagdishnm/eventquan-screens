import { CalendarDays, MapPin, StickyNote, Type, Users } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { Sheet } from '../../components/Sheet'
import { QuickEventThread } from '../QuickEventThread'

/** One editable row: icon well, small label, then the value and any quick changes under it. */
function Row({
  Icon,
  label,
  htmlFor,
  well = 'bg-maroon-soft text-maroon',
  children,
}: {
  Icon: typeof CalendarDays
  label: string
  htmlFor?: string
  well?: string
  children: ReactNode
}) {
  return (
    <li className="flex gap-3 px-3.5 py-3">
      <span className={`grid size-[32px] shrink-0 place-items-center rounded-well ${well}`}>
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="block text-meta text-ink-3">
            {label}
          </label>
        ) : (
          <span className="block text-meta text-ink-3">{label}</span>
        )}
        {children}
      </div>
    </li>
  )
}

/**
 * E3 · Edit sheet. "Edit" on the offer opens a sheet over the thread with what EventQuan parsed,
 * every field editable, and one-tap changes for the edits a group chat actually asks for.
 */
export function E3EditSheet() {
  const [late, setLate] = useState(false)
  const [northgate, setNorthgate] = useState(false)
  const [open, setOpen] = useState(true)

  const sheet = (
    <Sheet open={open} onClose={() => setOpen(false)} labelledBy="edit-title">
      <div className="flex h-[48px] items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="relative -ml-1 px-1 text-body font-medium text-maroon after:absolute after:-inset-3 after:content-['']"
        >
          Cancel
        </button>
        <h2 id="edit-title" tabIndex={-1} data-autofocus className="text-emphasis font-semibold">
          Edit event
        </h2>
        <span className="w-[52px]" aria-hidden />
      </div>

      <ul className="divide-y divide-hairline rounded-card bg-white">
        <Row Icon={Type} label="Title" htmlFor="ev-title">
          <input
            id="ev-title"
            defaultValue="Post-game bowling"
            className="h-[28px] w-full bg-transparent text-body font-semibold text-ink outline-none"
          />
        </Row>
        <Row Icon={CalendarDays} label="When">
          <div className="text-body font-semibold">Tonight, {late ? '10:00' : '9:30'} PM</div>
          <div className="text-meta text-ink-3">
            {late ? '45 min after the final whistle' : '~15 min after the final whistle'}
          </div>
          <div className="mt-2 flex gap-2">
            <Chip appearance="soft" selected={late} onClick={() => setLate((v) => !v)}>
              Make it 10 PM
            </Chip>
          </div>
        </Row>
        <Row Icon={MapPin} label="Where" well="bg-cstat-soft text-cstat">
          <div className="flex items-center gap-2">
            <span className="text-body font-semibold">Grand Station</span>
            <Badge tone="node" node="cstat" />
          </div>
          <div className="text-meta text-ink-3">9 min drive · $2 shoes with Aggie ID</div>
        </Row>
        <Row Icon={Users} label="Who">
          <div className="text-body font-semibold">Gameday crew · 6{northgate ? ' + Northgate crew · 8' : ''}</div>
          <div className="mt-2 flex gap-2">
            <Chip appearance="soft" selected={northgate} onClick={() => setNorthgate((v) => !v)}>
              Add Northgate crew
            </Chip>
          </div>
        </Row>
        <Row Icon={StickyNote} label="Note" htmlFor="ev-note">
          <input
            id="ev-note"
            defaultValue="Loser buys Whataburger"
            className="h-[28px] w-full bg-transparent text-body text-ink outline-none"
          />
        </Row>
      </ul>

      <Button size="lg" className="mt-4 w-full" onClick={() => setOpen(false)}>
        Save
      </Button>
    </Sheet>
  )

  return <QuickEventThread overlay={sheet} />
}
