import type { Node } from './events'

/**
 * Quick Event parsing — turns one line of plain text into an event.
 * Mocked, but deterministic: "today" is Sat, Oct 12; A&M vs LSU ends ~9:15 PM.
 */

export type Template = {
  id: 'bowling' | 'birthday' | 'golf' | 'watch' | 'study' | 'pickup'
  label: string
  text: string
  title: string
  /** Cover tile: background and glyph colour, from the A&M skin and node palette only. */
  cover: { bg: string; ink: string }
}

export const TEMPLATES: Template[] = [
  {
    id: 'bowling',
    label: 'Bowling',
    title: 'Post-game bowling',
    text: 'Post-game bowling at Grand Station tonight 9:30. Loser buys Whataburger',
    cover: { bg: 'radial-gradient(120% 100% at 15% 0%, #4a0a0a 0%, #1a181c 62%)', ink: '#ffcd1c' },
  },
  {
    id: 'birthday',
    label: 'Birthday',
    title: "Maya's 21st",
    text: "Maya's 21st at Northgate Friday 8pm, first round's on me",
    cover: { bg: '#ffcd1c', ink: '#500000' },
  },
  {
    id: 'golf',
    label: 'Golf',
    title: 'Sunday 18',
    text: 'Golf at Traditions Club Sunday 8am, need a 4th',
    cover: { bg: '#16775a', ink: '#ffffff' },
  },
  {
    id: 'watch',
    label: 'Watch Party',
    title: 'Away game watch party',
    text: 'Away game watch party at the MSC Saturday 2:30pm',
    cover: { bg: '#500000', ink: '#ffcd1c' },
  },
  {
    id: 'study',
    label: 'Study Group',
    title: 'ENGR 102 study group',
    text: 'ENGR 102 study group at Evans Library tomorrow 7pm',
    cover: { bg: '#1d5fb0', ink: '#ffffff' },
  },
  {
    id: 'pickup',
    label: 'Pickup Game',
    title: 'Pickup volleyball',
    text: 'Pickup volleyball at the Rec tomorrow 6pm',
    cover: { bg: '#732f2f', ink: '#ffcd1c' },
  },
]

type Place = { match: RegExp; name: string; short: string; node: Node; offer?: string; walk: string }

const PLACES: Place[] = [
  {
    match: /grand station/i,
    name: 'Grand Station Entertainment',
    short: 'Grand Station',
    node: 'cstat',
    offer: 'Aggie Night · $2 shoes with Aggie ID',
    walk: '9 min drive',
  },
  { match: /northgate/i, name: 'Northgate District', short: 'Northgate', node: 'cstat', walk: '12 min walk' },
  { match: /traditions club/i, name: 'Traditions Club', short: 'Traditions Club', node: 'bryan', walk: '14 min drive' },
  { match: /\bmsc\b/i, name: 'Memorial Student Center', short: 'MSC', node: 'tamu', walk: '6 min walk' },
  { match: /evans( library)?/i, name: 'Evans Library', short: 'Evans Library', node: 'tamu', walk: '8 min walk' },
  { match: /\brec\b/i, name: 'Student Rec Center', short: 'Rec Center', node: 'tamu', walk: '11 min walk' },
  { match: /kyle field/i, name: 'Kyle Field', short: 'Kyle Field', node: 'tamu', walk: '14 min walk' },
  { match: /sbisa/i, name: 'Sbisa Dining Hall', short: 'Sbisa', node: 'tamu', walk: '5 min walk' },
]

const DAYS: { match: RegExp; label: string; date: string; today?: boolean }[] = [
  { match: /\b(tonight|today)\b/i, label: 'Tonight', date: 'Sat, Oct 12', today: true },
  { match: /\btomorrow\b/i, label: 'Tomorrow', date: 'Sun, Oct 13' },
  { match: /\bsun(day)?\b/i, label: 'Sunday', date: 'Sun, Oct 13' },
  { match: /\bfri(day)?\b/i, label: 'Friday', date: 'Fri, Oct 18' },
  { match: /\bsat(urday)?\b/i, label: 'Saturday', date: 'Sat, Oct 19' },
]

export type Span = { start: number; end: number; kind: 'when' | 'where' }

export type Parsed = {
  spans: Span[]
  day?: (typeof DAYS)[number]
  time?: { h: number; m: number; label: string }
  place?: Place
  conflict?: { tone: 'clear' | 'warn'; text: string }
  /** Where the time sits in the text, so a suggested time can replace it. */
  timeSpan?: Span
}

export function parseQuickEvent(text: string): Parsed {
  const spans: Span[] = []
  const out: Parsed = { spans }

  for (const d of DAYS) {
    const m = d.match.exec(text)
    if (m) {
      out.day = d
      spans.push({ start: m.index, end: m.index + m[0].length, kind: 'when' })
      break
    }
  }

  const t = /\b(\d{1,2})(?::(\d{2}))?\s?(am|pm)?\b(?![\d'])/i.exec(
    text
      .replace(/ENGR \d+/gi, (s) => 'x'.repeat(s.length))
      .replace(/\d+(st|nd|rd|th)\b/gi, (s) => 'x'.repeat(s.length)),
  )
  if (t) {
    let h = Number(t[1])
    const m = Number(t[2] ?? 0)
    const ap = t[3]?.toLowerCase()
    if (h <= 12 && m < 60) {
      if (ap === 'pm' && h < 12) h += 12
      else if (!ap && h < 8) h += 12
      else if (!ap && h >= 8 && h <= 11 && out.day?.today) h += 12
      const hh = h % 12 || 12
      out.time = { h, m, label: `${hh}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}` }
      out.timeSpan = { start: t.index, end: t.index + t[0].length, kind: 'when' }
      spans.push(out.timeSpan)
    }
  }

  for (const p of PLACES) {
    const m = p.match.exec(text)
    if (m) {
      out.place = p
      spans.push({ start: m.index, end: m.index + m[0].length, kind: 'where' })
      break
    }
  }

  if (out.day?.today && out.time) {
    const mins = out.time.h * 60 + out.time.m
    out.conflict =
      mins >= 18 * 60 && mins < 21 * 60 + 15
        ? { tone: 'warn', text: 'Clashes with A&M vs LSU (6:00–9:15 PM).' }
        : { tone: 'clear', text: 'Starts after the game (ends ~9:15 PM)' }
  }

  spans.sort((a, b) => a.start - b.start)
  return out
}
