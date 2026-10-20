#!/usr/bin/env bash
# Record the six-screen walkthrough (sign in → Quick Event) as a 30fps MP4 at 2× (786×1704),
# plus a lighter web copy for the pitch page.
# Usage: scripts/record-walkthrough.sh http://localhost:5173
set -euo pipefail
BASE="${1:?pass the running app URL, e.g. http://localhost:5173}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRAMES="$(mktemp -d)"
node "$ROOT/scripts/record-walkthrough.mjs" "$BASE" "$FRAMES"
swift "$ROOT/scripts/encode-video.swift" "$FRAMES" "$ROOT/exports/eventquan-walkthrough.mp4" 2.2 2>/dev/null
# Lighter copy for the pitch page (same frames, ~1/3 the size).
swift "$ROOT/scripts/encode-video.swift" "$FRAMES" "$ROOT/public/media/eventquan-walkthrough.mp4" 2.2 1800000 2>/dev/null
rm -rf "$FRAMES"
