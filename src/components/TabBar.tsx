import { CalendarDays, House, MapPin, MessageCircle, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'

export type TabKey = 'home' | 'events' | 'map' | 'messages' | 'profile'

const TABS: { key: TabKey; label: string; to: string; Icon: typeof House; badge?: number }[] = [
  { key: 'home', label: 'Home', to: '/', Icon: House },
  { key: 'events', label: 'Events', to: '/events', Icon: CalendarDays },
  { key: 'map', label: 'Map', to: '/places/kyle-field', Icon: MapPin },
  { key: 'messages', label: 'Messages', to: '/', Icon: MessageCircle, badge: 3 },
  { key: 'profile', label: 'Profile', to: '/', Icon: UserRound },
]

/** The fixed five-item tab bar. Identical on every signed-in screen — never re-ordered, never re-skinned. */
export function TabBar({ active }: { active: TabKey }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 border-t border-black/[0.06] bg-white/[0.94] backdrop-blur-xl">
      <ul className="flex h-[50px] items-stretch px-2">
        {TABS.map(({ key, label, to, Icon, badge }) => {
          const on = key === active
          return (
            <li key={key} className="flex-1">
              <Link
                to={to}
                aria-current={on ? 'page' : undefined}
                aria-label={badge ? `${label}, ${badge} unread` : undefined}
                className={`relative flex h-full flex-col items-center justify-center gap-[3px] pt-1 text-[10px] font-medium tracking-[0.1px] ${
                  on ? 'text-maroon' : 'text-ink-3'
                }`}
              >
                <span className="relative">
                  <Icon
                    size={23}
                    strokeWidth={on ? 2.3 : 1.8}
                    fill={on ? 'currentColor' : 'none'}
                    fillOpacity={on ? 0.14 : 0}
                  />
                  {badge ? (
                    <span className="absolute -right-[9px] -top-[4px] grid h-[16px] min-w-[16px] place-items-center rounded-full bg-live-strong px-1 text-[10px] font-bold text-white ring-2 ring-white">
                      {badge}
                    </span>
                  ) : null}
                </span>
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="relative h-[34px]">
        <div className="absolute bottom-[8px] left-1/2 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </nav>
  )
}
