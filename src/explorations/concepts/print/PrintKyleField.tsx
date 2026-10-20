import { Check, ChevronLeft, Share, Stamp } from 'lucide-react'
import { useState } from 'react'
import { Badge, LiveDot } from '../../../components/Badge'
import { Button } from '../../../components/Button'
import { Screen, ScrollBody } from '../../../components/Device'
import { StatusBar } from '../../../components/StatusBar'
import { TabBar } from '../../../components/TabBar'
import { IconButton } from '../../../components/ui'
import { NODE_META, type Node } from '../../../data/events'
import { Kicker, Masthead, Nameplate, PrintHead, RING_DONE, RingEar } from './PrintKit'

/** Tonight's traditions at Kyle Field, in the order they happen. */
const TONIGHT = [
  {
    id: 'march',
    name: 'Corps march-in',
    when: '3:45 PM',
    d: 'The Corps of Cadets and the Fightin’ Texas Aggie Band march from the Quad into Kyle Field.',
  },
  {
    id: 'yell',
    name: 'Yell Practice',
    when: 'Pregame',
    d: 'The Yell Leaders call the first yells of the night. Watch for the sign, then hump it.',
  },
  {
    id: 'spirit',
    name: 'The Spirit of Aggieland',
    when: 'Stand, hats off',
    d: 'The alma mater. All of Kyle Field on its feet, singing it together.',
  },
  {
    id: 'saw',
    name: 'Saw ’Em Off',
    when: 'In the War Hymn',
    d: 'Arms linked, the stands sway side to side and finish with the saw.',
  },
] as const

/** Today's events at the venue, as ticket stubs. */
const STUBS: { t: string; ap: string; title: string; meta: string; node: Node; live?: boolean }[] = [
  { t: '9:00', ap: 'AM', title: '12th Man Brunch', meta: 'Zone Club · 340 here', node: 'tamu', live: true },
  { t: '10:00', ap: 'AM', title: 'Tailgate Zone', meta: 'Lot C · opens in 14 min', node: 'tamu' },
  { t: '4:00', ap: 'PM', title: 'Gates open', meta: 'Gates 2, 6 and 12', node: 'tamu' },
  { t: '6:00', ap: 'PM', title: 'A&M vs LSU', meta: 'Sec 125 · Row 22 · Seat 14', node: 'tamu' },
]

/**
 * Print · Campus node, Kyle Field, as a page in the gameday program.
 * The venue opens on its story (E. King Gill, 1922), then tonight's traditions in order, each with a
 * stamp box toward your ring, then today's events at the stadium as ticket stubs.
 */
export function PrintKyleField() {
  const [stamped, setStamped] = useState<Record<string, boolean>>({})
  const [added, setAdded] = useState(false)
  const n = Object.values(stamped).filter(Boolean).length

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="Program · Page 4"
          ear={<RingEar done={n === TONIGHT.length ? RING_DONE + 1 : RING_DONE} partial={n / TONIGHT.length} />}
          lead={
            <IconButton label="Back" to="/">
              <ChevronLeft size={20} />
            </IconButton>
          }
          dateline={
            <>
              <Kicker className="text-paper/75">A&amp;M vs LSU · Sat · Oct 12</Kicker>
              <Kicker className="text-gold">Kickoff 6:00 PM</Kicker>
            </>
          }
        >
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <Nameplate>Kyle Field</Nameplate>
              <p className="mt-1.5 font-serif text-emphasis italic text-paper/85">Home of the 12th Man</p>
            </div>
            <IconButton label="Share Kyle Field">
              <Share size={18} />
            </IconButton>
          </div>
        </Masthead>

        <div className="relative px-4">
          {/* History, set like a program essay */}
          <section aria-labelledby="since" className="mt-4">
            <div className="flex items-center justify-between">
              <Kicker className="text-maroon">
                <span id="since">Since 1922</span>
              </Kicker>
              <Badge tone="node" node="tamu" />
            </div>
            <div className="mt-2 flex gap-3">
              <figure className="shrink-0">
                <img
                  src="/img/twelfth-man.jpg"
                  alt="The Fightin’ Texas Aggie Band in formation on Kyle Field."
                  className="size-[104px] object-cover grayscale contrast-125"
                />
                <figcaption className="mt-1 font-mono text-meta uppercase tracking-eyebrow text-ink-warm-2">
                  Fig. 1 · The Band
                </figcaption>
              </figure>
              <p className="font-serif text-small leading-[1.5] text-ink-warm first-letter:float-left first-letter:mr-1.5 first-letter:font-poster first-letter:text-display-lg first-letter:font-black first-letter:leading-[0.85] first-letter:text-maroon">
                On Jan. 2, 1922, short on players against Centre College, Coach Dana X. Bible called E. King Gill down
                from the press box to suit up. He stood ready on the sideline all game. Aggies have stood ever since.
              </p>
            </div>
            <dl className="mt-3 grid grid-cols-3 divide-x divide-ink-warm/20 border-y border-ink-warm/25 py-2 text-center">
              {[
                ['102,733', 'Seats'],
                ['1927', 'Opened'],
                ['12th', 'Man, standing'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-poster text-title font-extrabold leading-none tabular text-maroon">{v}</dd>
                  <dd aria-hidden className="mt-0.5 font-mono text-meta uppercase tracking-eyebrow text-ink-warm-2">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Tonight's order of traditions */}
          <section aria-labelledby="order" className="mt-5">
            <PrintHead id="order" aside={`${n} of 4 stamped`}>
              Order of traditions
            </PrintHead>
            <p className="mt-2 flex items-center gap-1.5 font-serif text-small italic text-ink-warm-2">
              <Stamp aria-hidden size={14} className="shrink-0 text-maroon" />
              {n === 0
                ? 'Tap a box to stamp each tradition as it happens.'
                : 'Stamped. Tap a stamp again to lift it.'}
            </p>
            <ol className="mt-1">
              {TONIGHT.map((t, i) => {
                const on = !!stamped[t.id]
                return (
                  <li key={t.id} className="flex gap-3 border-b border-ink-warm/15 py-2.5">
                    <span className="w-[22px] shrink-0 pt-0.5 font-poster text-title font-extrabold leading-none tabular text-maroon">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Kicker className="block text-maroon">{t.when}</Kicker>
                      <h3 className="font-slab text-card font-bold leading-tight">{t.name}</h3>
                      <p className="mt-0.5 font-serif text-meta leading-[1.4] text-ink-warm-2">{t.d}</p>
                    </div>
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={on ? `${t.name}, stamped. Tap to lift the stamp` : `Tap to stamp ${t.name}`}
                      onClick={() => setStamped((s) => ({ ...s, [t.id]: !s[t.id] }))}
                      className="press -my-1 grid size-[48px] shrink-0 place-items-center"
                    >
                      <span
                        className={`grid size-[38px] place-items-center rounded-tag border-2 transition-[color,background-color,border-color,rotate,scale] duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none ${
                          on
                            ? '-rotate-[8deg] border-maroon bg-maroon text-gold'
                            : 'scale-95 border-dashed border-ink-warm-2/60 text-ink-warm-2'
                        }`}
                      >
                        {on ? <Check size={22} strokeWidth={3} /> : <Stamp size={18} strokeWidth={2} />}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <p className="mt-2 font-serif text-small italic text-ink-warm-2">
              All four fill “Game night at Kyle”, the next segment of your ring.
            </p>
            <Button size="lg" className="mt-3 w-full" aria-pressed={added} onClick={() => setAdded((a) => !a)}>
              {added ? 'On your Saturday · 4 traditions' : 'Add tonight’s traditions'}
            </Button>
          </section>

          {/* Today at the venue, as ticket stubs */}
          <section aria-labelledby="stubs" className="mt-6">
            <PrintHead id="stubs" aside="4 today">
              Today at Kyle
            </PrintHead>
            <ul className="mt-3 space-y-2.5">
              {STUBS.map((s) => (
                <li key={s.title}>
                  <article className="relative flex overflow-hidden rounded-tag bg-white shadow-raised">
                    <div className="flex w-[78px] shrink-0 flex-col items-center justify-center bg-maroon py-2.5 text-paper">
                      <span className="font-poster text-display-sm font-extrabold leading-none tabular">{s.t}</span>
                      <Kicker className="mt-0.5 text-gold">{s.ap}</Kicker>
                    </div>
                    {/* Perforation, with punched notches top and bottom */}
                    <span aria-hidden className="relative w-0 border-l-2 border-dashed border-ink-warm/25">
                      <span className="absolute -left-[7px] -top-[6px] size-[12px] rounded-full bg-paper" />
                      <span className="absolute -bottom-[6px] -left-[7px] size-[12px] rounded-full bg-paper" />
                    </span>
                    <div className="min-w-0 flex-1 px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        {s.live ? (
                          <Kicker className="flex items-center gap-1.5 text-live-ink">
                            <LiveDot /> Live now
                          </Kicker>
                        ) : (
                          <Kicker className="flex items-center gap-1.5 text-ink-warm-2">
                            <span className={`size-[6px] rounded-full ${NODE_META[s.node].dot}`} />
                            Kyle Field
                          </Kicker>
                        )}
                      </div>
                      <h3 className="mt-0.5 truncate font-slab text-card font-bold">{s.title}</h3>
                      <p className="truncate font-serif text-meta text-ink-warm-2">{s.meta}</p>
                    </div>
                    <span
                      aria-hidden
                      className="w-[26px] shrink-0 border-l border-ink-warm/10 bg-paper-2 py-2 text-center font-mono text-meta font-semibold uppercase tracking-eyebrow text-ink-warm-2 [writing-mode:vertical-rl]"
                    >
                      Admit
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ScrollBody>
      <TabBar active="map" />
    </Screen>
  )
}
