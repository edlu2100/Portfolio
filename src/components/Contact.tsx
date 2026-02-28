import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
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
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { ref, visible } = useInView()

  const c = (t as any).contact as ContactData
  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="kontakt"
      style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={c.heading} subheading={c.subheading} visible={visible} />

        <div style={{ maxWidth: '42rem' }}>
          <ContactForm c={c} color={color} theme={theme} visible={visible} />
        </div>
      </div>
    </section>
  )
}
