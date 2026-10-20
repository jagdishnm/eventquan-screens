/**
 * Troy's metaphor, drawn: live events are sheets of paper scattered in a stack.
 * The student is a straw pushed through it. The sheets it pierces are their app.
 */
type Sheet = { title: string; meta: string; node: 'tamu' | 'cstat' | 'bryan'; hit: boolean; dx: number }

const SHEETS: Sheet[] = [
  { title: 'First Friday', meta: 'DOWNTOWN BRYAN · FRI', node: 'bryan', hit: false, dx: 140 },
  { title: 'Gameday Brunch', meta: 'SBISA · OPEN NOW', node: 'tamu', hit: true, dx: 0 },
  { title: 'Live on Northgate', meta: 'COLLEGE STATION · 9 PM', node: 'cstat', hit: false, dx: -140 },
  { title: 'A&M vs LSU', meta: 'KYLE FIELD · 6:00 PM', node: 'tamu', hit: true, dx: 0 },
  { title: 'Aggie Night', meta: 'GRAND STATION · 9:30 PM', node: 'cstat', hit: true, dx: 0 },
  { title: 'Hadestown', meta: 'RUDDER AUDITORIUM · THU', node: 'tamu', hit: false, dx: 140 },
  { title: 'ENGR 102', meta: 'ZACHRY · MON 8 AM', node: 'tamu', hit: true, dx: 0 },
]

const NODE_INK = { tamu: '#500000', cstat: '#16775a', bryan: '#1d5fb0' }
const GAP = 66
const W = 280
const H = 176

export function StrawStack() {
  const height = (SHEETS.length - 1) * GAP + 260
  return (
    <div className="sheet-stack relative mx-auto w-[600px]" style={{ height }} aria-hidden>
      {SHEETS.map((s, i) => (
        <div
          key={s.title}
          className="sheet-drop absolute left-1/2"
          style={{
            top: i * GAP,
            marginLeft: -W / 2 + s.dx,
            // Sheets the straw misses sit in front of it; pierced sheets sit behind it.
            zIndex: s.hit ? i : 60 + i,
            animationDelay: `${120 + i * 90}ms`,
          }}
        >
          <div
            className={`sheet relative overflow-hidden rounded-[6px] p-5 ${
              s.hit
                ? 'bg-[#fffdf8] shadow-[0_30px_40px_-24px_rgba(60,20,0,0.55),0_0_0_1px_rgba(80,0,0,0.12)]'
                : 'bg-[#e6dccb] shadow-[0_20px_30px_-24px_rgba(60,20,0,0.4),0_0_0_1px_rgba(31,23,19,0.1)]'
            }`}
            style={{ width: W, height: H }}
          >
            <div className="absolute inset-y-0 left-0 w-[8px]" style={{ background: NODE_INK[s.node] }} />
            <div className="pl-3 font-mono text-[12px] font-medium tracking-[1.4px] text-ink-warm-2">{s.meta}</div>
            <div
              className="mt-2 pl-3 font-poster text-[40px] font-extrabold uppercase leading-[0.9]"
              style={{ color: s.hit ? NODE_INK[s.node] : '#a0958a' }}
            >
              {s.title}
            </div>
            {s.hit ? (
              <div className="absolute left-1/2 top-1/2 size-[26px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#2a0a00_0%,#2a0a00_45%,rgba(255,205,28,0.9)_52%,rgba(255,205,28,0)_75%)]" />
            ) : null}
          </div>
        </div>
      ))}

      {/* The straw */}
      <div
        className="straw absolute left-1/2 top-[-36px] z-50 -ml-[5px] w-[10px] rounded-full bg-[linear-gradient(90deg,#c99700_0%,#ffe066_45%,#ffcd1c_60%,#b88600_100%)] shadow-[0_0_24px_rgba(255,205,28,0.55)]"
        style={{ height: height - 40 }}
      />
      <div className="absolute left-1/2 top-[-72px] z-50 -translate-x-1/2 rounded-full bg-ink-warm px-3 py-1 font-mono text-[12px] font-semibold tracking-[1.6px] text-gold">
        YOU
      </div>
    </div>
  )
}
