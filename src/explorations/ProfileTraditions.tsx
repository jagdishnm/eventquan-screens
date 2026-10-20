import { ChevronRight, Settings } from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Screen, ScrollBody } from '../components/Device'
import { StatusBar } from '../components/StatusBar'
import { TabBar } from '../components/TabBar'
import { IconButton } from '../components/ui'
import { Kicker, Masthead, Nameplate, PrintHead, RingEar } from './concepts/print/PrintKit'

type Tradition = { id: string; name: string; img: string; done?: string; when?: string; meta: string }

/** Eight Aggie traditions, in the order a student meets them. Done ones carry the date. */
const TRADITIONS: Tradition[] = [
  { id: 'howdy', name: 'Howdy Week', img: '/img/msc.jpg', done: 'Aug 2024', meta: 'Your first week on campus' },
  {
    id: 'kyle',
    name: 'First game at Kyle Field',
    img: '/img/kyle-field.jpg',
    done: 'Sep 2024',
    meta: 'Stood all four quarters',
  },
  {
    id: 'tree',
    name: 'Century Tree walk',
    img: '/img/century-tree.jpg',
    done: 'Feb 2025',
    meta: 'Walked under it with Maya',
  },
  {
    id: 'rev',
    name: 'Met Reveille',
    img: '/img/reveille.jpg',
    done: 'Apr 2025',
    meta: 'Outside the Academic Building',
  },
  {
    id: 'yell',
    name: 'Midnight Yell',
    img: '/img/midnight-yell.jpg',
    when: 'Fri, Oct 18 · 11:59 PM',
    meta: 'Kyle Field · 18K going · 31 friends',
  },
  { id: 'muster', name: 'Muster', img: '/img/reed-arena.jpg', when: 'Apr 21', meta: 'Reed Arena · Here' },
  { id: 'ring', name: 'Ring Day', img: '/img/academic-building.jpg', when: 'At 90 hours', meta: 'You are at 74 hours' },
  {
    id: 'walk',
    name: 'Elephant Walk',
    img: '/img/kyle-field-exterior.jpg',
    when: 'Senior year · Nov 2026',
    meta: 'Class of ’27',
  },
]

const R = 84
const W = 14
const C = 110

function arc(i: number, n: number) {
  const gap = 5
  const a0 = ((360 / n) * i + gap / 2 - 90) * (Math.PI / 180)
  const a1 = ((360 / n) * (i + 1) - gap / 2 - 90) * (Math.PI / 180)
  const p = (a: number) => `${C + R * Math.cos(a)} ${C + R * Math.sin(a)}`
  return `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`
}

/** Stroke-width changes on the shared expo curve; still for reduced motion. */
const GROW =
  'transition-[stroke-width,stroke] duration-(--duration-quick) ease-(--ease-out-expo) motion-reduce:transition-none'

/**
 * Exploration · Profile as an Aggie Ring of traditions.
 * The Aggie Ring is the thing every student works toward. Here the profile is a ring of eight
 * traditions: gold where you have done them, open where they are still ahead, and the next one
 * one tap from going. Set as the last page of the Aggieland edition, the ring from every
 * masthead shown full size.
 */
export function ProfileTraditions() {
  const [sel, setSel] = useState('yell')
  const [going, setGoing] = useState(false)
  const done = TRADITIONS.filter((t) => t.done).length
  const t = TRADITIONS.find((x) => x.id === sel) ?? TRADITIONS[4]
  const ahead = TRADITIONS.filter((x) => !x.done && x.id !== 'yell')

  return (
    <Screen bg="bg-paper" className="paper-grain">
      <StatusBar />
      <ScrollBody className="text-ink-warm">
        <Masthead
          folio="Profile · Class of ’27"
          ear={<RingEar done={done} current />}
          dateline={
            <>
              <Kicker className="text-paper/80">Mechanical Engineering</Kicker>
              <Kicker className="text-gold">74 of 90 hours</Kicker>
            </>
          }
        >
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <Nameplate>Your ring</Nameplate>
              <p className="mt-2 flex items-center gap-2">
                <Avatar initials="JC" size={28} className="ring-2 ring-gold" />
                <span className="font-slab text-emphasis font-bold">Jordan Carter ’27</span>
              </p>
            </div>
            <IconButton label="Settings">
              <Settings size={18} />
            </IconButton>
          </div>
        </Masthead>

        <div className="relative px-4">
          <section aria-labelledby="ring-title" className="mt-4">
            <PrintHead id="ring-title" aside="Tap one to read it">
              Eight traditions
            </PrintHead>

            <div className="mt-2 flex items-center gap-3">
              <svg
                viewBox="0 0 220 220"
                className="size-[168px] shrink-0"
                role="group"
                aria-label={`${done} of 8 traditions done`}
              >
                {TRADITIONS.map((x, i) => {
                  const on = x.id === sel
                  return (
                    <g key={x.id} onClick={() => setSel(x.id)} className="cursor-pointer">
                      {/* Gold sits on a darker gold edge so it holds on paper */}
                      {x.done ? (
                        <path
                          d={arc(i, TRADITIONS.length)}
                          fill="none"
                          strokeLinecap="butt"
                          strokeWidth={(on ? W + 8 : W) + 3}
                          className={`stroke-gold-dark ${GROW}`}
                        />
                      ) : null}
                      <path
                        d={arc(i, TRADITIONS.length)}
                        fill="none"
                        strokeLinecap="butt"
                        strokeWidth={on ? W + 8 : W}
                        className={`${GROW} ${
                          x.done ? 'stroke-gold' : on ? 'stroke-maroon' : 'stroke-ink-warm/15'
                        }`}
                      />
                      {/* Invisible hit band, about 44pt across at this size */}
                      <path
                        aria-hidden
                        d={arc(i, TRADITIONS.length)}
                        fill="none"
                        strokeWidth={56}
                        className="stroke-transparent"
                        pointerEvents="stroke"
                      />
                    </g>
                  )
                })}
                <text
                  x={C}
                  y={C + 12}
                  textAnchor="middle"
                  className="fill-ink-warm font-poster text-display-xl font-black tabular"
                >
                  {done}/8
                </text>
                <text
                  x={C}
                  y={C + 36}
                  textAnchor="middle"
                  className="fill-ink-warm-2 font-mono text-meta font-semibold uppercase tracking-eyebrow"
                >
                  Done
                </text>
              </svg>
              <ol className="min-w-0 flex-1 divide-y divide-ink-warm/15">
                {TRADITIONS.filter((x) => x.done).map((x) => (
                  <li key={x.id} className="py-1">
                    <Kicker className="block text-maroon">{x.done}</Kicker>
                    <span className="block truncate font-slab text-control font-bold leading-tight">{x.name}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="no-scrollbar -mx-4 mt-1 flex gap-2 overflow-x-auto px-4 py-1">
              {TRADITIONS.map((x) => (
                <Chip key={x.id} selected={x.id === sel} onClick={() => setSel(x.id)}>
                  {x.name}
                </Chip>
              ))}
            </div>

            {/* The selected tradition, as a clipping */}
            <article aria-live="polite" className="mt-3 flex gap-3 rounded-tag bg-white p-3 shadow-raised">
              <img
                src={t.img}
                alt=""
                className={`size-[84px] shrink-0 object-cover ${t.done ? 'grayscale contrast-125' : ''}`}
              />
              <div className="min-w-0 flex-1">
                <Kicker className={t.done ? 'text-cstat' : 'text-maroon'}>
                  {t.done ? `Done · ${t.done}` : t.when}
                </Kicker>
                <h3 className="mt-0.5 truncate font-slab text-title font-bold leading-tight">{t.name}</h3>
                <p className="mt-0.5 truncate font-serif text-small text-ink-warm-2">{t.meta}</p>
              </div>
            </article>
            {t.id === 'yell' ? (
              <Button size="lg" className="mt-3 w-full" aria-pressed={going} onClick={() => setGoing((g) => !g)}>
                {going ? 'You’re going · Fri 11:59 PM' : 'I’m going to Midnight Yell'}
              </Button>
            ) : null}
          </section>

          <section aria-labelledby="ahead" className="mt-6">
            <PrintHead id="ahead" aside={`${ahead.length} to go`}>
              Still ahead
            </PrintHead>
            <ul>
              {ahead.map((x) => (
                <li key={x.id}>
                  <button
                    type="button"
                    aria-pressed={x.id === sel}
                    onClick={() => setSel(x.id)}
                    className="flex min-h-[56px] w-full items-center gap-3 border-b border-ink-warm/15 py-2 text-left transition-colors duration-(--duration-quick) ease-(--ease-out-expo) active:bg-paper-2 motion-reduce:transition-none"
                  >
                    <img src={x.img} alt="" className="size-[40px] shrink-0 object-cover grayscale" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-slab text-card font-bold">{x.name}</span>
                      <Kicker className="block truncate text-ink-warm-2">{x.when}</Kicker>
                    </span>
                    <ChevronRight aria-hidden size={16} className="shrink-0 text-ink-warm-2" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ScrollBody>
      <TabBar active="profile" />
    </Screen>
  )
}
