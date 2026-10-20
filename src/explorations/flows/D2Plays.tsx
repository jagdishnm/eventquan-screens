import { ChevronDown, Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../components/Badge'
import { Chip } from '../../components/Chip'
import { AggieMark, LsuMark } from '../../components/Marks'
import { GameDayScoreboard } from '../GameDayScoreboard'

type Play =
  | { kind: 'play'; clock: string; team: 'A&M' | 'LSU'; down: string; text: string }
  | { kind: 'drive'; clock: string; team: 'A&M' | 'LSU'; text: string; result: string }
  | { kind: 'score'; clock: string; label: string; text: string; score: string; drive: string }

/** Second quarter, newest first. LSU's three-and-out folds into one row, as play-by-play apps do. */
const PLAYS: Play[] = [
  {
    kind: 'play',
    clock: '8:42',
    team: 'LSU',
    down: '4th & 6 · LSU 29',
    text: 'Punt, 48 yds. Returned 9 yds to the A&M 32',
  },
  { kind: 'drive', clock: '10:21', team: 'LSU', text: '3 plays · 4 yds · 1:39', result: 'Punt' },
  {
    kind: 'score',
    clock: '10:21',
    label: 'TOUCHDOWN A&M',
    text: '11-yd QB keeper up the middle. Kick is good.',
    score: 'A&M 17 · LSU 10',
    drive: '8 plays · 75 yds · 3:12',
  },
  { kind: 'drive', clock: '13:33', team: 'A&M', text: '3 plays · 12 yds · 1:05', result: 'FG' },
]

/** The drive tracker: where the ball sits on a 100-yard field, A&M driving right. */
function DriveTracker() {
  return (
    <div aria-hidden className="relative mt-2.5 h-[30px] overflow-hidden rounded-tag bg-field">
      {/* End zones */}
      <span className="absolute inset-y-0 left-0 w-[8%] bg-maroon" />
      <span className="absolute inset-y-0 right-0 w-[8%] bg-lsu" />
      {/* 10-yard lines */}
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="absolute inset-y-0 w-px bg-white/20" style={{ left: `${8 + (i + 1) * 8.4}%` }} />
      ))}
      {/* Ball at the A&M 32, line to gain at the A&M 42 */}
      <span className="absolute inset-y-0 w-[2px] bg-white" style={{ left: '34.9%' }} />
      <span className="absolute inset-y-0 w-[2px] bg-gold" style={{ left: '43.3%' }} />
      <span
        className="absolute top-1/2 h-[10px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-tint-amber-ink ring-2 ring-white"
        style={{ left: '34.9%' }}
      />
    </div>
  )
}

/**
 * D2 · Plays. The same game header, now on the Plays tab: the drive A&M has just started,
 * then the second quarter play by play with the touchdown called out, and the team's post.
 */
export function D2Plays() {
  const [filter, setFilter] = useState<'All plays' | 'Scoring' | 'A&M drives'>('All plays')
  return (
    <GameDayScoreboard tab="Plays">
      <section
        aria-labelledby="drive-title"
        className="mx-4 mt-3 rounded-card bg-night-2 p-3.5 text-white ring-1 ring-white/8"
      >
        <div className="flex items-center justify-between">
          <h2 id="drive-title" className="flex items-center gap-2 text-body font-semibold">
            <AggieMark team size={22} />
            A&amp;M ball · 1st &amp; 10 at A&amp;M 32
          </h2>
          <span className="text-meta text-white/60">New drive</span>
        </div>
        <DriveTracker />
        <p className="mt-2 flex justify-between text-meta text-white/60">
          <span>Started 8:42 · after the punt</span>
          <span>
            Line to gain <span className="font-semibold text-gold">A&amp;M 42</span>
          </span>
        </p>
      </section>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-4">
        {(['All plays', 'Scoring', 'A&M drives'] as const).map((f) => (
          <Chip key={f} surface="onMaroon" selected={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <section aria-labelledby="q2-title" className="mx-4 mt-3">
        <h2 id="q2-title" className="mb-1.5 text-micro font-bold tracking-eyebrow text-white/60">
          2ND QUARTER
        </h2>
        <ol className="overflow-hidden rounded-card bg-night-2 text-white ring-1 ring-white/8">
          {PLAYS.map((p, i) => {
            const line = i ? 'border-t border-white/8' : ''
            if (p.kind === 'score')
              return (
                <li key={p.label} className="relative bg-maroon px-3.5 py-3">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-[4px] bg-gold" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-title font-extrabold italic tracking-eyebrow text-gold">
                      {p.label}
                    </span>
                    <span className="text-meta font-semibold tabular text-white/75">{p.clock}</span>
                  </div>
                  <p className="mt-0.5 text-body font-semibold">{p.text}</p>
                  <p className="mt-0.5 text-meta text-white/75">
                    <span className="font-semibold text-white">{p.score}</span> · {p.drive}
                  </p>
                </li>
              )
            const Mark = p.team === 'A&M' ? AggieMark : LsuMark
            if (p.kind === 'drive')
              return (
                <li key={p.text} className={line}>
                  <button
                    type="button"
                    aria-expanded={false}
                    className="flex min-h-[44px] w-full items-center gap-3 px-3.5 text-left"
                  >
                    <span className="w-[36px] shrink-0 text-meta font-semibold tabular text-white/60">{p.clock}</span>
                    <Mark size={20} />
                    <span className="min-w-0 flex-1 text-small text-white/75">{p.text}</span>
                    <Badge tone="neutral" surface="dark" size="sm">
                      {p.result}
                    </Badge>
                    <ChevronDown aria-hidden size={16} className="text-white/60" />
                  </button>
                </li>
              )
            return (
              <li key={p.text} className={`flex gap-3 px-3.5 py-2.5 ${line}`}>
                <span className="w-[36px] shrink-0 pt-[1px] text-meta font-semibold tabular text-white/60">
                  {p.clock}
                </span>
                <Mark size={20} />
                <div className="min-w-0 flex-1">
                  <div className="text-micro font-bold tracking-eyebrow text-white/60">{p.down}</div>
                  <p className="text-small leading-snug">{p.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      {/* The team's own post, pinned between drives */}
      <article className="mx-4 mt-3 rounded-card bg-night-2 p-3.5 text-white ring-1 ring-white/8">
        <header className="flex items-center gap-2.5">
          <AggieMark team size={34} />
          <div className="min-w-0 flex-1">
            <h2 className="text-control font-semibold">Aggie Football</h2>
            <p className="text-meta text-white/60">@AggieFootball · 2 min</p>
          </div>
        </header>
        <p className="mt-2 text-body leading-snug">
          Eleven yards, one man, 100,000 loud. The 12th Man is rocking Kyle Field. Gig &rsquo;em!
        </p>
        <img src="/img/kyle-field-crowd.jpg" alt="" className="mt-2.5 h-[150px] w-full rounded-thumb object-cover" />
        <div className="mt-1 flex gap-1 text-meta text-white/60">
          {[
            { Icon: Heart, n: '18.4K', label: 'Like' },
            { Icon: Repeat2, n: '3.1K', label: 'Repost' },
            { Icon: MessageCircle, n: '962', label: 'Reply' },
          ].map(({ Icon, n, label }) => (
            <button
              type="button"
              key={label}
              aria-label={`${label}, ${n}`}
              className="flex h-[44px] items-center gap-1.5 rounded-well px-2 first:-ml-2"
            >
              <Icon size={16} />
              <span className="tabular">{n}</span>
            </button>
          ))}
        </div>
      </article>
    </GameDayScoreboard>
  )
}
