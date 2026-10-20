import { Sun } from 'lucide-react'
import { Button } from '../../components/Button'
import { Screen } from '../../components/Device'
import { Eyebrow } from '../../components/Eyebrow'
import { StatusBar } from '../../components/StatusBar'

const UP = 1804
const TOTAL = 1840
/** The Yell Leaders' count: 3 has gone, 2 is on screen, 1 is next. */
const COUNT = [3, 2, 1] as const
const NOW = 2

/**
 * G3 · Card lit.
 * The modal moment: the whole phone is your card, white for the stem of the Block T. Everything
 * on it is for the second before you raise it: where you are, how long to hold, how full the T is.
 */
export function G3CardLit() {
  return (
    <Screen bg="bg-white">
      <StatusBar tone="dark" />
      <main
        aria-labelledby="lit-title"
        className="absolute inset-0 flex flex-col items-center px-6 pb-[42px] pt-[86px] text-maroon"
      >
        <div className="flex items-center gap-1.5">
          <Sun size={14} aria-hidden />
          <Eyebrow tone="maroon">Full brightness · Block T · East stands</Eyebrow>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h1
            id="lit-title"
            className="font-display text-display-xl font-extrabold uppercase italic leading-[0.86] tracking-[-0.01em]"
          >
            Hold it
            <br />
            up
          </h1>
          <p className="mt-4 text-emphasis font-semibold">Sec 125 · Row 22 · Seat 14</p>
          <p className="text-small text-maroon/70">White card · stem of the T</p>

          {/* The Yell Leaders' count, so everyone drops together */}
          <div className="mt-10" aria-live="polite">
            <p className="text-control font-semibold">Hold steady</p>
            <ol className="mt-2 flex items-center justify-center gap-5" aria-label={`Count: ${NOW}`}>
              {COUNT.map((n) => (
                <li
                  key={n}
                  aria-current={n === NOW ? 'step' : undefined}
                  className={`font-display font-bold leading-none tabular ${
                    n === NOW
                      ? 'text-display-xl'
                      : n > NOW
                        ? 'text-display-md text-maroon/25'
                        : 'text-display-md text-maroon/50'
                  }`}
                >
                  {n}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-baseline justify-between text-meta">
            <span className="font-semibold">Cards up in the east stands</span>
            <span className="tabular text-maroon/70">
              {UP.toLocaleString()} of {TOTAL.toLocaleString()}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Cards up"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={UP}
            className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-maroon/10"
          >
            <div className="h-full rounded-full bg-maroon" style={{ width: `${(UP / TOTAL) * 100}%` }} />
          </div>
          <Button variant="secondary" size="md" className="mt-5 w-full">
            Put my card down
          </Button>
        </div>
      </main>
    </Screen>
  )
}
