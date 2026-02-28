interface Props {
  label: string
  mounted: boolean
}

export default function HeroScrollIndicator({ label, mounted }: Props) {
  const style: React.CSSProperties = {
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(1.75rem)',
    transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
    transitionDelay: '800ms',
    position: 'absolute',
    bottom: '2.5rem',
    left: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  }

  return (
    <div style={style}>
      <div style={{
        width: '1px',
        height: '3rem',
        background: 'linear-gradient(to bottom, var(--color-border-light), transparent)',
        animation: 'scrollLine 2s ease-in-out infinite',
      }} />
      <span style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-text-faint)',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
      }}>
        {label}
      </span>
    </div>
  )
}
