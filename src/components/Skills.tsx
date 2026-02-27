import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'

interface SkillData {
  heading: string
  subheading: string
  languages: string
  technologies: string
  items: { languages: string[]; technologies: string[] }
}

function SkillChip({
  label, delay, visible, accentColor,
}: {
  label: string
  delay: number
  visible: boolean
  accentColor: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,

        transition:
          `opacity 0.5s ease ${delay}ms, ` +
          `transform 0.5s ease ${delay}ms, ` +
          `border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease`,
        padding: '0.5rem 1.1rem',
        backgroundColor: 'var(--color-surface-elevated)',
        border: '1px solid',
        borderColor: hovered ? accentColor + '66' : 'var(--color-border)',
        borderRadius: '2px',
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.75rem',
        fontWeight: 500,
        letterSpacing: '0.07em',
        color: hovered ? accentColor : 'var(--color-text)',
        cursor: 'default',
        userSelect: 'none' as const,
        boxShadow: hovered ? `0 6px 20px ${accentColor}1a` : 'none',
      }}
    >
      {label}
    </div>
  )
}

function GroupLabel({
  label, color, delay, visible,
}: {
  label: string
  color: string
  delay: number
  visible: boolean
}) {
  return (
    <p style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.22em',
      textTransform: 'uppercase', color,
      marginBottom: '1.1rem',
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      <span style={{ display: 'inline-block', width: '1.2rem', height: '1px', backgroundColor: color, opacity: 0.6 }} />
      {label}
    </p>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const s = (t as any).skills as SkillData
  const { ref, visible } = useInView()

  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="kompetenser"
      style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={s.heading} subheading={s.subheading} visible={visible} />

        {/* ── Languages ── */}
        <div style={{ marginBottom: '3rem' }}>
          <GroupLabel label={s.languages} color={color} delay={80} visible={visible} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
            {s.items.languages.map((lang, i) => (
              <SkillChip
                key={lang}
                label={lang}
                delay={130 + i * 45}
                visible={visible}
                accentColor={color}
              />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{
          height: '1px',
          backgroundColor: 'var(--color-border)',
          marginBottom: '3rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease 400ms',
        }} />

        {/* ── Technologies ── */}
        <div>
          <GroupLabel label={s.technologies} color={color} delay={480} visible={visible} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
            {s.items.technologies.map((tech, i) => (
              <SkillChip
                key={tech}
                label={tech}
                delay={530 + i * 45}
                visible={visible}
                accentColor={color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
