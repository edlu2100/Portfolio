import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useMobile } from '../hooks/useMobile'

// Gate geometry — mirrors SlalomTrack constants
const CX_TRACK = 100
const PASS_AMP = 90
const ROW_H    = 230

// ─── SlalomLight ─────────────────────────────────────────────────────────────
// A soft glowing orb that follows the SlalomTrack SVG path in #erfarenhet.
// Pulses brighter when passing each gate.
// ─────────────────────────────────────────────────────────────────────────────

export default function SlalomLight() {
  const { theme } = useTheme()
  const isNarrow  = useMobile(1024)
  const light     = theme === 'light'

  const containerRef = useRef<HTMLDivElement>(null)
  const haloRef      = useRef<SVGCircleElement>(null)
  const stop0Ref     = useRef<SVGStopElement>(null)
  const stop1Ref     = useRef<SVGStopElement>(null)

  useEffect(() => {
    if (isNarrow) return

    const update = () => {
      const el = containerRef.current
      if (!el) return

      const vh     = window.innerHeight
      const pathEl = document.querySelector('[data-track-path]') as SVGPathElement | null
      if (!pathEl) { el.style.opacity = '0'; return }

      const svgEl   = pathEl.ownerSVGElement!
      const svgRect = svgEl.getBoundingClientRect()
      const trackY  = vh * 0.45

      if (svgRect.top >= trackY || svgRect.bottom <= trackY) {
        el.style.opacity = '0'
        return
      }

      const progress = Math.max(0, Math.min(1, (trackY - svgRect.top) / svgRect.height))
      const pt       = pathEl.getPointAtLength(progress * pathEl.getTotalLength())
      const x        = svgRect.left + pt.x
      const y        = svgRect.top  + pt.y

      el.style.transform = `translate(${x}px, ${y}px)`
      el.style.opacity   = '1'

      // ── Gate proximity pulse ──────────────────────────────────────────────
      // Find nearest gate by rounding to closest gate index along Y
      const gateIdx = Math.round((pt.y - ROW_H / 2) / ROW_H)
      const gateX   = gateIdx % 2 === 0 ? CX_TRACK - PASS_AMP : CX_TRACK + PASS_AMP
      const gateYpt = gateIdx * ROW_H + ROW_H / 2
      const dist    = Math.sqrt((pt.x - gateX) ** 2 + (pt.y - gateYpt) ** 2)
      // proximity: 1 at gate centre, 0 at 30px away
      const proximity = Math.max(0, 1 - dist / 30)

      // Base + pulse: radius 8→14, inner opacity 0.55→0.9, outer 0.13→0.22
      const r      = 8  + proximity * 6
      const inner  = 0.55 + proximity * 0.35
      const outer  = 0.2 + proximity * 0.09

      haloRef.current?.setAttribute('r', String(r))
      stop0Ref.current?.setAttribute('stop-opacity', String(inner))
      stop1Ref.current?.setAttribute('stop-opacity', String(outer))
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isNarrow])

  if (isNarrow) return null

  const coreColor = light ? 'var(--color-accent)' : 'var(--color-accent)'

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        zIndex: 20,
        pointerEvents: 'none',
        willChange: 'transform',
        opacity: 0,
        transformOrigin: '0px 0px',
      }}
    >
      <svg width={1} height={1} style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <radialGradient id="slalom-glow-grad" cx="50%" cy="50%" r="50%">
            <stop ref={stop0Ref} offset="0%"   stopColor={coreColor} stopOpacity="0.55" />
            <stop ref={stop1Ref} offset="50%"  stopColor={coreColor} stopOpacity="0.13" />
            <stop               offset="100%" stopColor={coreColor} stopOpacity="0"    />
          </radialGradient>
        </defs>
        <circle ref={haloRef} cx="0" cy="0" r="8" fill="url(#slalom-glow-grad)" />
      </svg>
    </div>
  )
}
