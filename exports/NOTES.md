# EventQuan × Texas A&M: notes on the six screens

PNGs are 1179×2556, which is iPhone 15 Pro native at 3×. The assembled view is `00-journey-all-six.png`. `eventquan-walkthrough.mp4` is a 40-second screen recording of the whole journey, so the motion can be seen. `00-pitch-page.png` is the pitch page (live at `/pitch`, works from phone to desktop). Re-export with `pnpm export http://localhost:<port>` and re-record with `pnpm record http://localhost:<port>`.

## Journey order
1. **Sign in (new).** A `tamu.edu` email identifies the campus, and the maroon skin replaces the neutral EventQuan look. The "lens" toggles add the College Station and Bryan nodes. `01a` shows the pre-skin email step.
2. **University Home (elevated).** The tension in the brief is handled by putting a "Right now" strip above his grid: Gameday → Game Mode, Sbisa → Order Now, Route 40 → Track Bus. That strip is his Context Flow running as a carousel. All twelve tiles stay, and each one now shows live state (Sbisa open, Rt 40 · 12 min, GAMEDAY, All clear, 3 unread).
3. **EventFinder (elevated).** His chips plus Today and This Week. The LSU game leads as a ticket-stub card split in maroon and LSU purple, with a countdown to kickoff. Pin colour shows the node. An off-campus event carries a green College Station tag, and the lens in the header sets which nodes feed the list.
4. **Campus node: Kyle Field (new).** The hero shows the venue's crowd across the day as a gold curve, solid for what has happened and dashed for the forecast (2,140 now, 102K by kickoff). The day's events are plotted on it (brunch live in red, tailgate next in gold, then March-In and kickoff), so the chart reads as events, not venue stats. Event first: tonight's game is the anchor card, followed by a live "Today at Kyle Field" timeline. Node second: what's inside (gate wait, concessions, accessibility), then the parent node and nearby nodes.
5. **Game day (elevated).** I picked the in-stadium view. The body goes dark, there's a live score with a drive tracker, and the app knows your seat. "Order to Seat" is the gold action, and his "Tickets / Access" sits beside it. His eight tools each show live data.
6. **Quick Event (new).** This is a composer, not a form. You type one line, for example "Post-game bowling at Grand Station tonight 9:30". The time and place get highlighted as you type, it checks against the LSU game ("Clear… ends ~9:15 PM"), it picks the node, and it surfaces a venue offer. There are one-tap starters, invite crews, a preview of how the event will look, then Post. The free tier is "up to 50 guests", with "Go Plus" for ticketed events. The parser is live in the prototype, so it updates as you type.

## Accessibility and consistency pass
- Secondary text darkened to #6b6b74 (5.3:1 on white, 4.7:1 on the grey body) and the "open" green to #178048 (5.0:1).
- No status text under 11px. Tab bar labels stay at iOS's standard 10pt.
- Header icon buttons, the bookmark, the audience menu and the chips all have 44pt tap areas.
- One live badge component (tinted on light cards, solid over photos and dark screens), one header button component, and card corners on 14 / 18 / 22.
- One gold action per screen. Home's Quick Event tile is now outlined in gold instead of filled.

## Copy pass and extra states
- No internal vocabulary in the app: "Your lens" is now **Events from**, and Kyle Field's parent card reads **Texas A&M Athletics** instead of "Parent node · Athletics module".
- One count and one verb everywhere: **4 happening now** (Home, Campus Map tile, EventFinder), **going** for upcoming and **here** for live.
- Sign-in CTA is **Find my campus**. Quick Event's time check says **Starts after the game**, and a clash offers a one-tap **Try 9:30?** fix.
- Four new states, each its own PNG (08–11) and canvas frame: sign-in campus not found, Quick Event empty, Quick Event posted, Kyle Field with nothing on.

## Accessibility (WCAG 2.1 AA)
axe-core reports no violations on any screen, state or the pitch page. The one remaining flag is a known false positive: axe reads the white 9:41 status bar against the grey body, but it sits on the maroon header at 15.7:1.
- Contrast: avatar colours ≥4.7:1, solid red badges moved to #d42a25 (5.05:1), past timeline items readable with a "Done" tag.
- Keyboard: two-tone focus ring (gold + maroon) visible on every surface; no buttons nested in links; 44pt tap areas on chips and switches.
- Posted sheet is a real modal: focus moves in, the composer behind goes inert, Escape closes it and returns focus to Post.
- Screen readers: toggle chips announce selected state, sign-in switches are switches, the score is in a live region, decorative chrome is hidden, every screen has its own page title, one h1 and a main landmark.
- Pitch page: embedded phones are pictures with a description (not tab stops), and the walkthrough video has a pause button and doesn't autoplay with reduced motion.
- Reflow: screens fit a 320px viewport with no sideways scroll.
Still worth a manual VoiceOver pass on a real device before handoff.

## Decisions to check with Troy
- **Tab bar** is pixel-identical on every signed-in screen, game day included, where a light tab bar sits under the dark body. Sign in has no tab bar because the user isn't in the app yet.
- **Logos.** The A&M and LSU marks are type-only stand-ins, not the licensed logos.
- **Dates** follow his board (Sat, Oct 12, 6:00 PM). Scores, crowd counts and wait times are illustrative. No real player names are used.
- **Photos** are Wikimedia Commons campus images. Sources are in `public/img/CREDITS.md`, and licences need checking before anything goes public.

## Left out / with more time
- Messages and Profile tabs are not designed (those taps go to Home).
- I'd add a full campus map view with the live pins, since Kyle Field is currently reached from the map tab directly.
- Quick Event: the post-confirmation state ("Posted. 6 invited · group chat created"), and the RSVP view your crew sees.
- Interest picker as step 3 of first run (the dots show 3 steps).
- Game day pre-game state (countdown, parking pass, gate wait) as the companion to the in-game view.
