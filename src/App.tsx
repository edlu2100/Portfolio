import Navbar from './components/Navbar'
import { LanguageProvider } from './context/LanguageContext'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-surface text-text">
        <Navbar />
      </div>
    </LanguageProvider>
  )
}
