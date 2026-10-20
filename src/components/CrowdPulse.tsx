/**
 * A venue's crowd across a day, read through its events. Solid where it has happened,
 * dashed where it's forecast, a gold "now" line, and a marker on the curve for every event.
 */
export type PulseDay = {
  /** Hours on a 24h clock (9.5 = 9:30 AM). */
  start: number
  end: number
  /** Crowd value at full venue; the y-axis top. */
  capacity: number
  now: number
  /** The day's anchor event (kickoff): dashed guide line. */
  anchor: number
  /** Accessible summary of the chart. */
  label: string
  /** [hour, crowd] points, in order. */
  crowd: [number, number][]
  events: { h: number; label: string; state: 'live' | 'next' | 'later' }[]
}

const C = {
  gold: 'var(--color-gold)',
  live: 'var(--color-live)',
  maroon: 'var(--color-maroon)',
  white: '#fff',
}

function crowdAt(day: PulseDay, h: number) {
  const c = day.crowd
  for (let i = 1; i < c.length; i++) {
    const [h0, v0] = c[i - 1]
    const [h1, v1] = c[i]
    if (h <= h1) return v0 + ((h - h0) / (h1 - h0)) * (v1 - v0)
  }
  return c[c.length - 1][1]
}

/** Horizontal positions (0–1) for labelling under the chart. */
export function pulsePositions(day: PulseDay) {
  const at = (h: number) => (h - day.start) / (day.end - day.start)
  const march = day.events.find((e) => e.label === 'March-In')
  return { nowPct: at(day.now), kickPct: at(day.anchor), marchPct: march ? at(march.h) : 0 }
}

export function CrowdPulse({ day, width, height }: { day: PulseDay; width: number; height: number }) {
  const top = 4
  const x = (h: number) => ((h - day.start) / (day.end - day.start)) * width
  const y = (v: number) => height - (v / day.capacity) * (height - top)
  const pts = day.crowd.map(([h, v]) => [x(h), y(v)] as const)

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
  const nowX = x(day.now)
  const nowY = y(crowdAt(day, day.now))
  const kickX = x(day.anchor)

  return (
    <svg
      width="100%"
      style={{ maxWidth: width, height: 'auto', aspectRatio: `${width} / ${height}` }}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      role="img"
      aria-label={day.label}
    >
      <defs>
        <linearGradient id="crowd-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.gold} stopOpacity="0.38" />
          <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
        </linearGradient>
        <clipPath id="crowd-past">
          <rect x="0" y="-10" width={nowX} height={height + 20} />
        </clipPath>
        <clipPath id="crowd-future">
          <rect x={nowX} y="-10" width={width - nowX} height={height + 20} />
        </clipPath>
      </defs>
      <path d={`${line} L${width},${height} L0,${height} Z`} fill="url(#crowd-fill)" />
      <path d={line} fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" clipPath="url(#crowd-past)" />
      <path
        d={line}
        fill="none"
        stroke={C.gold}
        strokeOpacity="0.75"
        strokeWidth="1.6"
        strokeDasharray="3 4"
        strokeLinecap="round"
        clipPath="url(#crowd-future)"
      />
      <line x1={kickX} x2={kickX} y1={top} y2={height} stroke={C.white} strokeOpacity="0.35" strokeDasharray="2 3" />
      <line x1={nowX} x2={nowX} y1={nowY - 14} y2={height} stroke={C.gold} strokeWidth="1.5" />
      {day.events.map((e) => (
        <circle
          key={e.label}
          cx={x(e.h)}
          cy={y(crowdAt(day, e.h))}
          r={e.state === 'live' ? 3.5 : 3}
          fill={e.state === 'live' ? C.live : e.state === 'next' ? C.gold : C.maroon}
          stroke={e.state === 'later' ? C.gold : C.white}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}
