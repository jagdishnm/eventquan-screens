/**
 * The LSU wording layer: every Texas A&M phrase in the screens and the LSU phrase that replaces it
 * when a screen renders in the LSU skin (see `SkinCopy`). The screens stay written for Texas A&M.
 *
 * How it is applied:
 * - Longest phrase first, so "Kyle Field's Saturday" wins over "Kyle Field", and "Kyle Field" over "Kyle".
 * - In two phases: every match is first swapped for a placeholder, then every placeholder for its
 *   LSU phrase. Nothing written by one entry is ever matched by another, which is what makes the team
 *   swap safe: "A&M 21 · LSU 17" becomes "LSU 21 · A&M 17" and "A&M vs LSU" becomes "LSU vs A&M".
 * - Whole words only: an entry that starts or ends with a letter or digit never matches inside a word.
 * - Each entry is also applied in UPPER CASE ("KYLE FIELD" → "TIGER STADIUM") and with either
 *   apostrophe (' or ’), so neither needs listing twice.
 *
 * In the LSU skin LSU is the home team and Texas A&M is the visitor: the game reads "LSU vs Texas A&M"
 * at Tiger Stadium, and LSU leads 21–17 at the half because the A&M score is now LSU's.
 *
 * Traditions are mapped only to real LSU traditions, each with its source beside it. Where LSU has no
 * equivalent the wording goes neutral; nothing here is an invented tradition or invented lyric.
 */
export type Phrases = readonly (readonly [from: string, to: string])[]

export const LSU_PHRASES: Phrases = [
  // ─── The two teams ─────────────────────────────────────────────────────────────────────────────
  // Home and away trade places. Bare "A&M" means the home team and becomes LSU; bare "LSU" means the
  // visitor and becomes A&M. Longer forms keep the visitor's full name where there is room for it.
  ['Texas A&M University', 'Louisiana State University'],
  ['Texas A&M vs LSU', 'LSU vs Texas A&M'],
  ['Texas A&M 17, LSU 10', 'LSU 17, Texas A&M 10'],
  ['Texas A&M 21, LSU 17', 'LSU 21, Texas A&M 17'],
  ['Texas A&M vs Ole Miss', 'LSU vs Ole Miss'],
  ['Texas A&M', 'LSU'],
  ['A&M', 'LSU'],
  ['TAMU', 'LSU'],
  ['LSU', 'A&M'],
  ['Aggies host LSU', 'Tigers host Texas A&M'],
  ['@AggieFootball', '@LSUfootball'],
  ['Aggie Football', 'LSU Football'],
  ['Aggie Volleyball', 'LSU Volleyball'],
  ['Aggie Outdoors', 'LSU Outdoors'],
  ['A&M Maroon', 'LSU Purple'],

  // ─── People and greetings ──────────────────────────────────────────────────────────────────────
  ['One Aggie, one Saturday', 'One Tiger, one Saturday'],
  ['Aggie traditions', 'LSU traditions'],
  ['Aggie tradition', 'LSU tradition'],
  ['Aggies', 'Tigers'],
  ['Aggie', 'Tiger'],
  // A plain, everyday greeting; LSU has no campus-wide equivalent of "Howdy".
  ['Howdy Week', 'Welcome Week'], // LSU Welcome Week, the last phase of orientation: https://www.lsu.edu/welcomeweek/
  ['Howdy', 'Hey'],
  ['howdy', 'hey'],
  // "Geaux Tigers" is LSU's cheer for every sport: https://en.wikipedia.org/wiki/Louisiana_State_University_traditions
  ["Gig 'Em", 'Geaux Tigers'],
  ["Gig 'em", 'Geaux Tigers'],
  ["gig 'em", 'geaux tigers'],
  ['Whoop!', 'Geaux Tigers!'],

  // ─── The crowd: 12th Man → Death Valley ────────────────────────────────────────────────────────
  // LSU fans have no name for themselves the way the 12th Man is one; "Death Valley" (Tiger Stadium
  // and its night crowd) is what LSU calls the experience: https://www.lsu.edu/blog/2025/10/football-student-experience.php
  ['The 12th Man stands all four quarters, as it has since 1922.', 'Night games in Death Valley since 1931.'], // Night games since 1931: https://en.wikipedia.org/wiki/Louisiana_State_University_traditions
  ['The 12th Man is rocking Kyle Field.', 'Death Valley is rocking.'],
  ['Texas A&M · Home of the 12th Man', 'LSU · Saturday Night in Death Valley'],
  ['Home of the 12th Man', 'Death Valley'],
  ['The whole 12th Man', 'All of Death Valley'],
  ['and the 12th Man, live in one place', 'and game day, live in one place'],
  ['the 12th Man statue', "Mike's habitat"], // Mike the Tiger lives on North Stadium Drive, by Tiger Stadium.
  ['Join the 12th Man', 'Join the crowd'],
  ['12th Man Brunch', 'Gameday Brunch'],
  ['The 12th Man, live', 'Death Valley, live'],
  ['the 12th Man', 'Death Valley'],
  ['12th Man', 'Death Valley'],

  // ─── Places: the stadium and athletics ─────────────────────────────────────────────────────────
  ['Kyle Field, Reed Arena, Olsen Field and more', 'Tiger Stadium, the PMAC, Alex Box Stadium and more'],
  ['Kyle Field’s card stunt', 'A card stunt in Tiger Stadium'],
  ['First game at Kyle Field', 'First game in Tiger Stadium'],
  ['Kyle Field', 'Tiger Stadium'],
  ['SAT 7:12 PM · KYLE FIELD · EAST STANDS', 'SAT 7:12 PM · TIGER STADIUM · EAST'],
  ['Quad → Kyle Field', 'Down Victory Hill'],
  ['Quad → North End Zone', 'Victory Hill → North End Zone'],
  ['The Quad to Kyle', 'Victory Hill to the stadium'],
  ['Game night at Kyle', 'Game night in Death Valley'],
  ['at Kyle Field · half in 12 min', 'at Tiger Stadium · half 7:32'], // the longer name would wrap the line
  ['Today at Kyle Field', 'Today at Tiger Stadium'], // keeps "Today at Kyle" below from matching inside it
  ['Today at Kyle', 'Today in Death Valley'],
  ['Kyle', 'Tiger Stadium'],
  // Tiger Stadium's official capacity, 102,321 since the 2014 south end zone expansion:
  // https://www.wafb.com/story/26000505/lsus-tiger-stadium-capacity-officially-listed-at-102321/
  ['102,733', '102,321'],
  ['1927', '1924'], // Year opened: Kyle Field 1927, Tiger Stadium 1924 (https://en.wikipedia.org/wiki/Tiger_Stadium_(Louisiana))
  ['Reed Arena', 'PMAC'], // Pete Maravich Assembly Center
  ['Olsen Field', 'Alex Box Stadium'],
  ['Davis Diamond', 'Tiger Park'],
  ['Ellis Field', 'LSU Soccer Stadium'],
  ['Hall of Champions', 'Parade Ground'], // LSU's central tailgating lawn, north of the stadium.
  ['Zone Club', 'Club level'],
  ['Joe Routt Blvd', 'N Stadium Dr'],

  // ─── Places: campus ────────────────────────────────────────────────────────────────────────────
  ['Memorial Student Center', 'LSU Student Union'],
  ['the MSC', 'the Union'],
  ['MSC', 'Union'],
  ['Sbisa Dining Hall', 'The 5 Dining Hall'], // LSU's two dining halls are The 5 and the 459 Commons.
  ['Sbisa', 'The 5'],
  ['Stop: Commons', 'Stop: 459 Commons'],
  ['Evans Library', 'LSU Library'], // Interim name since Middleton was removed in 2020: https://lsureveille.com/210038/news/lsu-library-chosen-as-interim-name-for-main-library-at-lsu
  ['Rudder Auditorium', 'Union Theater'],
  ['Zachry', 'PFT'], // Patrick F. Taylor Hall, LSU engineering.
  ['ENGR 102', 'MATH 1550'],
  ['Academic Plaza', 'Memorial Tower'],
  ['Clayton W. Williams Jr. Alumni Center', 'LSU Student Union Theater'], // LSU Ring Ceremony venue: https://www.lsu.edu/student-affairs/lsu-ring.php

  // ─── Places: the city and its nodes (A&M · College Station · Bryan → LSU · Baton Rouge · Port Allen)
  // Port Allen faces Baton Rouge across the Mississippi, in its metro area: https://en.wikipedia.org/wiki/Port_Allen,_Louisiana
  ['Bryan / College Station', 'Baton Rouge'],
  ['Bryan–College Station', 'Baton Rouge'],
  ['ALL OF B–CS', 'ALL OF BATON ROUGE'],
  ['B–CS', 'Baton Rouge'],
  ['College Station, TX', 'Baton Rouge, LA'],
  // The node chip has room for about nine letters; "Red Stick" is the English of "Baton Rouge" and a local name for the city.
  ['College Stn', 'Red Stick'],
  ['College Station', 'Baton Rouge'],
  ['Downtown Bryan Market', 'Port Allen Market'],
  ['Downtown Bryan', 'Port Allen'],
  ['Main St, Bryan', 'Port Allen riverfront'], // Port Allen's Mississippi Riverfront park.
  ['Maroon Out on Main', 'Riverfront watch party'],
  ['Bryan', 'Port Allen'],
  ['bryan', 'port allen'],
  ['Grand Station Entertainment', 'All Star Lanes'], // Baton Rouge bowling centre on Airline Hwy.
  ['Grand Station', 'All Star Lanes'],
  ['Wellborn Rd', 'Nicholson Dr'],
  ['University Dr', 'Highland Rd'],
  ['George Bush Dr', 'Dalrymple Dr'],
  ['Texas Ave', 'Chimes St'],
  ['Houston', 'New Orleans'],
  // Northgate → Tigerland, the bar district just south of campus: https://www.explorelouisiana.com/nightlife/freds-bar
  ['Live on Northgate', 'Live in Tigerland'],
  ['The Backyard', 'Fred’s'], // Fred's Bar, Tigerland's best-known bar, since 1982: https://www.explorelouisiana.com/nightlife/freds-bar
  ['at Northgate', 'in Tigerland'],
  ['Northgate', 'Tigerland'],
  // Red Stick Farmers Market, Saturdays 8 AM to noon at 5th & Main: https://www.visitbatonrouge.com/blog/post/geaux-local-at-red-stick-farmers-market/
  ['Wolf Pen Creek Farmers Market', 'Red Stick Farmers Market'],
  // "Red Stick Market" keeps the event title to the length list rows have room for.
  ['Farmers Market', 'Red Stick Market'],
  ['WOLF PEN CREEK', 'LSU LAKES'], // the water on the campus map: University Lakes, beside campus
  ['Wolf Pen Creek', '5th & Main'],
  // No "Aggieland"-style nickname for Baton Rouge could be verified ("Tiger Town" could not), so the city's name stands in.
  ['The Spirit of Aggieland', 'The Alma Mater'],
  ['Aggieland in print', 'Baton Rouge in print'],
  ['Aggieland', 'Baton Rouge'],

  // ─── Accounts and money ────────────────────────────────────────────────────────────────────────
  ['A tamu.edu', 'An lsu.edu'],
  ['a tamu.edu', 'an lsu.edu'],
  ['tamu.edu', 'lsu.edu'],
  ['Texas A&M NetID', 'myLSU account'],
  ['NetID', 'myLSU'], // https://law.lsu.edu/its/mylsu-account/
  ['netid', 'mylsu'],
  ['Duo', 'MFA'], // LSU's sign-in uses its own multi-factor authentication; Duo is not documented for LSU.
  ['Aggie ID', 'Tiger Card'], // LSU's student ID: https://lsureveille.com/229115/uncategorized/tiger-card-boasts-expanded-services/
  ['Aggie Bucks', 'Paw Points'], // LSU Dining's declining balance, accepted at Tiger Stadium concessions.

  // ─── Food ──────────────────────────────────────────────────────────────────────────────────────
  ['Whataburger', 'Cane’s'], // Raising Cane's opened its first restaurant by LSU's north gate.
  ['Double meat, with fries', 'Chicken fingers, with fries'],
  ['Sausage Kolaches', 'Boudin Balls'], // Deep-fried boudin balls are a Baton Rouge tailgate staple: https://blog.ticketmaster.com/gameday-lsu-tigers/
  ['Two, Texas Czech style', 'Two, fried golden'],

  // ─── Brand colour ──────────────────────────────────────────────────────────────────────────────
  ['white Block T on maroon', 'white T on purple'],
  ['maroon', 'purple'],
  ['Maroon', 'Purple'],

  // ─── The band and the march: Corps March-In → the march down Victory Hill ──────────────────────
  // The Golden Band, Golden Girls, coaches and team walk down Victory Hill to Tiger Stadium before
  // every home game, playing the Pregame Salute: https://en.wikipedia.org/wiki/Louisiana_State_University_Tiger_Marching_Band
  [
    'The Corps of Cadets and the Fightin’ Texas Aggie Band march from the Quad into Kyle Field.',
    'The Golden Band from Tigerland marches down Victory Hill into Tiger Stadium, playing the Pregame Salute.',
  ],
  ['Fightin’ Texas Aggie Band', 'Golden Band from Tigerland'],
  ['Halftime first: the Aggie Band takes the field', 'Halftime first: the Golden Band and Golden Girls take the field'], // Golden Girls danceline, with the band since 1959.
  ['Aggie Band', 'Golden Band'],
  ['Corps March-In arrives', 'Victory Hill march arrives'],
  ['Corps March-In', 'Victory Hill march'],
  ['Corps march-in', 'Victory Hill march'],
  ['March-In at', 'Victory Hill at'],
  ['MARCH-IN', 'VICTORY HILL'],

  // ─── Songs: War Hymn → the LSU Alma Mater ──────────────────────────────────────────────────────
  // The Alma Mater is played pregame and after every home game; "Callin' Baton Rouge" plays before
  // each game: https://en.wikipedia.org/wiki/Louisiana_State_University_traditions
  ['In the War Hymn', 'Before kickoff'],
  ['War Hymn', 'Alma Mater'],
  ['Saw ’Em Off', 'Callin’ Baton Rouge'],
  ['Arms linked, the stands sway side to side and finish with the saw.', 'The Garth Brooks song plays and the whole stadium sings along.'],
  // The pregame show opens with a slow "Tiger Rag", played four times to salute each side of the
  // stadium: https://lsusports.net/news/2019/07/11/songs/
  ['The Yell Leaders call the first yells of the night. Watch for the sign, then hump it.', 'The Golden Band plays a slow Tiger Rag four times, once to each side of the stadium.'],
  ['Stamp Yell Practice', 'Stamp the pregame show'],
  ['Yell Practice', 'Pregame show'],

  // ─── Cheers: yells → LSU's own cheers ──────────────────────────────────────────────────────────
  // After a touchdown the band plays the "Hold that Tiger" phrase of Tiger Rag and the crowd spells
  // T-I-G-E-R-S; on first down fans answer "Geaux Tigers", on second down they spell L-S-U; "Tiger
  // Bandits" plays on a fourth-down stop and fans bow: https://en.wikipedia.org/wiki/Louisiana_State_University_traditions
  ['Farmers, farmers fight!', 'Tigers!'],
  ['Farmers fight!', 'Hold that Tiger!'],
  ['Fight! Fight!', 'T-I-G-E-R-S'],
  ['Farmers Fight', 'T-I-G-E-R-S'],
  ['Old Army', 'L-S-U'],
  ['Military', 'Tiger Bandits'],
  ['Thumbs up, fist closed', 'On first down'],
  ['Hump it, then yell', 'On second down'],
  ['Watch for the pass-back', 'Bow on a fourth-down stop'],
  ['Hump it when they pass back · then Gig ’Em', 'Spell L-S-U on second down · then Geaux Tigers'],
  ['The sign passes back row by row. Then hump it: lean forward, hands on your knees, and yell.', 'The band plays Hold that Tiger. Then the whole stadium spells it out: T-I-G-E-R-S.'],
  ['Lean forward, hands on your knees, then yell. Every Aggie in the stands does it together.', 'On second down the stands spell L-S-U, one letter at a time. Every Tiger in the stands does it together.'],
  ['Hump it · I’m yelling', 'I’m cheering along'],
  ['Hump it', 'Spell it out'],
  ['how to hump it', 'when to do it'],
  ['you’re yelling along', 'you’re cheering'],
  ['yelling along', 'cheering along'],
  ['current yell', 'current cheer'],
  ['Five students in white. Their hand signs call each yell before it starts.', 'They lead every cheer from the sideline, and the stands follow.'],
  ['· Yell Leaders', '· Cheerleaders'],
  ['Yell Leaders', 'cheerleaders'],
  ['Yells to know', 'Cheers to know'],
  ['Yell card', 'Cheer card'],
  ['yell card', 'cheer card'],

  // ─── Midnight Yell → a pep rally (neutral) ─────────────────────────────────────────────────────
  // LSU has no standing night-before-the-game tradition; it holds pep rallies (Homecoming, at the
  // Parade Ground or the PMAC), so the event keeps its time and becomes a plain "pep rally":
  // https://lsusports.net/news/2006/09/20/611496
  ['Yell practice the night before a home game. The whole 12th Man, Kyle Field, lights out at the end.', 'A pep rally the night before a home game, with the Golden Band and the cheerleaders. Lights out at the end.'],
  ['Kiss your date. No date? Hold up your phone light with everyone else.', 'Hold up your phone light with everyone else.'],
  ['We’ll tune Midnight Yell, Ring Day and Elephant Walk to your year.', 'We’ll tune pep rallies, the Ring Ceremony and Senior Night to your year.'],
  ['The next one, Midnight Yell, is', 'The next one, the pep rally, is'],
  ['Midnight Yell just filled in.', 'The pep rally just filled in.'],
  ['to Midnight Yell', 'to the pep rally'],
  ['at Midnight Yell', 'at the pep rally'],
  ['into Midnight Yell', 'into the pep rally'],
  ['then Midnight Yell', 'then the pep rally'],
  ['Save Midnight Yell', 'Save the pep rally'],
  ['Share Midnight Yell', 'Share the pep rally'],
  [': Midnight Yell in', ': the pep rally in'],
  ['Midnight Yell', 'Pep rally'],

  // ─── The other traditions on the ring ──────────────────────────────────────────────────────────
  ['Met Reveille', 'Met Mike the Tiger'], // LSU's live mascot, in his habitat on North Stadium Drive: https://en.wikipedia.org/wiki/Mike_the_Tiger
  ['Reveille', 'Mike the Tiger'],
  // Century Tree, Muster, Elephant Walk and Silver Taps have no LSU counterpart; each becomes a plain,
  // real campus moment (the Campus Mounds landmark, the spring football game, Senior Night, a vigil).
  ['Century Tree walk', 'Campus Mounds walk'],
  ['Century Tree', 'Campus Mounds'],
  ['Muster', 'Spring game'],
  ['Elephant Walk', 'Senior Night'],
  ['Silver Taps', 'Campus vigil'],
  // The Block T card stunt has no LSU version; it stays a card stunt, and the picture is just "the T".
  ['Block T card stunt', 'card stunt'],
  ['The Block T as it went up', 'The T as it went up'],
  ['Block T cards', 'stunt cards'],
  ['of 1,840 in the Block T', 'of 1,840 in the stunt'],
  ['in the Block T', 'in the card stunt'],
  ['the Block T', 'the card stunt'],
  ['Block T', 'card stunt'],

  // ─── The LSU Ring ──────────────────────────────────────────────────────────────────────────────
  // The LSU Ring is for undergraduates with 75 credit hours, presented at the LSU Ring Ceremony in the
  // Student Union Theater; no GPA rule is published: https://www.lsu.edu/student-affairs/lsu-ring.php
  ['Aggie Ring', 'LSU Ring'],
  ['Expected Ring Day', 'Expected Ring Ceremony'],
  ['Ring Day', 'Ring Ceremony'],
  ['74 of 90 hours · 16 to go', '74 of 75 hours · 1 to go'],
  ['74 of 90 credit hours', '74 of 75 credit hours'],
  ['74 of 90 hours', '74 of 75 hours'],
  ['of 90 hours', 'of 75 hours'],
  ['16 to go', '1 to go'],
  ['You’re at 3.41', 'Enrolled this fall'],
  ['90 credit hours', '75 credit hours'],
  ['90 · eligible', '75 · eligible'],
  ['At 90 hours', 'At 75 hours'],
  ['All 74 are A&M hours · the minimum is met', 'All 74 earned at LSU'],
  ['2.0 cumulative A&M GPA', 'Currently enrolled at LSU'],
  ['by The Association of Former Students', 'by the LSU Ring office'],

  // ─── The program page's history essay: E. King Gill, 1922 → the Earthquake Game, 1988 ──────────
  // On Oct. 8, 1988 the crowd's roar at Hodson's winning touchdown to Eddie Fuller against Auburn
  // registered on the seismograph in LSU's Howe-Russell Geoscience Complex: https://en.wikipedia.org/wiki/Earthquake_Game
  [
    'On Jan. 2, 1922, short on players against Centre College, Coach Dana X. Bible called E. King Gill down from the press box to suit up. He stood ready on the sideline all game. Aggies have stood ever since.',
    'On Oct. 8, 1988, Tommy Hodson found Eddie Fuller for the winning touchdown against Auburn. The roar registered on the seismograph across campus. Tigers have called it the Earthquake Game ever since.',
  ],
  ['The venue as a program page: E. King Gill and 1922,', 'The venue as a program page: the 1988 Earthquake Game,'],
  ['Since 1922', 'The Earthquake Game'],
  ['Man, standing', 'Earthquake'],
  ['12th', '1988'],
]
