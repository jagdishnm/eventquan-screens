#!/usr/bin/env bash
# Export every screen at iPhone 15 Pro native resolution (1179×2556) plus the assembled journey.
# Usage: scripts/export-pngs.sh http://localhost:5173
set -euo pipefail
BASE="${1:?pass the running app URL, e.g. http://localhost:5173}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/exports"
PROFILE="$(mktemp -d)"
mkdir -p "$OUT"

shot() { # route name scale width,height
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$PROFILE" \
    --force-device-scale-factor="$3" --window-size="$4" --virtual-time-budget=4000 \
    --screenshot="$OUT/$2.png" "$BASE$1" >/dev/null 2>&1
  echo "$OUT/$2.png"
}

shot /welcome/campus 01-sign-in 3 393,852
shot /welcome 01a-sign-in-email 3 393,852
shot / 02-university-home 3 393,852
shot /events 03-eventfinder 3 393,852
shot /places/kyle-field 04-campus-node-kyle-field 3 393,852
shot /gameday 05-game-day 3 393,852
shot /quick-event 06-quick-event 3 393,852
shot '/welcome?email=jordan.carter@gmail.com' 08-state-sign-in-not-found 3 393,852
shot '/quick-event?empty=1' 09-state-quick-event-empty 3 393,852
shot '/quick-event?posted=1' 10-state-quick-event-posted 3 393,852
shot '/places/kyle-field?quiet=1' 11-state-kyle-field-quiet 3 393,852
shot /journey 00-journey-all-six 2 2930,1680
shot /pitch 00-pitch-page 1 1440,10265
rm -rf "$PROFILE"
