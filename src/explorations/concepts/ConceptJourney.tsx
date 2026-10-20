import { EqMark } from '../../components/Marks'
import { CONCEPTS, LEAD_CONCEPT } from '.'
import { boardWidth } from '../ExplorationJourneys'

/** Phones sit on a gentle wave so the row reads as a sequence, as on the brief's journey board. */
const OFFSET = [0, 40, 12, 52, 4, 36, 20]

/**
 * One concept's assembled journey: the brief board itself (condensed headline, the gold straw
 * with a timestamp per phone, numbered captions), every phone in this concept's own treatment.
 */
export function ConceptJourney({ conceptKey }: { conceptKey: string }) {
  const c = CONCEPTS.find((x) => x.key === conceptKey)
  if (!c) return null
  return (
    <main
      className="relative overflow-hidden bg-night px-[72px] pb-20 pt-16 text-paper"
      style={{ width: boardWidth(c.stages.length) }}
    >
      <div className="pointer-events-none absolute -left-40 -top-56 size-[900px] rounded-full bg-maroon/45 blur-[160px]" />
      <div className="pointer-events-none absolute -right-40 top-[420px] size-[700px] rounded-full bg-gold/[0.06] blur-[140px]" />

      <header className="relative flex items-end justify-between gap-16">
        <div>
          <div className="flex items-center gap-3">
            <EqMark size={32} />
            <span className="text-control font-semibold tracking-[2.4px] text-paper/55">
              EVENTQUAN × TEXAS A&amp;M · CONCEPT {c.n} · {c.name.toUpperCase()} · FROM {c.from.join(' + ')}
            </span>
            <span
              className={`rounded-tag px-2 py-1 text-micro font-bold tracking-caps ${
                c.key === LEAD_CONCEPT ? 'bg-gold text-gold-ink' : 'bg-paper/10 text-paper/60'
              }`}
            >
              {c.key === LEAD_CONCEPT ? 'OUR RECOMMENDATION' : 'ALSO CONSIDERED'}
            </span>
          </div>
          <h1 className="mt-6 font-display text-[168px] font-extrabold uppercase italic leading-[0.82] tracking-[-2px]">
            {c.headline[0].replace(/\.$/, '')}
            <span className="text-gold">.</span>
            <br />
            {c.headline[1].replace(/\.$/, '')}
            <span className="text-gold">.</span>
          </h1>
        </div>
        <div className="max-w-[560px] pb-3">
          <p className="text-board-lede leading-[1.5] text-paper/70 [text-wrap:pretty]">{c.lede}</p>
          <p className="mt-5 flex gap-3 text-card leading-[1.5] text-paper/62 [text-wrap:pretty]">
            <span className="mt-[7px] size-[10px] shrink-0 rounded-full bg-gold" />
            <span>
              <b className="font-semibold text-paper/85">On every screen:</b> {c.signature}
            </span>
          </p>
        </div>
      </header>

      {/* The straw: one gold thread through every moment */}
      <div className="relative mt-16 h-[64px]">
        <div className="absolute inset-x-0 top-[44px] h-[2px] bg-[linear-gradient(90deg,rgba(255,205,28,0)_0%,var(--color-gold)_6%,var(--color-gold)_94%,rgba(255,205,28,0)_100%)]" />
        <div className="flex gap-[56px]">
          {c.stages.map((s) => (
            <div key={s.n} className="relative w-[417px] shrink-0">
              <div className="flex items-baseline gap-2 pl-2 font-display uppercase">
                <span className="text-[30px] font-bold leading-none tracking-[0.2px] tabular">{s.time}</span>
                <span className="text-card font-semibold tracking-[1.6px] text-paper/45">{s.day}</span>
              </div>
              <span className="absolute left-[14px] top-[38px] size-[14px] rounded-full bg-gold ring-[5px] ring-night" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-[56px]">
        {c.stages.map((s, i) => (
          <figure key={s.n} className="w-[417px] shrink-0" style={{ marginTop: OFFSET[i] }}>
            <div
              role="img"
              aria-label={`${s.stage}: ${s.title} screen`}
              className="rounded-[64px] bg-[#050506] p-[12px] shadow-[0_0_0_1.5px_#3a383d,0_50px_90px_-30px_rgba(0,0,0,0.85)]"
            >
              <div className="overflow-hidden rounded-[52px]" inert aria-hidden>
                <s.Screen />
              </div>
            </div>
            <figcaption className="mt-8 px-2">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[44px] font-extrabold italic leading-none tabular text-gold">
                  {String(s.n).padStart(2, '0')}
                </span>
                <span className="text-board-title font-semibold tracking-[-0.4px]">{s.stage}</span>
              </div>
              <div className="mt-1 text-card font-semibold text-paper/85">{s.title}</div>
              <p className="mt-2 text-card leading-[1.5] text-paper/62 [text-wrap:pretty]">{s.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  )
}
