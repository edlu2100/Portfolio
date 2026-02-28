import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import SectionHeader from './ui/SectionHeader'
import ProjectCard from './projects/ProjectCard'
import ProjectModal from './projects/ProjectModal'
import type { Project } from './projects/types'

const PER_PAGE = 3

export default function Projects() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const p = t.projects
  const [active, setActive] = useState<{ project: Project; index: number } | null>(null)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(p.items.length / PER_PAGE)
  const visible = p.items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const accent = theme === 'dark' ? 'var(--color-accent-warm)' : 'var(--color-primary)'

  return (
    <>
      <section
        id="projekt"
        style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
      >
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem' }}>
            <SectionHeader heading={p.heading} subheading={p.subheading} noMargin />

            {/* Nav arrows */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button
                  onClick={() => setPage(pg => Math.max(0, pg - 1))}
                  disabled={page === 0}
                  aria-label="Föregående"
                  style={{
                    width: '2.4rem', height: '2.4rem', borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: page === 0 ? 'var(--color-text-muted)' : 'var(--color-text)',
                    cursor: page === 0 ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: page === 0 ? 0.35 : 1,
                    transition: 'opacity 0.18s, border-color 0.18s',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  onClick={() => setPage(pg => Math.min(totalPages - 1, pg + 1))}
                  disabled={page === totalPages - 1}
                  aria-label="Nästa"
                  style={{
                    width: '2.4rem', height: '2.4rem', borderRadius: '50%',
                    border: `1px solid ${page < totalPages - 1 ? accent : 'var(--color-border)'}`,
                    backgroundColor: page < totalPages - 1 ? accent : 'transparent',
                    color: page < totalPages - 1 ? '#fff' : 'var(--color-text-muted)',
                    cursor: page === totalPages - 1 ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: page === totalPages - 1 ? 0.35 : 1,
                    transition: 'opacity 0.18s, background-color 0.18s, border-color 0.18s',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}>
            {visible.map((project) => {
              const index = p.items.indexOf(project)
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setActive({ project, index })}
                />
              )
            })}
          </div>

          {/* Page dots */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '2rem' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: i === page ? '1.6rem' : '0.35rem',
                    height: '0.35rem', borderRadius: '99px', padding: 0,
                    border: 'none', cursor: 'pointer',
                    backgroundColor: i === page ? accent : 'var(--color-border)',
                    transition: 'width 0.22s ease, background-color 0.22s',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {active && (
        <ProjectModal
          project={active.project}
          index={active.index}
          onClose={() => setActive(null)}
          labels={{ viewCode: p.viewCode, viewLive: p.viewLive, close: p.close, viewReport: p.viewReport }}
        />
      )}
    </>
  )
}
