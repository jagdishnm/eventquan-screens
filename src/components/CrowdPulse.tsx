/**
 * A venue's crowd across the day: 7 AM → 11 PM, in thousands of people.
 * Solid where it has happened, dashed where it's forecast, with a live "now" marker.
 */
const DAY_START = 7
const DAY_END = 23
const CAPACITY = 102.7

/** [hour, thousands of people] — gameday shape for Kyle Field. */
const CROWD: [number, number][] = [
  [7, 0.3],
  [8, 0.8],
  [9, 1.6],
  [9.77, 2.1],
  [10, 3.4],
  [11, 5.2],
  [12, 7.4],
  [13, 9.6],
  [14, 14],
  [15, 26],
  [16, 56],
  [17, 86],
  [18, 101],
  [19, 102.4],
  [20, 102.6],
  [21, 101],
  [21.6, 72],
  [22.2, 24],
  [23, 3],
]

const NOW = 9.77 // 9:46 AM
const KICKOFF = 18

/** The events that make the crowd: the curve is read through them, event first. */
export const PULSE_EVENTS: { h: number; label: string; state: 'live' | 'next' | 'later' }[] = [
  { h: 9, label: '12th Man Brunch', state: 'live' },
  { h: 10, label: 'Tailgate Zone', state: 'next' },
  { h: 15.75, label: 'March-In', state: 'later' },
  { h: 16, label: 'Gates open', state: 'later' },
  { h: 18, label: 'Kickoff', state: 'later' },
]

function crowdAt(h: number) {
  for (let i = 1; i < CROWD.length; i++) {
    const [h0, v0] = CROWD[i - 1]
    const [h1, v1] = CROWD[i]
    if (h <= h1) return v0 + ((h - h0) / (h1 - h0)) * (v1 - v0)
  }
  return CROWD[CROWD.length - 1][1]
}

type Props = { width: number; height: number }

export function CrowdPulse({ width, height }: Props) {
  const top = 4
  const x = (h: number) => ((h - DAY_START) / (DAY_END - DAY_START)) * width
  const y = (v: number) => height - (v / CAPACITY) * (height - top)
  const pts = CROWD.map(([h, v]) => [x(h), y(v)] as const)

  // Catmull-Rom → cubic Bézier for a smooth, honest curve through every point.
  const path = (p: readonly (readonly [number, number])[]) =>
    p.reduce((d, [px, py], i) => {
      if (i === 0) return `M${px},${py}`
      const [x0, y0] = p[Math.max(0, i - 2)]
      const [x1, y1] = p[i - 1]
      const [x3, y3] = p[Math.min(p.length - 1, i + 1)]
      const c1x = x1 + (px - x0) / 6
      const c1y = y1 + (py - y0) / 6
      const c2x = px - (x3 - x1) / 6
      const c2y = py - (y3 - y1) / 6
      return `${d} C${c1x},${c1y} ${c2x},${c2y} ${px},${py}`
    }, '')

  const line = path(pts)
  const nowX = x(NOW)
  const nowY = y(2.1)
  const kickX = x(KICKOFF)

  return (
    <svg
      width="100%"
      style={{ maxWidth: width, height: 'auto', aspectRatio: `${width} / ${height}` }}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      role="img"
      aria-label="Crowd at Kyle Field today: about 2,100 now, 102,000 expected by kickoff"
    >
      <defs>
        <linearGradient id="crowd-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffcd1c" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#ffcd1c" stopOpacity="0" />
        </linearGradient>
        <clipPath id="crowd-past">
          <rect x="0" y="-10" width={nowX} height={height + 20} />
        </clipPath>
        <clipPath id="crowd-future">
          <rect x={nowX} y="-10" width={width - nowX} height={height + 20} />
        </clipPath>
      </defs>
      <path d={`${line} L${width},${height} L0,${height} Z`} fill="url(#crowd-fill)" />
      <path d={line} fill="none" stroke="#ffcd1c" strokeWidth="2" strokeLinecap="round" clipPath="url(#crowd-past)" />
      <path
        d={line}
        fill="none"
        stroke="#ffcd1c"
        strokeOpacity="0.75"
        strokeWidth="1.6"
        strokeDasharray="3 4"
        strokeLinecap="round"
        clipPath="url(#crowd-future)"
      />
      <line x1={kickX} x2={kickX} y1={top} y2={height} stroke="#fff" strokeOpacity="0.35" strokeDasharray="2 3" />
      <line x1={nowX} x2={nowX} y1={nowY - 14} y2={height} stroke="#ffcd1c" strokeWidth="1.5" />
      {PULSE_EVENTS.map((e) => (
        <circle
          key={e.label}
          cx={x(e.h)}
          cy={y(crowdAt(e.h))}
          r={e.state === 'live' ? 3.5 : 3}
          fill={e.state === 'live' ? '#e5322d' : e.state === 'next' ? '#ffcd1c' : '#500000'}
          stroke={e.state === 'later' ? '#ffcd1c' : '#fff'}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}

const pct = (h: number) => (h - DAY_START) / (DAY_END - DAY_START)
export const CROWD_POSITIONS = { nowPct: pct(NOW), kickPct: pct(KICKOFF), marchPct: pct(15.75) }
