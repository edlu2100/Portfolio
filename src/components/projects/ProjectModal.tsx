import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Tag from '../ui/Tag'
import type { Project } from './types'

interface Props {
  project: Project
  index: number
  onClose: () => void
  labels: { viewCode: string; viewLive: string; close: string; viewReport: string }
}

export default function ProjectModal({ project, index, onClose, labels }: Props) {
  const { theme } = useTheme()
  const [imgIndex, setImgIndex] = useState(
    theme === 'dark' && project.darkImageIndex !== undefined
      ? project.darkImageIndex
      : 0
  )
  const [visible, setVisible] = useState(false)
  const [vw, setVw] = useState(window.innerWidth)

  const isMobile = vw < 600
  const isTablet = vw >= 600 && vw < 960

  const accent = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const accentRaw = theme === 'dark' ? '#a98a5c' : '#1f3a5f'

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(id)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 340)
  }, [onClose])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const hasMultiple = project.images.length > 1
  const num = String(index + 1).padStart(2, '0')

  // Responsive values
  const backdropPad = isMobile ? '0' : '0.5rem'
  const borderRadius = isMobile ? '0' : '3px'
  const maxWidth = isMobile ? '100%' : isTablet ? '90%' : '60rem'
  const maxHeight = isMobile ? '100dvh' : 'calc(100vh - 1rem)'
  const imgRatio = isMobile ? '16/9' : isTablet ? '3/1' : '2.3/1'
  const contentPad = isMobile ? '1.25rem 1rem 1.5rem' : '2rem 2.25rem 2rem'
  const titleSize = isMobile ? '1.6rem' : 'clamp(1.9rem, 3.5vw, 2.6rem)'

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center',
        padding: backdropPad,
        backgroundColor: `rgba(4,7,18,${visible ? 0.82 : 0})`,
        backdropFilter: visible ? 'blur(6px)' : 'blur(0px)',
        transition: 'background-color 0.32s ease, backdrop-filter 0.32s ease',
      }}
    >
      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%', maxWidth,
          maxHeight,
          backgroundColor: 'var(--color-surface-elevated)',
          border: isMobile ? 'none' : '1px solid var(--color-border)',
          borderRadius: isMobile ? '12px 12px 0 0' : borderRadius,
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'scale(1) translateY(0)'
            : isMobile
              ? 'translateY(4rem)'
              : 'scale(0.96) translateY(1.5rem)',
          transition: 'opacity 0.34s cubic-bezier(0.22,1,0.36,1), transform 0.34s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Image */}
        <div style={{
          position: 'relative',
          aspectRatio: imgRatio,
          flexShrink: 0,
          backgroundColor: 'var(--color-surface-light)',
          overflow: 'hidden',
        }}>
          <img
            key={imgIndex}
            src={project.images[imgIndex]}
            alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              animation: 'modalImgFade 0.3s ease',
              filter: project.blurImage ? 'blur(10px)' : 'none',
              transform: project.blurImage ? 'scale(1.05)' : 'none',
            }}
          />

          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
          }} />

          {!isMobile && (
            <div style={{
              position: 'absolute', top: '1rem', left: '1.25rem',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.7rem', letterSpacing: '0.18em', fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
            }}>
              {num}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={close}
            aria-label={labels.close}
            style={{
              position: 'absolute', top: '0.85rem', right: '0.85rem',
              width: isMobile ? '2.5rem' : '2.25rem',
              height: isMobile ? '2.5rem' : '2.25rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* Image nav */}
          {hasMultiple && (
            <div style={{
              position: 'absolute', bottom: '0.85rem', left: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <button
                onClick={() => setImgIndex(i => (i - 1 + project.images.length) % project.images.length)}
                style={{
                  width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)} style={{
                    width: i === imgIndex ? '1.4rem' : '0.3rem',
                    height: '0.3rem', borderRadius: '99px', padding: 0,
                    backgroundColor: i === imgIndex ? '#fff' : 'rgba(255,255,255,0.4)',
                    border: 'none', cursor: 'pointer',
                    transition: 'width 0.22s ease',
                  }} />
                ))}
              </div>
              <button
                onClick={() => setImgIndex(i => (i + 1) % project.images.length)}
                style={{
                  width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <div style={{ padding: contentPad, display: 'flex', flexDirection: 'column' }}>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
              {project.tags.map(tag => <Tag key={tag} label={tag} />)}
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: titleSize,
              fontWeight: 600, lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: 'var(--color-text)',
              marginBottom: '0.85rem',
            }}>
              {project.title}
            </h2>

            {/* Accent rule */}
            <div style={{
              width: '2.5rem', height: '1px',
              backgroundColor: accentRaw, opacity: 0.6,
              marginBottom: '1rem',
            }} />

            {/* Description */}
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: isMobile ? '0.83rem' : '0.85rem',
              fontWeight: 300, lineHeight: 1.85,
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
            }}>
              {project.description}
            </p>

            {/* Links */}
            <div style={{
              display: 'flex', gap: '0.65rem',
              flexWrap: 'wrap',
              paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)',
            }}>
              {project.github && (
                <a
                  href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: isMobile ? '1' : undefined,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                    padding: isMobile ? '0.85rem 1rem' : '0.65rem 1.25rem',
                    border: '1px solid var(--color-accent)',
                    borderRadius: '2px', backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    transition: 'background-color 0.18s, border-color 0.18s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'var(--color-surface-light)'
                    el.style.borderColor = 'var(--color-border-light)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'transparent'
                    el.style.borderColor = 'var(--color-accent)'
                  }}
                >
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  {labels.viewCode}
                </a>
              )}
              {project.reportUrl && (
                <a
                  href={project.reportUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: isMobile ? '1' : undefined,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                    padding: isMobile ? '0.85rem 1rem' : '0.65rem 1.25rem',
                    border: '1px solid var(--color-accent)',
                    borderRadius: '2px', backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    transition: 'background-color 0.18s, border-color 0.18s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'var(--color-surface-light)'
                    el.style.borderColor = 'var(--color-border)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.backgroundColor = 'transparent'
                    el.style.borderColor = 'var(--color-accent)'
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  {labels.viewReport}
                </a>
              )}
              {project.live && (
                <a
                  href={project.live} target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: isMobile ? '1' : undefined,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                    padding: isMobile ? '0.85rem 1rem' : '0.65rem 1.25rem',
                    backgroundColor: accent, border: `1px solid ${accent}`,
                    borderRadius: '2px', color: '#fff',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.12em',
                    textTransform: 'uppercase', textDecoration: 'none',
                    transition: 'opacity 0.18s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.82' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  {labels.viewLive}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalImgFade {
          from { opacity: 0.6; transform: scale(1.02); }
          to   { opacity: 1;   transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
