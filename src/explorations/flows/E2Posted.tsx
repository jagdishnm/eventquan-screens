import { CalendarCheck, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Avatar, Faces } from '../../components/Avatar'
import { Chip } from '../../components/Chip'
import { QuickEventThread } from '../QuickEventThread'

type Rsvp = 'in' | 'maybe' | 'cant'

const RSVP: { key: Rsvp; label: string }[] = [
  { key: 'in', label: "I'm in" },
  { key: 'maybe', label: 'Maybe' },
  { key: 'cant', label: "Can't" },
]

/** Replies in the thread, each carrying the RSVP it set. */
const REPLIES: { initials: string; color: 2 | 3 | 4 | 5; name: string; text: string; rsvp: Rsvp }[] = [
  { initials: 'MR', color: 2, name: 'Maya', text: 'in. bringing my own ball this time', rsvp: 'in' },
  { initials: 'AL', color: 3, name: 'Alex', text: "in, and I'm not buying Whataburger again", rsvp: 'in' },
  { initials: 'KT', color: 4, name: 'Kendall', text: 'maybe, depends how bad traffic is out of Kyle', rsvp: 'maybe' },
  { initials: 'DS', color: 5, name: 'Dev', text: "can't, driving back to Houston after", rsvp: 'cant' },
]

const TAG: Record<Rsvp, string> = {
  in: 'bg-ok/10 text-ok',
  maybe: 'bg-soon text-soon-ink',
  cant: 'bg-canvas text-ink-3',
}
const TAG_LABEL: Record<Rsvp, string> = { in: 'In', maybe: 'Maybe', cant: "Can't" }

/**
 * E2 · Posted. The offer became a real event in the thread: one card with the plan and the head
 * count, RSVP chips anyone can tap, and the replies under it. The composer is back to normal.
 */
export function E2Posted() {
  const [mine, setMine] = useState<Rsvp>('in')
  // Maya, Alex and Brooke (who tapped without a message) are in; Kendall maybe; Dev can't. Plus you.
  const n = (k: Rsvp) => ({ in: 3, maybe: 1, cant: 1 })[k] + (mine === k ? 1 : 0)
  return (
    <QuickEventThread
      status={`6 Aggies · ${n('in')} in for bowling tonight`}
      score={{
        count: n('in'),
        unit: ['crew', 'in for bowling'],
        aside: `of 6 · ${n('maybe')} maybe`,
        kicker: 'SAT 7:33 PM · POST-GAME BOWLING',
        trend: '+4 replies in 2 min',
      }}
    >
      <ol className="flex flex-col gap-2 px-4">
        <li className="text-center text-micro font-semibold tracking-eyebrow text-ink-3">HALFTIME · 7:33 PM</li>

        {/* The posted event */}
        <li className="rounded-card bg-white p-3.5 shadow-floating">
          <div className="flex items-center gap-1.5 text-micro font-bold tracking-eyebrow text-maroon">
            <CalendarCheck size={13} />
            JORDAN POSTED AN EVENT
          </div>
          <div className="mt-2.5 flex items-center gap-3">
            <span className="grid size-[56px] shrink-0 place-items-center rounded-thumb bg-night-2 font-display text-display-sm font-extrabold italic text-gold">
              9:30
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-card font-semibold tracking-snug">Post-game bowling</h2>
              <p className="flex items-center gap-1 text-small text-ink-2">
                <span className="font-medium text-ink">Tonight 9:30 PM</span>
                <span className="text-ink-3">·</span>
                <MapPin size={12} strokeWidth={2.4} className="text-cstat" />
                Grand Station
              </p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-2 border-t border-hairline pt-2.5 text-meta text-ink-2">
            <Faces n={n('in')} size={22} />
            <span aria-live="polite">
              <span className="font-semibold text-ink">{n('in')} in</span> · {n('maybe')} maybe · {n('cant')}{' '}
              can&rsquo;t
            </span>
          </div>
          <div role="group" aria-label="Your RSVP" className="mt-2.5 grid grid-cols-3 gap-2">
            {RSVP.map((r) => (
              <div key={r.key} className="grid [&>button]:justify-center">
                <Chip selected={mine === r.key} onClick={() => setMine(r.key)}>
                  {r.label}
                </Chip>
              </div>
            ))}
          </div>
        </li>

        {REPLIES.map((r) => (
          <li key={r.initials} className="flex items-end gap-2">
            <Avatar initials={r.initials} color={r.color} size={28} />
            <div className="max-w-[270px] rounded-sheet rounded-bl-tag bg-white px-3.5 py-2 shadow-raised">
              <div className="flex items-center gap-1.5 text-meta">
                <span className="font-semibold text-ink-2">{r.name}</span>
                <span className={`rounded-tag px-1.5 text-micro font-bold ${TAG[r.rsvp]}`}>{TAG_LABEL[r.rsvp]}</span>
              </div>
              <p className="text-body">{r.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </QuickEventThread>
  )
}
