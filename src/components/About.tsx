import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'

export default function About() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { ref, visible } = useInView()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = (t as any).om as {
    heading: string
    subheading: string
    bio1: string
    bio2: string
    bio3: string
    stats: { value: string; label: string }[]
    interestsLabel: string
    interests: string[]
  }

  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const borderColor = theme === 'dark' ? 'rgba(169,138,92,0.2)' : 'rgba(31,58,95,0.15)'

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="om"
      style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={o.heading} subheading={o.subheading} visible={visible} />

        {/* ── Two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,340px)',
          gap: '5rem',
          alignItems: 'start',
        }}>

          {/* Left – bio text */}
          <div>

            {/* Stats bar */}
            <div style={{
              ...fade(30),
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              gap: 0,
              marginBottom: '2.5rem',
            }}>
              {o.stats.map((s: { value: string; label: string }, i: number) => (
                <span key={s.label} style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    color,
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                  }}>{s.value}</span>
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.58rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-faint)',
                    marginLeft: '0.3rem',
                  }}>{s.label}</span>
                  {i < o.stats.length - 1 && (
                    <span style={{ margin: '0 0.75rem', color: 'var(--color-text-faint)', fontSize: '0.5rem', opacity: 0.35 }}>·</span>
                  )}
                </span>
              ))}
            </div>

            {/* Intro quote */}
            <p style={{
              ...fade(80),
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.65,
              color: 'var(--color-text)',
              marginBottom: '2.25rem',
            }}>
              {o.bio1}
            </p>

            {/* Second paragraph */}
            <p style={{
              ...fade(180),
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.93rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
            }}>
              {o.bio2}
            </p>

            {/* Third paragraph */}
            <p style={{
              ...fade(240),
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.93rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: 'var(--color-text-muted)',
              marginBottom: '2.75rem',
            }}>
              {o.bio3}
            </p>

            {/* Interests */}
            <div style={{ ...fade(360) }}>
              <p style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color,
                marginBottom: '0.5rem',
              }}>
                {o.interestsLabel}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {o.interests.map((interest: string) => (
                  <span
                    key={interest}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '0.73rem',
                      fontWeight: 400,
                      padding: '0.35rem 0.85rem',
                      border: `1px solid ${borderColor}`,
                      borderRadius: '2px',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.04em',
                      transition: 'border-color 0.25s ease, color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = color
                      el.style.color = color
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = borderColor
                      el.style.color = 'var(--color-text-muted)'
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right – photo */}
          <div style={{ ...fade(120), position: 'sticky', top: '6rem', perspective: '800px' }}>

            {/* Outer glow / shadow wrapper */}
            <div
              style={{
                borderRadius: '3px',
                boxShadow: theme === 'dark'
                  ? `0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${borderColor}`
                  : `0 8px 32px rgba(31,58,95,0.18), 0 2px 8px rgba(31,58,95,0.1), 0 0 0 1px ${borderColor}`,
                transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              onMouseMove={e => {
                const el = e.currentTarget as HTMLElement
                const rect = el.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width   // 0–1 left→right
                const y = (e.clientY - rect.top) / rect.height    // 0–1 top→bottom
                const rotY = (x - 0.5) * 18   // –9 … +9 deg
                const rotX = (0.5 - y) * 12   // –6 … +6 deg
                const shadowX = rotY * 0.8
                const shadowY = -rotX * 1.2 + 12
                el.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-4px)`
                el.style.boxShadow = theme === 'dark'
                  ? `${shadowX}px ${shadowY}px 48px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${borderColor}`
                  : `${shadowX}px ${shadowY}px 48px rgba(31,58,95,0.25), 0 2px 8px rgba(31,58,95,0.12), 0 0 0 1px ${borderColor}`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease'
                el.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)'
                el.style.boxShadow = theme === 'dark'
                  ? `0 8px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px ${borderColor}`
                  : `0 8px 32px rgba(31,58,95,0.18), 0 2px 8px rgba(31,58,95,0.1), 0 0 0 1px ${borderColor}`
                setTimeout(() => { el.style.transition = 'box-shadow 0.15s ease, transform 0.15s ease' }, 400)
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: '3px',
                overflow: 'hidden',
              }}>
                <img
                  src="/profile.jpeg"
                  alt="Edwin Lundbäck"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    transform: 'scale(1.3)',
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



                {/* Vignette edges */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.25) 100%)',
                  pointerEvents: 'none',
                  mixBlendMode: 'multiply',
                }} />
              </div>
            </div>

            {/* Caption / name badge */}
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}>
              <div style={{ width: '1.5rem', height: '1px', background: color, opacity: 0.5 }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: 'var(--color-text-faint)',
                letterSpacing: '0.04em',
              }}>
                Edwin Lundbäck
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
