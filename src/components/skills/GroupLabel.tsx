interface Props {
  label: string
  color: string
  delay: number
  visible: boolean
}

export default function GroupLabel({ label, color, delay, visible }: Props) {
  return (
    <p style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.22em',
      textTransform: 'uppercase', color,
      marginBottom: '1.1rem',
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      <span style={{ display: 'inline-block', width: '1.2rem', height: '1px', backgroundColor: color, opacity: 0.6 }} />
      {label}
    </p>
  )
}
