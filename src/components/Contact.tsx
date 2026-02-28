import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import { useMobile } from '../hooks/useMobile'
import SectionHeader from './ui/SectionHeader'
import ContactForm from './contact/ContactForm'

interface ContactData {
  heading: string
  subheading: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  send: string
  sending: string
  successTitle: string
  successMsg: string
  errorMsg: string
}

export default function Contact() {
  const { t, language } = useLanguage()
  const { theme } = useTheme()
  const { ref, visible } = useInView()
  const isMobile = useMobile(860)

  const c = (t as any).contact as ContactData
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const cvHref = language === 'en' ? '/Edwin_Lundback_ENG_26.pdf' : '/Edwin_Lundback_SV_26_CV.pdf'

  const CONTACT_LINKS = [
    {
      href: 'mailto:edwinlundback@gmail.com',
      label: 'edwinlundback@gmail.com',
      sublabel: 'Email',
      download: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <path d="M22 6l-10 7L2 6"/>
        </svg>
      ),
    },
    {
      href: 'https://linkedin.com/in/edwinlundback',
      label: 'linkedin.com/in/edwinlundback',
      sublabel: 'LinkedIn',
      download: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <path d="M2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      href: 'https://github.com/edlu2100',
      label: 'github.com/edlu2100',
      sublabel: 'GitHub',
      download: false,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
    },
    {
      href: cvHref,
      label: '',
      sublabel: language === 'en' ? 'Download CV' : 'Ladda ner CV',
      download: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="13" x2="12" y2="19"/>
          <line x1="9" y1="16" x2="15" y2="16"/>
        </svg>
      ),
    },
  ]

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="kontakt"
      style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={c.heading} subheading={c.subheading} visible={visible} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: isMobile ? '2.5rem' : '5rem',
          alignItems: 'start',
        }}>

          {/* Left column – info */}
          <div style={fade(100)}>
            <p style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.85,
              color: 'var(--color-text-muted)',
              marginBottom: '2.5rem',
            }}>
              {(t as any).lang === 'en'
                ? "Have a project in mind or just want to connect? I'm always open to new opportunities and conversations."
                : 'Har du ett projekt på gång eller vill du bara ta kontakt? Jag är alltid öppen för nya möjligheter och samtal.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CONTACT_LINKS.map(({ href, label, sublabel, download, icon }) => {
                const isCV = download === true
                const iconColor = isCV && theme === 'light' ? 'var(--color-primary)' : color
                const textColor = isCV && theme === 'light' ? 'var(--color-primary)' : 'var(--color-text-muted)'
                return (
                  <a
                    key={href}
                    href={href}
                    download={download}
                    target={href.startsWith('mailto') || download ? undefined : '_blank'}
                    rel={href.startsWith('mailto') || download ? undefined : 'noopener noreferrer'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.9rem 1.1rem',
                      background: 'var(--color-surface-elevated)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: 'var(--color-text)',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = color
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateX(0)'
                    }}
                  >
                    <span style={{ color: iconColor, flexShrink: 0 }}>{icon}</span>
                    {label ? (
                      <div>
                        <p style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-faint)',
                          marginBottom: '0.15rem',
                        }}>{sublabel}</p>
                        <p style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '0.8rem',
                          color: textColor,
                        }}>{label}</p>
                      </div>
                    ) : (
                      <p style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: textColor,
                        flex: 1,
                        textAlign: 'center',
                        marginRight: '20px',
                      }}>{sublabel}</p>
                    )}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right column – form */}
          <div style={{ ...fade(200), marginTop: isMobile ? '1.5rem' : 0 }}>
            <ContactForm c={c} color={color} theme={theme} visible={visible} />
          </div>

        </div>
      </div>
    </section>
  )
}
