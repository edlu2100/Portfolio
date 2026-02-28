import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import { useMobile } from '../hooks/useMobile'
import SectionHeader from './ui/SectionHeader'
import AboutBio from './about/AboutBio'
import AboutPhoto from './about/AboutPhoto'

export default function About() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { ref, visible } = useInView()
  const isMobile = useMobile(900)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = (t as any).om as {
    heading: string
    subheading: string
    bio1: string
    bio2: string
    bio3: string
    stats: { value: string; label: string }[]
    interestsLabel: string
    interests: string[]
  }

  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  const borderColor = theme === 'dark' ? 'rgba(169,138,92,0.2)' : 'rgba(31,58,95,0.15)'

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="om"
      style={{ padding: isMobile ? '5rem 0' : '7rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={o.heading} subheading={o.subheading} visible={visible} />

        {isMobile ? (
          /* ── Mobile: stacked ── */
          <div>
            {/* Photo centered at top */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.75rem' }}>
              <div style={{ width: '100%', maxWidth: '280px' }}>
                <AboutPhoto color={color} borderColor={borderColor} visible={visible} isMobile />
              </div>
            </div>
            {/* Bio below */}
            <AboutBio o={o} color={color} borderColor={borderColor} visible={visible} />
          </div>
        ) : (
          /* ── Desktop: two-column ── */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,340px)',
            gap: '5rem',
            alignItems: 'start',
          }}>
            <div>
              <AboutBio o={o} color={color} borderColor={borderColor} visible={visible} />
            </div>
            <AboutPhoto color={color} borderColor={borderColor} visible={visible} />
          </div>
        )}
      </div>
    </section>
  )
}
