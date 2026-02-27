interface Props {
  heading: string
  subheading: string
  visible?: boolean
}

export default function SectionHeader({ heading, subheading, visible = true }: Props) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      marginBottom: '3.5rem',
    }}>
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--color-primary)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '0.75rem',
      }}>
        <span style={{ display: 'inline-block', width: '2rem', height: '1px', backgroundColor: 'var(--color-primary)', opacity: 0.6 }} />
        {subheading}
      </p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 600,
        lineHeight: 1.0, letterSpacing: '-0.02em',
        color: 'var(--color-text)',
      }}>{heading}</h2>
    </div>
  )
}
