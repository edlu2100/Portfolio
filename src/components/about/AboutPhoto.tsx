import { useTheme } from '../../context/ThemeContext'

interface Props {
  color: string
  borderColor: string
  visible: boolean
  isMobile?: boolean
}

export default function AboutPhoto({ color, borderColor, visible, isMobile = false }: Props) {
  const { theme } = useTheme()

  const fadeStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.65s ease 120ms, transform 0.65s ease 120ms`,
    ...(isMobile ? {} : {
      position: 'sticky' as const,
      top: '6rem',
      perspective: '800px',
    }),
  }

  const baseShadow = theme === 'dark'
    ? `0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${borderColor}`
    : `0 8px 32px rgba(31,58,95,0.18), 0 2px 8px rgba(31,58,95,0.1), 0 0 0 1px ${borderColor}`

  return (
    <div style={fadeStyle}>
      <div
        style={{
          borderRadius: '3px',
          boxShadow: baseShadow,
          transition: 'box-shadow 0.15s ease, transform 0.15s ease',
          ...(isMobile ? {} : {
            transformStyle: 'preserve-3d' as const,
            willChange: 'transform',
          }),
        }}
        onMouseMove={isMobile ? undefined : e => {
          const el = e.currentTarget as HTMLElement
          const rect = el.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width
          const y = (e.clientY - rect.top) / rect.height
          const rotY = (x - 0.5) * 18
          const rotX = (0.5 - y) * 12
          const shadowX = rotY * 0.8
          const shadowY = -rotX * 1.2 + 12
          el.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-4px)`
          el.style.boxShadow = theme === 'dark'
            ? `${shadowX}px ${shadowY}px 48px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${borderColor}`
            : `${shadowX}px ${shadowY}px 48px rgba(31,58,95,0.25), 0 2px 8px rgba(31,58,95,0.12), 0 0 0 1px ${borderColor}`
        }}
        onMouseLeave={isMobile ? undefined : e => {
          const el = e.currentTarget as HTMLElement
          el.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease'
          el.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)'
          el.style.boxShadow = theme === 'dark'
            ? `0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${borderColor}`
            : `0 8px 32px rgba(31,58,95,0.18), 0 2px 8px rgba(31,58,95,0.1), 0 0 0 1px ${borderColor}`
          setTimeout(() => { el.style.transition = 'box-shadow 0.15s ease, transform 0.15s ease' }, 400)
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', borderRadius: '3px', overflow: 'hidden' }}>
          <img
            src="/profile.jpeg"
            alt="Edwin Lundbäck"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              display: 'block', transform: 'scale(1.3)',
              filter: theme === 'dark'
                ? 'brightness(0.88) contrast(1.06) saturate(0.95)'
                : 'brightness(1.02) contrast(1.02)',
            }}
            onError={e => {
              const img = e.currentTarget
              img.style.display = 'none'
              const parent = img.parentElement!
              parent.style.background = `linear-gradient(160deg, var(--color-surface-elevated) 0%, var(--color-surface-light) 100%)`
              parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:0.75rem;padding:2rem">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <span style="font-family:Inter,sans-serif;font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-text-faint)">Lägg till /photo.jpg</span>
              </div>`
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.25) 100%)',
            pointerEvents: 'none', mixBlendMode: 'multiply',
          }} />
        </div>
      </div>

      {/* Name caption */}
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: '1.5rem', height: '1px', background: color, opacity: 0.5 }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.85rem', fontStyle: 'italic',
          color: 'var(--color-text-faint)', letterSpacing: '0.04em',
        }}>
          Edwin Lundbäck
        </span>
      </div>
    </div>
  )
}
