import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import ThemeToggle from './navbar/ThemeToggle'
import LangToggle from './navbar/LangToggle'
import MobileMenu from './navbar/MobileMenu'

export default function Navbar() {
  const { t } = useLanguage()
  const navLinks = t.nav.links
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const ids = navLinks.map(l => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(ids[i]); return }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navLinks])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
        backgroundColor: scrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--color-border)' : 'none',
      }}>
        <div style={{
          maxWidth: '2000px', margin: '0 auto',
          padding: '0 1.5rem', height: '4rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#" className="relative font-bold tracking-tight group flex">
            <p className="text-text group-hover:text-primary-light transition-colors duration-300 text-2xl">Edwin Lundbäck</p>
            {/*<p className="text-primary text-2xl">.</p>*/ }
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-light group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a href={link.href} className={`relative tracking-wide transition-colors duration-300 ${isActive ? 'text-text' : 'text-text-text hover:text-text'}`}>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                  </a>
                </li>
              )
            })}
            <li><LangToggle /></li>
            <li><ThemeToggle /></li>
          </ul>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center"
            style={{ zIndex: 200 }}
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            <div className="relative w-6 h-5">
              <span style={{ position: 'absolute', left: 0, height: '1.5px', width: '24px', borderRadius: '99px', backgroundColor: 'var(--color-text)', top: mobileOpen ? '9px' : '0px', transform: mobileOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'top 0.3s ease, transform 0.3s ease 0.15s' }} />
              <span style={{ position: 'absolute', left: 0, top: '9px', height: '1.5px', width: mobileOpen ? '0px' : '16px', borderRadius: '99px', backgroundColor: 'var(--color-text)', opacity: mobileOpen ? 0 : 1, transition: 'width 0.2s ease, opacity 0.2s ease' }} />
              <span style={{ position: 'absolute', left: 0, height: '1.5px', width: mobileOpen ? '24px' : '20px', borderRadius: '99px', backgroundColor: 'var(--color-text)', top: mobileOpen ? '9px' : '18px', transform: mobileOpen ? 'rotate(-45deg)' : 'rotate(0deg)', transition: 'top 0.3s ease, transform 0.3s ease 0.15s, width 0.2s ease' }} />
            </div>
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} activeSection={activeSection} onClose={() => setMobileOpen(false)} />
    </>
  )
}
