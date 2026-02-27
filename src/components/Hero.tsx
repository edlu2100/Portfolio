import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useMobile } from '../hooks/useMobile'

export default function Hero() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const isMobile = useMobile()
  const h = t.hero
  const accentColor = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(id)
  }, [])

  const fade = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(1.75rem)',
    transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
    transitionDelay: `${delay}ms`,
  })

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Bakgrundsglöd */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '600px',
          borderRadius: '50%',
          opacity: 0,
        }} />
        {/* Subtil horisontell linje mitt i */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)',
        }} />
      </div>

      {/* Innehåll */}
      <div style={{
        width: '100%',
        maxWidth: '72rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '8rem',
        paddingBottom: '6rem',
      }}>

        {/* Hälsning */}
        <p
          style={{
            ...fade(100),
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span style={{
            display: 'inline-block',
            width: '2rem',
            height: '1px',
            backgroundColor: accentColor,
            opacity: 0.6,
          }} />
          {h.greeting}
        </p>

        {/* Namn */}
        <h1
          style={{
            ...fade(250),
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: 'var(--color-text)',
            marginBottom: '0.5rem',
          }}
        >
          {h.name}
          <span style={{ color: 'var(--color-primary)' }}>.</span>
        </h1>

        {/* Roll – kursiv serif */}
        <h2
          style={{
            ...fade(380),
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--color-accent)',
            marginBottom: '2.5rem',
            lineHeight: 1.2,
          }}
        >
          {h.role}
        </h2>

        {/* Beskrivning */}
        <p
          style={{
            ...fade(500),
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--color-text-muted)',
            maxWidth: '38rem',
            marginBottom: '3rem',
          }}
        >
          {h.description}
        </p>

        {/* CTA-knappar */}
        <div
          style={{
            ...fade(620),
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#projekt"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingLeft: '1.75rem',
              paddingRight: '1.75rem',
              paddingTop: '0.875rem',
              paddingBottom: '0.875rem',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              border: '1px solid var(--color-primary)',
              transition: 'background-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary-dark)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            {h.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <a
            href="#kontakt"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              paddingLeft: '1.75rem',
              paddingRight: '1.75rem',
              paddingTop: '0.875rem',
              paddingBottom: '0.875rem',
              backgroundColor: 'transparent',
              color: accentColor,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              border: `1px solid ${accentColor}`,
              transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = accentColor
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}66`
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            {h.contact}
          </a>
        </div>

        {/* Sociala ikoner */}
        <div style={{
          ...fade(720),
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginTop: '2rem',
        }}>
          {[
            {
              href: 'mailto:edwinlundback@gmail.com',
              label: 'Mail',
              path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
            },
            {
              href: 'https://github.com/edlu2100',
              label: 'GitHub',
              path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
            },
            {
              href: 'https://linkedin.com/in/edwinlundback',
              label: 'LinkedIn',
              path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
            },
          ].map(({ href, label, path }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s ease, transform 0.2s ease', display: 'flex' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = accentColor
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {path.split(' M').map((p, i) => (
                  <path key={i} d={i === 0 ? p : 'M' + p} />
                ))}
              </svg>
            </a>
          ))}
        </div>

        {/* Scroll-indikator */}
        {!isMobile && (
        <div
          style={{
            ...fade(800),
            position: 'absolute',
            bottom: '2.5rem',
            left: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div style={{
            width: '1px',
            height: '3rem',
            background: 'linear-gradient(to bottom, var(--color-border-light), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-text-faint)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}>
            {h.scroll}
          </span>
        </div>
        )}

      </div>
    </section>
  )
}
