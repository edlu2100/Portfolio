import { useEffect, useState, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

type Phase = 'idle' | 'cable-drop' | 'hook-attach' | 'ride-up' | 'done'

export default function ScrollToTop() {
  const { theme } = useTheme()
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const cableColor = theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'
  // Cabin colors
  const woodWall  = theme === 'dark' ? '#8B6F47' : '#7A5C3A'
  const woodRoof  = theme === 'dark' ? '#6B4F2F' : '#5A3E22'
  const woodTrim  = theme === 'dark' ? '#A68B5B' : '#9B7D50'
  const windowCol = theme === 'dark' ? 'rgba(180,210,240,0.35)' : 'rgba(140,190,240,0.45)'

  // ↓ Change this to control animation speed (ms). Lower = faster, higher = slower.
  const DURATION = 3000

  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState<Phase>('idle')
  const [hookBottom, setHookBottom] = useState<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    function onScroll() {
      if (phase === 'idle') setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase])

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // Animate both scroll AND hook position in the same rAF loop
  function startRide() {
    const scrollStart = window.scrollY
    const startTime = performance.now()
    // Hook travels from button top to screen top
    // Button bottom edge = 2rem from viewport bottom, button height = 2.75rem
    // So hook starts at bottom: calc(2rem + 2.75rem) ≈ 76px from bottom
    const hookStartBottom = 76 // px from viewport bottom
    const hookEndBottom = window.innerHeight - 114 // stop at cabin bottom edge

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / DURATION, 1)
      // Ease-out cubic: starts fast, decelerates — both hook and scroll kick off together
      const ease = 1 - Math.pow(1 - progress, 3)

      // Scroll — instant overrides any CSS scroll-behavior:smooth
      window.scrollTo({ top: scrollStart * (1 - ease), behavior: 'instant' as ScrollBehavior })

      // Hook position
      const currentBottom = hookStartBottom + (hookEndBottom - hookStartBottom) * ease
      setHookBottom(currentBottom)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        // Both scroll and hook have finished — transition out
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        setPhase('done')
        setTimeout(() => setPhase('idle'), 500)
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  function handleClick() {
    if (phase !== 'idle') return

    // Reset hook to button position
    setHookBottom(76)

    // Phase 1: cable drops down
    setPhase('cable-drop')

    // Phase 2: hook attaches
    setTimeout(() => setPhase('hook-attach'), 500)

    // Phase 3: ride up – both scroll and hook animate together
    setTimeout(() => {
      setPhase('ride-up')
      startRide()
    }, 900)
  }

  const animating = phase !== 'idle'
  const showCable = phase === 'cable-drop' || phase === 'hook-attach' || phase === 'ride-up'
  const hookVisible = phase === 'hook-attach' || phase === 'ride-up'
  const fading = phase === 'done'

  // Center of button from the right edge
  const rightOffset = 'calc(2rem + 1.375rem)'

  return (
    <>
      {/* ── Cable / wire – fixed from top to button ── */}
      {(showCable || fading) && (
        <div
          style={{
            position: 'fixed',
            top: '114px',
            right: rightOffset,
            width: '3px',
            bottom: 'calc(2rem + 2.75rem + 8px)',
            zIndex: 49,
            pointerEvents: 'none',
            transformOrigin: 'top',
            background: cableColor,
            borderRadius: '1.5px',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.4s ease',
            animation: phase === 'cable-drop' ? 'cableDrop 0.5s ease-out forwards' : 'none',
          }}
        />
      )}

      {/* ── Cabin / lift station at the top of the cable ── */}
      {(showCable || fading) && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: rightOffset,
            zIndex: 52,
            pointerEvents: 'none',
            transform: 'translateX(50%)',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.4s ease',
            animation: phase === 'cable-drop' ? 'cableDrop 0.5s ease-out forwards' : 'none',
          }}
        >
          <svg width="38" height="34" viewBox="0 0 38 34" fill="none">
            {/* Roof */}
            <polygon points="2,14 19,2 36,14" fill={woodRoof} />
            <polygon points="0,14 19,1 38,14" fill="none" stroke={woodTrim} strokeWidth="1" />
            {/* Overhang shadow line */}
            <line x1="3" y1="14" x2="35" y2="14" stroke={woodRoof} strokeWidth="0.5" opacity="0.5" />
            {/* Wall */}
            <rect x="5" y="14" width="28" height="18" rx="1" fill={woodWall} />
            {/* Horizontal planks */}
            <line x1="5" y1="19" x2="33" y2="19" stroke={woodTrim} strokeWidth="0.4" opacity="0.4" />
            <line x1="5" y1="24" x2="33" y2="24" stroke={woodTrim} strokeWidth="0.4" opacity="0.4" />
            <line x1="5" y1="29" x2="33" y2="29" stroke={woodTrim} strokeWidth="0.4" opacity="0.4" />
            {/* Window */}
            <rect x="13" y="17" width="12" height="8" rx="1" fill={windowCol} />
            <line x1="19" y1="17" x2="19" y2="25" stroke={woodTrim} strokeWidth="0.6" />
            <line x1="13" y1="21" x2="25" y2="21" stroke={woodTrim} strokeWidth="0.6" />
            {/* Door opening at bottom center */}
            <rect x="16" y="27" width="6" height="5" rx="0.5" fill={woodRoof} />
            {/* Cable exit hole (small circle at bottom center) */}
            <circle cx="19" cy="33" r="1.5" fill={cableColor} />
          </svg>
        </div>
      )}

      {/* ── Hook / bracket – rides up along the cable ── */}
      {(hookVisible || fading) && (
        <div
          style={{
            position: 'fixed',
            bottom: hookBottom != null ? `${hookBottom}px` : '76px',
            right: rightOffset,
            zIndex: 51,
            pointerEvents: 'none',
            opacity: fading ? 0 : 1,
            transition: fading ? 'opacity 0.4s ease' : 'none',
          }}
        >
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            style={{ display: 'block', transform: 'translateX(10.5px)' }}
          >
            {/* Bracket: centered U shape */}
            <path
              d="M12 0 V8 Q12 14, 6 14 H2 M12 8 Q12 14, 18 14 H22"
              stroke={cableColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* ── Button ── */}
      <button
        onClick={handleClick}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 50,
          width: '2.75rem',
          height: '2.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-surface-elevated)',
          border: `1px solid ${visible || animating ? color + '44' : 'transparent'}`,
          borderRadius: '2px',
          cursor: animating ? 'default' : 'pointer',
          color,
          opacity: visible || animating ? (fading ? 0 : 1) : 0,
          pointerEvents: visible || animating ? 'auto' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
        onMouseEnter={e => {
          if (!animating) {
            (e.currentTarget as HTMLElement).style.borderColor = color
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
          }
        }}
        onMouseLeave={e => {
          if (!animating) {
            (e.currentTarget as HTMLElement).style.borderColor = color + '44'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}
