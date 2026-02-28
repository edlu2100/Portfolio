import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import { useMobile } from '../hooks/useMobile'

export default function Footer() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const year = new Date().getFullYear()
  const cvHref = language === 'en' ? '/Edwin_Lundback_ENG_26.pdf' : '/Edwin_Lundback_SV_26_CV.pdf'
  const isMobile = useMobile()

  const links = [
    {
      href: cvHref,
      label: 'CV',
      download: true,
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="13" x2="12" y2="19"/>
          <line x1="9" y1="16" x2="15" y2="16"/>
        </svg>
      ),
    },
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
        justifyContent: isMobile ? 'center' : 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left',
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          {links.map(({ href, label, download, icon }) => {
            const tooltips: { [key: string]: string } = {
              'CV': 'Download CV',
              'edwinlundback@gmail.com': 'Send email',
              'linkedin.com/in/edwinlundback': 'Visit LinkedIn',
            }
            const tooltipText = tooltips[label] || label

            return (
              <a
                key={href}
                href={href}
                download={download}
                target={href.startsWith('mailto') || download ? undefined : '_blank'}
                rel={href.startsWith('mailto') || download ? undefined : 'noopener noreferrer'}
                title={tooltipText}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-muted)',
                  textDecoration: 'none',
                  fontWeight: label === 'CV' ? 600 : 400,
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = color)}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {icon}
                {label}
              </a>
            )
          })}
        </div>

      </div>
    </footer>
  )
}
