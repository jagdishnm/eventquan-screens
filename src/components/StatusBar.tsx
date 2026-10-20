type Props = { tone?: 'light' | 'dark' }

/** iOS status bar at 9:41 with Dynamic Island. `light` = white glyphs (for dark headers). */
export function StatusBar({ tone = 'light' }: Props) {
  const c = tone === 'light' ? '#fff' : '#111'
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[54px]">
      <div className="absolute left-1/2 top-[11px] h-[37px] w-[125px] -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute left-[46px] top-[18px] text-[17px] font-semibold tracking-[-0.2px]" style={{ color: c }}>
        9:41
      </div>
      <div className="absolute right-[30px] top-[22px] flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c} aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="10" y="3" width="3" height="9" rx="0.8" />
          <rect x="15" y="0" width="3" height="12" rx="0.8" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c} aria-hidden>
          <path d="M8 2.6c2.2 0 4.2.85 5.7 2.25l1.1-1.13A9.6 9.6 0 0 0 8 1 9.6 9.6 0 0 0 1.2 3.72l1.1 1.13A8.1 8.1 0 0 1 8 2.6Z" />
          <path d="M8 5.8c1.33 0 2.53.5 3.45 1.32l1.12-1.14A6.4 6.4 0 0 0 8 4.2c-1.75 0-3.35.68-4.57 1.78l1.12 1.14A5.07 5.07 0 0 1 8 5.8Z" />
          <path d="M8 9.1c.48 0 .92.17 1.27.46L8 10.9 6.73 9.56C7.08 9.27 7.52 9.1 8 9.1Z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" stroke={c} strokeOpacity="0.4" />
          <rect x="2" y="2" width="20" height="9" rx="2.5" fill={c} />
          <path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill={c} fillOpacity="0.45" />
        </svg>
      </div>
    </div>
  )
}
