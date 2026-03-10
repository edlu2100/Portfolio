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
          {/* Ljust tema – orb 1: varm guld, övre vänster (speglar mörkt) */}
          <div style={{
            position: 'absolute',
            top: '-15%',
            left: '-10%',
            width: '70vw',
            height: '70vw',
            maxWidth: '800px',
            maxHeight: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(196,169,126,0.13) 0%, transparent 68%)',
            filter: 'blur(10px)',
            animation: 'orb1 28s ease-in-out infinite',
          }} />

          {/* Ljust tema – orb 2: varm sand, nedre höger (speglar mörkt) */}
          <div style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '65vw',
            height: '65vw',
            maxWidth: '750px',
            maxHeight: '750px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(196,169,126,0.10) 0%, transparent 60%)',
            filter: 'blur(10px)',
            animation: 'orb2 36s ease-in-out infinite',
          }} />

          {/* Ljust tema – orb 3: djupare guld, mitten-höger (speglar mörkt) */}
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '5%',
            width: '40vw',
            height: '40vw',
            maxWidth: '500px',
            maxHeight: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(138,110,67,0.07) 0%, transparent 68%)',
            filter: 'blur(8px)',
            animation: 'orb3 44s ease-in-out infinite',
          }} />

          {/* Grid – ljust tema */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(100,80,50,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,80,50,0.01) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
        </>
      )}
    </div>
  )
}
