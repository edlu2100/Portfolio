// GS slalom constants
const GATE_RED   = '#DB2D14'
const GATE_BLUE  = '#1a4de8'
export const ROW_H      = 230
const SVG_W      = 200
const CX         = SVG_W / 2
const PASS_AMP   = 90
const GATE_WIDTH = 25
const GATE_INSET = 15
const PANEL_H    = 12
const PANEL_DY   = -30
const POLE_W     = 3.5

const SPRAY_IN: [number, number][] = [[-4, -18], [-11, -9], [-16, -1], [-10, 9], [-4, 17]]
const SPRAY_R_VAL = [1.1, 0.9, 1.3, 0.8, 1.0]
const SPRAY_O_VAL = [0.14, 0.11, 0.17, 0.09, 0.13]

function gateColor(i: number) { return i % 2 === 0 ? GATE_RED : GATE_BLUE }
function passX(i: number) { return i % 2 === 0 ? CX - PASS_AMP : CX + PASS_AMP }
function gateY(i: number) { return i * ROW_H + ROW_H / 2 }

export function buildPath(n: number): string {
  if (n === 0) return ''
  const pts = [
    { x: CX, y: 0 },
    ...Array.from({ length: n }, (_, i) => ({ x: passX(i), y: gateY(i) })),
    { x: CX, y: n * ROW_H },
  ]
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i], p1 = pts[i + 1]
    const dy = p1.y - p0.y
    d += ` C ${p0.x} ${p0.y + dy * 0.45}, ${p1.x} ${p1.y - dy * 0.45}, ${p1.x} ${p1.y}`
  }
  return d
}

interface Props {
  pathD: string
  totalH: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[]
}

export default function SlalomTrack({ pathD, totalH, items }: Props) {
  return (
    <div style={{ flex: `0 0 ${SVG_W}px`, position: 'relative', height: totalH }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${totalH}`}
        width={SVG_W}
        height={totalH}
        overflow="visible"
        style={{ position: 'absolute', top: 0, left: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer glow */}
        <path d={pathD} fill="none" stroke="var(--color-primary)" strokeWidth="6" strokeOpacity="0.06" strokeLinecap="round" />
        {/* Main track */}
        <path d={pathD} fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeOpacity="0.4" strokeLinecap="round" />
        {/* Dashed ski-mark */}
        <path d={pathD} fill="none" stroke="var(--color-text)" strokeWidth="0.7" strokeOpacity="0.07" strokeDasharray="2.5 7" strokeLinecap="round" />

        {items.map((_, i) => {
          const px       = passX(i)
          const gy       = gateY(i)
          const col      = gateColor(i)
          const dir      = i % 2 === 0 ? -1 : 1
          const outerX   = px - dir * GATE_INSET
          const innerX   = outerX - dir * GATE_WIDTH
          const panelL   = Math.min(innerX, outerX)
          const panelTop = gy + PANEL_DY
          const poleTop  = panelTop - 16
          const poleBtm  = gy
          const sprayMul = dir

          return (
            <g key={i}>
              {/* Inner pole */}
              <rect x={innerX - POLE_W / 2} y={poleTop} width={POLE_W} height={poleBtm - poleTop} fill={col} rx="2" />
              <circle cx={innerX} cy={poleBtm} r={3} fill={col} fillOpacity="0.25" />
              {/* Outer pole */}
              <rect x={outerX - POLE_W / 2} y={poleTop} width={POLE_W} height={poleBtm - poleTop} fill={col} rx="2" />
              <circle cx={outerX} cy={poleBtm} r={3} fill={col} fillOpacity="0.25" />
              {/* Panel shadow */}
              <rect x={panelL} y={panelTop + 1} width={GATE_WIDTH} height={PANEL_H} fill="black" fillOpacity="0.25" rx="2" />
              {/* Panel */}
              <rect x={panelL} y={panelTop} width={GATE_WIDTH} height={PANEL_H} fill={col} rx="2" />
              {/* White stripe */}
              <rect x={panelL} y={panelTop + PANEL_H / 2 - 1.5} width={GATE_WIDTH} height={3} fill="white" fillOpacity="0.3" />
              {/* Sheen */}
              <rect x={panelL} y={panelTop} width={GATE_WIDTH} height={PANEL_H / 2} fill="white" fillOpacity="0.08" rx="2" />
              {/* Skier crossing mark */}
              <circle cx={px} cy={gy} r={4} fill="var(--color-primary)" fillOpacity="0.8" />
              <circle cx={px} cy={gy} r={8} fill="var(--color-primary)" fillOpacity="0.1" />
              {/* Snow spray */}
              {SPRAY_IN.map(([dx, dy], j) => (
                <circle key={j} cx={px + dx * sprayMul} cy={gy + dy} r={SPRAY_R_VAL[j]} fill="var(--color-text)" fillOpacity={SPRAY_O_VAL[j]} />
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
