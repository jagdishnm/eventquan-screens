import {
  Bus,
  CalendarClock,
  CalendarDays,
  Grid2x2,
  IdCard,
  Map,
  MessageCircle,
  Plus,
  ShieldCheck,
  Trophy,
  Users,
  Utensils,
} from 'lucide-react'
import type { TileProps } from '../components/Tile'

/** The founder's twelve Home tiles, in his order. Shared by Home and its explorations. */
export const TILES: TileProps[] = [
  // Only tiles with something live right now carry a status line, so the live ones stand out.
  { label: 'Class Schedule', Icon: CalendarClock, tint: 'blue' },
  { label: 'Campus Map', Icon: Map, tint: 'green', status: '4 on now', statusTone: 'live', to: '/places/kyle-field' },
  { label: 'Dining', Icon: Utensils, tint: 'amber', status: 'Sbisa open', statusTone: 'ok' },
  { label: 'Transit', Icon: Bus, tint: 'indigo', status: 'Rt 40 · 12 min' },
  { label: 'Events', Icon: CalendarDays, tint: 'red', to: '/events' },
  { label: 'Organizations', Icon: Users, tint: 'purple' },
  { label: 'Athletics', Icon: Trophy, emphasis: 'solid', status: 'Kickoff 6 PM', flag: 'GAMEDAY', to: '/gameday' },
  { label: 'Safety', Icon: ShieldCheck, tint: 'teal' },
  { label: 'Quick Event', Icon: Plus, emphasis: 'outline', to: '/quick-event' },
  { label: 'Messages', Icon: MessageCircle, tint: 'sky' },
  { label: 'Aggie ID', Icon: IdCard, tint: 'maroon' },
  { label: 'More', Icon: Grid2x2, tint: 'neutral' },
]
