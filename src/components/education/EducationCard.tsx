import Tag from '../ui/Tag'
import DiplomaIcon from './DiplomaIcon'

export interface EduItem {
  year: string
  degree: string
  school: string
  description: string
  tags: string[]
}

interface Props {
  item: EduItem
  index: number
  delay: number
  visible: boolean
  color: string
  isMobile: boolean
}

export default function EducationCard({ item, index, delay, visible, color, isMobile }: Props) {
  const tx = !isMobile && index % 2 === 0 ? -28 : 28

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : `translateX(${tx}px)`,
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      padding: '1.75rem 2rem',
      backgroundColor: 'var(--color-surface-elevated)',
      border: '1px solid var(--color-border)',
      borderRadius: '2px',
      overflow: 'hidden',
      flex: 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
        <DiplomaIcon color={color} />
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color,
        }}>{item.year}</p>
      </div>

      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', fontWeight: 600,
        lineHeight: 1.1, letterSpacing: '-0.01em',
        color: 'var(--color-text)', marginBottom: '0.25rem',
      }}>{item.degree}</h3>

      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.78rem', letterSpacing: '0.04em',
        color: 'var(--color-text-muted)', marginBottom: '0.9rem',
      }}>{item.school}</p>

      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.79rem', lineHeight: 1.7,
        color: 'var(--color-text-muted)', marginBottom: '1.1rem',
      }}>{item.description}</p>

      {item.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {item.tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>
      )}
    </div>
  )
}
