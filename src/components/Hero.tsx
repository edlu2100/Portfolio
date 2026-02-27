import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero
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
          background: 'radial-gradient(ellipse, rgba(79,114,255,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(217,200,168,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
            color: 'var(--color-primary)',
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
            backgroundColor: 'var(--color-primary)',
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
              color: 'var(--color-text-muted)',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              border: '1px solid var(--color-border)',
              transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-light)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            {h.contact}
          </a>
        </div>

        {/* Scroll-indikator */}
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

      </div>
    </section>
  )
}
