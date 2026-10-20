/** Shared geometry and time helpers for concept 1 · The Day. */
export const RAIL_X = 70
/** Left edge of the sheets that hang off the rail. */
export const LANE_X = 94

/** Hours → px down the rail. Hours run past 24 into the next day (25 = 1 AM). */
export type Scale = (h: number) => number

/**
 * Piecewise-linear time scale from [hour, y] stops. Quiet stretches fold up and busy ones open
 * out, and the hour marks stay honest because they're placed by the same scale.
 */
export function timeScale(stops: [number, number][]): Scale {
  return (h) => {
    if (h <= stops[0][0]) return stops[0][1]
    for (let i = 1; i < stops.length; i++) {
      const [h0, y0] = stops[i - 1]
      const [h1, y1] = stops[i]
      if (h <= h1) return y0 + ((h - h0) / (h1 - h0)) * (y1 - y0)
    }
    return stops[stops.length - 1][1]
  }
}

/** 19.3 → { hm: '7:18', ap: 'PM' }. Wraps past midnight. */
export function split(h: number) {
  let mins = Math.round((((h % 24) + 24) % 24) * 60)
  if (mins === 24 * 60) mins = 0
  const hh = Math.floor(mins / 60)
  const mm = mins % 60
  return { hm: `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, '0')}`, ap: hh >= 12 ? 'PM' : 'AM', mm }
}

export const clock = (h: number) => {
  const { hm, ap } = split(h)
  return `${hm} ${ap}`
}

/** The inverse of timeScale over the same stops: px down the rail → hours. Used to drag the straw. */
export function timeAt(stops: [number, number][]) {
  return (px: number) => {
    if (px <= stops[0][1]) return stops[0][0]
    for (let i = 1; i < stops.length; i++) {
      const [h0, y0] = stops[i - 1]
      const [h1, y1] = stops[i]
      if (px <= y1) return y1 === y0 ? h1 : h0 + ((px - y0) / (y1 - y0)) * (h1 - h0)
    }
    return stops[stops.length - 1][0]
  }
}
