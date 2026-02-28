import { useState } from 'react'
import type { IconType } from 'react-icons'

interface Props {
  label: string
  delay: number
  visible: boolean
  accentColor: string
  icon?: IconType
  imgSrc?: string
  imgFilter?: string
}

export default function SkillChip({ label, delay, visible, accentColor, icon: Icon, imgSrc, imgFilter }: Props) {
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
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
      }}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt={label}
          style={{ height: '0.95rem', width: 'auto', objectFit: 'contain', opacity: hovered ? 1 : 0.65, transition: 'opacity 0.25s ease', filter: imgFilter }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
      )}
      {!imgSrc && Icon && (
        <Icon style={{ fontSize: '0.95rem', flexShrink: 0, opacity: hovered ? 1 : 0.65, transition: 'opacity 0.25s ease' }} />
      )}
      {label}
    </div>
  )
}
