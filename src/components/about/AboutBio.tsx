interface OmData {
  bio1: string
  bio2: string
  bio3: string
  stats: { value: string; label: string }[]
  interestsLabel: string
  interests: string[]
}

interface Props {
  o: OmData
  color: string
  borderColor: string
  visible: boolean
}

function fade(visible: boolean, delay: number): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  }
}

export default function AboutBio({ o, color, borderColor, visible }: Props) {
  return (
    <div>
      {/* Stats bar */}
      <div style={{ ...fade(visible, 30), display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 0, marginBottom: '2.5rem' }}>
        {o.stats.map((s, i) => (
          <span key={s.label} style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.4rem', fontWeight: 600, color, letterSpacing: '-0.01em', lineHeight: 1,
            }}>{s.value}</span>
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--color-text-faint)', marginLeft: '0.3rem',
            }}>{s.label}</span>
            {i < o.stats.length - 1 && (
              <span style={{ margin: '0 0.75rem', color: 'var(--color-text-faint)', fontSize: '0.5rem', opacity: 0.35 }}>·</span>
            )}
          </span>
        ))}
      </div>

      {/* Intro quote */}
      <p style={{
        ...fade(visible, 80),
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
        fontWeight: 400, fontStyle: 'italic', lineHeight: 1.65,
        color: 'var(--color-text)', marginBottom: '2.25rem',
      }}>
        {o.bio1}
      </p>

      {/* Body paragraphs */}
      <p style={{
        ...fade(visible, 180),
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.93rem', fontWeight: 300, lineHeight: 1.9,
        color: 'var(--color-text-muted)', marginBottom: '1.5rem',
      }}>
        {o.bio2}
      </p>
      <p style={{
        ...fade(visible, 240),
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.93rem', fontWeight: 300, lineHeight: 1.9,
        color: 'var(--color-text-muted)', marginBottom: '2.75rem',
      }}>
        {o.bio3}
      </p>

      {/* Interests */}
      <div style={{ ...fade(visible, 360) }}>
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', color, marginBottom: '0.5rem',
        }}>
          {o.interestsLabel}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {o.interests.map((interest) => (
            <span
              key={interest}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.73rem', fontWeight: 400,
                padding: '0.35rem 0.85rem',
                border: `1px solid ${borderColor}`,
                borderRadius: '2px',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.04em',
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = color
                el.style.color = color
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = borderColor
                el.style.color = 'var(--color-text-muted)'
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
