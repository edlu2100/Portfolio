import { useLanguage, type Language } from '../../context/LanguageContext'
import { useTheme } from '../../context/ThemeContext'

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const pillStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '0.75rem',
  padding: '0.625rem 1.25rem',
  borderRadius: '99px', border: '1px solid var(--color-border)',
  backgroundColor: 'transparent', color: 'var(--color-text-muted)',
  cursor: 'pointer',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '0.8rem', letterSpacing: '0.08em',
}

interface Props {
  open: boolean
  activeSection: string
  onClose: () => void
}

export default function MobileMenu({ open, activeSection, onClose }: Props) {
  const { language, setLanguage, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const navLinks = t.nav.links

  const fadeIn = (i: number): React.CSSProperties => ({
    opacity: open ? 1 : 0,
    transform: open ? 'translateY(0)' : 'translateY(1.5rem)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    transitionDelay: open ? `${i * 80 + 150}ms` : '0ms',
  })

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', flexDirection: 'column',
      backgroundColor: 'var(--color-surface)',
      zIndex: 100,
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0)' : 'translateY(1.5rem)',
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity 0.45s cubic-bezier(0.76,0,0.24,1), transform 0.45s cubic-bezier(0.76,0,0.24,1)',
    }}>
      <div className="flex-1 flex flex-col items-center justify-center">

        {/* Nav links */}
        <ul className="space-y-6 text-center">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href} style={{ ...fadeIn(i), marginBottom: '16px' }}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className={`group relative inline-flex items-center gap-4 py-3 text-4xl font-bold tracking-tight transition-colors duration-200 ${isActive ? 'text-text' : 'text-text-muted hover:text-text'}`}
                >
                  <span
                    style={{ fontSize: '20px' }}
                    className={`font-normal tabular-nums transition-colors duration-200 ${isActive ? 'text-primary' : 'text-text-faint'}`}
                  >
                    0{i + 1}
                  </span>
                  <span className="relative">
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Language + Theme */}
        <div style={{ ...fadeIn(navLinks.length), display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
          <button onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv' as Language)} style={pillStyle}>
            <img
              src={language === 'sv' ? 'https://flagcdn.com/gb.svg' : 'https://flagcdn.com/se.svg'}
              alt={language === 'sv' ? 'English' : 'Svenska'}
              style={{ width: '1.1rem', height: '0.825rem', objectFit: 'cover', borderRadius: '2px' }}
            />
            {language === 'sv' ? 'English' : 'Svenska'}
          </button>
          <button onClick={toggleTheme} aria-label="Byt tema" style={pillStyle}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            {theme === 'dark' ? 'Ljust' : 'Mörkt'}
          </button>
        </div>

        {/* Social links */}
        <div style={{ ...fadeIn(navLinks.length + 1), display: 'flex', gap: '1.25rem', marginTop: '3rem' }}>
          <a href="https://github.com/edlu2100" target="_blank" rel="noopener noreferrer"
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-border hover:border-border-light transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5 text-text-muted group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-border hover:border-[#0A66C2]/50 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5 text-text-muted group-hover:text-[#0A66C2] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:edwin@example.com"
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-border hover:border-[#EA4335]/50 transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <svg className="w-5 h-5 text-text-muted group-hover:text-[#EA4335] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  )
}
