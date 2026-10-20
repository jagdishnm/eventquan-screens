import { Canvas, Storyboard } from 'tempo-sdk/canvas'
import {
  ConceptNotes,
  Day1,
  Day2,
  Day3,
  Day4,
  Day5,
  Day6,
  DayStateLocation,
  DayStateOffline,
  DayStateQuiet,
  DayStateSignInError,
  JourneyDay,
  JourneyLive,
  JourneyMap,
  JourneyPrint,
  Live1,
  Live2,
  Live3,
  Live4,
  Live5,
  Live6,
  LiveStateLocation,
  LiveStateOffline,
  LiveStateQuiet,
  LiveStateSignInError,
  Map1,
  Map2,
  Map3,
  Map4,
  Map5,
  Map6,
  MapStateLocation,
  MapStateOffline,
  MapStateQuiet,
  MapStateSignInError,
  Print1,
  Print2,
  Print3,
  Print4,
  Print5,
  Print6,
  Print7,
  PrintStateLocation,
  PrintStateOffline,
  PrintStateQuiet,
  PrintStateSignInError,
} from './Screens'

/**
 * LSU skin of the tamu-concepts canvas: the same screens in LSU purple and gold with the LSU logo.
 *
 * Four whole-app concepts, one row each: every brief stage (Sign in to Quick Event, plus Profile in
 * concept 4) in that concept's own layout, with its assembled journey underneath. Notes on the left.
 */
export default function EventquanExplorationsLsuCanvas() {
  return (
    <Canvas name="LSU concepts" backgroundColor="#232323">
      <Storyboard
        id="concept-notes"
        name="Four whole-app concepts · notes"
        component={ConceptNotes}
        layout={{ x: -680, y: 0 }}
      />
      {/* Concept 1 · The Day: all six brief stages in its own treatment, then its journey */}
      <Storyboard id="day-1" name="1 The Day · 1 Sign in — The night before" component={Day1} layout={{ x: 0, y: 0 }} />
      <Storyboard
        id="day-2"
        name="1 The Day · 2 University Home — The straw"
        component={Day2}
        layout={{ x: 507, y: 0 }}
      />
      <Storyboard
        id="day-3"
        name="1 The Day · 3 EventFinder — Your whole Saturday"
        component={Day3}
        layout={{ x: 1014, y: 0 }}
      />
      <Storyboard
        id="day-4"
        name="1 The Day · 4 Campus node · Kyle Field — Kyle Field's Saturday"
        component={Day4}
        layout={{ x: 1521, y: 0 }}
      />
      <Storyboard
        id="day-5"
        name="1 The Day · 5 Game day — The game clock"
        component={Day5}
        layout={{ x: 2028, y: 0 }}
      />
      <Storyboard
        id="day-6"
        name="1 The Day · 6 Quick Event — Find the gap"
        component={Day6}
        layout={{ x: 2535, y: 0 }}
      />
      <Storyboard
        id="day-journey"
        name="1 The Day · Assembled journey"
        component={JourneyDay}
        layout={{ x: 0, y: 972 }}
      />
      {/* Concept 2 · The Map: all six brief stages in its own treatment, then its journey */}
      <Storyboard
        id="map-1"
        name="2 The Map · 1 Sign in — The map finds your campus"
        component={Map1}
        layout={{ x: 0, y: 3400 }}
      />
      <Storyboard
        id="map-2"
        name="2 The Map · 2 University Home — Howdy, on the map"
        component={Map2}
        layout={{ x: 507, y: 3400 }}
      />
      <Storyboard
        id="map-3"
        name="2 The Map · 3 EventFinder — Every event, pinned"
        component={Map3}
        layout={{ x: 1014, y: 3400 }}
      />
      <Storyboard
        id="map-4"
        name="2 The Map · 4 Campus node · Kyle Field — Kyle Field, over the map"
        component={Map4}
        layout={{ x: 1521, y: 3400 }}
      />
      <Storyboard
        id="map-5"
        name="2 The Map · 5 Game day — The bowl is the map"
        component={Map5}
        layout={{ x: 2028, y: 3400 }}
      />
      <Storyboard
        id="map-6"
        name="2 The Map · 6 Quick Event — Drop a pin"
        component={Map6}
        layout={{ x: 2535, y: 3400 }}
      />
      <Storyboard
        id="map-journey"
        name="2 The Map · Assembled journey"
        component={JourneyMap}
        layout={{ x: 0, y: 4372 }}
      />
      {/* Concept 3 · The 12th Man, live: all six brief stages in its own treatment, then its journey */}
      <Storyboard
        id="live-1"
        name="3 The 12th Man, live · 1 Sign in — Join the crowd"
        component={Live1}
        layout={{ x: 0, y: 6800 }}
      />
      <Storyboard
        id="live-2"
        name="3 The 12th Man, live · 2 University Home — Where everyone is"
        component={Live2}
        layout={{ x: 507, y: 6800 }}
      />
      <Storyboard
        id="live-3"
        name="3 The 12th Man, live · 3 EventFinder — Momentum"
        component={Live3}
        layout={{ x: 1014, y: 6800 }}
      />
      <Storyboard
        id="live-4"
        name="3 The 12th Man, live · 4 Campus node · Kyle Field — Kyle Field, filling"
        component={Live4}
        layout={{ x: 1521, y: 6800 }}
      />
      <Storyboard
        id="live-5"
        name="3 The 12th Man, live · 5 Game day — The card stunt"
        component={Live5}
        layout={{ x: 2028, y: 6800 }}
      />
      <Storyboard
        id="live-6"
        name="3 The 12th Man, live · 6 Quick Event — The group chat"
        component={Live6}
        layout={{ x: 2535, y: 6800 }}
      />
      <Storyboard
        id="live-journey"
        name="3 The 12th Man, live · Assembled journey"
        component={JourneyLive}
        layout={{ x: 0, y: 7772 }}
      />
      {/* Concept 4 · Aggieland in print: all six brief stages in its own treatment, then its journey */}
      <Storyboard
        id="print-1"
        name="4 Aggieland in print · 1 Sign in — Howdy, the cover"
        component={Print1}
        layout={{ x: 0, y: 10200 }}
      />
      <Storyboard
        id="print-2"
        name="4 Aggieland in print · 2 University Home — The Saturday Sheet"
        component={Print2}
        layout={{ x: 507, y: 10200 }}
      />
      <Storyboard
        id="print-3"
        name="4 Aggieland in print · 3 EventFinder — The MSC board"
        component={Print3}
        layout={{ x: 1014, y: 10200 }}
      />
      <Storyboard
        id="print-4"
        name="4 Aggieland in print · 4 Campus node · Kyle Field — Kyle Field, page 4"
        component={Print4}
        layout={{ x: 1521, y: 10200 }}
      />
      <Storyboard
        id="print-5"
        name="4 Aggieland in print · 5 Game day — The yell card"
        component={Print5}
        layout={{ x: 2028, y: 10200 }}
      />
      <Storyboard
        id="print-6"
        name="4 Aggieland in print · 6 Quick Event — Tear-off flyer"
        component={Print6}
        layout={{ x: 2535, y: 10200 }}
      />
      <Storyboard
        id="print-7"
        name="4 Aggieland in print · 7 Profile — The Aggie Ring"
        component={Print7}
        layout={{ x: 3042, y: 10200 }}
      />
      <Storyboard
        id="print-journey"
        name="4 Aggieland in print · Assembled journey"
        component={JourneyPrint}
        layout={{ x: 0, y: 11172 }}
      />
      {/* Each concept meets the real world: error, permission, offline and empty states beside its row */}
      <Storyboard
        id="day-state-sign-in-error"
        name="1 The Day · State — Wrong email"
        component={DayStateSignInError}
        layout={{ x: 3700, y: 0 }}
      />
      <Storyboard
        id="day-state-location"
        name="1 The Day · State — Before the location prompt"
        component={DayStateLocation}
        layout={{ x: 4207, y: 0 }}
      />
      <Storyboard
        id="day-state-offline"
        name="1 The Day · State — No signal at Kyle Field"
        component={DayStateOffline}
        layout={{ x: 4714, y: 0 }}
      />
      <Storyboard
        id="day-state-quiet"
        name="1 The Day · State — A quiet Tuesday"
        component={DayStateQuiet}
        layout={{ x: 5221, y: 0 }}
      />
      <Storyboard
        id="map-state-sign-in-error"
        name="2 The Map · State — Wrong email"
        component={MapStateSignInError}
        layout={{ x: 3700, y: 3400 }}
      />
      <Storyboard
        id="map-state-location"
        name="2 The Map · State — Before the location prompt"
        component={MapStateLocation}
        layout={{ x: 4207, y: 3400 }}
      />
      <Storyboard
        id="map-state-offline"
        name="2 The Map · State — No signal at Kyle Field"
        component={MapStateOffline}
        layout={{ x: 4714, y: 3400 }}
      />
      <Storyboard
        id="map-state-quiet"
        name="2 The Map · State — A quiet Tuesday"
        component={MapStateQuiet}
        layout={{ x: 5221, y: 3400 }}
      />
      <Storyboard
        id="live-state-sign-in-error"
        name="3 The 12th Man, live · State — Wrong email"
        component={LiveStateSignInError}
        layout={{ x: 3700, y: 6800 }}
      />
      <Storyboard
        id="live-state-location"
        name="3 The 12th Man, live · State — Before the location prompt"
        component={LiveStateLocation}
        layout={{ x: 4207, y: 6800 }}
      />
      <Storyboard
        id="live-state-offline"
        name="3 The 12th Man, live · State — No signal at Kyle Field"
        component={LiveStateOffline}
        layout={{ x: 4714, y: 6800 }}
      />
      <Storyboard
        id="live-state-quiet"
        name="3 The 12th Man, live · State — A quiet Tuesday"
        component={LiveStateQuiet}
        layout={{ x: 5221, y: 6800 }}
      />
      <Storyboard
        id="print-state-sign-in-error"
        name="4 Aggieland in print · State — Wrong email"
        component={PrintStateSignInError}
        layout={{ x: 3700, y: 10200 }}
      />
      <Storyboard
        id="print-state-location"
        name="4 Aggieland in print · State — Before the location prompt"
        component={PrintStateLocation}
        layout={{ x: 4207, y: 10200 }}
      />
      <Storyboard
        id="print-state-offline"
        name="4 Aggieland in print · State — No signal at Kyle Field"
        component={PrintStateOffline}
        layout={{ x: 4714, y: 10200 }}
      />
      <Storyboard
        id="print-state-quiet"
        name="4 Aggieland in print · State — A quiet Tuesday"
        component={PrintStateQuiet}
        layout={{ x: 5221, y: 10200 }}
      />
    </Canvas>
  )
}
