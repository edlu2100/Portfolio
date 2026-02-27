import { useTheme } from '../context/ThemeContext'

export default function Background() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {dark ? (
        <>
          {/* Orb 1 – blå, övre vänster */}
          <div style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: '70vw',
            height: '70vw',
            maxWidth: '800px',
            maxHeight: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(79,114,255,0.05) 0%, transparent 68%)',
            filter: 'blur(10px)',
            animation: 'orb1 28s ease-in-out infinite',
          }} />

          {/* Orb 2 – djupblå, nedre höger */}
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '65vw',
            height: '65vw',
            maxWidth: '750px',
            maxHeight: '750px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(44,65,192,0.05) 0%, transparent 60%)',
            filter: 'blur(10px)',
            animation: 'orb2 36s ease-in-out infinite',
          }} />

          {/* Orb 3 – sandfärgad, mitten-höger */}
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '5%',
            width: '40vw',
            height: '40vw',
            maxWidth: '500px',
            maxHeight: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(217,200,168,0.036) 0%, transparent 68%)',
            filter: 'blur(8px)',
            animation: 'orb3 44s ease-in-out infinite',
          }} />

          {/* Subtilt nät – mycket diskret */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
        </>
      ) : (
        <>
          {/* Ljust tema – orb 1: varm sol, övre höger */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-5%',
            width: '65vw',
            height: '65vw',
            maxWidth: '780px',
            maxHeight: '780px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(196,169,126,0.162) 0%, transparent 68%)',
            filter: 'blur(12px)',
            animation: 'orb1 32s ease-in-out infinite',
          }} />

          {/* Ljust tema – orb 2: kall blå, nedre vänster */}
          <div style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            maxWidth: '700px',
            maxHeight: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(58,86,232,0.063) 0%, transparent 68%)',
            filter: 'blur(12px)',
            animation: 'orb2 40s ease-in-out infinite',
          }} />

          {/* Ljust tema – orb 3: varm, mitten */}
          <div style={{
            position: 'absolute',
            top: '40%',
            left: '30%',
            width: '50vw',
            height: '50vw',
            maxWidth: '600px',
            maxHeight: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(138,110,67,0.045) 0%, transparent 68%)',
            filter: 'blur(10px)',
            animation: 'orb3 48s ease-in-out infinite',
          }} />

          {/* Subtilt mönster – prickar */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }} />
        </>
      )}
    </div>
  )
}
