import type { ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Device } from './components/Device'
import { SkinFrame, skinFromSearch } from './components/Skin'
import { Title } from './components/Title'
import { EventFinderMap } from './explorations/EventFinderMap'
import { JourneyRoute } from './explorations/JourneyRoute'
import { ConceptJourneyRoute, ConceptScreenRoute, ConceptStateRoute } from './explorations/concepts/ConceptRoute'
import { FlowRoute } from './explorations/flows/FlowRoute'
import { GameDayCardStunt } from './explorations/GameDayCardStunt'
import { GameDayScoreboard } from './explorations/GameDayScoreboard'
import { HomeDayPlan } from './explorations/HomeDayPlan'
import { HomeStraw } from './explorations/HomeStraw'
import { PlaceSheet } from './explorations/PlaceSheet'
import { ProfileTraditions } from './explorations/ProfileTraditions'
import { QuickEventFlyer } from './explorations/QuickEventFlyer'
import { QuickEventThread } from './explorations/QuickEventThread'
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
  const { search } = useLocation()
  return (
    <SkinFrame skin={skinFromSearch(search)} className="contents">
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
        <Route path="/explore/home-day-plan" element={screen('Exploration: Your Saturday', <HomeDayPlan />)} />
        <Route path="/explore/events-map" element={screen('Exploration: Events on the map', <EventFinderMap />)} />
        <Route path="/explore/kyle-field-sheet" element={screen('Exploration: Kyle Field sheet', <PlaceSheet />)} />
        <Route
          path="/explore/gameday-scoreboard"
          element={screen('Exploration: Game day scoreboard', <GameDayScoreboard />, 'bg-night')}
        />
        <Route
          path="/explore/quick-event-thread"
          element={screen('Exploration: Quick Event in chat', <QuickEventThread />)}
        />
        <Route path="/explore/home-straw" element={screen('Exploration: The straw', <HomeStraw />)} />
        <Route
          path="/explore/gameday-card-stunt"
          element={screen('Exploration: Block T card stunt', <GameDayCardStunt />, 'bg-night')}
        />
        <Route path="/explore/quick-event-flyer" element={screen('Exploration: Tear-off flyer', <QuickEventFlyer />)} />
        <Route
          path="/explore/profile-traditions"
          element={screen('Exploration: Aggie traditions', <ProfileTraditions />)}
        />
        <Route path="/explore/flow/:id" element={<FlowRoute />} />
        <Route path="/explore/journey/:letter" element={<JourneyRoute />} />
        <Route path="/explore/concept/:key" element={<ConceptJourneyRoute />} />
        <Route path="/explore/concept/:key/:n" element={<ConceptScreenRoute />} />
        <Route path="/explore/concept/:key/state/:state" element={<ConceptStateRoute />} />
        <Route path="/welcome" element={screen('Sign in', <WelcomeEmail />, 'bg-[#0d0e12]')} />
        <Route path="/welcome/campus" element={screen('Welcome, Aggie', <WelcomeCampus />, 'bg-[#0d0e12]')} />
      </Routes>
    </SkinFrame>
  )
}
