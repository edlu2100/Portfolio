import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Background from './components/Background'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
      <div className="min-h-screen bg-surface text-text">
        <Background />
        <Navbar />
        <Hero />
        <Projects />
        <Experience />
        <Education />
        <Skills />
      </div>
    </LanguageProvider>
    </ThemeProvider>
  )
}
