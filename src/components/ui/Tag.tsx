import { useTheme } from '../../context/ThemeContext'

export default function Tag({ label }: { label: string }) {
  const { theme } = useTheme()
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const bg = theme === 'dark' ? 'rgba(169,138,92,0.1)' : 'rgba(31,58,95,0.08)'
  const border = theme === 'dark' ? 'rgba(169,138,92,0.3)' : 'rgba(31,58,95,0.2)'

  return (
    <span style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.14em',
      textTransform: 'uppercase',
      padding: '0.28rem 0.65rem',
      backgroundColor: bg,
      color: color,
      border: `1px solid ${border}`,
      borderRadius: '2px',
    }}>{label}</span>
  )
}
