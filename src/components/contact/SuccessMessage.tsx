interface Props {
  title: string
  msg: string
  color: string
}

export default function SuccessMessage({ title, msg, color }: Props) {
  return (
    <div style={{
      padding: '2.5rem',
      border: `1px solid ${color}44`,
      borderRadius: '2px',
      background: `${color}08`,
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.5rem', fontWeight: 600, color, marginBottom: '0.5rem',
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.85rem', color: 'var(--color-text-muted)',
      }}>
        {msg}
      </p>
    </div>
  )
}
