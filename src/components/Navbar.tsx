import { useState, useEffect } from 'react'
import { useLanguage, type Language } from '../context/LanguageContext'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const navLinks = t.nav.links
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Spåra scroll för bakgrundseffekt + aktiv sektion
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const ids = navLinks.map(l => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(ids[i])
          return
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lås body-scroll när mobilmenyn är öppen
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 transition-all duration-500 ${
          scrolled
            ? 'bg-surface/85 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border'
            : 'bg-transparent'
        }`}
        style={{ zIndex: 200 }}
      >
        <div className="w-full h-16 flex items-center justify-between" style={{ position: 'relative', maxWidth: '2000px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          {/* Logo – vänster */}
          <a href="#" className="relative text-xl font-bold tracking-tight group flex">
            <p className="text-text group-hover:text-primary-light transition-colors duration-300 text-2xl">
              Edwin Lundbäck
            </p>
            <p className="text-primary text-2xl">.</p>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-light group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop – höger-justerade länkar + flagga */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative text-m tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'text-text'
                        : 'text-text-muted hover:text-text'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
            {/* Flagga – sist i listan */}
            <li>
              <button
                onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv' as Language)}
                className="flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Byt språk"
                title={language === 'sv' ? 'Switch to English' : 'Byt till svenska'}
                style={{ width: '1.3rem', height: '1rem', borderRadius: '2px', overflow: 'hidden' }}
              >
                <img
                  src={language === 'sv' ? 'https://flagcdn.com/gb.svg' : 'https://flagcdn.com/se.svg'}
                  alt={language === 'sv' ? 'English' : 'Svenska'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </button>
            </li>
          </ul>

          {/* Hamburger – höger (endast mobil) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            style={{ zIndex: 200 }}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            <div className="relative w-6 h-5">
              {/* Linje 1 – roterar till övre del av X */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  height: '1.5px',
                  width: '24px',
                  borderRadius: '99px',
                  backgroundColor: 'var(--color-text)',
                  top: mobileOpen ? '9px' : '0px',
                  transform: mobileOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'top 0.3s ease, transform 0.3s ease 0.15s',
                }}
              />
              {/* Linje 2 – mittlinjen, försvinner */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '9px',
                  height: '1.5px',
                  width: mobileOpen ? '0px' : '16px',
                  borderRadius: '99px',
                  backgroundColor: 'var(--color-text)',
                  opacity: mobileOpen ? 0 : 1,
                  transition: 'width 0.2s ease, opacity 0.2s ease',
                }}
              />
              {/* Linje 3 – roterar till nedre del av X */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  height: '1.5px',
                  width: mobileOpen ? '24px' : '20px',
                  borderRadius: '99px',
                  backgroundColor: 'var(--color-text)',
                  top: mobileOpen ? '9px' : '18px',
                  transform: mobileOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                  transition: 'top 0.3s ease, transform 0.3s ease 0.15s, width 0.2s ease',
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ====== Mobilmeny – fullscreen ====== */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0e1a',
          zIndex: 100,
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(1.5rem)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.45s cubic-bezier(0.76, 0, 0.24, 1), transform 0.45s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >

        <div
          className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            mobileOpen ? 'scale-100' : 'scale-105'
          }`}
        >
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #4f72ff, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #d9c8a8, transparent 70%)' }} />
        </div>

        {/* Centrerade länkar */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <ul className="space-y-1 text-center">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li
                  key={link.href}
                  style={{
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(1.5rem)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: mobileOpen ? `${index * 80 + 150}ms` : '0ms',
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group relative inline-flex items-center gap-4 py-3 text-4xl font-bold tracking-tight transition-colors duration-200 ${
                      isActive ? 'text-text' : 'text-text-muted hover:text-text'
                    }`}
                  >
                    <span className={`text-xs font-normal tabular-nums transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-text-faint'
                    }`}>
                      0{index + 1}
                    </span>
                    <span className="relative">
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Språkväljare (mobil) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '2.5rem',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(1.5rem)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              transitionDelay: mobileOpen ? `${navLinks.length * 80 + 150}ms` : '0ms',
            }}
          >
            <button
              onClick={() => setLanguage(language === 'sv' ? 'en' : 'sv' as Language)}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-200"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
            >
              <img
                src={language === 'sv' ? 'https://flagcdn.com/gb.svg' : 'https://flagcdn.com/se.svg'}
                alt={language === 'sv' ? 'English' : 'Svenska'}
                style={{ width: '1.5rem', height: '1.125rem', objectFit: 'cover', borderRadius: '2px', display: 'block' }}
              />
              <span className="text-sm tracking-widest">{language === 'sv' ? 'English' : 'Svenska'}</span>
            </button>
          </div>

          {/* Sociala medier – under länkarna */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginTop: '3rem',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(1.5rem)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              transitionDelay: mobileOpen ? `${navLinks.length * 80 + 280}ms` : '0ms',
            }}
          >
            {/* GitHub */}
            <a href="https://github.com/edlu2100" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-border hover:border-border-light transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 text-text-muted group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-border hover:border-[#0A66C2]/50 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-text-muted group-hover:text-[#0A66C2] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* E-post */}
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
    </>
  )
}
