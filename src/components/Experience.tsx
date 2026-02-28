import { useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { useMobile } from '../hooks/useMobile'
import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'
import ExperienceCard from './experience/ExperienceCard'
import SlalomTrack, { buildPath, ROW_H } from './experience/SlalomTrack'
import MobileTimeline from './experience/MobileTimeline'


// ── Main component ──────────────────────────────────────────────────
export default function Experience() {
  const { t } = useLanguage()
  const e     = t.experience
  const items = e.items
  const n     = items.length

  const isMobile      = useMobile()
  const { theme }     = useTheme()
  const cardColor     = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)' 
  const { ref, visible } = useInView()
  const totalH        = n * ROW_H
  const pathD         = useMemo(() => buildPath(n), [n])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="erfarenhet"
      style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)', marginTop: '10px' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={e.heading} subheading={e.subheading} visible={visible} />

        {/* ── Layout branches: mobile vs desktop ── */}
        {isMobile ? (

          /* ── Mobile: vertical dot timeline ── */
          <MobileTimeline items={items} visible={visible} color={cardColor} />

        ) : (

          /* ── Desktop: three-column slalom layout ── */
          <div style={{ display: 'flex', position: 'relative' }}>

            {/* Left card column */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              {items.map((item, i) =>
                i % 2 === 0 ? (
                  <div key={i} style={{
                    height: ROW_H,
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                    paddingRight: '2.25rem',
                  }}>
                    <div style={{ width: '100%', maxWidth: 380 }}>
                      <ExperienceCard
                        item={item}
                        side="left"
                        delay={i * 160}
                        visible={visible}
                        color={cardColor}
                      />
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{ height: ROW_H }} />
                )
              )}
            </div>

            {/* Center track column */}
            <SlalomTrack pathD={pathD} totalH={totalH} items={items} />

            {/* Right card column */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              {items.map((item, i) =>
                i % 2 !== 0 ? (
                  <div key={i} style={{
                    height: ROW_H,
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                    paddingLeft: '2.25rem',
                  }}>
                    <div style={{ width: '100%', maxWidth: 380 }}>
                      <ExperienceCard
                        item={item}
                        side="right"
                        delay={i * 160}
                        visible={visible}
                        color={cardColor}
                      />
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{ height: ROW_H }} />
                )
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  )
}
