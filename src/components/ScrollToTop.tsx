import { useEffect, useState, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

type Phase = 'idle' | 'cable-drop' | 'hook-attach' | 'ride-up' | 'done'

export default function ScrollToTop() {
  const { theme } = useTheme()
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const cableColor = theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'

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

  // Watch for scroll reaching top during ride-up
  const watchScroll = useCallback(() => {
    function check() {
      if (window.scrollY <= 5) {
        setPhase('done')
        setTimeout(() => setPhase('idle'), 500)
        return
      }
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
  }, [])

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const DURATION = 1800 // ms

  // Animate both scroll AND hook position in the same rAF loop
  function startRide() {
    const scrollStart = window.scrollY
    const startTime = performance.now()
    // Hook travels from button top to screen top
    // Button bottom edge = 2rem from viewport bottom, button height = 2.75rem
    // So hook starts at bottom: calc(2rem + 2.75rem) ≈ 76px from bottom
    const hookStartBottom = 76 // px from viewport bottom
    const hookEndBottom = window.innerHeight // px from bottom = at top of screen

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / DURATION, 1)
      // Ease-in-out cubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      // Scroll
      window.scrollTo(0, scrollStart * (1 - ease))

      // Hook position
      const currentBottom = hookStartBottom + (hookEndBottom - hookStartBottom) * ease
      setHookBottom(currentBottom)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
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
      watchScroll()
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
            top: 0,
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
            style={{ display: 'block', transform: 'translateX(-50%)' }}
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
