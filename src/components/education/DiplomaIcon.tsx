export default function DiplomaIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" style={{ display: 'block', flexShrink: 0 }} aria-hidden="true">
      <rect x="6" y="10" width="36" height="28" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
      <path d="M6 13 Q6 10 10 10 Q6 10 6 13" stroke={color} strokeWidth="1.4" fill="none" />
      <path d="M42 13 Q42 10 38 10 Q42 10 42 13" stroke={color} strokeWidth="1.4" fill="none" />
      <line x1="14" y1="20" x2="34" y2="20" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="25" x2="30" y2="25" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="24" cy="32" r="4" stroke={color} strokeWidth="1.4" fill="none" />
      <path d="M21.5 32 L24 29.5 L26.5 32 L24 34.5 Z" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  )
}
