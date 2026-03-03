import { useTheme } from '../../context/ThemeContext'

// ─── Coordinate system ────────────────────────────────────────────────────────
// ViewBox 680 × 860  (Y=0 top, Y=860 bottom)
// Three peaks ascending left → right.
//
//   entry      P1 (low)   V1         P2 (mid)   V2         P3 (tall)  exit
const RIDGE = '-20,742   85,560   200,644   345,324   474,560   628,54   720,324'
const ECHO  = '85,668   200,742   345,436   474,668   628,166   720,436'
const FILL  = 'M -20,742 L 85,560 L 200,644 L 345,324 L 474,560 L 628,54 L 720,324 L 720,860 L -20,860 Z'

// ─── Slalom course — smooth S-curves with growing amplitude ─────────────────
// Rule: CP1.x = prev endpoint x, CP2.x = current endpoint x
// → vertical tangent at every gate = maximally smooth S-shape
// Gates 1-3 tight, then significantly wider from gate 4
const SLALOM = [
  'M 628,54',
  'C 628,86  632,108  632,120',  // gate 1 — right +4
  'C 632,132 620,162  620,188',  // gate 2 — left  -12
  'C 620,214 648,248  648,266',  // gate 3 — right +28
  'C 648,298 582,324  582,350',  // gate 4 — left  -66  ← big jump
  'C 582,382 660,416  660,460',  // gate 5 — right +78
  'C 660,506 490,540  490,574',  // gate 6 — left  -170
  'C 490,616 620,650  620,692',  // gate 7 — right +130
  'C 620,732 440,766  440,800',  // gate 8 — left  -180
].join(' ')

// ─────────────────────────────────────────────────────────────────────────────

interface Props { mounted: boolean }

export default function HeroMountains({ mounted }: Props) {
  const { theme } = useTheme()
  const light = theme === 'light'

  const color = light ? 'var(--color-accent)' : 'var(--color-primary-light)'

  const oFill   = light ? 0.02 : 0.05
  const oEcho   = light ? 0.08 : 0.13
  const oRidge  = light ? 0.22 : 0.38
  const oSlalom = light ? 0.35 : 0.55

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '54%',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 680 860"
        preserveAspectRatio="xMaxYMid meet"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="mtn-gx" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="32%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="mtn-gy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="78%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="mtn-mask">
            <rect width="680" height="860" fill="url(#mtn-gx)" />
            <rect width="680" height="860" fill="url(#mtn-gy)"
              style={{ mixBlendMode: 'multiply' }} />
          </mask>
          {/* Reveals slalom line along arc-length, perfectly in sync with skier */}
          <mask id="slalom-mask">
            <path d={SLALOM}
              stroke="white" strokeWidth="6" strokeLinecap="butt" fill="none"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={mounted ? 0 : 1}
              style={{ transition: `stroke-dashoffset 5s cubic-bezier(0.4,0,0.2,1) 1.3s` }}
            />
          </mask>
          {/* Recolour skiing.png: primary (#1f3a5f) light, accent (#c2a878) dark */}
          <filter id="skier-primary" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              0 0 0 0 0.122
              0 0 0 0 0.227
              0 0 0 0 0.373
              0 0 0 1 0" />
          </filter>
          <filter id="skier-accent" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              0 0 0 0 0.76
              0 0 0 0 0.659
              0 0 0 0 0.47
              0 0 0 1 0" />
          </filter>
        </defs>

        <g mask="url(#mtn-mask)">

          {/* ① Body fill — fades in behind the ridge */}
          <path d={FILL} fill={color}
            opacity={mounted ? oFill : 0}
            style={{ transition: `opacity 1s ease 0.8s` }} />

          {/* ② Echo ridge — draws after main ridge */}
          <polyline points={ECHO} fill="none" stroke={color}
            strokeWidth="0.7" strokeLinejoin="miter" opacity={oEcho}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={mounted ? 0 : 1}
            style={{ transition: `stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1) 0.7s` }} />

          {/* ③ Main ridge — draws first, top to bottom */}
          <polyline points={RIDGE} fill="none" stroke={color}
            strokeWidth="1.15" strokeLinejoin="miter" strokeLinecap="butt"
            opacity={oRidge}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={mounted ? 0 : 1}
            style={{ transition: `stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1) 0.1s` }} />

          {/* ⑤ Slalom track — snakes down after ridge is drawn */}
          <path d={SLALOM} fill="none" stroke={color}
            strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="3 3.5"
            opacity={oSlalom}
            mask="url(#slalom-mask)" />

          {/* ⑤ Skier — travels along the SLALOM path, leaving track behind */}
          <g style={{
            offsetPath: `path('${SLALOM}')`,
            offsetDistance: mounted ? '100%' : '0%',
            offsetRotate: '0deg',
            opacity: mounted ? oSlalom : 0,
            transition: [
              `offset-distance 5s cubic-bezier(0.4,0,0.2,1) 1.3s`,
              `opacity 0.4s ease 1.3s`,
            ].join(', '),
          } as React.CSSProperties}>
            <image
              href="/skiing.png"
              x={-12}
              y={-12}
              width={24}
              height={24}
              filter={light ? 'url(#skier-primary)' : 'url(#skier-accent)'}
            />
          </g>

        </g>
      </svg>
    </div>
  )
}
