import { useTheme } from '../../context/ThemeContext'

interface Props {
  heading: string
  subheading: string
  visible?: boolean
  noMargin?: boolean
}

const Swirl = ({ color }: { color: string }) => (
  <svg width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path
      d="M1 10 C5 2, 11 2, 12 7 C13 12, 19 12, 23 4"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
      opacity="0.75"
    />
  </svg>
)
const Mountain = ({ color }: { color: string }) => (
  <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <polyline
      points="0,13  6,4  10,8  16,1  22,8  28,13"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity="0.75"
    />
  </svg>
)

export default function SectionHeader({ heading, subheading, visible = true, noMargin = false }: Props) {
  const { theme } = useTheme()
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      marginBottom: noMargin ? 0 : '3.5rem',
    }}>
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em',
        textTransform: 'uppercase', color,
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        marginBottom: '0.75rem',
      }}>
        {/*<Swirl color={color} />*/}
        <Mountain color={color} />
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
