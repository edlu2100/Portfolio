import ExperienceCard from './ExperienceCard'
import type { ExpItem } from './ExperienceCard'
import { ROW_H } from './SlalomTrack'

interface Props {
  items: ExpItem[]
  visible: boolean
  color: string
}

export default function MobileTimeline({ items, visible, color }: Props) {
  const n = items.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch' }}>
          {/* Spine */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
            <div style={{
              width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}55`,
              marginTop: '1.6rem',
            }} />
            {i < n - 1 && (
              <div style={{
                width: 2, flex: 1,
                background: `linear-gradient(to bottom, ${color}, ${color})`,
                opacity: 0.3, marginTop: '0.5rem',
              }} />
            )}
          </div>

          {/* Card */}
          <div style={{ flex: 1, paddingBottom: i < n - 1 ? '1.75rem' : 0 }}>
            <ExperienceCard
              item={item}
              side="right"
              delay={i * 130}
              visible={visible}
              color={color}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Re-export ROW_H so callers don't need two imports
export { ROW_H }
