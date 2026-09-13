import { useEffect } from 'react'
import type { ExpItem } from './ExperienceCard'

interface Props {
  item: ExpItem
  closeLabel: string
  onClose: () => void
}

export default function ExperienceModal({ item, closeLabel, onClose }: Props) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500, padding: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(4,7,18,0.82)', backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={event => event.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: '42rem', maxHeight: '90vh',
          overflowY: 'auto', padding: '2.25rem',
          backgroundColor: 'var(--color-surface-elevated)',
          border: '1px solid var(--color-border)', borderRadius: '3px',
          boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={onClose}
          aria-label={closeLabel}
          style={{
            position: 'absolute', top: '1rem', right: '1rem', width: '2rem', height: '2rem',
            borderRadius: '50%', border: '1px solid var(--color-border)',
            background: 'transparent', color: 'var(--color-text)', cursor: 'pointer',
            fontSize: '1.2rem', lineHeight: 1,
          }}
        >×</button>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.year}</p>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', lineHeight: 1.1, color: 'var(--color-text)', marginBottom: '0.2rem' }}>{item.role}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>{item.company}</p>
        <p style={{ whiteSpace: 'pre-line', color: 'var(--color-text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>{item.fullDescription}</p>
      </div>
    </div>
  )
}
