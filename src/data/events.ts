/** Mock data for the Texas A&M skin. "Today" is Saturday, Oct 12 — A&M vs LSU at Kyle Field. */

export type Node = 'tamu' | 'bryan' | 'cstat'
export type Category = 'Athletics' | 'Student Life' | 'Academic' | 'Tradition' | 'Arts' | 'Community'

export type EventItem = {
  id: string
  title: string
  category: Category
  node: Node
  when: string
  venue: string
  venueId?: string
  img?: string
  matchup?: boolean
  attending: string
  friends?: number
  status?: { kind: 'live' | 'soon' | 'going'; label: string }
  to?: string
}

export const NODE_META: Record<Node, { label: string; text: string; bg: string; dot: string }> = {
  tamu: { label: 'Texas A&M', text: 'text-maroon', bg: 'bg-maroon-soft', dot: 'bg-maroon' },
  bryan: { label: 'Bryan', text: 'text-bryan', bg: 'bg-bryan-soft', dot: 'bg-bryan' },
  cstat: { label: 'College Station', text: 'text-cstat', bg: 'bg-cstat-soft', dot: 'bg-cstat' },
}

export const TODAY: EventItem[] = [
  {
    id: 'lsu',
    title: 'Texas A&M vs LSU',
    category: 'Athletics',
    node: 'tamu',
    when: '6:00 PM',
    venue: 'Kyle Field',
    venueId: 'kyle-field',
    matchup: true,
    attending: '125K going',
    friends: 23,
    status: { kind: 'going', label: 'Ticket in Wallet' },
    to: '/gameday',
  },
  {
    id: 'market',
    title: 'Farmers Market',
    category: 'Community',
    node: 'cstat',
    when: '8:00 AM – 12:00 PM',
    venue: 'Wolf Pen Creek',
    img: '/img/farmers-market.jpg',
    attending: '1.1K here',
    friends: 2,
    status: { kind: 'live', label: 'Live now' },
  },
  {
    id: 'tailgate',
    title: 'Tailgate Zone — Lot C',
    category: 'Athletics',
    node: 'tamu',
    when: '10:00 AM',
    venue: 'Lot C · Kyle Field',
    venueId: 'kyle-field',
    img: '/img/kyle-field-stands.jpg',
    attending: '8.4K going',
    friends: 11,
    status: { kind: 'soon', label: 'Opens in 17 min' },
  },
  {
    id: 'msc',
    title: 'MSC Open House',
    category: 'Student Life',
    node: 'tamu',
    when: '11:00 AM',
    venue: 'Memorial Student Center',
    img: '/img/msc.jpg',
    attending: '640 going',
    friends: 4,
  },
  {
    id: 'corps',
    title: 'Corps March-In',
    category: 'Tradition',
    node: 'tamu',
    when: '3:45 PM',
    venue: 'Quad → Kyle Field',
    venueId: 'kyle-field',
    img: '/img/aggie-band.jpg',
    attending: '12K watching',
    friends: 6,
  },
]

export const THIS_WEEK: (EventItem & { day: string; date: string })[] = [
  {
    id: 'career',
    day: 'MON',
    date: '14',
    title: 'Engineering Career Fair',
    category: 'Academic',
    node: 'tamu',
    when: '10:00 AM',
    venue: 'Zachry',
    img: '/img/zachry.jpg',
    attending: '3.2K going',
    friends: 9,
  },
  {
    id: 'volleyball',
    day: 'WED',
    date: '16',
    title: 'Aggie Volleyball vs Ole Miss',
    category: 'Athletics',
    node: 'tamu',
    when: '7:00 PM',
    venue: 'Reed Arena',
    img: '/img/reed-arena.jpg',
    attending: '2.6K going',
    friends: 3,
  },
  {
    id: 'yell',
    day: 'FRI',
    date: '18',
    title: 'Midnight Yell',
    category: 'Tradition',
    node: 'tamu',
    when: '11:59 PM',
    venue: 'Kyle Field',
    venueId: 'kyle-field',
    img: '/img/midnight-yell.jpg',
    attending: '18K going',
    friends: 31,
  },
]

export const CATEGORY_TONE: Record<Category, string> = {
  Athletics: 'text-maroon',
  'Student Life': 'text-soon-ink',
  Academic: 'text-bryan',
  Tradition: 'text-maroon-line',
  Arts: 'text-tint-purple-ink',
  Community: 'text-cstat',
}
