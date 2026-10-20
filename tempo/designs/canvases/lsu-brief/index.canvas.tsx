import { Canvas, Storyboard } from 'tempo-sdk/canvas'
import {
  EventFinderScreen,
  GameDayScreen,
  HomeScreen,
  JourneyBoard,
  KyleFieldScreen,
  QuickEventScreen,
  SignInScreen,
} from './Screens'

export default function EventquanBriefDeliverablesLsuCanvas() {
  return (
    <Canvas name="LSU brief" backgroundColor="#232323">
      <Storyboard id="01-sign-in" name="1 · Sign in / first run" component={SignInScreen} layout={{ x: 0, y: 0 }} />
      <Storyboard id="02-home" name="2 · University Home" component={HomeScreen} layout={{ x: 507, y: 0 }} />
      <Storyboard id="03-events" name="3 · EventFinder" component={EventFinderScreen} layout={{ x: 1014, y: 0 }} />
      <Storyboard
        id="04-place"
        name="4 · Campus node — Kyle Field"
        component={KyleFieldScreen}
        layout={{ x: 1521, y: 0 }}
      />
      <Storyboard id="05-gameday" name="5 · Game day" component={GameDayScreen} layout={{ x: 2028, y: 0 }} />
      <Storyboard id="06-quick-event" name="6 · Quick Event" component={QuickEventScreen} layout={{ x: 2535, y: 0 }} />
      <Storyboard
        id="00-journey"
        name="Assembled journey · all six screens"
        component={JourneyBoard}
        layout={{ x: 0, y: 972 }}
      />
    </Canvas>
  )
}
