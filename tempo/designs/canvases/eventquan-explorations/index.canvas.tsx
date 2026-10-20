import { Canvas, Storyboard } from 'tempo-sdk/canvas'
import {
  ExplorationNotes,
  GameDayScoreboardScreen,
  EventFinderMapScreen,
  HomeDayPlanScreen,
  PlaceSheetScreen,
  QuickEventThreadScreen,
} from './Screens'

export default function EventquanExplorationsCanvas() {
  return (
    <Canvas name="EventQuan explorations" backgroundColor="#232323">
      <Storyboard id="notes" name="Five more directions · notes" component={ExplorationNotes} layout={{ x: 0, y: 0 }} />
      <Storyboard
        id="a-home-day-plan"
        name="A · University Home — Your Saturday"
        component={HomeDayPlanScreen}
        layout={{ x: 620, y: 0 }}
      />
      <Storyboard
        id="b-events-map"
        name="B · EventFinder — Map view"
        component={EventFinderMapScreen}
        layout={{ x: 1073, y: 0 }}
      />
      <Storyboard
        id="c-kyle-field-sheet"
        name="C · Campus node — Sheet over map"
        component={PlaceSheetScreen}
        layout={{ x: 1526, y: 0 }}
      />
      <Storyboard
        id="d-gameday-scoreboard"
        name="D · Game day — Scoreboard first"
        component={GameDayScoreboardScreen}
        layout={{ x: 1979, y: 0 }}
      />
      <Storyboard
        id="e-quick-event-thread"
        name="E · Quick Event — In the group chat"
        component={QuickEventThreadScreen}
        layout={{ x: 2432, y: 0 }}
      />
    </Canvas>
  )
}
