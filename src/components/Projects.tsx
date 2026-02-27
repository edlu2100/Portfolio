import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'

type Project = {
  id: number
  title: string
  tags: string[]
  summary: string
  description: string
  images: string[]
  github: string
  live: string
}

function Modal({ project, onClose, labels }: {
  project: Project
  onClose: () => void
  labels: { viewCode: string; viewLive: string; close: string }
}) {
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

  // Stäng med Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  // Lås scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const hasMultiple = project.images.length > 1

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        backgroundColor: `rgba(10,14,26,${visible ? 0.85 : 0})`,
        backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
        transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease',
      }}
    >
      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '52rem',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-surface-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(2rem) scale(0.97)',
          transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Bild */}
        <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: 'var(--color-surface-light)', overflow: 'hidden' }}>
          <img
            src={project.images[imgIndex]}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s ease' }}
          />

          {/* Bildnavigation */}
          {hasMultiple && (
            <>
              <button
                onClick={() => setImgIndex(i => (i - 1 + project.images.length) % project.images.length)}
                style={{
                  position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  backgroundColor: 'rgba(10,14,26,0.7)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button
                onClick={() => setImgIndex(i => (i + 1) % project.images.length)}
                style={{
                  position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  backgroundColor: 'rgba(10,14,26,0.7)', border: '1px solid var(--color-border)',
                  color: 'var(--color-text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              {/* Dots */}
              <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.4rem' }}>
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    style={{
                      width: i === imgIndex ? '1.5rem' : '0.4rem', height: '0.4rem', borderRadius: '99px',
                      backgroundColor: i === imgIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.35)',
                      border: 'none', cursor: 'pointer',
                      transition: 'width 0.25s ease, background-color 0.25s ease',
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Stäng-knapp */}
          <button
            onClick={close}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              width: '2.25rem', height: '2.25rem', borderRadius: '50%',
              backgroundColor: 'rgba(10,14,26,0.7)', border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            aria-label={labels.close}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Textinnehåll */}
        <div style={{ padding: '2rem 2rem 2rem' }}>
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.65rem', fontWeight: 500,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  backgroundColor: 'var(--color-primary-muted)',
                  paddingLeft: '0.65rem', paddingRight: '0.65rem',
                  paddingTop: '0.25rem', paddingBottom: '0.25rem',
                  borderRadius: '2px',
                }}
              >{tag}</span>
            ))}
          </div>

          {/* Titel */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.1,
            color: 'var(--color-text)', marginBottom: '1rem',
          }}>
            {project.title}
          </h2>

          {/* Beskrivning */}
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8,
            color: 'var(--color-text-muted)', marginBottom: '2rem',
          }}>
            {project.description}
          </p>

          {/* Knappar */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  paddingLeft: '1.5rem', paddingRight: '1.5rem',
                  paddingTop: '0.75rem', paddingBottom: '0.75rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: '2px',
                  color: 'var(--color-text)',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'border-color 0.2s, background-color 0.2s',
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
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  paddingLeft: '1.5rem', paddingRight: '1.5rem',
                  paddingTop: '0.75rem', paddingBottom: '0.75rem',
                  backgroundColor: 'var(--color-primary)',
                  border: '1px solid var(--color-primary)',
                  borderRadius: '2px',
                  color: '#fff',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'background-color 0.2s',
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

export default function Projects() {
  const { t } = useLanguage()
  const p = t.projects
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section
        id="projekt"
        style={{
          padding: '7rem 0',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

          {/* Rubrik */}
          <div style={{ marginBottom: '4rem' }}>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{ display: 'inline-block', width: '2rem', height: '1px', backgroundColor: 'var(--color-primary)', opacity: 0.6 }} />
              {p.subheading}
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600,
              lineHeight: 1.05, letterSpacing: '-0.02em',
              color: 'var(--color-text)',
            }}>
              {p.heading}<span style={{ color: 'var(--color-primary)' }}>.</span>
            </h2>
          </div>

          {/* Projektkort */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
            gap: '1.5rem',
          }}>
            {p.items.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setActive(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {active && (
        <Modal
          project={active}
          onClose={() => setActive(null)}
          labels={{ viewCode: p.viewCode, viewLive: p.viewLive, close: p.close }}
        />
      )}
    </>
  )
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', cursor: 'pointer',
        backgroundColor: 'var(--color-surface-light)',
        border: `1px solid ${hovered ? 'var(--color-border-light)' : 'var(--color-border)'}`,
        borderRadius: '4px', overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.35)' : '0 0 0 rgba(0,0,0,0)',
      }}
    >
      {/* Bild */}
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: 'var(--color-surface-elevated)' }}>
        <img
          src={project.images[0]}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ padding: '1.5rem' }}>
        {/* Nummer + tags */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.65rem', color: 'var(--color-text-faint)', letterSpacing: '0.1em',
          }}>
            0{index + 1}
          </span>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--color-text-faint)',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Titel */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.1,
          color: 'var(--color-text)', marginBottom: '0.5rem',
          transition: 'color 0.2s ease',
        }}>
          {project.title}
        </h3>

        {/* Summary */}
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.65,
          color: 'var(--color-text-muted)',
        }}>
          {project.summary}
        </p>

        {/* Pil-indikator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          marginTop: '1.25rem',
          color: 'var(--color-primary)',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </article>
  )
}
