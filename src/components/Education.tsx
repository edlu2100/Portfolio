import { useLanguage } from '../context/LanguageContext'
import { useMobile } from '../hooks/useMobile'
import { useInView } from '../hooks/useInView'
import SectionHeader from './ui/SectionHeader'
import Tag from './ui/Tag'

// ── Decorative diploma/scroll SVG ───────────────────────────────────
function DiplomaIcon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="28" height="28"
      fill="none"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* Scroll body */}
      <rect x="6" y="10" width="36" height="28" rx="2"
        stroke={color} strokeWidth="1.8" fill="none" />
      {/* Top curl */}
      <path d="M6 13 Q6 10 10 10 Q6 10 6 13" stroke={color} strokeWidth="1.4" fill="none" />
      <path d="M42 13 Q42 10 38 10 Q42 10 42 13" stroke={color} strokeWidth="1.4" fill="none" />
      {/* Lines of text */}
      <line x1="14" y1="20" x2="34" y2="20" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="25" x2="30" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Ribbon seal */}
      <circle cx="24" cy="32" r="4" stroke={color} strokeWidth="1.4" fill="none" />
      <path d="M21.5 32 L24 29.5 L26.5 32 L24 34.5 Z" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  )
}

// ── EducationCard ────────────────────────────────────────────────────
interface EduItem {
  year: string
  degree: string
  school: string
  description: string
  tags: string[]
}

function EducationCard({
  item,
  delay,
  visible,
  color,
  index,
  isMobile,
}: {
  item: EduItem
  delay: number
  visible: boolean
  color: string
  index: number
  isMobile: boolean
}) {
  // Alternate: even index slides from left, odd from right
  const tx = !isMobile && index % 2 === 0 ? -28 : 28

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${tx}px)`,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        padding: '1.75rem 2rem',
        backgroundColor: 'var(--color-surface-elevated)',

        borderLeft: `3px solid ${color}`,
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      {/* Header row: icon + year */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '0.9rem', position: 'relative',
      }}>
        <DiplomaIcon color={"black"} />
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.18em',
          textTransform: 'uppercase', color,
        }}>{item.year}</p>
      </div>

      {/* Degree */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)', fontWeight: 600,
        lineHeight: 1.1, letterSpacing: '-0.01em',
        color: 'var(--color-text)', marginBottom: '0.25rem',
        position: 'relative',
      }}>{item.degree}</h3>

      {/* School */}
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.78rem', fontWeight: 400, letterSpacing: '0.04em',
        color: 'var(--color-text-muted)', marginBottom: '0.9rem',
        position: 'relative',
      }}>{item.school}</p>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.79rem', lineHeight: 1.7,
        color: 'var(--color-text-muted)', marginBottom: '1.1rem',
        position: 'relative',
      }}>{item.description}</p>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {item.tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────
export default function Education() {
  const { t } = useLanguage()
  const ed = (t as any).education as {
    heading: string
    subheading: string
    items: EduItem[]
  }

  const isMobile       = useMobile()
  const { ref, visible } = useInView()
  const COLORS         = ['#4f72ff', '#c4a97e']

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="utbildning"
      style={{ padding: '7rem 0', borderTop: '1px solid var(--color-border)' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <SectionHeader heading={ed.heading} subheading={ed.subheading} visible={visible} />

        {/* ── Cards + timeline ── */}
        {isMobile ? (
          /* Mobile: plain vertical stack */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {ed.items.map((item, i) => (
              <EducationCard
                key={i}
                item={item}
                delay={150 + i * 130}
                visible={visible}
                color={COLORS[i] ?? COLORS[COLORS.length - 1]}
                index={i}
                isMobile={true}
              />
            ))}
          </div>
        ) : (
          /* Desktop: cards side-by-side with center timeline */
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '1.5rem',
          }}>
            {ed.items.map((item, i) => (
              <EducationCard
                key={i}
                item={item}
                delay={150 + i * 150}
                visible={visible}
                color={COLORS[i] ?? COLORS[COLORS.length - 1]}
                index={i}
                isMobile={false}
              />
            ))}
          </div>
        )}

        {/* ── Bottom timeline bar (desktop only) ── */}
        {!isMobile && (
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.7s ease 500ms',
          }}>
            {COLORS.map((c, i) => (
              <div key={i} style={{
                flex: 1, height: 2,
                backgroundColor: c,
                opacity: 0.35,
                borderRadius: 1,
              }} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
