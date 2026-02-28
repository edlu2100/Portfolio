import { useLanguage } from '../context/LanguageContext'
import { useMobile } from '../hooks/useMobile'
import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'
import EducationCard from './education/EducationCard'
import type { EduItem } from './education/EducationCard'

export default function Education() {
  const { t } = useLanguage()
  const ed = (t as any).education as { heading: string; subheading: string; items: EduItem[] }
  const isMobile       = useMobile()
  const { ref, visible } = useInView()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="utbildning"
      style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={ed.heading} subheading={ed.subheading} visible={visible} />

        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: 'stretch' }}>
          {ed.items.map((item, i) => (
            <EducationCard
              key={i}
              item={item}
              index={i}
              delay={150 + i * 140}
              visible={visible}
              color={'var(--color-text)'}
              isMobile={isMobile}
            />
          ))}
        </div>


      </div>
    </section>
  )
}
