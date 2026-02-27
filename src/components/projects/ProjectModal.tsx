import { useState, useEffect, useCallback } from 'react'
import Tag from '../ui/Tag'
import type { Project } from './types'

interface Props {
  project: Project
  onClose: () => void
  labels: { viewCode: string; viewLive: string; close: string }
}

export default function ProjectModal({ project, onClose, labels }: Props) {
  const [imgIndex, setImgIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(id)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 350)
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
  const navBtn: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
    backgroundColor: 'rgba(10,14,26,0.7)', border: '1px solid var(--color-border)',
    color: 'var(--color-text)', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }

  return (
    <div onClick={close} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      backgroundColor: `rgba(10,14,26,${visible ? 0.85 : 0})`,
      backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
      transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '52rem', maxHeight: '90vh', overflowY: 'auto',
        backgroundColor: 'var(--color-surface-elevated)',
        border: '1px solid var(--color-border)', borderRadius: '4px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(2rem) scale(0.97)',
        transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {/* Image carousel */}
        <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: 'var(--color-surface-light)', overflow: 'hidden' }}>
          <img src={project.images[imgIndex]} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

          {hasMultiple && (
            <>
              <button style={{ ...navBtn, left: '1rem' }} onClick={() => setImgIndex(i => (i - 1 + project.images.length) % project.images.length)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button style={{ ...navBtn, right: '1rem' }} onClick={() => setImgIndex(i => (i + 1) % project.images.length)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.4rem' }}>
                {project.images.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)} style={{
                    width: i === imgIndex ? '1.5rem' : '0.4rem', height: '0.4rem', borderRadius: '99px',
                    backgroundColor: i === imgIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.35)',
                    border: 'none', cursor: 'pointer',
                    transition: 'width 0.25s ease, background-color 0.25s ease',
                  }} />
                ))}
              </div>
            </>
          )}

          <button onClick={close} aria-label={labels.close} style={{
            position: 'absolute', top: '1rem', right: '1rem',
            width: '2.25rem', height: '2.25rem', borderRadius: '50%',
            backgroundColor: 'rgba(10,14,26,0.7)', border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {project.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.1, color: 'var(--color-text)', marginBottom: '1rem' }}>
            {project.title}
          </h2>

          <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8, color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
            {project.description}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.5rem', backgroundColor: 'transparent',
                  border: '1px solid var(--color-border-light)', borderRadius: '2px',
                  color: 'var(--color-text)', fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase', textDecoration: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-light)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                {labels.viewCode}
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--color-primary)', border: '1px solid var(--color-primary)',
                  borderRadius: '2px', color: '#fff',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase', textDecoration: 'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary-dark)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                {labels.viewLive}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
