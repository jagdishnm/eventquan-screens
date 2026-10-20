import type { CSSProperties, ReactNode } from 'react'
import { SCREEN_H, SCREEN_W } from '../components/Device'

const BEZEL = 12

/**
 * A real app screen inside an iPhone bezel, scaled without reflowing the screen itself.
 * On the page it is a picture: announced once by `label`, never focusable or read field by field.
 */
export function PhoneFrame({
  children,
  label,
  scale = 1,
  className = '',
  style,
}: {
  children: ReactNode
  label: string
  scale?: number
  className?: string
  style?: CSSProperties
}) {
  const w = SCREEN_W + BEZEL * 2
  const h = SCREEN_H + BEZEL * 2
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative shrink-0 ${className}`}
      style={{ width: w * scale, height: h * scale, ...style }}
    >
      <div
        className="absolute left-0 top-0 rounded-[64px] bg-[#0b0a0b] shadow-[0_0_0_1.5px_#2c2729,0_60px_90px_-40px_rgba(40,10,0,0.55),0_24px_40px_-24px_rgba(40,10,0,0.45)]"
        style={{ width: w, height: h, padding: BEZEL, transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div className="overflow-hidden rounded-[52px]" inert aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
