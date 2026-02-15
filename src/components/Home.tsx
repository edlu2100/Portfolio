import { useEffect, useRef, useState } from 'react'

function Home() {
  const [lightPosition, setLightPosition] = useState<{ top: number, left: number, section: 'education' | 'experience' } | null>(null)
  const [scrollingLight, setScrollingLight] = useState<{ top: number, left: number } | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down')

  const educationRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const scrollTimeout = useRef<number | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Uppdatera scroll-riktning
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up')
      }
      lastScrollY.current = currentScrollY
      
      setIsScrolling(true)
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      
      // Uppdatera ljusets position under scrolling
      const midScreen = window.innerHeight / 2
      const sections = [educationRef, experienceRef]
      
      let foundSection = false
      for (const ref of sections) {
        if (!ref.current) continue
        const line = ref.current.querySelector('.timeline-line')
        if (!line) continue
        
        const lineRect = line.getBoundingClientRect()
        const sectionRect = ref.current.getBoundingClientRect()
        
        // Kolla om mitten av skärmen är inom sektionen
        if (midScreen >= sectionRect.top && midScreen <= sectionRect.bottom) {
          // Hitta första och sista punkten i sektionen
          const titles = ref.current.querySelectorAll<HTMLElement>('.title-marker')
          if (titles.length > 0) {
            const firstTitle = titles[0].getBoundingClientRect()
            const lastTitle = titles[titles.length - 1].getBoundingClientRect()
            const firstDotTop = firstTitle.top + 4
            const lastDotTop = lastTitle.top + 4
            
            // Clampa ljuset mellan första och sista punkten
            const clampedTop = Math.max(firstDotTop, Math.min(lastDotTop, midScreen))
            setScrollingLight({ top: clampedTop, left: lineRect.left })
            foundSection = true
          }
          break
        }
      }
      
      // Om ljuset inte är inom någon sektion, dölj det
      if (!foundSection) {
        setScrollingLight(null)
      }
      
      // När scrolling slutar, snapa till närmaste punkt
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false)
        
        let closestDist = Infinity
        let bestDot: { top: number, left: number, section: 'education' | 'experience' } | null = null
        
        const sections = [
          { ref: educationRef, name: 'education' as const },
          { ref: experienceRef, name: 'experience' as const }
        ]
        
        sections.forEach(({ ref, name }) => {
          if (!ref.current) return
          const titles = ref.current.querySelectorAll<HTMLElement>('.title-marker')
          
          const line = ref.current.querySelector('.timeline-line')
          if (!line) return
          const lineRect = line.getBoundingClientRect()
          const lineLeft = lineRect.left
          
          titles.forEach((title) => {
            const titleRect = title.getBoundingClientRect()
            const dotPosition = titleRect.top + 4
            const dist = Math.abs(dotPosition - midScreen)
            
            if (dist < closestDist) {
              closestDist = dist
              bestDot = { top: dotPosition, left: lineLeft, section: name }
            }
          })
        })
        
        setLightPosition(bestDot)
        setScrollingLight(null)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const experiences = [
    {
      title: "Senior Webbutvecklare",
      company: "Tech Solutions AB",
      period: "2022 - Nuvarande",
      description: "Lead developer för flera stora kundprojekt. Ansvarig för arkitektur och implementation."
    },
    {
      title: "Fullstack Developer",
      company: "Digital Innovations",
      period: "2020 - 2022",
      description: "Utvecklade fullstack-applikationer med React, Node.js och MongoDB."
    },
    {
      title: "Frontend Developer",
      company: "Creative Web Studio",
      period: "2018 - 2020",
      description: "Skapade responsiva och tillgängliga gränssnitt i nära samarbete med designers."
    },
    {
      title: "Junior Developer",
      company: "StartUp Tech",
      period: "2017 - 2018",
      description: "Byggde funktioner för e-handelsplattform och lärde mig moderna metoder."
    }
  ]

  const education = [
    {
      degree: "Master i Datavetenskap",
      school: "Kungliga Tekniska Högskolan",
      period: "2015 - 2017"
    },
    {
      degree: "Kandidat i Datavetenskap",
      school: "Stockholms Universitet",
      period: "2012 - 2015"
    }
  ]

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Vänster kolumn - Fixed sidebar */}
      <aside className="hidden lg:flex w-72 p-8 lg:p-12 fixed h-screen flex-col justify-between border-r border-zinc-900/50">
        <div className="space-y-8 lg:space-y-12">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold tracking-tight mb-1">Ditt Namn</h1>
            <p className="text-sm text-zinc-500">Webbutvecklare</p>
          </div>
          
          <nav className="space-y-1">
            <a href="#om" className="block text-sm text-zinc-500 hover:text-white transition-colors py-1">
              Om mig
            </a>
            <a href="#utbildning" className="block text-sm text-zinc-500 hover:text-white transition-colors py-1">
              Utbildning
            </a>
            <a href="#erfarenhet" className="block text-sm text-zinc-500 hover:text-white transition-colors py-1">
              Erfarenhet
            </a>
          </nav>
        </div>
        
        <div className="flex gap-4 lg:gap-6">
          <a href="#" className="text-xs text-zinc-600 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="text-xs text-zinc-600 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-xs text-zinc-600 hover:text-white transition-colors">
            Email
          </a>
        </div>
      </aside>

      {/* Höger kolumn - Main content */}
      <main className="lg:ml-72 flex-1 bg-black">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-24 space-y-20 sm:space-y-28 md:space-y-40">
          
          {/* Om mig sektion */}
          <section id="om" className="space-y-6 md:space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-none">
              Hej. Jag skapar<br />moderna digitala<br />upplevelser.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
              Med passion för ren kod och elegant design bygger jag webbapplikationer 
              som är både kraftfulla och intuitiva.
            </p>
          </section>

          {/* Utbildning sektion */}
          <section id="utbildning" className="space-y-8 md:space-y-12" ref={educationRef}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Utbildning</h3>
            <div className="relative">
              {/* Vertikal linje */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-900 timeline-line">
                {/* Ljus under scrolling */}
                {isScrolling && scrollingLight && (
                  <>
                    {/* Svans */}
                    <div 
                      className="w-2 h-16 rounded-full transition-all duration-200 ease-out fixed z-40"
                      style={{ 
                        left: `${scrollingLight.left}px`,
                        top: scrollDirection === 'down' ? `${scrollingLight.top - 64}px` : `${scrollingLight.top}px`,
                        background: scrollDirection === 'down' 
                          ? 'linear-gradient(to top, rgba(255,255,255,0.3), rgba(255,255,255,0))' 
                          : 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0))',
                        filter: 'blur(2px)',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    {/* Centrum */}
                    <div 
                      className="w-2 h-2 bg-white rounded-full transition-all duration-200 ease-out fixed z-50 -translate-x-1/2"
                      style={{ 
                        left: `${scrollingLight.left}px`,
                        top: `${scrollingLight.top}px`,
                        boxShadow: '0 0 10px 3px rgba(255,255,255,0.7)',
                      }}
                    />
                  </>
                )}
                {/* Snapad ljuspunkt */}
                {!isScrolling && lightPosition && lightPosition.section === 'education' && (
                  <div 
                    className="w-2 h-2 bg-white rounded-full transition-all duration-1000 ease-in-out fixed z-50 -translate-x-1/2"
                    style={{ 
                      left: `${lightPosition.left}px`,
                      top: `${lightPosition.top}px`,
                      boxShadow: '0 0 10px 3px rgba(255,255,255,0.7)',
                    }}
                  />
                )}
              </div>

              <div className="space-y-6 md:space-y-8 pl-8 md:pl-12">
                {education.map((edu, index) => (
                  <div key={index} className="relative">
                    {/* Cirkel vid rubriken */}
                    <div className="absolute -left-8 md:-left-12 -translate-x-1/2 top-1 w-2 h-2 bg-white/40 rounded-full" />
                    
                    <div className="space-y-2">
                      <h4 className="text-xl sm:text-2xl font-medium title-marker">{edu.degree}</h4>
                      <p className="text-sm sm:text-base text-zinc-500">{edu.school}</p>
                      <p className="text-xs sm:text-sm text-zinc-600">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Erfarenhet sektion */}
          <section id="erfarenhet" className="space-y-8 md:space-y-12 pb-16 md:pb-32" ref={experienceRef}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">Erfarenhet</h3>
            <div className="relative">
              {/* Vertikal linje */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-900 timeline-line">
                {/* Ljus under scrolling */}
                {isScrolling && scrollingLight && (
                  <>
                    {/* Svans */}
                    <div 
                      className="w-2 h-16 rounded-full transition-all duration-200 ease-out fixed z-40"
                      style={{ 
                        left: `${scrollingLight.left}px`,
                        top: scrollDirection === 'down' ? `${scrollingLight.top - 64}px` : `${scrollingLight.top}px`,
                        background: scrollDirection === 'down' 
                          ? 'linear-gradient(to top, rgba(255,255,255,0.3), rgba(255,255,255,0))' 
                          : 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0))',
                        filter: 'blur(2px)',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    {/* Centrum */}
                    <div 
                      className="w-2 h-2 bg-white rounded-full transition-all duration-200 ease-out fixed z-50 -translate-x-1/2"
                      style={{ 
                        left: `${scrollingLight.left}px`,
                        top: `${scrollingLight.top}px`,
                        boxShadow: '0 0 10px 3px rgba(255,255,255,0.3)',
                      }}
                    />
                  </>
                )}
                {/* Snapad ljuspunkt */}
                {!isScrolling && lightPosition && lightPosition.section === 'experience' && (
                  <div 
                    className="w-2 h-2 bg-white rounded-full transition-all duration-1000 ease-in-out fixed z-50 -translate-x-1/2"
                    style={{ 
                      left: `${lightPosition.left}px`,
                      top: `${lightPosition.top}px`,
                      boxShadow: '0 0 10px 3px rgba(255,255,255,0.3)',
                    }}
                  />
                )}
              </div>

              <div className="space-y-12 md:space-y-16 pl-8 md:pl-12">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Cirkel vid rubriken */}
                    <div className="absolute -left-8 md:-left-12 -translate-x-1/2 top-1 w-2 h-2 bg-white/40 rounded-full" />
                    
                    <div className="space-y-2 md:space-y-3">
                      <h4 className="text-xl sm:text-2xl font-medium title-marker">{exp.title}</h4>
                      <p className="text-sm sm:text-base text-zinc-500">{exp.company}</p>
                      <p className="text-xs sm:text-sm text-zinc-600">{exp.period}</p>
                      <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

export default Home
