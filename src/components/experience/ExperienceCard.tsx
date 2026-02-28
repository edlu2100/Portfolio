export interface ExpItem {
  year: string
  role: string
  company: string
  description: string
  tags: string[]
}

interface Props {
  item: ExpItem
  side: 'left' | 'right'
  delay: number
  visible: boolean
  color: string
}

export default function ExperienceCard({ item, side, delay, visible, color }: Props) {
  const tx = side === 'left' ? -28 : 28

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : `translateX(${tx}px)`,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      padding: '1.5rem 1.75rem',
      backgroundColor: 'var(--color-surface-light)',
      border: '1px solid var(--color-border)',
      borderRadius: '2px',
    }}>
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em',
        textTransform: 'uppercase', color, marginBottom: '0.5rem',
      }}>{item.year}</p>

      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.35rem, 2.2vw, 1.8rem)', fontWeight: 600,
        lineHeight: 1.1, letterSpacing: '-0.01em',
        color: 'var(--color-text)', marginBottom: '0.2rem',
      }}>{item.role}</h3>

      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.78rem', letterSpacing: '0.03em',
        color: 'var(--color-text-muted)', marginBottom: '0.8rem',
      }}>{item.company}</p>

      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.79rem', lineHeight: 1.7,
        color: 'var(--color-text-muted)', marginBottom: '1rem',
      }}>{item.description}</p>

      {item.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '0.28rem 0.6rem',
              paddingLeft: '0',
              backgroundColor: `${color}18`,
              color: color,
              borderRadius: '2px',
            }}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}
