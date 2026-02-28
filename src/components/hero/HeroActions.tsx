import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

interface SocialLink {
  href: string
  label: string
  path: string
  download?: boolean
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'mailto:edwinlundback@gmail.com',
    label: 'Mail',
    path: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  },
  {
    href: 'https://github.com/edlu2100',
    label: 'GitHub',
    path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
  {
    href: 'https://linkedin.com/in/edwinlundback',
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
]

interface Props {
  cta: string
  contact: string
  accentColor: string
  mounted: boolean
}

export default function HeroActions({ cta, contact, accentColor, mounted }: Props) {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const cvHref = language === 'en' ? '/Edwin_Lundback_ENG_26.pdf' : '/Edwin_Lundback_SV_26_CV.pdf'

  const socialLinks = [
    ...SOCIAL_LINKS.slice(0, 1),
    { href: cvHref, label: 'CV', download: true as const, path: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2 14 8 20 8 M12 13 12 19 M9 16 15 16' },
    ...SOCIAL_LINKS.slice(1),
  ]

  const fade = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(1.75rem)',
    transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
    transitionDelay: `${delay}ms`,
  })

  return (
    <>
      {/* CTA buttons */}
      <div style={{ ...fade(620), display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          href="#projekt"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            paddingLeft: '1.75rem', paddingRight: '1.75rem',
            paddingTop: '0.875rem', paddingBottom: '0.875rem',
            backgroundColor: theme === 'dark' ? 'var(--color-surface-elevated)' : 'transparent',
            color: theme === 'dark' ? '#D9D9D9' : 'var(--color-primary)',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.8rem', fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', borderRadius: '2px',
            border: '1px solid var(--color-primary)',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = theme === 'dark' ? 'transparent' : 'var(--color-surface-elevated)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = theme === 'dark' ? 'var(--color-surface-elevated)' : 'transparent'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          {cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <a
          href="#kontakt"
          style={{
            display: 'inline-flex', alignItems: 'center',
            paddingLeft: '1.75rem', paddingRight: '1.75rem',
            paddingTop: '0.875rem', paddingBottom: '0.875rem',
            backgroundColor: 'transparent',
            color: 'var(--color-accent)',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.8rem', fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            textDecoration: 'none', borderRadius: '2px',
            border: `1px solid ${accentColor}`,
            transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = accentColor
            ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-surface-elevated)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = accentColor
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.backgroundColor = theme === 'dark' ? 'transparent' : ''
          }}
        >
          {contact}
        </a>
      </div>

      {/* Social icons */}
      <div style={{ ...fade(720), display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
        {socialLinks.map(({ href, label, download, path }) => {
          const tooltips: { [key: string]: string } = {
            'Mail': 'Send email',
            'CV': 'Download CV',
            'GitHub': 'Visit GitHub',
            'LinkedIn': 'Visit LinkedIn',
          }
          const tooltipText = tooltips[label] || label

          return (
            <a
              key={label}
              href={href}
              download={download}
              target={href.startsWith('mailto') || download ? undefined : '_blank'}
              rel={href.startsWith('mailto') || download ? undefined : 'noopener noreferrer'}
              aria-label={label}
              title={tooltipText}
              style={{ color: accentColor, transition: 'color 0.2s ease, transform 0.2s ease', display: 'flex' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = theme === 'dark' ? 'var(--color-primary)' : 'var(--color-accent-warm)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = accentColor
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {path.split(' M').map((p, i) => (
                  <path key={i} d={i === 0 ? p : 'M' + p} />
                ))}
              </svg>
            </a>
          )
        })}
      </div>
    </>
  )
}
