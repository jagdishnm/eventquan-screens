import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { EventFinder } from '../../../../src/screens/EventFinder'
import { GameDay } from '../../../../src/screens/GameDay'
import { Home } from '../../../../src/screens/Home'
import { Journey } from '../../../../src/screens/Journey'
import { PlaceDetail } from '../../../../src/screens/PlaceDetail'
import { QuickEvent } from '../../../../src/screens/QuickEvent'
import { WelcomeCampus } from '../../../../src/screens/Welcome'

/*
 * Canvas-only wrappers: each renders the real production screen inside a router at its own
 * path, sized to the phone (or the journey board). Component storyboards use Tempo's
 * component render pool instead of the much smaller route pool.
 */
function Frame({ path, width, height, children }: { path: string; width: number; height: number; children: ReactNode }) {
  return (
    <div style={{ width, height }} className="overflow-hidden">
      <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
    </div>
  )
}

const phone = (path: string, screen: ReactNode) => (
  <Frame path={path} width={393} height={852}>
    {screen}
  </Frame>
)

export const SignInScreen = () => phone('/welcome/campus', <WelcomeCampus />)
export const HomeScreen = () => phone('/', <Home />)
export const EventFinderScreen = () => phone('/events', <EventFinder />)
export const KyleFieldScreen = () => phone('/places/kyle-field', <PlaceDetail />)
export const GameDayScreen = () => phone('/gameday', <GameDay />)
export const QuickEventScreen = () => phone('/quick-event', <QuickEvent />)

export const JourneyBoard = () => (
  <Frame path="/journey" width={2930} height={1680}>
    <Journey />
  </Frame>
)
