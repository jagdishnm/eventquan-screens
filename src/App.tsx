import type { ReactNode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Device } from './components/Device'
import { Title } from './components/Title'
import { Pitch } from './pitch/Pitch'
import { EventFinder } from './screens/EventFinder'
import { GameDay } from './screens/GameDay'
import { Home } from './screens/Home'
import { Journey } from './screens/Journey'
import { PlaceDetail } from './screens/PlaceDetail'
import { QuickEvent } from './screens/QuickEvent'
import { WelcomeCampus, WelcomeEmail } from './screens/Welcome'

const screen = (name: string, node: ReactNode, bg?: string) => (
  <Title name={name}>
    <Device bg={bg}>{node}</Device>
  </Title>
)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={screen('Texas A&M Home', <Home />)} />
      <Route path="/events" element={screen('Texas A&M Events', <EventFinder />)} />
      <Route path="/places/kyle-field" element={screen('Kyle Field', <PlaceDetail />)} />
      <Route path="/gameday" element={screen('Game day: A&M vs LSU', <GameDay />, 'bg-night')} />
      <Route path="/quick-event" element={screen('Quick Event', <QuickEvent />)} />
      <Route
        path="/journey"
        element={
          <Title name="One Aggie, one Saturday">
            <Journey />
          </Title>
        }
      />
      <Route
        path="/pitch"
        element={
          <Title name="Texas A&M production screens">
            <Pitch />
          </Title>
        }
      />
      <Route path="/welcome" element={screen('Sign in', <WelcomeEmail />, 'bg-[#0d0e12]')} />
      <Route path="/welcome/campus" element={screen('Welcome, Aggie', <WelcomeCampus />, 'bg-[#0d0e12]')} />
    </Routes>
  )
}
