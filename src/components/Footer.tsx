import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const year = new Date().getFullYear()

  const links = [
    {
      href: 'mailto:edwinlundback@gmail.com',
      label: 'edwinlundback@gmail.com',
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <path d="M22 6l-10 7L2 6"/>
        </svg>
      ),
    },
    {
      href: 'https://linkedin.com/in/edwinlundback',
      label: 'linkedin.com/in/edwinlundback',
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <path d="M2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
  ]

  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '3rem 0',
    }}>
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>

        {/* Copyright */}
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.72rem',
          letterSpacing: '0.06em',
          color: 'var(--color-text-faint)',
        }}>
          © {year} Edwin Lundbäck. All rights reserved.
        </p>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {links.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = color)}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              {icon}
              {label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  )
}
