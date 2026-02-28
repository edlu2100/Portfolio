import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'
import SkillChip from './skills/SkillChip'
import GroupLabel from './skills/GroupLabel'
import {
  SiTypescript, SiJavascript, SiPhp, SiDotnet, SiCss3, SiHtml5,
  SiMysql, SiReact, SiVuedotjs, SiJquery, SiLaravel,
  SiNodedotjs, SiWordpress, SiTailwindcss,
} from 'react-icons/si'
import { TbBrandCSharp, TbFileExcel } from 'react-icons/tb'
import { IconType } from 'react-icons'

const IMG_MAP: Record<string, string> = {
  'Dynamaker': '/logos/dynamakerLogo.webp',
}

const ICON_MAP: Record<string, IconType> = {
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'PHP': SiPhp,
  'C#': TbBrandCSharp,
  '.Net': SiDotnet,
  'CSS': SiCss3,
  'HTML': SiHtml5,
  'SQL': SiMysql,
  'React.js': SiReact,
  'React Native': SiReact,
  'Vue.js': SiVuedotjs,
  'jQuery': SiJquery,
  'Laravel': SiLaravel,
  'ASP.NET': SiDotnet,
  'Node.js': SiNodedotjs,
  'WordPress': SiWordpress,
  'Tailwind': SiTailwindcss,
  'Excel': TbFileExcel,
}

interface SkillData {
  heading: string
  subheading: string
  languages: string
  technologies: string
  items: { languages: string[]; technologies: string[] }
}


export default function Skills() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const s = (t as any).skills as SkillData
  const { ref, visible } = useInView()

  const color = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'
  // Logos that are dark/black and need inversion in dark mode to appear white
  const WHITE_IN_DARK = new Set(['Dynamaker'])

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
                icon={ICON_MAP[lang]}
                imgSrc={IMG_MAP[lang]}
                imgFilter={theme === 'dark' && WHITE_IN_DARK.has(lang) ? 'invert(1)' : undefined}
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
                icon={ICON_MAP[tech]}
                imgSrc={IMG_MAP[tech]}
                imgFilter={theme === 'dark' && WHITE_IN_DARK.has(tech) ? 'invert(1)' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
