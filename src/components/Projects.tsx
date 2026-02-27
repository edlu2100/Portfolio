import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import SectionHeader from './ui/SectionHeader'
import ProjectCard from './projects/ProjectCard'
import ProjectModal from './projects/ProjectModal'
import type { Project } from './projects/types'

export default function Projects() {
  const { t } = useLanguage()
  const p = t.projects
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section
        id="projekt"
        style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <SectionHeader heading={p.heading} subheading={p.subheading} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
            gap: '1.5rem',
          }}>
            {p.items.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setActive(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {active && (
        <ProjectModal
          project={active}
          onClose={() => setActive(null)}
          labels={{ viewCode: p.viewCode, viewLive: p.viewLive, close: p.close }}
        />
      )}
    </>
  )
}
