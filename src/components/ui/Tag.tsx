export default function Tag({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '0.28rem 0.6rem',
      backgroundColor: 'var(--color-primary-muted)',
      color: 'var(--color-primary-light)',
      borderRadius: '2px',
    }}>{label}</span>
  )
}
