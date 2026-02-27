import { useLanguage, type Language } from '../../context/LanguageContext'

export default function LangToggle() {
  const { language, setLanguage } = useLanguage()
  const next = language === 'sv' ? 'en' : 'sv'
  return (
    <button
      onClick={() => setLanguage(next as Language)}
      aria-label="Byt språk"
      title={language === 'sv' ? 'Switch to English' : 'Byt till svenska'}
      style={{ width: '1.3rem', height: '1rem', borderRadius: '2px', overflow: 'hidden', cursor: 'pointer', border: 'none', padding: 0, display: 'flex' }}
    >
      <img
        src={language === 'sv' ? 'https://flagcdn.com/gb.svg' : 'https://flagcdn.com/se.svg'}
        alt={language === 'sv' ? 'English' : 'Svenska'}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </button>
  )
}
