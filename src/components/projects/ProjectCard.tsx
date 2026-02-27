import { useState } from 'react'
import type { Project } from './types'

export default function ProjectCard({ project, index, onClick }: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        backgroundColor: 'var(--color-surface-light)',
        border: `1px solid ${hovered ? 'var(--color-border-light)' : 'var(--color-border)'}`,
        borderRadius: '4px', overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.35)' : 'none',
      }}
    >
      {/* Image */}
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

      {/* Body */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.65rem', color: 'var(--color-text-faint)', letterSpacing: '0.1em' }}>
            0{index + 1}
          </span>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-faint)' }}>{tag}</span>
            ))}
          </div>
        </div>

        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.1, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
          {project.summary}
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.25rem',
          color: 'var(--color-primary)', fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'opacity 0.25s, transform 0.25s',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </article>
  )
}
