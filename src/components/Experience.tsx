import { useEffect, useRef, useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'

// ── Storslalom (GS) constants ───────────────────────────────────────
const GATE_RED   = '#e8341a'
const GATE_BLUE  = '#1a4de8'
const ROW_H      = 230    // desktop: px per experience row
const SVG_W      = 200    // width of the center track column
const CX         = SVG_W / 2   // 100 — center x
const PASS_AMP   = 90     // skier passes at CX ± 75
const GATE_WIDTH = 25     // distance between the two poles
const GATE_INSET = 15     // how far the outer pole sits inside (toward center from) the line
const PANEL_H    = 12     // GS panel height (px)
const PANEL_DY   = -30    // panel top offset above gateY
const POLE_W     = 3.5    // pole visual width

// Snow-spray offsets near inner pole [dx, dy], mirrored per gate side
const SPRAY_IN: [number, number][] = [[-4, -18], [-11, -9], [-16, -1], [-10, 9], [-4, 17]]
const SPRAY_R_VAL = [1.1, 0.9, 1.3, 0.8, 1.0]
const SPRAY_O_VAL = [0.14, 0.11, 0.17, 0.09, 0.13]

// ── Helper functions ────────────────────────────────────────────────
function gateColor(i: number) { return i % 2 === 0 ? GATE_RED : GATE_BLUE }

// X where skier's line passes the gate (just inside the inner pole)
function passX(i: number) { return i % 2 === 0 ? CX - PASS_AMP : CX + PASS_AMP }

// Y center of the i-th gate
function gateY(i: number) { return i * ROW_H + ROW_H / 2 }

// ── GS line: direct gate-to-gate, no return to center ───────────────
// Each segment is a cubic bezier where both control points sit vertically
// above/below their endpoint — this creates a clean arc that transitions
// from one gate side to the other in a single smooth motion.
function buildPath(n: number): string {
  if (n === 0) return ''

  // Key points: phantom start, each gate pass, phantom end
  const pts: { x: number; y: number }[] = [
    { x: CX,         y: 0       },          // start (top, centered)
    ...Array.from({ length: n }, (_, i) => ({ x: passX(i), y: gateY(i) })),
    { x: CX,         y: n * ROW_H },        // end (bottom, centered)
  ]

  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i]
    const p1 = pts[i + 1]
    const dy = p1.y - p0.y
    // Control points: stay at each endpoint's X, displaced 45 % of dy vertically.
    // Result: the curve holds its lateral position going into/out of each gate,
    // then bends across in the middle — the optimal GS "lazy S" line.
    d += ` C ${p0.x} ${p0.y + dy * 0.45}, ${p1.x} ${p1.y - dy * 0.45}, ${p1.x} ${p1.y}`
  }
  return d
}

// ── useMobile hook ──────────────────────────────────────────────────
function useMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return m
}

// ── ExperienceCard ──────────────────────────────────────────────────
interface ExpItem {
  year: string
  role: string
  company: string
  description: string
  tags: string[]
}

function ExperienceCard({
  item, side, delay, visible, color,
}: {
  item: ExpItem
  side: 'left' | 'right'
  delay: number
  visible: boolean
  color: string
}) {
  const tx = side === 'left' ? -28 : 28

  return (
    <div
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateX(0)' : `translateX(${tx}px)`,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        padding: '1.5rem 1.75rem',
        backgroundColor: 'var(--color-surface-elevated)',
        border:     '1px solid var(--color-border)',
        borderLeft: `3px solid ${color}`,
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background gradient flush with accent color */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(135deg, ${color}08 0%, transparent 60%)`,
      }} />

      {/* Year */}
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em',
        textTransform: 'uppercase', color, marginBottom: '0.5rem',
        position: 'relative',
      }}>{item.year}</p>

      {/* Role */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.35rem, 2.2vw, 1.8rem)', fontWeight: 600,
        lineHeight: 1.1, letterSpacing: '-0.01em',
        color: 'var(--color-text)', marginBottom: '0.2rem',
        position: 'relative',
      }}>{item.role}</h3>

      {/* Company */}
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.78rem', fontWeight: 400, letterSpacing: '0.03em',
        color: 'var(--color-text-muted)', marginBottom: '0.8rem',
        position: 'relative',
      }}>{item.company}</p>

      {/* Description */}
      <p style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: '0.79rem', lineHeight: 1.7,
        color: 'var(--color-text-muted)', marginBottom: '1rem',
        position: 'relative',
      }}>{item.description}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', position: 'relative' }}>
        {item.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.28rem 0.6rem',
            backgroundColor: 'var(--color-primary-muted)',
            color: 'var(--color-primary-light)',
            borderRadius: '2px',
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────
export default function Experience() {
  const { t } = useLanguage()
  const e      = t.experience
  const items  = e.items
  const n      = items.length

  const isMobile  = useMobile()
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Trigger card animations when section scrolls into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 },
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const totalH = n * ROW_H

  // Build SVG path once
  const pathD = useMemo(() => buildPath(n), [n])

  return (
    <section
      ref={sectionRef}
      id="erfarenhet"
      style={{
        padding: '7rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{
        maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto',
        paddingLeft: '1.5rem', paddingRight: '1.5rem',
      }}>

        {/* ── Section header ── */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '0.75rem',
          }}>
            <span style={{
              display: 'inline-block', width: '2rem', height: '1px',
              backgroundColor: 'var(--color-primary)', opacity: 0.6,
            }} />
            {e.subheading}
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 600,
            lineHeight: 1.05, letterSpacing: '-0.02em',
            color: 'var(--color-text)',
          }}>{e.heading}</h2>
        </div>

        {/* ── Layout branches: mobile vs desktop ── */}
        {isMobile ? (

          /* ── Mobile: vertical dot timeline ── */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch' }}>

                {/* Spine column */}
                <div style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', flexShrink: 0, width: 20,
                }}>
                  {/* Gate dot */}
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                    backgroundColor: gateColor(i),
                    boxShadow: `0 0 10px ${gateColor(i)}55`,
                    marginTop: '1.6rem',
                  }} />
                  {/* Connector line */}
                  {i < n - 1 && (
                    <div style={{
                      width: 2, flex: 1,
                      background: `linear-gradient(to bottom, ${gateColor(i)}, ${gateColor(i + 1)})`,
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
                    color={gateColor(i)}
                  />
                </div>
              </div>
            ))}
          </div>

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
                        color={gateColor(i)}
                      />
                    </div>
                  </div>
                ) : (
                  <div key={i} style={{ height: ROW_H }} />
                )
              )}
            </div>

            {/* Center track column */}
            <div style={{
              flex: `0 0 ${SVG_W}px`,
              position: 'relative',
              height: totalH,
            }}>
              <svg
                viewBox={`0 0 ${SVG_W} ${totalH}`}
                width={SVG_W}
                height={totalH}
                overflow="visible"
                style={{ position: 'absolute', top: 0, left: 0 }}
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ── Ski track path ── */}
                {/* Outer glow layer */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="6"
                  strokeOpacity="0.06"
                  strokeLinecap="round"
                />
                {/* Main track line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="1.8"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
                {/* Dashed ski-mark overlay */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="var(--color-text)"
                  strokeWidth="0.7"
                  strokeOpacity="0.07"
                  strokeDasharray="2.5 7"
                  strokeLinecap="round"
                />

                {/* ── Per-gate GS elements ── */}
                {items.map((_, i) => {
                  const px        = passX(i)
                  const gy        = gateY(i)
                  const col       = gateColor(i)
                  // dir: -1 = left (even gate), +1 = right (odd gate)
                  const dir       = i % 2 === 0 ? -1 : 1
                  // Outer pole: GATE_INSET toward center from the line
                  const outerX    = px - dir * GATE_INSET
                  // Inner pole: GATE_WIDTH further inward from outer pole
                  const innerX    = outerX - dir * GATE_WIDTH
                  const panelL    = Math.min(innerX, outerX)
                  const panelTop  = gy + PANEL_DY
                  const poleTop   = panelTop - 16
                  const poleBtm   = gy          // both poles same length
                  const sprayMul  = dir

                  return (
                    <g key={i}>

                      {/* ── Inner pole ── */}
                      <rect
                        x={innerX - POLE_W / 2} y={poleTop}
                        width={POLE_W} height={poleBtm - poleTop}
                        fill={col} rx="2"
                      />
                      <circle cx={innerX} cy={poleBtm} r={3}
                        fill={col} fillOpacity="0.25" />

                      {/* ── Outer pole ── */}
                      <rect
                        x={outerX - POLE_W / 2} y={poleTop}
                        width={POLE_W} height={poleBtm - poleTop}
                        fill={col} rx="2"
                      />

                      <circle cx={outerX} cy={poleBtm} r={3}
                        fill={col} fillOpacity="0.25" />

                      {/* ── GS panel (banner between poles) ── */}
                      {/* Shadow/depth layer */}
                      <rect
                        x={panelL} y={panelTop + 1}
                        width={GATE_WIDTH} height={PANEL_H}
                        fill="black" fillOpacity="0.25" rx="2"
                      />
                      {/* Main panel */}
                      <rect
                        x={panelL} y={panelTop}
                        width={GATE_WIDTH} height={PANEL_H}
                        fill={col} rx="2"
                      />
                      {/* White horizontal stripe across panel center */}
                      <rect
                        x={panelL} y={panelTop + PANEL_H / 2 - 1.5}
                        width={GATE_WIDTH} height={3}
                        fill="white" fillOpacity="0.3"
                      />
                      {/* Panel sheen */}
                      <rect
                        x={panelL} y={panelTop}
                        width={GATE_WIDTH} height={PANEL_H / 2}
                        fill="white" fillOpacity="0.08" rx="2"
                      />

                      {/* ── Skier path crossing mark ── */}
                      <circle cx={px} cy={gy} r={4}
                        fill="var(--color-primary)" fillOpacity="0.8" />
                      <circle cx={px} cy={gy} r={8}
                        fill="var(--color-primary)" fillOpacity="0.1" />

                      {/* ── Snow spray near inner pole ── */}
                      {SPRAY_IN.map(([dx, dy], j) => (
                        <circle
                          key={j}
                          cx={px + dx * sprayMul} cy={gy + dy}
                          r={SPRAY_R_VAL[j]}
                          fill="var(--color-text)"
                          fillOpacity={SPRAY_O_VAL[j]}
                        />
                      ))}
                    </g>
                  )
                })}
              </svg>
            </div>

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
                        color={gateColor(i)}
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
