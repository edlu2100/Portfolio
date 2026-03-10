import { useState } from 'react'
import type { Project } from './types'

export default function ProjectCard({ project, index, onClick }: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        backgroundColor: 'var(--color-surface-elevated)',
        border: `1px solid ${hovered ? 'var(--color-border-light)' : 'var(--color-border)'}`,
        borderRadius: '4px', overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.35)' : 'none',

      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: 'var(--color-surface-elevated)' }}>
        {/* Shimmer skeleton */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, var(--color-surface-light) 25%, var(--color-border) 50%, var(--color-surface-light) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
          opacity: imgLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }} />
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.14)' : 'scale(1.1)',
            transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
            filter: project.blurImage ? 'blur(8px)' : 'none',
            opacity: imgLoaded ? 1 : 0,
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.65rem', color: 'var(--color-text-faint)', letterSpacing: '0.1em' }}>
            0{index + 1}
          </span>
 
        </div>

        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.1, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          {project.title}
        </h3>

        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
          {project.summary}
        </p>

      </div>
    </article>
  )
}
