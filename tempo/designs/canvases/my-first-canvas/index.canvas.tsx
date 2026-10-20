import { Canvas, RouteStoryboard } from "tempo-sdk/canvas";

export default function GenerationCanvas() {
  return (
    <Canvas name="My first canvas" backgroundColor="#1b1b1f">
      {/* Row 1 — the six deliverable screens, in journey order (first run → create). */}
      <RouteStoryboard
        id="01a-sign-in-email"
        name="1a · Sign in — school email"
        route="/welcome"
        layout={{ x: 0, y: 0, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="01-sign-in"
        name="1 · Sign in — campus identified"
        route="/welcome/campus"
        layout={{ x: 513, y: 0, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="02-home"
        name="2 · University Home"
        route="/"
        layout={{ x: 1026, y: 0, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="03-events"
        name="3 · EventFinder"
        route="/events"
        layout={{ x: 1539, y: 0, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="04-place"
        name="4 · Campus node — Kyle Field"
        route="/places/kyle-field"
        layout={{ x: 2052, y: 0, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="05-gameday"
        name="5 · Game day — in the stadium"
        route="/gameday"
        layout={{ x: 2565, y: 0, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="06-quick-event"
        name="6 · Quick Event"
        route="/quick-event"
        layout={{ x: 3078, y: 0, width: 393, height: 852 }}
      />

      {/* Row 2 — edge states, each directly under the screen it belongs to. */}
      <RouteStoryboard
        id="08-state-sign-in-not-found"
        name="State · Sign in, campus not found"
        route="/welcome?email=jordan.carter@gmail.com"
        layout={{ x: 0, y: 972, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="11-state-kyle-field-quiet"
        name="State · Kyle Field, nothing on"
        route="/places/kyle-field?quiet=1"
        layout={{ x: 2052, y: 972, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="09-state-quick-event-empty"
        name="State · Quick Event, empty"
        route="/quick-event?empty=1"
        layout={{ x: 3078, y: 972, width: 393, height: 852 }}
      />
      <RouteStoryboard
        id="10-state-quick-event-posted"
        name="State · Quick Event, posted"
        route="/quick-event?posted=1"
        layout={{ x: 3591, y: 972, width: 393, height: 852 }}
      />

      {/* Row 3 — the assembled journey deliverable, then the pitch page. */}
      <RouteStoryboard
        id="00-journey"
        name="Assembled journey · all six screens"
        route="/journey"
        layout={{ x: 0, y: 1944, width: 2930, height: 1680 }}
      />
      <RouteStoryboard
        id="07-pitch-page"
        name="Pitch page · gameday program"
        route="/pitch"
        layout={{ x: 3050, y: 1944, width: 1440, height: 1600 }}
      />
    </Canvas>
  );
}
