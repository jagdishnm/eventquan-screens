import type { PulseDay } from '../components/CrowdPulse'

/** Kyle Field on Sat, Oct 12 (A&M vs LSU), seen at 9:46 AM. Crowd in thousands. */
export const KYLE_FIELD_GAMEDAY: PulseDay = {
  start: 7,
  end: 23,
  capacity: 102.7,
  now: 9.77,
  anchor: 18,
  label: 'Crowd at Kyle Field today: about 2,100 now, 102,000 expected by kickoff',
  crowd: [
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
  ],
  events: [
    { h: 9, label: '12th Man Brunch', state: 'live' },
    { h: 10, label: 'Tailgate Zone', state: 'next' },
    { h: 15.75, label: 'March-In', state: 'later' },
    { h: 16, label: 'Gates open', state: 'later' },
    { h: 18, label: 'Kickoff', state: 'later' },
  ],
}
